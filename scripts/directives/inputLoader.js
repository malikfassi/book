'use strict';

angular.module(config.app.name).directive('inputLoader', function($compile){
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
    		/*	input.onchange = function () {
				  var file = input.files[0];
				  displayAsImage(file);
				};

				function displayAsImage(file) {
				  var imgURL = window.URL.createObjectURL(file),
				      img = document.createElement('img');

				  img.onload = function() {
				    window.URL.revokeObjectURL(imgURL);
				  };

				  img.src = imgURL;
				  document.body.appendChild(img);
				}
				*/
				console.log(attr);
				if (attr.accept == "image/*")
				{
					var readURL = function(input) 
					{
						if (input.files && input.files[0])
						{
							scope.ultimateData = input.files;
							console.log(scope.ultimateData);
							scope.$apply();
					        var reader = new FileReader(); //ERROR IF BROWSER NOT HTML5
					        reader.onload = function (e)
					        {
					        	var parent = element.parent();
					        	var newElem = element.outerHTML();
					        	scope.loadedData=e.target.result;
					        	element.remove();
					        	newElem = parent.append($compile(newElem)(scope));
					        	scope.$apply();
					        }
					        reader.readAsDataURL(input.files[0]);
					    }
					}
					element.on("change", function(){
						readURL(this);
						console.log("element changed");
					});
				}
				else if (attr.accept =="video/*")
				{
					var readURL = function(input)
					{
						var file = input.files[0];
						scope.loadedData = file;
						scope.ultimateData = input.files;
						scope.$apply();
						console.log("element changed");
					}
					element.on("change", function() {
						readURL(this);
					});
				}
			}
		};
	});

