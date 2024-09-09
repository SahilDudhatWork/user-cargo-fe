<template>
  <div>
    <div class="relative">
      <button
        @click="toggleDropdown"
        class="dropdown-list relative bg-white mx-0 font-normal rounded-lg text-base focus:outline-none py-[14px] w-full xl:w-[382px] text-center inline-flex justify-between px-2"
        :class="[
          isDropdown ? 'border-t border-r border-l rounded-t-lg' : 'border',
          selectedLabel === 'Select option'
            ? 'text-[#989898]'
            : 'text-[#1E1E1E]',
        ]"
        type="button"
      >
        <span class="flex gap-2 justify-between">
          <span>{{ selectedLabel }}</span>
          <img
            src="@/static/svg/up-arrow.svg"
            alt=""
            v-if="isDropdown"
            class="absolute right-3 top-5"
          />
          <img
            src="@/static/svg/down-arrow.svg"
            alt=""
            v-else
            class="absolute right-4 top-6"
          />
        </span>
      </button>
      <div
        v-if="isDropdown"
        v-click-outside="closeDropdown"
        class="!z-[999] bg-white rounded-lg shadow xl:w-[382px] w-full dark:bg-gray-700 absolute"
      >
        <ul class="text-base text-gray-700 cursor-pointer">
          <li v-for="(item, index) in items" :key="index">
            <a @click.prevent="selectItem(item, index)">
              <span class="block px-4 py-[16px] font-medium hover:bg-gray-100">
                {{ item.label }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedLabel: {
      type: String,
      required: true,
    },
    isSvg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDropdown: false,
    };
  },
  methods: {
    closeDropdown() {
      this.isDropdown = false;
    },
    toggleDropdown() {
      this.isDropdown = !this.isDropdown;
      //   if (this.isDropdown) {
      //     this.$nextTick(() => {
      //       this.$el.querySelector(".dropdown-list").scrollIntoView({
      //         behavior: "smooth",
      //         block: "start",
      //       });
      //     });
      //   }
    },
    selectItem(item) {
      this.isDropdown = false;
      this.$emit("getValue", item);
    },
  },
};
</script>
