<template>
  <div style="z-index: 999" class="fixed top-0 w-full lef-0">
    <div class="fixed inset-0" v-if="isModal">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 transition-opacity" @click="$emit('close')">
          <div class="absolute inset-0 bg-black opacity-75"></div>
        </div>
        <div class="max-w-4xl mx-auto z-50 bg-white rounded-2xl">
          <div
            class="flex flex-col items-center justify-center overflow-hidden px-5 sm:w-[326px] w-[250px]"
          >
            <div class="mt-7 mb-4">
              <img
                src="@/static/svg/green-true-line.svg"
                class="object-cover bg-[#3ECC481A] rounded-full py-[24px] px-[18px]"
              />
            </div>
            <div class="flex-3">
              <h1 class="text-xl font-semibold text-[#1E1E1E] mt-2 text-center">
                Request Send Successfully
              </h1>
              <p
                class="text-[#4B4B4B] font-light text-sm max-w-[282px] mt-2 mb-3 text-center"
              >
                Thanks for requesting to our service, Please give us some time
                to look.
              </p>
              <div class="flex gap-3 mt-5 mb-5">
                <button
                  @click="$emit('click')"
                  type="button"
                  class="w-full border border-[#0464CB] text-transparent bg-clip-text bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium !rounded-lg text-[20px] px-4 py-[11px] text-center"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
          <div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModal: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
