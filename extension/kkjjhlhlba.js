console.log('loading kkjjhlhlba');
function Kkjjhlhlba() {
  var keyCodes = {
    '8': 'delete',
    '9': 'tab',
    '13': 'enter',
    '16': 'shift',
    '20': 'capslock',
    '27': 'esc',
    '32': 'space',
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down',
    '48': '0',
    '49': '1',
    '50': '2',
    '51': '3',
    '52': '4',
    '53': '5',
    '54': '6',
    '55': '7',
    '56': '8',
    '57': '9',
    '65': 'a',
    '66': 'b',
    '67': 'c',
    '68': 'd',
    '69': 'e',
    '70': 'f',
    '71': 'g',
    '72': 'h',
    '73': 'i',
    '74': 'j',
    '75': 'k',
    '76': 'l',
    '77': 'm',
    '78': 'n',
    '79': 'o',
    '80': 'p',
    '81': 'q',
    '82': 'r',
    '83': 's',
    '84': 't',
    '85': 'u',
    '86': 'v',
    '87': 'w',
    '88': 'x',
    '89': 'y',
    '90': 'z',
    '112': 'f1',
    '113': 'f2',
    '114': 'f3',
    '115': 'f4',
    '116': 'f5',
    '117': 'f6',
    '118': 'f7',
    '119': 'f8',
    '120': 'f9',
    '121': 'f10',
    '122': 'f11',
    '123': 'f12',
    '186': ';',
    '187': '=',
    '189': '-',
    '192': '`',
    '219': '[',
    '220': '\\',
    '221': ']',
    '222': '\'',
    '188': ',',
    '190': '.',
    '191': '/',

    // Mac specific
    '17': 'ctrl',
    '18': 'opt',
    '91': 'lcommand',
    '93': 'rcommand',

  // uppercase for non letters
    '1048': ')',
    '1049': '!',
    '1050': '@',
    '1051': '#',
    '1052': '$',
    '1053': '%',
    '1054': '^',
    '1055': '&',
    '1056': '*',
    '1057': '(',
    '1186': ':',
    '1187': '+',
    '1189': '_',
    '1192': '~',
    '1219': '{',
    '1219': '|',
    '1221': '}',
    '1188': '<',
    '1190': '>',
    '1191': '?'
  };

  // {Object} containing all shortcuts generated by the developer using kkjjhlhlba.start().
  // Each shortcut is an object that looks like this:
  // 'k,k,j,j,h,l,h,l,b,a': {
  //   'description': 'Konami code',
  //   'method': function() {
  //     // Your code goes here
  //   }
  // }
  // The function in 'method' can be replaced by a URL string, in which case the window will be
  // redirected to the given URL using window.location
  var shortcuts;

  // The current sequence of keys that have been entered by the user. This variable is cleared
  // out each time a function is exectued, or the keyboard is idle for 3/4 of a second.
  var currentCode = '';

  // This array is used to track the keys that are currently down. Keys are removed from this
  // array on keyup.
  var pressedKeys = [];

  // To make 'lcommand+shift+f' (or any sequence containing a '+') possible, we need to check
  // if the same value is being pressed twice, or if the key is still down. This probably needs
  // a better solution, so you can hold down a single key and make an action repeat.
  var previousVal = '';

  // Used to check if the shift key is being held down. If it is, we convert other keys to
  // thier uppercase version.
  var isShiftDown = false;

  // Used with isShiftDown to convert non-letter keys to uppercase
  var shiftKeyOffset = 1000;

  // Used to clear out currentCode after an extended period of idle time.
  var inputTimer;

  // Utility function for cross browser events
  var addEventListener = function (el, evt, callback) {
    if (document.addEventListener) {
      addEventListener = function(el, evt, callback) {
        el.addEventListener(evt, callback, false);
      };
    } else if (document.attachEvent) {
      addEventListener =  function(el, evt, callback) {
        el.attachEvent('on' + evt, callback);
      };
    } else {
      addEventListener = function () {
        return false;
      };
    }
    addEventListener(el, evt, callback);
  };

  // Utility function to prevent default cross browser
  var preventDefault = function (e) {
    if (e.preventDefault) {
     preventDefault = function(e) {
         e.preventDefault();
       };
     } else {
      preventDefault = function(e) {
        e.returnValue = false;
      };
    }
  };

  // Util function to get key vals cross browser
  function getKeycode(e) {
    e = (window.event) ? window.event : e;
    key = e.which ? e.which : e.keyCode;
    return key;
  }

  // Run on each keydown.
  function handleKeyDown (e) {
    var key, val, shortcut, method;
    var keydisplay = document.getElementById("key-display");
    var activeElementTag = document.activeElement.tagName.toUpperCase();
    // Do nothing if the focus is in an input or textarea.
    // TODO: check if the focus is in input[type="text"]. all the others are probably okay
    if (activeElementTag === 'INPUT' || activeElementTag === 'TEXTAREA') {
      return;
    }
    // Convert keycode into the corresponding key's value
    key = getKeycode(e);
    val = keyCodes[key];
    if(val === "shift") {
      isShiftDown = true;
    } else {
      if(isShiftDown) {
        // If shift is pressed, convert the pressed key to uppercase, or the shifted val
        val = keyCodes[key+shiftKeyOffset] || val.toUpperCase();
      }

      // Build the string of key sequences
      if (currentCode === '') {
        // The first key pressed in the sequence
        currentCode = val;
      } else if (pressedKeys.length) {
        // If more than one key is currently pressed, and the current value is not the same
        // as the previous value
        if (val !== previousVal) {
          currentCode += '+' + val;
        }
      } else {
        // If no other keys are currently pressed, separate with commas.
        currentCode += ',' + val;
      }

      // Add the currently pressed key to the pressedKeys array, if it is not the same key as
      // the previously pressed key.
      if (val !== previousVal) {
        pressedKeys.push(val);
      }
      previousVal = val;

      // Display the current code in the page [for presentation purposes only - remove on 
      // Nov. 29, 2012]
      keydisplay.className = "";
      keydisplay.innerHTML = currentCode;
    }
  }

  // Run on each key up
  function handleKeyUp (e) {
    var key, val, shortcut, method;
    var keydisplay = document.getElementById("key-display");
    var activeElementTag = document.activeElement.tagName.toUpperCase();

    // Do nothing if focus is in an input or textarea
    if (activeElementTag === 'INPUT' || activeElementTag === 'TEXTAREA') {
      return;
    }

    // Convert keycode to corresponding key's value
    key = getKeycode(e);
    val = keyCodes[key];

    // Update isShiftDown flag
    if(val === "shift") {
      isShiftDown = false;
    }

    // Remove current key from pressedKeys array
    pressedKeys.splice(pressedKeys.indexOf(val), 1);

    // Reset timer
    window.clearTimeout(inputTimer);

    // Check if the currentCode is a member of the shortcuts object
    shortcut = shortcuts[currentCode];
    if (shortcut && shortcut.method) {
      // If the shortcut object is found, and it has a 'method' attribute, run the method.
      method = shortcut.method;
      // TODO: regex to make sure the string is a valid URL
      if (typeof method === 'string') {
        // Redirect to the URL if 'method' is a string.
        window.location = method;
      } else {
        if (shortcut.preventDefault) {
          // Prevent default, if necessary
          preventDefault();
        }
        // call the method, passing the event as an argument
        method.call(this, [e]);

        // Reset the currentCode
        currentCode = '';

        // And hide the keydisplay [remove after Nov. 29, 2012]
        window.setTimeout(function() {
          if (keydisplay.className.search('hidden') < 0) {
            keydisplay.className += ("hidden");
          }
        }, 750);
      }
    } else {
      // If no shortcut is found, start a new timer.
      inputTimer = window.setTimeout(function() {
        // After 750 ms (3/4 of a second) inactivity, reset the currentCode
        currentCode = '';
        // And hide the keydisplay [remove after Nov. 29, 2012]
        if (keydisplay.className.search('hidden') < 0) {
          keydisplay.className += ("hidden");
        }
      }, 750);
    }
  }

  // Loop through the shortcuts object and create a cheatsheet with all of shortcuts
  function createCheatSheet(shortcuts) {
    // This element is appended the first time kkjjhlhlba.js is initialized.
    var container = document.getElementById('keyboard-shortcuts');
    var cheatsheet = '<h2>Keyboard Shortcuts</h2><ul class="shortcuts">';
    var shortcut, closeButton;
    var maxElements = 7;
    var currentElements = 0;
    for (var method in shortcuts) {
      if (shortcuts.hasOwnProperty(method)) {
        shortcut = shortcuts[method];
        if(currentElements >= maxElements) {
          currentElements = 0;
          cheatsheet += '</ul><ul class="shortcuts">';
        }
        cheatsheet += '<li class="shortcut">' + method + ' <span class="description">' + shortcut.description + '<span></li>';
      }
      currentElements ++;
    }
    cheatsheet += '</ul><button type="button" id="close-cheatsheet">Close</button></div>';
    // Put created HTML into the container
    container.innerHTML = cheatsheet;

    // Add event listener on the close button.
    closeButton = document.getElementById('close-cheatsheet');
    addEventListener(closeButton, 'click', function() {
      container.className = container.className.replace(/\s*active/, '');
    });
  }

  // Show the cheatsheet by adding the class "active"
  function showCheatsheet() {
    var cheatsheet = document.getElementById('keyboard-shortcuts');
    if (!(cheatsheet.className.indexOf('active') > -1)) {
      cheatsheet.className += ' active';
    }
  }

  return {
    // The only public method: start
    // Used to add new keyboard shortcuts to the page. Start will merge the new shortcuts
    // object with the existing shortcuts object. New instantiations will overwrite in the case
    // of a conflict.
    start: function(config) {
      var method;
      var cheatsheet;
      var keydisplay;
      if (!shortcuts) {
        // If the shortcuts object doesn't exist yet, no mergin is necessary.
        shortcuts = config.shortcuts;
        // Add the showCheatsheet shortcut
        shortcuts['?'] = {
          method: showCheatsheet,
          description: 'Show this keyboard shortcuts cheatsheet'
        };

        // Set up the event listeners
        addEventListener(document, 'keydown', handleKeyDown, false);
        addEventListener(document, 'keyup', handleKeyUp, false);

        // Create the cheatsheet container, and append it to the end of the <body>
        cheatsheet = document.createElement('div');
        cheatsheet.id = 'keyboard-shortcuts';
        document.body.appendChild(cheatsheet);

        // Create the keydisplay container, and append it to the end of the <body>
        // TODO: remove this after Nov. 29, 2012
        keydisplay = document.createElement('div');
        keydisplay.id = 'key-display';
        keydisplay.className += 'hidden';
        document.body.appendChild(keydisplay);
      } else {
        // If the shortcuts object already exists, merge
        for (method in config.shortcuts) {
          if (config.shortcuts.hasOwnProperty(method)) {
            shortcuts[method] = config.shortcuts[method];
          }
        }
      }

      // Recreate cheatsheet each time start is run, so the final cheatsheet is accurate.
      createCheatSheet(shortcuts);
    }
  };
}

// Create single instance of Kkjjhlhlba.
var kkjjhlhlba = new Kkjjhlhlba();

(function() {
  function getOffsetTop(el) {
    var offsetTop = 0;
    do {
      offsetTop += el.offsetTop;
    } while (el = el.offsetParent);
    return offsetTop;
  }

  function setFocusOn(el) {
    var offsetTop = getOffsetTop(el) - 50;
    var scrollPos = document.body.scrollTop;
    var anchor = el.getElementsByTagName('a')[0];
    el.className += ' kkjj-focus';
    anchor.focus();
    document.body.scrollTop = offsetTop;
  }

  function navigateList(direction, containerID, listClassName) {
    var list = document.getElementById(containerID);
    console.log(list);
    var focusedElement = list.getElementsByClassName('kkjj-focus');
    if (!focusedElement.length) {
      focusedElement = list.getElementsByClassName(listClassName)[0];
    } else {
      focusedElement = focusedElement[0];
      focusedElement.className = focusedElement.className.replace(/\s+kkjj-focus\b/, '');
      if (direction === 'next' && focusedElement.nextElementSibling) {
        focusedElement = focusedElement.nextElementSibling;
      } else if (focusedElement.previousElementSibling) {
        focusedElement = focusedElement.previousElementSibling;
      }
    }
    setFocusOn(focusedElement);
  }

  kkjjhlhlba.start({
    'shortcuts': {
      'ctrl+k,g,m': {
        'description': 'Go to Gmail',
        'method': 'http://mail.google.com'
      },
      'ctrl+k,g,o,o,g': {
        'description': 'Go to Gmail',
        'method': 'http://mail.google.com'
      },
      'ctrl+k,l,i': {
        'description': 'Go to LinkedIn',
        'method': 'http://linkedin.com'
      },
      'ctrl+k,f,b': {
        'description': 'Go to Facebook',
        'method': 'http://facebook.com'
      },
      'ctrl+k,t,w': {
        'description': 'Go to Twitter',
        'method': 'http://twitter.com'
      },
    }
  });

  if (document.domain.indexOf('linkedin.com') > -1) {
    kkjjhlhlba.start({
      'shortcuts': {
        'j': {
          'description': 'Next item',
          'method': function() {
            console.log('hey there');
            switch (document.body.id) {
              case 'pagekey-member-home':
                navigateList('next', 'my-feed-post', 'feed-item');
                break;
              case 'pagekey-voltron_federated_search_internal':
                navigateList('next', 'results', 'result');
                break;
            }
          }
        },
        'k': {
          'description': 'Previous item',
          'method': function() {
            console.log(document.body.id);
            switch (document.body.id) {
              case 'pagekey-member-home':
                navigateList('previous', 'my-feed-post', 'feed-item');
                break;
              case 'pagekey-voltron_federated_search_internal':
                navigateList('previous', 'results', 'result');
                break;
            }
          }
        },
        '/': {
          'description': 'Search LinkedIn',
          'method': function() {
            document.getElementById('main-search-box').focus();
          }
        }
      }
    });
  }
})();
