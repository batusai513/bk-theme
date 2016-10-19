/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  var $zoomGalery = $('.zoom-gallery');
  var $stikyNav = $('#sticky-container');
  var $navItems = $stikyNav.find('.horizontal-nav__item');
  var $projects = $('.inview-project');
  var $readmore = $('.readmore');
  var $html = $('html');

  if($readmore.length){
    $readmore.each(function(index, el){
      var $el = $(el);
      var $firstParagraph = $el.children('p').first();
      var paragraphText = $firstParagraph.text().trim();
      var wordCount = paragraphText.length + 1 || 180;
      $el.expander({
        slicePoint: wordCount,
        expandText: 'Leer más',
        expandPrefix: '&hellip;',
        userCollapseText: 'Leer menos'
      });
    });
  }

  if($stikyNav.length){
    var sticky = new Waypoint.Sticky({
      element: $stikyNav[0]
    });
  }

  if($projects.length){
    $projects.each(function(item, el){
      var inview = new Waypoint.Inview({
        element: el,
        enter: function(direction) {
          var $el = $(el);
          var id = $el.attr('id');
          var $currentNavItem = $navItems.find('[href="#' + id + '"]').parent();
          $navItems.removeClass('is-active');
          $currentNavItem.addClass('is-active');
        }
      });
    });
  }

  if($zoomGalery.length){
    $('.zoom-gallery').each(function(index, item){
      $(item).magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
          verticalFit: true
        },
        gallery: {
          enabled: true
        },
        zoom: {
          enabled: true,
          duration: 300, // don't foget to change the duration also in CSS
          opener: function(element) {
            return element.find('img');
          }
        }
      });
    });
  }

  $('.js-menu-button').on('click', function(e){
    var $el = $(e.currentTarget);
    $el.toggleClass('active');
    $html.toggleClass('is-open');
  });

  var map = MapFactory('#map-canvas');
  $('.main-slider').slick({
    autoplay: true,
    dots: true,
    arrows: false,
    fade: true
  });


  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

var destacados = document.querySelector('.destacados');

if(destacados){
  var shuffle = new shuffle(destacados, {
    itemSelector: '.destacado'
  });
}
