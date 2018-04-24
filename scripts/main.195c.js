;(function ( exports ) {

  // Elements
  //

  var body = document.body;
  var topNav = document.getElementById( 'top-nav' );
  var drawerTrigger = document.getElementById( 'drawer-nav-link' );
  var drawer = document.getElementById( 'drawer-nav' );
  var drawerOverlay = document.getElementById('drawer-nav-overlay');

  // Functions
  //

  // Adds a class in IE8+
  var addClass = function ( el, className ) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };

  // Removes a class in IE8+
  var removeClass = function ( el, className ) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  // Toggles a class in IE9+
  var toggleClass = function ( el, className ) {
    if ( el.classList ) {
      el.classList.toggle( className );
    } else {
      var classes = el.className.split( ' ' );
      var existingIndex = classes.indexOf( className );

      if ( existingIndex >= 0 )
        classes.splice( existingIndex, 1 );
      else
        classes.push( className );

      el.className = classes.join( ' ' );
    }
  };

  // Toggles the drawer-nav's state
  var slideDrawer = function ( event ) {
    event.preventDefault();
    toggleClass( body, 'drawer-nav-open' );
  };

  // Checks scroll height and toggles topNav state
  var navHidden = false;
  var checkScroll = function ( event ) {
    if ( navHidden ) {
      if ( window.pageYOffset <= 0 ) {
        removeClass( body, 'scrolled' );
        navHidden = false;
      }
    } else if ( window.pageYOffset > 0 ) {
      addClass( body, 'scrolled' );
      navHidden = true;
    }
  };

  // Event listeners
  //

  if ( topNav ) {
    document.addEventListener( 'scroll', checkScroll );
  }

  if ( drawerTrigger ) {
    drawerTrigger.addEventListener( 'click', slideDrawer );
    drawerOverlay.addEventListener( 'click', slideDrawer );
  }

})( this );
