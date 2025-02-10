<template>
  <div class="example">
    <p>
      Click button to trigger loading simulation, click
      <button type="button" @click="isStyled = !isStyled">here</button>
      to
      {{ isStyled ? "unstyle" : "style" }}
    </p>
    <VueLoadingButton
      aria-label="Post message"
      class="button"
      @click.native="handleClick"
      :loading="isLoading"
      :styled="isStyled"
      >Send</VueLoadingButton
    >
  </div>
</template>

<script>
import VueLoadingButton from "vue-loading-button";

export default {
  name: "Example",
  data() {
    return {
      isLoading: false,
      isStyled: false,
    };
  },
  methods: {
    handleClick() {
      console.log("click"); /* eslint-disable-line */
      this.isLoading = true;
      setTimeout(() => (this.isLoading = false), 3000);
    },
  },
  components: {
    VueLoadingButton,
  },
};
</script>

<style>
/* .example {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  text-align: center;
} */
</style>
