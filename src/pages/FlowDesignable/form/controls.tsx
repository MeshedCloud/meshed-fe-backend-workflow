import {NsJsonSchemaForm} from "@antv/xflow-extension/es/canvas-json-schema-form";
import {ControlShapeEnum} from "@/pages/FlowDesignable/form/custom-shapes";

const {ControlShape} = NsJsonSchemaForm
export const defaultService = (props: { controlSchema: { label: any } }) => {
  const {controlSchema: {label}} = props
  return <p style={{textAlign: 'center'}}>{label ? label : '主画布'}</p>
}

export const getDefaultControls = (): NsJsonSchemaForm.ISchema => {
  return {
    tabs: [
      {
        name: '画布配置',
        groups: [],
      },
    ],
  }
}

export const getStartControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {formKey} = schema
  const formSelect = JSON.parse(sessionStorage.getItem("formSelect") as string);
  return {
    tabs: [
      {
        name: '开始事件',
        groups: [
          {
            name: 'StartEvent',
            controls: [
              {
                label: '主表单',
                tooltip: '挂载流程主要表单',
                placeholder: '请选择表单',
                name: 'formKey',
                value: formKey,
                shape: ControlShapeEnum.CUSTOM_SELECT,
                options: formSelect
              },
            ],
          },
        ],
      },
    ],
  }
}


export const getEndControls = (): NsJsonSchemaForm.ISchema => {
  return {
    tabs: [
      {
        name: '结束事件',
        groups: [],
      },
    ],
  }
}

export const getApproveControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {userType, dataType, assignee, candidateUsers, candidateGroups, skipExpression, dynamicExpression} = schema
  return {
    tabs: [
      {
        name: '审批设置',
        groups: [
          {
            name: 'userTask',
            controls: [
              {
                label: '用户类型',
                tooltip: '指定分配的用户模式类型',
                placeholder: '请选择用户类型',
                name: 'userType',
                value: userType,
                defaultValue: 'assignee',
                shape: ControlShape.SELECT,
                required: true,
                options: [{
                  title: '分配人',
                  value: "assignee",
                }, {
                  title: '候选人',
                  value: "candidateUsers",
                }, {
                  title: '候选组',
                  value: "candidateGroups",
                }]
              },
              {
                label: '分配类型',
                tooltip: '动态表达式或者固定用户分配',
                placeholder: '请选择分配类型',
                name: 'dataType',
                value: dataType,
                defaultValue: 'dynamic',
                shape: ControlShape.SELECT,
                required: true,
                options: [{
                  title: '动态分配',
                  value: "dynamic",
                }, {
                  title: '固定分配',
                  value: "fixed",
                }]
              },
              {
                label: '分配人员',
                tooltip: '任务指定分配的人员',
                placeholder: '请选择分配人员',
                name: 'assignee',
                value: assignee,
                shape: ControlShape.SELECT,
                hidden: true,
                required: true,
                // 联动规则
                dependencies: [
                  {
                    name: ['userType', 'dataType'], condition: args => {
                      return args.userType === 'assignee' && args.dataType === 'fixed'
                    }, disabled: false, hidden: false
                  },
                ],
                options: [{
                  title: '张三',
                  value: "zhangsan",
                }, {
                  title: '李四',
                  value: "lisi",
                }]
              },
              {
                label: '候选人员',
                tooltip: '可以从候选人中选择参与者来完成任务',
                placeholder: '请选择候选人',
                name: 'candidateUsers',
                value: candidateUsers,
                shape: ControlShapeEnum.MULTIPLE_SELECT,
                hidden: true,
                required: true,
                // 联动规则
                dependencies: [
                  {
                    name: ['userType', 'dataType'], condition: args => {
                      return args.userType === 'candidateUsers' && args.dataType === 'fixed'
                    }, disabled: false, hidden: false
                  },
                ],
                options: [{
                  title: '张三',
                  value: "zhangsan",
                }, {
                  title: '李四',
                  value: "lisi",
                }]
              },
              {
                label: '候选组',
                tooltip: '可以从候选组中选择参与角色来完成任务',
                placeholder: '请选择候选组',
                name: 'candidateGroups',
                value: candidateGroups,
                shape: ControlShapeEnum.MULTIPLE_SELECT,
                hidden: true,
                required: true,
                // 联动规则
                dependencies: [
                  {
                    name: ['userType', 'dataType'], condition: args => {
                      return args.userType === 'candidateGroups' && args.dataType === 'fixed'
                    }, disabled: false, hidden: false
                  },
                ],
                options: [{
                  title: '研发管理员',
                  value: "rd-admin",
                }, {
                  title: '运维管理员',
                  value: "devops",
                }]
              },
              {
                label: '动态表达式',
                tooltip: '可以从候选组中选择参与角色来完成任务',
                placeholder: '请选择候选组',
                name: 'dynamicExpression',
                value: dynamicExpression,
                defaultValue: '#{approval}',
                shape: ControlShapeEnum.AUTO_COMPLETE,
                required: true,
                // 联动规则
                dependencies: [
                  {
                    name: 'dataType', condition: 'dynamic', disabled: false, hidden: false
                  },
                  {
                    name: 'dataType', condition: 'fixed', disabled: false, hidden: true
                  },
                ],
                options: [{
                  title: '默认',
                  value: "#{approval}",
                }]
              },
              {
                label: '跳过表达式',
                tooltip: '跳过条件',
                placeholder: '请输入跳过条件的EL表达式',
                name: 'skipExpression',
                value: skipExpression,
                shape: 'input',
                required: false,
              },
            ],
          },
        ],
      },
    ],
  }
}

export const getExclusiveGatewayControls = (): NsJsonSchemaForm.ISchema => {
  return {
    tabs: [
      {
        name: '网关配置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '节点名',
                disabled: true,
                value: "",
                name: 'label',
                shape: 'input',
              },
            ],
          },
        ],
      },
    ],
  }
}

export const getParallelGatewayControls = (): NsJsonSchemaForm.ISchema => {
  return {
    tabs: [
      {
        name: '网关配置',
        groups: [
          {
            name: 'parallelGateway',
            controls: [
              {
                label: '节点名',
                disabled: true,
                value: "",
                name: 'label',
                shape: 'input',
              },
            ],
          },
        ],
      },
    ],
  }
}

export const getConditionControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {conditionExpression} = schema;
  return {
    tabs: [
      {
        name: '条件配置',
        groups: [
          {
            name: 'condition',
            controls: [
              {
                label: '条件表达式',
                tooltip: '流程跳转条件,其中变量通过API调用传递或者表单中填写',
                placeholder: '请输入跳转条件的EL表达式',
                name: 'conditionExpression',
                value: conditionExpression,
                shape: 'input',
                required: true,
              },
            ],
          },
        ],
      },
    ],
  }
}
export const getEdgeControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {conditionExpression} = schema;
  return {
    tabs: [
      {
        name: '条件配置',
        groups: [
          {
            name: 'edge',
            controls: [
              {
                label: '条件表达式',
                tooltip: '流程跳转条件,其中变量通过API调用传递或者表单中填写',
                placeholder: '请输入跳转条件的EL表达式',
                name: 'conditionExpression',
                value: conditionExpression,
                shape: 'input',
                required: true,
              },
            ],
          },
        ],
      },
    ],
  }
}

export const getMailControls = (): NsJsonSchemaForm.ISchema => {
  return {
    tabs: [
      {
        name: '邮件配置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '节点名',
                disabled: true,
                value: "",
                name: 'label',
                shape: 'input',
              },
            ],
          },
        ],
      },
    ],
  }
}

