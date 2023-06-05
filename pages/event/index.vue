<template>
    <view class="event-container">
		<view class="title u-text-center">Events</view>
		<view class="header flex items-center">
            <view class="" :class="[index == 3?'small time':'col-item']" v-for="item,index in headerNav" :key="index">
              <text class="">{{ item.label }}</text>
            </view>
        </view>
		<view class="content-box">
			<view class="content flex items-center" v-for="item,index in events" :key="index">
                <template v-if="item.status_id">
                    <view class="col-item truncate deleted-text">{{item.qt}}</view>
                    <view class="col-item truncate deleted-text">{{item.team_info}}</view>
                    <view class="col-item truncate deleted-text">{{item.event_info}}</view>
                    <view class="time truncate deleted-text">{{item.time}}</view>
                </template>
                <template v-else>
                    <view class="col-item truncate">{{item.qt}}</view>
                    <view class="col-item truncate">{{item.team_info}}</view>
                    <view class="col-item truncate">{{item.event_info}}</view>
                    <view class="time truncate">{{item.time}}</view>
                    <view class="col-item small">
                        <img class="delete" src="../../static/svg/delete.svg" alt="" @tap="deleteEvent(`${item.id}`, `${index}`)">
                    </view>
                 </template>
			</view>
		</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
			headerNav: [
				{label: 'Quarter'},
				{label: 'Team'},
				{label: 'Event'},
				{label: 'time'},
			],
            events: [],
            match_id: '',
        };
    },
    methods: {
        onLoad() {
             this.match_id = uni.getStorageSync('match_id');
        },
        onShow() {
           uni.$u.http.get(`basketball/match_input/${this.match_id}/delete_event_list`, {}, {withCredentials: true}).then(res => {
            this.events = res.data.events;
            })
        },
        deleteEvent(id, index) {
            uni.$u.http.post(`basketball/match_input/${this.match_id}/delete_event`, {mp_id: id}, {withCredentials: true}).then(res => {
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
            		this.$set(this.events[index], 'status_id', 1)
                    // this.events = this.events.concat(res.data.event)
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.deleted-text {
  text-decoration: line-through;
}
.time {
    width: 52px;
}
.event-container {
	min-height: calc(100vh - 50px);
	background-color: #fff;
	.title {
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 25px;
		padding: 10px 0;
	}
	.header,
	.content {
		background-color: rgba(10, 112, 245, 0.08);
		padding: 8px 12px 7px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,0.84);
		line-height: 17px;
		
	}
	.content-box {
		padding: 0 12px;
		.content {
			background-color: #fff;
			padding: 13px 0;
			border-bottom: 1px solid rgba(0,0,0,0.06);
		}
	}
	.col-item {
		flex: 1;
		flex-shrink: 0;
		&.small {
			width: 24x;
			flex: none;
		}
	}
	.delete {
		width: 14px;
	}
	/deep/ .u-grid-item {
		align-items: start;
	}
}
</style>
