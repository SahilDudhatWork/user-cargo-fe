<template>
  <div>
    <div class="relative h-[350px]">
      <img
        src="@/static/Images/additional-hero-img.webp"
        alt=""
        class="w-full relative !-top-32 !h-[450px]"
      />
      <button
        v-if="isGoBack"
        type="button"
        class="flex items-center gap-1 bg-[#000000] absolute rounded-lg sm:left-40 left-8 px-[11px] py-1 opacity-65 top-5"
        @click="$emit('prevPage')"
      >
        <img src="@/static/svg/left-arrow.svg" alt="" class="" />
        <span class="text-white font-medium text-[15px] cursor-pointer">
          Go back
        </span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      modal: (state) => state.service.modal,
    }),
    isGoBack() {
      const step7 = this.modal.step7;
      return !step7;
    },
  },
};
</script>
