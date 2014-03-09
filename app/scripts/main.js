;(function ( exports ) {

  // Elements
  //

  var topNav = document.getElementById( 'top-nav' );

  // Functions
  //

  // Register a new dialog with the polyfill
  var addDialog = function ( dialog ) {

    function closeDialog() {
        if (dialog.open)
            dialog.close();
    }

    function clickedInDialog(mouseEvent) {
        var rect = dialog.getBoundingClientRect();
        return rect.top <= mouseEvent.clientY && mouseEvent.clientY <= rect.top + rect.height &&
               rect.left <= mouseEvent.clientX && mouseEvent.clientX <= rect.left + rect.width;
    }

    if( dialog ) {

      dialogPolyfill.registerDialog(dialog);

      document.body.addEventListener( 'click', function(e) {
        if ( !dialog.open )
          return;
        if ( e.target !== document.body )
          return;
        closeDialog();
      });

      dialog.addEventListener('click', function(e) {
        if (clickedInDialog(e))
          return;
        closeDialog();
      });

    }
    return dialog;
  };

  // Check if a URL path is valid and go there if it is
  var goToUrl = function ( path ) {
    var
    firstChar = path.charAt( 0 ),
    url = document.URL,
    http = new XMLHttpRequest();

    if ( firstChar === '/' ) {
      path = path.substring( 1 );
    } else if ( firstChar === '.' ) {
      if ( path.charAt( 1 ) === '/' ) {
        path = path.substring( 2 );
      } else if ( path.slice ( 1, 3 ) === './' ) {
        url = url.split( '/' ).slice( 0, -2 ).join('/');
        path = path.slice(2);
      }
    }

    url +=  path;

    http.open( 'HEAD', url, false );
    http.send();

    if ( http.status !== 404 ) {
      window.location.href = url;
    } else {
      console.log( 'URL ' + url + ' is not valid.');
    }
  };

  // Emulate terminal navigation in the browser
  var cdTerm = function () {
    dialog = addDialog(document.getElementById('cdTerm'));
    dialog.showModal();
  };

  // Checks scroll height and toggles topNav state
  var checkScroll = function ( event ) {
    if( document.body.scrollTop >= 300 ) {
      topNav.className = 'shortened';
    } else {
      topNav.className = '';
    }
  };

  // Mousetrap bindings

  Mousetrap.bind( 'up up down down left right left right b a enter', function () {
    alert( 'omg konami code!' );
  } );
  Mousetrap.bind( 'c d space', function() {
    cdTerm();
  } );

  // InstantClick
  InstantClick.init();

  // Event listeners
  //

  if ( topNav ) {
    document.addEventListener( 'scroll', checkScroll );
  }

})( this );
