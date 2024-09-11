<template>
  <div>
    <div>
      <AdditionalHero @prevPage="prevPage" />
    </div>
    <div class="px-10 py-10">
      <Additional @click="step1Next" v-if="modal.step1">
        <template #content>
          <h1 class="font-bold text-[18px] text-[#000000]">
            Choose Additional Details
          </h1>
          <p class="text-base font-medium text-gray-400">
            Lorem ipsum dolor sit amet consectetur. Digni quam ullamcorper
          </p>
          <div class="flex items-center">
            <p class="text-sm text-[#151515] font-normal mt-3 mb-3">
              Type of Transportation
            </p>
            <div
              class="h-full mx-2 w-[86%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
            ></div>
          </div>
          <div class="grid grid-cols-2 gap-7">
            <TypeOfTransportation
              v-for="(item, index) of transportationType"
              :key="index"
              :item="item"
              :isSelected="item.title === selectedItem"
              @select="selectItem"
            />
          </div>
          <p class="font-medium text-[13px] text-gray-400">
            Choose one of the above option to continue
          </p>
          <div class="flex items-center">
            <p class="text-sm text-[#151515] font-normal mt-3 mb-3">
              Mode of Transportation
            </p>
            <div
              class="h-full mx-2 w-[85%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
            ></div>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <ModeOfTransportation
              v-if="selectedItem === 'FTL'"
              v-for="(item, index) of modeOfTransportation?.FTL"
              :key="index"
              :item="item"
              :isSelected="item.title === modeSelectedItem"
              @select="modeSelectItem"
            />
            <ModeOfTransportation
              v-if="selectedItem === 'LTL'"
              v-for="(item, index) of modeOfTransportation?.LTL"
              :key="index"
              :item="item"
              :isSelected="item.title === modeSelectedItem"
              @select="modeSelectItem"
            />
          </div>
        </template>
      </Additional>
      <Additional @click="step2Next" v-if="modal.step2">
        <template #header>
          <div class="flex items-center gap-2 cursor-pointer">
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step1'), closeModal('step2');
                }
              "
            >
              {{ selectedItem }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span class="text-[12px] font-semibold text-[#000000]">
              {{ modeSelectedItem }}
            </span>
          </div>
        </template>
        <template #content>
          <div class="mt-5 grid grid-cols-2 gap-y-2">
            <div>
              <label
                for="email"
                class="block mb-1 text-sm font-medium text-[#1B1B1B]"
                >Port & Bridge of Crossing</label
              >
              <AdditionalDropdown
                :items="portList"
                :selectedLabel="portSelectedLabel"
                @getValue="getPortValue"
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-1 text-sm font-medium text-[#1B1B1B]"
                >Select Programming</label
              >
              <AdditionalDropdown
                :items="programingList"
                :selectedLabel="programeSelectedLabel"
                @getValue="getProgramingValue"
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-1 text-sm font-medium text-[#1B1B1B]"
                >User Reference</label
              >
              <AdditionalDropdown
                :items="formatRef"
                :selectedLabel="userReferenceSelectedLabel"
                @getValue="getUserReferenceValue"
              />
            </div>
            <div class="mt-7 relative group cursor-pointer">
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
                >Quantity For Chains</label
              >
              <AdditionalDropdown
                :items="quantityChains"
                :selectedLabel="quantitySelectedLabel"
                @getValue="getQuantityValue"
              />
            </div>
            <div class="mt-7 group relative cursor-pointer">
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
            <div class="flex flex-col gap-y-4">
              <div>
                <label
                  for="email"
                  class="block mb-1 text-sm font-medium text-[#1B1B1B]"
                  >Quantity For Straps</label
                >
                <AdditionalDropdown
                  :items="quantityStraps"
                  :selectedLabel="quantityStrapsSelectedLabel"
                  @getValue="getQuantityStrapsValue"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-1 text-sm font-medium text-[#1B1B1B]"
                  >Quantity For Tarps</label
                >
                <AdditionalDropdown
                  :items="quantityTarps"
                  :selectedLabel="quantityTarpsSelectedLabel"
                  @getValue="getQuantityTarpsValue"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-1 text-sm font-medium text-[#1B1B1B]"
                  >Restricted Time</label
                >
                <AdditionalDropdown
                  :items="restrictedTime"
                  :selectedLabel="restricltedSelectedLabel"
                  @getValue="getRestrictedValue"
                />
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
                    v-for="(label, index) in labels"
                    :key="index"
                    :label="label"
                    :isSelected="isLabelSelected(label)"
                    @select="toggleLabel"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Additional>
      <Additional @click="step3Next" v-if="modal.step3">
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
              {{ selectedItem }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step1'), closeModal('step3');
                }
              "
            >
              {{ modeSelectedItem }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span class="text-[12px] font-semibold text-[#000000]">
              Add Address
            </span>
          </div>
        </template>
        <template #content>
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
                  name="CompanyName"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your Building Name"
                  v-model="addressDetails.buildinName"
                />
              </div>
              <div>
                <label
                  for="companyName"
                  class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                  >Postal Code</label
                >
                <input
                  type="number"
                  name="CompanyName"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your Postal Code"
                  v-model="addressDetails.postalCode"
                />
              </div>
              <div>
                <label
                  for="companyName"
                  class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                  >Lane Number</label
                >
                <input
                  type="number"
                  name="CompanyName"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your Lane Number"
                  v-model="addressDetails.laneNumber"
                />
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
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
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
                  name="ContactName"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your Contact name"
                  v-model="contactDetails.contactName"
                />
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
                  placeholder="Your Contact Email"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  v-model="contactDetails.contactEmail"
                />
              </div>

              <div>
                <label
                  for="ContactNo"
                  class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                  >Contact No.</label
                >
                <label class="xl:w-[382px] relative flex cursor-pointer">
                  <div class="flex justify-between">
                    <img
                      src="@/static/svg/usa-flag.svg"
                      alt=""
                      class="absolute ml-3 mb-3 mr-4 top-4 w-6 h-6"
                    />
                    <span
                      class="absolute left-12 mb-3 mr-4 top-4 text-[#1E1E1E] font-normal text-base"
                      >+1</span
                    >
                    <div
                      class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                    ></div>
                    <input
                      type="number"
                      name="ContactNo"
                      id="ContactNo"
                      placeholder="Your Contact No."
                      class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                      v-model="contactDetails.contactNumber"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </template>
      </Additional>
      <Additional @click="step4Next" v-if="modal.step4">
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
              {{ selectedItem }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step1'), closeModal('step4');
                }
              "
            >
              {{ modeSelectedItem }}
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
              Add Address
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span class="text-[12px] font-semibold text-[#000000]">
              Select Address
            </span>
          </div>
        </template>
        <template #content>
          <div>
            <h1 class="text-[#00000099] font-normal text-base mt-4 mb-4">
              PICKUP LOCATIONS
            </h1>
            <div class="ml-6 mr-7">
              <VueSlickCarousel v-bind="settings" class="flex justify-center">
                <AdditionalAddress
                  v-for="(item, index) of pickupLocation"
                  :key="index"
                  :item="item"
                  :isSelected="item.title === selectedPickupItem"
                  @select="selectPickupItem"
                />
              </VueSlickCarousel>
            </div>
          </div>
          <div>
            <h1 class="text-[#00000099] font-normal text-base mt-4 mb-4">
              DROP LOCATIONS
            </h1>
            <div class="ml-6 mr-7">
              <VueSlickCarousel v-bind="settings" class="">
                <AdditionalAddress
                  v-for="(item, index) of dropLocation"
                  :key="index"
                  :item="item"
                  :isSelected="item.title === selectedDropItem"
                  @select="selectDropItem"
                />
              </VueSlickCarousel>
            </div>
          </div>
        </template>
      </Additional>
      <Additional
        @click="step5Next"
        v-if="modal.step5"
        :class="isRequestSuccess ? 'blur-background' : ''"
      >
        <template #header>
          <div class="flex items-center gap-2 cursor-pointer">
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step1'), closeModal('step5');
                }
              "
            >
              {{ selectedItem }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step1'), closeModal('step5');
                }
              "
            >
              {{ modeSelectedItem }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step3'), closeModal('step5');
                }
              "
            >
              Add Address
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step4'), closeModal('step5');
                }
              "
            >
              Select Address
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span class="text-[12px] font-semibold text-[#000000]">
              Movement Detail
            </span>
          </div>
        </template>
        <template #content>
          <div class="grid grid-cols-2 mt-9">
            <div class="border-r border-[#EEEEEE] px-7">
              <h1 class="text-[#000000] font-bold text-lg mb-4">
                Amount Details
              </h1>
              <div class="flex justify-between">
                <div>
                  <h1 class="font-semibold text-[29px] text-[#1E1E1E]">
                    $456.56
                  </h1>
                  <p class="text-[#00000099] font-normal text-xs pb-6">
                    Additional charges may apply*
                  </p>
                </div>
                <div>
                  <p class="text-[#000000] font-normal text-sm mt-2">
                    Payment Mode: Cash
                  </p>
                </div>
              </div>
              <div
                class="w-full relative before:absolute before:inset-x-0 before:bottom- before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
              ></div>
              <h1 class="text-[#000000] font-bold text-lg mb-4 mt-5">
                Service Details
              </h1>
              <div class="grid grid-cols-2 gap-y-5">
                <div>
                  <p class="text-[#00000099] font-normal text-sm">
                    Movement ID
                  </p>
                  <span class="text-[#1E1E1E] font-medium text-base"
                    >IDFCSGCMD23567890</span
                  >
                </div>
                <div>
                  <p class="text-[#00000099] font-normal text-sm">
                    Location ID
                  </p>
                  <span class="text-[#1E1E1E] font-medium text-base">MX</span>
                </div>
                <div>
                  <p class="text-[#00000099] font-normal text-sm mb-1">
                    Location
                  </p>
                  <span
                    class="text-white font-medium text-base bg-[#0060C9] rounded-lg py-1 px-2"
                    >Northbound</span
                  >
                </div>
                <div>
                  <p class="text-[#00000099] font-normal text-sm">
                    Transportation Type
                  </p>
                  <span class="text-[#1E1E1E] font-medium text-base">{{
                    service.transportationType?.title
                  }}</span>
                </div>
                <div>
                  <p class="text-[#00000099] font-normal text-sm">
                    Mode of Transportation
                  </p>
                  <span class="text-[#1E1E1E] font-medium text-base">{{
                    service.modeOfTransportation?.title
                  }}</span>
                </div>
                <div>
                  <p class="text-[#00000099] font-normal text-sm">
                    User Reference
                  </p>
                  <span class="text-[#1E1E1E] font-medium text-base">{{
                    service.userReference
                  }}</span>
                </div>
                <div>
                  <p class="text-[#00000099] font-normal text-sm">
                    Bridge of Crossing
                  </p>
                  <span class="text-[#1E1E1E] font-medium text-base">{{
                    service.port_BridgeOfCrossing
                  }}</span>
                </div>
              </div>
            </div>
            <div class="px-9">
              <h1 class="text-[#00000099] font-normal text-sm">
                Special Requirements
              </h1>
              <div class="mt-1">
                <div class="flex flex-wrap gap-2">
                  <p
                    class="bg-[#0060C91A] px-2.5 rounded-[100px] flex items-center py-[2px]"
                    v-for="(item, index) in selectedLabels"
                    :key="index"
                  >
                    <span class="text-[#0060C9] text-base font-semibold">
                      {{ item }}
                    </span>
                  </p>
                </div>
              </div>
              <div class="mt-6 mb-6">
                <p class="text-[#00000099] font-normal text-sm">Quantity</p>
                <p class="font-semibold text-base text-[#1E1E1E]">
                  {{ service.quantityForChains }},
                  {{ service.quantityForStraps }},
                  {{ service.quantityForTarps }}
                </p>
              </div>
              <div class="mb-5">
                <p class="text-[#00000099] font-normal text-sm">
                  Scheduled Time
                </p>
                <p class="font-semibold text-base text-[#1E1E1E]">
                  {{ service.schedule?.time }}
                  14 Dec, Monday 2023, 12:40 PM
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
                  <div class="flex justify-between mt-3">
                    <div>
                      <p class="text-[#1E1E1E] font-semibold text-sm">
                        1226 University Dr
                      </p>
                      <p class="text-[#1B1B1B] font-medium text-xs">
                        Menlo Park, CA 94025, USA
                      </p>
                    </div>
                    <div>
                      <p class="text-[#1E1E1E] font-normal text-xs">
                        Sunil Mayekar, +33 32572 48242
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-6">
                  <p class="text-[#00000099] font-normal text-sm">
                    DROP LOCATION
                  </p>
                  <div class="flex justify-between mt-3">
                    <div>
                      <p class="text-[#1E1E1E] font-semibold text-sm">
                        1226 University Dr
                      </p>
                      <p class="text-[#1B1B1B] font-medium text-xs">
                        Menlo Park, CA 94025, USA
                      </p>
                    </div>
                    <div>
                      <p class="text-[#1E1E1E] font-normal text-xs">
                        Sunil Mayekar, +33 32572 48242
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Additional>
      <Additional v-if="modal.step6" :isShowButton="false">
        <template #content>
          <div>
            <div class="mt-4 flex justify-center">
              <img
                src="@/static/Images/parcel-verification-checklist.webp"
                alt=""
              />
            </div>
            <div class="">
              <p class="text-[#1E1E1E] font-semibold text-2xl mt-3 text-center">
                Request is in process
              </p>
              <p class="mt-3 text-[#4B4B4B] font-light text-sm text-center">
                Thanks for requesting to our service, Please give us some time
                to look.
              </p>
            </div>
            <div class="flex justify-center">
              <button
                @click="requestProcess"
                class="font-semibold text-base text-white bg-[#0060C9] rounded-xl py-[15px] px-[87px] mt-6 mb-5 focus:outline-none"
              >
                View Request
              </button>
            </div>
            <div class="mt-2 mb-6">
              <VueSlickCarousel v-bind="cargoWorkSettings">
                <div
                  v-for="(item, index) of cargoWorks"
                  :key="index"
                  class="bg-[#F5F9FD] px-4 py-[15px] rounded-2xl"
                >
                  <p class="font-medium text-base text-[#4B4B4B]">
                    {{ item.title }}
                  </p>
                  <p class="text-[#4B4B4B] font-light text-sm mt-1">
                    {{ item.description }}
                  </p>
                </div>
              </VueSlickCarousel>
            </div>
          </div>
        </template>
      </Additional>
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
      schedule: {
        date: new Date(),
        time: "",
      },
      addressDetails: {
        buildinName: "",
        postalCode: 0,
        laneNumber: 0,
        additionalDetails: "",
      },
      contactDetails: {
        contactName: "",
        contactEmail: "",
        contactNumber: 0,
      },
      selectedLabels: [],
      selectedItem: "FTL",
      selectedPickupItem: "",
      selectedDropItem: "",
      modeSelectedItem: "",
      portSelectedLabel: "Select option",
      programeSelectedLabel: "Select option",
      restricltedSelectedLabel: "Select option",
      quantitySelectedLabel: "Select option",
      userReferenceSelectedLabel: "Select option",
      quantityStrapsSelectedLabel: "Select option",
      quantityTarpsSelectedLabel: "Select option",
      isRequestSuccess: false,
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
      customTimeFormat: "h : mm a",
      timeOptions: {
        start: "00:00",
        step: "30",
        end: "23:59",
      },
      transportationType: [
        {
          title: "FTL",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
          _id: "66c43302a7eb5f1b0de6fae1",
        },
        {
          title: "LTL",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
          _id: "66c43302a7eb5f1b0de6fae2",
        },
      ],
      modeOfTransportation: {
        FTL: [
          {
            title: "Dry Box",
            description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
            _id: "66c43302a7eb5f1b0de6fae3",
          },
          {
            title: "Reefer",
            description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
            _id: "66c43302a7eb5f1b0de6fae4",
          },
          {
            title: "Flatbed",
            description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
            _id: "66c43302a7eb5f1b0de6fae5",
          },
          {
            title: "Lowboy",
            description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
            _id: "66c43302a7eb5f1b0de6fae6",
          },
          {
            title: "Semi-Lowbo",
            description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
            _id: "66c43302a7eb5f1b0de6fae7",
          },
        ],
        LTL: [
          {
            title: "Pickup",
            description: "Max weight: 12TON",
            _id: "66daecb1b2d06b6024ad87cf",
          },
          {
            title: "One Ton / 4 PLT",
            description:
              "Lorem ipsum dolor sit amet consectetur, Mauris risus turpis.",
            _id: "66daecb1b2d06b6024ad87d0",
          },
          {
            title: "12 Footer",
            description:
              "Lorem ipsum dolor sit amet consecteturr Mauris risus turpis.",
            _id: "66daecb1b2d06b6024ad87d1",
          },
          {
            title: "16 Footer",
            description:
              "Lorem ipsum dolor sit amet consecteturr Mauris risus turpis.",
            _id: "66daecb1b2d06b6024ad87d2",
          },
          {
            title: "18 Footer",
            description:
              "Lorem ipsum dolor sit amet consecteturr Mauris risus turpis.",
            _id: "66daecb1b2d06b6024ad87d3",
          },
          {
            title: "20 Footer",
            description:
              "Lorem ipsum dolor sit amet consecteturr Mauris risus turpis.",
            _id: "66daecb1b2d06b6024ad87d4",
          },
          {
            title: "Bobtail 22 footer",
            description:
              "Lorem ipsum dolor sit amet consecteturr Mauris risus turpis.",
            _id: "66daecb1b2d06b6024ad87d5",
          },
          {
            title: "Bobtail 26 footer",
            description:
              "Lorem ipsum dolor sit amet consecteturr Mauris risus turpis.",
            _id: "66daecb1b2d06b6024ad87d6",
          },
        ],
      },
      cargoWorks: [
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
        {
          title: " How Cargoconnects works?",
          description:
            " Lorem ipsum dolor sit amet consectetur. Nunc tortor nibh ornare bibendum viverra amet amet risus.",
        },
      ],
      cargoWorkSettings: {
        speed: 500,
        slidesToShow: 1,
        dots: true,
        swipeToSlide: false,
        centerMode: true,
        centerPadding: "0px",
        arrows: false,
        // autoplay: true,
        autoplaySpeed: 2000,
      },
      settings: {
        speed: 500,
        slidesToShow: 3,
        dots: false,
        swipeToSlide: false,
        centerMode: true,
        centerPadding: "0px",
        arrows: true,
        // autoplay: true,
        // autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 1,
            },
          },
        ],
      },
      pickupLocation: [
        {
          title: "1226 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
        {
          title: "12262 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
        {
          title: "12263 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
        {
          title: "12264 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
        {
          title: "12265 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
      ],
      dropLocation: [
        {
          title: "1226 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
        {
          title: "12262 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
        {
          title: "12263 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
        {
          title: "12264 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
        {
          title: "12265 University Dr",
          address: "Menlo Park, CA 94025, USA",
          details: "Sunil Mayekar, +33 32572 48242",
        },
      ],
      labels: [
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
      portList: [
        {
          label: "Test 1",
        },
        {
          label: "Test 2",
        },
      ],
      programingList: [
        {
          label: "Schedule",
        },
        {
          label: "Instant",
        },
      ],
      restrictedTime: [
        {
          label: "Yes",
        },
        {
          label: "No",
        },
      ],
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
        { label: "10" },
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
        { label: "10" },
      ],
      userReference: [],
    };
  },
  computed: {
    ...mapGetters({
      serviceData: "service/getService",
    }),
    ...mapState({
      modal: (state) => state.service.modal,
    }),
    formatRef() {
      return this.userReference.map((user) => {
        return { label: user?.contactName };
      });
    },
  },
  methods: {
    ...mapActions({
      fetchService: "service/fetchService",
      fetchServiceReference: "service/fetchServiceReference",
      openModal: "service/openModal",
      closeModal: "service/closeModal",
      previousStep: "service/previousStep",
    }),
    isLabelSelected(label) {
      return this.selectedLabels?.includes(label);
    },
    toggleLabel(label) {
      if (this.selectedLabels.includes(label)) {
        this.selectedLabels = this.selectedLabels.filter(
          (selected) => selected !== label
        );
      } else {
        this.selectedLabels.push(label);
      }
    },
    getPortValue(item) {
      this.portSelectedLabel = item.label;
    },
    getQuantityValue(item) {
      this.quantitySelectedLabel = item.label;
    },
    getQuantityStrapsValue(item) {
      this.quantityStrapsSelectedLabel = item.label;
    },
    getQuantityTarpsValue(item) {
      this.quantityTarpsSelectedLabel = item.label;
    },
    getProgramingValue(item) {
      this.programeSelectedLabel = item.label;
    },
    getRestrictedValue(item) {
      this.restricltedSelectedLabel = item.label;
    },
    selectItem(item) {
      this.selectedItem = item.title;
    },
    selectPickupItem(item) {
      this.selectedPickupItem = item.title;
    },
    selectDropItem(item) {
      this.selectedDropItem = item.title;
    },
    modeSelectItem(item) {
      this.modeSelectedItem = item.title;
    },
    getUserReferenceValue(item) {
      this.userReferenceSelectedLabel = item.label;
    },

    step1Next() {
      const selectedType = this.transportationType.find(
        (item) => item.title === this.selectedItem
      );
      const selectedMode = this.modeOfTransportation[this.selectedItem].find(
        (item) => item.title === this.modeSelectedItem
      );

      this.service.transportationType = selectedType;
      this.service.modeOfTransportation = selectedMode;
      console.log(this.service, "this.service");
      this.closeModal("step1");
      this.openModal("step2");
    },
    step2Next() {
      this.service.port_BridgeOfCrossing = this.portSelectedLabel;
      this.service.userReference = this.userReferenceSelectedLabel;
      this.service.specialRequirements = this.selectedLabels;
      this.service.quantityForChains = this.quantitySelectedLabel;
      this.service.quantityForStraps = this.quantityStrapsSelectedLabel;
      this.service.quantityForTarps = this.quantityTarpsSelectedLabel;
      this.service.restrictedTime = this.restricltedSelectedLabel;
      this.service.schedule = this.schedule;
      console.log(this.service, "this.service");
      this.closeModal("step2");
      this.openModal("step3");
    },
    step3Next() {
      this.service.addressDetails = this.addressDetails;
      this.service.contactDetails = this.contactDetails;
      console.log(this.service, "this.service");
      this.closeModal("step3");
      this.openModal("step4");
    },
    step4Next() {
      const selectedType = this.pickupLocation.find(
        (item) => item.title === this.selectedPickupItem
      );
      this.service.restrictedTime = selectedType;

      this.closeModal("step4");
      this.openModal("step5");
    },
    step5Next() {
      this.closeModal("step4");
      this.isRequestSuccess = true;
      document.body.style.overflow = "hidden";
    },
    closeRequestSuccessModal() {
      this.isRequestSuccess = false;
      document.body.style.overflow = "";
    },
    handleClick() {
      this.closeModal("step5");
      this.isRequestSuccess = false;
      this.openModal("step6");
      document.body.style.overflow = "";
    },
    requestProcess() {
      console.log("success");
    },
    prevPage() {
      if (this.modal.step1 === true) {
        this.$router.push("/");
      } else {
        this.previousStep();
      }
    },
  },
  async mounted() {
    try {
      // await this.fetchService();
    } catch (error) {
      console.log(error);
      this.$toast.open({
        message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
        type: "error",
      });
    }
    try {
      const res = await this.fetchServiceReference();
      this.userReference = res.data.commercialReference;
    } catch (error) {
      console.log(error);
      this.$toast.open({
        message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
        type: "error",
      });
    }
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
</style>
