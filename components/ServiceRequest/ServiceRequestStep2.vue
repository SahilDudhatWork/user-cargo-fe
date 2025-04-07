<template>
  <div>
    <Additional @click="step1Next" :isButtonLoader="isButtonLoader">
      <template #header>
        <div class="flex items-center gap-2 cursor-pointer mb-3">
          <span
            class="text-[12px] font-semibold text-[#000000]"
            @click="
              {
                openModal('step1'), closeModal('step2');
              }
            "
          >
            Service
          </span>
          <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
        </div>
      </template>
      <template #content>
        <h1 class="font-bold text-[18px] text-[#000000]">
          Choose Additional Details
        </h1>
        <p class="text-base font-medium text-gray-400">
          Lorem ipsum dolor sit amet consectetur. Digni quam ullamcorper
        </p>
        <div
          v-if="
            selectedServiceItems.selectedServiceItem.title !=
              'Local Drayage US' &&
            selectedServiceItems.selectedServiceItem.title != 'Local Drayage MX'
          "
          class="flex items-center"
        >
          <p class="text-[16px] font-medium text-[#0060c9] mt-3 mb-3">
            Port & Bridge of Crossing
          </p>
          <div
            class="h-full mx-2 w-[86%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#0060c9] before:to-[#FFFFFF]"
          ></div>
        </div>
        <div
          v-if="
            selectedServiceItems.selectedServiceItem.title !=
              'Local Drayage US' &&
            selectedServiceItems.selectedServiceItem.title != 'Local Drayage MX'
          "
          class="grid sm:grid-cols-2 grid-cols-1 gap-7"
        >
          <TypeOfTransportation
            v-for="(item, index) of formatPortItem"
            :key="index"
            :item="item"
            :isSelected="
              item?._id === selectedServiceItems?.selectedPortItem?._id
            "
            @select="selectTypeOfTransportationItemPortItem"
          />
        </div>
        <div class="flex items-center">
          <p class="text-[16px] font-medium text-[#0060c9] mt-3 mb-3">
            Type of Transportation
          </p>
          <div
            class="h-full mx-2 w-[86%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#0060c9] before:to-[#FFFFFF]"
          ></div>
        </div>
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-7">
          <TypeOfTransportation
            v-for="(item, index) of serviceData?.typeOfTransportation"
            :key="index"
            :item="item"
            :isSelected="
              item?._id ===
              selectedServiceItems?.selectedTypeOfTransportationItem?._id
            "
            @select="selectTypeOfTransportationItem"
          />
        </div>
        <p class="font-medium text-[13px] text-gray-400">
          Choose one of the above option to continue
        </p>
        <div
          class="flex items-center"
          v-if="selectedServiceItems?.selectedTypeOfTransportationItem?.title"
        >
          <p class="text-[16px] font-medium text-[#0060c9] mt-3 mb-3">
            Mode of Transportation
          </p>
          <div
            class="h-full mx-2 w-[86%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#0060c9] before:to-[#FFFFFF]"
          ></div>
        </div>
        <div class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
          <ModeOfTransportation
            v-for="(item, index) in filteredTransportationItems"
            :key="index"
            :item="item"
            :isSelected="
              item._id === selectedServiceItems?.selectedModeItem?._id
            "
            @select="modeSelectItem"
          />
        </div>
      </template>
    </Additional>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    isButtonLoader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      serviceData: "service/getService",
      selectedServiceItems: "service/getSelectedServiceItems",
    }),
    filteredTransportationItems() {
      const selectedType =
        this.selectedServiceItems?.selectedTypeOfTransportationItem?.title;
      return this.serviceData?.modeOfTransportation?.[selectedType] || [];
    },
    formatPortItem() {
      return this.serviceData?.port_BridgeOfCrossing?.map((user) => {
        return {
          _id: user._id,
          title: user.post_bridge,
        };
      });
    },
  },
  methods: {
    ...mapActions({
      openModal: "service/openModal",
      closeModal: "service/closeModal",
      updateSelectedServiceItems: "service/updateSelectedServiceItems",
    }),
    modeSelectItem(item) {
      this.updateSelectedServiceItems({
        key: "selectedModeItem",
        item: item,
      });
    },
    selectTypeOfTransportationItem(item) {
      this.updateSelectedServiceItems({
        key: "selectedTypeOfTransportationItem",
        item: item,
      });
    },
    selectTypeOfTransportationItemPortItem(item) {
      this.updateSelectedServiceItems({
        key: "selectedPortItem",
        item: item,
      });
      if (this.selectedServiceItems?.selectedPortItem?.title !== item?.title) {
        this.updateSelectedServiceItems({
          key: "selectedSpecialRequirementItems",
          item: [],
        });
      }
    },
    step1Next() {
      if (
        (this.selectedServiceItems.selectedTypeOfTransportationItem &&
          this.selectedServiceItems.selectedTypeOfTransportationItem?.title ==
            "") ||
        (this.selectedServiceItems.selectedModeItem &&
          this.selectedServiceItems.selectedModeItem?.title == "")
      ) {
        this.$toast.open({
          message: "Please select the field before submitting.",
          type: "error",
        });
      } else {
        if (
          this.selectedServiceItems.selectedServiceItem.title !=
            "Local Drayage US" &&
          this.selectedServiceItems.selectedServiceItem.title !=
            "Local Drayage MX"
        ) {
          if (
            this.selectedServiceItems.selectedPortItem &&
            this.selectedServiceItems.selectedPortItem?.title == ""
          ) {
            this.$toast.open({
              message: "Please select the field before submitting.",
              type: "error",
            });
            return;
          }
        }

        let items = {
          selectedPortItem: this.selectedServiceItems.selectedPortItem,
          selectedTypeOfTransportationItem:
            this.selectedServiceItems.selectedTypeOfTransportationItem,
          selectedModeItem: this.selectedServiceItems.selectedModeItem,
        };
        this.$emit("step1Next", items);
      }
    },
  },
};
</script>
