export default [
  // Orders
  {
    path: "/orders/order/",
    name: "orders",
    component: () => import("@/views/orders/order/Orders.vue"),
    meta: {
      pageTitle: "Orders",
      breadcrumb: [
        {
          text: "Orders",
          active: true,
        },
      ],
    },
  },
  {
    path: "/orders/order/:id/view",
    name: "order-view",
    params: true,
    component: () => import("@/views/orders/order/View.vue"),
    meta: {
      pageTitle: "Order View",
      breadcrumb: [
        {
          text: "Order",
          to: {name: "orders"},
        },
        {
          text: "Order View",
          active: true,
        },
      ],
    },
  },
  // Courier
  {
    path: "/orders/courier/",
    name: "courier",
    component: () => import("@/views/orders/courier/Courier.vue"),
    meta: {
      pageTitle: "Courier",
      breadcrumb: [
        {
          text: "Courier",
          active: true,
        },
      ],
    },
  },
  {
    path: "/orders/courier/:id/edit",
    name: "courier-edit",
    params: true,
    component: () => import("@/views/orders/courier/Edit.vue"),
    meta: {
      pageTitle: "Courier Edit",
      breadcrumb: [
        {
          text: "Courier",
          to: {name: "courier"},
        },
        {
          text: "Courier Edit",
          active: true,
        },
      ],
    },
  },
  {
    path: "/orders/courier/add",
    name: "courier-add",
    component: () => import("@/views/orders/courier/Add.vue"),
    meta: {
      pageTitle: "Courier Add",
      breadcrumb: [
        {
          text: "Courier",
          to: {name: "courier"},
        },
        {
          text: "Courier Add",
          active: true,
        },
      ],
    },
  },
];
