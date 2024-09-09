<template>
  <div>
    <LandingHeader />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
export default {
  mounted() {
    document.body.style.backgroundColor = "#ECF3FA";
  },
  beforeDestroy() {
    document.body.style.backgroundColor = "";
  },
};
</script>
