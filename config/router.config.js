export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './V1/User/Login' },
      { path: '/user/register', name: 'register', component: './V1/User/Register' },
      { path: '/user/settlein', name: 'settlein', component: './V1/User/SettleIn' },
      {
        path: '/user/selectSettleIn',
        name: 'selectSettleIn',
        component: './V1/User/SelectSettleIn',
      },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './V1/User/RegisterResult',
      },
      // 推手注册相关路由
      {
        path: '/user/tuishou-signin',
        name: 'index',
        component: './V1/User/TuishouSignin',
      },
      {
        component: '404',
      },
    ],
  },
  // public
  {
    path: '/market',
    routes: [
      { path: '/market', redirect: '/market/marketPromotion' },
      {
        path: '/market/marketPromotion',
        name: 'marketPromotion',
        component: './V1/Public/MarketPromotion',
      },
      {
        path: '/market/MerchantsSettled',
        name: 'merchantsSettled',
        component: './V1/Public/MerchantsSettled',
      },
    ],
  },
  {
    path: '/public',
    routes: [
      {
        path: '/public/matrix',
        name: 'index',
        component: './V1/Public/Matrix',
      },
      {
        path: '/public/aboutUs',
        name: 'aboutUs',
        component: './V1/Public/AboutUs',
      },
      {
        path: '/public/helpCenter',
        name: 'help',
        component: './V1/Public/HelpCenter',
      },
      {
        path: '/public/helpDetail',
        name: 'helpDetail',
        component: './V1/Public/Help/HelpDetail',
      },
      {
        path: '/public/favorites',
        name: 'favorites',
        component: './V1/Public/Favorites/Favorites',
      },
      {
        path: '/public/rechargeActivity',
        name: 'rechargeActivity',
        component: './V1/Public/RechargeActivity',
      },
    ],
  },
  {
    path: '/web',
    routes: [
      { path: '/web', redirect: '/web/index' },
      {
        path: '/web/index',
        name: 'index',
        component: './V1/Public/WebsiteHome/index',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      // { path: '/', redirect: '/homePage', authority: ['admin', 'user'] },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard1',
      //   icon: 'dashboard',
      //   component: './Dashboard/Analysis',
      //   hideChildrenInMenu: true,
      //   routes: [
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },
      // new homePage
      { path: '/', redirect: '/web/index' },
      {
        path: '/homePage',
        name: 'dashboard',
        icon: 'dashboard',
        component: './V1/HomePage/index',
        hideChildrenInMenu: true,
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/homePage/index',
            name: 'index',
            component: './V1/HomePage/index',
          },
        ],
      },
      // task
      {
        path: '/fangdan',
        icon: 'form',
        name: 'fangdan',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/fangdan/Index',
            name: 'index',
            component: './V1/FangDan/Index',
          },
          {
            path: '/fangdan/step-form',
            name: 'stepform',
            component: './V1/FangDan/StepForm',
            hideInMenu: true,
            routes: [
              {
                path: '/fangdan/step-form',
                redirect: '/fangdan/step-form/info',
              },
              {
                path: '/fangdan/step-form/info',
                name: 'info',
                component: './V1/FangDan/StepForm/Step1',
              },
              {
                path: '/fangdan/step-form/confirm',
                name: 'confirm',
                component: './V1/FangDan/StepForm/Step2',
              },
              {
                path: '/fangdan/step-form/schedule',
                name: 'schedule',
                component: './V1/FangDan/StepForm/Step3',
              },
              {
                path: '/fangdan/step-form/pay',
                name: 'pay',
                component: './V1/FangDan/StepForm/Step4',
              },
              {
                path: '/fangdan/step-form/result',
                name: 'result',
                component: './V1/FangDan/StepForm/Step5',
              },
            ],
          },
          {
            path: '/fangdan/qf',
            name: 'quanfen',
            component: './V1/FangDan/StepForm',
            hideInMenu: true,
            routes: [
              {
                path: '/fangdan/qf',
                redirect: '/fangdan/qf/info',
              },
              {
                path: '/fangdan/qf/info',
                name: 'info',
                component: './V1/FangDan/StepForm/Step1',
              },
              {
                path: '/fangdan/qf/confirm',
                name: 'confirm',
                component: './V1/FangDan/StepForm/Step2',
              },
              {
                path: '/fangdan/qf/schedule',
                name: 'schedule',
                component: './V1/FangDan/StepForm/Step3',
              },
              {
                path: '/fangdan/qf/pay',
                name: 'pay',
                component: './V1/FangDan/StepForm/Step4',
              },
              {
                path: '/fangdan/qf/result',
                name: 'result',
                component: './V1/FangDan/StepForm/Step5',
              },
            ],
          },
          {
            path: '/fangdan/list',
            name: 'myList',
            component: './V1/FangDan/List/Index',
          },
          {
            path: '/fangdan/plan',
            name: 'plan',
            component: './V1/FangDan/List/PlanList',
          },
          {
            path: '/fangdan/list/GeneralizeDetail',
            name: 'generalizeDetail',
            component: './V1/FangDan/List/GeneralizeDetail',
            hideInMenu: true,
          },
          {
            path: '/fangdan/qfDetail',
            name: 'qfDetail',
            component: './V1/FangDan/List/qfDetail',
            hideInMenu: true,
          },
          {
            path: '/fangdan/deqDetail',
            name: 'generalizeDetail',
            component: './V1/FangDan/List/deqDetail',
            hideInMenu: true,
          },
        ],
      },
      // myOrder
      {
        path: '/order',
        icon: 'table',
        name: 'order',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/order/Index',
            name: 'index',
            component: './V1/MyOrder/Index',
          },
          {
            path: '/order/qf',
            name: 'qf',
            component: './V1/MyOrder/qfList',
          },
          {
            path: '/order/qfDetail',
            name: 'qfDetail',
            hideInMenu: true,
            component: './V1/MyOrder/qfDetail',
          },
          {
            path: '/order/productDetail',
            name: 'detail',
            component: './V1/MyOrder/ProductDetail',
            hideInMenu: true,
          },
        ],
      },
      //capitalManage
      {
        path: '/capitalManage',
        icon: 'profile',
        name: 'capital',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/CapitalManage/Recharge',
            name: 'recharge',
            component: './V1/CapitalManage/Recharge',
          },
          {
            path: '/CapitalManage/CapitalDetail',
            name: 'detail',
            component: './V1/CapitalManage/CapitalDetail',
          },
          {
            path: '/CapitalManage/creditRecord',
            name: 'creditRecord',
            component: './V1/CapitalManage/CreditRecord',
          },
          {
            path: '/CapitalManage/Rulecdk',
            name: 'rulecdk',
            hideInMenu: true,
            component: './V1/CapitalManage/RuleCDK',
          },
          {
            path: '/CapitalManage/Withdraw',
            name: 'withdraw',
            hideInMenu: true, // 190716 隐藏放单中心提现页面
            component: './V1/CapitalManage/Withdraw',
          },
          {
            path: '/CapitalManage/FreezeDetail',
            name: 'freeze',
            hideInMenu: true,
            component: './V1/CapitalManage/FreezeDetail',
          },
          {
            path: '/CapitalManage/RechargePay',
            name: 'rechargePay',
            hideInMenu: true,
            component: './V1/CapitalManage/RechargePay',
          },
          {
            path: '/CapitalManage/RechargePaySuccess',
            name: 'success',
            hideInMenu: true,
            component: './V1/CapitalManage/RechargePaySuccess',
          },
          {
            path: '/CapitalManage/RechargePayError',
            name: 'error',
            hideInMenu: true,
            component: './V1/CapitalManage/RechargePayError',
          },
          {
            path: '/CapitalManage/WithdrawSuccess',
            name: 'withdrawSuccess',
            hideInMenu: true,
            component: './V1/CapitalManage/WithdrawSuccess',
          },
        ],
      },
      // 推手中心
      {
        path: '/tuishou',
        name: 'dashboard',
        icon: 'dashboard',
        component: './V1_Tuishou/Dashboard',
        authority: ['tuishou'],
      },
      {
        path: '/tuishou-platform',
        name: 'platform',
        icon: 'profile',
        authority: ['tuishou'],
        routes: [
          {
            name: 'h5',
            path: '/tuishou-platform/h5',
            component: './V1_Tuishou/Platform/H5',
          },
        ],
      },
      {
        path: '/tuishou-account',
        name: 'tygj',
        icon: 'profile',
        authority: ['tuishou'],
        routes: [
          {
            name: 'pid',
            path: '/tuishou-account/pid',
            component: './V1_Tuishou/Account/Pid',
          },
          {
            name: 'favorite',
            path: '/tuishou-account/favorite',
            component: './V1_Tuishou/Account/Favorite',
          },
        ],
      },
      {
        path: '/tuishou-order',
        name: 'tgxg',
        icon: 'profile',
        authority: ['tuishou'],
        routes: [
          {
            name: 'order',
            path: '/tuishou-order/index',
            component: './V1_Tuishou/Order/List',
          },
        ],
      },
      // 招商代理中心
      {
        path: '/zhaoshang',
        name: 'dashboard',
        icon: 'dashboard',
        component: './V1_Zhaoshang/Dashboard',
        authority: ['zhaoshang'],
      },
      {
        path: '/zhaoshang-capital',
        name: 'proxyCapital',
        icon: 'profile',
        authority: ['zhaoshang'],
        routes: [
          {
            name: 'capital',
            path: '/zhaoshang-capital/capital',
            component: './V1_Zhaoshang/Capital/Capital',
          },
          {
            name: 'withdraw',
            path: '/zhaoshang-capital/withdraw',
            component: './V1_Zhaoshang/Capital/Withdraw',
          },
          {
            name: 'payee',
            path: '/zhaoshang-capital/payee',
            component: './V1_Zhaoshang/Capital/Payee',
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        hideInMenu: true,
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/basic/:id',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        hideInMenu: true,
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      //  editor
      {
        name: 'editor',
        icon: 'highlight',
        path: '/editor',
        hideInMenu: true,
        routes: [
          {
            path: '/editor/flow',
            name: 'flow',
            component: './Editor/GGEditor/Flow',
          },
          {
            path: '/editor/mind',
            name: 'mind',
            component: './Editor/GGEditor/Mind',
          },
          {
            path: '/editor/koni',
            name: 'koni',
            component: './Editor/GGEditor/Koni',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
