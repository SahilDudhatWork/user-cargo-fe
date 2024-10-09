<template>
  <div>
    <div
      class="rounded-2xl py-[12px] px-4 mb-3 flex justify-between cursor-pointer h-[110px]"
      :class="
        isSelected ? 'border border-[#3683D5]' : 'border border-[#E7E7E7]'
      "
      @click="handleClick"
    >
      <div>
        <p
          class="text-base"
          :class="
            isSelected
              ? 'text-[#034790] font-bold'
              : 'text-[#1E1E1E] font-medium '
          "
        >
          {{ item?.title }}
          <span v-if="item?.price"> (${{ item?.price }}) </span>
        </p>
        <p class="font-normal text-sm text-gray-400">{{ item?.description }}</p>
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
