import router from "../../router/index";
import {instance} from "../config"

const state = () => ({
  allBill: [],
  billById: [],
  total_price_for_bill: {},
  firstBillPagination: [],
  billPagePagination: null,
});

const getters = {
  getAllBill: (state) => state.allBill,
  getBillById: (state) => state.billById,
  getTotalPriceForBill: (state) => state.total_price_for_bill,
  getFirstBillPagination: (state) => state.firstBillPagination,
  getBillPagePagination: (state) => state.billPagePagination
};

const mutations = {
  SET_ALL_BILL(state, payload) {
    state.allBill = [...payload];
  },
  SET_BILL_BY_ID(state, payload) {
    state.billById = [];
    state.billById = [...payload];
  },
  SET_TOTAL_PRICE_FOR_BILL(state, payload) {
    state.total_price_for_bill = payload;
  },
  SET_FIRST_BILL_PAGINATION(state, payload) {
    state.firstBillPagination = [...payload.data];
    state.billPagePagination = payload.last_page;
  },
  SET_BILL_PAGINATION(state, payload) {
    state.firstBillPagination = [...payload];
  },
};

const actions = {
  // eslint-disable-next-line
  async onCreateBill({ commit }, payload) {
    try {
      await instance.post("/api/order/create", payload);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  async getAllBill({ commit }) {
    try {
      var result = await instance.get("/api/order/index");
      commit("SET_ALL_BILL", result.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  async getBillFirstPagination({ commit }) {
    try {
      var result = await instance.get("/api/order?page=1");
      commit("SET_FIRST_BILL_PAGINATION", result.data.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  async getBillPagination({ commit }, payload) {
    try {
      var result = await instance.get("/api/order?page=" + payload);
      commit("SET_BILL_PAGINATION", result.data.data.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  async getBillById({ commit }, payload) {
    try {
      var result = await instance.get("/api/order/detail/" + payload);
      commit("SET_BILL_BY_ID", result.data.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  async getTotalPriceForBill({ commit }, payload) {
    try {
      var total_price = await instance.get("/api/order/show/" + payload);
      commit("SET_TOTAL_PRICE_FOR_BILL", total_price.data.data.total_price);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  // eslint-disable-next-line
  async onDeleteBill({ commit }, payload) {
    try {
      await instance.delete("/api/order/delete/" + payload.id);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
