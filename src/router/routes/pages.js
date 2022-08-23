export default [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/pages/authentication/login-v1',
    name: 'auth-login-v1',
    component: () => import('@/views/pages/authentication/Login-v1.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/pages/authentication/login-v2',
    name: 'auth-login-v2',
    component: () => import('@/views/pages/authentication/Login-v2.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/register',
    name: 'auth-register',
    component: () => import('@/views/pages/authentication/Register.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/pages/authentication/register-v1',
    name: 'auth-register-v1',
    component: () => import('@/views/pages/authentication/Register-v1.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/pages/authentication/register-v2',
    name: 'auth-register-v2',
    component: () => import('@/views/pages/authentication/Register-v2.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/pages/authentication/ForgotPassword.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/pages/authentication/forgot-password-v1',
    name: 'auth-forgot-password-v1',
    component: () => import('@/views/pages/authentication/ForgotPassword-v1.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/pages/authentication/forgot-password-v2',
    name: 'auth-forgot-password-v2',
    component: () => import('@/views/pages/authentication/ForgotPassword-v2.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/pages/authentication/reset-password-v1',
    name: 'auth-reset-password-v1',
    component: () => import('@/views/pages/authentication/ResetPassword-v1.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/pages/authentication/reset-password-v2',
    name: 'auth-reset-password-v2',
    component: () => import('@/views/pages/authentication/ResetPassword-v2.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/pages/account-setting',
    name: 'pages-account-setting',
    component: () => import('@/views/pages/account-setting/AccountSetting.vue'),
    meta: {
      pageTitle: 'Account Settings',
      breadcrumb: [
        {
          text: 'Pages',
        },
        {
          text: 'Account Settings',
          active: true,
        },
      ],
    },
  },
  {
    path: '/pages/profile',
    name: 'pages-profile',
    component: () => import('@/views/pages/profile/Profile.vue'),
    meta: {
      pageTitle: 'Profile',
      breadcrumb: [
        {
          text: 'Pages',
        },
        {
          text: 'Profile',
          active: true,
        },
      ],
    },
  },
]
