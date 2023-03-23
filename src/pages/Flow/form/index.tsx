import {JsonSchemaForm, NsGraph, NsNodeCmd, XFlowNodeCommands} from '@antv/xflow'
import { set } from 'lodash'
import {NsJsonSchemaForm} from "@antv/xflow-extension/es/canvas-json-schema-form";
import {Cell} from "@antv/x6";
import {IGraphCommandService, IModelService} from "@antv/xflow-core";
import {
  getApproveControls, getConditionControls,
  getDefaultControls, getEndControls, getExclusiveGatewayControls,
  getMailControls,
  getParallelGatewayControls,
  getStartControls
} from "@/pages/Flow/form/controls";
import {controlMapService} from "@/pages/Flow/form/custom-shapes";

/** 保存form的values */
export const formValueUpdateService: NsJsonSchemaForm.IFormValueUpdateService = async args => {
  const { allFields, commandService, targetData } = args
  const updateNode = (node: NsGraph.INodeConfig) => {
    return commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
      XFlowNodeCommands.UPDATE_NODE.id,
      { nodeConfig: node },
    )
  }
  // @ts-ignore
  const nodeConfig: NsGraph.INodeConfig = {
    ...targetData,
  }
  allFields.forEach(val => {
    set(nodeConfig, val.name, val.value)
  })
  await updateNode(nodeConfig);


  console.log('nodeConfig: 更新后', nodeConfig)
}

const formSchemaService = async (args: {
  cell: Cell;
  targetType: NsJsonSchemaForm.TargetType;
  targetData: NsJsonSchemaForm.TargetData;
  modelService: IModelService;
  commandService: IGraphCommandService;
}) => {
  const {targetType, targetData} = args
  // @ts-ignore
  const {label,renderKey} = targetData ? targetData : {label: undefined}
  const isGroup = args.targetData?.isGroup
  const nodeSchema = {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '节点名',
                disabled: true,
                value: label,
                name: 'label',
                shape: 'rename-service',
              },{
                label: '节点ID',
                disabled: true,
                value: label,
                name: 'id',
                shape: 'rename-service',
              },
            ],
          },
        ],
      },
    ],
  }
  if (isGroup) {
    // TODO
  }
  if (targetType === 'edge') {
    // TODO
  }
  if (targetType === 'node') {

    switch (renderKey) {
      case 'startEvent':
        return getStartControls();
      case 'endEvent':
        return getEndControls();
      case 'userTask':
        return getApproveControls(targetData);
      case 'exclusiveGateway':
        return getExclusiveGatewayControls();
      case 'parallelGateway':
        return getParallelGatewayControls();
      case 'condition':
        return getConditionControls(targetData);
      case 'mailEvent':
        return getMailControls();
    }
    return nodeSchema
  }

  return getDefaultControls()
}

export const CustomFlowchartFormPanel = () => {
  return (
    <JsonSchemaForm
      controlMapService={controlMapService}
      formSchemaService={formSchemaService}
      formValueUpdateService={formValueUpdateService}
      position={{ top: 40, bottom: 0, right: 0, width: 260 }}
    />
  )
}
