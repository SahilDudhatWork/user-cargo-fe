import $axios from "@/plugins/axios";

export const state = () => ({
  notificationData: [],
  notificationPaginationData: {},
});

export const getters = {
  getNotificationData(state) {
    return state.notificationData;
  },
  getNotificationPaginationData(state) {
    return state.notificationPaginationData;
  },
};

export const mutations = {
  setNotificationData(state, payload) {
    state.notificationData = payload;
  },
  setNotificationPaginationData(state, payload) {
    state.notificationPaginationData = payload;
  },
};

export const actions = {
  async fetchSettings(ctx, payload) {
    try {
      const response = await $axios.get("/v1/common/guidelinePages/user");
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleSettingsData(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/common/guidelinePages/user/${payload.slug}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchNotifications(ctx, payload) {
    try {
      const page = payload?.page || "";
      const limit = payload?.limit || "";
      const response = await $axios.get(
        `v1/user/notification?page=${page}&limit=${limit}`,
        payload
      );

      ctx.commit("setNotificationData", response.data.response);
      ctx.commit("setNotificationPaginationData", response.data.pagination);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
