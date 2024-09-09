<template>
  <div>
    <div
      class="pt-[17px] pb-[19px] rounded-bl-[16px] rounded-br-[16px] bg-white"
    >
      <div class="sm:mx-48 mx-6 flex justify-between items-center">
        <div>
          <img src="@/static/Images/header-logo.webp" alt="" />
        </div>
        <header class="flex justify-between relative">
          <div class="flex items-center gap-12">
            <ul class="flex display-block items-center gap-7">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  },
};
</script>
