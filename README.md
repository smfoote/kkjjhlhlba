kkjjhlhlba
==========

Chrome should have more keyboard shortcuts. Let's get started.

How it works
------------
kkjjhlhlba adds a keydown and keyup event listener on the body of the HTML page. It converts the pressed key's keycode into the key's value, and builds a string based on the keys that have been pressed. On each keyup, it checks if the string corresponds to a registered shortcut.

To register a shortcut, use:

    kkjjhlhlba.start({
      'shortcuts': {
        'ctrl+k,i,m,d,b': {
          'description': 'Go to IMDB',
          'method': 'http://www.imdb.com'
        }
      }
    });

`method` accepts a url (if you redirect) or a function.

Installation
------------
To try out the Chrome extension:

1.  clone the repo
2.  go to chrome://chrome/extensions/ in Google Chrome
3.  Make sure "Developer Mode" is checked
4.  Click "Load unpacked extension..."
5.  Inside the kkjjhlhlba directory, choose the "extension" directory.
6.  Go!

What's with the name?
---------------------
Think Vim and 80's video games.
