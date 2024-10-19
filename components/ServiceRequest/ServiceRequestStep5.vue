<template>
  <div>
    <Additional @click="step4Next">
      <template #header>
        <div
          class="flex items-center gap-2 cursor-pointer sm:flex-row flex-col"
        >
          <div class="flex items-center gap-2">
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step1'), closeModal('step5');
                }
              "
            >
              Service
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step2'), closeModal('step5');
                }
              "
            >
              {{ service?.typeOfTransportation?.title }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step3'), closeModal('step5');
                }
              "
            >
              {{ service?.modeOfTransportation?.title }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
          </div>
          <div class="flex items-center gap-2">
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step4'), closeModal('step5');
                }
              "
            >
              Add Address
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span class="text-[12px] font-semibold text-[#000000]">
              Select Address
            </span>
          </div>
        </div>
      </template>
      <template #content>
        <div class="mt-4 mb-4">
          <GoogleMap />
        </div>
        <div v-if="userAddress && userAddress.length > 0">
          <h1 class="text-[#00000099] font-normal text-base mt-4 mb-4">
            PICKUP LOCATIONS
          </h1>
          <div class="ml-6 mr-7">
            <VueSlickCarousel
              v-if="userAddress && userAddress.length"
              v-bind="settings"
              class="flex justify-center"
            >
              <AdditionalAddress
                v-for="(item, index) of userAddress"
                :key="index"
                :item="item"
                :isSelected="selectedPickup(item._id)"
                @select="selectPickupItem(item._id)"
                @getUserAddress="getEditUserAddress"
              />
            </VueSlickCarousel>
          </div>
        </div>
        <div v-if="userAddress && userAddress.length > 0">
          <h1 class="text-[#00000099] font-normal text-base mt-4 mb-4">
            DROP LOCATIONS
          </h1>
          <div class="ml-6 mr-7">
            <VueSlickCarousel
              v-if="userAddress && userAddress.length"
              v-bind="settings"
              class="flex justify-center"
            >
              <AdditionalAddress
                v-for="(item, index) of userAddress"
                :key="index"
                :item="item"
                :isSelected="selectedDrop(item._id)"
                @select="selectDropItem(item._id)"
                @getUserAddress="getEditUserAddress"
              />
            </VueSlickCarousel>
          </div>
        </div>
        <div v-else class="flex justify-center mt-8">
          <h1 class="text-2xl text-[#00000099]">
            No address found please
            <span
              class="text-[#0464CB] cursor-pointer"
              @click="
                {
                  openModal('step4'), closeModal('step5');
                }
              "
              >add-address</span
            >
          </h1>
        </div>
      </template>
    </Additional>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    service: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      settings: {
        speed: 500,
        slidesToShow: 3,
        dots: false,
        swipeToSlide: false,
        centerMode: true,
        centerPadding: "0px",
        arrows: true,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      userAddress: "service/getUserAddress",
      selectedServiceItems: "service/getSelectedServiceItems",
    }),
    selectedPickup() {
      return (id) => {
        return this.selectedServiceItems.selectedPickupItems?.includes(id);
      };
    },
    selectedDrop() {
      return (id) => {
        return this.selectedServiceItems.selectedDropItems?.includes(id);
      };
    },
  },
  methods: {
    ...mapActions({
      openModal: "service/openModal",
      closeModal: "service/closeModal",
      updateSelectedServiceItems: "service/updateSelectedServiceItems",
    }),
    selectPickupItem(id) {
      const selectedItems = this.selectedServiceItems.selectedPickupItems || [];

      let updatedItems;
      if (selectedItems?.includes(id)) {
        updatedItems = selectedItems.filter((selected) => selected !== id);
      } else {
        updatedItems = [...selectedItems, id];
      }
      this.updateSelectedServiceItems({
        key: "selectedPickupItems",
        item: updatedItems,
      });
    },
    selectDropItem(id) {
      const selectedItems = this.selectedServiceItems.selectedDropItems || [];

      let updatedItems;
      if (selectedItems?.includes(id)) {
        updatedItems = selectedItems.filter((selected) => selected !== id);
      } else {
        updatedItems = [...selectedItems, id];
      }
      this.updateSelectedServiceItems({
        key: "selectedDropItems",
        item: updatedItems,
      });
    },
    getEditUserAddress(id) {
      this.$emit("getEditUserAddress", id);
    },
    step4Next() {
      if (
        this.selectedServiceItems?.selectedPickupItems == "" ||
        this.selectedServiceItems?.selectedDropItems == ""
      ) {
        this.$toast.open({
          message: "Please select the field before submitting.",
          type: "error",
        });
        return;
      }
      let data = {
        selectedPickupItem: this.selectedServiceItems?.selectedPickupItems,
        selectedDropItem: this.selectedServiceItems?.selectedDropItems,
      };
      this.$emit("step4Next", data);
    },
  },
};
</script>
