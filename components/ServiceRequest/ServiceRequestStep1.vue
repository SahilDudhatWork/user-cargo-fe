<template>
  <div>
    <div>
      <Additional @click="$emit('handleService', selectedServiceItem)">
        <template #content>
          <h1 class="font-bold text-[18px] text-[#000000]">Services for you</h1>
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
              :isSelected="item.title === selectedServiceItem.title"
              @select="selectTypeOfService"
            />
          </div>
        </template>
      </Additional>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedServiceItem: "",
    };
  },
  computed: {
    ...mapGetters({
      serviceData: "service/getService",
    }),
  },
  methods: {
    selectTypeOfService(item) {
      this.selectedServiceItem = item;
    },
  },
  mounted() {
    const cookieDataRaw = this.$cookies.get("service");
    if (cookieDataRaw) {
      const cookieData = JSON.parse(cookieDataRaw);
      this.selectedServiceItem = cookieData;
    }
  },
};
</script>
