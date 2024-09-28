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
              :selectedLabel="selectedUserReference.label"
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
              :selectedLabel="selectedPrograming"
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
              :selectedLabel="selectedQuantityChains"
              @getValue="getQuantityChainsValue"
              :errors="errors?.quantitySelectedLabel"
            />
            <span class="error-msg" v-if="errors?.quantitySelectedLabel">{{
              errors?.quantitySelectedLabel
            }}</span>
          </div>

          <div
            class="relative group cursor-pointer"
            v-if="selectedPrograming === 'Schedule'"
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
              :selectedLabel="selectedQuantityStraps"
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
            v-if="selectedPrograming === 'Schedule'"
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
                :selectedLabel="selectedQuantityTarps"
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
                :selectedLabel="selectedRestrictedValue"
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
import { mapActions } from "vuex";
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
      specialRequirements: [
        "Hazmat",
        "Sanitary Inspections MX",
        "MX customs dispatch",
        "Straps",
        "US customs dispatch",
        "Tarps",
        "Sanitary Inspections US",
        "Chains",
        "Overweight/Overdimensions",
      ],
      selectedSpecialRequirements: [],
      selectedUserReference: { label: "Select option" },
      selectedPrograming: "Select option",
      selectedQuantityChains: "Select option",
      selectedQuantityStraps: "Select option",
      selectedQuantityTarps: "Select option",
      selectedRestrictedValue: "Select option",
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
    formatRef() {
      console.log("-=-", this.userReference);
      return this.userReference.map((user) => {
        return {
          key: user._id,
          label: user?.contactName,
        };
      });
    },
  },
  methods: {
    ...mapActions({
      openModal: "service/openModal",
      closeModal: "service/closeModal",
      fetchServiceReference: "service/fetchServiceReference",
    }),
    isRequirementSelected(label) {
      return this.selectedSpecialRequirements?.includes(label);
    },
    toggleLabel(item) {
      if (this.selectedSpecialRequirements.includes(item)) {
        this.selectedSpecialRequirements =
          this.selectedSpecialRequirements.filter(
            (selected) => selected !== item
          );
      } else {
        this.selectedSpecialRequirements.push(item);
      }
    },
    getRestrictedValue(item) {
      this.selectedRestrictedValue =
        item.label != "Select option" ? item.label : "";
    },
    getQuantityTarpsValue(item) {
      this.selectedQuantityTarps = item.label;
    },
    getQuantityChainsValue(item) {
      this.selectedQuantityChains = item.label;
    },
    getQuantityStrapsValue(item) {
      this.selectedQuantityStraps = item.label;
    },
    getProgramingValue(item) {
      this.selectedPrograming = item.label;
    },
    getUserReferenceValue(item) {
      this.selectedUserReference = item;
    },
    async getUserRererence() {
      try {
        const res = await this.fetchServiceReference();
        console.log("-=res.data-", res.data);

        this.userReference = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    step2Next() {
      let data = {
        selectedUserReference: this.selectedUserReference,
        selectedQuantityChains:
          this.selectedQuantityChains != "Select option"
            ? this.selectedQuantityChains
            : "",

        selectedQuantityStraps:
          this.selectedQuantityStraps != "Select option"
            ? this.selectedQuantityStraps
            : "",

        selectedQuantityTarps:
          this.selectedQuantityTarps != "Select option"
            ? this.selectedQuantityTarps
            : "",

        selectedRestrictedValue:
          this.selectedRestrictedValue != "Select option"
            ? this.selectedRestrictedValue
            : "",

        selectedPrograming:
          this.selectedPrograming != "Select option"
            ? this.selectedPrograming
            : "",

        selectedSpecialRequirements: this.selectedSpecialRequirements,
        schedule: this.schedule,
      };
      this.$emit("step2Next", data);
    },
  },
  async mounted() {
    await this.getUserRererence();
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
