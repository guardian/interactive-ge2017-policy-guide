import Swiper from 'swiper'

var isAndroidApp = (window.location.origin === "file://" ) ? true : false;

function init() {
    console.log('hello world')
    var swipers = [];
    var cardStacks = document.querySelectorAll('.swiper-container');

    for (var s = 0; s < cardStacks.length; s++) {
      var swiper = new Swiper(cardStacks[s], {
            paginationClickable: true,
            loop: true,
            slidesPerView: 1.1,
            spaceBetween: 5,
            pagination: ".pagination",
            centeredSlides: true
        })
        .on('slideChangeStart', function(currentSwiper, event) {
            swipers.forEach(function(s) {
                if (s.activeIndex != currentSwiper.activeIndex) {
                    s.slideTo(currentSwiper.activeIndex, 0);
                }
            });
        })
        .on('onTouchStart', function(swiper, e) {
            if (isAndroidApp && window.GuardianJSInterface.registerRelatedCardsTouch) {
                window.GuardianJSInterface.registerRelatedCardsTouch(true);
            }
        })
        .on('onTouchEnd', function(swiper, e) {
            if (isAndroidApp && window.GuardianJSInterface.registerRelatedCardsTouch) {
                window.GuardianJSInterface.registerRelatedCardsTouch(false);
            }
        });
      swipers.push(swiper);
    }


}

if(document.querySelector(".interactive-atom").clientWidth < 600) {
    init();
}
