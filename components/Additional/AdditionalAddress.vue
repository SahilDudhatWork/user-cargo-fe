<template>
  <div>
    <div
      class="rounded-2xl py-[12px] px-4 mb-3 flex justify-between cursor-pointer w-[320px] mx-3"
      :class="
        isSelected ? 'border border-[#3683D5]' : 'border border-[#E7E7E7] '
      "
      @click="handleClick"
    >
      <div>
        <span
          class="rounded flex"
          :class="
            isSelected ? 'bg-[#034790] p-1' : ' p-[7px] border border-gray-400'
          "
        >
          <img
            src="@/static/svg/true.svg"
            alt=""
            class="w-[9px] h-[9px]"
            v-if="isSelected"
          />
        </span>
      </div>
      <div>
        <p class="font-semibold text-sm text-[#1E1E1E]">{{ item?.title }}</p>
        <p
          class="font-medium text-[12px] text-[#1B1B1B] border-b border-[#EEEEEE] pb-2 pt-1"
        >
          {{ item?.address }}
        </p>
        <p class="font-semibold text-sm text-[#1E1E1E] pt-2">
          {{ item?.details }}
        </p>
      </div>
      <div>
        <p class="text-[#0060C9] font-medium text-sm">Edit</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("select", this.item);
    },
  },
};
</script>
