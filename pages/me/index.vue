<template>
	<view>
			<u-button class="button" type="primary" customStyle="border-color: rgb(50 151 229); width: 120px;margin: 30px auto; background-color:rgb(50 151 229);color:#fff" 
			 :text="$t('logout')" @click="logout">
			</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stat: {},
				guest: {},
				home: {}
			}
		},
		methods: {
			onLoad() {
			},
			onShow() {
				if (uni.getStorageSync('token') != '') {
						uni.$u.http.get(`orbit_occer/${uni.getStorageSync('match_id')}/statistics`, {}, {withCredentials: true}).then(res => {
							this.stat = res.data;
							this.guest = res.data.guest;
							this.home = res.data.home;
						})
					} else {
						uni.$u.route({
							url: 'pages/login/login',
							type: 'reLaunch'
						})
					}
			},
			logout() {
				uni.setStorageSync('token', '');
				uni.setStorageSync('last_login_time', '');
				uni.$u.route({
					url: 'pages/login/login',
					type: 'reLaunch'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #414140;
		color: #fff;
	}
.flex {
	display: flex;
	border-bottom: 1px solid #ccc;
}
.box {
	width: 100%;
	height: 38px;
	line-height: 38px;
	color: #fff;
	font-size: 16px;
	background-color: #414140;
}
.score {
	width: 80px;
	text-align: center;
}
.flex-1 {
	flex: 1;
	text-align: center;
}
</style>
