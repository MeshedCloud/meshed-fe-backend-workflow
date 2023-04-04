import {JsonSchemaForm, NsEdgeCmd, NsGraph, NsNodeCmd, XFlowEdgeCommands, XFlowNodeCommands} from '@antv/xflow'
import { set } from 'lodash'
import {NsJsonSchemaForm} from "@antv/xflow-extension/es/canvas-json-schema-form";
import {Cell} from "@antv/x6";
import {IGraphCommandService, IModelService} from "@antv/xflow-core";
import {
  getApproveControls, getConditionControls,
  getDefaultControls, getEdgeControls, getEndControls, getExclusiveGatewayControls, getInitiatorControls,
  getMailControls,
  getParallelGatewayControls,
  getStartControls
} from "@/pages/FlowDesignable/form/controls";
import {controlMapService} from "@/pages/FlowDesignable/form/custom-shapes";

/** 保存form的values */
export const formValueUpdateService: NsJsonSchemaForm.IFormValueUpdateService = async args => {
  const { allFields, commandService, targetData } = args
  const updateNode = (node: NsGraph.INodeConfig) => {
    return commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
      XFlowNodeCommands.UPDATE_NODE.id,
      { nodeConfig: node },
    )
  }
  const updateEdge = (edge: NsGraph.IEdgeConfig) => {
    return commandService.executeCommand<NsEdgeCmd.UpdateEdge.IArgs>(
      XFlowEdgeCommands.UPDATE_EDGE.id,
      // @ts-ignore
      { edgeConfig: edge },
    )
  }
  // @ts-ignore
  const data = {
    ...targetData,
  }

  allFields.forEach(val => {
    set(data, val.name, val.value)
  })
  console.log("data ",data)
  if (args.targetType === 'edge') {
    updateEdge(data as NsGraph.IEdgeConfig)
  } else if (args.targetType === 'node') {
    updateNode(data as NsGraph.INodeConfig)
  }
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
  const {renderKey} = targetData ? targetData : {}
  const isGroup = args.targetData?.isGroup

  if (targetData === undefined){
    return getDefaultControls()
  }

  if (isGroup) {
    // TODO
  }
  if (targetType === 'edge') {
    return getEdgeControls(targetData)
  }
  if (targetType === 'node') {

    switch (renderKey) {
      case 'startEvent':
        return getStartControls(targetData);
      case 'endEvent':
        return getEndControls();
      case 'initiatorEvent':
        return getInitiatorControls(targetData);
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
  }

  return getDefaultControls()
}

export const CustomFlowchartFormPanel = () => {
  return (
    <JsonSchemaForm
      targetType={['node', 'edge', 'canvas']}
      controlMapService={controlMapService}
      formSchemaService={formSchemaService}
      formValueUpdateService={formValueUpdateService}
      position={{ top: 40, bottom: 0, right: 0, width: 260 }}
    />
  )
}
