import $axios from "@/plugins/axios";

export const state = () => ({
  serviceData: [],
  orderData: [],
  userAddress: [],
  singleOrderData: {},
  orderPaginationData: {},
  selectedServiceItems: {
    selectedTypeOfTransportationItem: { title: "" },
    selectedModeItem: { title: "" },
    selectedPortItem: { title: "" },
    selectedServiceItem: "",
    selectedQuantityChains: "Select option",
    selectedQuantityTarps: "Select option",
    selectedQuantityStraps: "Select option",
    selectedPrograming: "Select option",
    userReference: null,
    selectedSpecialRequirementItems: [],
    schedule: {
      date: "",
      time: "",
    },
    selectedPickupItems: [],
    selectedDropItems: [],
  },
  modal: {
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    stepCheckout: false,
    step7: false,
    step8: false,
  },
});

export const getters = {
  getService(state) {
    return state.serviceData;
  },
  getSelectedServiceItems(state) {
    return state.selectedServiceItems;
  },
  getOrderData(state) {
    return state.orderData;
  },
  getSingleOrderData(state) {
    return state.singleOrderData;
  },
  getUserAddress(state) {
    return state.userAddress;
  },
  getOrderPaginationData(state) {
    return state.orderPaginationData;
  },
};
export const mutations = {
  setSelectedServiceItems(state, { key, item }) {
    if (state.selectedServiceItems[key] !== undefined) {
      state.selectedServiceItems[key] = item;
    }
  },
  setOrderPaginationData(state, payload) {
    state.orderPaginationData = payload;
  },
  setService(state, payload) {
    state.serviceData = payload;
  },
  setSingleOrderData(state, payload) {
    state.singleOrderData = payload;
  },
  setOrderData(state, payload) {
    state.orderData = payload;
  },
  openModal(state, modalName) {
    state.modal[modalName] = true;
  },
  closeModal(state, modalName) {
    state.modal[modalName] = false;
  },
  setUserAddress(state, payload) {
    state.userAddress = payload;
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
  updateSelectedServiceItems({ commit }, { key, item }) {
    commit("setSelectedServiceItems", { key, item });
  },
  async fetchService(ctx, payload) {
    try {
      const response = await $axios.get("/v1/user/transitInfo", payload);
      ctx.commit("setService", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createUserAddress(ctx, payload) {
    try {
      const response = await $axios.post("/v1/user/address", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createOrder(ctx, payload) {
    try {
      const response = await $axios.post("/v1/user/order", payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async createCoordinatesPrice(ctx, payload) {
    try {
      const response = await $axios.post(
        "/v1/user/order/coordinatesPrice",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchUserAddress(ctx, payload) {
    try {
      const response = await $axios.get("/v1/user/address", payload);
      ctx.commit("setUserAddress", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchEditUserAddress(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/user/address/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchPostBridge(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/user/specialRequirements/${payload.id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async updateUserAddress(ctx, payload) {
    try {
      const response = await $axios.put(
        `/v1/user/address/${payload._id}`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchTypeOfService(ctx, payload) {
    try {
      const response = await $axios.get("/v1/user/transitInfo/typeOfService");
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
  async fetchOrder(ctx, payload) {
    try {
      const status = payload?.status || "";
      const page = payload?.page || "";
      const limit = payload?.limit || "";
      const response = await $axios.get(
        `/v1/user/order?status=${status}&page=${page}&limit=${limit}`,
        payload
      );
      ctx.commit("setOrderData", response.data.response);
      ctx.commit("setOrderPaginationData", response.data.pagination);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async fetchSingleOrder(ctx, payload) {
    try {
      const response = await $axios.get(
        `/v1/user/order/${payload.movementId}`,
        payload
      );
      ctx.commit("setSingleOrderData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async capturePayment(ctx, payload) {
    try {
      const response = await $axios.post(`/v1/user/payPal/capture`, payload);
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
