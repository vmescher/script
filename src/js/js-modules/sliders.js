import Swiper, { Navigation, Pagination, EffectFade, Autoplay, Mousewheel, Lazy, Thumbs } from "swiper"

Swiper.use([Navigation, Pagination, EffectFade, Thumbs])

document.addEventListener("DOMContentLoaded", () => {
    initSliders()
})

function initSliders() {
        // const hotSwiper = new Swiper(".hot-news__slider", {
        //     effect: "fade",
        //     fadeEffect: {
        //         crossFade: true,
        //     },
        //     pagination: {
        //         clickable: true,
        //         el: ".hot-news__slider .swiper-pagination",
        //     },
        // })
    }

