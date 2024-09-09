<template>
  <div>
    <div
      class="rounded-2xl py-[5px] px-4 mb-3 flex justify-between cursor-pointer"
      :class="
        isSelected ? 'bg-[#0060C91A]' : 'bg-white border border-[#E7E7E7] '
      "
      @click="handleClick"
    >
      <div>
        <p
          :class="
            isSelected
              ? 'text-[#0060C9] font-medium'
              : 'text-gray-400 font-normal'
          "
          class="text-sm"
        >
          {{ label }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
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
      this.$emit("select", this.label);
    },
  },
};
</script>
