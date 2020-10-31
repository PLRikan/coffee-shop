import router from "../../router/index";
import {instance} from "../config"

const state = () => ({
  allAccount: [],
});

const getters = {
  getAllAccount: (state) => state.allAccount
};

const mutations = {
  SET_ALL_ACCOUNT(state, payload) {
    state.allAccount = [...payload];
  },
};

const actions = {
  // eslint-disable-next-line
  async signin({ commit }, payload) {
    try {
      var result = await instance.post("/api/login", payload);
      localStorage.setItem("token", result.data.token);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  // eslint-disable-next-line
  async register({ commit }, payload) {
    try {
      await instance.post("/api/register", payload);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  async fecthAllAccount({ commit }) {
    try {
      var result = await instance.get("/api/user");
      commit("SET_ALL_ACCOUNT", result.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  // eslint-disable-next-line
  async onDeleteAccount({ commit }, payload) {
    try {
      await instance.delete("/api/user/delete/" + payload.id);
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
