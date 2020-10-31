const state = () => ({
  cart: [],
});

const getters = {
  getCart: (state) => state.cart
};

const mutations = {
  UPDATE_CART_QUANTITY(state, payload) {
    if (state.cart[payload.index].quantity + payload.quantity > 50) {
      alert("Tối đa 50 sản phẩm");
    } else {
      state.cart[payload.index].quantity += payload.quantity;
      alert("Đã thêm " + state.cart[payload.index].name + " vào giỏ hàng");
    }
  },
  SET_CART(state, payload) {
    state.cart.push({ ...payload.product });
    alert("Đã thêm " + payload.product.name + " vào giỏ hàng");
  },
  SET_DELETE_CART(state) {
    state.cart = [];
  },
  DELETE_CART_ITEM(state, payload) {
    let index = state.cart.indexOf(payload);
    state.cart.splice(index, 1);
  },
  DELETE_CART(state) {
    state.cart = [];
  },
};

const actions = {
  onCreateCart({ commit, state }, payload) {
    if (state.cart.length < 1) {
      commit("SET_CART", {
        product: payload.product,
      });
    } else {
      let tmp = -1;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].product_id === payload.product.product_id) {
          tmp = i;
          break;
        }
      }
      if (tmp > -1) {
        commit("UPDATE_CART_QUANTITY", {
          index: tmp,
          quantity: payload.product.quantity,
        });
      } else {
        commit("SET_CART", {
          product: payload.product,
        });
      }
    }
  },
  async onDeleteCart({ commit }) {
    try {
      commit("SET_DELETE_CART");
    } catch (error) {
      console.log(error);
    }
  },
  async onDeleteCartItem({ commit }, payload) {
    commit("DELETE_CART_ITEM", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
