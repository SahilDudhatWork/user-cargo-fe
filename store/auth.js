import $axios from "@/plugins/axios";

export const state = () => ({
  profileData: {},
});

export const getters = {
  getUserProfile(state) {
    return state.profileData;
  },
};
export const mutations = {
  setUserProfile(state, payload) {
    state.profileData = payload;
  },
};
export const actions = {
  async signin(ctx, payload) {
    try {
      const response = await $axios.post(`/v1/user/auth/logIn`, payload);
      this.$cookies.set("token", response?.data?.accessToken);
      this.$cookies.set("refreshToken", response?.data?.refreshToken);
      // this.$cookies.set("token", response.data.accessToken, {
      // expires: 7,
      // path: "/",
      // secure: true,
      // sameSite: "Strict",
      // });
      // this.$cookies.set("refreshToken", response.data.refreshToken, {
      // expires: 7, // Uncomment if you want it to expire in 7 days
      // path: "/",
      // secure: true,
      // sameSite: "Strict",
      // });
      return response;
    } catch (error) {
      throw error;
    }
  },
  async signup(ctx, payload) {
    try {
      const response = await $axios.post("/v1/user/auth/signUp", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async tokenVerify(ctx, payload) {
    try {
      const response = await $axios.post(
        "/v1/common/tokenVerify/user",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async profile(ctx, payload) {
    try {
      const response = await $axios.get("/v1/user/profile");
      ctx.commit("setUserProfile", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateProfile(ctx, payload) {
    try {
      const response = await $axios.put("/v1/user/profile", payload);
      ctx.commit("setUserProfile", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async sendOtp(ctx, payload) {
    try {
      const response = await $axios.post("/v1/common/otp/sent/user", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  // for forgot password
  async verifyOtp(ctx, payload) {
    try {
      const response = await $axios.post("/v1/common/otp/verify", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  // for refresh token
  async refreshToken(ctx, payload) {
    try {
      const response = await $axios.post("/v1/user/auth/token", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // for login
  async verifyUserOtp(ctx, payload) {
    try {
      const response = await $axios.post("/v1/user/auth/verifyOtp", payload);
      this.$cookies.set("token", response?.data?.accessToken);
      this.$cookies.set("refreshToken", response?.data?.refreshToken);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async resetPassword(ctx, payload) {
    try {
      const response = await $axios.post(
        "/v1/common/resetPassword/user",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async uploadImage(ctx, payload) {
    try {
      const response = await $axios.post("/v1/common/imageUpload", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
