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
  const {formKey, id, label} = schema
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
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '节点名称',
                placeholder: '请输入节点名称',
                name: 'label',
                value: label,
                shape: ControlShape.INPUT,
                required: true,
              },
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


export const getEndControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {id, label} = schema

  return {
    tabs: [
      {
        name: '结束事件',
        groups: [{
          name: 'EndEvent',
          controls: [
            {
              label: '节点ID',
              placeholder: '请输入节点ID',
              name: 'id',
              value: id,
              disabled: true,
              shape: ControlShape.INPUT,
              required: true,
            },
            {
              label: '节点名称',
              placeholder: '请输入节点名称',
              name: 'label',
              value: label,
              shape: ControlShape.INPUT,
              required: true,
            }

          ],
        }]
      },
    ],
  }
}

export const getApproveControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {userType,id, label, dataType, assignee, candidateUsers, candidateGroups, skipExpression, dynamicExpression} = schema
  const userSelectStr = sessionStorage.getItem("userSelect");
  let userSelect = []
  if (userSelectStr) {
    userSelect = JSON.parse(userSelectStr as string);
  }

  let roleSelect = []
  const roleSelectStr = sessionStorage.getItem("roleSelect")
  if (roleSelectStr) {
    roleSelect = JSON.parse(roleSelectStr as string);
  }

  return {
    tabs: [
      {
        name: '审批设置',
        groups: [
          {
            name: 'userTask',
            controls: [
              {
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '节点名称',
                placeholder: '请输入节点名称',
                name: 'label',
                value: label,
                shape: ControlShape.INPUT,
                required: true,
              },
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
                options: userSelect
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
                options: userSelect
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
                options: roleSelect
              },
              {
                label: '动态表达式',
                tooltip: '可以从候选组中选择参与角色来完成任务',
                placeholder: '请选择候选组',
                name: 'dynamicExpression',
                value: dynamicExpression,
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
                shape: ControlShape.INPUT,
                required: false
              },
            ],
          },
        ],
      },
    ],
  }
}
export const getInitiatorControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {label, id, autoComplete} = schema
  return {
    tabs: [
      {
        name: '发起人配置',
        groups: [
          {
            name: 'userTask',
            controls: [
              {
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '节点名称',
                placeholder: '请输入节点名称',
                name: 'label',
                value: label,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '是否自动完成',
                tooltip: '是否自动完成',
                placeholder: '请输入跳过条件的EL表达式',
                name: 'autoComplete',
                value: autoComplete,
                shape: ControlShape.CHECKBOX,
                required: false
              },
            ],
          },
        ],
      },
    ],
  }
}

export const getExclusiveGatewayControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {id,label} = schema;
  return {
    tabs: [
      {
        name: '网关配置',
        groups: [
          {
            name: 'mail',
            controls: [
              {
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '节点名称',
                placeholder: '请输入节点名称',
                name: 'label',
                value: label,
                shape: ControlShape.INPUT,
                required: true,
              }
            ],
          },
        ],
      },
    ],
  }
}

export const getParallelGatewayControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {id,label} = schema;
  return {
    tabs: [
      {
        name: '网关配置',
        groups: [
          {
            name: 'mail',
            controls: [
              {
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '节点名称',
                placeholder: '请输入节点名称',
                name: 'label',
                value: label,
                shape: ControlShape.INPUT,
                required: true,
              }
            ],
          },
        ],
      },
    ],
  }
}

export const getConditionControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {conditionExpression, id} = schema;
  return {
    tabs: [
      {
        name: '条件配置',
        groups: [
          {
            name: 'condition',
            controls: [
              {
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
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
  const {conditionExpression, id} = schema;
  return {
    tabs: [
      {
        name: '条件配置',
        groups: [
          {
            name: 'edge',
            controls: [
              {
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
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

export const getMailControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {id,label, to, cc, bcc, subject, htmlVar, skipExpression} = schema;
  return {
    tabs: [
      {
        name: '邮件配置',
        groups: [
          {
            name: 'mail',
            controls: [
              {
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '节点名称',
                placeholder: '请输入节点名称',
                name: 'label',
                value: label,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '收件人',
                tooltip: '邮件的收信人。可以使用逗号分隔的列表定义多个接收人',
                placeholder: '请输入收件人',
                name: 'to',
                value: to,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '抄送人',
                tooltip: '邮件的抄送人。可以使用逗号分隔的列表定义多个接收人',
                placeholder: '请输入节点名称',
                name: 'cc',
                value: cc,
                shape: ControlShape.INPUT,
                required: false,
              },
              {
                label: '密送',
                tooltip: '邮件的密送人。可以使用逗号分隔的列表定义多个接收人',
                placeholder: '请输入节点名称',
                name: 'bcc',
                value: bcc,
                shape: ControlShape.INPUT,
                required: false,
              },
              {
                label: '主题',
                placeholder: '请输入主题',
                name: 'subject',
                value: subject,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '邮件内容',
                tooltip: '内容可使用EL表达式获取当前数据',
                placeholder: '请输入节点名称',
                name: 'htmlVar',
                value: htmlVar,
                shape: ControlShape.TEXTAREA,
                required: true,
              },
              {
                label: '跳过表达式',
                tooltip: '跳过条件',
                placeholder: '请输入跳过条件的EL表达式',
                name: 'skipExpression',
                value: skipExpression,
                shape: ControlShape.INPUT,
                required: false
              }
            ],
          },
        ],
      },
    ],
  }
}

export const getWebHookControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {id, label, requestMethod, requestHeaders, requestUrl, contentType, requestBody, requestTimeout, failStatusCodes, handleStatusCodes, skipExpression} = schema;
  return {
    tabs: [
      {
        name: 'Webhook配置',
        groups: [
          {
            name: 'webhook',
            controls: [
              {
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '节点名称',
                placeholder: '请输入节点名称',
                name: 'label',
                value: label,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '请求类型',
                tooltip: '请求类型',
                placeholder: '请选择请求类型',
                name: 'requestMethod',
                value: requestMethod,
                defaultValue: 'GET',
                shape: ControlShape.SELECT,
                required: true,
                options: [{
                  title: 'GET',
                  value: "GET",
                }, {
                  title: 'POST',
                  value: "POST",
                }, {
                  title: 'PUT',
                  value: "PUT",
                }, {
                  title: 'DELETE',
                  value: "DELETE",
                }]
              },
              {
                label: '内容类型',
                tooltip: 'JSON/表单',
                placeholder: '请选择请求类型',
                name: 'contentType',
                value: contentType,
                defaultValue: 'JSON',
                shape: ControlShape.SELECT,
                required: true,
                options: [{
                  title: 'JSON',
                  value: "application/json",
                }, {
                  title: '表单',
                  value: "application/x-www-form-urlencoded",
                }]
              },
              {
                label: '回调地址',
                tooltip: '需要全地址，如果需要权限请在请求头中配置',
                placeholder: '请输入回调地址',
                name: 'requestUrl',
                value: requestUrl,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '请求头',
                tooltip: '行分隔的Http请求头。\n 如： Authorization: Basic aGFRlc3Q=',
                placeholder: '请输入请求头',
                name: 'requestHeaders',
                value: requestHeaders,
                shape: ControlShape.TEXTAREA,
                required: false,
              },
              {
                label: '请求数据',
                tooltip: '根据内容类型填写，可使用EL表达式获取当前数据',
                placeholder: '请输入请求数据',
                name: 'requestBody',
                value: requestBody,
                shape: ControlShape.TEXTAREA,
                required: false,
              },
              {
                label: '超时时间',
                tooltip: '请求超时时间。单位为毫秒\n' +
                  '（例如 - 5000）。\n' +
                  '默认值为“0”，即没有超时。',
                placeholder: '超时时间',
                name: 'requestTimeout',
                value: requestTimeout,
                shape: ControlShape.INPUT,
                required: false,
              },
              {
                label: '请求失败状态码',
                tooltip: 'HTTP Status 代码多个可逗号分隔',
                placeholder: '请输入请求失败状态码',
                defaultValue: "400,401,403,500",
                name: 'failStatusCodes',
                value: failStatusCodes,
                shape: ControlShape.INPUT,
                required: false,
              },
              {
                label: '请求成功状态码',
                tooltip: 'HTTP Status 代码多个可逗号分隔',
                placeholder: '请输入请求成功状态码',
                name: 'handleStatusCodes',
                value: handleStatusCodes,
                defaultValue: "200",
                shape: ControlShape.INPUT,
                required: false,
              },
              {
                label: '跳过表达式',
                tooltip: '跳过条件',
                placeholder: '请输入跳过条件的EL表达式',
                name: 'skipExpression',
                value: skipExpression,
                shape: ControlShape.INPUT,
                required: false
              }
            ],
          },
        ],
      },
    ],
  }
}

export const getScsBindingControls = (schema: NsJsonSchemaForm.TargetData): NsJsonSchemaForm.ISchema => {
  // @ts-ignore
  const {id, label, binding, body} = schema;
  return {
    tabs: [
      {
        name: '内部事件配置',
        groups: [
          {
            name: 'webhook',
            controls: [
              {
                label: '节点ID',
                placeholder: '请输入节点ID',
                name: 'id',
                value: id,
                disabled: true,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '节点名称',
                placeholder: '请输入节点名称',
                name: 'label',
                value: label,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: 'MQ Binding',
                tooltip: 'SCS所需要的Binding,需要流程中心以及配置了这个binding',
                placeholder: '请输入回调地址',
                name: 'binding',
                value: binding,
                shape: ControlShape.INPUT,
                required: true,
              },
              {
                label: '消息数据',
                tooltip: '消息数据可使用EL表达式获取当前数据',
                placeholder: '请输入消息数据',
                name: 'body',
                value: body,
                shape: ControlShape.TEXTAREA,
                required: true,
              }
            ],
          },
        ],
      },
    ],
  }
}


