'use strict';

angular.module(config.app.name).directive('clickOn', function(){
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			scope.selectedDate = {month_id:6, day:18, year:2014, hour: 8, minutes:0, ampm:0};
			scope.months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			scope.ampm = ["AM", "PM"];
			scope.sched = {hour: "08", minutes: "00"};

			scope.nextMonth = function(){
				if (scope.selectedDate.month_id == 11)
					scope.selectedDate.month_id = 0;
				else
					scope.selectedDate.month_id += 1;
				if (scope.selectedDate.month_id == 1)
				{
					if (scope.selectedDate.day > 29 && ((scope.selectedDate.year % 4 == 0 && scope.selectedDate % 100 != 0) || (scope.selectedDate % 400 == 0)))
						scope.selectedDate.day = 29;
					else if (scope.selecteDate.day > 28 && !((scope.selectedDate.year % 4 == 0 && scope.selectedDate % 100 != 0) || (scope.selectedDate % 400 == 0)))
						scope.selectedDate.day = 28;

				}
				else
				{
					if (scope.selectedDate.day == 31 && !((scope.selectedDate.month_id <= 6 && scope.selectedDate.month_id % 2 == 0) || (scope.selectedDate.month_id >= 7 && scope.selectedDate.month_id % 2 != 0)))
						scope.selectedDate.day = 30;
				}
			}
			scope.lastMonth = function(){
				console.log(scope.selectedDate.month_id);
				if (scope.selectedDate.month_id == 0)
				{
					scope.selectedDate.month_id = 11;
				}
				else
					scope.selectedDate.month_id -= 1;
				console.log(scope.selectedDate.month_id);
			}
			scope.nextDay = function() {
				if (scope.selectedDate.month_id == 1)//February
				{
					if (scope.selectedDate.day == 28)//28 February
					{
						if ((scope.selectedDate.year % 4 == 0 && scope.selectedDate % 100 != 0) || (scope.selectedDate % 400 == 0))
							scope.selectedDate.day +=1;//Bissextile
						else
							scope.selectedDate.day = 1;
					}
					else if (scope.selectedDate.day == 29)
						scope.selectedDate.day = 1;
					else 
						scope.selectedDate.day += 1;
				}
				else if (scope.selectedDate.day == 30)
				{
					if ((scope.selectedDate.month_id <= 6 && scope.selectedDate.month_id % 2 == 0) || (scope.selectedDate.month_id >= 7 && scope.selectedDate.month_id % 2 != 0))
						scope.selectedDate.day += 1;
					else
						scope.selectedDate.day = 1;
				}
				else if (scope.selectedDate.day == 31)
					scope.selectedDate.day = 1;
				else
					scope.selectedDate.day += 1;
		 	}
		 	scope.lastDay = function() {
		 		if (scope.selectedDate.month_id == 2)//March
		 		{

		 			if (scope.selectedDate.day == 1)//0 March
		 			{
		 				if ((scope.selectedDate.year % 4 == 0 && scope.selectedDate % 100 != 0) || (scope.selectedDate % 400 == 0))
		 					scope.selectedDate.day = 29;//Bissextile
		 				else
		 					scope.selectedDate.day = 28;
		 			}
		 			else
		 				scope.selectedDate.day -= 1;
		 		}
		 		else if (scope.selectedDate.day == 1)
		 		{
		 			if ((scope.selectedDate.month_id <= 6 && scope.selectedDate.month_id % 2 == 0) || (scope.selectedDate.month_id >= 7 && scope.selectedDate.month_id % 2 != 0))
		 				scope.selectedDate.day = 31;
		 			else
		 				scope.selectedDate.day = 30;
		 		}
		 		else
		 			scope.selectedDate.day -= 1;
		 	}
		 	scope.nextYear = function() {
		 		scope.selectedDate.year += 1;
		 	}
		 	scope.lastYear = function() {
		 		scope.selectedDate.year -= 1;
		 	}
		 	scope.nextHour = function() {
		 		if (scope.selectedDate.hour == 12)
		 			scope.selectedDate.hour = 0;
		 		else 
		 			scope.selectedDate.hour += 1;
		 		scope.sched.hour = pad(scope.selectedDate.hour);
		 	}
		 	scope.lastHour = function() {
		 		if (scope.selectedDate.hour == 0)
		 			scope.selectedDate.hour = 12;
		 		else 
		 			scope.selectedDate.hour -= 1;
		 		scope.sched.hour = pad(scope.selectedDate.hour);
		 	}
		 	scope.nextMin = function(){
		 		if (scope.selectedDate.minutes == 59)
		 			scope.selectedDate.minutes = 0;
		 		else 
		 			scope.selectedDate.minutes += 1;
		 		scope.sched.minutes = pad(scope.selectedDate.minutes);
		 	}
		 	scope.lastMin = function(){
		 		if (scope.selectedDate.minutes == 0)
		 			scope.selectedDate.minutes = 59;
		 		else 
		 			scope.selectedDate.minutes -= 1;
		 		scope.sched.minutes = pad(scope.selectedDate.minutes);
		 	}
		 	scope.nextAmpm = function() {
		 		if (scope.selectedDate.ampm == 0)
		 			scope.selectedDate.ampm = 1;
		 		else
		 			scope.selectedDate.ampm = 0;
		 	}
 		}
}
});
