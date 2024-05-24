// Navigation menu sticker – © 2017 R3gi
	if (localStorage.getItem('s_sticky_menu') == 'false') { // User can set 's_sticky_menu' to 'false' to turn sticking off
	} else {
		var sticky_element = '.menu', // CSS ID or CLASS name of the element to stick
			sticky_element_clean = sticky_element.substring(1, sticky_element.length);

		$(function() {
			createSticky($(sticky_element));
		});
		function createSticky(sticky) {
			$('<div id="' + sticky_element_clean + '_phantom"></div>').insertBefore(sticky_element); // Phantom prevents jump
			if (typeof sticky !== 'undefined') {
				var pos = sticky.offset().top,
					win = $(window);

				win.on('scroll', function() {
					if (win.scrollTop() >= pos) {
						var phantomHeight = $(sticky_element).outerHeight();
						sticky.addClass("fixed");
						$('#' + sticky_element_clean + '_phantom').height(phantomHeight).show();
					} else {
						sticky.removeClass("fixed");
						$('#' + sticky_element_clean + '_phantom').hide();
					}
				});
			}
		}
		// Fix for anchor links position – from different location
		function offsetAnchor() {
			var stickyHeight = $(sticky_element).outerHeight();
			scrollBy(0, -stickyHeight -2);
		}
		window.addEventListener('hashchange', offsetAnchor); // Captures hash CHANGES while on the page
		window.addEventListener('load', function(){
			if (window.location.hash) offsetAnchor(); // Requests anchor offset if hash is present in URL
		});
		// Fix for anchor links position – from current page
		var $root = $('html, body'); // Caching selector for better perfomance
		$(document).on('click', 'a[href^="#"]:not([href="#"]):not([href="#header"]):not([href="#footer"])', function (e) {
			e.preventDefault();
			var href = $.attr(this, 'href'),
				stickyHeight2 = $(sticky_element).outerHeight();
			$root.stop(true).animate({
				scrollTop: $(href).offset().top - stickyHeight2 - 2
			}, 'fast');
			// Attach the hash to the pageurl
			if(history.pushState) {
				history.pushState(null, null, href); // This prevents jump on hash update (modern browsers only)
			}
			else {
				window.location.hash = href; // Old browsers may enjoy jump
			}
		});
	}