<template>
    <view class="me-container flex">
        <view class="page-title">Me</view>
        <view class="list">
            <view class="title">list name</view>
            <view class="header flex items-center">
                <view class="u-text-left">Quarter</view>
                <view class="u-text-center">{{home}}</view>
                <view class="u-text-right">{{guest}}</view>
            </view>
            <view v-for="item,index in quarterList" :key="index" class="item flex items-center">
                <view class="u-text-left">{{item.name}}</view>
                <view class="u-text-center">{{item.home}}</view>
                <view class="u-text-right">{{item.away}}</view>
            </view>
            <view class="result item flex items-center">
                <view class="u-text-left bold">Total</view>
                <view class="u-text-center text-orange">{{home_score}}</view>
                <view class="u-text-right text-green">{{guest_score}}</view>
            </view>
        </view>

        <view class="button-box">
            <u-button
                :text="$t('logout')"
                color="linear-gradient(135deg, #FE6557 0%, #F5483B 100%)"
                @click="logout"
                customStyle="border-radius:8px;"
            >
            </u-button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            stat: {},
            guest: {},
            home: {},
            home_score: 0,
            guest_score: 0,
            quarterList: []
        };
    },
    methods: {
       onShow() {
           this.match_id = uni.getStorageSync('match_id');
           uni.$u.http.get(`basketball/match_input/${this.match_id}/process_points`, {}, {withCredentials: true}).then(res => {
               console.log(res.data.data)
               this.quarterList = res.data.data;
               this.home_score = res.data.home_score;
               this.guest_score = res.data.guest_score;
               this.home = res.data.home;
               this.guest = res.data.guest;
           });
       },
        // onShow() {
        //     if (uni.getStorageSync("token") != "") {
        //         uni.$u.http
        //             .get(
        //                 `orbit_occer/${uni.getStorageSync(
        //                     "match_id"
        //                 )}/statistics`,
        //                 {},
        //                 { withCredentials: true }
        //             )
        //             .then((res) => {
        //                 this.stat = res.data;
        //                 this.guest = res.data.guest;
        //                 this.home = res.data.home;
        //             });
        //     } else {
        //         uni.$u.route({
        //             url: "pages/login/login",
        //             type: "reLaunch",
        //         });
        //     }
        // },
        logout() {
            uni.setStorageSync("token", "");
            uni.setStorageSync("last_login_time", "");
            uni.$u.route({
                url: "pages/login/login",
                type: "reLaunch",
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.me-container {
    min-height: calc(100vh - 50px);
	background-color: #F5F5F5;
    padding: 16px 24px;
    flex-direction: column;
    justify-content: space-between;
    .page-title {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 25px;
        text-align: center;
        padding-bottom: 16px;
    }
    .list {
        background-color: #fff;
        border-radius: 8px;
        .title {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(0,0,0,0.84);
            line-height: 22px;
            padding: 16px 24px;
        }
        .header {
            background-color: rgba(10, 112, 245, 0.08);
            padding: 8px 16px 7px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0,0,0,0.84);
            line-height: 17px;
            > view {
                width: 33.33%;
            }
        }
        .item {
            padding: 13px 16px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(0,0,0,0.84);
            line-height: 18px;
            > view {
                width: 33.33%;
            }
        }
        .text-orange {
            color: #FF8A02;
        }
        .text-green {
            color: #01B465;
        }
        .bold {
            font-weight: 600;
        }
    }
    .button-box {
        padding: 0 40px;
        margin-top: auto;
    }
}
</style>
