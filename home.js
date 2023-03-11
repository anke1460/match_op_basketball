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
