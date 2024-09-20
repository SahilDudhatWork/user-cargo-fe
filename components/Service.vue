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
          <div class="grid grid-cols-2 mt-8">
            <div class="w-full">
              <img
                src="@/static/Images/trueck1-image.webp"
                alt=""
                class="rounded-2xl xl:w-[700px] w-[600px] h-[450px] hidden sm:block"
              />
            </div>
            <div class="w-full">
              <div
                v-for="(item, key) in typeOfService"
                :key="key"
                class="flex justify-between mb-10 cursor-pointer relative z-50 mx-5"
                @click="handleClick(item)"
              >
                <div
                  class="relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[rgba(255,255,255,0.3)] before:to-[rgba(236,243,250,0)] pb-5"
                >
                  <h1 class="font-bold text-lg text-white mb-2">
                    {{ item.title }}
                  </h1>
                  <p class="font-medium text-base text-gray-300">
                    {{ item.description }}
                  </p>
                </div>
                <div>
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
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      typeOfService: [],
    };
  },
  methods: {
    ...mapActions({
      fetchTypeOfService: "service/fetchTypeOfService",
      fetchProfileData: "auth/profile",
    }),
    async handleClick(item) {
      if (item) {
        let token = this.$cookies.get("token");
        if (token) {
          try {
            let response = await this.fetchProfileData();
            let verifyByAdmin = (await response?.data?.verifyByAdmin) || false;
            if (verifyByAdmin) {
              this.$cookies.set("service", JSON.stringify(item), {
                expires: 7,
              });
              this.$router.push("/additional-details");
            } else {
              this.$toast.open({
                message: this.$i18n.t("adminVerificationErrorMessage"),
                type: "error",
              });
            }
          } catch (error) {
            this.$cookies.set("service", JSON.stringify(item), { expires: 7 });
            this.$router.push("/additional-details");
          }
        } else {
          this.$cookies.set("service", JSON.stringify(item), { expires: 7 });
          this.$router.push("/additional-details");
        }
      }
    },
    async getTypeOfServices() {
      try {
        const res = await this.fetchTypeOfService();
        this.typeOfService = res.data.typeOfService;
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
    await this.getTypeOfServices();
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
