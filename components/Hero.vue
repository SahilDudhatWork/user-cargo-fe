<template>
  <div>
    <div
      class="bg-no-repeat sm:mx-48 mx-6 rounded-2xl mt-10 hero-section justify-between flex relative p-4 bg-right h-[458px] !z-50"
      style="background-size: 100% 100%"
    >
      <div class="mt-20 mx-7 absolute z-50">
        <h1
          class="text-[42px] font-normal text-white max-w-[370px] leading-[48px]"
        >
          Revolutionising the transportation
        </h1>
        <p class="text-[17px] font-normal text-gray-400 max-w-[352px] mt-5">
          Consectetur, Mauris risus turpis Lorem ipsum dolor sit amet
        </p>
        <button
          type="button"
          class="bg-[#0060C9] text-white font-semibold text-base py-[9px] px-[21px] rounded-xl mt-5"
        >
          Know more
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.hero-section {
  position: relative;
  background: linear-gradient(270deg, rgba(7, 18, 26, 0) 60%, #07121a 100%),
    url("@/static/Images/hero-truck-img.webp") no-repeat center center;
}
</style>
