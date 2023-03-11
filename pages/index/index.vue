<template>
	<view class="bg">
		<view class="score-header">
		 <u-row class="" customStyle="height: 68px;">
				<u-col span="4">
					<view class="u-text-center">
						<text class="team">
							{{home_team}}
						</text>
					</view>
				</u-col>
				<u-col span="4" class="u-text-center">
					<view class="u-text-center score">
						<text>{{goal[0]}}</text>
						<text class="split">:</text>
						<text>{{goal[1]}}</text>
					</view>
				</u-col>
				<u-col span="4">
					<view class="u-text-center">
						<text class="team">
							{{guest_team}}
						</text>
					</view>
				</u-col>
		 </u-row>
		 <!-- 红黄牌数 -->
		 <u-row>
			<u-col span="4">
				<view class="u-text-center flex-center">
					<view class="bb">
						<img src="/static/red.png" class="s-btn">
					  <text class="s-num">{{red_card[0]}}</text>
					</view>
					<view class="bb">
						<img src="/static/yellow.png" class="s-btn">
						 <text class="s-num">{{yellow_card[0]}}</text>
					</view>
					<view class="bb">
						<img src="/static/qizhi.png" class="s-btn">
						<text class="s-num">{{corner[0]}}</text>
					</view>
				</view>
			 </u-col>
			 <u-col span="4">
				<view class="u-text-center">
					<text class="time">
						{{match_time}}
					</text>
				</view>
			 </u-col>
			 <u-col span="4">
				<view class="u-text-center flex-center">
					<view class="bb">
						<img src="/static/red.png" class="s-btn">
						<text class="s-num">{{red_card[1]}}</text>
					</view>
					<view class="bb">
						<img src="/static/yellow.png" class="s-btn">
						 <text class="s-num">{{yellow_card[1]}}</text>
					</view>
					<view class="bb">
						<img src="/static/qizhi.png" class="s-btn">
						 <text class="s-num">{{corner[1]}}</text>
					</view>
				</view>
			 </u-col>
		 </u-row>
	 </view>
	 <view>
		 <!-- 最新事件 -->
		 <u-row class="event_content " :style="bg_color">
				 <view class="u-flex" >
				 	<text class="notice-icon"></text>
				 	<text class="last-event-time" :class="is_blink">{{event_time}}</text>
				</view>
			 <view class="event-head-content" :class="is_blink" >
				 <text>{{event_content}}</text>
			 </view>
		 </u-row>
	 </view>
	
	

	<u-notify ref="uNotify" message=""></u-notify>
	</view>

</template>

<script>
import {
	transOtherEvents,
	transEvents,
	transMpStatus,
	transDescPks,
	transRhythms,
	matchEvent
} from './../../utils.js'
	export default {
		data() {
			return {
				is_blink: '',
				bg_color: "background-color: #085BC9",
				show_alert: false,
				show_confirm: false,
				home_away_show: false,
				shoot_show: false,
				standby_show: false,
				throwin_show: false,
				free_kick_show: false,
				last_team: '',
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
				event_title: '',
				rekick_title: '',
				team: '', // 事件主客队
				event_text: '',//发送事件内容
				match_id: '',
				match_time: '', // 比赛时间,
				event_time: '', //事件时间
				event_content: '',//事件内容
				injury_time: '',
				match_sec: 0,
				youth_race: '',
				hasExtraTime: '',
				pos: '',
				time_inter: null,
				load_num : 1,
				home_score: '',
				guest_score: '',
				home_team: '',
				guest_team: '',
				game_time: {},
				red_card: [0, 0],
				yellow_card: [0, 0],
				goal: [0, 0],
				shoot_on: [0,0], //射门
				corner: [0, 0],
				transTeams: {},
				delete_events: [],
				event_options: {},
				lang: "",
				home_text: "Home",
				guest_text: "Away",
				mp_id: '',
				last_event: '',
				op_disabled: false,
				last_event_title: ''
			}
		},
		methods: {
			onLoad(option) {
				this.lang = uni.getLocale();
			},
			onShow() {
			},
		
		}
	}

</script>

<style lang="scss">
	page {
		background-color: #333;
	}
	.injury-time {
		display: flex;
	  justify-content: space-between;
		margin-top: 10px;
	}
	
	.white-border {
		border: 1px solid #fff;
	}
	
	.click-btn:active {
		opacity: 0.5;
	}
	.pop-title {
		font-size: 16px;
		color: #000;
		display: block;
	}
	
	.bb {
		background-color: #2864cf;
		width: 28px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
	}
	
	.notice-icon {
		width: 20px;
		height: 20px;
		margin-right: 8px;
		background-size: cover;
		background-image: url("./../../static/notice.png");
	}
	
	.minus, .plus {
		height: 25px;
	}
	.minus-icon {
		width: 25px;
		height: 25px;
	}
	.delete-list {
		color: #000;
		width: 100% !important;
	}
	.tip-content {
		padding: 10px;
	}
	.white-text {
		color: #fff;
	}
	.pop-bg {
		background-color: #fff;
		font-size: 18px;
		padding: 15px;
		width: 300px;
		border-radius: 16px;
	}
	.close-wraper {
		text-align: center;
		position: relative;
	}
	
	.event-head-content {
		padding-left: 10px;
		height:32px;
		flex: 1;
		overflow: hidden;
	}
	
	
	.event-title {
		font-weight: bold;
		margin: 0 10px;
	}
	
	.close-img {
		width: 30px;
		height: 30px;
		position: absolute;
		right: -8px;
		top: -4px;
	}
	
	.btn-content {
		font-size: 20px;
	}
	
	.danger-border-btn {
    font-size: 10px !important;
		border: 1px solid #FF7C3C;
    background: rgba(255,136,0,0.08) !important;
		color: #FF7C3C !important;
		line-height: 18px !important;
		padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
	}
	
	.injury-btn-group {
		display: flex;
		padding: 20px 0px;
		justify-content: space-between;
		width: 100%;
	}
	.event_boy {
	  min-height: calc(100vh - 247px);
	}
	.line {
		background: #eee;
		height: 1px;
		border: none;
		// width: 100%;
		// margin-bottom: 15px;
	}
	.bg {
		height: 100%;
		background-color:#333;
	}
	.shoot-btn {
		background-color: rgba(0, 191, 191, 1);
	}
	.m-auto {
		margin: 0 auto;
	}
	
	.flex-1{ 
		flex: 1;
		justify-content: space-around;
		display: flex;
	}
	
	.margin-bottom-20 {
		margin-bottom: 20px;
	}
	.m-img {
		width: 12px;
		height: 12px;
		margin: 0 auto;
		display: block;
	}
	.w-16 {
		width: 16px;
		height: 16px;
	}
	
	.red-border {
		border: 1px solid #F5483B;
	}
	
	.red-text {
		color: #fff;
	}
	
	.color-red {
		color: red;
	}
	.white-text {
		color: #fff;
	}
	
	.delete-img {
		width: 18px;
		height: 18px;
	}
	
	.m-btn {
		padding: 0px 5px;
		margin: 5px auto;
		border-radius: 10px;
		font-weight: bold;
	}
	
	.brown-btn {
		width: 70px;
		height: 38px;
		border-radius: 8px;
		border: 1px solid #FE8800;
		color: #FE8800;
		font-size: 12px;
		font-weight: 600;
		text-align: center;
		flex-direction: column;
		justify-content: center;
		display: flex;
	}
	
	.green-btn {
		width: 68px;
		height: 50px;
		border-radius: 8px;
    background: linear-gradient(135deg, #1CCE72 0%, #00B365 100%);
		color: #fff;
		font-weight: 600;
		font-size: 14px;
		text-align: center;
		flex-direction: column;
		justify-content: center;
		display: flex;
	}
	.deleted-text {
	  text-decoration: line-through;
	}
	.event-time {
		color: #a3a3a3;
		margin-right: 17px;
	}
	.throwin-btn {
		background-color: rgba(2, 167, 240, 1);
	}
	
	.kick-btn {
		background-color: rgba(245, 154, 35, 1)
	}
	
	.red-btn {
		color: #fff;
		background: linear-gradient(135deg, #FE6557 0%, #F5483B 100%);
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		width: 68px;
		height: 50px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.red-bg {
		margin: 0 auto;
		width: 20px;
		height: 20px;
		background-color: red;
	}
	
	.sos-btn {
    background: linear-gradient(135deg, #FF3E2C 0%, #FF1200 100%) !important;
		color: #fff !important;
    border: none !important;
	}
	
	.yellow-btn {
		color: #fff;
		font-size: 14px;
		font-weight: 600;
    background: linear-gradient(135deg, #FFCE00 0%, #FFD527 0%, #FFC300 100%);
		border-radius: 8px;
		width: 68px;
		height: 50px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.yellow-bg {
		margin: 0 auto;
		width: 20px;
		height: 20px;
		background-color: yellow;
	}
	
	.sos {
		line-height: 38px;
	}
	
	.corner-btn {
		background-color: rgba(2, 167, 240, 1);
	}
	
	.off-btn {
		color: #fff;
		border: 2px solid #fff;
		padding: 15px 20px;
	}
	.injury-btn {
		color: #F59A23;
		border: 2px solid #F59A23;
		padding: 0px 25px;
	}
	
	.vodeo-btn {
		color: #00BFBF;
		border: 2px solid #00BFBF;
		padding: 0px 25px;
	}
	
	.sub-btn {
		color: #3eaf18;
		border: 2px solid #3eaf18;
	}
	.b-btn {
		width: 88px;
		height: 38px;
		line-height: 38px;
		text-align: center;
		font-size: 14px;
		border-radius: 8px;
		color: #fff;
		font-weight: 600;
	}
	
	.blue-btn {
		width: 88px;
		height: 50px;
		line-height: 50px;
		background: linear-gradient(135deg, #2A8EFE 0%, #0A70F5 100%);
		border-radius: 8px;
	}
	
	.around {
		margin-bottom: 12px;
		justify-content: space-between !important;
		padding: 0px 16px;
	}
	
	.other-btn {
		border: 1px solid #0A70F5;
		line-height: 38px;
		border-radius: 8px;
		width: 108px;
		height: 38px;
		color:#0A70F5 ;
		margin-top: 10px;
		background-color: #fff;
	}
	
	.margin-0 {
		margin-top: 0px;
	}
	
	.font10px {
		font-size: 12px;
		transform : scale(0.83,0.83);
		*font-size: 10px;
	}
	.dd-btn {
		background: linear-gradient(135deg, #FE6557 0%, #F5483B 100%);
		color: #fff;
		width: 100%;
		margin: 0 10px;
		height: 38px;
		font-weight: 600;
		border-radius: 8px;
		line-height: 38px;
	}
	.white-border-height {
		height: 50px !important;
		line-height: 50px !important;
	}
	.danger-btn {
		width: 98px;
		height: 50px;
		line-height: 50px;
		background: linear-gradient(135deg, #FF7C3C 0%, #FF5E1A 100%);
		border-radius: 8px;
	}
	.attack-btn {
		background: linear-gradient(135deg, #FFA425 0%, #FF8800 100%);
		border-radius: 8px;
		width: 88px;
		height: 50px;
		line-height: 50px;
	}
	
	.safe-btn {
		background-color: rgba(112, 182, 3, 1);
		color: #fff;
		padding: 20px 5px;
	}
	
	.penaly {
		width: 70px;
		height: 56px;
		font-weight: 600;
		font-size: 14px;
		text-align: center;
		font-weight: bold;
		border-radius: 12px;
		color: #fff;
    background: linear-gradient(135deg, #FE6557 0%, #F5483B 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
	}
	
	.close-game-btn {
		background-color: red;
		color: #fff;
		width: 98px;
		display: inline-block;
		margin: 5px auto;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		border-radius: 10px;
		padding: 5px 4px;
	}
	
	.goal-text {
		text-align: center;
		line-height: 19px;
		margin: 0 auto;
	}
	
	.goal-text-bg {
		color: #0A70F5;
		font-weight: bold;
		text-align: center;
		line-height: 19px;
		margin: 0 auto;
	}
	
	.ball-img {
		width: 26px;
		height: 26px;
		margin: 4px auto 0px;
		display: block;
	}
	.start-btn {
		width: 108px;
		display: inline-block;
		color: #fff;
		font-weight: bold;
		font-size: 14px;
		border-radius: 8px;
		background:linear-gradient(135deg, #2A8EFE 0%, #0A70F5 100%);
		text-align: center;
		line-height:38px;
		height: 38px;
	}
	.sos-btn {
		line-height: 38px;
	}
	.end-btn {
		width:164px;
		display: inline-block;
		color: #fff;
		font-weight: bold;
		font-size: 14px;
		border-radius: 8px;
		line-height: 42px;
		height: 42px;
		text-align: center;
		background: linear-gradient(135deg, #1CCE72 0%, #00B365 100%);
	}
	
	.goal-btn {
		width: 88px;
		height: 58px;
		color: #0A70F5;
		font-weight: bold;
		font-size: 14px;
		border: 1px solid #0A70F5;
		border-radius: 12px;
		text-align: center;
		background-color: #fff;
	}
	.event_content {
		height: 32px;
		line-height: 32px;
		color: #fff;
		font-weight: bold;
		font-weight: 12px;
		background-color: #085BC9;
		overflow: hidden;
		padding: 0 0 0 5px;
	}
	.s-num {
		display: inline-block;
		width: 36px;
	}
	.time {
		font-size: 16px;
		background: #2864cf;
		display: block;
		height: 46px;
		line-height: 46px;
		border-radius: 4px;
	}
	.qz {
		height: 26px;
	}
	.team {
		font-size:16px;
		word-wrap:break-word; 
		height: 100px;
	}
	.split {
		width:30px;
		display:inline-block;
	}
	.score-header {
		background-color: #0A70F5;
		color: #fff;
		padding: 10px;
	}
  .score {
		font-weight: bold;
		font-size: 40px;
		color: #fff;
	}
	
	.line {
		height: 0px;
		border-bottom: 1px solid #EEEEEE;
		margin: 0 -15px;
	}
	.flex-center {
		display: flex;
	  justify-content: space-around;
	}

	.flex {
		display: flex;
	}
	.justify-between {
		justify-content: space-between;
	}
	.mt-16 {
		margin-top: 16px;
	}
	.flex-col {
		flex-direction: column;
	}
	.emerald-green {
		background: linear-gradient(135deg, #A1D321 0%, #43B800 100%);
	}
	.lakeblue {
		background: linear-gradient(135deg, #1CCEB9 0%, #00B3A1 100%);
	}
	
	.s-btn {
		width: 16px;
		// padding: 0px 10px;
		height: 20px;
		display: inline-block;
		margin-top: 5px;
	}
	.rb {
		background-color: red;
	}
	.yb {
		background-color: yellow;
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
