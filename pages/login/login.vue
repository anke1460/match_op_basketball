<template>
	<view class="wrap login-back">
		<view class="bgs">
		</view>
		<view class="top"></view>
		<view class="content">
			<view class="title">
                Basketball
				<!-- <image src="../../static/logo.png" class="logo"></image> -->
			</view>
			<u-form :model="model" :rules="rules" ref="loginForm" errorType="message">
				<u-form-item label-width="80" :label="$t('login.user')" prop="name">
					<u-input :border="border" :placeholder="$t('account_tip')" v-model="model.account" type="text"></u-input>
				</u-form-item>
				<u-form-item :label="$t('login.code')" prop="code" label-width="80">
					<u-input :border="border" :type="code_type" ref="code" v-model="model.code" :placeholder="$t('code_tip')"><template slot="suffix">
					<view :class="show_code" @tap="showCode"></view>
				</template></u-input>
				</u-form-item>
			</u-form>
			<u-radio-group
			    v-model="lang"
			    placement="row"
			  >
			    <u-radio
			      :customStyle="{marginLeft: '8px', marginTop: '10px'}"
			      v-for="(item, index) in languages"
			      :key="index"
			      :label="item.name"
			      :name="item.value"
			      @change="radioChange"
			    >
			    </u-radio>
			  </u-radio-group>
			<button @tap="submit" :style="[inputStyle]" class="submit-btn click-btn">{{$t('login.submit')}}</button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			labelPosition: 'left',
			model: {
				account: '',
				code: '',
			},
			lang: 'en',
		  languages: [
				{             
				name: 'English',
				value: 'en'
				},
				{
					name: '中文',
					value: 'zh-Hans'
				}],
			show_code: "hide-code",
			border: 'false',
			code_type: 'password',
			rules: {
				account: [
					{
						required: true,
						message: 'Account is required',
						trigger: ['blur', 'change']
					}
				]
			},
			errorType: ['message'],
		}
	},
	
	computed: {
		inputStyle() {
			let style = {};
			if(this.model.account && this.model.code) {
				style.color = "#fff";
				style.opacity = 1;
				// style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		onLoad() {
			this.lang = uni.getLocale();
			this.$i18n.locale = this.lang;
			uni.setLocale(this.lang)
		},
		onShow() {
			if (pullSet) {
				clearInterval(pullSet)
			}
			if (uni.getStorageSync('last_login_time') && (uni.getStorageSync('last_login_time').getTime() + 86400) > (new Date().getTime()) ) {
				if (!this.model.account) {
					this.model.account = uni.getStorageSync('last_login');
					this.model.code = uni.getStorageSync('last_code');
				}
			}
		},
		radioChange(n) {
			this.$i18n.locale = n;
			uni.setLocale(n);
			
			uni.$u.http.setConfig((config) => {
				config.header.lang = n;
				return config
			})
		},
		showCode() {
			if (this.show_code == 'hide-code') {
				this.show_code = 'show-code';
				this.code_type = 'text';
			} else {
				this.show_code = 'hide-code';
				this.code_type = 'password';
			}
		},
		submit() {
			if(this.model.account && this.model.code) {
				uni.$u.http.post('orbit_base/auth_basketball', {user: this.model.account, code: this.model.code, b3: 't'}).then(res => {
					if (res.data.success) {
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('match_id', res.data.id);
						uni.setStorageSync('last_login_time', new Date);
						uni.setStorageSync('last_login', this.model.account);
						uni.setStorageSync('last_code', this.model.code);
						uni.$u.http.setConfig((config) => {
						    /* config 为默认全局配置*/
								config.withCredentials = true;
								config.header.lang = uni.getLocale();
								config.header.Authorization = uni.getStorageSync('token');
								// config.baseURL = `http://test.kospt.win/`;
								config.baseURL = `http://localhost:3003/`;
								// config.baseURL = `http://20.255.63.11/`;
								// config.baseURL = `http://kospt.win/`
						    return config
						})
						this.$u.route({
							url: 'pages/index/index',
							type: 'switchTab',
						})
						// this.$i18n.locale = this.lang;
						// uni.setLocale(this.lang)
						
					} else {
						this.$refs.uToast.show({
							type: 'error',
							icon: false,
							title: 'Error',
							message: res.data.msg
						});
					}
				}).catch(res => {
					if (res.statusCode) {
						this.$refs.uToast.show({
							type: 'error',
							icon: false,
							title: 'Error',
							message: res.data.msg
						});
					} else {
						this.$refs.uToast.show({
							type: 'error',
							icon: false,
							title: 'Error',
							message: 'Network connection failed'
						});
					}
					

        })
			
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	.click-btn {
		opacity: 0.5;
	}
    
	
 

	uni-page-body {
		position: relative;
		height: 100%;
        background-color: transparent
    }
	.logo {
		width: 200px;
		height: 73px;
	}
	.bgs {
		position: fixed;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -1;
		background-image: url("./../../static/login.png");
		background-repeat: no-repeat;
		background-size: cover;
	}

.football {
	width: 48px;
	height: 48px;
	background-size: 100%;
	position: absolute;
	bottom: 100px;
	left: 50%;
	z-index: -1;
	margin-left: -24px;
	background-image: url("./../../static/football.png");
}
.hide-code {
	background-image: url("./../../static/hide_code.png");
	background-size: cover;
	width: 20px;
	height: 10px;
}

.show-code {
	background-image: url("./../../static/show_code.png");
	background-size: cover;
	width: 20px;
	height: 14px;
}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: center;
			font-size: 60rpx;
			font-weight: 500;
			padding-top: 182rpx;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.submit-btn {
			background-color: #0A70F5;
			color: #fff;
			border: none;
			opacity: 0.2;
			font-size: 30rpx;
			padding: 12rpx 0;
			margin-top: 40px;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
