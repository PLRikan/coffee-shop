import Vue from "vue";
import Vuex from "vuex";
import account from "./modules/account";
import bill from "./modules/bill";
import cart from "./modules/cart";
import category from "./modules/category";
import group from "./modules/group";
import product from "./modules/product";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    bill,
    cart,
    category,
    group,
    product,
  },
});
