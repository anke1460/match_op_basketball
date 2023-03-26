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
                    <u-button class="plain-blue" text="Other" @click="show_other = true"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-blue" text="Status" @click="show_status = true"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-blue" text="modify" @click="handleGotoModify"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 第二行 -->
            <u-grid :border="false" col="2">
                <u-grid-item>
                    <u-button class="primary-red h-42" text="Quarter Start" @click="show_quarter_start = true"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="primary-green h-42" text="Quarter End" @click="show_quarter_end_comfirm = true"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 第三行 -->
            <u-grid :border="false" col="3">
                <u-grid-item>
                    <u-button class="plain-orange" text="Fouled Out" :plain="true" @click="handleShowBothSidesFun('Fouled Out')"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-orange" text="Substitution" :plain="true" @click="handleShowBothSidesFun('Substitution')"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-red" text="SOS" :plain="true" @click="show_sos = true"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 第四行 -->
            <u-grid :border="false" col="3" customStyle="padding: 6px 0;" >
                <u-grid-item class="time-sign input-box">
                    <u-input v-model="adjustTime.min" :border="'none'" inputAlign="center" clearable customStyle="padding:6px;border-radius:8px;border:1px solid #0A70F5;background-color:#fff;"/>
                </u-grid-item>
                <u-grid-item class="input-box">
                    <u-input v-model="adjustTime.sec" :border="'none'" inputAlign="center" clearable customStyle="padding:6px;border-radius:8px;border:1px solid #0A70F5;background-color:#fff;"/>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="primary-blue" text="Adjust Time"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 大块儿按钮 -->
            <u-grid :border="false" col="3" class="big-button-box">
                <!-- 主队纵列 -->
                <u-grid-item>
                    <u-button @click="show_point = true; point_score = 3;point_team='home'" class="big-button flex items-center h-70" color="linear-gradient(135deg, #FF643C 0%, #FF9E1A 100%)">
                        <span class="font-specail">3</span>
                        <view><p class="text-left">Home</p><p class="text-left">Points</p></view>
                    </u-button>
                    <u-button class="big-button h-70 mt-8" color="linear-gradient(135deg, #FFB925 0%, #FF5800 100%)">
                        <view><p>Home</p><p>Rebound</p></view>
                    </u-button>
                    <u-button @click="show_point = true; point_score = 2;point_team='home'" class="big-button flex items-center h-70  mt-8" color="linear-gradient(135deg, #FF643C 0%, #FF9E1A 100%)">
                        <span class="font-specail">2</span>
                        <view><p class="text-left">Home</p><p class="text-left">Points</p></view>
                    </u-button>
                    <u-button class="big-button primary-red h-70 mt-8">
                        <view><p>Home</p><p>Possession</p></view>
                    </u-button>
                </u-grid-item>
                <!-- 中间 -->
                <u-grid-item class="middle-row">
                    <u-button class="primary-blue h-70" text="Foul" @click="show_foul = true"></u-button>
                    <u-button class="primary-red h-96 mt-8" text="Free Throw" @click="show_free_throw = true"></u-button>
                    <u-button class="plain-orange h-122 mt-8" text="Time stop" :plain="true" @click="show_time_stop = true"></u-button>
                </u-grid-item>
                <!-- 客队纵列 -->
                <u-grid-item>
                    <u-button @click="show_point = true; point_score = 3;point_team='away'" class="big-button h-70" color="linear-gradient(135deg, #A1D321 0%, #43B800 100%)">
                        <span class="font-specail">3</span>
                        <div><p>Away</p><p>Points</p></div>
                    </u-button>
                    <u-button class="big-button primary-green h-70 mt-8">
                        <view><p>Away</p><p>Rebound</p></view>
                    </u-button>
                    <u-button @click="show_point = true; point_score = 3;point_team='away'" class="big-button flex items-center h-70  mt-8" color="linear-gradient(135deg, #1CCEB9 0%, #00B3A1 100%)">
                        <span class="font-specail">2</span>
                        <view><p class="text-left">Away</p><p class="text-left">Points</p></view>
                    </u-button>
                    <u-button class="big-button h-70 mt-8" color="linear-gradient(135deg, #1CB8CE 0%, #008BB3 100%)">
                        <view><p>Away</p><p>Possession</p></view>
                    </u-button>
                </u-grid-item>
            </u-grid>
        </view>

        <!-- 弹窗部分 -->
        <!-- status -->
        <u-popup :show="show_other" round="16px" mode="center" closeable @close="show_other = false">
            <view class="popup-container">
                <view class="popup-title">Other</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <u-button class="primary-blue h-42" text="Player warm-up"></u-button>
                    <u-button class="primary-blue h-42" text="Players coming out"></u-button>
                    <u-button class="primary-blue h-42" text="Game will start soon"></u-button>
                    <view class="divide-line"></view>
                    <u-input placeholder="Need custom text?" fontSize="12" :border="'none'" customStyle="height:38px;border-radius:9px;display:block;width:100%;border:1px solid #0A70F5;padding:0 0 0 12px;overflow:hidden;" >
                        <template slot="suffix">
                            <u-button text="Send" class="primary-blue" size="mini"></u-button>
                        </template>
                    </u-input>
                </view>
            </view>
        </u-popup>

        <!-- status -->
        <u-popup :show="show_status" round="16px" mode="center" closeable @close="show_status = false">
            <view class="popup-container">
                <view class="popup-title">Status</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <u-button class="primary-blue h-42" text="Match Cancel"></u-button>
                    <u-button class="primary-red h-42" text="Game Over"></u-button>
                </view>
            </view>
        </u-popup>

        <!-- quarter start -->
        <u-popup :show="show_quarter_start" round="16px" mode="center" closeable @close="show_quarter_start = false">
            <view class="popup-container">
                <view class="popup-title">Please choose the quarter you want to start？</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <u-button class="primary-blue h-42" text="1st Q" @click="handleQuarterComfirm('1')"></u-button>
                    <u-button class="primary-blue h-42" text="2nd Q" @click="handleQuarterComfirm('2')"></u-button>
                    <u-button class="primary-blue h-42" text="3rd Q" @click="handleQuarterComfirm('3')"></u-button>
                    <u-button class="primary-blue h-42" text="4th Q" @click="handleQuarterComfirm('4')"></u-button>
                </view>
            </view>
        </u-popup>
        <u-modal 
            :show="show_quarter_start_comfirm" 
            :showCancelButton="true" 
            :cancelText="'Cancel'" 
            :confirmText="'OK'" 
            confirmColor="#0A70F5" 
            width="295"
            @confirm="handleComfirm"
            @cancel="show_quarter_start_comfirm = false"
        >
            <template #default>
                <view class="modal-content">Are you sure you want to send this event?</view>
            </template>
        </u-modal>

        <!-- quarter end -->
        <u-modal 
            :show="show_quarter_end_comfirm" 
            :showCancelButton="true" 
            :cancelText="'Cancel'" 
            :confirmText="'OK'" 
            confirmColor="#0A70F5" 
            width="295"
            @confirm="handleQuarterEndComfirm"
            @cancel="show_quarter_end_comfirm = false"
        >
            <template #default>
                <view class="modal-content">Are you sure you want to send this event?</view>
            </template>
        </u-modal>
        
        <!-- home point -->
        <u-popup :show="show_point" round="16px" mode="center" closeable @close="show_point = false">
            <view class="popup-container">
                <view class="popup-title"><text class="capitalize">{{point_team}}</text> {{point_score}}-Points</view>
                <view class="flex items-center gap-23 mt-16">
                    <u-button class="primary-blue h-70" text="In"></u-button>
                    <u-button class="primary-orange h-70" text="Miss"></u-button>
                </view>
            </view>
        </u-popup>

        <!-- SOS -->
        <u-popup :show="show_sos" round="16px" mode="center" closeable @close="show_sos = false">
            <view class="popup-container">
                <view class="popup-title">SOS</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <u-button class="primary-red h-42" text="Match Disconnect"></u-button>
                    <u-button class="primary-green h-42" text="Match Connect"></u-button>
                </view>
            </view>
        </u-popup>

        <!-- Foul -->
        <u-popup :show="show_foul" round="16px" mode="center" closeable @close="show_foul = false">
            <view class="popup-container">
                <view class="popup-title">Foul</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <view class="flex items-center gap-23 w-full">
                        <u-button class="primary-yellow h-70" text="Home"></u-button>
                        <u-button class="primary-green h-70" text="Away"></u-button>
                    </view>
                    <u-button class="primary-blue h-48" text="Technical Foul" @click="show_technical_foul = true;show_foul = false"></u-button>
                </view>
            </view>
        </u-popup>
        <u-popup :show="show_technical_foul" round="16px" mode="center" closeable @close="show_technical_foul = false">
            <view class="popup-container">
                <view class="popup-title">Technical Foul</view>
                <view class="flex items-center gap-23 w-full mt-16">
                    <u-button class="primary-yellow h-70" text="Home"></u-button>
                    <u-button class="primary-green h-70" text="Away"></u-button>
                </view>
            </view>
        </u-popup>

        <!-- free throw -->
        <u-popup :show="show_free_throw" round="16px" mode="center" closeable @close="handleFreeThrowCloseFun">
            <view class="popup-container">
                <view class="popup-title">Free Throw</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <CheckBox :list="bothSides" v-model="checkFreeThrowTeam"/>
                    <CheckBox :list="freeThrowPoints" v-model="checkFreeThrowPoint"/>
                    <view class="divide-line"></view>
                    <view class="flex items-center gap-23 w-full">
                        <u-button class="primary-blue h-70" :disabled="(!checkFreeThrowTeam || !checkFreeThrowPoint)" @click="handleFreeThrowFun('in')">In</u-button>
                        <u-button class="primary-orange h-70" :disabled="(!checkFreeThrowTeam || !checkFreeThrowPoint)" @click="handleFreeThrowFun('miss')">Miss</u-button>
                    </view>
                </view>
            </view>
        </u-popup>

        <!-- time stop -->
        <u-popup :show="show_time_stop" round="16px" mode="center" closeable @close="show_time_stop = false">
            <view class="popup-container">
                <view class="popup-title">Time Stop</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <u-button class="primary-blue h-42" text="Out of Bound" @click="handleShowBothSidesFun('Out of Bound')"></u-button>
                    <u-button class="primary-blue h-42" text="Time Out" @click="handleShowBothSidesFun('Time Out')"></u-button>
                    <u-button class="primary-blue h-42" text="Play Injury" @click="handleShowBothSidesFun('Play Injury')"></u-button>
                    <u-button class="primary-green h-42" text="Coach Challenge"></u-button>
                    <u-button class="primary-green h-42" text="VAR Checking"></u-button>
                    <view class="divide-line"></view>
                    <u-input placeholder="Need custom text?" fontSize="12" :border="'none'" customStyle="height:38px;border-radius:9px;display:block;width:100%;border:1px solid #0A70F5;padding:0 0 0 12px;overflow:hidden;" >
                        <template slot="suffix">
                            <u-button text="Send" class="primary-blue" size="mini"></u-button>
                        </template>
                    </u-input>
                </view>
            </view>
        </u-popup>

        <!-- HOME AWAY 只有主客队按钮的弹窗 -->
        <u-popup :show="show_both_sides" round="16px" mode="center" closeable @close="show_both_sides = false">
            <view class="popup-container">
                <view class="popup-title">{{ popupBothSidesName }}</view>
                <view class="flex items-center gap-23 mt-16">
                    <u-button class="primary-yellow h-70" text="Home"></u-button>
                    <u-button class="primary-green h-70" text="Away"></u-button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import CheckBox from '@/components/checkbox'
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
            
            
            adjustTime: {
                min: 1,
                sec: 1
            },
            // 弹窗是否显示
            show_other: false,
            show_status: false,
            show_quarter_start: false,
            show_quarter_start_comfirm: false,
            show_quarter_end_comfirm: false,
            show_sos: false,
            show_point: false,
            point_score: 2, // 2 or 3
            point_team: 'home', // home or away
            show_foul: false,
            show_technical_foul: false,
            show_free_throw: false,
            show_time_stop: false,
            show_both_sides: false,  // 只有主客队按钮的弹窗
            popupBothSidesName: '', // 只有主客队按钮的弹窗 title

            // free throw 的选择值
            checkFreeThrowTeam: 'home', // free throw 选择的队伍, 默认选择 home
            checkFreeThrowPoint: '2', // free throw 选择的分数，默认选择 2

            // 小字典
            bothSides: [
                { label: 'Home', value: 'home' },
                { label: 'Away', value: 'away' }
            ],
            freeThrowPoints: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
            ],       

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
    components: {
        CheckBox
    },
    methods: {
        onLoad(option) {
            this.lang = uni.getLocale();
        },

        onShow() {},

        handleFreeThrowFun(type) {
            console.log('选择的队伍：', this.checkFreeThrowTeam, ' 分数：', this.checkFreeThrowPoint, ' type:', type)
        },

        handleFreeThrowCloseFun() {
            this.show_free_throw = false
            this.checkFreeThrowTeam = 'home'
            this.checkFreeThrowPoint = '2'
        },

        handleShowBothSidesFun(name) {
            this.show_both_sides = true
            this.show_time_stop = false
            this.popupBothSidesName = name
        },

        handleGotoModify() {
            this.$u.route({
				url: 'pages/modify/index',
				type: 'navigateTo',
			})
        },

        // 小节开始二次确认
        handleQuarterComfirm(type) {
            this.show_quarter_start = false
            this.show_quarter_start_comfirm = true
        },

        // 小节结束确认弹窗
        handleQuarterEndComfirm() {
            this.show_quarter_end_comfirm = false
        },

        handleComfirm() {
            this.show_quarter_start_comfirm = false
        },
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

.input-box {
    &.u-grid-item--hover-class {
        opacity: 1;
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
                font-family: 'Alternate-Bold';
            }
            p {
                line-height: 1.375;
            }
        }
        .middle-row {
            /deep/ .u-button__text {
                font-size: 16px !important;
            }
        }
    }
}

// 弹窗
.popup-container {
    width: 295px;
    background-color: #fff;
    padding: 0 24px 24px;
    border-radius: 16px;
    overflow: hidden;
    font-family: PingFangSC-Medium, PingFang SC;
    .popup-title {
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        color: rgba(0,0,0,0.9);
        line-height: 25px;
        padding: 10px 0 11px;
    }
}

// 模态框
/deep/ .u-popup__content {
    border-radius: 16px !important;
    .modal-content {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(0,0,0,0.9);
        line-height: 25px;
        text-align: center;
    }
    .u-modal__button-group__wrapper--hover {
        background: #EEEEEE;
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
.primary-yellow {
    background: linear-gradient(135deg, #FFA425 0%, #FF8800 100%);
    border: none;
    color: white;
}
.primary-orange {
    background: linear-gradient(135deg, #FF7C3C 0%, #FF5E1A 100%);
    border: none;
    color: white;
}

.h-42 {
    height: 42px;
}
.h-48 {
    height: 48px;
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
.mt-16 {
    margin-top: 16px;
}
.gap-23 {
    gap: 23px;
}
.gap-16 {
    gap: 16px;
}
.capitalize {
    text-transform: capitalize;
}

.divide-line {
    height: 1px;
    padding: 0 24px;
    background-color: #EEEEEE;
    width: 100%;
    box-sizing: content-box;
}


/deep/ .u-popup {
    .u-icon__icon {
        font-size: 12px !important;
        line-height: 12px !important;
        background-color: #F5F5F5;
        border-radius: 14px;
        padding: 5px;
        color: #7A7A7A;
    }
    .u-popup__content__close--top-right {
        top: 12px;
        right: 12px;
    }
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
