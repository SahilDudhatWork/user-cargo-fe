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
            v-for="(item, index) of portList"
            :key="index"
            :item="item"
            :isSelected="item.title === selectedPortItem.title"
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
            :isSelected="item.title === selectedTypeOfTransportationItem.title"
            @select="selectTypeOfTransportationItem"
          />
        </div>
        <p class="font-medium text-[13px] text-gray-400">
          Choose one of the above option to continue
        </p>
        <div class="flex items-center">
          <p class="text-sm text-[#151515] font-normal mt-3 mb-3">
            Mode of Transportation
          </p>
          <div
            class="h-full mx-2 w-[85%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
          ></div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <ModeOfTransportation
            v-if="selectedTypeOfTransportationItem?.title === 'FTL'"
            v-for="(item, index) of serviceData?.modeOfTransportation?.FTL"
            :key="index"
            :item="item"
            :isSelected="item.title === selectedModeItem.title"
            @select="modeSelectItem"
          />
          <ModeOfTransportation
            v-if="selectedTypeOfTransportationItem?.title === 'LTL'"
            v-for="(item, index) of serviceData?.modeOfTransportation?.LTL"
            :key="index"
            :item="item"
            :isSelected="item.title === selectedModeItem.title"
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
    return {
      portList: [
        {
          title: "NUEVO LAREDO - LAREDO",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
        },
        {
          title: "COLOMBIA - LAREDO",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
        },
      ],
      selectedModeItem: {
        title: "",
      },
      selectedTypeOfTransportationItem: {
        title: "FTL",
      },
      selectedPortItem: {
        title: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      serviceData: "service/getService",
    }),
  },
  methods: {
    ...mapActions({
      openModal: "service/openModal",
      closeModal: "service/closeModal",
    }),
    modeSelectItem(item) {
      this.selectedModeItem = item;
    },
    selectTypeOfTransportationItem(item) {
      this.selectedTypeOfTransportationItem = item;
    },
    selectTypeOfTransportationItemPortItem(item) {
      this.selectedPortItem = item;
    },
    step1Next() {
      if (
        (this.selectedPortItem && this.selectedPortItem?.title == "") ||
        (this.selectedTypeOfTransportationItem &&
          this.selectedTypeOfTransportationItem?.title == "") ||
        (this.selectedModeItem && this.selectedModeItem?.title == "")
      ) {
        this.$toast.open({
          message: "Please select the field before submitting.",
          type: "error",
        });
      } else {
        let items = {
          selectedPortItem: this.selectedPortItem,
          selectedTypeOfTransportationItem:
            this.selectedTypeOfTransportationItem,
          selectedModeItem: this.selectedModeItem,
        };
        this.$emit("step1Next", items);
      }
    },
  },
};
</script>
