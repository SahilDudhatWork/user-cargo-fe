<template>
  <div>
    <div
      class="pt-[17px] pb-[19px] rounded-bl-[16px] rounded-br-[16px] bg-white"
    >
      <div class="xl:mx-48 mx-6 flex justify-between items-center">
        <button
          @click="toggleSidebar"
          type="button"
          class="inline-flex items-center ms-3 display-block text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
            width="32"
            height="32"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <div>
          <img src="@/static/Images/header-logo.webp" alt="" />
        </div>
        <header
          class="flex justify-between relative"
          v-click-outside="closeSidebar"
        >
          <div class="flex items-center gap-12">
            <ul class="sm:flex hidden display-block items-center gap-7">
              <li
                v-for="(item, index) in navItems"
                :key="index"
                class="drop-li relative"
              >
                <a
                  @click.prevent="setActive(index)"
                  :class="{ active: activeIndex === index }"
                  :href="item.href"
                  class="xl:text-sm cursor-pointer inline-flex gap-2 justify-center items-center font-normal [&.active]:after:content('') [&.active]:after:w-full [&.active]:after:h-[2px] [&.active]:after:bg-gradient-to-r from-[#9ED0FF] to-[#4F42E4] [&.active]:after:absolute [&.active]:after:bottom-[-10px] [&.active]:after:left-0 relative nav-menu-content"
                >
                  {{ item.text }}
                </a>
              </li>
              <nuxt-link to="/login">
                <button
                  type="button"
                  class="bg-[#0060C9] text-white font-semibold text-base py-[9px] px-[21px] rounded-xl"
                >
                  Get Started
                </button>
              </nuxt-link>
            </ul>
          </div>
        </header>
      </div>
      <aside
        :class="isSidebarOpen ? 'translate-x-0 ' : '-translate-x-full'"
        v-click-outside="closeSidebar"
        class="fixed block sm:hidden top-0 left-0 !z-[999] sm:w-[19rem] w-[17rem] h-full transition-transform sm:translate-x-0 bg-[#F5F9FD] xl:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="bg-dashboard-img h-full py-7 dark:bg-gray-800">
          <div>
            <div class="flex items-center justify-center gap-3"></div>
            <div class="flex justify-center mt-12">
              <ul
                class="flex flex-col text-white text-xl font-medium cursor-pointer w-full justify-center"
              >
                <li v-for="(tab, key) in navItems" :key="key">
                  <Nuxt-link
                    :to="tab.href"
                    class="flex items-center gap-2 ml-5 py-[20px]"
                  >
                    <span
                      class="flex gap-4 font-medium text-xl text-justify text-black"
                      >{{ tab.text }}</span
                    >
                  </Nuxt-link>
                </li>
                <span
                  class="flex gap-4 font-medium text-xl text-justify text-black ml-5 mt-4"
                  >Get started</span
                >
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      navItems: [
        {
          text: "Service",
          href: "/service",
        },
        {
          text: "About us",
          href: "/about-us",
        },
        {
          text: "Blog",
          href: "/blog",
        },
        {
          text: "Contact us",
          href: "/contact-us",
        },
      ],
      activeIndex: 0,
    };
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style scoped></style>
