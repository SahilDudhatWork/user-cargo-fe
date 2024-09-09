import $axios from "@/plugins/axios";

export const state = () => ({
  serviceData: {},
  modal: {
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
  },
});

export const getters = {
  getService(state) {
    return state.serviceData;
  },
};
export const mutations = {
  setService(state, payload) {
    state.serviceData = payload;
  },
  openModal(state, modalName) {
    state.modal[modalName] = true;
  },
  closeModal(state, modalName) {
    state.modal[modalName] = false;
  },
  previousStep(state) {
    const activeStep = Object.keys(state.modal).find((key) => state.modal[key]);
    const activeIndex = Object.keys(state.modal).indexOf(activeStep);
    if (activeIndex > 0) {
      state.modal[activeStep] = false;
      state.modal[Object.keys(state.modal)[activeIndex - 1]] = true;
    }
  },
};
export const actions = {
  async fetchService(ctx, payload) {
    try {
      const response = await $axios.get("/v1/user/service", payload);
      ctx.commit("setService", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchServiceReference(ctx, payload) {
    try {
      const response = await $axios.get("/v1/user/order/reference");
      return response;
    } catch (error) {
      throw error;
    }
  },
  openModal({ commit }, modalName) {
    commit("openModal", modalName);
  },
  closeModal({ commit }, modalName) {
    commit("closeModal", modalName);
  },
  previousStep({ commit }) {
    commit("previousStep");
  },
};
