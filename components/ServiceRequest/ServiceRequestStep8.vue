<template>
  <div>
    <Additional @click="editUserAddress" :isButtonLoader="isButtonLoader">
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
          <GoogleMap
            v-if="placesService != null"
            @updateAddress="setAddress"
            :addressDetails="
              addressSearch == true ? formData?.addressDetails : null
            "
          />
        </div>
        <div class="py-3">
          <span class="text-[16px] font-medium text-[#0060c9] mt-3 mb-3"
            >Please select a valid google address from the drop down menu and/or
            move the pin in the map section to properly select the desired
            location</span
          >
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
                autocomplete="off"
                id="searchAddress"
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
                @input="updateBuildingName"
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
                for="Special Instructions"
                class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                >Special Instructions (i.e. Docks 20-25)</label
              >
              <input
                type="text"
                name="SpecialInstructions"
                :class="
                  errors?.laneNumber
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="i.e. Docks 20-25"
                v-model="formData.addressDetails.laneNumber"
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
    isButtonLoader: {
      type: Boolean,
      default: false,
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
      addressSearch: false,
      addressInputRef: null,
      placesService: null,
      autocomplete: "",
    };
  },
  methods: {
    ...mapActions({
      openModal: "service/openModal",
      closeModal: "service/closeModal",
    }),
    updateBuildingName() {
      this.formData.addressDetails.lat = "";
      this.formData.addressDetails.long = "";
    },
    async loadGoogleMaps() {
      if (this.placesService != null) return; // Prevent loading if already loaded

      try {
        const google = await this.$loadGoogleMaps(); // Load Google Maps dynamically

        const displayElement = document.createElement("div");
        this.placesService = new google.maps.places.PlacesService(
          displayElement
        );
      } catch (error) {
        console.error("Google Maps API failed to load:", error);
      }
    },
    async initAutocomplete() {
      this.$nextTick(async () => {
        const inputElement = document.getElementById("searchAddress");
        if (inputElement instanceof HTMLInputElement) {
          this.autocomplete = new google.maps.places.Autocomplete(
            inputElement,
            { types: ["geocode"] }
          );
          this.autocomplete.setFields([
            "address_component",
            "formatted_address",
            "geometry",
          ]);
          this.autocomplete.setComponentRestrictions({
            country: ["ca", "mx", "us"],
          });
          this.autocomplete.addListener("place_changed", this.selectAddress);
        }
      });
    },
    async selectAddress() {
      const place = this.autocomplete.getPlace();
      if (!place.address_components) return;

      this.formData.addressDetails.lat = place.geometry.location.lat(); // Get latitude
      this.formData.addressDetails.long = place.geometry.location.lng(); // Get longitude
      this.addressSearch = true;
    },
    async validateContactInput(event) {
      this.formData.contactDetails.contactNumber = await this.$validateNumber(
        event.target.value
      );
    },
    setAddress({ address, postalCode, lat, long }) {
      this.addressSearch = false;
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
  async mounted() {
    this.addressSearch = true;
    await this.loadGoogleMaps();
    await this.initAutocomplete();
  },
};
</script>
