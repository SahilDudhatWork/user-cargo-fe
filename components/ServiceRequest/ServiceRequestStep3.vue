<template>
  <div>
    <Additional @click="step2Next">
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
            {{ typeOfTransportationLabel }}
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
            {{ modeOfTransportationLabel }}
          </span>
        </div>
      </template>
      <template #content>
        <div class="mt-5 grid grid-cols-2 gap-y-3.5">
          <div>
            <label
              for="email"
              class="block mb-1 text-sm font-medium text-[#1B1B1B]"
              >User Reference</label
            >
            <AdditionalDropdown
              :items="formatRef"
              :selectedLabel="selectedServiceItems.selectedUserReference.label"
              @getValue="getUserReferenceValue"
              :errors="errors?.userReferenceSelectedLabel"
            />
            <span class="error-msg" v-if="errors?.userReferenceSelectedLabel">{{
              errors?.userReferenceSelectedLabel
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
          <div>
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

          <div
            class="relative group cursor-pointer"
            v-if="selectedServiceItems?.selectedPrograming === 'Schedule'"
          >
            <img
              src="@/static/svg/down-arrow.svg"
              alt=""
              class="absolute right-[12.5rem] top-6 z-50 group-hover:hidden"
            />
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
          <div>
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
          <div
            class="group relative cursor-pointer"
            v-if="selectedServiceItems?.selectedPrograming === 'Schedule'"
          >
            <img
              src="@/static/svg/down-arrow.svg"
              alt=""
              class="absolute right-[12.5rem] top-6 z-50 group-hover:hidden"
            />
            <img
              src="@/static/svg/time.svg"
              alt=""
              class="absolute z-50 top-4 left-2.5"
            />
            <date-picker
              v-model="schedule.time"
              value-type="format"
              type="time"
              placeholder="HH:mm:ss"
              @change="updateSchedule"
            ></date-picker>
          </div>
        </div>
        <div class="mt-4 gap-[11.5rem] flex">
          <div class="flex flex-col gap-y-3.5">
            <div>
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
              <span
                class="error-msg"
                v-if="errors?.quantityTarpsSelectedLabel"
                >{{ errors?.quantityTarpsSelectedLabel }}</span
              >
            </div>
            <div>
              <label
                for="email"
                class="block mb-1 text-sm font-medium text-[#1B1B1B]"
                >Restricted Time</label
              >
              <AdditionalDropdown
                :items="restrictedTime"
                :selectedLabel="selectedServiceItems?.selectedRestrictedValue"
                @getValue="getRestrictedValue"
                :errors="errors?.restricltedSelectedLabel"
              />
              <span class="error-msg" v-if="errors?.restricltedSelectedLabel">{{
                errors?.restricltedSelectedLabel
              }}</span>
            </div>
          </div>
          <div>
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
            <div class="grid grid-cols-2">
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
    modeOfTransportationLabel: {
      type: String,
      required: true,
      default: "",
    },
    typeOfTransportationLabel: {
      type: String,
      required: true,
      default: "",
    },
    errors: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userReference: [],
      restrictedTime: [
        {
          label: "Yes",
        },
        {
          label: "No",
        },
      ],
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
  computed: {
    ...mapGetters({
      selectedServiceItems: "service/getSelectedServiceItems",
    }),
    formatRef() {
      return this.userReference.map((user) => {
        return {
          key: user._id,
          label: user?.contactName,
        };
      });
    },
    isRequirementSelected() {
      return (label) => {
        return this.selectedServiceItems.selectedSpecialRequirementItems?.some(
          (selected) => selected.type === label.type
        );
      };
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
    toggleLabel(item) {
      const selectedItems =
        this.selectedServiceItems.selectedSpecialRequirementItems || [];

      let updatedItems;
      if (selectedItems.some((selected) => selected.type === item.type)) {
        updatedItems = selectedItems.filter(
          (selected) => selected !== item.type
        );
      } else {
        updatedItems = [...selectedItems, item];
      }
      const isValid = updatedItems.every((updatedItem) =>
        this.specialRequirements.some(
          (requirement) => requirement.type === updatedItem.type
        )
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
    getRestrictedValue(item) {
      this.updateSelectedServiceItems({
        key: "selectedRestrictedValue",
        item: item.label,
      });
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
    getUserReferenceValue(item) {
      this.updateSelectedServiceItems({
        key: "selectedUserReference",
        item: item,
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
    async getUserRererence() {
      try {
        const res = await this.fetchServiceReference();
        this.userReference = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    step2Next() {
      let data = {
        selectedUserReference: this.selectedServiceItems?.selectedUserReference,
        selectedQuantityChains:
          this.selectedServiceItems?.selectedQuantityChains != "Select option"
            ? this.selectedServiceItems?.selectedQuantityChains
            : "",

        selectedQuantityStraps:
          this.selectedServiceItems?.selectedQuantityStraps != "Select option"
            ? this.selectedServiceItems?.selectedQuantityStraps
            : "",

        selectedQuantityTarps:
          this.selectedServiceItems?.selectedQuantityTarps != "Select option"
            ? this.selectedServiceItems?.selectedQuantityTarps
            : "",

        selectedRestrictedValue:
          this.selectedServiceItems?.selectedRestrictedValue != "Select option"
            ? this.selectedServiceItems?.selectedRestrictedValue
            : "",

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
        const res = await this.fetchPostBridge({
          id: postBridgeId,
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
  async mounted() {
    await this.getUserRererence();
  },
  async beforeMount() {
    await this.getPostBridge();
    if (this.selectedServiceItems) {
      this.schedule.date = this.selectedServiceItems.schedule.date;
      this.schedule.time = this.selectedServiceItems.schedule.time;
    }
  },
};
</script>
<style scoped>
.mx-datepicker {
  width: 382px !important;
}
.error-msg {
  font-size: 14px;
  font-weight: 400;
  color: red;
}
</style>
