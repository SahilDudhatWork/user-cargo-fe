<template>
  <div>
    <div
      class="rounded-2xl py-[12px] px-3 mb-3 flex justify-between cursor-pointer mx-3 xl:w-[340px] lg:w-[265px] sm:w-[270px] xs:h-[130px] h-[230px] carosel relative"
      :class="
        isSelected ? 'border border-[#3683D5]' : 'border border-[#E7E7E7]'
      "
      @click="handleClick"
    >
      <div class="flex gap-4">
        <div>
          <span
            class="rounded flex items-center justify-center"
            :class="
              isSelected
                ? 'bg-[#034790] p-[8px]'
                : 'p-[7px] border border-gray-400'
            "
          >
            <img
              src="@/static/svg/true.svg"
              alt=""
              v-if="isSelected"
              class="absolute px-[2px]"
            />
          </span>
        </div>
        <div>
          <p class="font-semibold text-sm text-[#1E1E1E]">
            {{
              addressDetails.length > 25
                ? addressDetails.substring(0, 25) + "..."
                : addressDetails
            }}
          </p>
          <p class="font-medium text-[12px] text-[#1B1B1B]">
            {{
              String(item?.addressDetails?.postalCode).length > 10
                ? String(item?.addressDetails?.postalCode).substring(0, 10) +
                  "..."
                : item?.addressDetails?.postalCode
            }}
          </p>
          <div class="absolute bottom-2 pt-1 sm:w-3/4 w-1/2">
            <div class="w-full h-[1px] bg-[#EEEEEE] mb-1"></div>
            <p class="font-semibold text-sm text-[#1E1E1E]">
              {{
                String(item?.contactDetails?.contactName).length > 15
                  ? String(item?.contactDetails?.contactName).substring(0, 15) +
                    "..."
                  : item?.contactDetails?.contactName
              }}
              {{ item?.contactDetails?.contactNumber }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="text-[#0060C9] font-medium text-sm"
          @click.stop="getUserAddress"
        >
          Edit
        </button>
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
  computed: {
    addressDetails() {
      return `${this.item?.addressDetails?.buildinName}`;
    },
  },
  methods: {
    handleClick() {
      this.$emit("select", this.item);
    },
    getUserAddress() {
      this.$emit("getUserAddress", this.item._id);
    },
  },
};
</script>

<style>
@media (max-width: 400px) and (min-width: 330px) {
  .carosel {
    height: 180px;
  }
}
</style>
