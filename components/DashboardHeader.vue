<template>
  <div>
    <div
      class="pt-[17px] pb-[19px] !rounded-bl-[16px] !rounded-br-[16px] bg-white relative !z-50"
      style="box-shadow: 0px 6px 20px 0px #00000012"
    >
      <header class="lg:mx-40 mx-6 flex justify-between relative">
        <div class="flex items-center gap-12 focus-visible:outline-none">
          <nuxt-link to="/">
            <img src="@/static/Images/header-logo.webp" alt="" />
          </nuxt-link>
        </div>
        <div class="flex items-center gap-7 relative">
          <div
            class="flex bg-[#ECF3FA] cursor-pointer py-[4px] items-center rounded-lg pl-1 pr-3 gap-1"
            @click="isDropdown = !isDropdown"
          >
            <img src="@/static/Images/dashboard-header-logo.webp" alt="" />
            <img src="@/static/svg/blue-down-arrow.svg" alt="" />
          </div>
        </div>
      </header>
      <div class="relative">
        <div
          v-if="isDropdown"
          v-click-outside="closeDropdown"
          class="z-50 absolute lg:right-[10rem] right-4 top-3 bg-white divide-y divide-gray-100 rounded-2xl shadow flex flex-col items-center dropdown-content"
          style="box-shadow: rgba(0, 0, 0, 0.5) 0px 6px 50px 0px"
        >
          <ul class="py-2 cursor-pointer" @click="closeDropdown">
            <nuxt-link to="/my-orders">
              <li class="flex items-center gap-3 px-[18px]">
                <img src="@/static/svg/clock.svg" alt="" />
                <span class="block py-2.5 text-[#333333] font-medium text-base">
                  My orders
                </span>
              </li>
            </nuxt-link>
            <nuxt-link to="/edit-profile">
              <li class="flex items-center gap-3 px-[18px]">
                <img src="@/static/svg/user.svg" alt="" />
                <span class="block py-2.5 text-[#333333] font-medium text-base">
                  Profile
                </span>
              </li>
            </nuxt-link>
            <li class="flex items-center gap-3 px-[18px]">
              <img src="@/static/svg/settings-sliders.svg" alt="" />
              <a class="block py-2.5 text-[#333333] font-medium text-base"
                >Settings</a
              >
            </li>
            <li class="flex items-center gap-3 px-[18px]" @click="logout">
              <img src="@/static/svg/logout.svg" alt="" class="w-6 h-6" />
              <a class="block py-2.5 text-[#333333] font-medium text-base"
                >Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdown: false,
    };
  },
  methods: {
    closeDropdown() {
      this.isDropdown = false;
    },
    logout() {
      this.$cookies.remove("token");
      this.$cookies.remove("refreshToken");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.dropdown-content:after {
  content: "";
  position: absolute;
  top: 4px;
  right: 15%;
  margin-top: -15px;
  z-index: 1;
  border-bottom: solid 15px #fff;
  border-left: solid 12px transparent;
  border-right: solid 12px transparent;
}
</style>
