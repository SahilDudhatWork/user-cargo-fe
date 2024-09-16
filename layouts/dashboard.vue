<template>
  <div>
    <DashboardHeader />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: "auth",
  mounted() {
    if (
      this.$route.fullPath != "/edit-profile" &&
      this.$route.fullPath != "/my-orders"
    ) {
      document.body.style.backgroundColor = "#ECF3FA";
    }
  },
  beforeDestroy() {
    document.body.style.backgroundColor = "";
  },
};
</script>
