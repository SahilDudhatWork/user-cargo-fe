<template>
  <div>
    <Additional
      @click="step5Next"
      :class="isRequestSuccess ? 'blur-background' : ''"
      :isButtonLoader="isButtonLoader"
    >
      <template #header>
        <div
          class="flex items-center gap-2 cursor-pointer sm:flex-row flex-col"
        >
          <div class="flex items-center gap-2">
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
                  openModal('step2'), closeModal('step6');
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
                  openModal('step3'), closeModal('step6');
                }
              "
            >
              {{ service?.modeOfTransportation?.title }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
          </div>
          <div class="flex items-center gap-2">
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step5'), closeModal('step6');
                }
              "
            >
              Select Address
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
          </div>
          <span class="text-[12px] font-semibold text-[#000000]">
            Movement Detail
          </span>
        </div>
      </template>
      <template #content>
        <div class="grid sm:grid-cols-2 grid-cols-1 mt-9">
          <div class="border-r border-[#EEEEEE] lg:px-7">
            <h1 class="text-[#000000] font-bold text-lg mb-4">
              Amount Details
            </h1>
            <div class="flex justify-between">
              <div>
                <h1 class="font-semibold text-[29px] text-[#1E1E1E]">
                  ${{ totalPrice }}
                </h1>
                <p class="text-[#00000099] font-normal text-xs pb-6">
                  Additional charges may apply*
                </p>
              </div>
            </div>
            <div
              class="w-full relative before:absolute before:inset-x-0 before:bottom- before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
            ></div>
            <h1 class="text-[#000000] font-bold text-lg mb-4 mt-5">
              Service Details
            </h1>
            <div class="grid sm:grid-cols-2 grid-cols-1 gap-y-5">
              <div>
                <p class="text-[#00000099] font-normal text-sm">Location ID</p>
                <span class="text-[#1E1E1E] font-medium text-base">MX</span>
              </div>
              <div>
                <p class="text-[#00000099] font-normal text-sm mb-1">
                  Location
                </p>
                <span
                  class="text-white font-medium text-base bg-[#0060C9] rounded-lg py-1 px-2"
                  >{{ service?.typeOfService?.title }}</span
                >
              </div>
              <div>
                <p class="text-[#00000099] font-normal text-sm">
                  Transportation Type
                </p>
                <span class="text-[#1E1E1E] font-medium text-base">{{
                  service?.typeOfTransportation?.title
                }}</span>
              </div>
              <div>
                <p class="text-[#00000099] font-normal text-sm">
                  Mode of Transportation
                </p>
                <span class="text-[#1E1E1E] font-medium text-base">{{
                  service?.modeOfTransportation?.title
                }}</span>
              </div>
              <div>
                <p class="text-[#00000099] font-normal text-sm">
                  User Reference
                </p>
                <span class="text-[#1E1E1E] font-medium text-base">{{
                  service?.userReference
                }}</span>
              </div>
              <div>
                <p class="text-[#00000099] font-normal text-sm">Trailer</p>
                <span class="text-[#1E1E1E] font-medium text-base">{{
                  service?.trailer
                }}</span>
              </div>
              <div
                v-if="
                  service?.port_BridgeOfCrossing?.title &&
                  service?.port_BridgeOfCrossing?.title != ''
                "
              >
                <p class="text-[#00000099] font-normal text-sm">
                  Bridge of Crossing
                </p>
                <span class="text-[#1E1E1E] font-medium text-base">{{
                  service?.port_BridgeOfCrossing?.title
                }}</span>
              </div>
            </div>
          </div>
          <div class="sm:px-9">
            <div
              v-if="
                selectedServiceItems.selectedSpecialRequirementItems &&
                selectedServiceItems.selectedSpecialRequirementItems.length
              "
            >
              <h1 class="text-[#00000099] font-normal text-sm">
                Special Requirements
              </h1>
              <div class="mt-1">
                <div class="flex flex-wrap gap-2 mb-4">
                  <p
                    class="bg-[#0060C91A] px-2.5 rounded-[100px] flex items-center py-[2px]"
                    v-for="(
                      item, index
                    ) in selectedServiceItems.selectedSpecialRequirementItems"
                    :key="index"
                  >
                    <span class="text-[#0060C9] text-base font-semibold">
                      {{ item?.type }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="mt-6 mb-6"
              v-if="
                service.quantityForChains ||
                service.quantityForStraps ||
                service.quantityForTarps
              "
            >
              <p class="text-[#00000099] font-normal text-sm">Quantity</p>
              <p class="font-semibold text-base text-[#1E1E1E]">
                <span
                  v-if="
                    service.quantityForChains &&
                    (service.quantityForChains > 1 || service.quantityForStraps)
                  "
                >
                  {{ service.quantityForChains }}xChains
                </span>
                <span v-if="service.quantityForStraps">
                  {{ service.quantityForStraps }}xStraps</span
                >
                <span v-if="service.quantityForTarps">
                  {{ service.quantityForTarps }}xTarps</span
                >
              </p>
            </div>
            <div v-if="service.schedule" class="mb-5">
              <p class="text-[#00000099] font-normal text-sm">Scheduled Time</p>
              <p class="font-semibold text-base text-[#1E1E1E]">
                {{
                  $moment(service?.schedule?.date)
                    .locale("en")
                    .format("DD MMM, dddd YYYY")
                }},
                {{ service.schedule?.time }}
              </p>
            </div>
            <div
              class="w-full relative before:absolute before:inset-x-0 before:bottom- before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
            ></div>
            <div class="!mt-10">
              <p class="text-[#000000] font-bold text-lg mb-4">
                Address Details
              </p>
              <div>
                <p class="text-[#00000099] font-normal text-sm">
                  PICKUP LOCATIONS
                </p>
                <div
                  class="flex mt-3 flex-col"
                  v-for="(item, index) in selectedPickupAddresses"
                  :key="index"
                >
                  <div class="flex justify-between pb-3">
                    <div>
                      <p class="text-[#1E1E1E] font-semibold text-sm">
                        {{
                          (
                            item?.addressDetails?.laneNumber +
                            " " +
                            item?.addressDetails?.buildinName
                          ).length > 40
                            ? (
                                item?.addressDetails?.laneNumber +
                                " " +
                                item?.addressDetails?.buildinName
                              ).substring(0, 40) + "..."
                            : item?.addressDetails?.laneNumber +
                              " " +
                              item?.addressDetails?.buildinName
                        }}
                      </p>
                      <p class="text-[#1B1B1B] font-medium text-xs">
                        {{ item?.addressDetails?.postalCode }}
                      </p>
                    </div>
                    <div>
                      <p class="text-[#1E1E1E] font-normal text-xs">
                        {{
                          item?.contactDetails?.contactName.length > 15
                            ? item?.contactDetails?.contactName.substring(
                                0,
                                15
                              ) + "..."
                            : item?.contactDetails?.contactName
                        }},
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
                <p class="text-[#00000099] font-normal text-sm">
                  DROP LOCATION
                </p>
                <div
                  class="flex mt-3 flex-col"
                  v-for="(item, index) in selectedDropAddresses"
                  :key="index"
                >
                  <div class="flex justify-between pb-3">
                    <div>
                      <p class="text-[#1E1E1E] font-semibold text-sm">
                        {{
                          (
                            item?.addressDetails?.laneNumber +
                            " " +
                            item?.addressDetails?.buildinName
                          ).length > 40
                            ? (
                                item?.addressDetails?.laneNumber +
                                " " +
                                item?.addressDetails?.buildinName
                              ).substring(0, 40) + "..."
                            : item?.addressDetails?.laneNumber +
                              " " +
                              item?.addressDetails?.buildinName
                        }}
                      </p>
                      <p class="text-[#1B1B1B] font-medium text-xs">
                        {{ item?.addressDetails?.postalCode }}
                      </p>
                    </div>
                    <div>
                      <p class="text-[#1E1E1E] font-normal text-xs">
                        {{
                          item?.contactDetails?.contactName.length > 15
                            ? item?.contactDetails?.contactName.substring(
                                0,
                                15
                              ) + "..."
                            : item?.contactDetails?.contactName
                        }},
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
      </template>
    </Additional>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    service: {
      type: Object,
      required: true,
      default: null,
    },
    isRequestSuccess: {
      type: Boolean,
      default: false,
    },
    totalPrice: {
      type: String,
    },
    isButtonLoader: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      userAddress: "service/getUserAddress",
      selectedServiceItems: "service/getSelectedServiceItems",
    }),

    selectedDropAddresses() {
      const selectedDropLoc =
        this.userAddress.length > 0
          ? this.userAddress.filter((item) =>
              this.service.dropAddressIds?.includes(item._id)
            )
          : [];

      return selectedDropLoc;
    },
    selectedPickupAddresses() {
      const selectedPickupLoc =
        this.userAddress.length > 0
          ? this.userAddress.filter((item) =>
              this.service.pickUpAddressIds?.includes(item._id)
            )
          : [];

      return selectedPickupLoc;
    },
  },
  methods: {
    ...mapActions({
      openModal: "service/openModal",
      closeModal: "service/closeModal",
    }),
    step5Next() {
      this.$emit("step5Next");
    },
  },
};
</script>
