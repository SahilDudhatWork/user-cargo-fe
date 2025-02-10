<template>
  <div>
    <div class="flex justify-center relative -top-36">
      <div class="bg-white rounded-2xl sm:px-8 px-4 py-8 xl:w-[65%] w-full">
        <slot name="header"></slot>
        <slot name="content"></slot>
        <div class="flex justify-end gap-4 sm:flex-row flex-col">
          <button
            v-if="isSkipButton"
            @click="$emit('skip')"
            class="font-semibold text-base text-white bg-[#7b9bbf] rounded-xl py-[15px] px-[35px] mt-4 focus:outline-none"
          >
            Skip
          </button>
          <VueLoadingButton
            v-if="isShowButton"
            ref="loader"
            aria-label="Post message"
            :loading="isButtonLoader"
            :disabled="isLoading"
            :styled="true"
            style="
              padding-left: 87px !important;
              padding-right: 87px !important;
            "
            class="!font-semibold !text-white !bg-[#0060C9] !rounded-xl !leading-none !py-[18px] !mt-4 !text-[16px] focus:outline-none text-center"
            @click.native="$emit('click')"
          >
            Continue
          </VueLoadingButton>
          <!-- <button
            v-if="isShowButton"
            @click="$emit('click')"
            :disabled="isLoading"
            class="font-semibold text-base text-white bg-[#0060C9] rounded-xl py-[15px] px-[87px] mt-4 focus:outline-none"
          >
            Continue
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isShowButton: {
      type: Boolean,
      default: true,
    },
    isButtonLoader: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isSkipButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped></style>
