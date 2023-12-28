import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: '',
  },
  layout: {
    title: '@umijs/max',
  },
  dva: {},
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '测试测试',
      path: '/home',
      component: './Home',
    },
    {
      name: 'Camunda用户演示',
      path: '/camunda',
      component: './Camunda',
    },
    {
      name: 'Camunda用户组演示',
      path: '/group',
      component: './Group',
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  cssLoaderModules: {
    exportLocalsConvention: 'camelCase',
  },
  npmClient: 'pnpm',
});
