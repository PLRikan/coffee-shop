import router from '../../router/index';
import {instance} from '../config'

const state = () => ({
    allProduct: [],
    productById: {},
    loadMore:[],
    groupById: [],
})

const getters = {
  getLoadMoreProduct: (state) => state.loadMore,
  getProductById: (state) => state.productById,
  getAllProduct: (state) => state.allProduct,
  getGroupById: (state) => state.groupById,
}

const mutations = {
    SET_ALL_PRODUCT(state, payload) {
        state.allProduct = [...payload];
      },
      SET_PRODUCT_BY_ID(state, payload) {
        state.productById = payload;
      },
      SET_LOAD_MORE_FIRST(state, payload){
        state.loadMore = [...payload]
      },
      SET_LOAD_MORE(state, payload){
        state.loadMore.push(...payload)
      },
      SET_GROUP_BY_ID(state, payload) {
        if (payload) {
          state.groupById = [...payload];
        } else {
          state.groupById = [];
        }
      },
}

const actions = {
    // eslint-disable-next-line
    async onCreateProduct({ commit }, payload) {
        try {
          await instance.post("/api/product/add", payload);
        } catch (error) {
          console.log(error);
          if(error.response.status === 401) {
            router.push({path: '/'});
          }
        }
    },
    // eslint-disable-next-line
    async onUpdateProduct({ commit }, payload) {
        try {
          await instance.post("/api/product/update/" + payload.id,payload.form);
          router.push({path: '/menu/'});
          alert('Updated')
        } catch (error) {
          console.log(error);
          if(error.response.status === 401) {
            router.push({path: '/'});
          }
          alert('Error')
        }
    },
    async fetchAllProduct({ commit }) {
      
        try {
          var result = await instance.get("/api/product/index");
          commit("SET_ALL_PRODUCT", result.data);
        } catch (error) {
          console.log(error);
          if(error.response.status === 401) {
            router.push({path: '/'});
          }
        }
    },
    async fecthOrderById({ commit }, payload) {
        try {
          var result = await instance.get("/api/group/" + payload + "/product");
          commit("SET_GROUP_BY_ID", result.data.data);
        } catch (error) {
          console.log(error);
          if(error.response.status === 401) {
            router.push({path: '/'});
          }
        }
      },
      async fecthProductById({ commit }, payload) {
        try {
          var result = await instance.get("/api/product/detail/" + payload);
          commit("SET_PRODUCT_BY_ID", result.data.data);
        } catch (error) {
          console.log(error);
          if(error.response.status === 401) {
            router.push({path: '/'});
          }
        }
      },
      async onLoadMoreFirst ({commit}){
        try {
          var result = await instance.get("/api/product?page=1");
          commit("SET_LOAD_MORE_FIRST",result.data.data.data)
        } catch (error) {
          console.log(error)
        }
      },
      async onLoadMore ({commit}, payload){
        try {
          var result = await instance.get("/api/product?page=" + payload);
          commit("SET_LOAD_MORE",result.data.data.data)
        } catch (error) {
          console.log(error)
        }
      },
      // eslint-disable-next-line
      async onDeleteProduct({ commit }, payload) {
        try {
          await instance.delete("/api/product/delete/" + payload);
        } catch (error) {
          console.log(error);
          if(error.response.status === 401) {
            router.push({path: '/'});
          }
        }
      },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}