angular.module(config.app.name)
.filter('wordcut', function() {
  return function(input, length) {
    return length ? input.substring(0, length) : input;
  };
})
.filter('startsWith', function () {
  return function (items, letter) {
  	if (letter && items)
  	{
	    var filtered = [];
	    var letterMatch = new RegExp(letter, 'i');
	    for (var i = 0; i < items.length; i++) {
	      var item = items[i];
	      if (letterMatch.test(item.lastname.substring(0, letter.length))) {
	        filtered.push(item);
	      }
	    }
	    return filtered;
	}
	return items;
  }
})
.filter("date", function(){
	return function(timestamp, fullMonth, time)
	{
		if (!timestamp)
			return "error";
		var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
		var months = new Array("January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
		var d = new Date(timestamp);
		var month = months[d.getMonth()];
		var day = days[d.getDay()];
		var date = d.getDate();
		var year = d.getFullYear();
		var hours = pad(d.getHours());
		var ampm;
		if (hours < 12)
			ampm = "AM";
		else
		{
			ampm = "PM";
			hours -= 12;
		}
		var minutes = pad(d.getMinutes());
		var seconds = pad(d.getSeconds());
		if (!fullMonth)
			month = month.substring(0, 3);
		if (time)
			return (day+", "+month+" "+date+" "+year+", "+hours+":"+minutes+" "+ampm);
		return (month+" "+date+", "+year);
	}
})
.filter('fkdate', function(){
    // input (date/hour): "12-04-1998 12:45:30"
    // output : small : 2004/02/13
    // output : default : 2004/02/14 10:34 AM
	return function(input, format){
		input = input.split("");
		var inputA = input[0].split("-");
		var inputB = input[1].split(":");
		var inputStatic = input[0].split("-").join("/");
		inputB[0] = parseInt(inputB[0]);
		inputB[1] = parseInt(inputB[1]);
		inputA[0] = parseInt(inputA[0]);
		inputA[1] = parseInt(inputA[1]);
		inputA[2] = parseInt(inputA[2]);

		// LOCAL OFFSET
		var d = new Date();
		var time_offset = d.getTimezoneOffset();
		var min_offset = parseInt(time_offset)%60;
		var hour_offset = (time_offset - min_offset) / 60;

		// FORCED OFFSET
		var forced_offset = '00:00';
		hour_offset += parseInt(forced_offset.split(':')[0]);
		min_offset += parseInt(forced_offset.split(':')[1]);

		var test = {
			time_offset:time_offset,
			min_offset:min_offset,
			hour_offset:hour_offset,
			old_hour:inputB[0],
			old_min:inputB[1]
		};

		// HOURS
		if(inputB[0] >= hour_offset){
			inputB[0] = inputB[0] - hour_offset;
		}
		else{
			inputB[0] = 24 + inputB[0] - hour_offset;
			// REMOVE ONE DAY
			if(inputA[2] > 1){
				inputA[2] -= 1;
			}
			else{
				// REMOVE ONE MONTH
				if(inputA[1] > 1){
					inputA[1] -= 1;
				}
				else{
					// REMOVE ONE YEAR
					inputA[0] -= 1;
				}
			}
		}
		test.new_hour = inputB[0];
		// MINUTES
		if(inputB[1] >= min_offset){
			inputB[1] = inputB[1] - min_offset;
		}
		else{
			inputB[1] = 60 + inputB[1] - min_offset;
		}
		test.new_min = inputB[1];

		//console.log({timezone:test});

		//DAY CHECK
		inputA[1] = two_digits(inputA[1]);
		inputA[2] = two_digits(inputA[2]);
		inputA = inputA.join("/");
		// AM-PM MODEL
		var inputZ = '';
		if(inputB[0] > 12){
			inputB[0] = (inputB[0] - 12).toString();
			inputZ = 'PM';
		}
		else{
			inputZ = 'AM';
		}
		//two_digits
		var inputC = two_digits(inputB[0]) + ":" + two_digits(inputB[1]);
		if(format == 'small'){
			return inputA
		}
		else if(format == 'static'){
			return inputStatic
		}
		else{
			return inputA + " " + inputC + " " + inputZ
		}
	}
});