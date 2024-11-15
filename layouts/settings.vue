<template>
  <div class="main-layout">
    <DashboardHeader />
    <main class="flex-grow">
      <div class="lg:mx-44 mx-6">
    <div class="flex">
      <div class="w-[400px] h-[500px]">
        <ul>
          <li v-for="(item,key) in sidebarItems" :key="key" class="border-b pb-4 pt-4 pl-6 cursor-pointer" :class=" {'bg-[#F5F9FD] text-white': previousPath === item.href}
                  ">
              <nuxt-link :to="item.href">
            <h1 class="text-[#000000] font-bold text-lg">
              {{item.name}}
          </h1>
          <span class="text-[#00000099] font-normal text-sm">{{item.description}}</span>
        </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="w-full">
          <Nuxt />
      </div>
    </div>
    <div class="mt-4 mb-10">
            <VueSlickCarousel v-bind="cargoWorkSettings">
              <div
                v-for="(item, index) of cargoWorks"
                :key="index"
                class="bg-[#F5F9FD] px-4 py-[15px] rounded-2xl"
              >
                <p class="font-medium text-base text-[#4B4B4B]">
                  {{ item.title }}
                </p>
                <p class="text-[#4B4B4B] font-light text-sm mt-1">
                  {{ item.description }}
                </p>
              </div>
            </VueSlickCarousel>
          </div>
   </div>
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data(){
    return{
      previousPath:"/settings/notifications",
      sidebarItems:[
      {
        name:"Notifications",
        description:"Email/ SMS",
        href:"/settings/notifications"
      },
      {
        name:"About Us",
        description:"Our Journey & vision",
        href:"/settings/about-us"
      },
      {
        name:"Privacy Policy",
        description:"About our policies",
        href:"/settings/privacy-policy"
      },
      {
        name:"Terms & Condition",
        description:"Our terms & condition",
        href:"/settings/terms-condition"
      },
      {
        name:"Logout",
        description:"Logout/ Delete account",
        href:"/settings/logout"
      },
    ],
    cargoWorkSettings: {
        speed: 500,
        slidesToShow: 1,
        dots: true,
        swipeToSlide: false,
        centerMode: true,
        centerPadding: "0px",
        arrows: false,
      },
      cargoWorks: [
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
      ],
    }
  },
  watch: {
    "$route.path"(newPath) {
      this.previousPath = this.$router.history.current.fullPath;
      this.updateActiveTab(newPath);
      this.setBackgroundColor(newPath);
    },
  },
  methods:{
    updateActiveTab(path) {
    this.sidebarItems.forEach((tab) => {
      if (path.startsWith(tab.href)) {
        tab.isActive = true;
        this.previousPath = tab.href;
      } else {
        tab.isActive = false;
      }
    });
  },
  setBackgroundColor(path) {
      const settingsRoutePattern = /^\/settings\/(notifications|about-us|privacy-policy|terms-condition|logout|Logout)$/;
      if (!settingsRoutePattern.test(path)) {
        document.body.style.backgroundColor = "#ECF3FA";
      } else {
        document.body.style.backgroundColor = "";
      }
    },
  },
  beforeMount() {
    this.updateActiveTab(this.$router.history.current.fullPath);
  },
  mounted() {
    this.setBackgroundColor(this.$route.fullPath);
    // const settingsRoutePattern = /^\/settings\/[a-zA-Z0-9]+$/;
    // if (
    //   !settingsRoutePattern.test(this.$route.fullPath)
    // ) {
    //   document.body.style.backgroundColor = "#ECF3FA";
    // }
  },
  beforeDestroy() {
    document.body.style.backgroundColor = "";
  },
};
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}

footer {
  width: 100%;
}
</style>
