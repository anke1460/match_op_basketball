<template>
	<view class="bg">
		<view class="score-header">
		 <u-row class="" customStyle="height: 84px;">
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
				<view class="u-text-center">
					<text class="rb s-btn"></text>
					<text class="yb s-btn"></text>
					<img src="/static/qizhi.png" class="qz">
				</view>
				<view class="u-text-center">
					<text class="s-num">{{red_card[0]}}</text>
					<text class="s-num">{{yellow_card[0]}}</text>
					<text class="s-num">{{shoot_on[0]}}</text>
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
				<view class="u-text-center">
					<text class="rb s-btn"></text>
					<text class="yb s-btn"></text>
					<img src="/static/qizhi.png" class="qz">
				</view>
				<view class="u-text-center">
					<text class="s-num">{{red_card[1]}}</text>
					<text class="s-num">{{yellow_card[1]}}</text>
					<text class="s-num">{{shoot_on[1]}}</text>
				</view>
			 </u-col>
		 </u-row>
	 </view>
	 <view>
		 <!-- 最新事件 -->
		 <u-row class="event_content">
			 <u-col span="4">
				 <text>{{event_time}}</text>
			 </u-col>
			 <u-col span="8">
				 <text>{{event_content}}</text>
			 </u-col>
		 </u-row>
	 </view>
	 <view class="event_boy" :style="bg_color">
		 <!-- 比赛开始 -->
		 <u-row class="u-text-center">
		 		 <u-col span="6">
		 			 <view class="start-btn" @tap="halfStart">Half part start</view>
		 		 </u-col>
		 		 <u-col span="6">
		 			 <view class="end-btn" @tap="halfEnd">Half part end</view>
		 		 </u-col>
		 </u-row>
		 <!--  进球-->
		 <u-row class="u-text-center">
		 		 <u-col span="3">
		 			 <view class="goal-btn" @tap="openHomeAway(true, 'f_goal', 'Goal')">
						 <image src="/static/zuqiu.png" class="ball-img"></image>
						 <view class="goal-text">Home Goal</view>
						</view>
		 		 </u-col>
		 		 <u-col span="3">
		 			 <view class="penaly red-border m-auto" @tap="openHomeAway(true, 'f_penalty_kick', 'Penalty Kick')">
						 <view class="white-text">Home</view>
						 <view class="red-text">Penalty</view>
						</view>
		 		 </u-col>
				 <u-col span="3">
				 		<view class="penaly red-border m-auto" @tap="openHomeAway(false, 'f_penalty_kick', 'Penalty Kick')">
							<view class="white-text">Away</view>
							<view class="red-text">Penalty</view>
						</view>
				 </u-col>
		 		 <u-col span="3">
					  <view class="goal-btn">
						 <image src="/static/zuqiu.png" class="ball-img"></image>
						 <view class="goal-text" @tap="openHomeAway(false, 'f_goal', 'Goal')">Away Goal</view>
						</view>
		 		 </u-col>
		 </u-row>
		 <!--  射门 -->
		 <u-row class="u-text-center">
		 		 <u-col span="3">
					<view class="b-btn shoot-btn" @click="showShoot(true, 'home')">Shoot</view>
		 		 </u-col>
		 		 <u-col span="3">
		 			 <view class="sos-btn" @tap="sendPk('f_match_disconnect')">SOS</view>
		 		 </u-col>
					 <u-col span="3">
							<view class="close-game-btn" @tap="sendCustom('Unsure close game')">Unsure close game</view>
					 </u-col>
		 		 <u-col span="3">
						<view class="b-btn shoot-btn" @click="showShoot(false, 'home')">Shoot</view>
		 		 </u-col>
		 </u-row>
		<!--界外球 -->
		<u-row class="u-text-center">
			 <u-col span="3">
					<view class="b-btn throwin-btn" @click="showThrowin(true)">Throw in</view>
			 </u-col>
			 <u-col span="3">
				 <view class="sub-btn m-btn" @tap="sendPk('f_sub')">
					 <image src="/static/zy.png" class="m-img"></image>
					 <view>Substitute</view>
			 	</view>
			 </u-col>
					 <u-col span="3">
							<view class="injury-btn m-btn" @tap="openInjery()">
								 <image src="/static/yao.png" class="m-img"></image>
								 <view>Injury</view>
							</view>
					 </u-col>
			 <u-col span="3">
					<view class="b-btn throwin-btn" @tap="showThrowin(false)">Throw in</view>
			 </u-col>
		</u-row>
		<!-- 角球 -->
		<u-row class="u-text-center">
			 <u-col span="3">
						<view class="b-btn corner-btn" @tap="showCorner(true)">Corner</view>
			 </u-col>
			 <u-col span="3">
				 <view class="vodeo-btn m-btn" @tap="sendVar()">
					 <image src="/static/video.png" class="m-img"></image>
					 <view>Var</view>
			 	</view>
			 </u-col>
					 <u-col span="3">
							<view class="off-btn m-btn" @tap="openSelectTeam('f_offside', 'Offside')">
								 <view>Offside</view>
							</view>
					 </u-col>
			 <u-col span="3">
					<view class="b-btn corner-btn" @tap="showCorner(false)">Corner</view>
			 </u-col>
		</u-row>
		<!-- 任意球 -->
		<u-row class="u-text-center">
			 <u-col span="3">
						<view class="b-btn kick-btn" @tap="showFreeKick(true)">Free kick</view>
			 </u-col>
			 <u-col span="3" @tap="openSelectTeam('f_attack', 'Attack')">
			 	 <view class="b-btn attack-btn">Attack</view>
			 </u-col>
			<u-col span="3">
				<view class="b-btn danger-btn" @tap="openSelectTeam('f_danger_attack', 'Danger')">Danger</view>
			</u-col>
					
			 <u-col span="3">
					<view class="b-btn kick-btn" @click="showFreeKick(false)">Free kick</view>
			 </u-col>
		</u-row>
		<!--进攻 -->
		<u-row class="u-text-center">
			 <u-col span="3">
				 <view class="red-btn m-btn" @tap="openHomeAway(true, 'f_red_card', 'Red card')">
					 <view class="red-bg"></view>
					 <view>Red card</view>
			 	</view>
			</u-col>
			 <u-col span="3">
				 <view class="safe-btn m-btn" @click="showSafe(true)">
					 <view>Home Safe</view>
			 	</view>
			 </u-col>
			 <u-col span="3">
					<view class="safe-btn m-btn" @click="showSafe(false)">
						 <view>Away Safe</view>
					</view>
			 </u-col>
			<u-col span="3">
				 <view class="red-btn m-btn" @tap="openHomeAway(false, 'f_red_card', 'Red card')">
					 <view class="red-bg"></view>
					 <view>Red card</view>
			 	</view>
			</u-col>
		</u-row>
		<!-- 危险 -->
		<u-row class="u-text-center">
			<u-col span="3">
					<view class="yellow-btn m-btn" @tap="openHomeAway(true, 'f_yellow_card', 'Yellow card')">
						<view class="yellow-bg">
						</view>
						<view>Yellow card</view>
					</view>
			</u-col>
			 <u-col span="6">
				 <view class="dd-btn m-btn" @tap="sendPublic('f_danger')">
					 <view>Danger Danger</view>
			 	</view>
			 </u-col>
			<u-col span="3">
				<view class="yellow-btn m-btn" @tap="openHomeAway(false, 'f_yellow_card', 'Yellow card')">
					<view class="yellow-bg">
					</view>
					<view>Yellow card</view>
				</view>
			</u-col>
		</u-row>
		<!-- other -->
		<u-row class="u-text-center">
			 <u-col span="4">
						<view class="b-btn other-btn" @click="showOther()">Other</view>
			 </u-col>
			 <u-col span="4">
				 <view class="other-btn b-btn">
					 Modify
			 	</view>
			 </u-col>
			 <u-col span="4">
					<view class="b-btn  other-btn">Match events</view>
			 </u-col>
		</u-row>
	 </view>
	 <view>
	 <!-- 普通弹窗 -->
	 <u-popup :show="show_confirm" :round="10" mode="center" @close="close">
	 	<view class="pop-bg">
	 			<view class="close-wraper">	<text class="event-title">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="close"></image></view>
	 			<view class="tip-content">
	 				<text class="white-text">Are you sure you want send ?</text>
	 			</view>
	 			<view class="btn-content">
	 				<u-button color="rgb(18 185 87)"  text="Yes" customStyle="margin: 20px 0px;border-radius: 20px;" @tap="sendNormalEvent"></u-button>
	 				<u-button color="#fd6731" text="No" customStyle="border-radius: 20px;" @click="close"></u-button>
	 			</view>
	 	</view>
	 </u-popup>
	 <!-- 主客队弹窗 -->
	 <u-popup :show="home_away_show" :round="10" mode="center" @close="closeHomeAway">
	 	<view class="pop-bg">
	 			<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeHomeAway"></image></view>
	 			<view class="btn-content">
	 				<u-button color="rgba(236, 128, 141, 1)" text="Confirm" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="goalConfirm"></u-button>
	 				<u-button color="rgba(245, 154, 35, 1)" text="Cancel" customStyle="border-radius: 20px;" @click="goalCancel"></u-button>
	 			</view>
	 	</view>
	 </u-popup>
	 
	 <!-- 普通主客队弹窗 -->
	 <u-popup :show="select_team_show" :round="10" mode="center" @close="closeSelectTeam">
	 	<view class="pop-bg">
	 			<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closesSelectTeam"></image></view>
	 			<view class="btn-content">
	 				<u-button color="rgba(236, 128, 141, 1)" text="Home" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="homeEvent"></u-button>
	 				<u-button color="rgba(245, 154, 35, 1)" text="Away" customStyle="border-radius: 20px;" @click="guestEvent"></u-button>
	 			</view>
	 	</view>
	 </u-popup>
	 <!-- shoot弹窗 -->
	 <u-popup :show="shoot_show" :round="10" mode="center" @close="closeShoot">
	 	<view class="pop-bg">
	 			<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeShoot"></image></view>
	 			<view class="btn-content">
	 				<u-button color="rgba(236, 128, 141, 1)" text="On" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="sendPk('f_shoot_on', 'shoot_show')"></u-button>
	 				<u-button color="rgba(245, 154, 35, 1)" text="Off" customStyle="border-radius: 20px;" @tap="sendPk('f_shoot_off', 'shoot_show')"></u-button>
	 					<view class="white-text u-text-center u-margin-top-30" @click="closeShoot">close</view>
	 			</view>
	 	</view>
	 </u-popup>
	 <!-- throw in 弹窗 -->
	 <u-popup :show="throwin_show" :round="10" mode="center" @close="closeThrowin">
	 	<view class="pop-bg">
	 			<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeThrowin"></image></view>
	 			<view class="btn-content">
	 				<u-button color="rgba(236, 128, 141, 1)" text="Fore court" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="sendPkDesc('f_throw_in', 'throwin_show', 'fore_court')"></u-button>
	 				<u-button color="rgba(245, 154, 35, 1)" text="Center court" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="sendPkDesc('f_throw_in', 'throwin_show', 'center_court')"></u-button>
	 					<u-button color="rgba(112, 182, 3, 1)" text="back court" customStyle="border-radius: 20px;" @tap="sendPkDesc('f_throw_in', 'throwin_show', 'back_court')"></u-button>
	 				<view class="white-text u-text-center u-margin-top-30" @click="closeThrowin">close</view>
	 			</view>
	 	</view>
	 </u-popup>
	 <!--injury 弹窗 -->
	 <u-popup :show="injury_show" :round="10" mode="center" @close="closeInjury">
	 	<view class="pop-bg">
	 			<view class="close-wraper"><text class="white-text">Injury Time</text><image src="../../static/close.png" class="close-img" @click="closeInjury"></image></view>
	 			<view class="u-margin-top-40">
					<u--input
					  color="#fff"
						v-model="injury_time"
						type="number"
						placeholder="time"
					></u--input>
	 				<u-button color="rgba(236, 128, 141, 1)" text="Send" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="sendInjury"></u-button>
	 				<view class="white-text u-text-center u-margin-top-30" @click="closeInjury">close</view>
	 			</view>
	 	</view>
	 </u-popup>
	 <!-- free kick 弹窗 -->
	 <u-popup :show="free_kick_show" :round="10" mode="center" @close="closeFreeKick">
	 	<view class="pop-bg">
	 			<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeFreeKick"></image></view>
	 			<view class="btn-content">
	 				<u-button color="rgba(236, 128, 141, 1)" text="Fore court" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="sendPkDesc('f_free_kick', 'free_kick_show', 'fore_court')"></u-button>
	 				<u-button color="rgba(245, 154, 35, 1)" text="Center court" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="sendPkDesc('f_free_kick',  'free_kick_show','center_court')"></u-button>
	 				<u-button color="rgba(112, 182, 3, 1)" text="back court" customStyle="border-radius: 20px;" @tap="sendPkDesc('f_free_kick',  'free_kick_show','back_court')"></u-button>
	 				<view class="white-text u-text-center u-margin-top-30" @click="closeFreeKick">close</view>
	 			</view>
	 	</view>
	 </u-popup>
	 <!-- safe 弹窗 -->
	 <u-popup :show="safe_show" :round="10" mode="center" @close="closeSafe">
	 	<view class="pop-bg">
	 			<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeSafe"></image></view>
	 			<view class="btn-content">
	 				<u-button color="rgba(245, 154, 35, 1)" text="Goal Kick" customStyle="margin: 30px 0px;border-radius: 20px;"  @tap="sendPkDesc('f_safe', 'safe_show', 'goal_kick')"></u-button>
	 				<u-button color="rgba(112, 182, 3, 1)" text="Safe" customStyle="margin: 30px 0px;border-radius: 20px;"  @tap="sendPkDesc('f_safe', 'safe_show', 'safe')"></u-button>
	 				<view class="white-text u-text-center u-margin-top-30" @click="closeSafe">close</view>
	 			</view>
	 	</view>
	 </u-popup>
	 
	 <!-- corner 弹窗 -->
	 <u-popup :show="corner_show" :round="10" mode="center" @close="closeCorner">
	 	<view class="pop-bg">
	 			<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeCorner"></image></view>
	 			<view class="btn-content">
	 					<u-button color="rgba(236, 128, 141, 1)" text="Corner" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="sendPk('f_corner', 'corner_show')"></u-button>
	 				<u-button color="rgba(245, 154, 35, 1)" text="Kick Stand By" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="sendPk('f_kick_standby', 'corner_show')"></u-button>
	 				<u-button color="rgba(112, 182, 3, 1)" text="Ball Kick Out" customStyle="margin: 30px 0px;border-radius: 20px;" @tap="sendPk('f_kick_out', 'corner_show')"></u-button>
	 				<view class="white-text u-text-center u-margin-top-30" @click="closeCorner">close</view>
	 			</view>
	 	</view>
	 </u-popup>
	 
	 <!-- other 弹窗 -->
	 <u-popup :show="other_show" :round="10" mode="center" @close="closeOther">
	 	<view class="pop-bg">
	 			<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeOther"></image></view>
	 			<view class="btn-content">
	 				<u-button color="rgba(217, 0, 27, 1)" text="Player comming out" customStyle="margin: 20px 0px;border-radius: 20px;" @tap="sendOther('Player comming out')"></u-button>
	 				<u-button color="rgba(236, 128, 141, 1)" text="Player warm-up" customStyle="margin: 20px 0px;border-radius: 20px;" @tap="sendOther('Player warm-up')"></u-button>
	 				<u-button color="rgba(245, 154, 35, 1)" text="Teams share hands" customStyle="margin: 20px 0px;border-radius: 20px;"  @tap="sendOther('Teams share hands')"></u-button>
	 					<u-button color="rgba(112, 182, 3, 1)" text="Game will start soon" customStyle="margin: 20px 0px;border-radius: 20px;" @tap="sendOther('Game will start soon')"></u-button>
	 					<u-button color="rgba(2, 167, 240, 1)" text="Match restart" customStyle="margin: 20px 0px;border-radius: 20px;"  @tap="sendOther('Match restart')"></u-button>
	 					<u-button color="rgb(170 104 203)" text="Slow Game Speed" customStyle="margin: 20px 0px;border-radius: 20px;"  @tap="sendOther('Slow Game Speed')"></u-button>
	 					<u-button color="rgb(89 214 197)" text="Fast Game Speed" customStyle="margin: 20px 0px;border-radius: 20px;" @tap="sendOther('Fast Game Speed')"></u-button>
	 				<view class="white-text u-text-center u-margin-top-30" @click="closeOther">close</view>
	 			</view>
	 	</view>
	 </u-popup>
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
				bg_color: "background-color: transparent",
				show_alert: false,
				show_confirm: false,
				home_away_show: false,
				shoot_show: false,
				throwin_show: false,
				free_kick_show: false,
				safe_show: false,
				injury_show: false,
				corner_show: false,
				other_show: false,
				select_team_show: false,
				event_title: '',
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
				transTeams: {}
			}
		},
		methods: {
			onLoad(option) {
				if (uni.getStorageSync('token') != '') {
					this.match_id = uni.getStorageSync('match_id');
					uni.$u.http.get(`orbit_occer/${this.match_id}/init`, {}, {withCredentials: true}).then(res => {
						this.transTeams = res.data.transTeams;
						if (res.data.formatted_game_time) {
							this.event_time = res.data.formatted_game_time;
							this.event_content = res.data.event_info + res.data.team_info;
						}
					})
					uni.$u.http.get(`orbit_occer/${this.match_id}/match_status`, {}, {withCredentials: true}).then(res => {
						this.match_sec = res.data.game_time.time;
						this.game_time = res.data.game_time;
						this.youth_race = res.data.game_time.youthRace;
						this.hasExtraTime = res.data.game_time.hasExtraTime;
						this.pos = res.data.game_time.pos;
						this.home_team = res.data.home_team
						this.guest_team = res.data.guest_team;
						this.goal = [res.data.home_score, res.data.guest_score];
						this.shoot_on = res.data.match.shoot_on;
						// this.home_score = res.data.home_score;
						// this.guest_score = res.data.guest_score;
						this.red_card = res.data.match.red_card;
						this.yellow_card = res.data.match.yellow_card;
						// if (this.time_inter) {
						// 	clearInterval(this.time_inter)
						// }
						// this.time_inter = setInterval(()=> {
						// 	this.match_sec += 1;
						// 	this.match_time  = uni.$u.format_match_clock(this.pos, this.match_sec, this.youth_race,this.hasExtraTime);
						// }, 1000)
					})
				} else {
					setTimeout(() => {
						uni.$u.route({
							url: 'pages/login/login',
							type: 'reLaunch'
						})
					}, 200)
				}
			},
			positionStart() {
				var pk;
				switch (this.pos) {
					case null:
					case 0:
						pk = 'f_1st_half_start';
						break;
					case 1:
						pk = 'f_2nd_half_start';
						break;
					case 3:
						pk = 'f_2nd_extra_start';
						break;
					case 4:
						pk = 'f_penalty_shoot_start';
						break;
					default:
						pk = false;
				}
				return pk
			},
			positionEnd() {
				var pk;
				switch (this.pos) {
					case 1:
						pk = 'f_1st_half_end';
						break;
					case 2:
						pk = 'f_2nd_half_end';
						break;
					case 3:
						pk = 'f_1st_extra_end';
						break;
					case 4:
						pk = 'f_2nd_extra_end';
						break;
					case 5:
						pk = 'f_penalty_shoot_end';
						break;
				}
				return pk;
			},
			
			onShow() {
				this.load_num += 1
				this.setMatchTime();
			},
			setMatchTime(fn) {
				uni.$u.http.get(`orbit_occer/${this.match_id}/match_time`, {}, {withCredentials: true}).then(res => {
					this.match_sec = res.data.time;
					this.hasExtraTime = res.data.hasExtraTime;
					this.pos = res.data.pos;
					
					this.match_time = uni.$u.format_match_clock(res.data.pos, res.data.time, res.data.youth_race, res.data.hasExtraTime)
					if (res.data.timeStop) {
						if (this.time_inter) {
							clearInterval(this.time_inter);
							this.time_inter = null;
						}
					} else {
						if (!this.time_inter) {
							this.time_inter = setInterval(()=> {
								this.match_sec += 1;
								this.match_time  = uni.$u.format_match_clock(this.pos, this.match_sec, this.youth_race,this.hasExtraTime)
							}, 1000)
						}
					}
				})
			},
			
			sendNormalEvent() {
				this.show_confirm = false;
				this.sendEvent();
			},
			
			openSelectTeam(pk, title) {
				this.event_title = title;
				this.pk = pk;
				this.select_team_show = true;
			},
			
			closesSelectTeam() {
				this.select_team_show = false;
			},
			
			homeEvent() {
				this.team = 'home';
				this.sendEvent();
				this.select_team_show = false;
			},
			
			guestEvent() {
				this.team = 'guest';
				this.sendEvent();
				this.select_team_show = false;
			},
			
			close() {
				this.show_confirm = false;
			},
			closeShoot() {
				this.shoot_show = false;
			},
			
			closeInjury() {
				this.injury_show = false;
			},
			
			openInjery() {
				this.injury_show = true;
			},
			
			sendCustom() {
				this.pk = "f_other";
				this.event_text = 'Unsure close game';
				this.sendEvent();
			},
		
			closeHomeAway() {
				this.home_away_show = false;
			},
			
			sendInjury() {
				this.pk = "f_injury_time";
				this.event_text = this.injury_time;
				this.sendEvent();
				this.injury_show = false;
			},
			
			openHomeAway(is_home, event, event_title) {
				this.pk = event + '_wait';
				this.team = is_home ? 'home' : 'guest'
				this.sendEvent();
				this.event_title = (is_home ? 'home ' : 'Away ') + event_title;
				this.home_away_show = true;
			},
			
	
			goalConfirm() {
				this.pk = this.pk.replace('_wait', '');
				this.sendEvent();
				this.home_away_show = false;
			},
			goalCancel() {
				this.pk = this.pk.replace('_wait', '') + "_canceled";
				// this.pk = "f_goal_canceled";
				this.sendEvent();
				this.home_away_show = false;
			},
			
			showShoot(is_home) {
				this.team = is_home ? 'home' : 'guest';
				this.event_title =  is_home ? 'Home Shoot' : 'Away Shoot';
				this.shoot_show = true;
			},
			
			closeShoot() {
				this.shoot_show = false;
			},
			
			showSafe(is_home) {
				this.event_title = (is_home ? 'home ' : 'Away ') + 'Safe';
				this.safe_show = true;
			},
			closeSafe() {
				this.safe_show = false;
			},
			showThrowin(is_home) {
				this.team = is_home ? 'home' : 'guest';
				this.event_title =  is_home ? 'Home Throw In' : 'Away Throw In';
				this.throwin_show = true;
			},
			closeThrowin() {
				this.throwin_show = false;
			},
			
			showCorner(is_home) {
				this.team = is_home ? 'home' : 'guest';
				this.event_title =  is_home ? 'Home Corner' : 'Away Corner';
				this.corner_show = true;
			},
			
			closeCorner() {
				this.corner_show = false;
			},
			
			showOther() {
				this.other_show = true;
			},
			closeOther() {
				this.other_show = false;
			},
			
			showFreeKick(is_home) {
				this.team = is_home ? 'home' : 'guest';
				this.event_title =  is_home ? 'Home Free Kick' : 'Away Free Kick';
				this.free_kick_show = true;
			},
			closeFreeKick() {
				this.free_kick_show = false;
			},
			
			// 半场开始
			halfStart() {
				if (this.positionStart() == false) {
					this.$refs.uNotify.show({
						top: 10,
						type: 'error',
						color: '#fff',
						bgColor: '#e5291e',
						message: 'Cannot start the game in penalty shoot',
						duration: 1000 * 2,
						fontSize: 20,
						safeAreaInsetTop:true
					})
				} else {
					this.pk = this.positionStart();
					this.event_title = 'Half part start';
					this.show_confirm = true;
				}
			},
			
			// 半场结束
			halfEnd() {
				this.pk = this.positionEnd();
				this.event_title = 'Half part end';
				this.show_confirm = true;
			},
			
			sendVar() {
				this.pk = 'f_system_error';
				this.event_title = 'Var';
				this.show_confirm = true;
			},
			sendOther(text) {
				this.pk = 'f_other';
				this.sendEvent({text: text});
				this.other_show = false;
			},
			sendPk(pk, popshow) {
				if (popshow) {
				  this[popshow] = false;
				}
				this.pk = pk;
				this.sendEvent();
			},
			
			sendPublic(pk, popshow) {
				if (popshow) {
				  this[popshow] = false;
				}
				this.team = '';
				this.pk = pk;
				this.sendEvent();
			},
			sendPkDesc(pk, popshow, desc) {
				if (popshow) {
				  this[popshow] = false;
				}
				this.pk = pk;
				this.sendEvent({desc_pk: desc});
			},
			sendEvent(data) {
				if (data == undefined) {
					data = {text: this.event_text};
				}
				uni.$u.http.post(`orbit_occer/${this.match_id}/live_event`, {pk: this.pk, team: this.team, data: data}, {withCredentials: true}).then(res => {
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
						if (res.data.events[0] && res.data.events[0].clr) {
							this.bg_color = "background-color:" + res.data.events[0].clr;
						}
						if (res.data.cb) {
							for (var key in res.data.cb.updateStat) {
								if (this[key]) { this[key] = res.data.cb.updateStat[key]; }
							}
						}
						if (res.data.events[0]) {
							var event = res.data.events[0];
							var name = "";
							if (event.pk === 'f_other') {
								if (event.oeId) {
									name = transOtherEvents[event.oeId];
								} else {
									name = event.data.text;
								}
							} else {
							 name = transEvents[event.meId];
							}
							var content = matchEvent(this.transTeams, res.data, this.youth_race,this.hasExtraTime)
							this.event_time = content[0];
							this.event_content = content[1]
						}
						
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #333;
	}
	
	.tip-content {
		padding: 10px;
	}
	.white-text {
		color: #fff;
	}
	.pop-bg {
		background-color: rgba(51, 51, 51, 1);
		padding: 15px;
		width: 300px;
		border: 1px solid #fff;
		border-radius: 10px;
	}
	.close-wraper {
		text-align: center;
	}
	
	.event-title {
		color: red;
		font-weight: bold;
		margin: 0 10px;
	}
	
	.close-img {
		width: 30px;
		height: 30px;
		float: right;
	}
	
	.btn-content {
		padding-top: 20px;
	}
	
	.event_boy {
	  min-height: calc(100vh - 247px);
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
	
	.m-img {
		width: 30px;
		height: 30px;
		margin: 0 auto;
		display: block;
	}
	
	.red-border {
		border: 2px solid red;
	}
	
	.red-text {
		color: #fff;
	}
	.white-text {
		color: #fff;
	}
	
	.m-btn {
		padding: 0px 5px;
		margin: 5px auto;
		border-radius: 10px;
		font-weight: bold;
	}
	
	.throwin-btn {
		background-color: rgba(2, 167, 240, 1);
	}
	
	.kick-btn {
		background-color: rgba(245, 154, 35, 1)
	}
	
	.red-btn {
		color: #fff;
		border: 2px solid red;
		padding: 5px 10px;
	}
	.red-bg {
		margin: 0 auto;
		width: 20px;
		height: 20px;
		background-color: red;
	}
	
	.yellow-btn {
		color: #fff;
		border: 2px solid yellow;
		padding: 5px 5px;
	}
	.yellow-bg {
		margin: 0 auto;
		width: 20px;
		height: 20px;
		background-color: yellow;
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
		width: 90px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		border-radius: 20px;
		padding: 15px 5px;
		color: #fff;
		margin: 0 auto;
	}
	
	.other-btn {
		border: 2px solid #70B603;
		padding: 10px 0px;
		width: 120px;
		color:#70B603 ;
		margin-top: 10px;
	}
	.dd-btn {
		background-color: rgba(217, 0, 27, 1);
		color: #fff;
		padding: 20px 30px;
		border: 2px solid #fff;
	}
	.danger-btn {
		background-color: rgba(236, 128, 141, 1);
		border-radius: 8px;
		padding: 20px 10px;
	}
	.attack-btn {
		background-color: rgba(191, 191, 0, 1);
		border-radius: 8px;
		padding: 20px 5px;
	}
	
	.safe-btn {
		background-color: rgba(112, 182, 3, 1);
		color: #fff;
		padding: 20px 5px;
	}
	
	.penaly {
		width: 80px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		border-radius: 10px;
		padding: 5px 5px;
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
		width: 40px;
		line-height: 19px;
		margin: 0 auto;
	}
	
	.ball-img {
		width: 20px;
		height: 20px;
		margin: 2px auto;
		display: block;
	}
	.start-btn {
		width: 150px;
		display: inline-block;
		margin: 5px auto;
		color: #fff;
		font-weight: bold;
		font-size: 16px;
		border-radius: 10px;
		padding: 15px 5px;
		background-color:palevioletred;
		text-align: center;
	}
	.sos-btn {
		width: 80px;
		display: inline-block;
		margin: 5px auto;
		color: red;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		border-radius: 10px;
		padding: 15px 5px;
		background-color: yellow;
	}
	.end-btn {
		width: 150px;
		display: inline-block;
		margin: 10px auto;
		color: #fff;
		font-weight: bold;
		font-size: 16px;
		border-radius: 10px;
		padding: 15px 5px;
		text-align: center;
		background-color: #48c548;
	}
	
	.goal-btn {
		width: 70px;
		height: 70px;
		margin: 0px auto;
		color: red;
		font-weight: bold;
		font-size: 16px;
		border-radius: 45px;
		text-align: center;
		background-color: #fff;
	}
	.event_content {
		height: 36px;
		line-height: 36px;
		color: #fff;
		font-weight: bold;
		font-weight: 15px;
		background-color: rgba(7, 63, 86, 1);
		padding: 0 10px;
	}
	.s-num {
		display: inline-block;
		width: 36px;
	}
	.time {
		font-size: 22px;
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
		background-color: #1074aa;
		color: #fff;
		padding: 10px;
	}
  .score {
		font-weight: bold;
		font-size: 30px;
		color: #fff;
	}
	
	.s-btn {
		width: 26px;
		height: 26px;
		display: inline-block;
		margin-top: 5px;
		margin-right: 10px;
	}
	.rb {
		background-color: red;
	}
	.yb {
		background-color: yellow;
	}
</style>
