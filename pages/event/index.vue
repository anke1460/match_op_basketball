<template>
    <view class="event-container">
		<view class="title u-text-center">Events</view>
		<view class="header flex items-center">
            <view class="col-item" :class="[index == 4?'small':'']" v-for="item,index in headerNav" :key="index">
                <text class="">{{ item.label }}</text>
            </view>
        </view>
		<view class="content-box">
			<view class="content flex items-center" v-for="item,index in 6" :key="index">
				<view class="col-item truncate">1st Q 09'09</view>
				<view class="col-item truncate">Jacketled Jacketled</view>
				<view class="col-item truncate">posssession</view>
				<view class="col-item truncate">21:33:09</view>
				<view class="col-item small">
					<img class="delete" src="../../static/svg/delete.svg" alt="">
				</view>
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
				{label: ''},
			],
            events: [],
        };
    },
    methods: {
        onShow() {
        },
    },
};
</script>

<style lang="scss" scoped>
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
