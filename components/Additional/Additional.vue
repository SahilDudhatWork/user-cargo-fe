<template>
  <div>
    <div class="flex justify-center relative -top-36">
      <div class="bg-white rounded-2xl px-8 py-8 w-[65%]">
        <slot name="header"></slot>
        <slot name="content"></slot>
        <div class="flex justify-end">
          <button
            v-if="isShowButton"
            @click="$emit('click')"
            class="font-semibold text-base text-white bg-[#0060C9] rounded-xl py-[15px] px-[87px] mt-4 focus:outline-none"
          >
            Continue
          </button>
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
  },
};
</script>
