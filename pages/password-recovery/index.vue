<template>
  <div>
    <div>
      <Content>
        <template #modalContent>
          <div class="mt-20">
            <h1 class="font-normal text-[44px] text-[#212121]">
              Password Recovery
            </h1>
            <p
              class="text-[18px] text-[#494949] font-normal mt-2 max-w-[450px]"
            >
              Enter email address to get password recovery mail on your
              registered email address
            </p>
            <form class="space-y-4 md:space-y-6 mt-6">
              <div>
                <label
                  for="Email Address"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Email Address</label
                >
                <input
                  type="email"
                  v-model="forgetEmail"
                  name="email"
                  id="email"
                  class="xl:w-[382px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-3 py-[13px]"
                  placeholder="Type your email address"
                />
              </div>
              <VueLoadingButton
                ref="loader"
                aria-label="Post message"
                :loading="isButtonLoader"
                :disabled="isButtonLoader"
                :styled="true"
                style="
                  padding-left: 87px !important;
                  padding-right: 87px !important;
                "
                class="!xl:w-[382px] !w-full !text-white !bg-gradient-to-r !from-[#0464CB] !to-[#2AA1EB] !font-medium !rounded-lg !text-[16px] !px-5 !py-[15px] !text-center"
                @click.native="sendCode"
              >
                Send Code
              </VueLoadingButton>
              <p class="text-sm font-normal text-[#1E1E1E] max-w-[362px] mt-12">
                By creating an account or signing you have read and agree to our
                <span class="font-medium text-sm text-[#1E1E1E] cursor-pointer"
                  >Terms and Conditions </span
                >and
                <span class="font-medium text-sm text-[#1E1E1E] cursor-pointer"
                  >Privacy Policies</span
                >
              </p>
            </form>
          </div>
        </template>
      </Content>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  middleware: "guest",
  data() {
    return {
      isButtonLoader: false,
      forgetEmail: "",
    };
  },
  methods: {
    ...mapActions({
      sendOtp: "auth/sendOtp",
    }),
    async sendCode() {
      this.isButtonLoader = true;
      try {
        if (!this.forgetEmail) {
          this.$toast.open({
            message: this.$i18n.t("requiredErrorMessage"),
            type: "error",
          });
        } else {
          const res = await this.sendOtp({
            email: this.forgetEmail,
            otp_type: "forgot",
          });
          this.$toast.open({
            message: res.msg,
          });
          this.$cookies.set("email", this.forgetEmail, { expires: 1 });
          this.$router.push("/otp-sent");
        }
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      } finally {
        this.isButtonLoader = false;
      }
    },
  },
};
</script>
