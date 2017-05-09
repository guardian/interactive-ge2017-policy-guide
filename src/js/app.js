import Swiper from 'swiper'


function init(){
    console.log('hello world')

    var swiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        spaceBetween: 30,
    });

}

init();
