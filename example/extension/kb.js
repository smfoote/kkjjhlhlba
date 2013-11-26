(function() {
  var shortcuts;
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

  // Hide the cheatsheet by removing the class "active"
  function hideCheatSheet(el) {
    el.className = el.className.replace(/\s*active/, '');
  }


  kkjjhlhlba.start({
    noCheatsheet: true,
    shortcuts: {
      'ctrl+k,l,i': {
        description: 'Go to LinkedIn',
        method: 'http://linkedin.com'
      },
      'ctrl+k,f,b': {
        description: 'Go to Facebook',
        method: 'http://facebook.com'
      },
      'ctrl+k,t,w': {
        description: 'Go to Twitter',
        method: 'http://twitter.com'
      },
      'up,up,down,down,left,right,left,right,b,a,enter': {
        method: 'http://www.youtube.com/watch?v=9bzaVW8lHxI&feature=fvst'
      },
      'esc': {
        description: 'Close the cheatsheet',
        method: function() {
          var cheatsheet = document.getElementById('keyboard-shortcuts');
          if (cheatsheet && cheatsheet.className.indexOf('active') > -1) {
            hideCheatSheet(cheatsheet);
          }
        }
      }
    }
  });

  if (document.domain.indexOf('linkedin.com') > -1) {
    kkjjhlhlba.start({
      'shortcuts': {
        'j': {
          description: 'Next item',
          method: function() {
            switch (document.body.id) {
              case 'pagekey-member-home':
                navigateList('next', 'my-feed-post', 'feed-item');
                break;
              case 'pagekey-voltron_federated_search_internal':
              case 'pagekey-voltron_people_search_internal':
              case 'pagekey-voltron_job_search_internal':
              case 'pagekey-voltron_company_search_internal':
              case 'pagekey-voltron_group_search_internal':
                navigateList('next', 'results', 'result');
                break;
              case 'pagekey-fps_results':
                navigateList('next', 'result-set', 'vcard');
                break;
            }
          }
        },
        'k': {
          description: 'Previous item',
          method: function() {
            switch (document.body.id) {
              case 'pagekey-member-home':
                navigateList('previous', 'my-feed-post', 'feed-item');
                break;
              case 'pagekey-voltron_federated_search_internal':
              case 'pagekey-voltron_people_search_internal':
              case 'pagekey-voltron_job_search_internal':
              case 'pagekey-voltron_company_search_internal':
              case 'pagekey-voltron_group_search_internal':
                navigateList('previous', 'results', 'result');
                break;
              case 'pagekey-fps_results':
                navigateList('previous', 'result-set', 'vcard');
                break;
            }
          }
        },
        '/': {
          description: 'Search LinkedIn',
          method: function() {
            document.getElementById('main-search-box').focus();
          }
        },
        'ctrl+l,h': {
          description: 'Go to the LinkedIn Homepage',
          method: 'http://linkedin.com'
        },
        'ctrl+l,p': {
          description: 'Go to my LinkedIn Profile',
          method: 'http://linkedin.com/profile/view'
        }
      }
    });

    if (document.getElementById('srp_main_')) {
      kkjjhlhlba.start({
        'shortcuts': {
          'h': {
            description: 'Go to previous page of results',
            method: function() {
              var anchor = document.querySelector('#results-pagination .prev a');
              if (anchor) {
                window.location = anchor.href;
              }
            }
          },
          'l': {
            description: 'Go to next page of results',
            method: function() {
              var anchor = document.querySelector('#results-pagination .next a');
              if (anchor) {
                window.location = anchor.href;
              }
            }
          }
        }
      });
    }

    if (document.getElementById('postText-postModuleForm')) {
      kkjjhlhlba.start({
        'shortcuts': {
          'ctrl+l,u': {
            description: 'Share an update',
            method: function() {
              document.getElementById('postText-postModuleForm').focus();
            }
          }
        }
      });
    }
  } else if (document.domain.indexOf('facebook.com') > -1 && document.body.className.indexOf('timelineLayout') > -1) {
    kkjjhlhlba.start({
      'shortcuts': {
        'ctrl+l,s': {
          description: 'Search for this person on LinkedIn',
          method: function() {
            window.location = 'http://linkedin.com/vsearch/p?keywords=' + document.querySelector('#fbTimelineHeadline .name h2').innerHTML.split(' ').join('+');
          }
        }
      }
    });
  }

  shortcuts = kkjjhlhlba.getShortcuts();
  for (var key in shortcuts) {
    shortcut = shortcuts[key];
    console.log(key.split(',').join(', then ') + ': ' + shortcut.description);
  }
})();
