export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
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
        component: './V1/Public/Index',
      },
      {
        path: '/public/helpCenter',
        name: 'help',
        component: './V1/Public/HelpCenter',
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
      { path: '/', redirect: '/homePage', authority: ['admin', 'user'] },
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
      // { path: '/', redirect: '/homePage/index', authority: ['admin', 'user'] },
      {
        path: '/homePage',
        name: 'dashboard',
        icon: 'dashboard',
        component: './V1/HomePage/index',
        hideChildrenInMenu: true,
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
        ],
      },
      // myOrder
      {
        path: '/order',
        icon: 'table',
        name: 'order',
        routes: [
          {
            path: '/order/Index',
            name: 'index',
            component: './V1/MyOrder/Index',
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
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        hideInMenu: true,
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
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
