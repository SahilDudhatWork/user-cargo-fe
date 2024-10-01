<template>
  <div>
    <div
      class="rounded-2xl py-[12px] px-4 mb-3 flex justify-between cursor-pointer"
      :class="
        isSelected ? 'border border-[#3683D5]' : 'border border-[#E7E7E7] '
      "
      @click="handleClick"
    >
      <div>
        <p class="font-bold text-[18px] text-[#000000]">{{ item?.title }}</p>
        <p class="font-medium text-sm text-gray-400">
          {{
            item?.description ||
            "Lorem ipsum dolor sit amet Mauris risus turpis."
          }}
        </p>
      </div>
      <div>
        <span
          class="rounded-full flex"
          :class="
            isSelected ? 'bg-[#3683D5] p-1' : ' p-[9px] border border-gray-400'
          "
        >
          <img
            src="@/static/svg/true.svg"
            alt=""
            class="w-[12px] h-[12px]"
            v-if="isSelected"
          />
        </span>
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
