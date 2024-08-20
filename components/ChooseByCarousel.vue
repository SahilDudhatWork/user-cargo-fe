<template>
<div>
    <div class="xl:max-w-[1240px] mt-14 mb-20 flex flex-col justify-center mx-auto">
        <div>
            <h1 class="font-semibold text-[44px] text-[#212121]">Chosen By</h1>
        </div>
        <div class="bg-[#f7f7f7] mt-5 p-2 py-7 cursor-pointer">
            <VueSlickCarousel v-bind="settings">
                <div v-for="(item, key) in images" :key="key">
                    <img :src="item" :alt="`Image ${key + 1}`" />
                </div>
            </VueSlickCarousel>
        </div>
    </div>
</div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import airbnbSvg from '../static/svg/airbnb.svg';
import googleSvg from '../static/svg/google_logo.svg';
import stripeSvg from '../static/svg/stripe.svg';
import spotifySvg from '../static/svg/spotify.svg';

export default {
    components: {
        VueSlickCarousel,
    },
    data() {
        return {
            images: [
                airbnbSvg,
                stripeSvg,
                googleSvg,
                spotifySvg,
            ],
            settings: {
                focusOnSelect: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                touchThreshold: 1,
                dots: false,
                swipeToSlide:true,
                centerMode: true,
                centerPadding: "350px",
                infinite: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                responsive: [
                {
                        breakpoint: 1400,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: "200px",
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: "200px",
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: "0px",
                            slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '0px',
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '0px',
                            slidesToShow: 2
                        }
                    }
                ],
            },
        };
    },
};
</script>

<style scoped>
</style>
