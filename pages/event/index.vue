<template>
		<view class="u-page">
			<u-list>
				<u-list-item
					v-for="(item, index) in events"
					:key="index"
				>
					<u-cell>
					 <view slot="title"  class="undeleted-text">
						<text class="u-cell-text event-time">{{item.time}}</text>
						<text class="u-cell-text content">{{item.event_info}} {{item.team_info}}</text>
					</view>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				events: []
			}
		},
		methods: {
			onShow() {
				if (uni.getStorageSync('token') != '') {
					uni.$u.http.get(`orbit_occer/${uni.getStorageSync('match_id')}/event_list`, {}, {withCredentials: true}).then(res => {
						this.events = res.data.events;
					})
				} else {
					uni.$u.route({
						url: 'pages/login/login',
						type: 'reLaunch'
					})
				}
			}
		}
	}
</script>

<style>
page {
	background-color: #414140;
	color: #fff;
}
.event-time {
	color: #fff;
	margin-right: 17px;
}

.content {
	color: #fff;
}
</style>
