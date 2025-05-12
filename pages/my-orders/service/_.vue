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
    <div
      class="mt-5"
      v-if="
        orderData?.typeOfService?.title === 'Northbound Service' ||
        orderData?.typeOfService?.title === 'Southbound'
      "
    >
      <h1 class="text-[#000000] font-bold text-lg mb-4">User documents</h1>
      <div
        class="mt-5 grid xxl:grid-cols-6 xl:grid-cols-4 sm:grid-cols-2 grid-cols-2 lg:grid-cols-3 gap-y-5 mb-10"
      >
        <UploadBox
          v-model="formData.cartaPorte"
          :filePreview="
            cartaPortepreview ||
            (orderData?.documents && orderData?.documents?.cartaPorte?.[0]) ||
            null
          "
          @file-selected="handleCartaPorteFile"
          title="CARTA PORTE"
          :fileTypes="fileTypes[orderData?.documents?.cartaPorte?.[0]]"
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.cartaPorte?.[0])
          "
        />
        <UploadBox
          v-model="formData.doda"
          :filePreview="
            dodaPreview ||
            (orderData?.documents && orderData?.documents?.doda?.[0]) ||
            null
          "
          @file-selected="handleDodaFile"
          title="DODA"
          :fileTypes="fileTypes[orderData?.documents?.doda?.[0]]"
          @downloadFileItem="downloadFileItem(orderData?.documents?.doda?.[0])"
        />

        <UploadBox
          v-if="orderData?.typeOfService?.title === 'Northbound Service'"
          v-model="formData.entry"
          :filePreview="
            entryPreview ||
            (orderData?.documents &&
              orderData?.documents?.entryPrefileInbond?.[0]) ||
            null
          "
          @file-selected="handleEntryFile"
          title="ENTRY / PREFILE / INBOND"
          :fileTypes="fileTypes[orderData?.documents?.entryPrefileInbond?.[0]]"
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.entryPrefileInbond?.[0])
          "
        />

        <UploadBox
          v-if="orderData?.typeOfService?.title === 'Southbound'"
          v-model="formData.inbond"
          :filePreview="
            inbondPreview ||
            (orderData?.documents &&
              orderData?.documents?.itnInbondNoItnNeeded?.[0]) ||
            null
          "
          @file-selected="handleInbondFile"
          title="ITN # / INBOND / NO ITN NEEDED"
          :fileTypes="
            fileTypes[orderData?.documents?.itnInbondNoItnNeeded?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.itnInbondNoItnNeeded?.[0])
          "
        />

        <UploadBox
          v-model="formData.instructions"
          :filePreview="
            instructionsPreview ||
            (orderData?.documents &&
              orderData?.documents?.letterWithInstructionsMemo?.[0]) ||
            null
          "
          @file-selected="handleInstructionsFile"
          title="LETTER WITH INSTRUCTIONS/ MEMO"
          :fileTypes="
            fileTypes[orderData?.documents?.letterWithInstructionsMemo?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(
              orderData?.documents?.letterWithInstructionsMemo?.[0]
            )
          "
        />

        <UploadBox
          v-if="
            orderData?.specialRequirements?.some((req) =>
              req.type.includes('Over Size')
            )
          "
          v-model="formData.oversizeNotification"
          :filePreview="
            oversizeNotificationPreview ||
            (orderData?.documents &&
              orderData?.documents?.oversizeNotificationUser?.[0]) ||
            null
          "
          @file-selected="handleOversizeNotificationFile"
          title="OVERSIZE NOTIFICATION USER"
          :fileTypes="
            fileTypes[orderData?.documents?.oversizeNotificationUser?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(
              orderData?.documents?.oversizeNotificationUser?.[0]
            )
          "
        />

        <UploadBox
          v-if="
            orderData?.specialRequirements?.some((req) =>
              req.type.includes('Over Weight')
            )
          "
          v-model="formData.overweightPermitUser"
          :filePreview="
            overweightPermitUserPreview ||
            (orderData?.documents &&
              orderData?.documents?.overweightPermitUser?.[0]) ||
            null
          "
          @file-selected="handleOverweightPermitUserFile"
          title="OVERWEIGHT PERMIT USER"
          :fileTypes="
            fileTypes[orderData?.documents?.overweightPermitUser?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.overweightPermitUser?.[0])
          "
        />

        <UploadBox
          v-if="
            orderData?.specialRequirements?.some((req) =>
              req.type.includes('Hazmat (USD405)')
            )
          "
          v-model="formData.hazmatBol"
          :filePreview="
            hazmatBolPreview ||
            (orderData?.documents && orderData?.documents?.hazmatBol?.[0]) ||
            null
          "
          @file-selected="handleHazmatBolFile"
          title="HAZMAT BOL"
          :fileTypes="fileTypes[orderData?.documents?.hazmatBol?.[0]]"
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.hazmatBol?.[0])
          "
        />
        <UploadBox
          v-if="
            orderData?.specialRequirements?.some((req) =>
              req.type.includes('Hazmat (USD405)')
            )
          "
          v-model="formData.hazmatSDS"
          :filePreview="
            hazmatSDSPreview ||
            (orderData?.documents &&
              orderData?.documents?.hazmatSdsSafetyDataSheet?.[0]) ||
            null
          "
          @file-selected="handleHazmatSDSFile"
          title="HAZMAT SDS (SAFETY DATA SHEET)"
          :fileTypes="
            fileTypes[orderData?.documents?.hazmatSdsSafetyDataSheet?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(
              orderData?.documents?.hazmatSdsSafetyDataSheet?.[0]
            )
          "
        />
        <UploadBox
          v-if="
            orderData?.specialRequirements?.some((req) =>
              req.type.includes('Sagarpa Inspection MX (USD 45)')
            )
          "
          v-model="formData.agriculTure"
          :filePreview="
            agriculTurePreview ||
            (orderData?.documents &&
              orderData?.documents?.sagarpaPackageAgriculture?.[0]) ||
            null
          "
          @file-selected="handleAgriculTureFile"
          title="SAGARPA PACKAGE (AGRICULTURE)"
          :fileTypes="
            fileTypes[orderData?.documents?.sagarpaPackageAgriculture?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(
              orderData?.documents?.sagarpaPackageAgriculture?.[0]
            )
          "
        />
        <UploadBox
          v-if="
            orderData?.specialRequirements?.some((req) =>
              req.type.includes('Profepa Inspection MX (USD 45)')
            )
          "
          v-model="formData.proferaPackage"
          :filePreview="
            proferaPackagePreview ||
            (orderData?.documents &&
              orderData?.documents?.profepaPackageEnvironmental?.[0]) ||
            null
          "
          @file-selected="handleProferaPackageFile"
          title="PROFEPA PACKAGE (ENVIRONMENTAL)"
          :fileTypes="
            fileTypes[orderData?.documents?.profepaPackageEnvironmental?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(
              orderData?.documents?.profepaPackageEnvironmental?.[0]
            )
          "
        />
        <UploadBox
          v-if="orderData?.typeOfTransportation?.title === 'FTL'"
          v-model="formData.intercambio"
          :filePreview="
            intercambioPreview ||
            (orderData?.documents &&
              orderData?.documents?.intercambioTrailerRelease?.[0]) ||
            null
          "
          @file-selected="handleIntercambioFile"
          title="INTERCAMBIO (TRAILER RELEASE)"
          :fileTypes="
            fileTypes[orderData?.documents?.intercambioTrailerRelease?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(
              orderData?.documents?.intercambioTrailerRelease?.[0]
            )
          "
        />
        <UploadBox
          v-if="
            orderData?.typeOfService?.title === 'Southbound' &&
            orderData?.specialRequirements?.some((req) =>
              req.type.includes('Sedena Inspection MX (USD 0)')
            )
          "
          v-model="formData.sedenaPackage"
          :filePreview="
            sedenaPackagePreview ||
            (orderData?.documents &&
              orderData?.documents?.sedenaPackage?.[0]) ||
            null
          "
          @file-selected="handleSedenaPackageFile"
          title="SEDENA PACKAGE"
          :fileTypes="fileTypes[orderData?.documents?.sedenaPackage?.[0]]"
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.sedenaPackage?.[0])
          "
        />

        <UploadBox
          v-if="
            orderData?.specialRequirements?.some((req) =>
              req.type.includes('Over Weight')
            )
          "
          v-model="formData.overweightNotification"
          :filePreview="
            overweightNotificationPreview ||
            (orderData?.documents &&
              orderData?.documents?.overweightNotification?.[0]) ||
            null
          "
          @file-selected="handleOverweightNotificationFile"
          title="OVERWEIGHT NOTIFICATION (AVISO)"
          :fileTypes="
            fileTypes[orderData?.documents?.overweightNotification?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.overweightNotification?.[0])
          "
        />

        <UploadBox
          v-model="formData.cuadernoAta"
          :filePreview="
            cuadernoAtaPreview ||
            (orderData?.documents && orderData?.documents?.cuadernoAta?.[0]) ||
            null
          "
          @file-selected="handleCuadernoAtaFile"
          title="TRUCK ORDER NOT USED (TONU) EVIDENCE"
          :fileTypes="fileTypes[orderData?.documents?.cuadernoAta?.[0]]"
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.cuadernoAta?.[0])
          "
        />

        <UploadBox
          v-if="orderData?.typeOfService?.title === 'Northbound Service'"
          v-model="formData.informalExport"
          :filePreview="
            informalExportPreview ||
            (orderData?.documents &&
              orderData?.documents?.informalExport?.[0]) ||
            null
          "
          @file-selected="handleInformalExportFile"
          title="DEMURRAGES EVIDENCES"
          :fileTypes="fileTypes[orderData?.documents?.informalExport?.[0]]"
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.informalExport?.[0])
          "
        />

        <UploadBox
          v-model="formData.proofOfDeliveryForUser"
          :filePreview="
            proofOfDeliveryForUserPreview ||
            (orderData?.documents &&
              orderData?.documents?.proofOfDeliveryForUser?.[0]) ||
            null
          "
          @file-selected="handleProofOfDeliveryFile"
          title="PROOF OF DELIVERY"
          :fileTypes="
            fileTypes[orderData?.documents?.proofOfDeliveryForUser?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.proofOfDeliveryForUser?.[0])
          "
        />
        <UploadBox
          v-model="formData.damagesDiscrepanciesForUser"
          :filePreview="
            damagesDiscrepanciesForUserPreview ||
            (orderData?.documents &&
              orderData?.documents?.damagesDiscrepanciesForUser?.[0]) ||
            null
          "
          @file-selected="handleDamagesFile"
          title="DAMAGES / DISCREPANCIES"
          :fileTypes="
            fileTypes[orderData?.documents?.damagesDiscrepanciesForUser?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(
              orderData?.documents?.damagesDiscrepanciesForUser?.[0]
            )
          "
        />
      </div>
    </div>
    <div class="mt-5" v-if="orderData?.reqDocFields?.Carrier">
      <h1 class="text-[#000000] font-bold text-lg mb-4">Carrier documents</h1>
      <p
        v-if="
          orderData?.carrierData &&
          orderData?.carrierData?.companyFormationType == 'USA'
        "
        class="text-[#1E1E1E] font-semibold text-sm"
      >
        <span class="text-[#e44747]">*Please download and review</span>
        <a
          class="bg-[#18607c] text-white font-bold px-4 rounded border-2 border-[#053549] shadow-inner"
          href="javascript:void(0)"
          @click="downloadCarrierFileItem(orderData?.carrierData?.caat)"
          >CAAT</a
        >
        <span class="text-[#e44747]">and</span>
        <a
          class="bg-[#18607c] text-white font-bold px-4 rounded border-2 border-[#053549] shadow-inner"
          href="javascript:void(0)"
          @click="downloadCarrierFileItem(orderData?.carrierData?.scac)"
          >SCAC</a
        >
        <span class="text-[#e44747]"
          >to proceed. Note that carrier assigned is a US based carrier which
          will not share a carta porte folio.*</span
        >
      </p>
      <div
        class="mt-5 grid xxl:grid-cols-6 xl:grid-cols-4 sm:grid-cols-2 grid-cols-2 lg:grid-cols-3 gap-y-5 mb-10"
      >
        <UploadBox
          v-if="
            orderData?.reqDocFields?.Carrier &&
            'cartaPorteFolio' in orderData.reqDocFields.Carrier
          "
          :isUploadMode="false"
          :filePreview="orderData?.documents?.cartaPorteFolio?.[0]"
          title="CARTA PORTE FOLIO"
          :fileTypes="fileTypes[orderData?.documents?.cartaPorteFolio?.[0]]"
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.cartaPorteFolio?.[0])
          "
        />
        <UploadBox
          v-if="
            orderData?.reqDocFields?.Carrier &&
            'aceEManifest' in orderData.reqDocFields.Carrier
          "
          :isUploadMode="false"
          :filePreview="orderData?.documents?.aceEManifest?.[0]"
          title="ACE E MANIFEST"
          :fileTypes="fileTypes[orderData?.documents?.aceEManifest?.[0]]"
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.aceEManifest?.[0])
          "
        />
        <UploadBox
          v-if="
            orderData?.reqDocFields?.Carrier &&
            'oversizePermitCarrier' in orderData.reqDocFields.Carrier
          "
          :isUploadMode="false"
          :filePreview="orderData?.documents?.oversizePermitCarrier?.[0]"
          title="OVERSIZE PERMIT CARRIER"
          :fileTypes="
            fileTypes[orderData?.documents?.oversizePermitCarrier?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.oversizePermitCarrier?.[0])
          "
        />
        <UploadBox
          v-if="
            orderData?.reqDocFields?.Carrier &&
            'overweightPermitCarrier' in orderData.reqDocFields.Carrier
          "
          :isUploadMode="false"
          :filePreview="orderData?.documents?.overweightPermitCarrier?.[0]"
          title="OVERWEIGHT PERMIT CARRIER"
          :fileTypes="
            fileTypes[orderData?.documents?.overweightPermitCarrier?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.overweightPermitCarrier?.[0])
          "
        />
        <UploadBox
          v-if="
            orderData?.reqDocFields?.Carrier &&
            'temperatureControlIn' in orderData.reqDocFields.Carrier
          "
          :isUploadMode="false"
          :filePreview="orderData?.documents?.temperatureControlIn?.[0]"
          title="TEMPERATURE CONTROL IN"
          :fileTypes="
            fileTypes[orderData?.documents?.temperatureControlIn?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.temperatureControlIn?.[0])
          "
        />

        <UploadBox
          v-if="
            orderData?.reqDocFields?.Carrier &&
            'temperatureControlOut' in orderData.reqDocFields.Carrier
          "
          :isUploadMode="false"
          :filePreview="orderData?.documents?.temperatureControlOut?.[0]"
          title="TEMPERATURE CONTROL OUT"
          :fileTypes="
            fileTypes[orderData?.documents?.temperatureControlOut?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(orderData?.documents?.temperatureControlOut?.[0])
          "
        />

        <UploadBox
          :isUploadMode="false"
          :filePreview="orderData?.documents?.proofOfDeliveryForCarrier?.[0]"
          title="PROOF OF DELIVERY"
          :fileTypes="
            fileTypes[orderData?.documents?.proofOfDeliveryForCarrier?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(
              orderData?.documents?.proofOfDeliveryForCarrier?.[0]
            )
          "
        />

        <UploadBox
          :isUploadMode="false"
          :filePreview="
            orderData?.documents?.damagesDiscrepanciesForCarrier?.[0]
          "
          title="DAMAGES / DISCREPANCIES"
          :fileTypes="
            fileTypes[orderData?.documents?.damagesDiscrepanciesForCarrier?.[0]]
          "
          @downloadFileItem="
            downloadFileItem(
              orderData?.documents?.damagesDiscrepanciesForCarrier?.[0]
            )
          "
        />
      </div>
    </div>
    <div class="grid sm:grid-cols-2 grid-cols-1 mt-9">
      <div class="border-r border-[#EEEEEE]">
        <h1 class="text-[#000000] font-bold text-lg mb-4">Amount Details</h1>
        <div class="flex justify-between">
          <div>
            <h1 class="font-semibold text-[29px] text-[#1E1E1E]">
              {{ orderData?.amountDetails?.currency
              }}{{ orderData?.amountDetails?.price.toFixed(2) }}
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
          <div v-if="orderData?.movementId">
            <p class="text-[#00000099] font-normal text-sm">Movement ID</p>
            <span class="text-[#1E1E1E] font-medium text-base">{{
              orderData?.movementId
            }}</span>
          </div>
          <div>
            <p class="text-[#00000099] font-normal text-sm">Location ID</p>
            <span class="text-[#1E1E1E] font-medium text-base">MX</span>
          </div>
          <div v-if="orderData?.typeOfService?.title">
            <p class="text-[#00000099] font-normal text-sm mb-1">Location</p>
            <span
              class="text-white font-medium text-base bg-[#0060C9] rounded-lg py-1 px-2"
              >{{ orderData?.typeOfService?.title }}</span
            >
          </div>
          <div v-if="orderData?.typeOfTransportation?.title">
            <p class="text-[#00000099] font-normal text-sm">
              Transportation Type
            </p>
            <span class="text-[#1E1E1E] font-medium text-base">{{
              orderData?.typeOfTransportation?.title
            }}</span>
          </div>
          <div v-if="orderData?.modeOfTransportation?.title">
            <p class="text-[#00000099] font-normal text-sm">
              Mode of Transportation
            </p>
            <span
              class="text-[#1E1E1E] font-medium text-base"
              v-if="orderData?.modeOfTransportation?.title"
              >{{ orderData?.modeOfTransportation?.title }}</span
            >
          </div>
          <div v-if="orderData?.userReference">
            <p class="text-[#00000099] font-normal text-sm">User Reference</p>
            <span class="text-[#1E1E1E] font-medium text-base">{{
              orderData?.userReference
            }}</span>
          </div>
          <div v-if="orderData?.trailer">
            <p class="text-[#00000099] font-normal text-sm">Trailer</p>
            <span class="text-[#1E1E1E] font-medium text-base">{{
              orderData?.trailer
            }}</span>
          </div>
          <div v-if="orderData?.port_BridgeOfCrossing">
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
        <h1
          v-if="
            orderData?.specialRequirements &&
            orderData?.specialRequirements.length > 0
          "
          class="text-[#00000099] font-normal text-sm"
        >
          Special Requirements
        </h1>
        <div
          v-if="
            orderData?.specialRequirements &&
            orderData?.specialRequirements?.length > 0
          "
          class="mt-1"
        >
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
        <div
          class="mt-6 mb-6"
          v-if="
            orderData?.quantityForChains ||
            orderData?.quantityForStraps ||
            orderData?.quantityForTarps
          "
        >
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
              <div class="flex justify-between pb-3 gap-1">
                <div>
                  <p
                    v-if="item?.addressDetails?.buildinName"
                    class="text-[#1E1E1E] font-semibold text-sm"
                  >
                    {{
                      (item?.addressDetails?.buildinName ?? "").trim().length >
                      40
                        ? (item?.addressDetails?.buildinName ?? "").substring(
                            0,
                            40
                          ) + "..."
                        : item?.addressDetails?.buildinName ?? ""
                    }}
                  </p>

                  <p
                    class="text-[#1B1B1B] font-medium text-xs"
                    v-if="item?.addressDetails?.postalCode"
                  >
                    {{ item?.addressDetails?.postalCode }}
                  </p>
                </div>
                <div>
                  <p
                    v-if="
                      item?.contactDetails?.contactName ||
                      item?.contactDetails?.contactNumber
                    "
                    class="text-[#1E1E1E] font-normal text-xs"
                  >
                    {{
                      item?.contactDetails?.contactName
                        ? item?.contactDetails?.contactName.length > 15
                          ? item?.contactDetails?.contactName.substring(0, 15) +
                            "..."
                          : item?.contactDetails?.contactName
                        : ""
                    }}
                    <span
                      v-if="
                        item?.contactDetails?.contactName &&
                        item?.contactDetails?.contactNumber
                      "
                      >,
                    </span>
                    {{ item?.contactDetails?.contactNumber ?? "" }}
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
              <div class="flex justify-between pb-3 gap-1">
                <div>
                  <p
                    v-if="item?.addressDetails?.buildinName"
                    class="text-[#1E1E1E] font-semibold text-sm"
                  >
                    {{
                      (item?.addressDetails?.buildinName ?? "").trim().length >
                      40
                        ? (item?.addressDetails?.buildinName ?? "").substring(
                            0,
                            40
                          ) + "..."
                        : item?.addressDetails?.buildinName ?? ""
                    }}
                  </p>
                  <p
                    class="text-[#1B1B1B] font-medium text-xs"
                    v-if="item?.addressDetails?.postalCode"
                  >
                    {{ item?.addressDetails?.postalCode }}
                  </p>
                </div>
                <div>
                  <p
                    v-if="
                      item?.contactDetails?.contactName ||
                      item?.contactDetails?.contactNumber
                    "
                    class="text-[#1E1E1E] font-normal text-xs"
                  >
                    {{
                      item?.contactDetails?.contactName
                        ? item?.contactDetails?.contactName.length > 15
                          ? item?.contactDetails?.contactName.substring(0, 15) +
                            "..."
                          : item?.contactDetails?.contactName
                        : ""
                    }}
                    <span
                      v-if="
                        item?.contactDetails?.contactName &&
                        item?.contactDetails?.contactNumber
                      "
                      >,
                    </span>
                    {{ item?.contactDetails?.contactNumber ?? "" }}
                  </p>
                </div>
              </div>
              <div
                class="w-full relative before:absolute before:inset-x-0 before:bottom- before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
              ></div>
            </div>
          </div>
          <div v-if="isLoad" class="mt-5 mb-4">
            <p
              class="text-[#000000] font-bold text-lg mb-2"
              v-if="!location?.lat && !location?.long"
            >
              Operator location is waiting for assignment
            </p>
            <GoogleMap
              :addressDetails="location"
              height="300px"
              :isMarkerEnabled="false"
              :isShowMarker="location?.lat && location?.long ? true : false"
              :pickUpAddressData="orderData?.pickUpAddressData"
              :dropAddressData="orderData?.dropAddressData"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full relative h-[3px] border-b py-2 border-[#EEEEEE] mt-5 mb-5"
    ></div>

    <div>
      <div class="grid grid-cols-2">
        <div v-if="orderData?.carrierData">
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
      <div class="grid sm:grid-cols-2 grid-cols-1">
        <div v-if="orderData?.operatorData">
          <h1 class="text-[#00000099] font-normal text-sm mb-3">
            Operator Info
          </h1>
          <div class="grid grid-cols-3 bg-[#F7F7F7] px-5 py-4 rounded-lg">
            <div>
              <p class="text-[#1E1E1E] font-medium text-xs">
                {{ orderData?.operatorData?.operatorName }}
              </p>
              <p class="text-[#686868] font-normal text-xs">
                (+{{ orderData?.operatorData?.countryCode }}
                {{ orderData?.operatorData?.operatorNumber }})
              </p>
            </div>
            <div>
              <p class="text-[#1E1E1E] font-medium text-xs">Driver License</p>
              <p class="text-[#686868] font-normal text-xs">
                {{ orderData?.operatorData?.usDriversLicense }}
              </p>
            </div>
          </div>
          <div
            class="w-full relative h-[3px] border-b border-[#E6E6E6] mb-6 mt-6"
          ></div>
        </div>
      </div>
      <div v-if="orderData?.qrCode?.length">
        <div class="flex flex-wrap gap-4 mt-3">
          <div v-for="(doc, key) in orderData?.qrCode" :key="key">
            <img
              v-if="
                fileTypes[doc] === 'application/pdf' || fileTypes[doc] === 'pdf'
              "
              src="@/static/svg/pdf.svg"
              alt="PDF Preview"
              class="mt-2 w-[100px] h-[100px] cursor-pointer"
              @click="downloadFileItem(doc)"
            />
            <img
              v-else-if="
                fileTypes[doc] === 'application/msword' ||
                fileTypes[doc] === 'doc' ||
                fileTypes[doc] === 'document'
              "
              src="@/static/svg/doc.svg"
              alt="DOC Preview"
              class="mt-2 w-[100px] h-[100px] cursor-pointer"
              @click="downloadFileItem(doc)"
            />

            <img
              v-else-if="
                fileTypes[doc] === 'image' ||
                fileTypes[doc] === 'jpg' ||
                fileTypes[doc] === 'jpeg' ||
                fileTypes[doc] === 'png' ||
                fileTypes[doc] === 'gif' ||
                fileTypes[doc] === 'webp'
              "
              :src="doc"
              alt="Image Preview"
              class="mt-2 w-[100px] h-[100px] cursor-pointer"
              @click="downloadFileItem(doc)"
            />
          </div>
        </div>
        <div
          class="font-normal text-sm text-[#1E1E1E] sm:max-w-[260px] max-w-[200px] mt-3"
        >
          You received an
          <span class="font-semibold">QR code </span>
          from carrier for further verification with driver.
        </div>
        <div
          class="w-full relative h-[3px] border-b border-[#E6E6E6] mb-6 mt-6"
        ></div>
      </div>
      <div
        class="flex flex-wrap gap-4 mt-3"
        v-if="orderData?.documents && orderData?.documents.length"
      >
        <div v-for="(doc, key) in orderData?.documents" :key="key">
          <img
            v-if="
              fileTypes[doc] === 'application/pdf' || fileTypes[doc] === 'pdf'
            "
            src="@/static/svg/pdf.svg"
            alt="PDF Preview"
            class="mt-2 w-[100px] h-[100px] cursor-pointer"
            @click="downloadFileItem(doc)"
          />
          <img
            v-else-if="
              fileTypes[doc] === 'application/msword' ||
              fileTypes[doc] === 'doc' ||
              fileTypes[doc] === 'document'
            "
            src="@/static/svg/doc.svg"
            alt="DOC Preview"
            class="mt-2 w-[100px] h-[100px] cursor-pointer"
            @click="downloadFileItem(doc)"
          />

          <img
            v-else-if="
              fileTypes[doc] === 'image' ||
              fileTypes[doc] === 'jpg' ||
              fileTypes[doc] === 'jpeg' ||
              fileTypes[doc] === 'png' ||
              fileTypes[doc] === 'gif' ||
              fileTypes[doc] === 'webp'
            "
            :src="doc"
            alt="Image Preview"
            class="mt-2 w-[100px] h-[100px] cursor-pointer"
            @click="downloadFileItem(doc)"
          />
        </div>
      </div>

      <div class="mt-5" v-if="$checkProofOfPhotography(orderData?.status)">
        <ProofOfPhotography :orderData="orderData" />
      </div>
    </div>
    <!-- <div
      class="flex justify-center mt-32 mb-5"
      v-if="orderData?.status != 'Completed'"
    >
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
            multiple="true"
            @change="handleFileUpload"
          />
        </div>
      </div>
    </div> -->
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
    <loading
      :active="isLoading"
      :is-full-page="true"
      color="#007BFF"
      loader="bars"
      :height="70"
      :width="70"
    />
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
      isLoad: false,
      location: {},
      fileTypes: {},
      isLoading: false,
      formData: {
        cartaPorte: null,
        doda: null,
        entry: null,
        inbond: null,
        instructions: null,
        oversizeNotification: null,
        overweightPermitUser: null,
        hazmatBol: null,
        hazmatSDS: null,
        agriculTure: null,
        proferaPackage: null,
        intercambio: null,
        sedenaPackage: null,
        damagesDiscrepanciesForUser: null,
        proofOfDeliveryForUser: null,
        overweightNotification: null,
        cuadernoAta: null,
        informalExport: null,
      },
      cartaPortepreview: null,
      dodaPreview: null,
      entryPreview: null,
      inbondPreview: null,
      instructionsPreview: null,
      oversizeNotificationPreview: null,
      overweightPermitUserPreview: null,
      hazmatBolPreview: null,
      hazmatSDSPreview: null,
      agriculTurePreview: null,
      proferaPackagePreview: null,
      intercambioPreview: null,
      sedenaPackagePreview: null,
      damagesDiscrepanciesForUserPreview: null,
      proofOfDeliveryForUserPreview: null,
      overweightNotificationPreview: null,
      cuadernoAtaPreview: null,
      informalExportPreview: null,
    };
  },
  computed: {
    ...mapGetters({
      orderData: "service/getSingleOrderData",
    }),
    // hasDocuments() {
    //   const docKeys = [
    //     "cartaPorteFolio",
    //     "aceEManifest",
    //     "oversizePermitCarrier",
    //     "overweightPermit",
    //     "temperatureControlIn",
    //     "temperatureControlOut",
    //     "proofOfDelivery",
    //     "damagesDiscrepancies",
    //   ];
    //   return docKeys.some(
    //     (key) => this.orderData?.documents?.[key]?.length > 0
    //   );
    // },
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
  watch: {
    orderData: {
      deep: true,
      handler(item) {
        const qrCode = Array.isArray(item?.qrCode) ? item.qrCode : [];
        const documents =
          item?.documents && Object.keys(item.documents).length > 0
            ? Object.values(item.documents).flat()
            : [];

        this.checkFileTypes([...qrCode, ...documents]);
      },
    },
  },
  methods: {
    ...mapActions({
      fetchSingleOrder: "service/fetchSingleOrder",
      uploadFile: "service/uploadFile",
      createRating: "service/createRating",
      fetchLocation: "service/fetchLocation",
      uploadDocuments: "service/uploadDocuments",
    }),

    async handleCartaPorteFile(file) {
      this.formData.cartaPorte = file;
      this.cartaPortepreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("cartaPorte", file);
    },
    async handleDodaFile(file) {
      this.formData.doda = file;
      this.dodaPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("doda", file);
    },
    async handleEntryFile(file) {
      this.formData.entry = file;
      this.entryPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("entryPrefileInbond", file);
    },
    async handleInbondFile(file) {
      this.formData.inbond = file;
      this.inbondPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("itnInbondNoItnNeeded", file);
    },
    async handleInstructionsFile(file) {
      this.formData.instructions = file;
      this.instructionsPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("letterWithInstructionsMemo", file);
    },
    async handleOversizeNotificationFile(file) {
      this.formData.oversizeNotification = file;
      this.oversizeNotificationPreview = file
        ? URL.createObjectURL(file)
        : null;
      await this.uploadDocumentFiles("oversizeNotificationUser", file);
    },
    async handleOverweightPermitUserFile(file) {
      this.formData.overweightPermitUser = file;
      this.overweightPermitUserPreview = file
        ? URL.createObjectURL(file)
        : null;
      await this.uploadDocumentFiles("overweightPermitUser", file);
    },
    async handleHazmatBolFile(file) {
      this.formData.hazmatBol = file;
      this.hazmatBolPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("hazmatBol", file);
    },
    async handleHazmatSDSFile(file) {
      this.formData.hazmatSDS = file;
      this.hazmatSDSPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("hazmatSdsSafetyDataSheet", file);
    },
    async handleAgriculTureFile(file) {
      this.formData.agriculTure = file;
      this.agriculTurePreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("sagarpaPackageAgriculture", file);
    },
    async handleProferaPackageFile(file) {
      this.formData.proferaPackage = file;
      this.proferaPackagePreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("profepaPackageEnvironmental", file);
    },
    async handleIntercambioFile(file) {
      this.formData.intercambio = file;
      this.intercambioPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("intercambioTrailerRelease", file);
    },
    async handleSedenaPackageFile(file) {
      this.formData.sedenaPackage = file;
      this.sedenaPackagePreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("sedenaPackage", file);
    },
    async handleOverweightNotificationFile(file) {
      this.formData.overweightNotification = file;
      this.overweightNotificationPreview = file
        ? URL.createObjectURL(file)
        : null;
      await this.uploadDocumentFiles("overweightNotification", file);
    },
    async handleCuadernoAtaFile(file) {
      this.formData.cuadernoAta = file;
      this.cuadernoAtaPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("cuadernoAta", file);
    },
    async handleInformalExportFile(file) {
      this.formData.informalExport = file;
      this.informalExportPreview = file ? URL.createObjectURL(file) : null;
      await this.uploadDocumentFiles("informalExport", file);
    },
    async handleProofOfDeliveryFile(file) {
      this.formData.proofOfDeliveryForUser = file;
      this.proofOfDeliveryForUserPreview = file
        ? URL.createObjectURL(file)
        : null;
      await this.uploadDocumentFiles("proofOfDeliveryForUser", file);
    },
    async handleDamagesFile(file) {
      this.formData.damagesDiscrepanciesForUser = file;
      this.damagesDiscrepanciesForUserPreview = file
        ? URL.createObjectURL(file)
        : null;
      await this.uploadDocumentFiles("damagesDiscrepanciesForUser", file);
    },

    async uploadDocumentFiles(fileName, file) {
      try {
        const formData = new FormData();
        formData.append(fileName, file);
        formData.append("movementId", this.movementId);
        this.isLoading = true;
        const res = await this.uploadDocuments({
          id: this.movementId,
          data: formData,
        });

        this.$toast.open({
          message: res.msg,
          type: "success",
        });

        await this.getSingleOrder();
      } catch (error) {
        this.isLoading = false;
        console.error(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoading = false;
      }
    },
    downloadCarrierFileItem(doc) {
      if (!doc) {
        this.$toast.open({
          message: "Document not uploaded by carrier.",
          type: "error",
        });
        return;
      }
      const baseUrl = "https://cargo-storage-bucket.s3.us-east-1.amazonaws.com";
      if (doc.startsWith(baseUrl)) {
        const fileName = doc.split("/").pop();
        this.$downloadFile({ src: doc, name: fileName });
      }
    },
    downloadFileItem(doc) {
      if (!doc) {
        return;
      }
      const baseUrl = "https://cargo-storage-bucket.s3.us-east-1.amazonaws.com";
      if (doc.startsWith(baseUrl)) {
        const fileName = doc.split("/").pop();
        this.$downloadFile({ src: doc, name: fileName });
      }
    },
    getFileTypeFromUrl(url) {
      const extension = url.split(".").pop().toLowerCase();
      const fileTypes = {
        pdf: "pdf",
        doc: "document",
        docx: "document",
        jpg: "image",
        jpeg: "image",
        png: "image",
        gif: "image",
        webp: "image",
        mp4: "video",
        mp3: "audio",
        txt: "text",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      };
      return fileTypes[extension] || "unknown";
    },
    async checkFileTypes(urls) {
      for (let url of urls) {
        const fileType = this.getFileTypeFromUrl(url);
        this.$set(this.fileTypes, url, fileType);
      }
    },
    shareRiview() {
      this.isShareReviewModal = !this.isShareReviewModal;
    },
    handleFileUpload(event) {
      this.documents = event.target.files;
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
        for (let i = 0; i < this.documents.length; i++) {
          formData.append(`documents`, this.documents[i]);
        }
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
        this.isLoading = true;
        await this.fetchSingleOrder({
          movementId: this.movementId,
        });
        this.isLoad = true;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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
    async getLocation() {
      try {
        const accountId = this.orderData?.operatorData?.accountId;
        if (!accountId) {
          return;
        }
        this.isLoading = true;
        const res = await this.fetchLocation({
          id: accountId,
        });
        this.location = res?.data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error, "error");
      }
    },
  },
  async asyncData({ params }) {
    return {
      movementId: params.pathMatch,
    };
  },

  async mounted() {
    await this.getSingleOrder();
    await this.getLocation();
  },
};
</script>
