(function($) {
	$(document).ready(function() {
	
		
		//burger
		$('.burger-btn').on('click', function() {
			$(this).next('ul').slideToggle();
		});
		$(window).resize(function() {
			$('.burger-btn + ul').removeAttr('style');
		});
		
		
		//menu
		$('.menu-btn').on('click', function() {
			$(this).next('ul').slideToggle();
		});
		$(window).resize(function() {
			$('.menu-btn + ul').removeAttr('style');
		});
		
		
		//remove stickers
		function sticker() {
			if ($(window).outerWidth() < 576) {
				$('.bottom-header .sticker-icon').addClass('hide-sticker');
			}
			else {
				$('.bottom-header .sticker-icon').removeClass('hide-sticker');
			}
		}
		sticker();
		
		
		//window resize
		$(window).resize(function() {
			sticker();
		});
		
		
		//formstyler
		$('.number, .number2').styler({
			onFormStyled: function() {
				$('.jq-selectbox__trigger').addClass('icon-down-open-mini');
			},
			onSelectOpened: function() {
				$(this).find('.jq-selectbox__trigger').toggleClass('icon-down-open-mini icon-up-open-mini');
			},
			onSelectClosed: function() {
				$(this).find('.jq-selectbox__trigger').toggleClass('icon-down-open-mini icon-up-open-mini');
			}
		});
		
		
		//sliders
		var prod_slider = $('.prod-slider');
		if (prod_slider !== null) {
			prod_slider.slick({
				prevArrow: '<div class="slick-prev slick-arrow" aria-label="Previous"><span class="arrow"></span></div>',
				nextArrow: '<div class="slick-next slick-arrow" aria-label="Next"><span class="arrow"></div>',
				arrows: true
			});
		}
		
		var recom_slider = $('.recom-slider');
		if (recom_slider !== null) {
			recom_slider.slick({
				prevArrow: '<div class="slick-prev slick-arrow" aria-label="Previous"><span class="arrow"></span></div>',
				nextArrow: '<div class="slick-next slick-arrow" aria-label="Next"><span class="arrow"></div>',
				arrows: false,
				slidesToShow: 4,
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							arrows: true,
						}
					}
				]
			});
		}
		
		
		//rating
		$('.beans-est').raty({
			path: 'img',
			start: 3,
			starOff: 'star-off.png',
			starOn: 'star-on.png',
			click: function(score) {
				$('.rate').val(score);
			}
		});
		
		
		//maskedinput
		$('.tel').mask('+38 (999) 999-99-99');
		
		
		//form check
		$('#make-order').validate({
			rules: {
				tel: 'required',
				name: 'required',
				email: 'required',
				city: 'required',
				deliver_serv: {number: false},
				deliver_depart: {number: false},
				payment: {number: false}
			},
			messages: {
				tel: 'Это поле необходимо заполнить',
				name: 'Это поле необходимо заполнить',
				email: 'Это поле необходимо заполнить',
				city: 'Это поле необходимо заполнить',
			}
		});
		
		$('#leave-comm').validate({
			rules: {
				name: 'required',
				rate: 'required',
				mess: {
					required: true,
					minlength: 100
				}
			},
			messages: {
				name: 'Это поле необходимо заполнить',
				rate: 'Поставьте оценку!',
				mess: {
					required: 'Это поле необходимо заполнить',
					minlength: 'Минимум 100 символов!'
				}
			},
			errorPlacement: function(error, element) {
				if (element.attr("name") == "name") error.insertAfter($('.leave-name'));
				if (element.attr("name") == "rate") error.insertAfter($('.super-span'));
				if (element.attr("name") == "mess") error.insertAfter($('.leave-mess'));
			}
		});
		
		$('#enter-form').validate({
			rules: {
				email: 'required',
				pass: 'required'
			},
			messages: {
				email: 'Это поле необходимо заполнить',
				pass: 'Это поле необходимо заполнить'
			}
		});
		
		$('#recovery-form').validate({
			rules: {
				email: 'required'
			},
			messages: {
				email: 'Это поле необходимо заполнить'
			}
		});
		
		$('#reg-form').validate({
			rules: {
				email: 'required',
				pass: 'required',
				pass_r: 'required',
				name: 'required'
			},
			messages: {
				email: 'Это поле необходимо заполнить',
				pass: 'Это поле необходимо заполнить',
				pass_r: 'Это поле необходимо заполнить',
				name: 'Это поле необходимо заполнить'
			}
		});
		
		$('#price-list-form').validate({
			rules: {
				user_name: 'required',
				tel: 'required'
			},
			messages: {
				user_name: 'Это поле необходимо заполнить',
				tel: 'Это поле необходимо заполнить'
			}
		});
		
	
	});
}) (jQuery);


