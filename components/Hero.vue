<template>
  <div>
    <div
      class="xl:mx-48 mx-6 rounded-2xl mt-10 hero-section justify-between flex h-[458px] !z-50 bg-no-repeat relative"
    >
      <div class="z-50 absolute content rounded-2xl h-[458px]">
        <div class="mx-10 mt-20">
          <h1
            class="sm:text-[42px] text-[30px] font-normal text-white max-w-[370px] leading-[48px]"
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
.content {
  background: linear-gradient(270deg, rgba(7, 18, 26, 0) 0%, #07121a 20%);
}

@media (min-width: 768px) and (max-width: 1150px) {
  .hero-section {
    background: linear-gradient(270deg, rgba(7, 18, 26, 0) 100%, #07121a 100%),
      url("@/static/Images/hero-truck-img.webp") no-repeat;
    background-size: 60% 100%;
    background-position: right center;
  }
  .content {
    background: linear-gradient(270deg, rgba(7, 18, 26, 0) 0%, #07121a 20%);
    width: 50%;
  }
}
@media (max-width: 767px) {
  .content {
    background: linear-gradient(270deg, rgba(7, 18, 26, 0) 0%, #07121a 0%);
    width: 100%;
  }
}
@media (min-width: 1150px) {
  .hero-section {
    background: linear-gradient(270deg, rgba(7, 18, 26, 0) 100%, #07121a 100%),
      url("@/static/Images/hero-truck-img.webp") no-repeat;
    background-size: 80% 100%;
    background-position: right center;
  }
}
</style>
