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
    '93': 'rcommand'
  };

  var shortcuts;
  var currentCode = '';
  var pressedKeys = [];
  var previousVal = '';

  // Used to clear out currentCode after an extended period of idle time.
  var inputTimer;

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

  function handleKeyDown (e) {
    var key, val, shortcut, method;
    e = (window.event) ? window.event : e;
    key = e.which ? e.which : e.keyCode;
    val = keyCodes[key] || '';
    if (currentCode === '') {
      currentCode = val;
    } else if (pressedKeys.length) {
      if (val !== previousVal) {
        currentCode += '+' + val;
      }
    } else {
      currentCode += ',' + val;
    }
    if ( val !== previousVal) {
      pressedKeys.push(val);
    }
    previousVal = val;
  }

  function handleKeyUp (e) {
    var key, val, shortcut, method;
    e = (window.event) ? window.event : e;
    key = e.which ? e.which : e.keyCode;
    val = keyCodes[key] || '';
    pressedKeys.splice(pressedKeys.indexOf(val), 1);
    window.clearTimeout(inputTimer);
    shortcut = shortcuts[currentCode];
    if (shortcut && shortcut.method) {
      method = shortcut.method;
      if (typeof method === 'string') {
        window.location = method;
      } else {
        if (shortcut.preventDefault) {
          preventDefault();
        }
        method.call(this, [e]);
        currentCode = '';
      }
    } else {
      inputTimer = window.setTimeout(function() {
        currentCode = '';
      }, 1000);
    }
  }

  function preventDefault(e) {
    if (e.preventDefault) {
     return (function(e) {
         e.preventDefault();
       });
     } else {
      return (function(e) {
        e.returnValue = false;
      });
    }
  }

  function createCheatSheet(shortcuts) {
    var container = document.getElementById('keyboard-shortcuts');
    var cheatsheet = '<h2>Keyboard Shortcuts</h2><ul class="shortcuts">';
    var shortcut, closeButton;
    for (var method in shortcuts) {
      if (shortcuts.hasOwnProperty(method)) {
        shortcut = shortcuts[method];
        cheatsheet += '<li class="shortcut">' + method + ' <span class="description">' + shortcut.description + '<span></li>';
      }
    }
    cheatsheet += '</ul><button type="button" id="close-cheatsheet">Close</button></div>';
    container.innerHTML = cheatsheet;
    closeButton = document.getElementById('close-cheatsheet');
    addEventListener(closeButton, 'click', function() {
      container.className = container.className.replace(/\s*active/, '');
    });
  }

  function showCheatsheet() {
    var cheatsheet = document.getElementById('keyboard-shortcuts');
    if (!cheatsheet.className.indexOf('active') > -1) {
      cheatsheet.className += ' active';
    }
  }

  return {
    start: function(config) {
      var method;
      var cheatsheet;
      if (!shortcuts) {
        shortcuts = config.shortcuts;
        shortcuts['shift+/'] = {
          method: showCheatsheet,
          description: 'Show the keyboard shortcuts cheatsheet'
        };
        addEventListener(document, 'keydown', handleKeyDown, false);
        addEventListener(document, 'keyup', handleKeyUp, false);
        cheatsheet = document.createElement('div');
        cheatsheet.id = 'keyboard-shortcuts';
        document.body.appendChild(cheatsheet);
      } else {
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
