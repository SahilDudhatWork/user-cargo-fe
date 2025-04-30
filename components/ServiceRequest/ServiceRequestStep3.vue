<template>
  <div>
    <Additional @click="step2Next" :isButtonLoader="isButtonLoader">
      <template #header>
        <div class="flex items-center gap-2 cursor-pointer">
          <span
            class="text-[12px] font-semibold text-[#000000]"
            @click="
              {
                openModal('step1'), closeModal('step3');
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
                openModal('step2'), closeModal('step3');
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
                openModal('step2'), closeModal('step3');
              }
            "
          >
            {{ service?.modeOfTransportation?.title }}
          </span>
        </div>
      </template>
      <template #content>
        <div
          class="mt-5 grid sm:grid-cols-2 grid-cols-1 xl:gap-y-3.5 xl:gap-0 gap-4"
        >
          <div>
            <label
              for="User Reference"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >User Reference</label
            >
            <input
              type="text"
              placeholder="User Reference"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] focus:outline-none"
              @input="validateUserReference"
              maxlength="10"
              v-model="userReference"
              :class="
                errors?.userReference
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors?.userReference">{{
              errors?.userReference
            }}</span>
          </div>
          <div>
            <label
              for="Trailer"
              class="block mb-2 text-sm font-normal text-[#4B4B4B]"
              >Trailer</label
            >
            <input
              type="text"
              placeholder="Trailer"
              class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] focus:outline-none"
              @input="validateTrailer"
              maxlength="10"
              v-model="trailer"
              :class="
                errors?.trailer
                  ? 'border border-red-600'
                  : 'border border-gray-300'
              "
            />
            <span class="error-msg" v-if="errors?.trailer">{{
              errors?.trailer
            }}</span>
          </div>

          <div>
            <label
              for="email"
              class="block mb-1 text-sm font-medium text-[#1B1B1B]"
              >Select Programming</label
            >
            <AdditionalDropdown
              :items="programingList"
              :selectedLabel="selectedServiceItems?.selectedPrograming"
              @getValue="getProgramingValue"
              :errors="errors?.programeSelectedLabel"
            />
            <span class="error-msg" v-if="errors?.programeSelectedLabel">{{
              errors?.programeSelectedLabel
            }}</span>
          </div>
          <div v-if="selectedSpecialRequirementType.includes('Chains')">
            <label
              for="email"
              class="block mb-1 text-sm font-medium text-[#1B1B1B]"
              >Quantity For Chains</label
            >
            <AdditionalDropdown
              :items="quantityChains"
              :selectedLabel="selectedServiceItems?.selectedQuantityChains"
              @getValue="getQuantityChainsValue"
              :errors="errors?.quantitySelectedLabel"
            />
            <span class="error-msg" v-if="errors?.quantitySelectedLabel">{{
              errors?.quantitySelectedLabel
            }}</span>
          </div>

          <div v-if="selectedServiceItems?.selectedPrograming === 'Schedule'">
            <label
              for="date"
              class="block mb-1 text-sm font-normal text-[#4B4B4B]"
              >Date</label
            >
            <div class="relative group cursor-pointer datepicker-container">
              <img
                src="@/static/svg/datepicker.svg"
                alt=""
                class="absolute z-50 top-4 left-2.5"
              />
              <DatePicker
                v-model="schedule.date"
                placeholder="Select date"
                :lang="lang"
                :format="customFormat"
                @change="updateSchedule"
              />
            </div>
          </div>
          <div v-if="selectedSpecialRequirementType.includes('Straps')">
            <label
              for="email"
              class="block mb-1 text-sm font-medium text-[#1B1B1B]"
              >Quantity For Straps</label
            >
            <AdditionalDropdown
              :items="quantityStraps"
              :selectedLabel="selectedServiceItems?.selectedQuantityStraps"
              @getValue="getQuantityStrapsValue"
              :errors="errors?.quantityStrapsSelectedLabel"
            />
            <span
              class="error-msg"
              v-if="errors?.quantityStrapsSelectedLabel"
              >{{ errors?.quantityStrapsSelectedLabel }}</span
            >
          </div>
          <div v-if="selectedServiceItems?.selectedPrograming === 'Schedule'">
            <label
              for="time"
              class="block mb-1 text-sm font-normal text-[#4B4B4B]"
              >Time</label
            >
            <div class="group relative cursor-pointer">
              <img
                src="@/static/svg/time.svg"
                alt=""
                class="absolute z-50 top-4 left-2.5"
              />
              <date-picker
                v-model="schedule.time"
                value-type="format"
                type="time"
                placeholder="Select time"
                @change="updateSchedule"
              ></date-picker>
            </div>
          </div>
        </div>
        <div class="mt-4 grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div
            class="flex flex-col"
            v-if="selectedSpecialRequirementType.includes('Tarps')"
          >
            <label
              for="email"
              class="block mb-1 text-sm font-medium text-[#1B1B1B]"
              >Quantity For Tarps</label
            >
            <AdditionalDropdown
              :items="quantityTarps"
              :selectedLabel="selectedServiceItems?.selectedQuantityTarps"
              @getValue="getQuantityTarpsValue"
              :errors="errors?.quantityTarpsSelectedLabel"
            />
            <span class="error-msg" v-if="errors?.quantityTarpsSelectedLabel">{{
              errors?.quantityTarpsSelectedLabel
            }}</span>
          </div>
          <div
            v-if="
              selectedServiceItems.selectedServiceItem.title !=
                'Local Drayage US' &&
              selectedServiceItems.selectedServiceItem.title !=
                'Local Drayage MX'
            "
          >
            <div class="mt-4">
              <div>
                <p class="text-sm font-medium text-[#1B1B1B]">
                  Special Requirements
                </p>
                <p class="text-[13px] font-medium text-gray-400 mt-1">
                  You can select multiple options
                </p>
              </div>
            </div>
            <div>
              <div class="mt-4 flex flex-wrap gap-x-3 gap-y-[2px]">
                <AdditionalLabel
                  v-for="(label, index) in specialRequirements"
                  :key="index"
                  :label="label"
                  :isSelected="isRequirementSelected(label)"
                  @select="toggleLabel"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Additional>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    errors: {
      type: Object,
      required: true,
    },
    service: {
      type: Object,
      required: true,
      default: null,
    },
    isButtonLoader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userReference: null,
      trailer: null,
      specialRequirements: [],
      programingList: [
        {
          label: "Schedule",
        },
        {
          label: "Instant",
        },
      ],
      schedule: {
        date: "",
        time: "",
      },
      customFormat: "DD MMM, dddd",
      lang: {
        days: ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      quantityChains: [
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "7" },
        { label: "8" },
        { label: "9" },
        { label: "10" },
      ],
      quantityTarps: [
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "7" },
        { label: "8" },
        { label: "9" },
        { label: "10" },
      ],
      quantityStraps: [
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "7" },
        { label: "8" },
        { label: "9" },
        { label: "10" },
      ],
    };
  },
  watch: {
    userReference(value) {
      this.updateSelectedServiceItems({ key: "userReference", item: value });
    },
    trailer(value) {
      this.updateSelectedServiceItems({ key: "trailer", item: value });
    },
  },
  computed: {
    ...mapGetters({
      selectedServiceItems: "service/getSelectedServiceItems",
    }),
    isRequirementSelected() {
      return (label) => {
        return this.selectedServiceItems.selectedSpecialRequirementItems?.some(
          (selected) => selected.type === label.type,
        );
      };
    },
    selectedSpecialRequirementType() {
      return this.selectedServiceItems.selectedSpecialRequirementItems.map(
        (item) => item.type,
      );
    },
  },
  methods: {
    ...mapActions({
      openModal: "service/openModal",
      closeModal: "service/closeModal",
      fetchPostBridge: "service/fetchPostBridge",
      fetchServiceReference: "service/fetchServiceReference",
      updateSelectedServiceItems: "service/updateSelectedServiceItems",
    }),
    validateUserReference(event) {
      // Remove any non-alphanumeric characters
      const sanitizedValue = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
      // Update the model with the sanitized value
      this.userReference = sanitizedValue;
    },
    validateTrailer(event) {
      const sanitizedValue = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
      this.trailer = sanitizedValue;
    },
    toggleLabel(item) {
      const selectedItems =
        this.selectedServiceItems.selectedSpecialRequirementItems || [];

      let updatedItems;
      if (selectedItems.some((selected) => selected.type === item.type)) {
        updatedItems = selectedItems.filter(
          (selected) => selected.type !== item.type,
        );
      } else {
        updatedItems = [...selectedItems, item];
      }
      const isValid = updatedItems.every((updatedItem) =>
        this.specialRequirements.some(
          (requirement) => requirement.type === updatedItem.type,
        ),
      );

      if (isValid) {
        this.updateSelectedServiceItems({
          key: "selectedSpecialRequirementItems",
          item: updatedItems,
        });
      } else {
        this.updateSelectedServiceItems({
          key: "selectedSpecialRequirementItems",
          item: [],
        });
      }
    },
    getQuantityTarpsValue(item) {
      this.updateSelectedServiceItems({
        key: "selectedQuantityTarps",
        item: item.label,
      });
    },
    getQuantityChainsValue(item) {
      this.updateSelectedServiceItems({
        key: "selectedQuantityChains",
        item: item.label,
      });
    },
    getQuantityStrapsValue(item) {
      this.updateSelectedServiceItems({
        key: "selectedQuantityStraps",
        item: item.label,
      });
    },
    getProgramingValue(item) {
      this.updateSelectedServiceItems({
        key: "selectedPrograming",
        item: item.label,
      });
    },
    updateSchedule() {
      const scheduleItem = {
        date: this.schedule.date || "",
        time: this.schedule.time || "",
      };
      this.updateSelectedServiceItems({
        key: "schedule",
        item: scheduleItem,
      });
    },
    step2Next() {
      let data = {
        userReference: this.userReference,
        trailer: this.trailer,
        ...(this.selectedSpecialRequirementType.includes("Chains") && {
          selectedQuantityChains:
            this.selectedServiceItems?.selectedQuantityChains != "Select option"
              ? this.selectedServiceItems?.selectedQuantityChains
              : "",
        }),

        ...(this.selectedSpecialRequirementType.includes("Straps") && {
          selectedQuantityStraps:
            this.selectedServiceItems?.selectedQuantityStraps != "Select option"
              ? this.selectedServiceItems?.selectedQuantityStraps
              : "",
        }),

        ...(this.selectedSpecialRequirementType.includes("Tarps") && {
          selectedQuantityTarps:
            this.selectedServiceItems?.selectedQuantityTarps != "Select option"
              ? this.selectedServiceItems?.selectedQuantityTarps
              : "",
        }),

        selectedPrograming:
          this.selectedServiceItems?.selectedPrograming != "Select option"
            ? this.selectedServiceItems?.selectedPrograming
            : "",

        selectedSpecialRequirements:
          this.selectedServiceItems.selectedSpecialRequirementItems,
        schedule: this.schedule,
      };

      this.$emit("step2Next", data);
    },
    async getPostBridge() {
      try {
        const postBridgeId = this.selectedServiceItems?.selectedPortItem?._id;
        const transportationId = this.selectedServiceItems?.selectedModeItem?._id;
        const res = await this.fetchPostBridge({
          portBridgeId: postBridgeId,
          transportationId: transportationId,
        });
        this.specialRequirements = res?.data?.requirements;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
  async beforeMount() {
    if (
      this.selectedServiceItems.selectedServiceItem.title !=
        "Local Drayage US" &&
      this.selectedServiceItems.selectedServiceItem.title != "Local Drayage MX"
    ) {
      await this.getPostBridge();
    }
    this.userReference = this.selectedServiceItems.userReference || null;
    this.trailer = this.selectedServiceItems.trailer || null;
    if (this.selectedServiceItems?.schedule) {
      this.schedule.date = this.selectedServiceItems?.schedule?.date;
      this.schedule.time = this.selectedServiceItems?.schedule?.time;
    }
  },
};
</script>
<style scoped>
@media (min-width: 1440px) {
  .mx-datepicker {
    width: 382px !important;
  }
}
@media (max-width: 1025px) and (min-width: 768px) {
  .mx-datepicker {
    width: 432px !important;
  }
}
@media (max-width: 768px) and (min-width: 426px) {
  .mx-datepicker {
    width: 304px !important;
  }
}
@media (max-width: 425px) and (min-width: 376px) {
  .mx-datepicker {
    width: 361px !important;
  }
}
@media (max-width: 375px) and (min-width: 321px) {
  .mx-datepicker {
    width: 311px !important;
  }
}
@media (max-width: 320px) {
  .mx-datepicker {
    width: auto !important;
  }
}
</style>
