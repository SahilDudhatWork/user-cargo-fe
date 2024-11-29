import $axios from "@/plugins/axios";

export const state = () => ({
  allSubUserData: [],
  singleSubUserData: [],
});

export const getters = {
  getAllSubUserData(state) {
    return state.allSubUserData;
  },
  getSingleSubUserData(state) {
    return state.singleSubUserData;
  },
};

export const mutations = {
  setAllSubUserData(state, payload) {
    state.allSubUserData = payload;
  },
  setSingleSubUserData(state, payload) {
    state.singleSubUserData = payload;
  },
  removeSubUser(state, payload) {
    state.allSubUserData = state.allSubUserData.filter(
      (user) => user.accountId !== payload.accountId
    );
  },
};

export const actions = {
  async fetchAllSubUser(ctx, payload) {
    try {
      const response = await $axios.get("v1/user/sub/user", payload);
      ctx.commit("setAllSubUserData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleSubUser(ctx, payload) {
    try {
      const response = await $axios.get(
        `v1/user/sub/user/${payload.accountId}`
      );
      ctx.commit("setSingleSubUserData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async setSingleSubUserData(ctx, payload) {
    try {
      ctx.commit("setSingleSubUserData", payload);
      return payload;
    } catch (error) {
      throw error;
    }
  },
  async updateSubUser(ctx, payload) {
    try {
      const response = await $axios.put(
        `v1/user/sub/user/${payload.accountId}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async deleteSubUser(ctx, payload) {
    try {
      const response = await $axios.delete(
        `v1/user/sub/user/${payload.accountId}`,
        payload
      );
      ctx.commit("removeSubUser", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async CreateSubUser(ctx, payload) {
    try {
      const response = await $axios.post("v1/user/sub/user", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
