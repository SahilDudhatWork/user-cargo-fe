<template>
  <div>
    <div
      class="bg-white rounded-xl border border-[#1E1E1E1F] px-4 py-2 mt-8"
      style="box-shadow: 0px 6px 20px 0px #00000012"
    >
      <div class="flex justify-between">
        <div>
          <h1 class="text-[#000000] font-bold text-lg">Service Details</h1>
        </div>
        <div v-if="item?.status">
          <button
            class="bg-[#FFAA00] rounded font-medium text-[10px] text-[#FEFEFE] px-4 py-1"
          >
            {{ item?.status }}
          </button>
        </div>
        <div v-if="item?.status === 'Completed'">
          <button
            class="bg-[#3ECC48] rounded font-medium text-[10px] text-[#FEFEFE] px-4 py-1"
          >
            COMPLETED
          </button>
        </div>
      </div>
      <div class="mt-4">
        <h1 class="text-[#00000099] font-normal text-sm">Movement ID</h1>
        <p class="text-[#1E1E1E] font-medium text-base mt-1">
          {{ item.movementId }}
        </p>
      </div>
      <div class="grid grid-cols-5 mt-3 gap-y-5">
        <div>
          <p class="text-[#00000099] font-normal text-sm mb-1">Location</p>
          <span
            class="text-white font-medium text-base bg-[#0060C9] rounded-lg py-1 px-2"
            >{{ item.typeOfService?.title }}</span
          >
        </div>
        <div>
          <p class="text-[#00000099] font-normal text-sm">Location ID</p>
          <p class="text-[#1E1E1E] font-medium text-base">MX</p>
        </div>
        <div>
          <p class="text-[#00000099] font-normal text-sm">
            Transportation Type
          </p>
          <p class="text-[#1E1E1E] font-medium text-base">
            {{ item?.typeOfTransportation?.title }}
          </p>
        </div>
        <div>
          <p class="text-[#00000099] font-normal text-sm">
            Mode of Transportation
          </p>
          <p
            class="text-[#1E1E1E] font-medium text-base"
            v-if="item?.modeOfTransportation?.title"
          >
            {{ item?.modeOfTransportation?.title }}
          </p>
        </div>
        <div>
          <p class="text-[#00000099] font-normal text-sm">Bridge of Crossing</p>
          <p class="text-[#1E1E1E] font-medium text-base">
            {{ item?.port_BridgeOfCrossing }}
          </p>
        </div>
        <div>
          <p class="text-[#00000099] font-normal text-sm">Bridge of Crossing</p>
          <p class="text-[#1E1E1E] font-medium text-base">
            {{ item?.port_BridgeOfCrossing }}
          </p>
        </div>
        <div>
          <p class="text-[#00000099] font-normal text-sm">User Reference</p>
          <p class="text-[#1E1E1E] font-medium text-base">
            {{ item?.userReference?._id }}
          </p>
        </div>
      </div>
      <div class="w-full relative h-[1px] border-b py-2 border-[#EEEEEE]"></div>

      <div
        class="flex justify-center mt-4 mb-2 gap-2 items-center cursor-pointer"
        @click="$emit('viewDetails', item?.movementId)"
      >
        <p class="text-[#0060C9] font-semibold text-sm">View more</p>
        <img src="@/static/svg/blue-right-arrow.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
