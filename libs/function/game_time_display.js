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

export default game_time_display;
