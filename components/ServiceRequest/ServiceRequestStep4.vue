<template>
  <div>
    <Additional
      @click="step3Next"
      :isSkipButton="isSkipButton"
      @skip="$emit('skipUserAddress')"
    >
      <template #header>
        <div class="flex items-center gap-2 cursor-pointer">
          <span
            class="text-[12px] font-semibold text-[#000000]"
            @click="
              {
                openModal('step1'), closeModal('step4');
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
                openModal('step2'), closeModal('step4');
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
                openModal('step3'), closeModal('step4');
              }
            "
          >
            {{ service?.modeOfTransportation?.title }}
          </span>
          <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
          <span class="text-[12px] font-semibold text-[#000000]">
            Add Address
          </span>
        </div>
      </template>
      <template #content>
        <div class="mt-4 mb-4">
          <GoogleMap @updateAddress="setAddress" />
        </div>
        <div class="grid grid-cols-2 mt-7">
          <div class="flex flex-col gap-y-2">
            <h1 class="text-[#00000099] text-base font-normal">
              ADDRESS DETAILS
            </h1>
            <div class="mt-1">
              <label
                for="companyName"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Building Name</label
              >
              <input
                type="text"
                :class="
                  errors?.buildinName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                name="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your Building Name"
                v-model="addressDetails.buildinName"
              />
              <span v-if="errors?.buildinName" class="error-msg">{{
                errors?.buildinName
              }}</span>
            </div>
            <div>
              <label
                for="companyName"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Postal Code</label
              >
              <input
                type="text"
                :class="
                  errors?.postalCode
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                name="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your Postal Code"
                v-model="addressDetails.postalCode"
                @input="validatePostalCodeInput"
              />
              <span v-if="errors.postalCode" class="error-msg">{{
                errors.postalCode
              }}</span>
            </div>
            <div>
              <label
                for="companyName"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Lane Number</label
              >
              <input
                type="text"
                :class="
                  errors?.laneNumber
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                name="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your Lane Number"
                v-model="addressDetails.laneNumber"
                @input="validateLaneNumberInput"
              />
              <span v-if="errors.laneNumber" class="error-msg">{{
                errors.laneNumber
              }}</span>
            </div>
            <div>
              <label
                for="companyName"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Additional Details</label
              >
              <input
                type="text"
                name="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] border border-gray-300"
                placeholder="Your Additional Details"
                v-model="addressDetails.additionalDetails"
              />
            </div>
          </div>
          <div class="flex flex-col gap-y-2">
            <h1 class="text-[#00000099] text-base font-normal">
              CONTACT DETAILS
            </h1>

            <div class="mt-1">
              <label
                for="ContactName"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Contact name</label
              >
              <input
                type="text"
                :class="
                  errors?.contactName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                name="ContactName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your Contact name"
                v-model="contactDetails.contactName"
              />
              <span v-if="errors.contactName" class="error-msg">{{
                errors.contactName
              }}</span>
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Contact Email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                :class="
                  errors?.contactEmail
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="Your Contact Email"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                v-model="contactDetails.contactEmail"
              />
              <span v-if="errors.contactEmail" class="error-msg">{{
                errors.contactEmail
              }}</span>
            </div>

            <div>
              <label
                for="ContactNo"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Contact No.</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer flex-col">
                <div class="flex justify-between">
                  <CountryDropdown
                    :items="countries"
                    :selectedLabel="contactDetails.countryCode"
                    @getValue="getCountry"
                    class="absolute mb-3 mr-4"
                  />
                  <div
                    class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                  ></div>
                  <input
                    type="text"
                    name="ContactNo"
                    id="ContactNo"
                    :class="
                      errors?.contactNumber
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    placeholder="Your Contact No."
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                    v-model="contactDetails.contactNumber"
                    @input="validateContactInput"
                  />
                </div>
                <span v-if="errors.contactNumber" class="error-msg">{{
                  errors.contactNumber
                }}</span>
              </label>
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
    isSkipButton: {
      type: Boolean,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    service: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      countries: [
        {
          key: 1,
          value: 1,
        },
        {
          key: 52,
          value: 52,
        },
      ],
      addressDetails: {
        buildinName: "",
        postalCode: "",
        laneNumber: "",
        additionalDetails: "",
        lat: "",
        long: "",
      },
      contactDetails: {
        contactName: "",
        contactEmail: "",
        contactNumber: "",
        countryCode: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      openModal: "service/openModal",
      closeModal: "service/closeModal",
    }),
    setAddress({ address, postalCode, lat, long }) {
      this.addressDetails.buildinName = address;
      this.addressDetails.postalCode = postalCode;
      this.addressDetails.lat = lat;
      this.addressDetails.long = long;
    },
    getCountry(item) {
      this.contactDetails.countryCode = item.value;
    },
    async validateContactInput(event) {
      this.contactDetails.contactNumber = await this.$validateNumber(
        event.target.value
      );
    },
    async validatePostalCodeInput(event) {
      this.addressDetails.postalCode = await this.$validateAddressDetail(
        event.target.value
      );
    },
    async validateLaneNumberInput(event) {
      this.addressDetails.laneNumber = await this.$validateAddressDetail(
        event.target.value
      );
    },
    step3Next() {
      let data = {
        addressDetails: this.addressDetails,
        contactDetails: this.contactDetails,
      };
      this.$emit("step3Next", data);
    },
  },
};
</script>
