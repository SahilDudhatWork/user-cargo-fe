<template>
  <div class="xl:mx-40 mx-5">
    <div class="flex items-center gap-3 mb-5 mt-9">
      <h1 class="text-[#000000] font-semibold text-xs cursor-pointer">
        <nuxt-link to="/my-orders">My orders</nuxt-link>
      </h1>
      <img src="@/static/svg/right-arrow.svg" alt="" />
      <h1 class="text-[#000000] font-semibold text-xs cursor-pointer">
        Service Details: {{ orderData?.movementId }}
      </h1>
    </div>
    <div class="grid sm:grid-cols-2 grid-cols-1 mt-9">
      <div class="border-r border-[#EEEEEE]">
        <h1 class="text-[#000000] font-bold text-lg mb-4">Amount Details</h1>
        <div class="flex justify-between">
          <div>
            <h1 class="font-semibold text-[29px] text-[#1E1E1E]">
              {{ orderData?.amountDetails?.currency
              }}{{ orderData?.amountDetails?.price }}
            </h1>
            <p class="text-[#00000099] font-normal text-xs pb-6">
              Additional charges may apply*
            </p>
          </div>
        </div>
        <div
          class="w-full relative before:absolute before:inset-x-0 before:bottom- before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
        ></div>
        <div class="flex justify-between">
          <h1 class="text-[#000000] font-bold text-lg mb-4 mt-5">
            Service Details
          </h1>
          <div class="mr-8 mb-4 mt-5">
            <button
              v-if="formattedStatus"
              :style="{ backgroundColor: buttonColor }"
              class="rounded font-medium text-[10px] text-[#FEFEFE] px-4 py-1"
            >
              {{ formattedStatus }}
            </button>
          </div>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-y-5">
          <div>
            <p class="text-[#00000099] font-normal text-sm">Movement ID</p>
            <span class="text-[#1E1E1E] font-medium text-base">{{
              orderData.movementId
            }}</span>
          </div>
          <div>
            <p class="text-[#00000099] font-normal text-sm">Location ID</p>
            <span class="text-[#1E1E1E] font-medium text-base">MX</span>
          </div>
          <div>
            <p class="text-[#00000099] font-normal text-sm mb-1">Location</p>
            <span
              class="text-white font-medium text-base bg-[#0060C9] rounded-lg py-1 px-2"
              >{{ orderData?.typeOfService?.title }}</span
            >
          </div>
          <div>
            <p class="text-[#00000099] font-normal text-sm">
              Transportation Type
            </p>
            <span class="text-[#1E1E1E] font-medium text-base">{{
              orderData?.typeOfTransportation?.title
            }}</span>
          </div>
          <div>
            <p class="text-[#00000099] font-normal text-sm">
              Mode of Transportation
            </p>
            <span
              class="text-[#1E1E1E] font-medium text-base"
              v-if="orderData?.modeOfTransportation?.title"
              >{{ orderData?.modeOfTransportation?.title }}</span
            >
          </div>
          <div>
            <p class="text-[#00000099] font-normal text-sm">User Reference</p>
            <span class="text-[#1E1E1E] font-medium text-base">{{
              orderData?.userReference
            }}</span>
          </div>
          <div>
            <p class="text-[#00000099] font-normal text-sm">
              Bridge of Crossing
            </p>
            <span class="text-[#1E1E1E] font-medium text-base">{{
              orderData?.port_BridgeOfCrossing
            }}</span>
          </div>
        </div>
        <div
          class="mt-4 pb-4 w-full relative before:absolute before:inset-x-0 before:bottom- before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
        ></div>
        <h1 class="text-[#00000099] font-normal text-sm">
          Special Requirements
        </h1>
        <div class="mt-1">
          <div class="flex flex-wrap gap-2">
            <p
              class="bg-[#0060C91A] px-2.5 rounded-[100px] flex items-center py-[2px]"
              v-for="(item, index) in orderData?.specialRequirements"
              :key="index"
            >
              <span class="text-[#0060C9] text-base font-semibold">
                {{ item?.type }}
              </span>
            </p>
          </div>
        </div>
        <div class="mt-6 mb-6">
          <p class="text-[#00000099] font-normal text-sm">Quantity</p>
          <p class="font-semibold text-base text-[#1E1E1E]">
            {{ orderData?.quantityForChains }}xChains,
            {{ orderData?.quantityForStraps }}xStraps,
            {{ orderData?.quantityForTarps }}xTarps
          </p>
        </div>
        <div
          class="mb-5"
          v-if="
            orderData?.schedule?.date !== null ||
            orderData?.schedule?.time !== null
          "
        >
          <p class="text-[#00000099] font-normal text-sm">Scheduled Time</p>
          <div
            class="font-semibold text-base text-[#1E1E1E]"
            v-if="orderData?.schedule"
          >
            <span v-if="orderData?.schedule?.date">
              {{
                $moment(orderData?.schedule?.date)
                  .locale("en")
                  .format("DD MMM, dddd YYYY")
              }},
            </span>
            <span v-if="orderData?.schedule?.time">
              {{ orderData?.schedule?.time }}
            </span>
          </div>
        </div>
      </div>
      <div class="sm:px-9">
        <div class="!mt-10">
          <p class="text-[#000000] font-bold text-lg mb-4">Address Details</p>
          <div>
            <p class="text-[#00000099] font-normal text-sm">PICKUP LOCATIONS</p>
            <div
              class="flex mt-3 flex-col"
              v-for="(item, key) in orderData?.pickUpAddressData"
              :key="key"
            >
              <div class="flex justify-between pb-3">
                <div>
                  <p class="text-[#1E1E1E] font-semibold text-sm">
                    {{ item?.addressDetails?.laneNumber }}
                    {{ item?.addressDetails?.buildinName }}
                  </p>
                  <p class="text-[#1B1B1B] font-medium text-xs">
                    {{ item?.addressDetails?.postalCode }}
                  </p>
                </div>
                <div>
                  <p class="text-[#1E1E1E] font-normal text-xs">
                    {{ item?.contactDetails?.contactName }},
                    {{ item?.contactDetails?.contactNumber }}
                  </p>
                </div>
              </div>
              <div
                class="w-full relative before:absolute before:inset-x-0 before:bottom- before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
              ></div>
            </div>
          </div>
          <div class="mt-6">
            <p class="text-[#00000099] font-normal text-sm">DROP LOCATION</p>
            <div
              class="flex mt-3 flex-col"
              v-for="(item, key) in orderData?.dropAddressData"
              :key="key"
            >
              <div class="flex justify-between pb-3">
                <div>
                  <p class="text-[#1E1E1E] font-semibold text-sm">
                    {{ item?.addressDetails?.laneNumber }}
                    {{ item?.addressDetails?.buildinName }}
                  </p>
                  <p class="text-[#1B1B1B] font-medium text-xs">
                    {{ item?.addressDetails?.postalCode }}
                  </p>
                </div>
                <div>
                  <p class="text-[#1E1E1E] font-normal text-xs">
                    {{ item?.contactDetails?.contactName }},
                    {{ item?.contactDetails?.contactNumber }}
                  </p>
                </div>
              </div>
              <div
                class="w-full relative before:absolute before:inset-x-0 before:bottom- before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full relative h-[3px] border-b py-2 border-[#EEEEEE] mt-5 mb-5"
    ></div>

    <div>
      <div class="grid grid-cols-2">
        <div v-if="$checkUserUpload(orderData?.status)">
          <h1 class="text-[#00000099] font-normal text-sm">Carrier Info</h1>
          <div class="flex gap-3 items-center">
            <img
              src="@/static/svg/star.svg"
              alt=""
              class="bg-[#F0F0F0] py-2.5 px-1.5 rounded-xl mt-3"
            />
            <div>
              <p class="text-[#1E1E1E] font-medium text-base">
                {{ orderData?.carrierData?.contactName }}
              </p>
              <p class="text-[#00000099] font-normal text-sm text">
                {{ orderData?.carrierData?.companyName }}, +{{
                  orderData?.carrierData?.countryCode
                }}
                {{ orderData?.carrierData?.contactNumber }},
                {{ orderData?.carrierData?.email }}
              </p>
            </div>
          </div>
          <div
            class="w-full relative h-[3px] border-b border-[#E6E6E6] mb-6 mt-6"
          ></div>
        </div>
      </div>

      <div v-if="orderData?.qrCode && orderData?.qrCode !== null">
        <div class="flex gap-4">
          <div>
            <img :src="orderData?.qrCode" alt="" class="w-16 h-16" />
          </div>
          <div
            class="font-normal text-sm text-[#1E1E1E] sm:max-w-[260px] max-w-[200px]"
          >
            You received an
            <span class="font-semibold">QR code </span>
            from carrier for further verification with driver.
          </div>
        </div>
        <div
          class="w-full relative h-[3px] border-b border-[#E6E6E6] mb-6 mt-6"
        ></div>
      </div>
      <div class="mt-5" v-if="$checkProofOfPhotography(orderData?.status)">
        <ProofOfPhotography :orderData="orderData" />
      </div>
    </div>
    <div class="flex justify-center mt-32 mb-5" v-if="!orderData?.documents">
      <div
        class="rounded-2xl text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] flex justify-between py-3 px-5 sm:gap-14 gap-2 items-center"
      >
        <div>
          <h1 class="text-[#FFFFFF] text-sm font-semibold">Upload Document</h1>
          <p class="text-[#FFFFFF] text-xs font-normal">
            share your experience with us.
          </p>
        </div>
        <div>
          <button
            @click="triggerFileUpload"
            class="bg-[#F5F9FD] text-[#0060C9] text-sm font-semibold px-[30px] py-1.5 rounded-lg"
          >
            Upload
          </button>
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleFileUpload"
          />
        </div>
      </div>
    </div>
    <div v-if="orderData?.status === 'Completed' && !isUploadComplete">
      <UploadDocument
        v-if="!orderData?.ratings?.userToCarrier"
        title="Movement Completed"
        description="share your experience with us."
        buttonText="Share Review"
        @handleClick="shareRiview"
        :showInput="false"
      />
    </div>
    <div>
      <ShareReviewModal
        :isModal="isShareReviewModal"
        :orderData="orderData"
        @handleSubmit="handleShareRiview"
        @closeModal="closeShareReviewModal"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      movementId: null,
      isShareReviewModal: false,
      isProofOfPhotography: false,
      isUploadComplete: false,
    };
  },
  computed: {
    ...mapGetters({
      orderData: "service/getSingleOrderData",
    }),
    formattedStatus() {
      if (this.orderData?.status === "NewAssignments") {
        return "NEW-ASSIGNMENTS";
      } else if (this.orderData?.status === "Pending") {
        return "PENDING";
      } else if (this.orderData?.status === "InProgress") {
        return "IN-PROGRESS";
      } else if (this.orderData?.status === "Completed") {
        return "COMPLETED";
      }
      return null;
    },
    buttonColor() {
      if (this.orderData?.status === "NewAssignments") {
        return "#023770";
      } else if (this.orderData?.status === "Pending") {
        return "#989898";
      } else if (this.orderData?.status === "InProgress") {
        return "#FFAA00";
      } else if (this.orderData?.status === "Completed") {
        return "#3ECC48";
      }
      return "#000000";
    },
  },
  methods: {
    ...mapActions({
      fetchSingleOrder: "service/fetchSingleOrder",
      uploadFile: "service/uploadFile",
      createRating: "service/createRating",
    }),
    shareRiview() {
      this.isShareReviewModal = !this.isShareReviewModal;
    },
    handleFileUpload(event) {
      this.documents = event.target.files[0];
      if (this.documents) {
        this.uploadDocumentFile();
      }
    },
    async handleShareRiview(formData) {
      try {
        const reviewData = {
          rating: formData.rating,
          experience: formData.experience,
        };
        const res = await this.createRating({
          id: this.movementId,
          data: reviewData,
        });
        this.$toast.open({
          message: res.msg,
        });
        this.isUploadComplete = true;
        this.isShareReviewModal = false;
        await this.getSingleOrder();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    closeShareReviewModal() {
      this.isShareReviewModal = false;
    },
    async uploadDocumentFile() {
      try {
        const formData = new FormData();
        formData.append("documents", this.documents);
        formData.append("movementId", this.movementId);
        const res = await this.uploadFile({
          id: this.movementId,
          data: formData,
        });
        this.$toast.open({
          message: res.msg,
        });
        await this.getSingleOrder();
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    actionButton(label) {
      this.isOrder = label;
    },
    async getSingleOrder() {
      try {
        await this.fetchSingleOrder({
          movementId: this.movementId,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
  },
  async asyncData({ params }) {
    return {
      movementId: params.pathMatch,
    };
  },

  async mounted() {
    await this.getSingleOrder();
  },
};
</script>
