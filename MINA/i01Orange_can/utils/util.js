function getDiffTime(recordTime, yearsFlag) {
  if (recordTime) {
    recordTime = new Date(parseFloat(recordTime) * 1000);
    var minute = 1000 * 60,
      hour = minute * 60,
      day = hour * 24,
      now = new Date(),
      diff = now - recordTime;
    var result = '';
    if (diff < 0) {
      return result;
    }
    var weekR = diff / (7 * day);
    var dayC = diff / day;
    var hourC = diff / hour;
    var minC = diff / minute;
    if (weekR >= 1) {
      var formate = 'MM-dd hh:mm';
      if (yearsFlag) {
        formate = 'yyyy-MM-dd hh:mm';
      }
      return recordTime.format(formate);
    }
    else if (dayC == 1 || (hourC < 24 && recordTime.getDate() != now.getDate())) {
      result = '昨天' + recordTime.format('hh:mm');
      return result;
    }
    else if (dayC > 1) {
      var formate = 'MM-dd hh:mm';
      if (yearsFlag) {
        formate = 'yyyy-MM-dd hh:mm';
      }
      return recordTime.format(formate);
    }
    else if (hourC >= 1) {
      result = parseInt(hourC) + '小时前';
      return result;
    }
    else if (minC >= 1) {
      result = parseInt(minC) + '分钟前';
      return result;
    } else {
      result = '刚刚';
      return result;
    }
  }
  return '';
}

(function initTimeFormat() {
  Date.prototype.format = function (format) {
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
          ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  };
})()

//将50、35、00等形式转化成[1,1,1,1,1]的形式
function convertToStarsArray(stars) {
  var num = stars / 10;
  var array = [];
  for (var i = 1; i <= 5; i++) {

    if (i <= num) {
      array.push(1);
    }
    else {
      if ((i - num) === 0.5) {
        array.push(0.5)
      }
      else {
        array.push(0);
      }
    }
  }

  return array;
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  getDiffTime: getDiffTime,
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
}
