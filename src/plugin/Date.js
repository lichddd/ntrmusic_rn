Date.prototype.Format = function (formatStr) {
  var str = formatStr;
  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
  var month = this.getMonth() + 1;
  str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
  str = str.replace(/M/g, month);
  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
  str = str.replace(/d|D/g, this.getDate());
  var hour=this.getHours();
  str = str.replace(/hh/, hour > 9 ? hour.toString() : '0' + hour);
  var min = this.getMinutes();
  str = str.replace(/mm/, min > 9 ? min.toString() : '0' + min);
  var sec=this.getSeconds();
  str = str.replace(/ss/, sec > 9 ? sec.toString() : '0' + sec);
  return str;
}
