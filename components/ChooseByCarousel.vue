<template>
  <div>
    <div class="xl:mx-48 mx-6 mt-10 flex flex-col justify-center">
      <div>
        <h1 class="font-bold text-[20px] text-[#212121]">Best Offers</h1>
        <p class="font-medium text-base text-gray-700">
          Lorem ipsum dolor sit amet consectetur risus turpis.
        </p>
      </div>
      <div class="mt-5 cursor-pointer landing_carousel">
        <VueSlickCarousel v-bind="settings">
          <div v-for="(item, key) in carouselItem" :key="key" class="w-[350px]">
            <div
              class="rounded-xl relative"
              :style="{ backgroundColor: item.backgroundColor }"
            >
              <img
                src="@/static/svg/percentage.svg"
                alt=""
                class="absolute right-5 top-9"
              />
              <div class="flex mt-2 py-5 px-1 mx-4">
                <div>
                  <h1 class="xl:text-base text-white font-bold">
                    {{ item.title }}
                  </h1>
                  <p class="xl:text-[12px] font-light text-white mt-[6px]">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <button
                class="xl:text-md font-medium text-[12px] text-[#1B1B1B] bg-white rounded-full px-5 py-[4px] mx-4 mb-4"
              >
                View Offer
              </button>
            </div>
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

export default {
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      carouselItem: [
        {
          title: "Get 20% off on first movement",
          description: "Terms & condition apply*",
          backgroundColor: "#E88936",
        },
        {
          title: "Get 20% off on first movement",
          description: "Terms & condition apply*",
          backgroundColor: "#73C2E3",
        },
        {
          title: "Get 20% off on first movement",
          description: "Terms & condition apply*",
          backgroundColor: "#E98484",
        },
        {
          title: "Get 20% off on first movement",
          description: "Terms & condition apply*",
          backgroundColor: "#56e36e",
        },
        {
          title: "Get 20% off on first movement",
          description: "Terms & condition apply*",
          backgroundColor: "#a570e0",
        },
      ],
      settings: {
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        touchThreshold: 1,
        dots: true,
        swipeToSlide: true,
        centerMode: true,
        centerPadding: "42px",
        infinite: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped></style>
