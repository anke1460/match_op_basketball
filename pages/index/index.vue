<template>
    <view>

        <!-- 头部 -->
        <view class="score-header u-type-primary-bg u-font-12 text-white">
            <!-- 比分 -->
            <view class="flex items-center justify-between u-padding-left-36 u-padding-right-36 u-padding-top-32 u-padding-bottom-8">
                <view class="team flex flex-col items-center justify-center"><view class="w-full line-clamp-3 text-center break-normal">Incheon Shinhan Bank S-Birds Women</view></view>
                <view class="core flex flex-1 items-center justify-center">
                    <span :class="[calculateGoalLength > 2 ? 'small' : '']" class="goal flex-1">{{ goal[0] }}</span>
                    <span class="split">:</span>
                    <span :class="[calculateGoalLength > 2 ? 'small' : '']" class="goal flex-1">{{ goal[1] }}</span>
                </view>
                <view class="team flex flex-col items-center justify-center"><view class="w-full line-clamp-3 text-center break-normal">Incheon </view></view>
            </view>
            <!-- 时间 -->
            <view class="timer-box flex items-center justify-between u-padding-left-38 u-padding-right-38 u-padding-bottom-24">
                <view class="sign">Home</view>
                <view class="timer flex-1 text-center">1th Q  10'00</view>
                <view class="sign">Away</view>
            </view>
        </view>
        
        <!-- 最新事件 -->
        <u-row class="event_content u-font-12">
            <view class="u-flex">
                <text class="notice-icon"></text>
                <text class="last-event-time" :class="is_blink">{{
                    event_time
                }}</text>
            </view>
            <view class="event-head-content" :class="is_blink">
                <text>{{ event_content }}</text>
            </view>
        </u-row>

        <!-- 按钮区 -->
        <view class="operation-area">
            <!-- 第一行 -->
            <u-grid :border="false" col="3">
                <u-grid-item>
                    <u-button class="plain-blue" text="Other"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-blue" text="Status"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-blue" text="Append Points"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 第二行 -->
            <u-grid :border="false" col="2">
                <u-grid-item>
                    <u-button class="primary-red h-42" text="Quarter Start"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="primary-green h-42" text="Quarter End"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 第三行 -->
            <u-grid :border="false" col="3">
                <u-grid-item>
                    <u-button class="plain-orange" text="Fouled Out" :plain="true"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-orange" text="Substitution" :plain="true"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-red" text="SOS" :plain="true"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 第四行 -->
            <u-grid :border="false" col="3" customStyle="padding: 6px 0;" >
                <u-grid-item class="time-sign">
                    <u-button class="plain-blue" customStyle="color:#000000" text="1"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-blue" customStyle="color:#000000" text="2"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="primary-blue" text="Adjust Time"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 大块儿按钮 -->
            <u-grid :border="false" col="3" class="big-button-box">
                <!-- 主队纵列 -->
                <u-grid-item>
                    <u-button class="big-button flex items-center h-70" color="linear-gradient(135deg, #FF643C 0%, #FF9E1A 100%)">
                        <span class="font-specail">3</span>
                        <view><p class="text-left">Home</p><p class="text-left">Points</p></view>
                    </u-button>
                    <u-button class="big-button h-70 mt-8" color="linear-gradient(135deg, #FFB925 0%, #FF5800 100%)">
                        <view><p>Home</p><p>Rebound</p></view>
                    </u-button>
                    <u-button class="big-button flex items-center h-70  mt-8" color="linear-gradient(135deg, #FF643C 0%, #FF9E1A 100%)">
                        <span class="font-specail">2</span>
                        <view><p class="text-left">Home</p><p class="text-left">Points</p></view>
                    </u-button>
                    <u-button class="big-button primary-red h-70 mt-8">
                        <view><p>Home</p><p>Rebound</p></view>
                    </u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="primary-blue h-70" text="Foul"></u-button>
                    <u-button class="primary-red h-96 mt-8" text="Free Throw"></u-button>
                    <u-button class="plain-orange h-122 mt-8" text="Time stop" :plain="true"></u-button>
                </u-grid-item>
                <!-- 客队纵列 -->
                <u-grid-item>
                    <u-button class="big-button h-70" color="linear-gradient(135deg, #A1D321 0%, #43B800 100%)">
                        <span class="font-specail">3</span>
                        <div><p>Away</p><p>Points</p></div>
                    </u-button>
                    <u-button class="big-button primary-green h-70 mt-8">
                        <view><p>Away</p><p>Rebound</p></view>
                    </u-button>
                    <u-button class="big-button flex items-center h-70  mt-8" color="linear-gradient(135deg, #1CCEB9 0%, #00B3A1 100%)">
                        <span class="font-specail">2</span>
                        <view><p class="text-left">Home</p><p class="text-left">Points</p></view>
                    </u-button>
                    <u-button class="big-button h-70 mt-8" color="linear-gradient(135deg, #1CB8CE 0%, #008BB3 100%)">
                        <view><p>Away</p><p>Rebound</p></view>
                    </u-button>
                </u-grid-item>
            </u-grid>
        </view>
        
    </view>
</template>

<script>
import {
    transOtherEvents,
    transEvents,
    transMpStatus,
    transDescPks,
    transRhythms,
    matchEvent,
} from "./../../utils.js";
export default {
    data() {
        return {
            is_blink: "",
            bg_color: "background-color: #085BC9",
            show_alert: false,
            show_confirm: false,
            home_away_show: false,
            shoot_show: false,
            standby_show: false,
            throwin_show: false,
            free_kick_show: false,
            last_team: "",
            pk_show: false,
            safe_show: false,
            injury_show: false,
            corner_show: false,
            other_show: false,
            select_team_show: false,
            delete_events_show: false,
            select_card_show: false,
            goal_show: false,
            extra_show: false,
            unsure_show: false,
            sos_show: false,
            start_end_show: false,
            corner_confirm_click: false,
            corner_cancel_click: false,
            goal_confirm_click: false,
            goal_cancel_click: false,
            pk_confirm_click: false,
            pk_cancel_click: false,
            rekick_show: false,
            custom_text: "",
            event_title: "",
            rekick_title: "",
            team: "", // 事件主客队
            event_text: "", //发送事件内容
            match_id: "",
            match_time: "", // 比赛时间,
            event_time: "2nd Q - 10'00", //事件时间
            event_content: "Quarter Start", //事件内容
            injury_time: "",
            match_sec: 0,
            youth_race: "",
            hasExtraTime: "",
            pos: "",
            time_inter: null,
            load_num: 1,
            home_score: "",
            guest_score: "",
            home_team: "",
            guest_team: "",
            game_time: {},
            red_card: [0, 0],
            yellow_card: [0, 0],
            goal: [980, 0],
            shoot_on: [0, 0], //射门
            corner: [0, 0],
            transTeams: {},
            delete_events: [],
            event_options: {},
            lang: "",
            home_text: "Home",
            guest_text: "Away",
            mp_id: "",
            last_event: "",
            op_disabled: false,
            last_event_title: "",
        };
    },
    computed: {
        calculateGoalLength() {
            return Math.max(`${this.goal[0] || 0}`.length, `${this.goal[1] || 0}`.length)
        }
    },
    methods: {
        onLoad(option) {
            this.lang = uni.getLocale();
        },
        onShow() {},

        handleClick() {
            console.log('!!!!!')
        }
    },
};
</script>

<style lang="scss" scoped>

::v-deep .u-button--square {
    border-radius: 8px;
}
::v-deep .u-button--plain {
    background-color: transparent;
}
::v-deep .u-button {
    height: 38px;
}

.score-header {
    line-height: 1.4;
    .team {
        width: 100px;
    }
    .core {
        font-weight: bold;
        font-size: 40px;
        padding: 0 6px;
        .split {
            margin: 0 8px;
        }
        .small {
            font-size: 30px
        }
        .goal {
            width: 54px;
            text-align: center;
        }
    }
    .timer-box {
        .timer {
            // width: 
            background: rgba(0,0,0,0.12);
            border-radius: 4px;
            font-size: 16px;
            padding: 11px 3px;
            font-weight: bold;
        }
        .sign {
            color: rgba(255,255,255,0.5);
            padding: 0 27px;
        }
    }
}
.event_content {
    height: 32px;
    line-height: 32px;
    color: #fff;
    font-weight: bold;
    background-color: #E6B002;
    overflow: hidden;
    padding: 0 0 0 5px;
    .notice-icon {
		width: 16px;
		height: 16px;
		margin-right: 8px;
		background-size: cover;
		background-image: url("./../../static/notice.png");
        background-repeat: no-repeat;
	}
    .last-event-time {
        margin-right: 12px;
    }
}

.operation-area {
    padding: 6px 11px;
    .u-grid-item {
        padding: 6px 5px;
    }
    .time-sign {
        position: relative;
        &::after {
            content: '\'';
            position: absolute;
            top: 5px;
            right: -2px;
            font-size: 14px;
            color: white;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #0A70F5;
        }
    }

    .big-button-box {
        font-weight: 600;
        .big-button {
            font-size: 16px !important;
            .font-specail {
                font-size: 28px;
                font-weight: 600;
                margin: 0 6px 0 0;
            }
            p {
                line-height: 1.375;
            }
        }
    }
    
}
// 按钮颜色
.plain-blue {
    color:#0A70F5;
    border:1px solid #0A70F5;
}
.plain-orange {
    color: #FE8800 !important;
    border:1px solid #FE8800;
}
.plain-red {
    color: #F5483B !important;
    border:1px solid #F5483B;
}
.primary-red {
    background: linear-gradient(135deg, #FE6557 0%, #F5483B 100%);
    border: none;
    color: white;
}
.primary-blue {
    background: linear-gradient(135deg, #2A8EFE 0%, #0A70F5 100%);
    border: none;
    color: white;
}
.primary-green {
    background: linear-gradient(135deg, #1CCE72 0%, #00B365 100%);
    border: none;
    color: white;
}
.primary-orange {
    background: linear-gradient(135deg, #1CCE72 0%, #00B365 100%);
    border: none;
    color: white;
}
.h-42 {
    height: 42px;
}
.h-70 {
    height: 70px;
}
.h-96 {
    height: 96px;
}
.h-122 {
    height: 122px;
}
.mt-8 {
    margin-top: 8px;
}


@keyframes aBlink {
    0% {
        opacity: 1;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
    }

    100% {
        opacity: 0;
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
}

@-webkit-keyframes aBlink {
    0% {
        opacity: 1;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
    }

    100% {
        opacity: 0;
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
}
.blink {
    animation: aBlink 600ms 3;
    -webkit-animation: aBlink 600ms 3;
}
</style>
