<template>
  <div class="main-layout">
    <DashboardHeader />
    <main class="flex-grow">
      <Nuxt />
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
  methods: {
    ...mapActions({
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
  },
  mounted() {
    this.activate().then(() => {
      this.notificationToken();
    });
    const serviceRoutePattern = /^\/my-orders\/service\/[a-zA-Z0-9]+$/;
    const settingsRoutePattern = /^\/settings\/[a-zA-Z0-9]+$/;
    if (
      this.$route.fullPath != "/edit-profile" &&
      this.$route.fullPath != "/my-orders" &&
      !settingsRoutePattern.test(this.$route.fullPath) &&
      !serviceRoutePattern.test(this.$route.fullPath)
    ) {
      document.body.style.backgroundColor = "#ECF3FA";
    }
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
