import router from "../../router/index";
import {instance} from "../config"

const state = () => ({
  allGroup: [],
  groupByCategoryId: [],
});

const getters = {
  getAllGroup: (state) => state.allGroup,
  getGroupByCategory: (state) => state.groupByCategoryId
};

const mutations = {
  SET_ALL_GROUP(state, payload) {
    state.allGroup = [...payload];
  },
  SET_GROUP_BY_CATEGORY_ID(state, payload) {
    state.groupByCategoryId = [...payload];
  },
};

const actions = {
  // eslint-disable-next-line
  async onCreateGroup({ commit }, payload) {
    try {
      await instance.post("/api/group/add", payload);
      alert("Tạo thành công");
      router.push({ path: "/group" });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
      if (
        error.response.data.code.name[0] === "The name has already been taken."
      ) {
        alert("The name has already been taken.");
      }
    }
  },
  async fecthAllGroup({ commit }) {
    try {
      var result = await instance.get("/api/group");
      commit("SET_ALL_GROUP", result.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  async fecthGroupByCategoryId({ commit }, payload) {
    try {
      var result = await instance.get("/api/category/" + payload + "/group");
      commit("SET_GROUP_BY_CATEGORY_ID", result.data.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        router.push({ path: "/" });
      }
    }
  },
  // eslint-disable-next-line
  async onDeleteGroup({ commit }, payload) {
    try {
      await instance.delete("/api/group/delete/" + payload);
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
