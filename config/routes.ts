export default [
  {
    path: '/user',
    layout: false,
    routes: [{name: '登录', path: '/user/login', component: './User/Login'}],
  },
  {path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome'},
  {
    path: '/flow/designable/:type/:flowId',
    layout: false,
    name: '工作流设计器',
    icon: 'CodeOutlined',
    component: './FlowDesignable'
  },
  {path: '/form/designable/:formId', layout: false, name: '表单设计器', icon: 'CodeOutlined', component: './FormDesignable'},
  {path: '/task', name: '任务中心', icon: 'ReconciliationOutlined', component: './Task'},
  {path: '/task/details/:definitionId/:taskId', name: '任务详情', hideInMenu: true, icon: 'ReconciliationOutlined', component: './Task/Details'},
  {path: '/definition', name: '流程定义', icon: 'NodeIndexOutlined', component: './Definition'},
  {path: '/form', name: '动态表单', icon: 'CodeOutlined', component: './Form'},
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
