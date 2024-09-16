<template>
  <div>
    <div>
      <div class="mt-5">
        <div class="relative">
          <img
            src="@/static/Images/profile-truck.webp"
            alt=""
            class="w-full relative -top-[100px]"
          />
          <h1
            class="text-white font-medium text-[15px] bg-black opacity-60 py-2 px-5 absolute right-[15rem] top-12 rounded-lg cursor-pointer"
          >
            Change Background
          </h1>
        </div>
        <div class="relative -top-[7.5rem]">
          <div
            :class="isProfile ? ' border-b border-[#EEEEEE] pb-6 ' : ''"
            class="sm:mx-40 mx-6 relative flex justify-between items-center"
          >
            <div class="flex gap-10 items-center relative">
              <div>
                <div class="border-[12px] border-white rounded-full">
                  <img
                    src="@/static/Images/profile-circle-img.webp"
                    alt=""
                    class="w-[120px] h-[120px] object-cover rounded-full"
                  />
                  <img
                    v-if="isProfile === false"
                    src="@/static/svg/profile-edit.svg"
                    alt=""
                    class="object-cover rounded-full bg-white absolute p-2 left-24 bottom-2"
                  />
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
                @click="isProfile = !isProfile"
                v-if="isProfile"
                class="border border-[#0060C9] rounded-lg text-base font-semibold text-[#0060C9] px-4 py-2.5"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div class="sm:mx-40 mx-6 mt-8 grid-cols-2 grid" v-if="isProfile">
            <div class="border-r border-[#EEEEEE]">
              <h1 class="text-[#000000] font-bold text-lg">Service Details</h1>
              <p class="text-[#00000099] font-normal text-sm mt-4">
                Account ID
              </p>
              <div class="grid grid-cols-2 mt-1">
                <p class="text-[#1E1E1E] font-medium text-base">
                  {{ formData.accountId }}
                </p>
                <img src="@/static/svg/copy.svg" alt="" class="" />
              </div>
              <p class="text-[#00000099] font-normal text-sm mt-3">
                Account created on
              </p>
              <p class="text-[#1E1E1E] font-medium text-base mt-1">
                {{ AccountCreatedDate }}
              </p>
            </div>
            <div class="px-7">
              <h1 class="text-[#000000] font-bold text-lg">Company Details</h1>
              <p class="text-[#00000099] font-normal text-sm mt-4">
                Carrier Info
              </p>
              <div class="flex gap-3 items-center">
                <img
                  src="@/static/svg/star.svg"
                  alt=""
                  class="bg-[#F0F0F0] py-2.5 px-1.5 rounded-xl mt-3"
                />
                <div>
                  <p class="text-[#1E1E1E] font-medium text-base">
                    {{ formData.companyName }}
                  </p>
                  <p class="text-[#00000099] font-normal text-sm">
                    Menlo Park, CA 94025, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="sm:mx-40 mx-5" v-else>
            <form
              class="space-y-4 md:space-y-6 mt-6"
              @submit.prevent="upateUserProfile"
            >
              <div>
                <div
                  class="grid grid-cols-3 gap-y-2 border-b border-[#EEEEEE] py-2"
                >
                  <div>
                    <label
                      for="ContactName"
                      class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                      >Name</label
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
                      for="email"
                      class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                      >Email address</label
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
                      for="ContactNo"
                      class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                      >Contact
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
                <div class="grid grid-cols-3 border-b border-[#EEEEEE] py-4">
                  <div>
                    <label
                      for="Company name"
                      class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                      >Company name</label
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
                  <div class="grid grid-cols-3 gap-y-2 mt-4">
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
                        for="ContactName"
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
                        for="email"
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
                        for="ContactNo"
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
                <button
                  type="submit"
                  class="mb-5 text-white bg-[#0060C9] font-medium rounded-lg text-[16px] px-[6.5rem] py-[15px] text-center"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      isProfile: true,
      errors: {},
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
      formData: {
        companyName: "",
        contactName: "",
        countryCode: 1,
        contactNumber: "",
        email: "",
        password: "",
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
  },
  methods: {
    ...mapActions({
      profile: "auth/profile",
      updateProfile: "auth/updateProfile",
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
    async uploadW9Form(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.usa.w9_Form = file;
        // if (file) {
        //   const reader = new FileReader();
        //   reader.onload = (e) => {
        //     this.formData.companyFormation.usa.w9_Form = e.target.result;
        //   };
        //   reader.readAsDataURL(file);
        // }
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
      try {
        const formData = new FormData();
        formData.append("companyName", this.formData.companyName);
        formData.append("contactName", this.formData.contactName);
        formData.append("contactNumber", this.formData.contactNumber);
        formData.append("countryCode", this.formData.countryCode);
        formData.append("email", this.formData.email);
        formData.append(
          "companyFormationType",
          this.formData.companyFormationType
        );
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
        console.log(this.formData.commercialReference);
        this.formData.commercialReference.forEach((ref, index) => {
          for (let key in ref) {
            let value = ref[key];

            if (key === "contactNo") {
              value = value ? `${value}` : "";
            }
            if (key === "countryCode") {
              value = `${value}`;
            }
            if (
              value &&
              value != "" &&
              value != null &&
              key != "accountId" &&
              key != "_id"
            ) {
              formData.append(`commercialReference[${index}][${key}]`, value);
            }
          }
        });
        const response = await this.updateProfile(formData);
        this.$toast.open({
          message: response.msg,
        });
        this.isProfile = true;
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
    try {
      await this.profile();
      this.formData = await this.$lodash.cloneDeep(this.getUserProfile);
      this.selectedLabel = this.formData.companyFormationType
        ? this.formData.companyFormationType
        : "Select option";
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
.error-msg {
  font-size: 14px;
  font-weight: 400;
  color: red;
}
</style>
