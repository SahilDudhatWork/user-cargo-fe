import $axios from "@/plugins/axios";

export const state = () => ({});

export const getters = {};

export const mutations = {};

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
};
