function kkjjlhlhba(config) {
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

  var currentCode = '';

  // Used to clear out currentCode after an extended period of idle time.
  var inputTimer;

  if (document.addEventListener) {
    document.addEventListener('keydown', handleKeyDown, false);
  } else if (document.attachEvent) {
    document.attachEvent('onkeydown', handleKeyDown);
  }

  function handleKeyDown (e) {
    var key, val, method;
    e = (window.event) ? window.event : e;
    key = e.which ? e.which : e.keyCode;
    val = keyCodes[key] || '';
    currentCode = (currentCode === '') ? val : currentCode + ',' + val;
    window.clearTimeout(inputTimer);
    if (config[currentCode] && config[currentCode].method) {
      method = config[currentCode].method;
      if (typeof method === 'string') {
        window.location = method;
      } else {
        config[currentCode].method.call();
        currentCode = '';
      }
    } else {
      inputTimer = window.setTimeout(function() {
        currentCode = '';
      }, 1500);
    }
  }
}

kkjjlhlhba({
  'g,i': {
    'description': 'Go to inbox',
    'method': function () {
      console.log('GOING TO INBOX');
    }
  },
  'l,i': {
    'description': 'Go to LinkedIn',
    'method': 'http://linkedin.com'
  }
});
