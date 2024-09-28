<template>
  <div>
    <div class="xl:mx-40 mx-5 mt-14">
      <div class="border border-[#ECECEC] rounded-lg flex w-[205px]">
        <button
          @click="setStatus('Pending')"
          :class="
            orderStatus === 'Pending'
              ? 'bg-[#0060C9] font-semibold text-[#F5F9FD]'
              : 'text-[#686868] font-normal bg-white'
          "
          class="rounded-lg text-sm px-5 py-2"
        >
          Requests
        </button>
        <button
          @click="setStatus('Completed')"
          :class="
            orderStatus === 'Completed'
              ? 'bg-[#0060C9] font-semibold text-[#F5F9FD] '
              : 'text-[#686868] font-normal bg-white'
          "
          class="text-sm rounded-lg px-5 py-1.5"
        >
          Past Order
        </button>
      </div>
      <div v-if="orderData && orderData.length > 0">
        <ServiceDetails
          v-for="(item, index) in orderData"
          :key="index"
          :item="item"
          @viewDetails="viewDetails"
        />
      </div>
      <div v-else class="flex justify-center mt-5">
        <span class="text-[#1E1E1E] font-medium text-2xl">No data found</span>
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
      orderStatus: "Pending",
    };
  },
  computed: {
    ...mapGetters({
      orderData: "service/getOrderData",
    }),
  },
  methods: {
    ...mapActions({
      fetchOrder: "service/fetchOrder",
    }),
    async setStatus(status) {
      this.orderStatus = status;
      await this.getOrder();
    },
    viewDetails(id) {
      this.$router.push(`my-orders/service/${id}`);
    },
    async getOrder() {
      try {
        await this.fetchOrder({
          status: this.orderStatus,
        });
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
    await this.getOrder();
  },
};
</script>
