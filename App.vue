<script>

	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>


<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import "./index.scss";
	.w-full {
		width: 100%;
	}
	page {
		background-color: $u-bg-color;
	}
</style>
