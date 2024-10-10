<template>
  <div>
    <div>
      <AdditionalHero @prevPage="prevPage" />
    </div>
    <div class="px-10 py-10">
      <ServiceRequestStep1 @handleService="handleService" v-if="modal.step1" />
      <ServiceRequestStep2 @step1Next="step1Next" v-if="modal.step2" />
      <ServiceRequestStep3
        v-if="modal.step3"
        @step2Next="step2Next"
        :errors="errors"
        :typeOfTransportationLabel="selectedTypeOfTransportationLabel"
        :modeOfTransportationLabel="selectedModeOfTransportationLabel"
      />
      <ServiceRequestStep4
        v-if="modal.step4"
        @step3Next="step3Next"
        :isSkipButton="true"
        :typeOfTransportationLabel="selectedTypeOfTransportationLabel"
        :modeOfTransportationLabel="selectedModeOfTransportationLabel"
        :errors="errors"
        @skipUserAddress="skipUserAddress"
      />
      <ServiceRequestStep5
        v-if="modal.step5"
        @step4Next="step4Next"
        :typeOfTransportationLabel="selectedTypeOfTransportationLabel"
        :modeOfTransportationLabel="selectedModeOfTransportationLabel"
        @getEditUserAddress="getEditUserAddress"
      />
      <ServiceRequestStep6
        v-if="modal.step6"
        @step5Next="step5Next"
        :typeOfTransportationLabel="selectedTypeOfTransportationLabel"
        :modeOfTransportationLabel="selectedModeOfTransportationLabel"
        :service="service"
        :isRequestSuccess="isRequestSuccess"
        :totalPrice="totalPrice"
      />
      <ServiceRequestStep7
        v-if="modal.step7"
        @requestProcess="requestProcess"
      />
      <ServiceRequestStep8
        v-if="modal.step8"
        @editUserAddress="editUserAddress"
        :typeOfTransportationLabel="selectedTypeOfTransportationLabel"
        :modeOfTransportationLabel="selectedModeOfTransportationLabel"
        :formData="formData"
        :errors="errors"
      />
      <div>
        <RequestSuccessModal
          :isModal="isRequestSuccess"
          @close="closeRequestSuccessModal"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      service: {},
      formData: {
        addressDetails: {
          buildinName: "",
          postalCode: "",
          laneNumber: "",
          additionalDetails: "",
        },
        contactDetails: {
          contactName: "",
          contactEmail: "",
          contactNumber: "",
          countryCode: 1,
        },
      },
      isRequestSuccess: false,
      locations: [],
      errors: {},
      totalPrice: 0,
    };
  },
  computed: {
    ...mapGetters({
      serviceData: "service/getService",
      getUserProfile: "auth/getUserProfile",
      selectedServiceItems: "service/getSelectedServiceItems",
    }),
    ...mapState({
      modal: (state) => state.service.modal,
    }),
    selectedTypeOfTransportationLabel() {
      return this.service?.typeOfTransportation?.title || "FTL";
    },
    selectedModeOfTransportationLabel() {
      return this.service?.modeOfTransportation?.title;
    },
  },
  methods: {
    ...mapActions({
      fetchService: "service/fetchService",
      fetchUserAddress: "service/fetchUserAddress",
      createOrder: "service/createOrder",
      fetchEditUserAddress: "service/fetchEditUserAddress",
      updateUserAddress: "service/updateUserAddress",
      createUserAddress: "service/createUserAddress",
      openModal: "service/openModal",
      closeModal: "service/closeModal",
      previousStep: "service/previousStep",
      fetchTypeOfService: "service/fetchTypeOfService",
    }),
    async handleService(selectedService) {
      this.service.typeOfService = selectedService;
      let verifyByAdmin = (await this.getUserProfile?.verifyByAdmin) || false;
      if (verifyByAdmin) {
        if (!this.service?.typeOfService?._id) {
          this.$toast.open({
            message: "Please select the field before submitting.",
            type: "error",
          });
          return;
        }
        await this.getServices();
        this.closeModal("step1");
        this.openModal("step2");
      } else {
        this.$toast.open({
          message: this.$i18n.t("adminVerificationErrorMessage"),
          type: "error",
        });
      }
    },
    async step1Next(payload) {
      this.service.port_BridgeOfCrossing = payload.selectedPortItem;
      this.service.typeOfTransportation =
        payload.selectedTypeOfTransportationItem;
      this.service.modeOfTransportation = payload.selectedModeItem;
      this.closeModal("step2");
      this.openModal("step3");
    },
    async step2Next(payload) {
      const label = {
        userReferenceSelectedLabel: payload?.selectedUserReference?.label,
        quantitySelectedLabel: payload?.selectedQuantityChains,
        quantityStrapsSelectedLabel: payload?.selectedQuantityStraps,
        quantityTarpsSelectedLabel: payload?.selectedQuantityTarps,
        programeSelectedLabel: payload?.selectedPrograming,
      };
      this.errors = await this.$validateUserRef({
        form: label,
      });
      if (Object.keys(this.errors).length > 0) {
        this.$toast.open({
          message: "Please fix the errors before submitting.",
          type: "error",
        });
        return;
      }
      this.service.userReference = payload?.selectedUserReference;
      const specialRequirementIds = payload?.selectedSpecialRequirements.map(
        (req) => req._id
      );

      this.service.specialRequirements = specialRequirementIds;
      this.service.quantityForChains = payload?.selectedQuantityChains;
      this.service.quantityForStraps = payload?.selectedQuantityStraps;
      this.service.quantityForTarps = payload?.selectedQuantityTarps;
      this.service.programming = payload.selectedPrograming;
      if (this.service.programming == "Schedule") {
        if (payload.schedule) {
          this.service.schedule = payload.schedule;
        }
      }

      this.closeModal("step3");
      this.openModal("step4");
    },
    async step3Next(payload) {
      let { addressDetails, contactDetails } = payload;
      this.formData = {
        addressDetails,
        contactDetails,
      };
      this.errors = await this.$validateUserAddress({
        form: this.formData,
      });
      if (Object.keys(this.errors).length > 0) {
        this.$toast.open({
          message: "Please fix the errors before submitting.",
          type: "error",
        });
        return;
      }
      try {
        const res = await this.createUserAddress(this.formData);
        this.$toast.open({
          message: res.msg,
        });
        this.closeModal("step4");
        this.openModal("step5");
        this.getUserAddress();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async skipUserAddress() {
      this.closeModal("step4");
      this.openModal("step5");
      await this.getUserAddress();
    },
    async editUserAddress() {
      try {
        this.errors = await this.$validateUserAddress({
          form: this.formData,
        });
        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }
        const res = await this.updateUserAddress(this.formData);
        this.$toast.open({
          message: res.msg,
        });
        this.closeModal("step8");
        this.openModal("step5");
        this.getUserAddress();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getEditUserAddress(id) {
      try {
        this.errors = {};
        const res = await this.fetchEditUserAddress({
          id: id,
        });
        this.formData = res.data;
        this.closeModal("step5");
        this.openModal("step8");
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    step4Next(payload) {
      let { selectedPickupItem, selectedDropItem } = payload;
      this.service.pickUpAddressIds = selectedPickupItem;
      this.service.dropAddressIds = selectedDropItem;

      const ChainsPrice = this.serviceData?.securingEquipment?.chains;
      const TarpsPrice = this.serviceData?.securingEquipment?.tarps;
      const StrapsPrice = this.serviceData?.securingEquipment?.straps;

      const servicePrice = this.service.typeOfService.price || 0;
      const transportationPrice = this.service.typeOfTransportation.price || 0;
      const modePrice = this.service.modeOfTransportation.price || 0;

      const chainTotal = this.service.quantityForChains * ChainsPrice;
      const tarpsTotal = this.service.quantityForTarps * TarpsPrice;
      const strapsTotal = this.service.quantityForStraps * StrapsPrice;
      const additionalServicesTotal =
        this.selectedServiceItems?.selectedSpecialRequirementItems?.reduce(
          (acc, service) => acc + service.price,
          0
        );

      const totalPrice =
        servicePrice +
        transportationPrice +
        modePrice +
        chainTotal +
        tarpsTotal +
        strapsTotal +
        additionalServicesTotal;

      this.totalPrice = totalPrice.toFixed(1);

      this.closeModal("step5");
      this.openModal("step6");
    },
    async step5Next() {
      try {
        this.service.userReference = this.service.userReference?.key;
        this.service.typeOfService = this.service.typeOfService?._id;

        this.service.modeOfTransportation =
          this.service.modeOfTransportation?._id;

        this.service.port_BridgeOfCrossing =
          this.service.port_BridgeOfCrossing?._id;
        this.service.typeOfTransportation =
          this.service.typeOfTransportation?._id;

        const res = await this.createOrder(this.service);
        this.$toast.open({
          message: res.msg,
        });
        this.isRequestSuccess = true;
        document.body.style.overflow = "hidden";
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    closeRequestSuccessModal() {
      this.closeModal("step6");
      this.isRequestSuccess = false;
      this.openModal("step7");
      document.body.style.overflow = "";
    },
    handleClick() {
      this.closeModal("step6");
      this.isRequestSuccess = false;
      this.openModal("step7");
      document.body.style.overflow = "";
    },
    requestProcess() {
      this.$router.push("/my-orders");
    },
    prevPage() {
      if (this.modal.step1 === true) {
        this.$router.push("/");
      } else {
        this.previousStep();
      }
    },
    async getUserAddress() {
      try {
        const res = await this.fetchUserAddress();
        this.locations = res.data;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getServices() {
      try {
        await this.fetchService();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getTypeOfServices() {
      try {
        this.fetchTypeOfService();
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
    document.body.style.backgroundColor = "#ECF3FA";
    await this.getTypeOfServices();
  },
  beforeDestroy() {
    document.body.style.backgroundColor = "";
  },
};
</script>
<style scoped>
.mx-datepicker {
  width: 382px !important;
}
.blur-background {
  filter: blur(4px) !important;
  -webkit-filter: blur(4px) !important;
}
.error-msg {
  font-size: 14px;
  font-weight: 400;
  color: red;
}
</style>
