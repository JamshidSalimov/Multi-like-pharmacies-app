export default [
  // Users
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/users/profiles/User.vue"),
    meta: {
      pageTitle: "Users",
      breadcrumb: [
        {
          text: "Users",
          active: true,
        },
      ],
    },
  },
  {
    path: "/users/:id/view",
    name: "user-view",
    component: () => import("@/views/users/profiles/View.vue"),
    meta: {
      pageTitle: "View",
      breadcrumb: [
        {
          text: "Users",
          to: {name: "users"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  // Add User Start
  {
    path: "/product/add-user/add",
    name: "add-user-add",
    component: () => import("@/views/users/profiles/AddUser.vue"),
    meta: {
      pageTitle: "Add",
      breadcrumb: [
        {
          text: "Users",
          to: {name: "users"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  // Add User End

  // Edit User Start
  {
    path: "/users/:id/user-edit",
    name: "user-edit",
    component: () => import("@/views/users/profiles/UserEdit.vue"),
    meta: {
      pageTitle: "Edit",
      breadcrumb: [
        {
          text: "Users",
          to: {name: "users"},
        },
        {
          text: "Edit",
          active: true,
        },
      ],
    },
  },
  // Edit User end

  // User Addresses Start
  {
    path: "/users/user-addresses",
    name: "user-addresses",
    component: () => import("@/views/users/user-addresses/UserAddresses.vue"),
    meta: {
      pageTitle: "User addresses",
      breadcrumb: [
        {
          text: "User addresses",
          active: true,
        },
      ],
    },
  },
  {
    path: "/users/user-addresses/add",
    name: "add-addresses-add",
    component: () => import("@/views/users/user-addresses/AddAddress.vue"),
    meta: {
      pageTitle: "Add addresses",
      breadcrumb: [
        {
          text: "User addresses",
          to: {name: "user-addresses"},
        },
        {
          text: "Add addresses",
          active: true,
        },
      ],
    },
  },
  {
    path: "/users/user-addresses/:id/view",
    name: "user-address-view",
    component: () => import("@/views/users/user-addresses/View.vue"),
    meta: {
      pageTitle: "View",
      breadcrumb: [
        {
          text: "User Addresses",
          to: {name: "user-addresses"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  {
    path: "/users/user-addresses/:id/ediet",
    name: "user-address-ediet",
    component: () => import("@/views/users/user-addresses/EdietAddress.vue"),
    meta: {
      pageTitle: "Ediet",
      breadcrumb: [
        {
          text: "User Addresses",
          to: {name: "user-addresses"},
        },
        {
          text: "Ediet",
          active: true,
        },
      ],
    },
  },


  // Diagnosis
  {
    path: "/users/diagnosis/add",
    name: "diagnos-add",
    component: () => import("@/views/users/diagnosis/Add.vue"),
    meta: {
      pageTitle: "Add",
      breadcrumb: [
        {
          text: "Diagnosis",
          to: {name: "diagnosis"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  {
    path: "/users/diagnosis",
    name: "diagnosis",
    component: () => import("@/views/users/diagnosis/Diagnosis.vue"),
    meta: {
      pageTitle: "Diagnosis",
      breadcrumb: [
        {
          text: "Diagnosis",
          active: true,
        },
      ],
    },
  },
  {
    path: "/users/diagnosis/:id/view",
    name: "diagnos-view",
    component: () => import("@/views/users/diagnosis/View.vue"),
    meta: {
      pageTitle: "View",
      breadcrumb: [
        {
          text: "Diagnosis",
          to: {name: "diagnosis"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  // Cards
  {
    path: "/users/cards",
    name: "cards",
    component: () => import("@/views/users/cards/Cards.vue"),
    meta: {
      pageTitle: "Cards",
      breadcrumb: [
        {
          text: "Cards",
          active: true,
        },
      ],
    },
  },
  {
    path: "/users/cards/:id/view",
    name: "cards-view",
    component: () => import("@/views/users/cards/View.vue"),
    meta: {
      pageTitle: "View",
      breadcrumb: [
        {
          text: "Cards",
          to: {name: "cards"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  // Transactions
  {
    path: "/users/transactions",
    name: "transactions",
    component: () => import("@/views/users/transactions/Transactions.vue"),
    meta: {
      pageTitle: "Transactions",
      breadcrumb: [
        {
          text: "Transactions",
          active: true,
        },
      ],
    },
  },
  {
    path: "/users/transactions:id/view",
    name: "transactions-view",
    component: () => import("@/views/users/transactions/View.vue"),
    meta: {
      pageTitle: "View",
      breadcrumb: [
        {
          text: "Transactions",
          to: {name: "transactions"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  // Confirmation Codes
  {
    path: "/users/confirmation-codes",
    name: "confirmation-codes",
    component: () =>
      import("@/views/users/confirmation-codes/ConfirmationCodes.vue"),
    meta: {
      pageTitle: "Confirmation Codes",
      breadcrumb: [
        {
          text: "Confirmation Codes",
          active: true,
        },
      ],
    },
  },
];
