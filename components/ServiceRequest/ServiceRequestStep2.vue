<template>
  <div>
    <Additional @click="step1Next">
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
        <div class="flex items-center">
          <p class="text-sm text-[#151515] font-normal mt-3 mb-3">
            Port & Bridge of Crossing
          </p>
          <div
            class="h-full mx-2 w-[84%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
          ></div>
        </div>
        <div class="grid grid-cols-2 gap-7">
          <TypeOfTransportation
            v-for="(item, index) of formatPortItem"
            :key="index"
            :item="item"
            :isSelected="
              item.title === selectedServiceItems?.selectedPortItem?.title
            "
            @select="selectTypeOfTransportationItemPortItem"
          />
        </div>
        <div class="flex items-center">
          <p class="text-sm text-[#151515] font-normal mt-3 mb-3">
            Type of Transportation
          </p>
          <div
            class="h-full mx-2 w-[86%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
          ></div>
        </div>
        <div class="grid grid-cols-2 gap-7">
          <TypeOfTransportation
            v-for="(item, index) of serviceData?.typeOfTransportation"
            :key="index"
            :item="item"
            :isSelected="
              item.title ===
              selectedServiceItems?.selectedTypeOfTransportationItem.title
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
          <p class="text-sm text-[#151515] font-normal mt-3 mb-3">
            Mode of Transportation
          </p>
          <div
            class="h-full mx-2 w-[85%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
          ></div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <ModeOfTransportation
            v-if="
              selectedServiceItems?.selectedTypeOfTransportationItem.title ===
              'FTL'
            "
            v-for="(item, index) of serviceData?.modeOfTransportation?.FTL"
            :key="index"
            :item="item"
            :isSelected="
              item.title === selectedServiceItems?.selectedModeItem?.title
            "
            @select="modeSelectItem"
          />
          <ModeOfTransportation
            v-if="
              selectedServiceItems?.selectedTypeOfTransportationItem.title ===
              'LTL'
            "
            v-for="(item, index) of serviceData?.modeOfTransportation?.LTL"
            :key="index"
            :item="item"
            :isSelected="
              item.title === selectedServiceItems?.selectedModeItem?.title
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
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      serviceData: "service/getService",
      selectedServiceItems: "service/getSelectedServiceItems",
    }),
    formatPortItem() {
      return this.serviceData?.port_BridgeOfCrossing.map((user) => {
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
        (this.selectedServiceItems.selectedPortItem &&
          this.selectedServiceItems.selectedPortItem?.title == "") ||
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
