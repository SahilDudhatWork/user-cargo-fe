<template>
  <div>
    <Additional @click="editUserAddress">
      <template #header>
        <div class="flex items-center gap-2 cursor-pointer">
          <span
            class="text-[12px] font-semibold text-[#000000]"
            @click="
              {
                openModal('step1'), closeModal('step6');
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
                openModal('step2'), closeModal('step8');
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
                openModal('step3'), closeModal('step8');
              }
            "
          >
            {{ service?.modeOfTransportation?.title }}
          </span>
          <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
          <span class="text-[12px] font-semibold text-[#000000]">
            Edit Address
          </span>
        </div>
      </template>
      <template #content>
        <div class="mt-4 mb-4">
          <GoogleMap @updateAddress="setAddress" />
        </div>
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-7">
          <div class="flex flex-col gap-y-2">
            <h1 class="text-[#00000099] text-base font-normal">
              ADDRESS DETAILS
            </h1>
            <div class="mt-1">
              <label
                for="Building Name"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Building Name</label
              >
              <input
                type="text"
                name="CompanyName"
                :class="
                  errors?.buildinName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your Building Name"
                v-model="formData.addressDetails.buildinName"
              />
              <span v-if="errors.buildinName" class="error-msg">{{
                errors.buildinName
              }}</span>
            </div>
            <div>
              <label
                for="Postal Code"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Postal Code</label
              >
              <input
                type="text"
                name="CompanyName"
                :class="
                  errors?.postalCode
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your Postal Code"
                v-model="formData.addressDetails.postalCode"
                @input="validatePostalCodeInput"
              />
              <span v-if="errors.postalCode" class="error-msg">{{
                errors.postalCode
              }}</span>
            </div>
            <div>
              <label
                for="Lane Number"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Lane Number</label
              >
              <input
                type="text"
                name="CompanyName"
                :class="
                  errors?.laneNumber
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your Lane Number"
                v-model="formData.addressDetails.laneNumber"
                @input="validateLaneNumberInput"
              />
              <span v-if="errors.laneNumber" class="error-msg">{{
                errors.laneNumber
              }}</span>
            </div>
            <div>
              <label
                for="Additional Details"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Additional Details</label
              >
              <input
                type="text"
                name="CompanyName"
                :class="
                  errors?.additionalDetails
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your Additional Details"
                v-model="formData.addressDetails.additionalDetails"
              />
              <span v-if="errors.additionalDetails" class="error-msg">{{
                errors.additionalDetails
              }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-y-2">
            <h1 class="text-[#00000099] text-base font-normal">
              CONTACT DETAILS
            </h1>

            <div class="mt-1">
              <label
                for="Contact name"
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
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your Contact name"
                v-model="formData.contactDetails.contactName"
              />
              <span v-if="errors.contactName" class="error-msg">{{
                errors.contactName
              }}</span>
            </div>
            <div>
              <label
                for="Contact Email"
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
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                v-model="formData.contactDetails.contactEmail"
              />
              <span v-if="errors.contactEmail" class="error-msg">{{
                errors.contactEmail
              }}</span>
            </div>

            <div>
              <label
                for="Contact No"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Contact No.</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer flex-col">
                <div class="flex justify-between">
                  <CountryDropdown
                    :items="countries"
                    :selectedLabel="formData?.contactDetails?.countryCode"
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
                    class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                    v-model="formData.contactDetails.contactNumber"
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
    formData: {
      type: Object,
      required: true,
      default: null,
    },
    errors: {
      type: Object,
      required: true,
      default: null,
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
    };
  },
  methods: {
    ...mapActions({
      openModal: "service/openModal",
      closeModal: "service/closeModal",
    }),
    async validateContactInput(event) {
      this.formData.contactDetails.contactNumber = await this.$validateNumber(
        event.target.value
      );
    },
    setAddress({ address, postalCode, lat, long }) {
      this.formData.addressDetails.buildinName = address;
      this.formData.addressDetails.postalCode = postalCode;
      this.formData.addressDetails.lat = lat;
      this.formData.addressDetails.long = long;
    },
    async validatePostalCodeInput(event) {
      this.formData.addressDetails.postalCode =
        await this.$validateAddressDetail(event.target.value);
    },
    async validateLaneNumberInput(event) {
      this.formData.addressDetails.laneNumber =
        await this.$validateAddressDetail(event.target.value);
    },
    editUserAddress() {
      this.$emit("editUserAddress");
    },
    getCountry(item) {
      this.formData.contactDetails.countryCode = item.value;
    },
  },
};
</script>
