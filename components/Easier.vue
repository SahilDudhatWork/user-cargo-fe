<template>
  <div>
    <div class="flex justify-between mt-20 mb-20">
      <div class="xl:mx-48 mx-6">
        <p
          class="text-[#0060C9] font-medium lg:text-[32px] text-[20px] max-w-[430px] lg:leading-[40px]"
        >
          Making cargo operations easier with Advanced capabilities
        </p>
        <ul class="lg:mt-7 mt-4 list-disc mx-5">
          <li
            v-for="(item, index) in features"
            :key="index"
            class="group relative cursor-pointer py-5 transition-all duration-300 hover:pt-2 hover:py-0"
          >
            <span
              class="lg:text-[18px] text-[15px] text-[#000000] font-bold border-b border-gray-300 py-5 group-hover:border-none"
            >
              {{ item.title }}
            </span>
            <p
              class="text-gray-500 font-medium text-sm max-w-[390px] overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 group-hover:opacity-100 group-hover:max-h-[4rem] group-hover:py-5"
            >
              {{ item.description }}
            </p>
          </li>
        </ul>
      </div>
      <div class="relative">
        <img
          src="@/static/Images/container-img.webp"
          alt=""
          class="lg:w-[1000px] lg:h-[450px] w-[500px] h-[320px] sm:block hidden rounded-2xl lg:mt-0 mt-[10px]"
        />
        <img
          src="@/static/Images/right-circle-img.webp"
          alt=""
          class="absolute right-0 lg:top-72 top-64 z-50"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: "Autonomous Driving",
          description:
            "Consectetur, Mauris risus turpis Lorem ipsum dolor sit amet consectetur, Mauris risus turpis Lorem",
        },
        {
          title: "Advance Route Optimization",
          description:
            "Consectetur, Mauris risus turpis Lorem ipsum dolor sit amet consectetur, Mauris risus turpis Lorem",
        },
        {
          title: "Real-Time Tracking",
          description:
            "Consectetur, Mauris risus turpis Lorem ipsum dolor sit amet consectetur, Mauris risus turpis Lorem",
        },
        {
          title: "Enhanced Safety",
          description:
            "Consectetur, Mauris risus turpis Lorem ipsum dolor sit amet consectetur, Mauris risus turpis Lorem",
        },
      ],
    };
  },
};
</script>
