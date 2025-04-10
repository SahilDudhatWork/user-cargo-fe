<template>
  <div class="relative">
    <div class="scroll-container h-[500px] overflow-y-scroll relative">
      <ul>
        <li class="border-l" v-for="(item, key) in notificationData" :key="key">
          <div class="inline-block border-b pb-4 pt-4 pl-4">
            <nuxt-link :to="`/my-orders/service/${item?.redirectId}`">
              <span class="text-[#000000E5] font-normal text-sm break-all">
                {{ item.title }}
              </span>
            </nuxt-link>
          </div>
        </li>
      </ul>
      <div
        v-if="notificationData?.length > 0"
        class="pt-8 flex justify-end sm:flex-row flex-col sm:gap-5 gap-2 items-center pb-14"
      >
        <span>{{ paginationText }}</span>
        <div class="flex items-center sm:gap-5 gap-2">
          <button
            class="sm:p-1 p-[2px] rounded-lg"
            @click="handleFirstPage"
            :disabled="notificationPaginationData.pre_page_url === null"
            :class="
              notificationPaginationData.pre_page_url === null
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
            @click="handlePrevPage"
            class="sm:p-[9px] p-[7px] rounded-lg"
            :disabled="notificationPaginationData.pre_page_url === null"
            :class="
              notificationPaginationData.pre_page_url === null
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
            @click="handleNextPage"
            class="sm:p-[9px] p-[7px] rounded-lg"
            :disabled="notificationPaginationData.next_page_url === null"
            :class="
              notificationPaginationData.next_page_url === null
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
            @click="handleLastPage"
            class="sm:p-1 p-[2px] rounded-lg"
            :disabled="notificationPaginationData.next_page_url === null"
            :class="
              notificationPaginationData.next_page_url === null
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

    <div
      class="absolute bottom-0 left-0 w-full h-20 pointer-events-none bg-gradient-to-t from-white to-transparent"
    ></div>
    <loading
      :active="isLoader"
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
  layout: "settings",
  data() {
    return {
      isLoader: false,
    };
  },
  computed: {
    ...mapGetters({
      notificationData: "settings/getNotificationData",
      notificationPaginationData: "settings/getNotificationPaginationData",
    }),
    paginationText() {
      return this.generatePaginationText(this.notificationPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchNotifications: "settings/fetchNotifications",
    }),
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },

    async handleFirstPage() {
      try {
        await this.getNotifications({
          page: 1,
          limit: this.notificationPaginationData?.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async handleLastPage() {
      try {
        await this.getNotifications({
          page: this.notificationPaginationData?.total_page,
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
    async handlePrevPage() {
      try {
        await this.getNotifications({
          page: this.notificationPaginationData?.current_page - 1,
          limit: this.notificationPaginationData?.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async handleNextPage() {
      try {
        await this.getNotifications({
          page: this.notificationPaginationData?.current_page + 1,
          limit: this.notificationPaginationData?.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async getNotifications(payload = { page: 1, limit: 10 }) {
      try {
        this.isLoader = true;
        let { page, limit } = payload;
        await this.fetchNotifications({
          page: page,
          limit: limit,
        });
        this.isLoader = false;
      } catch (error) {
        this.isLoader = false;
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isLoader = false;
      }
    },
  },
  async mounted() {
    this.getNotifications();
  },
};
</script>

<style scoped>
.scroll-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}
</style>
