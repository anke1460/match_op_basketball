<template>
    <view>

        <!-- 头部 -->
        <view class="score-header u-type-primary-bg u-font-12 text-white">
            <!-- 比分 -->
            <view class="flex  justify-between u-padding-left-6  u-padding-top-36 u-padding-bottom-8">
                <view class="team flex flex-1 "><view class="w-full line-clamp-3 team-name text-center break-normal">H - {{home_team}}</view></view>
                <view customStyle="width:20px;">
                   <!-- <span :class="[calculateGoalLength > 2 ? 'small' : '']" class="goal flex-1">{{ goal[0] }}</span>
                    <span class="split">:</span>
                    <span :class="[calculateGoalLength > 2 ? 'small' : '']" class="goal flex-1">{{ goal[1] }}</span> -->
                </view>
                <view class="team flex flex-1 "><view class="w-full line-clamp-3 team-name text-center break-normal">A - {{guest_team}} </view></view>
            </view>
            <!-- 时间 -->
            <view class="timer-box flex items-center justify-between u-padding-left-38 u-padding-right-38 u-padding-bottom-24">
                <view class="sign core flex-1 white-text">{{ goal[0] }}</view>
                <view class="timer text-center">{{position_display}} {{match_time}}</view>
                <view class="sign core  flex-1  white-text">{{ goal[1] }}</view>
            </view>
        </view>
        
        <!-- 最新事件 -->
        <u-row class="event_content u-font-12"  :style="bg_color">
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
                    <u-button class="plain-blue" :text="$t('other')" @click="show_other = true"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-blue" :text="$t('status')" @click="show_status = true"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-blue" :text="$t('modify')" @click="handleGotoModify"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 第二行 -->
            <u-grid :border="false" col="2">
                <u-grid-item>
                    <u-button class="primary-red h-42" :text="$t('quarter_start')" @tap="show_quarter_start_comfirm = true"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="primary-green h-42" :text="$t('quarter_end')" @click="show_quarter_end_comfirm = true"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 第三行 -->
            <u-grid :border="false" col="3">
                <u-grid-item>
                    <u-button class="plain-orange" :text="$t('fouled_ut')" :plain="true" @click="handleShowBothSidesFun('Fouled Out')"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-orange" :text="$t('substitution')" :plain="true" @click="handleShowBothSidesFun('Substitution')"></u-button>
                </u-grid-item>
                <u-grid-item>
                    <u-button class="plain-red" text="SOS" :plain="true" @click="show_sos = true"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 第四行 -->
            <u-grid :border="false" col="3" customStyle="padding: 6px 0;" >
                <u-grid-item class="time-sign input-box" customStyle="padding: 2px 5px;">
                    <u-input v-model="adjustTime.min" :border="'none'"  type="number" inputAlign="center" clearable customStyle="padding:6px;border-radius:8px;border:1px solid #0A70F5;background-color:#fff;"/>
                </u-grid-item>
                <u-grid-item class="input-box" customStyle="padding: 2px 5px;">
                    <u-input v-model="adjustTime.sec" :border="'none'"  type="number" inputAlign="center" clearable customStyle="padding:6px;border-radius:8px;border:1px solid #0A70F5;background-color:#fff;"/>
                </u-grid-item>
                <u-grid-item customStyle="padding: 2px 5px;">
                    <u-button class="primary-blue" :text="$t('adjust_time')" @tap="sendAjustTime"></u-button>
                </u-grid-item>
            </u-grid>
            <!-- 大块儿按钮 -->
            <u-grid :border="false" col="3" class="big-button-box">
                <!-- 主队纵列 -->
                <u-grid-item>
                    <u-button class="big-button h-70" color="linear-gradient(135deg, #FFB925 0%, #FF5800 100%)" @tap="sendFreeThrow(true)">
                        <view><p>{{$t('event.home')}}</p><p>{{$t('free_throw')}}</p></view>
                    </u-button>
                    <u-button @click="showPoint(true, 1)" class="big-button flex items-center h-70 mt-8" color="linear-gradient(135deg, #FF643C 0%, #FF9E1A 100%)">
                        <span class="font-specail">1</span>
                        <view><p class="text-left">{{$t('event.home')}}</p><p class="text-left">{{$t('points')}}</p></view>
                    </u-button>
                  <!--  <u-button class="big-button h-70 mt-8" color="linear-gradient(135deg, #FFB925 0%, #FF5800 100%)" @tap="sendRebound(true)">
                        <view><p>Home</p><p>Rebound</p></view>
                    </u-button> -->
                    <u-button @click="showPoint(true, 2)" class="big-button flex items-center h-70  mt-8" color="linear-gradient(135deg, #FF643C 0%, #FF9E1A 100%)">
                        <span class="font-specail">2</span>
                        <view><p class="text-left">{{$t('event.home')}}</p><p class="text-left">{{$t('points')}}</p></view>
                    </u-button>
                    <u-button class="big-button primary-red h-70 mt-8" @tap="sendAttack(true)">
                        <view><p>{{$t('event.home')}}</p><p>{{$t('possession')}}</p></view>
                    </u-button>
                </u-grid-item>
                <!-- 中间 -->
                <u-grid-item class="middle-row">
                    <u-button class="primary-blue h-70" :text="$t('foul')" @click="show_foul = true"></u-button>
                    <u-button class="primary-red h-70 mt-8" :text="$t('time_out')" @click="handleShowBothSidesFun('Time Out')"></u-button>
                    <u-button class="primary-blue h-70 mt-8" :text="$t('out_bound')" @click="show_outofbound = true"></u-button>
                    <!-- <u-button class="primary-red h-70 mt-8" text="Free Throw" @click="show_free_throw = true"></u-button> -->
                    <u-button class="plain-orange h-70 mt-8" :text="$t('time_stop')" :plain="true" @click="sendTimeout"></u-button>
                </u-grid-item>
                <!-- 客队纵列 -->
                <u-grid-item>
                    <u-button class="big-button primary-green h-70" @tap="sendFreeThrow(false)">
                        <view><p>{{$t('event.away')}}</p><p>{{$t('free_throw')}}</p></view>
                    </u-button>
                    <u-button @click="showPoint(false, 1)" class="big-button h-70 mt-8" color="linear-gradient(135deg, #A1D321 0%, #43B800 100%)">
                        <span class="font-specail">1</span>
                        <div><p>{{$t('event.away')}}</p><p>{{$t('points')}}</p></div>
                    </u-button>
                  <!--  <u-button class="big-button primary-green h-70 mt-8" @tap="sendRebound(false)">
                        <view><p>Away</p><p>Rebound</p></view>
                    </u-button> -->
                    <u-button @click="showPoint(false, 2)" class="big-button flex items-center h-70  mt-8" color="linear-gradient(135deg, #1CCEB9 0%, #00B3A1 100%)">
                        <span class="font-specail">2</span>
                        <view><p class="text-left">{{$t('event.away')}}</p><p class="text-left">{{$t('points')}}</p></view>
                    </u-button>
                    <u-button class="big-button h-70 mt-8" color="linear-gradient(135deg, #1CB8CE 0%, #008BB3 100%)" @tap="sendAttack(false)">
                        <view><p>{{$t('event.away')}}</p><p>{{$t('possession')}}</p></view>
                    </u-button>
                </u-grid-item>
            </u-grid>
        </view>

        <!-- 弹窗部分 -->
        <!-- status -->
        <u-popup :show="show_other" round="16px" mode="center" closeable @close="show_other = false">
            <view class="popup-container">
                <view class="popup-title">{{$t('other')}}</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <u-button class="primary-blue h-42" text="Player warm-up" @tap="sendOther('Player warm-up')"></u-button>
                    <u-button class="primary-blue h-42" text="Players coming out" @tap="sendOther('Players coming out')"></u-button>
                    <u-button class="primary-blue h-42" text="Game will start soon" @tap="sendOther('Game will start soon')"></u-button>
                    <u-button class="primary-green h-42" text="Play Injury" @click="handleShowBothSidesFun('Play Injury')"></u-button>
                    <u-button class="primary-green h-42" text="Coach Challenge" @tap="sendOther('Coach Challenge')"></u-button>
                    <u-button class="primary-green h-42" text="VAR Checking" @tap="sendOther('VAR Checking')"></u-button>
                    <view class="divide-line"></view>
                    <u-input :placeholder="$t('custome_text')" fontSize="12" :border="'none'" v-model="custom_text"  customStyle="height:38px;border-radius:9px;display:block;width:100%;border:1px solid #0A70F5;padding:0 0 0 12px;overflow:hidden;" >
                        <template slot="suffix">
                            <u-button :text="$t('send')" class="primary-blue" size="mini" @tap="sendOther"></u-button>
                        </template>
                    </u-input>
                </view>
            </view>
        </u-popup>

        <!-- status -->
        <u-popup :show="show_status" round="16px" mode="center" closeable @close="show_status = false">
            <view class="popup-container">
                <view class="popup-title">{{$t('status')}}</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <!-- <u-button class="primary-blue h-42" text="Match Cancel" @tap="sendEventPk('b_match_cancel', 'show_status')"></u-button> -->
                    <u-button class="primary-red h-42" :text="$t('game_over')" @tap="sendEventPk('b_game_over', 'show_status')"></u-button>
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
            :cancelText="$t('cancel')" 
            :confirmText="$t('confirm')" 
            confirmColor="#0A70F5" 
            width="295"
            @confirm="handleQuarterComfirm"
            @cancel="show_quarter_start_comfirm = false"
        >
            <template #default>
                <view class="modal-content">{{$t('confirm_text')}}</view>
            </template>
        </u-modal>

        <!-- quarter end -->
        <u-modal 
            :show="show_quarter_end_comfirm" 
            :showCancelButton="true" 
            :cancelText="$t('cancel')" 
            :confirmText="$t('confirm')" 
            confirmColor="#0A70F5" 
            width="295"
            @confirm="handleQuarterEndComfirm"
            @cancel="show_quarter_end_comfirm = false"
        >
            <template #default>
                <view class="modal-content">{{position > 1 ? 'Game Over ' : ''}}{{$t('confirm_text')}}</view>
            </template>
        </u-modal>
        
        <!-- home point -->
        <u-popup :show="show_point" round="16px" mode="center" closeable @close="show_point = false">
            <view class="popup-container">
                <view class="popup-title"><text> {{ points_title }}</text></view>
                <view class="flex items-center gap-23 mt-16">
                    <u-button class="primary-blue h-70" :text="$t('in')" @tap="sendGoal('in')"></u-button>
                    <u-button class="primary-orange h-70" :text="$t('miss')" @tap="sendGoal('miss')"></u-button>
                </view>
            </view>
        </u-popup>

        <!-- SOS -->
        <u-popup :show="show_sos" round="16px" mode="center" closeable @close="show_sos = false">
            <view class="popup-container">
                <view class="popup-title">SOS</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <u-button class="primary-red h-42" :text="$t('match_disconnect')" @tap="send_disconnect"></u-button>
                    <u-button class="primary-green h-42" :text="$t('match_connect')" @tap="send_connect"></u-button>
                </view>
            </view>
        </u-popup>
       <!-- out of bound -->
        <u-popup :show="show_outofbound" round="16px" mode="center" closeable @close="show_outofbound = false">
            <view class="popup-container">
                <view class="popup-title">{{$t('out_bound')}}</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <view class="flex items-center gap-23 w-full">
                        <u-button class="primary-yellow h-70" :text="$t('home')" @tap="sendOutofbound(true)"></u-button>
                        <u-button class="primary-green h-70" :text="$t('away')" @tap="sendOutofbound(false)"></u-button>
                    </view>
                </view>
            </view>
        </u-popup>
        <!-- Foul -->
        <u-popup :show="show_foul" round="16px" mode="center" closeable @close="show_foul = false">
            <view class="popup-container">
                <view class="popup-title">{{$t('foul')}}</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <view class="flex items-center gap-23 w-full">
                        <u-button class="primary-yellow h-70" :text="$t('home')" @tap="sendFoul(true)"></u-button>
                        <u-button class="primary-green h-70" :text="$t('away')" @tap="sendFoul(false)"></u-button>
                    </view>
                    <u-button class="primary-blue h-48" :text="$t('technical_foul')" @click="show_technical_foul = true;show_foul = false"></u-button>
                </view>
            </view>
        </u-popup>
        <u-popup :show="show_technical_foul" round="16px" mode="center" closeable @close="show_technical_foul = false">
            <view class="popup-container">
                <view class="popup-title">{{$t('technical_foul')}}</view>
                <view class="flex items-center gap-23 w-full mt-16">
                    <u-button class="primary-yellow h-70" :text="$t('home')" @tap="sendTechFoul(true)"></u-button>
                    <u-button class="primary-green h-70" :text="$t('away')" @tap="sendTechFoul(false)"></u-button>
                </view>
            </view>
        </u-popup>

        <!-- free throw -->
        <u-popup :show="show_free_throw" round="16px" mode="center" closeable @close="handleFreeThrowCloseFun">
            <view class="popup-container">
                <view class="popup-title">{{$t('free_throw')}} - {{checkFreeThrowTeam == "home" ? " " + $t('home') : $t('away')}}</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <CheckBox :list="freeThrowPoints" v-model="checkFreeThrowPoint" @input="freeThrowPoint" :team="checkFreeThrowTeam"/>
                    <view class="divide-line"></view>
                    <view class="flex items-center gap-23 w-full">
                        <u-button class="primary-blue h-70"  @click="handleFreeThrowFun('b_ft_goal')">{{$t('in')}}</u-button>
                        <u-button class="primary-orange h-70"  @click="handleFreeThrowFun('b_ft_miss')">{{$t('miss')}}</u-button>
                    </view>
                </view>
            </view>
        </u-popup>

        <!-- time stop -->
        <u-popup :show="show_time_stop" round="16px" mode="center" closeable @close="show_time_stop = false">
            <view class="popup-container">
                <view class="popup-title">{{$t('time_stop')}}</view>
                <view class="flex flex-col items-center gap-16 mt-16">
                    <u-button class="primary-blue h-42" text="Time Out" @click="handleShowBothSidesFun('Time Out')"></u-button>
                    <u-button class="primary-blue h-42" text="Play Injury" @click="handleShowBothSidesFun('Play Injury')"></u-button>
                    <u-button class="primary-green h-42" text="Coach Challenge" @tap="sendOther('Coach Challenge')"></u-button>
                    <u-button class="primary-green h-42" text="VAR Checking" @tap="sendOther('VAR Checking')"></u-button>
                    <view class="divide-line"></view>
                    <u-input placeholder="Need custom text?" fontSize="12" :border="'none'" v-model="custom_text" customStyle="height:38px;border-radius:9px;display:block;width:100%;border:1px solid #0A70F5;padding:0 0 0 12px;overflow:hidden;" >
                        <template slot="suffix">
                            <u-button text="Send" class="primary-blue" size="mini" @tap="sendOther"></u-button>
                        </template>
                    </u-input>
                </view>
            </view>
        </u-popup>

        <!-- HOME AWAY 只有主客队按钮的弹窗 -->
        <u-popup :show="show_both_sides" round="16px" mode="center" closeable @close="show_both_sides = false">
            <view class="popup-container">
                <view class="popup-title">{{ popTitle }}</view>
                <view class="flex items-center gap-23 mt-16">
                    <u-button class="primary-yellow h-70" :text="$t('home')" @tap="sendNormalEvent(true)"></u-button>
                    <u-button class="primary-green h-70" :text="$t('away')" @tap="sendNormalEvent(false)"></u-button>
                </view>
            </view>
        </u-popup>
        <u-popup :show="op_disabled" round="16px" mode="center" :overlayStyle="{zIndex: 99099}" zIndex="9999999">
        	<view class="popup-container">
        		<view class="u-text-center color-red">Hi!</view>
        		<view class="color-red">Operation is frozen. Please contact duty officer</view>
        		<view class="btn-content">
        			<u-button color="#2A8EFE" text="Refresh" size="large"
        				customStyle="height:40px;board-radius: 12px; margin-top:20px;" @tap="setMatchTime()">
        			</u-button>
        		</view>
        	</view>
        </u-popup>
        <u-notify ref="uNotify" message=""></u-notify>
    </view>
</template>

<script>
import CheckBox from '@/components/checkbox'
import {
    transEvents,
    transMpStatus,
    transDescPks,
    transRhythms,
    matchEvent,
    game_time_display,
} from "./../../utils.js";

export default {
    data() {
        return {
            is_blink: "",
            adjustTime: {
                min: '',
                sec: ''
            },
            bg_color: "background-color: #085BC9",
            match_events: {},
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
            show_outofbound: false,
            show_technical_foul: false,
            show_free_throw: false,
            show_time_stop: false,
            show_both_sides: false,  // 只有主客队按钮的弹窗
            popupBothSidesName: '', // 只有主客队按钮的弹窗 title
            popTitle: '',
            // free throw 的选择值
            checkFreeThrowTeam: '', // free throw 选择的队伍, 默认选择 home
            checkFreeThrowPoint: '', // free throw 选择的分数，默认选择 2

            // 小字典
            bothSides: [
                { label: 'Home', value: 'home' },
                { label: 'Away', value: 'away' }
            ],
            freeThrowPoints: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
               // { label: '3', value: '3' },
            ],       

            custom_text: "",
            event_title: "",
            rekick_title: "",
            team: "", // 事件主客队
            event_text: "", //发送事件内容
            match_id: "",
            match_time: "", // 比赛时间,
            event_time: "", //事件时间
            event_content: "", //事件内容
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
            goal: [0, 0],
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
            position_display: "",
            team_langs: "",
            pk: "",
            status: '',
            position: '',
            points_title: "",
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
        game_time_display(game_time) {
          var m_ = "00'";
          var s_ = "00";
          if (game_time > 0) {
            var minutes = parseInt(game_time / 60);
            var seconds = game_time % 60;
            m_ = (minutes < 10 ? "0" : "") + minutes + "'";
            s_ = (seconds < 10 ? "0" : "") + seconds;
          }
          return m_ + s_;
        },
        
        onLoad(option) {
            this.lang = uni.getLocale();
            if (uni.getStorageSync('token') != '') {
            this.match_id = uni.getStorageSync('match_id');
            uni.$u.http.get(`basketball/match_input/${this.match_id}/init`, {}, {withCredentials: true}).then(res => {
                this.home_team = res.data.home_team;
                this.guest_team = res.data.guest_team;
                this.goal = [res.data.home_score, res.data.guest_score];
                this.match_events = res.data.match_events;
                this.team_langs = res.data.team_langs;
                this.status = res.data.status;
                this.position = res.data.position;
                
                if (res.data.event_time) {
                    this.event_time = res.data.event_time;
                    this.event_content = res.data.event_content;
                }
                
            })
            if (pullSet) {
               clearInterval(pullSet)
            }
            if (this.time_inter) {
               clearInterval(this.time_inter);
            }
            pullSet = setInterval(()=> {
                uni.$u.http.get(`basketball/match_input/${this.match_id}/pull`, {}, {withCredentials: true}).then(res => {
                });
                this.setMatchTime();
            }, 10000)
        } else {
            setTimeout(() => {
                uni.$u.route({
                    url: 'pages/login/login',
                    type: 'reLaunch'
                })
            }, 200)
        }
        },

        onShow() {
            uni.$u.http.get(`basketball/match_input/${this.match_id}/init`, {}, {withCredentials: true}).then(res => {
                this.home_team = res.data.home_team;
                this.guest_team = res.data.guest_team;
                this.goal = [res.data.home_score, res.data.guest_score];
                this.match_events = res.data.match_events;
                this.team_langs = res.data.team_langs;
                this.status = res.data.status;
                this.position = res.data.position;
                this.position_display = res.data.position_display;
                
                if (res.data.event_time) {
                    this.event_time = res.data.event_time;
                    this.event_content = res.data.event_content;
                }
                
            })
          this.setMatchTime();
        },
        setMatchTime(fn) {
        	uni.$u.http.get(`basketball/match_input/${this.match_id}/match_time`, {}, {withCredentials: true}).then(res => {
        		this.match_sec = res.data.game_time;
                this.status = res.data.status;
                this.position = res.data.position;
                this.position_display = res.data.position_display;
        		
        		this.match_time = this.game_time_display(res.data.game_time)
        		if (res.data.status !== 1) {
        			if (this.time_inter) {
        				clearInterval(this.time_inter);
        				this.time_inter = null;
        			}
        		} else {
        			if (!this.time_inter) {
        				this.time_inter = setInterval(()=> {
                            if (this.match_sec > 0) {
                                if (this.position > 1) {
                                    this.match_sec += 1;
                                } else {
                                    this.match_sec -= 1;
                                }
                                
                            }
        					this.match_time  = this.game_time_display(this.match_sec)
        				}, 1000)
        			}
        		}
                
                if (this.op_disabled && res.data.app_op == null) {
                	window.location.reload()
                }
                this.op_disabled = res.data.app_op == 1;
        	}, (res) => {
        		this.$refs.uNotify.show({
        			top: 10,
        			type: 'error',
        			color: '#fff',
        			bgColor: '#e5291e',
        			message: 'Network connection failed',
        			duration: 1000 * 2,
        			fontSize: 20,
        			safeAreaInsetTop:true
        		})
        	})
        },
        
        showPoint(is_home, point) {
           this.show_point = true; 
           this.point_score = point;
           this.point_team = is_home ? 'home' : 'away';
           
           if (this.lang == 'zh-Hans') {
               this.points_title = (is_home ? '主队' : "客队") + "-" + point + "分";
           } else {
               this.points_title = (is_home ? 'Home' : "Away") + "-" + point + "Points";
           }
        },

        handleFreeThrowFun(type) {
           this.sendEvent({
               team: this.checkFreeThrowTeam == 'home' ? 'home' : 'guest',
               pk: type,
               game_time: this.match_sec
           })
        },

        handleFreeThrowCloseFun() {
            this.show_free_throw = false
            this.checkFreeThrowTeam = ''
            this.checkFreeThrowPoint = ''
        },

        handleShowBothSidesFun(name) {
            this.show_both_sides = true
            this.show_time_stop = false
            this.show_other = false;
            this.popupBothSidesName = name;
            if (this.lang == 'zh-Hans') {
                if (name == 'Time Out') {
                     this.popTitle = '暂停';
                } else if (name = 'Substitution') {
                     this.popTitle = '换人';
                } else if (name = 'Fouled Out') {
                     this.popTitle = '犯满';
                } else {
                    this.popTitle = name; 
                }
               
            } else {
                this.popTitle = name;
            }
           
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
            // this.show_quarter_start_comfirm = true
            this.show_quarter_start_comfirm = false;
            this.sendEvent({
             team: null,
             pk: 'b_quarter_start'
           })
        },

        // 小节结束确认弹窗
        handleQuarterEndComfirm() {
            this.show_quarter_end_comfirm = false
            this.sendEvent({
              game_time:  this.match_sec,
              team: null,
              pk: 'b_quarter_end'
            })
        },

        handleComfirm() {
            this.show_quarter_start_comfirm = false
        },
        
        sendAttack(is_home) {
           this.sendEvent({
               team: is_home ? 'home' : 'guest',
               pk: 'b_attack',
               game_time: this.match_sec
           }) 
        },
        
        sendEventPk(pk, show) {
           this.sendEvent({
               team: null,
               pk: pk,
               game_time: this.match_sec
           })
           this[show] = false;
        },
        freeThrowTeam(e) {
            console.log(e)
        },
        freeThrowPoint(value) {
            this.sendEvent({
                team: this.checkFreeThrowTeam == 'home' ? 'home' : 'guest',
                pk: 'b_ft',
                game_time: this.match_sec,
                data: value
            })
        },
        sendTimeout() {
            this.sendEvent({
                team: null,
                pk: 'b_pause',
                game_time: this.match_sec,
                min: '',
                sec: '',
                success: () => {
                  // this.show_time_stop = true   
                }
            })
        
        },
        sendFreeThrow(is_home) {
            this.show_free_throw = true;
            this.checkFreeThrowTeam =  is_home ? 'home' : 'guest'
        },
        sendOther(text) {
            if (text) {
                this.show_other = false;
                this.show_time_stop = false;
                this.sendEvent({
                    team: null,
                    pk: 'b_other_custom',
                    game_time: this.match_sec,
                    data: text
                })
            } else {
                if (this.custom_text.trim() != "") {
                    this.show_other = false;
                    this.show_time_stop = false;
                    this.sendEvent({
                        team: null,
                        pk: 'b_other_custom',
                        game_time: this.match_sec,
                        data: this.custom_text
                    })
                    this.custom_text = "";
                }
               
            }
        },
        sendGoal(type) {
            this.show_point = false;
            var g = type == 'in' ? 'p_goal' : 'p_miss';
            this.pk = 'b_' + this.point_score + g;
            this.sendEvent({
                team: this.point_team == 'home' ? 'home' : 'guest',
                pk: this.pk,
                game_time: this.match_sec,
            })
        },
        
        sendNormalEvent(is_home) {
            switch(this.popupBothSidesName) {
                case 'Fouled Out':
                  this.pk = 'b_fouled_out';
                  break;
                case 'Substitution':
                  this.pk = 'b_substitution';
                  break;
                case 'Out of Bound':
                  this.pk = 'b_out_of_bound';
                  break;
                case 'Time Out':
                  this.pk = 'b_timeout';
                  break;
                case 'Play Injury':
                  this.pk = 'b_other_custom';
                  break;
            }
            this.show_both_sides = false;
            if (this.popupBothSidesName == 'Play Injury') {
                this.sendEvent({
                    team: '',
                    pk: this.pk,
                    game_time: this.match_sec,
                    data: "Play Injury " + (is_home ? "home" : "guest")
                })
            } else {
                this.sendEvent({
                    team: is_home ? 'home' : 'guest',
                    pk: this.pk,
                    game_time: this.match_sec,
                })
            }
           
        },
        
        sendAjustTime() {
          if (this.adjustTime.min == "" || this.adjustTime.sec == "") {
              this.$refs.uNotify.show({
              	top: 10,
              	type: 'error',
              	color: '#fff',
              	bgColor: '#e5291e',
              	message: 'Both Min and Sec can not be empty string !',
              	duration: 1000 * 2,
              	fontSize: 20,
              	safeAreaInsetTop:true
              })
          } else if (this.adjustTime.min < 0 || this.adjustTime.sec < 0) {
              this.$refs.uNotify.show({
              	top: 10,
              	type: 'error',
              	color: '#fff',
              	bgColor: '#e5291e',
              	message: 'Min/Sec format is incorrect !',
              	duration: 1000 * 2,
              	fontSize: 20,
              	safeAreaInsetTop:true
              })
          } else {
              this.match_sec = parseInt(this.adjustTime.min * 60) + parseInt(this.adjustTime.sec);
              this.sendEvent({
                  team: '',
                  pk: 'b_adjust_time',
                  position: this.position,
                  status: this.status,
                  min: this.adjustTime.min,
                  sec: this.adjustTime.sec,
                  game_time: this.match_sec,
              })
              this.adjustTime.min = "";
              this.adjustTime.sec = "";
          }
        },
        send_disconnect() {
          this.show_sos = false;  
          this.sendEvent({
              team: null,
              pk: 'b_match_disconnect',
              game_time: this.match_sec,
          })
        },
        
        send_connect() {
          this.show_sos = false;  
          this.sendEvent({
              team: null,
              pk: 'b_match_connect',
              game_time: this.match_sec,
          })
        },
        
        sendOutofbound(is_home) {
            this.show_outofbound = false;
            this.sendEvent({
                team: is_home ? 'home' : 'guest',
                pk: 'b_out_of_bound',
                game_time: this.match_sec,
              
            })
        },
        
        sendFoul(is_home) {
          this.show_foul = false;
          this.sendEvent({
              team: is_home ? 'home' : 'guest',
              pk: 'b_foul',
              game_time: this.match_sec,
          })
        },
        
        sendTechFoul(is_home) {
            this.show_technical_foul = false;
            this.sendEvent({
                team: is_home ? 'home' : 'guest',
                pk: 'b_tf',
                game_time: this.match_sec,
            })
        },
        
        sendRebound(is_home) {
            this.sendEvent({
                team: is_home ? 'home' : 'guest',
                pk: 'b_rebound',
                game_time: this.match_sec,
            })
        },
        
        sendEvent(params) {
        if (params.pk == 'b_foul') {
            if (this.time_inter) {
            	clearInterval(this.time_inter);
            	this.time_inter = null;
            }
        }
         uni.$u.http.post(`basketball/match_input/${this.match_id}/create_event`, params, {withCredentials: true}).then(res => {
             if (res.data.success == false) {
                 
                if (res.data.app_op) {
                    this.op_disabled = true;
                } else {
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
              }
             } else {
                 if (params.pk != 'b_adjust_time') {
                     // 调整事件不需要提示闪烁
                    this.is_blink = 'blink';
                 }
               if (params.success) {
                  params.success()
               }
                if (res.data.data) {
                  if (params.pk != 'b_adjust_time') {
                      setTimeout(() => {
                        this.is_blink = '';
                      }, 2000)
                      this.bg_color = "background-color: #" + res.data.data.color;
                                  
                      this.event_time = res.data.data.occur_at;
                      var team = res.data.data.match_team_id ? this.team_langs[res.data.data.match_team_id][this.lang == 'en' ? 'en' : 'zh_cn'] : "";
                      if (res.data.data.text) {
                          this.event_content = this.match_events[res.data.data.match_event_id][this.lang == 'en' ? 'en' : 'zh_cn'] + "(" + res.data.data.text + ") " + team ;
                      } else {
                          if (res.data.data.match_event_id) {
                              this.event_content = this.match_events[res.data.data.match_event_id][this.lang == 'en' ? 'en' : 'zh_cn'] + " " + team ;
                          }
                      }
                      this.status = res.data.data.status;
                  }
                  this.freshMatchTime(res.data.data.time_stop, res.data.data.position_display, res.data.data.game_time)
                 }
                 if (res.data.callback) {
                     if (res.data.callback.goal) {
                         if (res.data.callback.goal.team == 'home') {
                            var score = this.goal[1];
                            this.goal = [res.data.callback.goal.score, score]
                         } else {
                            var score = this.goal[0];
                            this.goal = [score, res.data.callback.goal.score]
                         }
                     }
                 }
             }
         })   
        },
        freshMatchTime(time_stop, position_display, game_time) {
            this.match_sec = game_time;
            this.position_display = position_display;
            
            this.match_time = this.game_time_display(game_time)
            if (time_stop) {
            	if (this.time_inter) {
            		clearInterval(this.time_inter);
            		this.time_inter = null;
            	}
            } else {
            	if (!this.time_inter) {
            		this.time_inter = setInterval(()=> {
                        if (this.position > 1) {
                            this.match_sec += 1;
                        } else {
                            this.match_sec -= 1;
                        }
            			this.match_time  = this.game_time_display(this.match_sec)
            		}, 1000)
            	}
            }
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
.team-name {
    font-size: 16px;
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
            width: 144px;
        }
        .sign {
            color: #fff;
            padding: 0 27px;
        }
    }
}
.event_content {
    height: 40px;
    line-height: 20px;
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
        width: 84px;
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
