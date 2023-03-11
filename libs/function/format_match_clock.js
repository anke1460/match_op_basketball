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

export default format_match_clock;