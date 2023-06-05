<template>
    <view class="bgs">
        <u-navbar @leftClick="leftClick" :title="$t('modify')">
        </u-navbar>
        <view class="mbody">
            <view class="title">Append Points</view>
            <view class="panel">
				<u-grid :border="false" col="4" customStyle="padding: 12px 0;">
					<u-grid-item></u-grid-item>
					<u-grid-item class="home">Home</u-grid-item>
					<u-grid-item class="away">Away</u-grid-item>
                    <u-grid-item></u-grid-item>
				</u-grid>
				<view v-for="item,index in quarterList" :key="index">
					<u-grid :border="false" col="4" customStyle="padding: 12px 0;">
						<u-grid-item class="quarter-title">{{ item.name }}</u-grid-item>
						<u-grid-item>
							<u-input v-model="item.home" :border="'none'" type="number" inputAlign="center" clearable customStyle="padding:8px;border-radius:8px;border:1px solid #0A70F5;background-color:#EBF3FE;margin-right: 8px;"/>
						</u-grid-item>
						<u-grid-item>
							<u-input v-model="item.away" :border="'none'"  type="number" inputAlign="center" clearable customStyle="padding:8px;border-radius:8px;border:1px solid #0A70F5;background-color:#EBF3FE;margin-left: 8px;"/>
						</u-grid-item>
                        <u-grid-item>
                            <u-button @click="save(index)" class="m-btn" color="linear-gradient(135deg, #2A8EFE 0%, #0A70F5 100%)">
                               {{ $t("save") }}
                            </u-button>
                        </u-grid-item>
					</u-grid>
					<view class="divide-line" v-if="index != 3"></view>
				</view>
            </view>
        </view>
        <u-notify ref="uNotify" message=""></u-notify>
    </view>
</template>

<script>
export default {
    data() {
        const hours = [];
        for (let i = 0; i <= 23; i++) {
            if (i <= 9) {
                hours.push("0" + i);
            } else {
                hours.push(i + "");
            }
        }
        const minutes = [];
        for (let i = 0; i <= 59; i++) {
            if (i <= 9) {
                minutes.push("0" + i);
            } else {
                minutes.push(i + "");
            }
        }
        const secs = [];
        for (let i = 0; i <= 59; i++) {
            if (i <= 9) {
                secs.push("0" + i);
            } else {
                secs.push(i + "");
            }
        }
        return {
            start_at_time: [],
            end_at_time: [],
            hours: hours,
            minutes: minutes,
            secs: secs,
            current_position: 1,
            match_status: [],
            kickoffs: [],
            weathers: [],
            times: [],
            begin_at: "",
            end_at: "",
            current_weather_index: "",
            current_kick_index: "",
            current_status_index: "",
            show_begin_at: false,
            show_end_at: false,
            time_index: 0,
            match_id: '',

			// 分数
			quarterList: []
        };
    },
    methods: {
        onLoad() {
            this.match_id = uni.getStorageSync('match_id');
            uni.$u.http.get(`basketball/match_input/${this.match_id}/process_points`, {}, {withCredentials: true}).then(res => {
                this.quarterList = res.data.data
            });
        },
		save(index) {
			  window.list = this.quarterList.map(v => {
				return {
                    position: v.position,
					home: parseInt(v.home),
					away: parseInt(v.away)
				}
			})
            console.log('list0.', list)
            for(var i=0; i<list.length; i ++) {
               if (list[i].home === '' || list[i].away === '' || (!list[i].home && list[i].home != 0) || (!list[i].away && list[i].away != 0) ) {
                   this.$refs.uNotify.show({
                   	top: 10,
                   	type: 'error',
                   	color: '#fff',
                   	bgColor: '#e5291e',
                   	message: 'The quarter score can not be blank',
                   	duration: 1000 * 2,
                   	fontSize: 20,
                   	safeAreaInsetTop:true
                   })
                   return false;
               } else if (list[i].home < 0 || list[i].away < 0) {
                   console.log('2222', list[i].home , list[i].away )
                   this.$refs.uNotify.show({
                   	top: 10,
                   	type: 'error',
                   	color: '#fff',
                   	bgColor: '#e5291e',
                   	message: 'The quarter score can not be minus to negative number',
                   	duration: 1000 * 2,
                   	fontSize: 20,
                   	safeAreaInsetTop:true
                   })
                   return false;
               }
            }
            
            console.log(this.quarterList[index])
            uni.$u.http.put(`basketball/match_input/${this.match_id}/update_process_points`, {home_score: this.quarterList[index].home, guest_score: this.quarterList[index].away, position: this.quarterList[index].position, game_time: 0, pk: 'b_update_points'}, {withCredentials: true}).then(res => {
                if (res.data.success == false) {
                	this.$refs.uNotify.show({
                		top: 10,
                		type: 'error',
                		color: '#fff',
                		bgColor: '#e5291e',
                		message: res.data.msg,
                		duration: 1000 * 2,
                		fontSize: 20,
                		safeAreaInsetTop:true
                	})
                	
                } else {
                    this.$refs.uNotify.show({
                    	top: 10,
                    	type: 'error',
                    	color: '#fff',
                    	bgColor: '#a0c630',
                    	message: 'Success',
                    	duration: 1000 * 1,
                    	fontSize: 20,
                    	safeAreaInsetTop:true
                    })
                }
            });
            
		},
		leftClick() {
			this.$u.route({
				url: 'pages/index/index',
				type: 'switchTab',
			})
		},
	},
};
</script>

<style lang="scss" scoped>
page {
    background-color: #f3f4f5;
	$u-border-color: '#0A70F5';
    .save-icon {
        width: 16px;
        height: 16px;
        margin-right: 4px;
        vertical-align: middle;
    }
    .u-nav-slot {
        color: #0a70f5;
    }
    .mbody {
        margin-top: 44px;

        .title {
            padding: 16px 16px 8px;
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.84);
            line-height: 22px;
        }

        .panel {
            background: #ffffff;
            border-radius: 4px;
			padding: 0 16px;
			margin-top: 4px;
			.quarter-title {
				font-size: 16px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(0,0,0,0.84);
				line-height: 22px;
				align-items: start;
			}
			.home,
			.away {
				height: 22px;
				font-size: 16px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
			}
			.home {
				color: #FF8800;
			}
			.away {
				color: #00B365;
			}
        }
    }
}
.divide-line {
    height: 1px;
    padding: 0 24px;
    background-color: #EEEEEE;
    width: 100%;
    box-sizing: content-box;
}

.m-btn {
    width: 60px;
}
</style>
