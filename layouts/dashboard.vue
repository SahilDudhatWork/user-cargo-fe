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
    document.body.style.backgroundColor = "#ECF3FA";
  },
  beforeDestroy() {
    document.body.style.backgroundColor = "";
  },
};
</script>
