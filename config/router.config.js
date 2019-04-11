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
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/Analysis',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
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
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        hideInMenu: true,
        routes: [
          {
            path: '/fangdan/list',
            name: 'myList',
            component: './V1/FangDan/List',
          },
          {
            path: '/fangdan/list/GeneralizeDetail',
            name: 'generalizeDetail',
            component: './V1/FangDan/List/GeneralizeDetail',
            hideInMenu: true,
          },
          {
            path: '/fangdan/list/order',
            name: 'order',
            component: './V1/FangDan/List/order',
            hideInMenu: true,
          },
        ],
      },
      // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   hideInMenu: true,
      //   routes: [
      //     {
      //       path: '/fangdan/list',
      //       name: 'myList',
      //       component: './V1/FangDan/List',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //       path: '/fangdan/list/GeneralizeDetail',
      //       name: 'generalizeDetail',
      //       component: './V1/FangDan/List/GeneralizeDetail',
      //       hideInMenu: true,
      //     },
      //     {
      //       path: '/fangdan/list/order',
      //       name: 'order',
      //       component: './V1/FangDan/List/order',
      //       hideInMenu: true,
      //     },
      //   ],
      // },
      {
        path: '/list',
        icon: 'table',
        name: 'list',
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
            hideInMenu: true,
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
