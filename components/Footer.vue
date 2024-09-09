<template>
  <div>
    <div class="relative overflow-y-hidden">
      <img
        src="@/static/Images/rounded-left.webp"
        alt=""
        class="absolute left-0 ease-in-out transform -top-[7rem]"
      />
    </div>
    <footer class="bg-[#0464CB] mt-5 p-3">
      <div class="sm:mx-44 mx-6 py-6">
        <div class="flex justify-between mt-3">
          <div>
            <img src="@/static/Images/footer-logo.webp" alt="" />
          </div>
          <div class="flex gap-3 items-center">
            <div class="flex itmes-center bg-white rounded-full py-2 px-5">
              <img src="@/static/svg/apple.svg" alt="" />
              <div class="px-4">
                <p class="text-[10px] font-medium">Download on the</p>
                <h1 class="text-[14px] font-bold">App store</h1>
              </div>
            </div>
            <div class="flex itmes-center bg-black rounded-full py-2 px-5">
              <img src="@/static/svg/google-play.svg" alt="" />
              <div class="px-4">
                <p class="text-[10px] font-medium text-white">Get it on</p>
                <h1 class="text-[14px] font-bold text-white">Google Play</h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ul class="flex gap-8">
            <li v-for="(item, key) in company" :key="key">
              <a
                class="text-white text-sm font-normal mb-3 inline-block transition-main hover:translate-x-[10px] cursor-pointer"
                >{{ item }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: ["About us", "Our offerings", "Newsroom", "Blog", "Careers"],
    };
  },
};
</script>
