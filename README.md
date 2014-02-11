##kkjjhlhlba

kkjjhlhlba is a dependency-free tool that makes building keyboard shortcuts as easy as the [Konami code](https://en.wikipedia.org/wiki/Konami_Code). You define what shortcuts you want and kkjjhlhlba will make them work (and add a shortcut cheatsheet for you as a _free_ added bonus!).

###Getting started
1. Add kkjjhlhlba.js to your page.
2. kkjjhlhlba.js creates a global object `kkjjhlhlba`.
3. Add your own JavaScript file to define your shortcuts.
4. Use the kkjjhlhlba API to define your shortcuts.

The example below shows how to implement two simple keyboard shortcuts:

    kkjjhlhlba.start({
      shortcuts: {
        '/': {
          description: 'Search',
          method: function() {
          	document.getElementById('search-box').focus();
          }
        }
        'g,h': {
          description: 'Go to the homepage',
          method: 'https://www.example.com'
        }
      }
    });


###API
####kkjjhlhlba.start(options)
`kkjjhlhlba.start` registers the keyboard shortcuts defined in the `options` object. The `kkjjhlhlba.start` method may be called several times on a single page. If multiple shortcuts with the same signature are defined in the different calls to `kkjjhlhlba.start`, the shortcut defined in the last call wins. This can be useful when creating global shortcuts and page-specific shortcuts.


    kkjjhlhlba.start({
      noCheatsheet: true,
      shortcuts: {
        '/': {
          description: 'Search',
          method: function() {
          	document.getElementById('search-box').focus();
          }
        }
        'g,h': {
          description: 'Go to the homepage',
          method: 'https://www.example.com'
        }
      }
    });

#####options
- `shortcuts` is a required object within the `options` object. The `shortcuts` object contains the `shortcut` objects (see below).
- `noCheatsheet` is an optional boolean that determines whether a cheatsheet will be created. If `noCheatsheet` is set to true in any call to `kkjjhlhlba.start`, no cheatsheet will be created.

#####shortcut
A keyboard shortcut is defined by a `shortcut` object. The object key of the `shortcut` object defines the keypress sequence that will fire the shortcut code. The `shortcut` object contains a required `method` attribute, and an optional `description` attribute.

- `method` can be a function or a string. If a string is used, `kkjjhlhlba` assumes the string is a valid URL, and redirects the page to that URL. If a function is used, that function is called when the keyboard shortcut is fired.
- `description` is a string used when building the shortcut cheatsheet to describe what the shortcut does. If the `description` attribute is absent, the shortcut is not included in the cheatsheet.

Keys pressed in sequence are separated by commas (e.g. `g,h` means press `g`, then press `h`), keys pressed at the same time are separated by the plus symbol (e.g. `ctrl+k` means press `ctrl` and `k` at the same time), and keys are case sensitive (e.g. `s` is not the same as `S`, but `shift+s` is the same as `S`).

####kkjjhlhlba.getShortcuts()
`kkjjhlhlba.getShortcuts` returns an object of all the shortcuts that have been registered using `kkjjhlhlba.start`. 

###How it works
kkjjhlhlba adds a keydown and keyup event listener on the body of the HTML page. It converts the pressed key's keycode into the key's value, and builds a string based on the keys that have been pressed. On each keyup, it checks if the string corresponds to a registered shortcut.

###What's with the name?
Think Vim and 80's video games.
