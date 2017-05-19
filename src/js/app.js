import Swiper from 'swiper'
import tracker from './tracker'

var isAndroidApp = (window.location.origin === "file://" ) ? true : false;

function init() {
    var analytics = tracker();
    var swipers = [];
    var cardStacks = document.querySelectorAll('.swiper-container');

    for (var s = 0; s < cardStacks.length; s++) {

      cardStacks[s].setAttribute('data-stack-position', s+1);

      var swiper = new Swiper(cardStacks[s], {
            paginationClickable: true,
            loop: true,
            slidesPerView: 1.2,
            loopedSlides: 2,
            spaceBetween: 10,
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
            var stackPosition = swiper.container[0].getAttribute('data-stack-position');
            analytics.registerEvent('stack_card_view', stackPosition)
        });
      swipers.push(swiper);
    }
}

// init jump bar
var jumpLinks = document.querySelectorAll('[data-jump-to]'), i;
for (i = 0; i < jumpLinks.length; ++i) {
    var jumpLink = jumpLinks[i];
    jumpLink.addEventListener("click", function(e){
        e.preventDefault();
        var jumpTarget = this.getAttribute('data-jump-to');
        var jumpDiv = document.querySelector('[id="'+jumpTarget+'"]');
        var body = document.querySelector('body');
        var jumpBar = document.querySelector('.interactive-nav');
        var dadgummit = 5;
        var jumpOffset = body.scrollTop + jumpDiv.getBoundingClientRect().top - jumpBar.offsetHeight + dadgummit;
        scrollTo(body, jumpOffset, 360);
    },false);
}
function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}


if(document.querySelector("body").clientWidth < 740) {
    init();
}
