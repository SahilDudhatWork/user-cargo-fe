<template>
  <div>
    <div class="border-t">
      <div class="mt-9 mb-9 mx-[340px]">
        <img src="@/static/Images/logo.webp" alt="" />
      </div>
    </div>
    <div class="relative">
      <img
        src="@/static/Images/white-rounded-left.webp"
        alt=""
        class="absolute ease-in-out transform left-[9px]"
      />
    </div>
    <footer class="bg-[#F4F4F4] mt-5 p-3">
      <div class="flex justify-between mx-28 border-b py-6">
        <div class="mt-[11rem] mb-4">
          <div class="flex itmes-center bg-black rounded-full py-2 px-5 mb-6">
            <img src="@/static/svg/white-apple.svg" alt="" />
            <div class="px-4">
              <p class="text-[10px] font-medium text-white">Download on the</p>
              <h1 class="text-[14px] font-bold text-white">App store</h1>
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
        <div class="flex gap-20 mt-9">
          <div>
            <h2 class="text-xl text-black font-semibold mb-5">Company</h2>
            <ul>
              <li v-for="(item, key) in company" :key="key">
                <a
                  class="text-black text-sm font-normal mb-3 inline-block transition-main hover:translate-x-[10px] cursor-pointer"
                  >{{ item }}</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h2 class="text-xl text-black font-semibold mb-5">Website Links</h2>
            <ul>
              <li v-for="(item, key) in websiteLinks" :key="key">
                <a
                  class="text-black text-sm font-normal mb-3 inline-block transition-main hover:translate-x-[10px] cursor-pointer"
                  >{{ item }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="p-4 mt-6 flex justify-between mx-28">
        <p class="text-black font-normal text-sm">
          Non Copyrighted © 2022 Design and upload by rich technologies
        </p>
        <div class="flex gap-2">
          <img src="@/static/svg/black-socia-media.svg" alt="" />
        </div>
      </div>
    </footer>
    <div class="relative">
      <img
        src="@/static/Images/white-rounded-right.webp"
        alt=""
        class="absolute right-0 !bottom-0"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: ["About us", "Our offerings", "Newsroom", "Blog", "Careers"],
      websiteLinks: ["Home", "Services", "Carrier"],
    };
  },
};
</script>
