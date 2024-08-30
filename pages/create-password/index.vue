<template>
  <div>
    <div>
      <Content>
        <template #modalContent>
          <div class="mt-10">
            <h1 class="font-normal text-[44px] text-[#212121]">
              Create Password
            </h1>
            <p
              class="text-[18px] text-[#494949] font-normal mt-2 max-w-[420px]"
            >
              Your password must contain special characters, alphanumeric
              number, small & Large capital letters.
            </p>
            <form
              class="space-y-4 md:space-y-6 mt-6"
              @submit.prevent="changePassword"
            >
              <div class="relative">
                <label
                  for="createPassword"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Create Password</label
                >

                <svg
                  @click="togglePasswordVisibility"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="cursor-pointer w-6 h-6 absolute xl:right-12 lg:right-3 sm:right-3 right-2 top-10"
                >
                  <path
                    v-if="!isCreatePassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                  />
                  <path
                    v-if="!isCreatePassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.297 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-4.839 7-9.542 7S3.732 16.057 2.458 12z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.218a10.451 10.451 0 00-.31.282C2.763 9.463 2 10.656 2 12c1.581 4.77 5.804 7.5 10.5 7.5 1.348 0 2.639-.21 3.843-.603M6.179 6.177a9.718 9.718 0 015.821-1.677c3.966 0 7.455 2.12 9.542 5.5a10.354 10.354 0 01-1.065 1.502m-1.814 2.904C15.869 15.673 14.5 16.5 12 16.5a3.5 3.5 0 01-3.5-3.5c0-.861.327-1.656.865-2.245M15 12c0-1.657-1.343-3-3-3a2.992 2.992 0 00-2.78 1.943M3 3l18 18"
                  />
                </svg>
                <input
                  :type="isCreatePassword ? 'text' : 'password'"
                  name="createPassword"
                  id="createPassword"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[13px]"
                  placeholder="Type your email address"
                  v-model="password"
                  @input="validatePasswords"
                />
              </div>
              <a class="text-xs font-normal text-[#3683D5] cursor-pointer mt-3"
                >Create strong password for your security!</a
              >
              <div class="!m-0 relative">
                <label
                  for="password"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-3"
                  >Password</label
                >
                <svg
                  @click="togglePassword"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="cursor-pointer w-6 h-6 absolute xl:right-12 lg:right-3 sm:right-3 right-2 top-10"
                >
                  <path
                    v-if="!isPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                  />
                  <path
                    v-if="!isPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.297 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-4.839 7-9.542 7S3.732 16.057 2.458 12z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.218a10.451 10.451 0 00-.31.282C2.763 9.463 2 10.656 2 12c1.581 4.77 5.804 7.5 10.5 7.5 1.348 0 2.639-.21 3.843-.603M6.179 6.177a9.718 9.718 0 015.821-1.677c3.966 0 7.455 2.12 9.542 5.5a10.354 10.354 0 01-1.065 1.502m-1.814 2.904C15.869 15.673 14.5 16.5 12 16.5a3.5 3.5 0 01-3.5-3.5c0-.861.327-1.656.865-2.245M15 12c0-1.657-1.343-3-3-3a2.992 2.992 0 00-2.78 1.943M3 3l18 18"
                  />
                </svg>
                <input
                  :type="isPassword ? 'text' : 'password'"
                  name="password"
                  id="password"
                  placeholder="Type your password"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[13px]"
                  v-model="confirmPassword"
                  @input="validatePasswords"
                />
              </div>
              <button
                class="xl:w-[382px] w-full text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-5 py-[15px] text-center"
              >
                Continue
              </button>
              <p class="text-sm font-normal text-[#1E1E1E] max-w-[362px]">
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
  data() {
    return {
      password: "",
      confirmPassword: "",
      isCreatePassword: false,
      isPassword: false,
    };
  },
  methods: {
    ...mapActions({
      resetPassword: "auth/resetPassword",
    }),
    togglePasswordVisibility() {
      this.isCreatePassword = !this.isCreatePassword;
    },
    togglePassword() {
      this.isPassword = !this.isPassword;
    },
    validatePasswords() {
      if (
        this.password &&
        this.confirmPassword &&
        this.password !== this.confirmPassword
      ) {
        this.$toast.open({
          message: this.$i18n.t("matchPasswordMessage"),
          type: "error",
          duration: 2000,
          position: "bottom-right",
        });
      } else if (
        this.password &&
        this.confirmPassword &&
        this.password === this.confirmPassword
      ) {
        console.log("Passwords match!");
      }
    },
    async changePassword() {
      try {
        this.validatePasswords();
        if ((!this.password, !this.confirmPassword)) {
          this.$toast.open({
            message: this.$i18n.t("errorMessage"),
            type: "error",
          });
          return;
        } else {
          const accessEmail = this.$cookies.get("email");
          const token = this.$cookies.get("otpToken");
          const res = await this.resetPassword({
            email: accessEmail,
            password: this.password,
            otpToken: token,
          });
          this.$toast.open({
            message: res.msg,
          });
          this.$cookies.remove("email");
          this.$cookies.remove("otpToken");
          this.$router.push("/login");
        }
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
  },
};
</script>
