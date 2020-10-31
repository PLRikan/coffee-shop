import router from "../../router/index";
import {instance} from "../config"

const state = () => ({
  allCategory: [],
});

const getters = {
  getAllCategory: (state) => state.allCategory
};

const mutations = {
  SET_ALL_CATEGORY(state, payload) {
    state.allCategory = [...payload];
  },
};

const actions = {
  // eslint-disable-next-line
  async createCategory({ commit }, payload) {
    try {
      await instance.post("/api/category/add", payload);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  async fecthAllCategory({ commit }) {
    try {
      var result = await instance.get("/api/category");
      commit("SET_ALL_CATEGORY", result.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  // eslint-disable-next-line
  async onDeleteCategory({ commit }, payload) {
    try {
      await instance.delete("/api/category/delete/" + payload);
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
