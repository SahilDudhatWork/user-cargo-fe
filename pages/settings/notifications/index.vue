<template>
  <div class="relative">
    <ul class="scroll-container h-[500px] overflow-y-scroll pr-4 relative">
      <li class="border-l pl-4" v-for="(item, key) in settingData" :key="key">
        <div class="inline-block border-b pb-4 pt-4">
          <h1 class="text-[#1E1E1E] font-medium text-lg">
            {{ item.title }}
          </h1>
          <span class="text-[#000000E5] font-normal text-sm">
            {{ item.description }}
          </span>
        </div>
      </li>
    </ul>
    <div
      class="absolute bottom-0 left-0 w-full h-20 pointer-events-none bg-gradient-to-t from-white to-transparent"
    ></div>
  </div>
</template>

<script>
export default {
  layout: "settings",
  data() {
    return {
      settingData: [
        {
          title: "App Update request",
          description:
            "Lorem ipsum dolor sit amet consectetur. Leo lacus euismod felis nec quis volutpat fermentum volutpat. Mattis consectetur felis consequat in ullamcorper et bibendum vitae quisque. Suspendisse ac aliquam pellentesque dui eget odio. Tincidunt libero metus sed mus.",
        },
        {
          title: "App Update request",
          description:
            "Lorem ipsum dolor sit amet consectetur. Leo lacus euismod felis nec quis volutpat fermentum volutpat. Mattis consectetur felis consequat in ullamcorper et bibendum vitae quisque. Suspendisse ac aliquam pellentesque dui eget odio. Tincidunt libero metus sed mus.",
        },
        {
          title: "App Update request",
          description:
            "Lorem ipsum dolor sit amet consectetur. Leo lacus euismod felis nec quis volutpat fermentum volutpat. Mattis consectetur felis consequat in ullamcorper et bibendum vitae quisque. Suspendisse ac aliquam pellentesque dui eget odio. Tincidunt libero metus sed mus.",
        },
        {
          title: "App Update request",
          description:
            "Lorem ipsum dolor sit amet consectetur. Leo lacus euismod felis nec quis volutpat fermentum volutpat. Mattis consectetur felis consequat in ullamcorper et bibendum vitae quisque. Suspendisse ac aliquam pellentesque dui eget odio. Tincidunt libero metus sed mus.",
        },
        {
          title: "App Update request",
          description:
            "Lorem ipsum dolor sit amet consectetur. Leo lacus euismod felis nec quis volutpat fermentum volutpat. Mattis consectetur felis consequat in ullamcorper et bibendum vitae quisque. Suspendisse ac aliquam pellentesque dui eget odio. Tincidunt libero metus sed mus.",
        },
        {
          title: "App Update request",
          description:
            "Lorem ipsum dolor sit amet consectetur. Leo lacus euismod felis nec quis volutpat fermentum volutpat. Mattis consectetur felis consequat in ullamcorper et bibendum vitae quisque. Suspendisse ac aliquam pellentesque dui eget odio. Tincidunt libero metus sed mus.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.scroll-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}
</style>
