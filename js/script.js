var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http, $timeout) {
	$http.get("js/data.json").success(function (data) {
		$scope.category = data.categories;
		$scope.size = data.sizes;
		$scope.color = data.colors;
	});
 	$timeout(function() {loadmore();}, 10);
 
});

 
 
		
 $('.proitem').each(function (i, el) {
        $(el).find('.probx').hover(function () {
            $(this).parent().css('z-index', '20');
            $(this).addClass('animate');
            $(this).find('div.btnnext, div.btnprev').addClass('visible');
        }, function () {
            $(this).removeClass('animate');
            $(this).parent().css('z-index', '1');
            $(this).find('div.btnnext, div.btnprev').removeClass('visible');
        });
        $(el).find('.view_gallery').click(function () {
            $(el).find('div.btnnext, div.btnprev').removeClass('visible');
            $(el).find('.probx').addClass('flip10');
            setTimeout(function () {
                $(el).find('.probx').removeClass('flip10').addClass('flip90').find('div.shadow').show().fadeTo(80, 1, function () {
                    $(el).find('.frontbx, .frontbx div.shadow').hide();
                });
            }, 50);
            setTimeout(function () {
                $(el).find('.probx').removeClass('flip90').addClass('flip190');
                $(el).find('.backbx').show().find('div.shadow').show().fadeTo(90, 0);
                setTimeout(function () {
                    $(el).find('.probx').removeClass('flip190').addClass('flip180').find('div.shadow').hide();
                    setTimeout(function () {
						$(el).find('.cross').addClass('s1');
                        setTimeout(function () {
                            $(el).find('.cross').addClass('s2');
                        }, 100);
                        setTimeout(function () {
                            $(el).find('.cross').addClass('s3');
                        }, 200);
                        $(el).find('div.btnnext, div.btnprev').addClass('visible');
                    }, 100);
                }, 100);
            }, 150);
        });
        $(el).find('.cross').click(function () {
            $(el).find('.probx').removeClass('flip180').addClass('flip190');
            setTimeout(function () {
                $(el).find('.probx').removeClass('flip190').addClass('flip90');
                $(el).find('.backbx div.shadow').css('opacity', 0).fadeTo(100, 1, function () {
                    $(el).find('.backbx, .backbx div.shadow').hide();
                    $(el).find('.frontbx, .frontbx div.shadow').show();
                });
            }, 50);
            setTimeout(function () {
                $(el).find('.probx').removeClass('flip90').addClass('flip10');
                $(el).find('.frontbx div.shadow').show().fadeTo(100, 0);
                setTimeout(function () {
                    $(el).find('.frontbx div.shadow').hide();
                    $(el).find('.probx').removeClass('flip10');
					  $(el).find('.cross').removeClass('s1 s2 s3');
                }, 100);
            }, 150);
        });
		
 });
	makeCarousel();
   $(window).resize(function(){
	  	location.reload();
		makeCarousel();
   });
   
function makeCarousel() {
	 $('.proitem').each(function (i, el) {
			var carousel = $(el).find('.carousel ul');
			var carouselSlideWidth = $(this).width();;
			var carouselWidth = 0;
			var isAnimating = false;
			var currSlide = 0;
			$(el).find('.carousel li').css('width', carouselSlideWidth);
			$(carousel).attr('rel', currSlide);
			$(carousel).find('li').each(function () {
				carouselWidth += carouselSlideWidth;
			});
			$(carousel).css('width', carouselWidth);
			$(el).find('div.btnnext').on('click', function () {
				var currentLeft = Math.abs(parseInt($(carousel).css('left')));
				var newLeft = currentLeft + carouselSlideWidth;
				if (newLeft == carouselWidth || isAnimating === true) {
					return;
				}
				$(carousel).css({
					'left': '-' + newLeft + 'px',
					'transition': '300ms ease-out'
				});
				isAnimating = true;
				currSlide++;
				$(carousel).attr('rel', currSlide);
				setTimeout(function () {
					isAnimating = false;
				}, 300);
			});
			$(el).find('div.btnprev').on('click', function () {
				var currentLeft = Math.abs(parseInt($(carousel).css('left')));
				var newLeft = currentLeft - carouselSlideWidth;
				if (newLeft < 0 || isAnimating === true) {
					return;
				}
				$(carousel).css({
					'left': '-' + newLeft + 'px',
					'transition': '300ms ease-out'
				});
				isAnimating = true;
				currSlide--;
				$(carousel).attr('rel', currSlide);
				setTimeout(function () {
					isAnimating = false;
				}, 300);
			});
	});
 }
function loadmore(){
	$('.checklist a span').each(function (i, el) {
		$(el).parent().on('click', function () {
			if ($(this).hasClass('checked')) {
				$(el).removeClass('animate');
				setTimeout(function () {
					$(el).removeClass('animate');
				}, 50);
				$(this).removeClass('checked');
				return false;
			}
			$(el).addClass('animate');
			setTimeout(function () {
				$(el).addClass('animate');
			}, 100);
			$(this).addClass('checked');
			return false;
		});
	});	
}