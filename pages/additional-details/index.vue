<template>
  <div>
    <div>
      <AdditionalHero @prevPage="prevPage" />
    </div>
    <div class="px-10 py-10">
      <div>
        <Additional @click="handleService" v-if="modal.step1">
          <template #content>
            <h1 class="font-bold text-[18px] text-[#000000]">
              Services for you
            </h1>
            <p class="text-base font-medium text-gray-400">
              4 different type of service you can opt
            </p>
            <div class="flex items-center">
              <p class="text-sm text-[#151515] font-normal mt-3 mb-3">
                Type of Services
              </p>
              <div
                class="h-full mx-2 w-[86%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
              ></div>
            </div>
            <div class="grid grid-cols-2 gap-7">
              <TypeOfTransportation
                v-for="(item, index) of serviceData?.typeOfService"
                :key="index"
                :item="item"
                :isSelected="item.title === selectedServiceItem"
                @select="selectTypeOfService"
              />
            </div>
          </template>
        </Additional>
      </div>

      <Additional @click="step1Next" v-if="modal.step2">
        <template #header>
          <div class="flex items-center gap-2 cursor-pointer mb-3">
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step1'), closeModal('step2');
                }
              "
            >
              Service
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
          </div>
        </template>
        <template #content>
          <h1 class="font-bold text-[18px] text-[#000000]">
            Choose Additional Details
          </h1>
          <p class="text-base font-medium text-gray-400">
            Lorem ipsum dolor sit amet consectetur. Digni quam ullamcorper
          </p>
          <div class="flex items-center">
            <p class="text-sm text-[#151515] font-normal mt-3 mb-3">
              Port & Bridge of Crossing
            </p>
            <div
              class="h-full mx-2 w-[84%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
            ></div>
          </div>
          <div class="grid grid-cols-2 gap-7">
            <TypeOfTransportation
              v-for="(item, index) of portList"
              :key="index"
              :item="item"
              :isSelected="item.title === portSelectedLabel"
              @select="selectTypeOfTransportationItemPortItem"
            />
          </div>
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
              v-for="(item, index) of serviceData?.typeOfTransportation"
              :key="index"
              :item="item"
              :isSelected="item.title === selectedItem"
              @select="selectTypeOfTransportationItem"
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
              v-for="(item, index) of serviceData?.modeOfTransportation?.FTL"
              :key="index"
              :item="item"
              :isSelected="item.title === modeSelectedItem"
              @select="modeSelectItem"
            />
            <ModeOfTransportation
              v-if="selectedItem === 'LTL'"
              v-for="(item, index) of serviceData?.modeOfTransportation?.LTL"
              :key="index"
              :item="item"
              :isSelected="item.title === modeSelectedItem"
              @select="modeSelectItem"
            />
          </div>
        </template>
      </Additional>
      <Additional @click="step2Next" v-if="modal.step3">
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
              {{ selectedItem }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span class="text-[12px] font-semibold text-[#000000]">
              {{ modeSelectedItem }}
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
                :selectedLabel="userReferenceSelectedLabel"
                @getValue="getUserReferenceValue"
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
                >Quantity For Chains</label
              >
              <AdditionalDropdown
                :items="quantityChains"
                :selectedLabel="quantitySelectedLabel"
                @getValue="getQuantityValue"
              />
            </div>

            <div
              class="relative group cursor-pointer"
              v-if="programeSelectedLabel === 'Schedule'"
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
                :selectedLabel="quantityStrapsSelectedLabel"
                @getValue="getQuantityStrapsValue"
              />
            </div>
            <div
              class="group relative cursor-pointer"
              v-if="programeSelectedLabel === 'Schedule'"
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
      <Additional
        @click="step3Next"
        :isSkipButton="true"
        @skip="skipUserAddress"
        v-if="modal.step4"
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
              {{ selectedItem }}
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
                  :class="
                    errors?.buildinName
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                  name="CompanyName"
                  class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your Building Name"
                  v-model="formData.addressDetails.buildinName"
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
                  v-model="formData.addressDetails.postalCode"
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
                  v-model="formData.addressDetails.laneNumber"
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
                  :class="
                    errors?.additionalDetails
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                  name="CompanyName"
                  class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
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
                  v-model="formData.contactDetails.contactName"
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
                  v-model="formData.contactDetails.contactEmail"
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
                <label
                  class="xl:w-[382px] relative flex cursor-pointer flex-col"
                >
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
                      class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                      v-model="formData.contactDetails.contactNumber"
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

      <Additional @click="step4Next" v-if="modal.step5">
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
              Service
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step2'), closeModal('step5');
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
                  openModal('step3'), closeModal('step5');
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
                  openModal('step4'), closeModal('step5');
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
              <VueSlickCarousel
                v-if="locations && locations.length"
                v-bind="settings"
                class="flex justify-center"
              >
                <AdditionalAddress
                  v-for="(item, index) of locations"
                  :key="index"
                  :item="item"
                  :isSelected="selectedPickup(item._id)"
                  @select="selectPickupItem(item._id)"
                  @getUserAddress="getEditUserAddress"
                />
              </VueSlickCarousel>
            </div>
          </div>
          <div>
            <h1 class="text-[#00000099] font-normal text-base mt-4 mb-4">
              DROP LOCATIONS
            </h1>
            <div class="ml-6 mr-7">
              <VueSlickCarousel
                v-if="locations && locations.length"
                v-bind="settings"
                class="flex justify-center"
              >
                <AdditionalAddress
                  v-for="(item, index) of locations"
                  :key="index"
                  :item="item"
                  :isSelected="selectedDrop(item._id)"
                  @select="selectDropItem(item._id)"
                  @updateUserAddress="getEditUserAddress"
                />
              </VueSlickCarousel>
            </div>
          </div>
        </template>
      </Additional>
      <Additional
        @click="step5Next"
        v-if="modal.step6"
        :class="isRequestSuccess ? 'blur-background' : ''"
      >
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
                  openModal('step2'), closeModal('step6');
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
                  openModal('step3'), closeModal('step6');
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
                  openModal('step4'), closeModal('step6');
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
                  openModal('step5'), closeModal('step6');
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
                  <span class="text-[#1E1E1E] font-medium text-base">{{
                    movementId
                  }}</span>
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
                    >{{ selectedLocation?.title }}</span
                  >
                </div>
                <div>
                  <p class="text-[#00000099] font-normal text-sm">
                    Transportation Type
                  </p>
                  <span class="text-[#1E1E1E] font-medium text-base">{{
                    transportationData?.title
                  }}</span>
                </div>
                <div>
                  <p class="text-[#00000099] font-normal text-sm">
                    Mode of Transportation
                  </p>
                  <span class="text-[#1E1E1E] font-medium text-base">{{
                    modeofTransportationData?.title
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
                  {{ service.quantityForChains }}xChains,
                  {{ service.quantityForStraps }}xStraps,
                  {{ service.quantityForTarps }}xTarps
                </p>
              </div>
              <div class="mb-5">
                <p class="text-[#00000099] font-normal text-sm">
                  Scheduled Time
                </p>
                <p class="font-semibold text-base text-[#1E1E1E]">
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
        </template>
      </Additional>
      <Additional v-if="modal.step7" :isShowButton="false">
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
      <Additional @click="EditUserAddress" v-if="modal.step8">
        <template #header>
          <div class="flex items-center gap-2 cursor-pointer">
            <span
              class="text-[12px] font-semibold text-[#000000]"
              @click="
                {
                  openModal('step1'), closeModal('step8');
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
                  openModal('step2'), closeModal('step8');
                }
              "
            >
              {{ modeSelectedItem }}
            </span>
            <img src="@/static/svg/short-side-arrow.svg" alt="" class="" />
            <span class="text-[12px] font-semibold text-[#000000]">
              Edit Address
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
                  v-model="formData.addressDetails.buildinName"
                />
                <span v-if="errors.buildinName" class="error-msg">{{
                  errors.buildinName
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
                  name="CompanyName"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your Postal Code"
                  v-model="formData.addressDetails.postalCode"
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
                  name="CompanyName"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your Lane Number"
                  v-model="formData.addressDetails.laneNumber"
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
                  for="ContactName"
                  class="block mb-2 text-sm font-medium text-[#1B1B1B]"
                  >Contact name</label
                >
                <input
                  type="text"
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
                  v-model="formData.contactDetails.contactEmail"
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
                <label
                  class="xl:w-[382px] relative flex cursor-pointer flex-col"
                >
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
                      placeholder="Your Contact No."
                      class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                      v-model="formData.contactDetails.contactNumber"
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
        date: "",
        time: "",
      },
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
      selectedLabels: [],
      selectedItem: "FTL",
      selectedServiceItem: "",
      selectedPickupItem: [],
      selectedDropItem: [],
      modeSelectedItem: "",
      portSelectedLabel: "",
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
      },
      settings: {
        speed: 500,
        slidesToShow: 3,
        dots: false,
        swipeToSlide: false,
        centerMode: true,
        centerPadding: "0px",
        arrows: true,
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
      locations: [],
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
          title: "Test 1",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
        },
        {
          title: "Test 2",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
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
      userReference: [],
      typeOfService: [],
      errors: {},
      selectedLocation: null,
      movementId: null,
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
        return {
          label: user?.accountId,
          contactName: user.contactName,
        };
      });
    },
    selectedDropAddresses() {
      const selectedDropLoc =
        this.locations.length > 0
          ? this.locations.filter((item) =>
              this.selectedDropItem.includes(item._id)
            )
          : [];

      return selectedDropLoc;
    },
    selectedPickupAddresses() {
      const selectedPickupLoc =
        this.locations.length > 0
          ? this.locations.filter((item) =>
              this.selectedPickupItem.includes(item._id)
            )
          : [];

      return selectedPickupLoc;
    },
    modeofTransportationData() {
      const modeofTransportationId = this.serviceData?.modeOfTransportation?.[
        this.selectedItem
      ]?.find((item) => item.title === this.modeSelectedItem);

      if (!modeofTransportationId?._id) return null;

      return (
        this.serviceData?.modeOfTransportation?.[this.selectedItem]?.find(
          (item) => item._id === modeofTransportationId?._id
        ) || null
      );
    },
    transportationData() {
      const transportationId = this.service?.typeOfTransportation;
      if (!transportationId) return null;

      return this.serviceData?.typeOfTransportation?.find(
        (item) => item._id === transportationId
      );
    },
  },
  methods: {
    ...mapActions({
      fetchService: "service/fetchService",
      fetchServiceReference: "service/fetchServiceReference",
      fetchUserAddress: "service/fetchUserAddress",
      createOrder: "service/createOrder",
      fetchEditUserAddress: "service/fetchEditUserAddress",
      updateUserAddress: "service/updateUserAddress",
      createUserAddress: "service/createUserAddress",
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
    selectTypeOfTransportationItemPortItem(item) {
      this.portSelectedLabel = item.title;
    },
    getCountry(item) {
      this.formData.contactDetails.countryCode = item.value;
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
    selectTypeOfTransportationItem(item) {
      this.selectedItem = item.title;
    },
    selectTypeOfService(item) {
      this.selectedServiceItem = item.title;
      this.selectedLocation = item;
    },
    selectedPickup(id) {
      return this.selectedPickupItem?.includes(id);
    },
    selectPickupItem(id) {
      if (this.selectedPickupItem.includes(id)) {
        this.selectedPickupItem = this.selectedPickupItem.filter(
          (selectedId) => selectedId !== id
        );
      } else {
        this.selectedPickupItem.push(id);
      }
    },
    selectedDrop(id) {
      return this.selectedDropItem?.includes(id);
    },
    selectDropItem(id) {
      if (this.selectedDropItem.includes(id)) {
        this.selectedDropItem = this.selectedDropItem.filter(
          (selectedId) => selectedId !== id
        );
      } else {
        this.selectedDropItem.push(id);
      }
    },
    modeSelectItem(item) {
      this.modeSelectedItem = item.title;
    },
    getUserReferenceValue(item) {
      this.userReferenceSelectedLabel = item.label;
    },
    handleService() {
      this.closeModal("step1");
      this.openModal("step2");
    },
    step1Next() {
      const selectedType = this.serviceData?.typeOfTransportation?.find(
        (item) => item.title === this.selectedItem
      );
      const selectedMode = this.serviceData?.modeOfTransportation?.[
        this.selectedItem
      ]?.find((item) => item.title === this.modeSelectedItem);

      this.service.port_BridgeOfCrossing = this.portSelectedLabel;

      this.service.typeOfTransportation = selectedType?._id;
      if (this.selectedItem === "FTL") {
        this.service.modeOfTransportation = {
          ...this.service.modeOfTransportation,
          FTL: selectedMode ? selectedMode._id : null,
        };
      } else if (this.selectedItem === "LTL") {
        this.service.modeOfTransportation = {
          ...this.service.modeOfTransportation,
          LTL: selectedMode ? selectedMode._id : null,
        };
      }
      this.closeModal("step2");
      this.openModal("step3");
      this.getUserRererence();
    },
    step2Next() {
      if (this.userReferenceSelectedLabel === "Select option") {
        this.service.userReference = this.userReferenceSelectedLabel = "";
      } else {
        this.service.userReference = this.userReferenceSelectedLabel;
      }
      this.service.specialRequirements = this.selectedLabels;
      if (this.quantitySelectedLabel === "Select option") {
        this.service.quantityForChains = this.quantitySelectedLabel = "";
      } else {
        this.service.quantityForChains = this.quantitySelectedLabel;
      }
      if (this.quantityStrapsSelectedLabel === "Select option") {
        this.service.quantityForStraps = this.quantityStrapsSelectedLabel = "";
      } else {
        this.service.quantityForStraps = this.quantityStrapsSelectedLabel;
      }
      if (this.quantityTarpsSelectedLabel === "Select option") {
        this.service.quantityForTarps = this.quantityTarpsSelectedLabel = "";
      } else {
        this.service.quantityForTarps = this.quantityTarpsSelectedLabel;
      }
      if (this.restricltedSelectedLabel === "Select option") {
        this.service.restrictedTime = this.restricltedSelectedLabel = "";
      } else {
        this.service.restrictedTime = this.restricltedSelectedLabel;
      }

      this.service.schedule = this.schedule;
      if (this.programeSelectedLabel === "Select option") {
        this.service.programming = this.programeSelectedLabel = "";
      } else {
        this.service.programming = this.programeSelectedLabel;
      }
      this.closeModal("step3");
      this.openModal("step4");
    },
    async step3Next() {
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
    async EditUserAddress() {
      try {
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
    step4Next() {
      this.service.pickUpAddressIds = this.selectedPickupItem;
      this.service.dropAddressIds = this.selectedDropItem;
      this.service.typeOfService = this.selectedLocation?._id;
      this.movementId = this.$generateNumOrCharId();
      this.service.movementId = this.movementId;
      this.closeModal("step5");
      this.openModal("step6");
    },
    async step5Next() {
      try {
        const res = await this.createOrder(this.service);
        this.$toast.open({
          message: res.msg,
        });
        this.$cookies.remove("service");
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
      this.closeModal("step6");
      this.isRequestSuccess = true;
      document.body.style.overflow = "hidden";
    },
    closeRequestSuccessModal() {
      this.isRequestSuccess = false;
      document.body.style.overflow = "";
    },
    handleClick() {
      this.closeModal("step6");
      this.isRequestSuccess = false;
      this.openModal("step8");
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
    async getUserRererence() {
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
  },
  async mounted() {
    document.body.style.backgroundColor = "#ECF3FA";
    const cookieDataRaw = this.$cookies.get("service");

    if (cookieDataRaw) {
      try {
        const cookieData = JSON.parse(cookieDataRaw);
        this.selectedServiceItem = cookieData.title;
        this.selectedLocation = cookieData;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    }
    await this.getServices();
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
