<template>
	<view class="bgs">
		<u-navbar
		  :leftText="$t('back')"
			@leftClick="leftClick"
			:title="$t('modify')">
			 <view class="u-nav-slot" slot="right">
				 <image src="../../static/save.png" class="save-icon"></image>
				  <text  @tap="save()">{{$t('save')}}</text>
			 </view>
		</u-navbar>
	  <view class="mbody">
			<view class="box">
			  <view class="label">{{$t('weather')}}</view>
				<view class="box-btns">
				<block v-for="(item, index) in weathers" :key="index">
						<block v-if="item.checked">
							<u-button :text="item.name" class="btn select-btn" @tap="selectWeather(index)"></u-button>
						</block>
						<block v-else>
							<u-button :text="item.name" class="btn" @tap="selectWeather(index)"></u-button>
						</block>
			 	</block>
				</view>
			</view>
			<view class="box">
				<view class="label">{{$t('kick_off')}}</view>
				<block v-for="(item, index) in kickoffs" :key="index">
						<block v-if="item.checked">
							<u-button :text="item.name" class="btn select-btn auto-width" @tap="selectKick(index)"></u-button>
						</block>
						<block v-else>
							<u-button :text="item.name" class="btn auto-width" @tap="selectKick(index)"></u-button>
						</block>
				</block>
			</view>
			<view class="box">
				<view class="label">{{$t('match_status')}}</view>
				<block v-for="(item, index) in match_status" :key="index">
						<block v-if="item.checked">
							<u-button :text="item.name" class="btn select-btn" @tap="selectMatch(index)"></u-button>
						</block>
						<block v-else>
							<u-button :text="item.name" class="btn" @tap="selectMatch(index)"></u-button>
						</block>
				</block>
			</view>
			<view class="time-header">{{$t('modify_time')}}</view>
				<view class="">
				<u-list >
					<u-radio-group
						v-model="current_position"
						placement="column" class="time-box ">
						<u-list-item v-for="(item, index) in times" :key="index">
							<view class="u-flex u-flex-around time-lable">
								<u-radio
										:name="item.id"
										:key="index"
										@change="radioChange"
									 >
									 </u-radio>
								<view>{{item.position_name}}</view>
							</view>
							<u-cell :title="$t('start_at')" @tap="showBeginDate(index)" >
								<view slot="value" class="time-cell">
									<text>{{item.begin_at}}</text>
								</view>
								<view slot="right-icon">
									<image src="../../static/right.png" class="right-icon"></image>
								</view>
							</u-cell>
							<u-cell :title="$t('end_at')"  @tap="showEndDate(index)">
								<view slot="value" class="time-cell">
									<template v-if="item.end_at">
									<text>{{item.end_at }}</text> 
									</template>
									<template v-else>
										<text class="select-tip">{{$t('please_select')}}</text>
									</template>
									
								</view>
								<view slot="right-icon">
									<image src="../../static/right.png" class="right-icon"></image>
								</view>
							</u-cell>
							<template v-if="index != times.length - 1">
							<view class="line"></view>
							</template>
						</u-list-item>
					</u-radio-group>
				</u-list>
				
				</view>
      </view>
			<view class="time-modal" v-if="show_begin_at"></view>
			 <view v-if="show_begin_at"  class="time-wraper">
				<view class="close-wraper">
					<view class="title-time">{{$t('start_at')}}</view>
					<image src="../../static/close.png" class="close-img" @tap="closesStart"></image>
				</view>
			  <picker-view indicator-style="height: 50px;" :value="start_at_time" @change="startAtChange" class="picker-view">
					<picker-view-column>
							<view class="item" v-for="(item,index) in hours" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
							<view class="item" v-for="(item,index) in minutes" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
							<view class="item" v-for="(item,index) in secs" :key="index">{{item}}</view>
					</picker-view-column>
		  	</picker-view>
			 <u-button :text="$t('save')" class="save-btn" @tap="selectStartTime"></u-button>
		  </view>
			<view class="time-modal" v-if="show_end_at"></view>
			 <view v-if="show_end_at"  class="time-wraper">
				<view class="close-wraper">
					<view class="title-time">{{$t('end_at')}}</view>
					<image src="../../static/close.png" class="close-img" @tap="closesEnd"></image>
				</view>
			  <picker-view indicator-style="height: 50px;" :value="end_at_time" @change="endAtChange" class="picker-view">
					<picker-view-column>
							<view class="item" v-for="(item,index) in hours" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
							<view class="item" v-for="(item,index) in minutes" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
							<view class="item" v-for="(item,index) in secs" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			 <u-button :text="$t('save')" class="save-btn" @tap="selectEndTime"></u-button>
			</view>
		<!-- </picker> -->
			<!-- <u-datetime-picker
					:show="show_begin_at"
					:value="begin_at"
					ref="begin_pick"
					mode="datetime"
					@close="closeBegin"
					@cancel="closeBegin"
					@confirm="selectBegin"
				></u-datetime-picker> -->
			<!-- 	<u-datetime-picker
						:show="show_end_at"
						:value="end_at"
						ref="end_pick"
						mode="datetime"
						@close="closeEnd"
						@cancel="closeEnd"
						@confirm="selectEnd"
					></u-datetime-picker> -->
			
	 <u-notify ref="uNotify" message=""></u-notify>
	</view>
</template>

<script>
	export default {
		data() {
			const hours = [];
		  for (let i = 0; i <=23; i++) {
				if (i <= 9) {
					hours.push("0" + i)
				} else {
					hours.push(i+"")
				}
			}
			const minutes = [];
			for (let i = 0; i <=59; i++) {
				if (i <= 9) {
					minutes.push("0" + i)
				} else {
					minutes.push(i+"")
				}
			}
			const secs = [];
			for (let i = 0; i <=59; i++) {
				if (i <= 9) {
					secs.push("0" + i)
				} else {
					secs.push(i+"")
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
			begin_at: '',
			end_at: '',
			current_weather_index: '',
			current_kick_index: '',
			current_status_index: '',
			show_begin_at: false,
			show_end_at: false,
			time_index: 0,
			}
		},
		methods: {
			onLoad(option) {
				if (uni.getLocale() == 'zh-Hans') {
					this.match_status = [
					{
						id: 0,
						name: '未开始',
						checked: false
					},
					{
						id: 1,
						name: '比赛中',
						checked: false
					},
					{
						id: 2,
						name: '已结束',
						checked: false
					}
				];
					this.weathers=  [{
						id: 1,
							name: '晴天',
							checked: false
						},
						{
							id: 4,
							name: '小雨',
							checked: false
						},
						{
							id: 12,
							name: '雾',
							checked: false
						},
						{
							id: 9,
							name: '小雪',
							checked: false
						},
						{
							id: 2,
							name: '多云',
							checked: false
						},
						{
							id: 6,
							name: '大雨',
							checked: false
						}
					]
				} else {
					this.match_status = [
						{
							id: 0,
							name: 'Not Started',
							checked: false
						},
						{
							id: 1,
							name: 'Running',
							checked: false
						},
						{
							id: 2,
							name: 'Finished',
							checked: false
						}
					];
					this.weathers=  [{
						id: 1,
							name: 'sunny',
							checked: false
						},
						{
							id: 4,
							name: 'light rain',
							checked: false
						},
						{
							id: 12,
							name: 'foggy',
							checked: false
						},
						{
							id: 9,
							name: 'light snow',
							checked: false
						},
						{
							id: 2,
							name: 'cloudy',
							checked: false
						},
						{
							id: 6,
							name: 'heavy rain',
							checked: false
						}
					]
				}
				if (uni.getStorageSync('token') != '') {
					this.match_id = uni.getStorageSync('match_id');
					uni.$u.http.get(`orbit_occer/${this.match_id}/match_process`, {}, {withCredentials: true}).then(res => {
						var teams = [];
					
						if (res.data.weather_type_id) {
							this.weathers.forEach((d, ix) => {
								if (d.id == res.data.weather_type_id) {
									this.weathers[ix].checked = true;
									this.current_weather_index = ix;
								}
							})
						}
						this.current_status_index = res.data.status_id;
						if (this.match_status[res.data.status_id]) {
							this.match_status[res.data.status_id].checked = true;
						}
						res.data.teams.forEach((d, ix)=> {
							if (res.data.kick_off_id == d.id ) {
								this.current_kick_index  = ix;
							}
							this.kickoffs.push({
								id: d.id,
								name: d.name,
								checked: res.data.kick_off_id == d.id
							})
						})
						res.data.processes.forEach((d, i) => {
							if (i == (res.data.processes.length -1)) {
								this.current_position = d.id;
							}
							this.times.push({
								id: d.id,
								begin_at: this.format('HH:MM:SS', new Date(d.begin_at)),
								end_at: d.end_at != 0 ? this.format('HH:MM:SS', new Date(d.end_at)) : '',
								begin_day: this.formatDate(new Date(d.begin_at)),
								end_day: d.end_at != 0 ? this.formatDate(new Date(d.end_at)) : [],
								position: d.position,
								begin_at_utc: new Date(d.begin_at),
								end_at_utc: d.end_at != 0 ? new Date(d.end_at) : '',
								position_name: d.position_name,
								begin_at_sec: d.begin_at,
								end_at_sec: d.end_at
							})
							console.log(this.times)
						})
 					}, (res) => {
						 this.$refs.uNotify.show({
								top: 10,
								type: 'error',
								color: '#fff',
								bgColor: '#a0c630',
								message: '请求出错',
								duration: 1000 * 1,
								fontSize: 20,
								safeAreaInsetTop:true
						})
					})
				} else {
					uni.$u.route({
						url: 'pages/login/login',
						type: 'reLaunch'
					})
				}
			},
	
			radioChange(n) {
				 this.current_position = n;
			},
			formatDate(date) {
				return [date.getFullYear(), date.getMonth(), date.getDate()];
			},
			format(fmt, date) {
				let ret;
				const opt = {
						"Y+": date.getFullYear().toString().substr(2,2),        // 年
						"m+": (date.getMonth() + 1).toString(),     // 月
						"d+": date.getDate().toString(),            // 日
						"H+": date.getHours().toString(),           // 时
						"M+": date.getMinutes().toString(),         // 分
						"S+": date.getSeconds().toString()          // 秒
						// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
							fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
				};
				return fmt;
			},
		  leftClick() {
				this.$u.route({
					url: 'pages/index/index',
					type: 'switchTab',
				})
			},
			
			closesStart() {
				this.show_begin_at = false;
			},
			showBeginDate(index) {
				this.time_index = index;
				let time = this.times[index].begin_at.split(":");
			  this.start_at_time = time;
				this.show_begin_at = true;
			},
			startAtChange(e) {
				let value =  e.detail.value;
				if (parseInt(value[0]) <= 9) {
					value[0] = "0" + parseInt(value[0]);
				}
				if (parseInt(value[1]) <= 9) {
					value[1] = "0" + parseInt(value[1]);
				}
				if (parseInt(value[2]) <= 9) {
					value[2] = "0" + parseInt(value[2]);
				}
				this.start_at_time = [value[0] + '', value[1] + "", value[2] + ""];
			},
			selectStartTime() {
				let day = this.times[this.time_index].begin_day;
				let time = new Date(day[0], day[1], day[2], this.start_at_time[0], this.start_at_time[1], this.start_at_time[2]);
				this.show_begin_at = false;
				this.times[this.time_index].begin_at = this.start_at_time.join(":");
				this.times[this.time_index].begin_at_utc = time;
			},
			closesEnd() {
				this.show_end_at = false;
			},
			showEndDate(index) {
				this.time_index = index;
				console.log(11111,this.times[index].end_at)
				if (this.times[index].end_at != '') {
					let time = this.times[index].end_at.split(":");
					this.end_at_time = time;
					this.show_end_at = true;
				}
			},
			endAtChange(e) {
				let value =  e.detail.value;
				if (parseInt(value[0]) <= 9) {
					value[0] = "0" + parseInt(value[0]);
				}
				if (parseInt(value[1]) <= 9) {
					value[1] = "0" + parseInt(value[1]);
				}
				if (parseInt(value[2]) <= 9) {
					value[2] = "0" + parseInt(value[2]);
				}
				this.end_at_time = [value[0] + '', value[1] + "", value[2] + ""];
			},
			selectEndTime() {
				let day = this.times[this.time_index].end_day;
				let time = new Date(day[0], day[1], day[2], this.end_at_time[0], this.end_at_time[1], this.end_at_time[2]);
				this.show_end_at = false;
				this.times[this.time_index].end_at = this.end_at_time.join(":");
				this.times[this.time_index].end_at_utc = time;
			},
			save() {
				var current_procces;
				var position = 1;
				for(var i=0; i < this.times.length; i ++ ) {
					if (this.times[i].id == this.current_position) {
						current_procces = this.times[i];
						position = i+1;
						break;
					}
				}
				var params = {
					field_status_id:  "",
					guest_formation: "",
					home_formation: "",
					kick_off_id: this.kickoffs[this.current_kick_index] ? this.kickoffs[this.current_kick_index].id : '',
					match_begin_at:current_procces ? current_procces.begin_at_utc : '',
					match_end_at:current_procces ? current_procces.end_at_utc : '',
					mp: current_procces ? current_procces.id : '',
					position: position,
					status_id: this.match_status[this.current_status_index] ? this.match_status[this.current_status_index].id : '',
					weather_type_id: this.weathers[this.current_weather_index] ? this.weathers[this.current_weather_index].id : ''
				}
				uni.$u.http.post(`orbit_occer/${this.match_id}/update_match_info`, params, {withCredentials: true}).then(res => {
					if (res.data.success) {
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
					} else {
						this.$refs.uNotify.show({
							top: 10,
							type: 'error',
							color: '#fff',
							bgColor: '#a0c630',
							message: res.data.msg,
							duration: 1000 * 1,
							fontSize: 20,
							safeAreaInsetTop:true
						})
					}
				})
			},
			
			// showEndDate(index) {
			// 	this.time_index = index;
			// 	this.$refs.end_pick.updateColumnValue(this.times[index].end_at_sec)
			// 	this.show_end_at = true;
			// },
			selectEnd(e) {
				this.show_end_at = false;
				this.times[this.time_index].end_at_utc = new Date(e.value);
				this.times[this.time_index].end_at = this.format('HH:MM:SS', new Date(e.value));
				this.times[this.time_index].end_at_sec = e.value;
			},
			selectBegin(e) {
				this.begin_at = e.value
				this.show_begin_at = false;
				this.times[this.time_index].begin_at_utc = new Date(e.value);
		  	this.times[this.time_index].begin_at = this.format('HH:MM:SS', new Date(e.value));
				this.times[this.time_index].begin_at_sec = e.value;
			},
			closeBegin() {
				this.show_begin_at = false;
			},
			closeEnd() {
				this.show_end_at = false;
			},
			selectKick(index) {
				if (this.current_kick_index !== '' && this.current_kick_index !== null) {
					this.$set(this.kickoffs[this.current_kick_index], 'checked', false);
				}
				if (this.kickoffs[index].checked) {
					this.current_kick_index = '';
				} else {
					this.current_kick_index = index;
				}
				this.$set(this.kickoffs[index], 'checked', !this.kickoffs[index].checked);
			},
			selectWeather(index) {
				if (this.current_weather_index !== '' && this.current_weather_index != null) {
					this.$set(this.weathers[this.current_weather_index], 'checked', false);
				}
				if (this.weathers[index].checked) {
					this.current_weather_index = '';
				} else {
					this.current_weather_index = index;
				}
				this.$set(this.weathers[index], 'checked', !this.weathers[index].checked);
			},
			selectMatch(index) {
				if (this.current_status_index !== '') {
					this.$set(this.match_status[this.current_status_index], 'checked', false);
				}
				if (this.match_status[index].checked) {
					this.current_status_index = '';
				} else {
					this.current_status_index = index;
				}
				this.$set(this.match_status[index], 'checked', !this.match_status[index].checked);
			}
		}
	}
</script>

<style>
	
page {
	background-color: #F3F4F5;
}
.close-wraper {
	text-align: center;
	position: relative;
}

.auto-width {
	width: auto;
}
.close-img {
	width: 30px;
	height: 30px;
	position: absolute;
	right: 8px;
	top: 4px;
}

.title-time {
	margin-top: 10px;
	font-size: 18px;
	color: #000;
	font-weight: 600px;
}
.time-modal {
	position: fixed;
	z-index: 100;
	top: 0px;
	bottom: 0px;
	width: 100%;
	background: rgba(0,0,0,.4);
}
.time-wraper {
	position: fixed;
	z-index: 999;
	bottom: 0px;
	border: 1px solid #eee;
	background-color: #Fff;
	border-radius: 16px 16px 0px 0px;
}

.save-btn {
	width: 320px;
	height: 40px;
	left: 50%;
	margin-left: -160px;
	background: #1473FF;
	border-radius: 8px;
	line-height: 40px;
	position: absolute;
	bottom: 30px;
	color: #fff;
}

.picker-view {
	width: 750rpx;
	height: 500rpx;
	margin-top: 20rpx;
	margin-bottom: 80px;
	}
.item {
	font-weight: 600;
	display: flex;
	height: 50px;
	align-items: center;
	justify-content: center;
	text-align: center;
}
.line {
	width: 100%;
	height: 16px;
	background-color: #F3F4F5;
}
.save-icon {
	width: 16px;
	height: 16px;
	margin-right: 4px;
	vertical-align: middle;
}
.u-nav-slot {
	color: #0A70F5;
}

.right-icon {
	width: 24px;
	height: 24px;
	vertical-align: text-bottom;
}

.select-tip {
	color: #b6b6b6;
}
.mbody {
	margin-top: 55px;
}

.u-cell-clickable {
	background-color: #fff !important;
}

.time-lable {
	font-size: 16px;
	/* justify-content: space-between; */
	padding: 0px 12px;
	font-weight: 600;
	margin-top: 16px;
}

.box {
	background-color: #fff;
	margin: 10px 0px;
	padding: 0 16px;
}

.time-box {
	background-color: #fff;
	padding: 10px 0px;
}
.bl {
	width: 30px;
	display: inline-block;
}
.time-cell {
	text-align: left;
	margin-left: 16px;
}
.label {
	color: #000;
	padding: 10px 0px;
	display: block;
	font-weight: 500;
	font-size: 14px;
}

.time-header {
	color: #000;
	padding: 10px;
	display: block;
	font-weight: 500;
	font-size: 14px;
}

.cell-hover-class {
	background-color: rgb(235, 237, 238);
}
.btn {
	background-color:#F5F5F5;
	color: #000;
	width: 108px;
	height: 32px;
	line-height: 32px;
	font-size: 14px;
	margin-bottom: 10px;
	display: inline-block;
	border-radius: 16px;
	margin-right: 10px;
}
.select-btn {
	background: rgba(10,112,245,0.08);
	color: #0A70F5;
}
</style>
