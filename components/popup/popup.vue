<template>
	<view>
	<!-- 普通弹窗 -->
	<u-popup :show="show_confirm" :round="10" mode="center" @close="close">
		<view class="pop-bg">
				<view class="close-wraper">	<text class="event-title">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="close"></image></view>
				<view class="tip-content">
					<text class="white-text">Are you sure you want send ?</text>
				</view>
				<view>
					<u-button color="rgb(18 185 87)"  text="Yes" customStyle="margin: 20px 0px;border-radius: 20px;"></u-button>
					<u-button color="#fd6731" text="No" customStyle="border-radius: 20px;" @click="close"></u-button>
				</view>
		</view>
	</u-popup>
	<!-- 主客队弹窗 -->
	<u-popup :show="home_away_show" :round="10" mode="center" @close="closeHomeAway">
		<view class="pop-bg">
				<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeHomeAway"></image></view>
				<view>
					<u-button color="rgba(236, 128, 141, 1)" text="Home" customStyle="margin: 30px 0px;border-radius: 20px;"></u-button>
					<u-button color="rgba(245, 154, 35, 1)" text="Away" customStyle="border-radius: 20px;" @click="closeHomeAway"></u-button>
						<view class="white-text u-text-center u-margin-top-30" @click="closeHomeAway">close</view>
				</view>
		</view>
	</u-popup>
	
	<!-- shoot弹窗 -->
	<u-popup :show="shoot_show" :round="10" mode="center" @close="closeShoot">
		<view class="pop-bg">
				<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeShoot"></image></view>
				<view>
					<u-button color="rgba(236, 128, 141, 1)" text="On" customStyle="margin: 30px 0px;border-radius: 20px;"></u-button>
					<u-button color="rgba(245, 154, 35, 1)" text="Off" customStyle="border-radius: 20px;" @click="closeShoot"></u-button>
						<view class="white-text u-text-center u-margin-top-30" @click="closeShoot">close</view>
				</view>
		</view>
	</u-popup>
	<!-- throw in 弹窗 -->
	<u-popup :show="throwin_show" :round="10" mode="center" @close="closeThrowin">
		<view class="pop-bg">
				<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeThrowin"></image></view>
				<view>
					<u-button color="rgba(236, 128, 141, 1)" text="Fore court" customStyle="margin: 30px 0px;border-radius: 20px;"></u-button>
					<u-button color="rgba(245, 154, 35, 1)" text="Center court" customStyle="margin: 30px 0px;border-radius: 20px;" @click="closeThrowin"></u-button>
						<u-button color="rgba(112, 182, 3, 1)" text="back court" customStyle="border-radius: 20px;" @click="closeThrowin"></u-button>
					<view class="white-text u-text-center u-margin-top-30" @click="closeThrowin">close</view>
				</view>
		</view>
	</u-popup>
	
	<!-- free kick 弹窗 -->
	<u-popup :show="free_kick_show" :round="10" mode="center" @close="closeFreeKick">
		<view class="pop-bg">
				<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeFreeKick"></image></view>
				<view>
					<u-button color="rgba(236, 128, 141, 1)" text="Fore court" customStyle="margin: 30px 0px;border-radius: 20px;"></u-button>
					<u-button color="rgba(245, 154, 35, 1)" text="Center court" customStyle="margin: 30px 0px;border-radius: 20px;" @click="closeFreeKick"></u-button>
					<u-button color="rgba(112, 182, 3, 1)" text="back court" customStyle="border-radius: 20px;" @click="closeFreeKick"></u-button>
					<view class="white-text u-text-center u-margin-top-30" @click="closeFreeKick">close</view>
				</view>
		</view>
	</u-popup>
	<!-- safe 弹窗 -->
	<u-popup :show="safe_show" :round="10" mode="center" @close="closeSafe">
		<view class="pop-bg">
				<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeSafe"></image></view>
				<view>
					<u-button color="rgba(245, 154, 35, 1)" text="Goal Kick" customStyle="margin: 30px 0px;border-radius: 20px;"></u-button>
					<u-button color="rgba(112, 182, 3, 1)" text="Safe" customStyle="margin: 30px 0px;border-radius: 20px;" @click="closeSafe"></u-button>
					<view class="white-text u-text-center u-margin-top-30" @click="closeSafe">close</view>
				</view>
		</view>
	</u-popup>
	
	<!-- corner 弹窗 -->
	<u-popup :show="corner_show" :round="10" mode="center" @close="closeCorner">
		<view class="pop-bg">
				<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeCorner"></image></view>
				<view>
						<u-button color="rgba(236, 128, 141, 1)" text="Corner" customStyle="margin: 30px 0px;border-radius: 20px;"></u-button>
					<u-button color="rgba(245, 154, 35, 1)" text="Kick Stand By" customStyle="margin: 30px 0px;border-radius: 20px;"></u-button>
					<u-button color="rgba(112, 182, 3, 1)" text="Ball Kick Out" customStyle="margin: 30px 0px;border-radius: 20px;" @click="closeCorner"></u-button>
					<view class="white-text u-text-center u-margin-top-30" @click="closeCorner">close</view>
				</view>
		</view>
	</u-popup>
	
	<!-- other 弹窗 -->
	<u-popup :show="other_show" :round="10" mode="center" @close="closeOther">
		<view class="pop-bg">
				<view class="close-wraper"><text class="white-text">{{event_title}}</text><image src="../../static/close.png" class="close-img" @click="closeOther"></image></view>
				<view>
					<u-button color="rgba(217, 0, 27, 1)" text="Player comming out" customStyle="margin: 20px 0px;border-radius: 20px;"></u-button>
					<u-button color="rgba(236, 128, 141, 1)" text="Player warm-up" customStyle="margin: 20px 0px;border-radius: 20px;"></u-button>
					<u-button color="rgba(245, 154, 35, 1)" text="Teams share hands" customStyle="margin: 20px 0px;border-radius: 20px;" @click="closeOther"></u-button>
						<u-button color="rgba(112, 182, 3, 1)" text="Game will start soon" customStyle="margin: 20px 0px;border-radius: 20px;" @click="closeOther"></u-button>
						<u-button color="rgba(2, 167, 240, 1)" text="Match restart" customStyle="margin: 20px 0px;border-radius: 20px;" @click="closeOther"></u-button>
						<u-button color="rgb(170 104 203)" text="Slow Game Speed" customStyle="margin: 20px 0px;border-radius: 20px;" @click="closeOther"></u-button>
						<u-button color="rgb(89 214 197)" text="Fast Game Speed" customStyle="margin: 20px 0px;border-radius: 20px;" @click="closeOther"></u-button>
					<view class="white-text u-text-center u-margin-top-30" @click="closeOther">close</view>
				</view>
		</view>
	</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'popup',
		props: {
			show_confirm: false,
			home_away_show: false,
			shoot_show: false,
			throwin_show: false,
			free_kick_show: false,
			safe_show: false,
			corner_show: false,
			other_show: false,
			event_title: '',
		},
		methods: {
			close() {
				this.show_confirm = false;
			},
			closeShoot() {
				this.shoot_show = false;
			},
		}
	}
</script>

<style>
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