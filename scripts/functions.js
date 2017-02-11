
function capitaliseFirstLetter(str)
{
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function pad(n) { //add 0 if n < 10
   	return (n < 10) ? ("0" + n) : n;
}

function beginsWith(needle, haystack){
    return (haystack.substr(0, needle.length) == needle);
}

Array.prototype.chunk = function(chunkSize) {
    var R = [];
    for (var i=0; i<this.length; i+=chunkSize)
        R.push(this.slice(i,i+chunkSize));
    return R;
}

function in_array(array, id) {
    for(var i=0;i<array.length;i++) {
        if (array[i] === id)
            return (i);
    }
    return -1;
}


if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}

function remove(arr, item) {
  console.log("want to remove item");
  console.log(item);
      for(var i = arr.length; i--;) {
          if(arr[i] === item) {
            console.log("removed " + i);
              arr.splice(i, 1);
          }
      }
  }
function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


var gatherGroupsId = function(groups){
  var groupsId = [];
  //'{"groups":[';
  groups.forEach(function(elem, index, array)
  {
    console.log(elem);
    if (elem.checked)
      groupsId.push(elem.id);
  });
  return ('{"groups":['+ groupsId.join(",")+"]}");
}



function get_by_id(arr, item)
{
  for(var i = arr.length; i--;) {
      if(arr[i].id === item.id) {
        console.log("found " + i);
        return (i)
      }
  }
  return (-1);
}
function remove_with_id(arr, id)
{
  console.log(arr);
  console.log(id);
  arr.forEach(function(entry)
  {
    console.log(entry);
    if (entry.entry.entry_id == id) //(remove your like from list)
    {
      remove(arr, entry);
      return (false);
    }
  });
}

function sameDOMElement(elem1, elem2)
{
  return (elem1[0] === elem2[0]);
}

function checkIfInOpened(arr, elem)
{
  var val = 0;
  var i = -1;
  arr.forEach(function(element)
  {
    i++;
    if (sameDOMElement(element, elem))
      val = 1;
    if (val)
      return (i);
  });
  if (val)
    return (i);
  else
    return (-1);
}

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

//JQUERY.UI fix (shake bug with padding)

if ($.ui) {
    (function () {
        var oldEffect = $.fn.effect;
        $.fn.effect = function (effectName) {
            if (effectName === "shake") {
                var old = $.effects.createWrapper;
                $.effects.createWrapper = function (element) {
                    var result;
                    var oldCSS = $.fn.css;

                    $.fn.css = function (size) {
                        var _element = this;
                        var hasOwn = Object.prototype.hasOwnProperty;
                        return _element === element && hasOwn.call(size, "width") && hasOwn.call(size, "height") && _element || oldCSS.apply(this, arguments);
                    };

                    result = old.apply(this, arguments);

                    $.fn.css = oldCSS;
                    return result;
                };
            }
            return oldEffect.apply(this, arguments);
        };
    })();
}



function setCookie(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}
if ($.ui) {
    (function () {
        var oldEffect = $.fn.effect;
        $.fn.effect = function (effectName) {
            if (effectName === "shake") {
                var old = $.effects.createWrapper;
                $.effects.createWrapper = function (element) {
                    var result;
                    var oldCSS = $.fn.css;

                    $.fn.css = function (size) {
                        var _element = this;
                        var hasOwn = Object.prototype.hasOwnProperty;
                        return _element === element && hasOwn.call(size, "width") && hasOwn.call(size, "height") && _element || oldCSS.apply(this, arguments);
                    };

                    result = old.apply(this, arguments);

                    $.fn.css = oldCSS;
                    return result;
                };
            }
            return oldEffect.apply(this, arguments);
        };
    })();
}




$.fn.mobileFix = function (options) {
    var $parent = $(this),
    $fixedElements = $(options.fixedElements);
    console.log($parent);
    $(document)
    .on('focus', options.inputElements, function(e) {
        $parent.addClass(options.addClass);
    })
    .on('blur', options.inputElements, function(e) {
        $parent.removeClass(options.addClass);

        // Fix for some scenarios where you need to start scrolling
        setTimeout(function() {
            $(document).scrollTop($(document).scrollTop())
        }, 1);
    });

    return this; // Allowing chaining
};

// STATIC 

var MAXPERPAGE = 100;


// DEV MODE LOG
var dev_mode = false;
var dev = {
  log:function(data){
    if(dev_mode){
      console.log(data);
    }
  },
  error:function(data){
    if(dev_mode){
      console.error(data);
    }
  }
};