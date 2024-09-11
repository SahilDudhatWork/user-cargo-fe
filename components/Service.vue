<template>
  <div>
    <div class="bg-[#0060C9] relative -top-20">
      <img
        src="@/static/Images/service-right-img.webp"
        alt=""
        class="right-0 absolute -top-36"
      />
      <div class="xl:mx-48 mx-6">
        <div class="relative"></div>
        <div class="pt-32 pb-12">
          <h1 class="font-bold text-[20px] text-white">Services for you</h1>
          <p class="text-gray-300 font-normal text-base">
            4 different type of service you can opt
          </p>
          <div class="flex xl:gap-20 mt-8">
            <div>
              <img
                src="@/static/Images/trueck1-image.webp"
                alt=""
                class="rounded-2xl xl:w-[900px] w-[600px] h-[450px] hidden sm:block"
              />
            </div>
            <div>
              <div
                v-for="(item, key) in typeOfService"
                :key="key"
                class="flex justify-between mb-10 cursor-pointer relative z-50 mx-5"
                @click="handleClick(item)"
              >
                <div
                  class="relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[rgba(255,255,255,0.3)] before:to-[rgba(236,243,250,0)] pb-5 pt-2"
                >
                  <h1 class="font-bold text-base text-white mb-2">
                    {{ item.title }}
                  </h1>
                  <p class="font-medium text-[13px] text-gray-300">
                    {{ item.description }}
                  </p>
                </div>
                <img
                  src="@/static/svg/side-arrow.svg"
                  alt=""
                  class="w-6 h-6 pt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      typeOfService: [
        {
          title: "Northbound",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
          _id: "66c43302a7eb5f1b0de6fadd",
        },
        {
          title: "Southbound",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
          _id: "66c43302a7eb5f1b0de6fade",
        },
        {
          title: "Local Drayage MX",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
          _id: "66c43302a7eb5f1b0de6fadf",
        },
        {
          title: "Local Drayage US",
          description: "Lorem ipsum dolor sit amet Mauris risus turpis.",
          _id: "66c43302a7eb5f1b0de6fae0",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      serviceData: "service/getService",
    }),
  },
  methods: {
    ...mapActions({
      fetchService: "service/fetchService",
    }),
    handleClick(item) {
      if (item) {
        this.$cookies.set("service", JSON.stringify(item), { expires: 7 });
        this.$router.push("/additional-details");
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
  },
};
</script>
<style scoped>
.gradient-border {
  border-width: 1px;
  border-bottom-style: solid;
  border-image-source: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(236, 243, 250, 0) 100%
  );
  border-image-slice: 1;
}
</style>
