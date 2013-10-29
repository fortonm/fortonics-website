// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

// Place any jQuery/helper plugins in here.

$(function(){
  var $slides = $(".banner.slider > .slides"),
      $slidesLength = $slides.children().length;

  if (($(".banner.slider:visible").length > 0) && ($slidesLength > 1)) {
    $slides.parent().addClass('multiple-slides');

    var sliderSpeed = 6000;
    var sliderTimeout;
	var sliderStopped = false;
    var $prevSlideButton = $('<span class="prev-slide-button"></span>');
    var $nextSlideButton = $('<span class="next-slide-button"></span>');
    var $slideSwitcher = $('<ul class="slide-togglers"></ul>');

    function getCurrentSlide() {
      return $slides.find('.current');
    }
    function getNextSlide($curSlide) {
      var $nextSlide = ($curSlide.index()+1 === $slidesLength) ? $slides.find('.slide:first') : $curSlide.next();

      return $nextSlide;
    }
    function getPrevSlide($curSlide) {
      var $prevSlide = ($curSlide.index() === 0) ? $slides.find('.slide:last') : $curSlide.prev();

      return $prevSlide;
    }
    function showNextSlide() {
      var $curSlide = getCurrentSlide();
      var $newSlide = getNextSlide($curSlide);

      animateSlide($curSlide, $newSlide);
      showSlide($newSlide, $curSlide, getNextSlide($newSlide));
    }
    function showPrevSlide() {
      var $curSlide = getCurrentSlide();
      var $newSlide = getPrevSlide($curSlide);

      animateSlide($curSlide, $newSlide);
      showSlide($newSlide, getPrevSlide($newSlide), $curSlide);
    }
    function showSlide($slide, $prev, $next) {
      $slide.addClass('current').siblings().removeClass('current');
      $prev.addClass('prev').siblings().removeClass('prev');
      $next.addClass('next').siblings().removeClass('next');

      $slideSwitcher.children().removeClass('current').eq($slide.index()).addClass('current');

	  autoadvanceSlide();
    }
    function animateSlide($fromSlide, $toSlide) {
      $fromSlide.removeClass('hidden');
      $fromSlide.siblings().addClass('hidden');
      $toSlide.removeClass('hidden');
    }
    function playSlides() {
		sliderStopped = false;
		autoadvanceSlide();
    }
	function autoadvanceSlide() {
		if (!sliderStopped) {
			var $currentSlide = getCurrentSlide();
			var timeout = $currentSlide.attr('data-timeout') ? $currentSlide.attr('data-timeout') : sliderSpeed;
			sliderTimeout = setTimeout(showNextSlide, timeout);
		}
	}
    function stopSlides() {
		sliderStopped = true;
		clearInterval(sliderTimeout);
    }

    $slides.children().each(function(){
      var $toggler = $('<li class="toggler"></li>');

      $toggler.click(function() {
        stopSlides();

        var $this = $(this);
        var $curSlide = getCurrentSlide();
        var $newSlide = $slides.find('.slide').eq($this.index()).addClass('next');
        var $nextSlide = getNextSlide($newSlide);

        animateSlide($curSlide, $newSlide);
        showSlide($newSlide, $curSlide, $nextSlide);
      });

      if ($(this).hasClass('current')) {
        $toggler.addClass('current');
      }

      $slideSwitcher.append($toggler);
    });

    $nextSlideButton.click(function(){
      stopSlides();
      showNextSlide();
    });
    $prevSlideButton.click(function(){
      stopSlides();
      showPrevSlide();
    });

    $slides.after($slideSwitcher);
    $slides.after($nextSlideButton);
    $slides.after($prevSlideButton);

    playSlides();
  }
});

