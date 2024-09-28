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
export default {
  middleware: "auth",
  mounted() {
    const serviceRoutePattern = /^\/my-orders\/service\/[a-zA-Z0-9]+$/;
    if (
      this.$route.fullPath != "/edit-profile" &&
      this.$route.fullPath != "/my-orders" &&
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
  min-height: 100vh; /* Full height of the viewport */
}

main {
  flex-grow: 1; /* Main content takes available space */
}

footer {
  width: 100%;
}
</style>
