export default [
  {
    path: '/user',
    layout: false,
    routes: [{name: '登录', path: '/user/login', component: './User/Login'}],
  },
  {
    path: '/flow/designable/:type/:flowId',
    layout: false,
    access: 'canAdmin',
    name: '工作流设计器',
    icon: 'CodeOutlined',
    component: './FlowDesignable'
  },
  {
    path: '/form/designable/:formId',
    access: 'canAdmin',
    layout: false,
    name: '表单设计器',
    icon: 'CodeOutlined',
    component: './FormDesignable'
  },
  {path: '/task/', name: '任务中心', access: 'canTask', icon: 'ReconciliationOutlined', component: './Task'},
  {
    path: '/task/details/:type/:instanceId/:taskId',
    name: '任务详情',
    access: 'canTask',
    hideInMenu: true,
    icon: 'ReconciliationOutlined',
    component: './Task/Details'
  },
  {path: '/definition/', name: '流程定义', access: 'canAdmin', icon: 'NodeIndexOutlined', component: './Definition'},
  {path: '/form/', name: '动态表单', access: 'canAdmin', icon: 'CodeOutlined', component: './Form'},
  {path: '/', redirect: '/task'},
  {path: '/error/:code', layout: false, component: './error'},
  {path: '*', redirect: '/error/404'},
];
