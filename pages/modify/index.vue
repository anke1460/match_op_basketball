<template>
    <view class="bgs">
        <u-navbar @leftClick="leftClick" :title="$t('modify')">
            <view class="u-nav-slot" slot="right">
                <image src="../../static/save.png" class="save-icon"></image>
                <text @tap="save()">{{ $t("save") }}</text>
            </view>
        </u-navbar>
        <view class="mbody">
            <view class="title">Append Points</view>
            <view class="panel">
				<u-grid :border="false" col="3" customStyle="padding: 12px 0;">
					<u-grid-item></u-grid-item>
					<u-grid-item class="home">Home</u-grid-item>
					<u-grid-item class="away">Away</u-grid-item>
				</u-grid>
				<view v-for="item,index in quarterList" :key="index">
					<u-grid :border="false" col="3" customStyle="padding: 12px 0;">
						<u-grid-item class="quarter-title">{{ item.name }}</u-grid-item>
						<u-grid-item>
							<u-input v-model="item.home" :border="'none'" inputAlign="center" clearable customStyle="padding:8px;border-radius:8px;border:1px solid #0A70F5;background-color:#EBF3FE;margin-right: 8px;"/>
						</u-grid-item>
						<u-grid-item>
							<u-input v-model="item.away" :border="'none'" inputAlign="center" clearable customStyle="padding:8px;border-radius:8px;border:1px solid #0A70F5;background-color:#EBF3FE;margin-left: 8px;"/>
						</u-grid-item>
					</u-grid>
					<view class="divide-line" v-if="index != 3"></view>
				</view>
            </view>
        </view>
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

			// 分数
			quarterList: [
				{ name: '1st Q', home: '', away: '' },
				{ name: '2nd Q', home: '', away: '' },
				{ name: '3rd Q', home: '', away: '' },
				{ name: '4th Q', home: '', away: '' },
			]
        };
    },
    methods: {
		save() {
			let list = this.quarterList.map(v => {
				return {
					home: v.home,
					away: v.away
				}
			})
			console.log('值：', list)
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
</style>
