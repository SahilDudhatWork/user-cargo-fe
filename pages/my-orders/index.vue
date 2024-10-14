<template>
  <div>
    <div class="xl:mx-40 mx-5 mt-14">
      <div class="flex items-center justify-between">
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
        <div>
          <div
            v-if="orderData?.length > 0"
            class="mt-4 flex justify-end gap-5 items-center mb-10"
          >
            <span>{{ paginationText }}</span>
            <button
              class="p-1 rounded-lg"
              @click="firstPage"
              :disabled="getOrderPaginationData.pre_page_url === null"
              :class="
                getOrderPaginationData.pre_page_url === null
                  ? 'bg-[#89abcf]'
                  : 'bg-[#3683D5]'
              "
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                fill="#ffffff"
              >
                <path
                  d="M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z"
                ></path>
              </svg>
            </button>
            <button
              @click="prevPage"
              class="p-[9px] rounded-lg"
              :disabled="getOrderPaginationData.pre_page_url === null"
              :class="
                getOrderPaginationData.pre_page_url === null
                  ? 'bg-[#89abcf]'
                  : 'bg-[#3683D5]'
              "
            >
              <svg
                class="w-3.5 h-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
                stroke="#ffffff"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>

            <button
              @click="nextPage"
              class="p-[9px] rounded-lg"
              :disabled="getOrderPaginationData.next_page_url === null"
              :class="
                getOrderPaginationData.next_page_url === null
                  ? 'bg-[#89abcf]'
                  : 'bg-[#3683D5]'
              "
            >
              <svg
                class="w-3.5 h-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
                stroke="#ffffff"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>

            <button
              @click="lastPage"
              class="p-1 rounded-lg"
              :disabled="getOrderPaginationData.next_page_url === null"
              :class="
                getOrderPaginationData.next_page_url === null
                  ? 'bg-[#89abcf]'
                  : 'bg-[#3683D5]'
              "
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                fill="#ffffff"
              >
                <path
                  d="M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
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
      getOrderPaginationData: "service/getOrderPaginationData",
    }),
    paginationText() {
      return this.generatePaginationText(this.getOrderPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchOrder: "service/fetchOrder",
    }),
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },
    async firstPage() {
      try {
        await this.getOrder({
          status: this.orderStatus,
          page: 1,
          limit: this.getOrderPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async lastPage() {
      try {
        await this.getOrder({
          status: this.orderStatus,
          page: this.getOrderPaginationData?.total_page,
          limit: 10,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async prevPage() {
      try {
        await this.getOrder({
          status: this.orderStatus,
          page: this.getOrderPaginationData.current_page - 1,
          limit: this.getOrderPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async nextPage() {
      try {
        await this.getOrder({
          status: this.orderStatus,
          page: this.getOrderPaginationData.current_page + 1,
          limit: this.getOrderPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async setStatus(status) {
      this.orderStatus = status;
      await this.getOrder();
    },
    viewDetails(id) {
      this.$router.push(`my-orders/service/${id}`);
    },
    async getOrder(payload) {
      try {
        let { page, limit } = payload;
        page = page || 1;
        limit = limit || 10;
        await this.fetchOrder({
          status: this.orderStatus,
          page: page,
          limit: limit,
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
    try {
      await this.getOrder({
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
};
</script>
