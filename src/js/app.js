import Swiper from 'swiper'


function init(){
    console.log('hello world')
    var swipers = [];
    var cardStacks = document.querySelectorAll('.swiper-container');

    for(var s = 0; s < cardStacks.length; s++){
      var swiper = new Swiper(cardStacks[s], {
          paginationClickable: true,
          spaceBetween: 30,
          loop: true
      })
      .on('slideChangeStart', function(currentSwiper, event){
        
        swipers.forEach(function(s){
          if(s.activeIndex != currentSwiper.activeIndex){
            s.slideTo(currentSwiper.activeIndex, 0);
          }
        });

      });

      swipers.push(swiper);
    }


}

init();
