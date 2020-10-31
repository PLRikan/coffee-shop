import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function guardMyroute(to, from, next){
  var isAuthenticated = false;
  if(localStorage.getItem('token')!=null){
    isAuthenticated = true
  } else {
    isAuthenticated= false;
  }

  if(isAuthenticated){
    next();
  } else{
    next('/');
  }
}

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    // name: "Home",
    beforeEnter : guardMyroute,
    component: () => import("../views/Home.vue"),
    children: [
      {
        path:"",
        // name:"Order",
        beforeEnter : guardMyroute,
        component: () => import("../views/Order.vue"),
        children:[
          {
            path:"",
            name:"OrderAll",
            beforeEnter : guardMyroute,
            component: () => import("../components/All.vue")
          },
          {
            path:"/orders/:id",
            name:"Orders",
            beforeEnter : guardMyroute,
            component: () => import("../components/OrderById.vue")
          }

        ]
      },
      {
        path: "/cart",
        name: "Cart",
        beforeEnter : guardMyroute,
        component: () => import("../views/Cart.vue"),
      },
      {
        path: "/account",
        // name: "Account",
        beforeEnter : guardMyroute,
        component: () => import("../views/Account.vue"),
        children:[
          {
            path:"",
            name:"AccAll",
            beforeEnter : guardMyroute,
            component: () => import("../components/AccAll.vue")
          },
          {
            path:"/add-acc",
            name:"AccAdd",
            beforeEnter : guardMyroute,
            component: () => import("../components/AccAdd.vue")
          }
        ]
      },
      {
        path: "/bill",
        name: "Bill",
        beforeEnter : guardMyroute,
        component: () => import("../views/Bill.vue"),
      },
      {
        path: "/bill-manage",
        name: "Bill-Manage",
        beforeEnter : guardMyroute,
        component: () => import("../views/Billmanage.vue"),
      },
      {
        path: "/bill/:id",
        name: "Bill-Detail",
        beforeEnter : guardMyroute,
        component: () => import("../components/BillDetail.vue"),
      },
      {
        path: "/bill-manage/:id",
        name: "Bill-Detail-Manage",
        beforeEnter : guardMyroute,
        component: () => import("../components/BillDetailManage.vue"),
      },
      {
        path: "/menu",
        // name: "Menu",
        beforeEnter : guardMyroute,
        component: () => import("../views/Menu.vue"),
        children:[
          {
            path:"",
            name:"MenuAll",
            beforeEnter : guardMyroute,
            component: () => import("../components/MenuAll.vue")
          },
          {
            path:"/add-menu",
            name:"MenuAdd",
            beforeEnter : guardMyroute,
            component:() => import("../components/MenuAdd.vue")
          },
          {
            path:"/menu/:id",
            name:"MenuDetail",
            beforeEnter : guardMyroute,
            component:() => import("../components/MenuDetail.vue")
          },
          {
            path:"/group",
            name:"AllGroup",
            beforeEnter : guardMyroute,
            component:() => import("../components/AllGroup.vue")
          },
          {
            path:"/group/:id",
            name:"GroupDetail",
            beforeEnter : guardMyroute,
            component:() => import("../components/GroupDetail.vue")
          },
          {
            path:"/add-group",
            name:"AddGroup",
            beforeEnter : guardMyroute,
            component:() => import("../components/AddGroup.vue")
          },
          {
            path:"/category",
            name:"AllCategory",
            beforeEnter : guardMyroute,
            component:() => import("../components/AllCategory.vue")
          },
          {
            path:"/add-category",
            name:"AddCategory",
            beforeEnter : guardMyroute,
            component:() => import("../components/AddCategory.vue")
          }
        ]
      },
    ],
  },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
