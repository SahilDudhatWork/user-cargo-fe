<template>
  <div>
    <div>
      <div class="mt-5">
        <div class="relative">
          <img
            src="@/static/Images/profile-truck.webp"
            alt=""
            class="w-full relative lg:-top-[100px] sm:-top-[70px] -top-[50px] sm:h-auto h-[100px]"
          />
          <button
            type="button"
            class="flex items-center gap-1 bg-[#000000] absolute rounded-lg sm:left-40 left-4 px-[11px] py-1 opacity-65 sm:top-5 top-0"
            @click="prevPage"
          >
            <img src="@/static/svg/left-arrow.svg" alt="" class="" />
            <span class="text-white font-medium text-[15px] cursor-pointer">
              Go back
            </span>
          </button>
        </div>
        <div class="relative lg:-top-[7.5rem] sm:-top-[6rem] -top-[5rem]">
          <div
            :class="step1 ? ' border-b border-[#EEEEEE] pb-6 ' : ''"
            class="lg:mx-40 mx-6 relative flex justify-between items-center sm:flex-row flex-col"
          >
            <div
              class="flex sm:gap-10 items-center relative sm:flex-row flex-col"
            >
              <div>
                <div class="border-[12px] border-white rounded-full">
                  <img
                    v-if="profileURL"
                    :src="profileURL"
                    alt=""
                    class="w-[120px] h-[120px] object-cover rounded-full"
                  />
                  <img
                    v-else
                    src="@/static/Images/profile-circle-img.webp"
                    alt=""
                    class="w-[120px] h-[120px] object-cover rounded-full"
                  />

                  <label class="cursor-pointer">
                    <img
                      v-if="step2"
                      src="@/static/svg/profile-edit.svg"
                      alt=""
                      class="object-cover rounded-full bg-white absolute p-2 left-24 sm:!bottom-2 bottom-[100px]"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handleFileChange"
                    />
                  </label>
                </div>
              </div>
              <div class="mt-3">
                <h1 class="text-[#000000] font-bold text-lg">
                  {{ formData.contactName }}
                </h1>
                <p class="text-[#00000099] text-sm font-normal mt-3">
                  {{ formData.email }}
                </p>
                <p class="text-[#00000099] text-sm font-normal mt-1">
                  {{ formData.contactNumber }}
                </p>
              </div>
            </div>
            <div>
              <button
                @click="editProfile"
                v-if="step1"
                class="border border-[#0060C9] rounded-lg text-base font-semibold text-[#0060C9] px-4 py-2.5 sm:mt-0 mt-4"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div
            class="sm:mx-40 mx-6 mt-8 sm:grid-cols-2 grid-cols-1 grid"
            v-if="step1"
          >
            <div class="border-r border-[#EEEEEE]">
              <h1 class="text-[#000000] font-bold text-lg">Service Details</h1>
              <p class="text-[#00000099] font-normal text-sm mt-4">
                Account ID
              </p>
              <div class="grid grid-cols-2 mt-1">
                <p class="text-[#1E1E1E] font-medium text-base">
                  {{ formData.accountId }}
                </p>
              </div>
              <p class="text-[#00000099] font-normal text-sm mt-3">
                Account created on
              </p>
              <p class="text-[#1E1E1E] font-medium text-base mt-1">
                {{ AccountCreatedDate }}
              </p>
            </div>
            <div class="sm:px-7 sm:mt-0 mt-4">
              <h1 class="text-[#000000] font-bold text-lg">Company Details</h1>
              <p class="text-[#00000099] font-normal text-sm mt-4">
                Reference Info
              </p>
              <div v-if="userReference && userReference.length > 0">
                <div
                  class="flex gap-3 items-center"
                  v-for="(item, key) in userReference"
                  :key="key"
                >
                  <img
                    src="@/static/svg/star.svg"
                    alt=""
                    class="bg-[#F0F0F0] py-2.5 px-1.5 rounded-xl mt-3"
                  />
                  <div>
                    <p class="text-[#1E1E1E] font-medium text-base">
                      {{ item.companyName }}
                    </p>
                    <p class="text-[#00000099] font-normal text-sm text">
                      {{ item.contactName }}, {{ item.emailAddress }}, +{{
                        item.countryCode
                      }}
                      {{ item.contactNo }}
                    </p>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="text-[#000000] font-medium text-lg mt-2">
                  Company details not found
                </p>
              </div>
            </div>
          </div>
          <div class="xl:mx-40 mx-5" v-if="step2">
            <form class="space-y-4 md:space-y-6 mt-6">
              <div>
                <div
                  class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-12 gap-4 gap-y-2 border-b border-[#EEEEEE] py-2"
                >
                  <div>
                    <label
                      for="Name"
                      class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                      >Name *</label
                    >
                    <input
                      type="text"
                      name="ContactName"
                      id="ContactName"
                      placeholder="Your contact name"
                      :class="
                        errors.contactName
                          ? 'border border-red-600'
                          : 'border border-gray-300'
                      "
                      class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                      v-model="formData.contactName"
                    />
                    <span class="error-msg" v-if="errors.contactName">{{
                      errors.contactName
                    }}</span>
                  </div>
                  <div>
                    <label
                      for="Email address"
                      class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                      >Email address *</label
                    >
                    <input
                      type="email"
                      name="email"
                      id="email"
                      disabled
                      placeholder="Your Email Address"
                      class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                      v-model="formData.email"
                      :class="
                        errors.email
                          ? 'border border-red-600'
                          : 'border border-gray-300'
                      "
                    />
                    <span class="error-msg" v-if="errors.email">{{
                      errors.email
                    }}</span>
                  </div>
                  <div>
                    <label
                      for="Contact"
                      class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                      >Contact *
                    </label>
                    <label
                      class="xl:w-[382px] relative flex cursor-pointer flex-col"
                    >
                      <div class="flex justify-between">
                        <CountryDropdown
                          :items="countries"
                          :selectedLabel="formData?.countryCode"
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
                          placeholder="Your Contact No."
                          class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                          v-model="formData.contactNumber"
                          @input="validateContactInput"
                          :class="
                            errors.contactNumber
                              ? 'border border-red-600'
                              : 'border border-gray-300'
                          "
                        />
                      </div>
                      <span class="error-msg" v-if="errors.contactNumber">{{
                        errors.contactNumber
                      }}</span>
                    </label>
                  </div>
                </div>
                <h1 class="text-[#000000] font-bold text-lg mt-3">
                  Company Details
                </h1>
                <div
                  class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-12 gap-4 border-b border-[#EEEEEE] py-4"
                >
                  <div>
                    <label
                      for="Company name"
                      class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                      >Company name *</label
                    >
                    <input
                      type="text"
                      name="CompanyName"
                      id="CompanyName"
                      class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                      placeholder="Your company name"
                      v-model="formData.companyName"
                      :class="
                        errors.companyName
                          ? 'border border-red-600'
                          : 'border border-gray-300'
                      "
                    />
                    <span class="error-msg" v-if="errors.companyName">{{
                      errors.companyName
                    }}</span>
                  </div>
                  <div>
                    <label
                      for="companyFormation"
                      class="block mb-2 text-sm font-normal text-[#1E1E1E]"
                      >Company Formation</label
                    >
                    <Dropdown
                      :items="countriesList"
                      :selectedLabel="selectedLabel"
                      @getValue="getValue"
                      :isDisabled="isDropdownDisabled"
                    />
                  </div>
                  <div v-if="selectedLabel === 'USA'">
                    <inputFile
                      :errors="errors.w9_Form"
                      item-label="W9 Form"
                      :fileData="formData?.companyFormation?.usa?.w9_Form"
                      :file="
                        typeof formData?.companyFormation?.usa?.w9_Form ==
                        'object'
                          ? formData?.companyFormation?.usa?.w9_Form?.name
                          : formData?.companyFormation?.usa?.w9_Form
                      "
                      @handleFileChange="uploadW9Form"
                    />
                    <span class="error-msg" v-if="errors.w9_Form">{{
                      errors.w9_Form
                    }}</span>
                  </div>
                  <div v-if="selectedLabel === 'USA'">
                    <inputFile
                      :errors="errors.utility_Bill"
                      item-label="Utility Bill"
                      :fileData="formData?.companyFormation?.usa?.utility_Bill"
                      :file="
                        typeof formData?.companyFormation?.usa?.utility_Bill ==
                        'object'
                          ? formData?.companyFormation?.usa?.utility_Bill?.name
                          : formData?.companyFormation?.usa?.utility_Bill
                      "
                      @handleFileChange="uploadUtilityBill"
                    />
                    <span class="error-msg" v-if="errors.utility_Bill">{{
                      errors.utility_Bill
                    }}</span>
                  </div>
                  <div v-if="selectedLabel === 'MEXICO'">
                    <inputFile
                      :errors="errors.copia_Rfc_Form"
                      item-label="COPIA RFC Form"
                      :fileData="
                        formData?.companyFormation?.maxico?.copia_Rfc_Form
                      "
                      :file="
                        typeof formData?.companyFormation?.maxico
                          ?.copia_Rfc_Form == 'object'
                          ? formData?.companyFormation?.maxico?.copia_Rfc_Form
                              ?.name
                          : formData?.companyFormation?.maxico?.copia_Rfc_Form
                      "
                      @handleFileChange="uploadCopiaRfcForm"
                    />
                    <span class="error-msg" v-if="errors.copia_Rfc_Form">{{
                      errors.copia_Rfc_Form
                    }}</span>
                  </div>
                  <div v-if="selectedLabel === 'MEXICO'">
                    <inputFile
                      :errors="errors.constance_Of_Fiscal_Situation"
                      item-label="Constance of Fiscal Situation"
                      :fileData="
                        formData?.companyFormation?.maxico
                          ?.constance_Of_Fiscal_Situation
                      "
                      :file="
                        typeof formData?.companyFormation?.maxico
                          ?.constance_Of_Fiscal_Situation == 'object'
                          ? formData?.companyFormation?.maxico
                              ?.constance_Of_Fiscal_Situation?.name
                          : formData?.companyFormation?.maxico
                              ?.constance_Of_Fiscal_Situation
                      "
                      @handleFileChange="uploadConstanceOfFiscalSituation"
                    />
                    <span
                      class="error-msg"
                      v-if="errors.constance_Of_Fiscal_Situation"
                      >{{ errors.constance_Of_Fiscal_Situation }}</span
                    >
                  </div>
                  <div v-if="selectedLabel === 'MEXICO'">
                    <inputFile
                      item-label="Proof of Favorable"
                      :fileData="
                        formData?.companyFormation?.maxico?.proof_of_Favorable
                      "
                      :errors="errors.proof_of_Favorable"
                      :file="
                        typeof formData?.companyFormation?.maxico
                          ?.proof_of_Favorable == 'object'
                          ? formData?.companyFormation?.maxico
                              ?.proof_of_Favorable?.name
                          : formData?.companyFormation?.maxico
                              ?.proof_of_Favorable
                      "
                      @handleFileChange="uploadProofOfFavorable"
                    />
                    <span class="error-msg" v-if="errors.proof_of_Favorable">{{
                      errors.proof_of_Favorable
                    }}</span>
                  </div>
                  <div v-if="selectedLabel === 'MEXICO'">
                    <inputFile
                      :errors="errors.proof_Of_Address"
                      :fileData="
                        formData?.companyFormation?.maxico?.proof_Of_Address
                      "
                      item-label="Proof of Address"
                      :file="
                        typeof formData?.companyFormation?.maxico
                          ?.proof_Of_Address == 'object'
                          ? formData?.companyFormation?.maxico?.proof_Of_Address
                              ?.name
                          : formData?.companyFormation?.maxico?.proof_Of_Address
                      "
                      @handleFileChange="uploadProofOfAddress"
                    />
                    <span class="error-msg" v-if="errors.proof_Of_Address">{{
                      errors.proof_Of_Address
                    }}</span>
                  </div>
                </div>

                <div
                  v-if="selectedLabel != 'Select option'"
                  :class="key === 0 ? 'border-b border-[#EEEEEE] py-4' : ''"
                  v-for="(reference, key) in formData.commercialReference"
                  :key="key"
                >
                  <h1 class="text-[#000000] font-bold text-lg mt-3">
                    Commercial Reference {{ key + 1 }}
                  </h1>
                  <div
                    class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-12 gap-4 gap-y-2 mt-4"
                  >
                    <div>
                      <label
                        for="Company name"
                        class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                        >Company name</label
                      >
                      <input
                        :class="
                          errors[`commercialReference[${key}].companyName`]
                            ? 'border border-red-600'
                            : 'border border-gray-300'
                        "
                        type="text"
                        name="CompanyName"
                        id="CompanyName"
                        class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                        placeholder="Your company name"
                        v-model="reference.companyName"
                      />
                      <span
                        class="error-msg"
                        v-if="errors[`commercialReference[${key}].companyName`]"
                      >
                        {{ errors[`commercialReference[${key}].companyName`] }}
                      </span>
                    </div>
                    <div>
                      <label
                        for="Contact name"
                        class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                        >Contact name</label
                      >
                      <input
                        type="text"
                        :class="
                          errors[`commercialReference[${key}].contactName`]
                            ? 'border border-red-600'
                            : 'border border-gray-300'
                        "
                        name="ContactName"
                        id="ContactName"
                        placeholder="Your contact name"
                        class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                        v-model="reference.contactName"
                      />
                      <span
                        class="error-msg"
                        v-if="errors[`commercialReference[${key}].contactName`]"
                      >
                        {{ errors[`commercialReference[${key}].contactName`] }}
                      </span>
                    </div>
                    <div>
                      <label
                        for="Email Address"
                        class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                        >Email Address</label
                      >
                      <input
                        type="email"
                        :class="
                          errors[`commercialReference[${key}].emailAddress`]
                            ? 'border border-red-600'
                            : 'border border-gray-300'
                        "
                        name="email"
                        id="email"
                        placeholder="Your Email Address"
                        class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                        v-model="reference.emailAddress"
                      />
                      <span
                        class="error-msg"
                        v-if="
                          errors[`commercialReference[${key}].emailAddress`]
                        "
                      >
                        {{ errors[`commercialReference[${key}].emailAddress`] }}
                      </span>
                    </div>
                    <div>
                      <label
                        for="Contact No"
                        class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                        >Contact No.</label
                      >
                      <label
                        class="xl:w-[382px] relative flex cursor-pointer flex-col"
                      >
                        <div class="flex justify-between">
                          <CountryDropdown
                            :items="countries"
                            :selectedLabel="reference?.countryCode"
                            @getValue="
                              (value) => getReferenceCountry(value, reference)
                            "
                            class="absolute mb-3 mr-4"
                          />
                          <div
                            class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                          ></div>
                          <input
                            :class="
                              errors[`commercialReference[${key}].contactNo`]
                                ? 'border border-red-600'
                                : 'border border-gray-300'
                            "
                            type="text"
                            name="ContactNo"
                            id="ContactNo"
                            placeholder="Your Contact No."
                            class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                            v-model="reference.contactNo"
                            @input="validateReferrenceInput(reference)"
                          />
                        </div>
                      </label>
                      <span
                        class="error-msg"
                        v-if="errors[`commercialReference[${key}].contactNo`]"
                      >
                        {{ errors[`commercialReference[${key}].contactNo`] }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex mt-4">
                <VueLoadingButton
                  ref="loader"
                  aria-label="Post message"
                  :loading="isButtonLoader"
                  :disabled="isButtonLoader"
                  :styled="true"
                  style="
                    padding-left: 87px !important;
                    padding-right: 87px !important;
                  "
                  class="!mb-5 !text-white !bg-[#0060C9] !font-medium !rounded-lg !text-[16px] !px-[6.5rem] !py-[15px] !text-center"
                  @click.native="upateUserProfile"
                >
                  Save
                </VueLoadingButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <loading
      :active="isLoader"
      :is-full-page="true"
      color="#007BFF"
      loader="bars"
      :height="70"
      :width="70"
    />
  </div>
</template>

<script>
import { getToken } from "firebase/messaging";
import { messaging } from "@/plugins/firebase";
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashboard",

  data() {
    return {
      isButtonLoader: false,
      isLoader: false,

      isProfile: true,
      step1: true,
      step2: false,
      errors: {},
      userReference: [],
      previousUrl: "",
      currentPage: "",
      countriesList: [
        {
          label: "USA",
        },
        {
          label: "MEXICO",
        },
      ],
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
      selectedLabel: "Select option",
      profileURL: "",
      maxFileSize: 2000000,
      formData: {
        companyName: "",
        contactName: "",
        countryCode: 1,
        contactNumber: "",
        email: "",
        password: "",
        profilePicture: "",
        companyFormationType: "",
        companyFormation: {
          usa: {
            w9_Form: "",
            utility_Bill: "",
          },
          maxico: {
            copia_Rfc_Form: "",
            constance_Of_Fiscal_Situation: "",
            proof_of_Favorable: "",
            proof_Of_Address: "",
          },
        },
        commercialReference: [
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      getUserProfile: "auth/getUserProfile",
    }),
    AccountCreatedDate() {
      return this.$moment(this.formData.createdAt).format("Do MMM YYYY");
    },
    isDropdownDisabled() {
      return (
        this.getUserProfile?.companyFormationType !== "" &&
        this.getUserProfile?.companyFormationType != null
      );
    },
  },
  methods: {
    ...mapActions({
      profile: "auth/profile",
      updateProfile: "auth/updateProfile",
      fetchServiceReference: "service/fetchServiceReference",
    }),
    getValue(item) {
      this.selectedLabel = item.label;
      this.formData.companyFormationType = item.label;
    },
    getCountry(item) {
      this.formData.countryCode = item.value;
    },
    getReferenceCountry(item, ref) {
      ref.countryCode = item.value;
    },
    async validateContactInput(event) {
      this.formData.contactNumber = await this.$validateNumber(
        event.target.value
      );
    },
    async validateReferrenceInput(reference) {
      reference.contactNo = await this.$validateNumber(reference.contactNo);
    },
    async uploadW9Form(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.usa.w9_Form = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadUtilityBill(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.usa.utility_Bill = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadCopiaRfcForm(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.copia_Rfc_Form = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadConstanceOfFiscalSituation(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.constance_Of_Fiscal_Situation =
          file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadProofOfFavorable(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.proof_of_Favorable = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadProofOfAddress(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.proof_Of_Address = file;
      } catch (error) {
        console.log(error);
      }
    },
    async upateUserProfile() {
      this.isButtonLoader = true;
      try {
        this.errors = await this.$validateEditFormData({ form: this.formData });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        const formData = new FormData();
        formData.append("companyName", this.formData.companyName);
        formData.append("contactName", this.formData.contactName);
        formData.append("contactNumber", this.formData.contactNumber);
        formData.append("countryCode", this.formData.countryCode);
        formData.append("email", this.formData.email.toLowerCase());
        formData.append("profilePicture", this.formData.profilePicture);
        formData.append("webToken", this.formData.webToken);
        if (
          this.formData.companyFormationType &&
          this.formData.companyFormationType != null
        ) {
          formData.append(
            "companyFormationType",
            this.formData.companyFormationType
          );
        }
        if (this.selectedLabel === "USA") {
          delete this.formData?.companyFormation?.maxico;
          if (
            this.formData?.companyFormation?.usa?.w9_Form != null &&
            typeof this.formData?.companyFormation?.usa?.w9_Form == "object"
          ) {
            formData.append(
              "companyFormation_usa_w9_Form",
              this.formData?.companyFormation?.usa?.w9_Form
            );
          }
          if (
            this.formData?.companyFormation?.usa?.utility_Bill != null &&
            typeof this.formData?.companyFormation?.usa?.utility_Bill ==
              "object"
          ) {
            formData.append(
              "companyFormation_usa_utility_Bill",
              this.formData?.companyFormation?.usa?.utility_Bill
            );
          }
        }
        if (this.selectedLabel === "MEXICO") {
          delete this.formData.companyFormation.usa;

          if (
            this.formData.companyFormation.maxico.copia_Rfc_Form != null &&
            typeof this.formData.companyFormation.maxico.copia_Rfc_Form ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_copia_Rfc_Form",
              this.formData.companyFormation.maxico.copia_Rfc_Form
            );
          }
          if (
            this.formData.companyFormation.maxico
              .constance_Of_Fiscal_Situation != null &&
            typeof this.formData.companyFormation.maxico
              .constance_Of_Fiscal_Situation == "object"
          ) {
            formData.append(
              "companyFormation_maxico_constance_Of_Fiscal_Situation",
              this.formData?.companyFormation?.maxico
                ?.constance_Of_Fiscal_Situation
            );
          }
          if (
            this.formData?.companyFormation?.maxico?.proof_of_Favorable !=
              null &&
            typeof this.formData?.companyFormation?.maxico
              ?.proof_of_Favorable == "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_of_Favorable",
              this.formData?.companyFormation?.maxico?.proof_of_Favorable
            );
          }
          if (
            this.formData?.companyFormation?.maxico?.proof_Of_Address != null &&
            typeof this.formData?.companyFormation?.maxico?.proof_Of_Address ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_Of_Address",
              this.formData?.companyFormation?.maxico?.proof_Of_Address
            );
          }
        }

        this.formData.commercialReference.forEach((ref, index) => {
          let hasValidValue = Object.keys(ref).some(
            (key) =>
              key !== "countryCode" &&
              key !== "accountId" &&
              key !== "_id" &&
              ref[key] &&
              ref[key] !== ""
          );
          if (hasValidValue) {
            for (let key in ref) {
              let value = ref[key];

              if (key === "contactNo") {
                value = value ? `${value}` : "";
              }
              if (key === "countryCode") {
                value = `${value}`;
              }
              if (value && value !== "" && value != null) {
                formData.append(`commercialReference[${index}][${key}]`, value);
              }
            }
          }
        });
        const commercialRef1 = this.formData.commercialReference[0];
        const commercialRef2 = this.formData.commercialReference[1];
        if (
          commercialRef2 &&
          (commercialRef1.companyName ||
            commercialRef1.contactName ||
            commercialRef2.companyName ||
            commercialRef2.contactName) &&
          (!commercialRef1.companyName || !commercialRef1.contactName)
        ) {
          this.$toast.open({
            message: "Please add commercial reference 1",
            type: "error",
          });
          return;
        }
        const response = await this.updateProfile(formData);
        await this.profile();
        this.formData = await this.$lodash.cloneDeep(this.getUserProfile);
        this.profileURL = this.formData?.profilePicture || "";
        this.selectedLabel =
          this.formData.companyFormationType &&
          this.formData.companyFormationType != "" &&
          this.formData.companyFormationType != null
            ? this.formData.companyFormationType
            : "Select option";
        await this.formatCommercialReference();
        this.$toast.open({
          message: response.msg,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isButtonLoader = false;
      }
    },
    checkFileSize(file) {
      if (file?.size > this.maxFileSize) {
        return false;
      }
      return true;
    },
    async handleFileChange(event) {
      const file = event.target.files[0];
      this.formData.profilePicture = file;
      if (file) {
        try {
          if (!this.checkFileSize(file)) {
            this.$toast.open({
              message: this.$i18n.t("fileSizeErrorMessage"),
              type: "error",
            });
            return;
          }
          this.profileURL = file ? URL.createObjectURL(file) : "";
          this.formData.profilePicture = file;
          this.isLoader = true;

          await this.upateUserProfile();
        } catch (error) {
          console.log(error);
          this.$toast.open({
            message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
            type: "error",
          });
        } finally {
          this.isLoader = false;
        }
      }
    },
    async getUserRererence() {
      try {
        const res = await this.fetchServiceReference();
        this.userReference = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },

    prevPage() {
      if (this.step2) {
        this.step1 = true;
        this.step2 = false;
      } else {
        if (this.previousUrl) {
          this.$router.push(this.previousUrl);
        } else {
          console.log("No previous URL found");
        }
      }
    },
    async editProfile() {
      await this.profile();
      this.step1 = false;
      this.step2 = true;
    },
    async formatCommercialReference() {
      if (
        !this.getUserProfile.commercialReference ||
        this.getUserProfile.commercialReference.length === 0
      ) {
        this.formData.commercialReference = [
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
        ];
      } else if (this.getUserProfile.commercialReference.length === 1) {
        this.formData.commercialReference = [
          this.getUserProfile.commercialReference[0],
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
            contactNo: "",
          },
        ];
      } else {
        this.formData.commercialReference =
          this.getUserProfile.commercialReference;
      }
    },
    async activate() {
      const token = await getToken(messaging, {
        vapidKey: process.env.NOTIFICATION_KEY,
      });
      if (token) {
        this.formData.webToken = token;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.previousUrl = from.fullPath;
      vm.currentPage = to.fullPath;
    });
  },
  async mounted() {
    try {
      this.activate();
      await this.profile();
      await this.getUserRererence();
      this.formData = {
        ...(await this.$lodash.cloneDeep(this.getUserProfile)),
      };
      this.profileURL = this.formData?.profilePicture || "";
      this.selectedLabel =
        this.formData.companyFormationType &&
        this.formData.companyFormationType != "" &&
        this.formData.companyFormationType != null
          ? this.formData.companyFormationType
          : "Select option";
      await this.formatCommercialReference();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
