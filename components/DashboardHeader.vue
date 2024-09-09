<template>
  <div>
    <div
      class="pt-[17px] pb-[19px] !rounded-bl-[16px] !rounded-br-[16px] bg-white relative !z-50"
    >
      <header class="sm:mx-40 mx-6 flex justify-between relative">
        <div class="flex items-center gap-12">
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
          class="z-50 absolute right-[5rem] top-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
            aria-labelledby="dropdownHoverButton"
            @click="closeDropdown"
          >
            <li>
              <nuxt-link
                to="/edit-profile"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Profile</nuxt-link
              >
            </li>
            <li>
              <a
                to="/setting"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Settings</a
              >
            </li>
            <li>
              <a
                @click="logOut"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Log out</a
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
    async logOut() {
      this.$cookies.remove("token");
      this.$router.push("/login");
    },
  },
};
</script>
