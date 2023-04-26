/*
 * 全局使用的工具类，一些前后台公用的方法放在这里
 * 不要在这个文件中加入全局变量，或者绑定domReady回调函数
 */
function formatGameTime(time_second) {
  var hour = Math.floor(time_second / 60).toString();
  if (hour.length === 1) {
    hour = '0' + hour;
  }

  var second = (time_second % 60).toString();
  if (second.length === 1) {
    second = '0' + second;
  }

  return hour + "'" + second;
}

function format_match_clock_half(position, time, youth_race, has_extra_time, half_time) {
  var count_time;
  time = parseInt(time);

  var half_part_time = youth_race ? 40 : half_time;
  var half_part_time_in_sec = half_part_time * 60;

  if (position !== null) {
    position = parseInt(position);
  }

  switch (position) {
    case null: // match does not start
    case 0:
      // 这里有bug，当time超过"45'00"时，没有显示"45'00 + XX'XX"。其实可以考虑直接返回"00'00"，因为比赛没有开始
      count_time = formatGameTime(time);
      break;
    case 1: // 1st half start to end
      if (time > half_part_time_in_sec) {
        count_time = half_part_time + ":00 + " + formatGameTime(time - half_part_time_in_sec);
      } else {
        count_time = formatGameTime(time);
      }
      break;
    case 2: // 2nd half start to end
      if (time > half_part_time_in_sec) {
        count_time = half_part_time * 2 + ":00 + " + formatGameTime(time - half_part_time_in_sec);
      } else {
        count_time = formatGameTime(time + half_part_time_in_sec);
      }
      break;
    case 3: // 1st extra start to end
      if (time > 900) {
        count_time = (half_part_time * 2 + 15) + ":00 + " + formatGameTime(time - 900);
      } else {
        count_time = formatGameTime(time + half_part_time_in_sec * 2);
      }
      break;
    case 4: // 2nd extra start to end
       if (time > 900) {
        count_time = (half_part_time * 2 + 30) + ":00 + " + formatGameTime(time - 900);
       } else {
         count_time = formatGameTime(time + half_part_time_in_sec * 2 + 900);
       }
       break;
    default: // Penalty shoot start to end
      count_time = has_extra_time ? (half_part_time_in_sec * 2 + 900 * 2) : (half_part_time_in_sec * 2);
      count_time = formatGameTime(count_time);
  }
  return count_time;
}

function format_match_clock(position, time, youth_race, has_extra_time) {
  var count_time;
  time = parseInt(time);

  var half_part_time = youth_race ? 40 : 45;
  var half_part_time_in_sec = half_part_time * 60;

  if (position !== null) {
    position = parseInt(position);
  }

  switch (position) {
    case null: // match does not start
    case 0:
      // 这里有bug，当time超过"45'00"时，没有显示"45'00 + XX'XX"。其实可以考虑直接返回"00'00"，因为比赛没有开始
      count_time = formatGameTime(time);
      break;
    case 1: // 1st half start to end
      if (time > half_part_time_in_sec) {
        count_time = half_part_time + ":00 + " + formatGameTime(time - half_part_time_in_sec);
      } else {
        count_time = formatGameTime(time);
      }
      break;
    case 2: // 2nd half start to end
      if (time > half_part_time_in_sec) {
        count_time = half_part_time * 2 + ":00 + " + formatGameTime(time - half_part_time_in_sec);
      } else {
        count_time = formatGameTime(time + half_part_time_in_sec);
      }
      break;
    case 3: // 1st extra start to end
      if (time > 900) {
        count_time = (half_part_time * 2 + 15) + ":00 + " + formatGameTime(time - 900);
      } else {
        count_time = formatGameTime(time + half_part_time_in_sec * 2);
      }
      break;
    case 4: // 2nd extra start to end
       if (time > 900) {
        count_time = (half_part_time * 2 + 30) + ":00 + " + formatGameTime(time - 900);
       } else {
         count_time = formatGameTime(time + half_part_time_in_sec * 2 + 900);
       }
       break;
    default: // Penalty shoot start to end
      count_time = has_extra_time ? (half_part_time_in_sec * 2 + 900 * 2) : (half_part_time_in_sec * 2);
      count_time = formatGameTime(count_time);
  }
  return count_time;
}

/*
 * 同Rails的truncate。对过长的字符串进行省略，因为需求简单，目前只有长度可以配置
 *
 * Example:
 *   truncate("My name is David", 10)  =>  "My name..."
 */
function truncate(str, length) {
  if (!length) {
    length = 11;
  }
  return (str.length > length) ? str.slice(0, length-3) + "..." : str;
}

Date.prototype.formattime = function(format) {
  var o = {
    "M+": this.getMonth()+1,                  //month
    "d+": this.getDate(),                     //day
    "h+": this.getHours(),                    //hour
    "m+": this.getMinutes(),                  //minute
    "s+": this.getSeconds(),                  //second
    "q+": Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds()              //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("("+ k +")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
  }
  return format;
}

function getTZOffsetSeconds() {
  return new Date().getTimezoneOffset() * 60;
}

function game_time_display(game_time) {
  var m_ = "00'";
  var s_ = "00";
  if (game_time > 0) {
    var minutes = parseInt(game_time / 60);
    var seconds = game_time % 60;
    m_ = (minutes < 10 ? "0" : "") + minutes + "'";
    s_ = (seconds < 10 ? "0" : "") + seconds;
  }
  return m_ + s_;
}

/*
 * 将十六进制的颜色值转换成RGB或者RGBA值
 *
 * Example:
 *   colorHexToRgb('#FFF')             ->    rgb(255, 255, 255)
 *   colorHexToRgb('#FFFAAA')          ->    rgb(255, 250, 170)
 *   colorHexToRgb('#FFFAAA', 0.2)     ->    rgba(255, 250, 170, 0.2)
 */
function colorHexToRgb(hex, opacity) {
  if (!/^#[0-9A-F]{3}([0-9A-F]{3})?$/i.test(hex)) {
    throw "The color hex format is incorrect."
  }

  hex = hex.slice(1);
  if (hex.length === 3) {
    hex = hex + hex;
  }

  var rgbArr = [];
  for (var i = 0; i < 5; i+=2) {
    rgbArr.push(parseInt(hex.substr(i, 2), 16));
  }

  var rgb;
  if (typeof opacity === 'number') {
    rgb = "rgba("+rgbArr.join(', ')+", "+opacity+")";
  } else {
    rgb = "rgb("+rgbArr.join(', ')+")";
  }

  return rgb;
}
/* 闪烁效果，用于group页面顶部的最新事件
 *
 * Example:
 *   flickerEffect(elm)                  ->     默认闪烁3下
 *   flickerEffect(elm, {times: 5})      ->     闪烁5下
 */
function flickerEffect(elm, opts) {
  var defaultOpts = {times: 3};
  if (!opts) {
    opts = defaultOpts;
  }
  opts = $.extend({}, defaultOpts, opts);

  for (var i = 1; i <= opts.times; i++) {
    elm.fadeOut('fast').fadeIn('fast');
  }

  return elm;
}


var transOtherEvents = {1: 'Player Coming Out', 2: 'Players warm-up', 3: 'Teams shake hands', 4: 'Game will start soon', 5: 'Match restart', 6: 'Slow Game Speed', 7: 'Fast Game Speed'};
var transEvents = {1: 'Goal', 2: 'Penalty Kick', 3: 'Yellow Card', 4: 'Red Card', 5: 'Attack', 6: 'Dangerous Attack', 7: 'Shoot', 8: 'Corner', 9: 'Free Kick', 10: 'Throw In', 11: 'Shot On Target', 12: 'Shot Off Target', 13: 'Dangerous Free Kick', 14: 'Penatly - Ready', 15: 'Penatly - Shoot', 16: 'Penalty Miss', 17: 'Penatly - Goal', 18: 'Kick Standby', 19: 'Ball Kick Out', 20: 'Free Kick - Ready', 21: 'Free Kick - Shoot', 22: 'Safe', 23: 'Substitution', 24: 'Player injury', 25: 'Rhythm', 26: 'Offside', 27: 'Foul', 28: 'Danger Danger', 29: 'Match Pause', 30: 'Match Continue', 31: 'Lost Connection', 32: 'Active Connection,checking status', 33: 'Goal to be Confirm', 34: 'Goal Canceled', 35: 'Red Card to be Confirm', 36: 'Red Card Canceled', 37: 'Yellow Card to be Confirm', 38: 'Yellow Card Canceled', 39: 'Penatly to be Confirm', 40: 'Penalty Kick Canceled', 41: '1st Half start', 42: '1st Half end', 43: '2nd Half start', 44: '2nd Half end', 45: '1st Extra start', 46: '1st Extra end', 47: '2nd Extra start', 48: '2nd Extra end', 49: 'Penalty Shoot start', 50: 'Penalty Shoot end', 52: 'VAR time confirmed, please hold', 53: 'VAR TIME, please hold', 54: 'Not VAR , Match continue', 55: 'Process Restart', 56: 'Modify Time', 57: 'Half Part Continue', 58: 'Match Cancelled', 59: 'Corner Wait Confirm', 60: 'Corner Canceled', 61: 'Injury Time', 99: 'Info'};
var transMpStatus = {delete_op: 'Delete', deleted: 'Deleted'};
var transDescPks = {center_court: 'Center Court', safe: 'Safe', goal_kick: 'Goal Kick', fore_court: 'Fore Court', back_court: 'Back Court'}
var transRhythms = {good: 'Good', slowly: 'Slowly', normal: 'Normal'};

function matchEvent(ops, transTeams, data, youthRace, hasExtraTime) {
	var transOtherEvents = ops.transOtherEvents;
	var transEvents = ops.transEvents;
	var transMpStatus = ops.transMpStatus;
	var transDescPks = ops.transDescPks;
	var transRhythms = ops.transRhythms;
	
  var event = data.events[0];
	var time = format_match_clock(event.pos, event.gt, youthRace, hasExtraTime);
  if (event.pk === 'f_other') {
    if (event.oeId) {
      name = transOtherEvents[event.oeId];
    } else {
      name = event.data.text;
    }
  } else if (event.pk === "f_injury_time") {
      name = transEvents[event.meId];
      name += " " + (event.data && event.data.text || '');
  } else {
    name = transEvents[event.meId];
    if (event.act === 'delete') {
      name = transMpStatus.delete_op + ' ' + name;
    }
    if (event.pk === 'f_rhythm' && event.data && event.data.rhythm) {
      name += ' '+ transRhythms[event.data.rhythm];
    }
    if (event.data && event.data.desc_pk) {
      name += ' ('+ transDescPks[event.data.desc_pk]+')';
    }
    if (event.act !== 'delete' && event.pk === 'f_goal' && event.data) {
      name = "["+event.data.home_score+" : "+ event.data.guest_score+"] "+name;
    }
    if (event.append) {
      name += " (Append)";
    }
		if (event.mtId) {
			name +=' - '  + transTeams[event.mtId]
		}
  }

  if (event.pk.indexOf('f_test_') > -1) {
    name = event.text;
  }
  return [time, name];
}

export {
	format_match_clock,
	transOtherEvents,
	transEvents,
	transMpStatus,
	transDescPks,
	transRhythms,
	matchEvent,
    game_time_display
}