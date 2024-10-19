<template>
  <div>
    <Additional :isShowButton="false">
      <template #content>
        <div>
          <div class="mt-4 flex justify-center">
            <img
              src="@/static/Images/parcel-verification-checklist.webp"
              alt=""
            />
          </div>
          <div class="">
            <p class="text-[#1E1E1E] font-semibold text-2xl mt-3 text-center">
              Request is in process
            </p>
            <p class="mt-3 text-[#4B4B4B] font-light text-sm text-center">
              Thanks for requesting to our service, Please give us some time to
              look.
            </p>
          </div>
          <div class="flex justify-center">
            <button
              @click="requestProcess"
              class="font-semibold text-base text-white bg-[#0060C9] rounded-xl py-[15px] sm:px-[87px] px-[60px] mt-6 mb-5 focus:outline-none"
            >
              View Request
            </button>
          </div>
          <div class="mt-2 mb-6">
            <VueSlickCarousel v-bind="cargoWorkSettings">
              <div
                v-for="(item, index) of cargoWorks"
                :key="index"
                class="bg-[#F5F9FD] px-4 py-[15px] rounded-2xl"
              >
                <p class="font-medium text-base text-[#4B4B4B]">
                  {{ item.title }}
                </p>
                <p class="text-[#4B4B4B] font-light text-sm mt-1">
                  {{ item.description }}
                </p>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </template>
    </Additional>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cargoWorkSettings: {
        speed: 500,
        slidesToShow: 1,
        dots: true,
        swipeToSlide: false,
        centerMode: true,
        centerPadding: "0px",
        arrows: false,
      },
      cargoWorks: [
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
      ],
    };
  },
  methods: {
    requestProcess() {
      this.$emit("requestProcess");
    },
  },
};
</script>
