<template>
  <div class="main-layout">
    <DashboardHeader />
    <main class="flex-grow">
      <div class="lg:mx-44 mx-6">
        <div class="flex">
          <div class="relative">
            <ul
              class="lg:w-[400px] sm:w-[300px] w-[150px] h-[500px] overflow-y-auto scroll-container relative"
            >
              <li
                v-for="(item, key) in sidebarItems"
                :key="key"
                class="border-b pb-4 pt-4 pl-6 cursor-pointer"
                :class="{
                  'bg-[#F5F9FD] text-white':
                    previousPath === formatPath(item.slug),
                }"
              >
                <nuxt-link :to="formatPath(item.slug)">
                  <h1 class="text-[#000000] font-bold text-lg">
                    {{ item.title }}
                  </h1>
                  <span class="text-[#00000099] font-normal text-sm">{{
                    item.subTitle
                  }}</span>
                </nuxt-link>
              </li>
            </ul>
            <div
              class="absolute bottom-0 left-0 w-full h-20 pointer-events-none bg-gradient-to-t from-white to-transparent"
            ></div>
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
import { getToken } from "firebase/messaging";
import { messaging } from "@/plugins/firebase";
import { mapActions } from "vuex";
export default {
  middleware: "auth",
  data() {
    return {
      previousPath: "/settings/notifications",
      sidebarItems: [],
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
    };
  },
  watch: {
    "$route.path"(newPath) {
      this.previousPath = this.$router.history.current.fullPath;
      this.setBackgroundColor(newPath);
    },
  },
  methods: {
    ...mapActions({
      fetchSettings: "settings/fetchSettings",
      updateNotificationToken: "service/updateNotificationToken",
    }),
    async activate() {
      const token = await getToken(messaging, {
        vapidKey: process.env.NOTIFICATION_KEY,
      });
      if (token) {
        this.webToken = token;
      }
    },
    async notificationToken() {
      try {
        await this.updateNotificationToken({
          webToken: this.webToken,
        });
      } catch (error) {
        console.log(error, "error");
      }
    },
    formatPath(slug) {
      return `/settings/${slug}`;
    },
    setBackgroundColor(path) {
      const settingsRoutePattern = /^\/settings\/.+$/;
      if (!settingsRoutePattern.test(path)) {
        document.body.style.backgroundColor = "#ECF3FA";
      } else {
        document.body.style.backgroundColor = "";
      }
    },
    async getSettings() {
      try {
        const res = await this.fetchSettings();
        this.sidebarItems = res.data;
        const notifications = {
          title: "Notifications",
          subTitle: "Email/ SMS",
          slug: "notifications",
        };
        const logout = {
          title: "Logout",
          subTitle: "Logout/ Delete account",
          slug: "logout",
        };

        this.sidebarItems = [notifications, ...res.data, logout];
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    this.activate().then(() => {
      this.notificationToken();
    });
    await this.getSettings();
    this.setBackgroundColor(this.$route.fullPath);
    this.previousPath = this.$route.path;
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
