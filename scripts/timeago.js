function timeDifference(dateStr){
  var time = ('' + dateStr).replace(/-/g,"/").replace(/[TZ]/g," ");
  var seconds = (new Date - new Date(time)) / 1000;
  var i = 0, format;
  if (seconds < 0)
    return ("in the future");
  while (format = timeDifference.formats[i++]) if (seconds < format[0])
    return format[2] ? Math.floor(seconds / format[2]) + ' ' + format[1] + ' ago' :  format[1];
  return time;
};
timeDifference.formats = [
  [60, 'seconds', 1],
  [120, '1 minute ago'],
  [3600, 'minutes', 60],
  [7200, '1 hour ago'],
  [86400, 'hours', 3600],
  [172800, 'Yesterday'],
  [604800, 'days', 86400],
  [1209600, '1 week ago'],
  [2419200, 'weeks', 604800],
  [4838400,"1 month ago"],
  [29030400,"months",2419200],
  [58060800,"1 year ago"],
  [29030400000, "years",29030400]
];