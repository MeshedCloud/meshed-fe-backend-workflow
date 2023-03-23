import {StartNode} from "@/pages/Flow/node/start";
import {EndNode} from "@/pages/Flow/node/end";
import {ApproveNode} from "@/pages/Flow/node/approve";
import {ExclusiveGatewayNode} from "@/pages/Flow/node/exclusive-gateway";
import {ParallelGatewayNode} from "@/pages/Flow/node/parallel-gateway";
import {MailNode} from "@/pages/Flow/node/mail";
import {InitiatorNode} from "@/pages/Flow/node/initiator";
import {ConditionNode} from "@/pages/Flow/node/condition";

export const registerNode = [{
  key: "base",
  title: '流程节点',
  nodes: [
    {
      component: StartNode,
      popover: () => <div>流程开始</div>,
      name: 'startEvent',
      width: 210,
      height: 65,
      label: '流程开始',
    },
    {
      component: EndNode,
      popover: () => <div>流程结束</div>,
      name: 'endEvent',
      width: 210,
      height: 65,
      label: '流程结束',
    },
    {
      component: InitiatorNode,
      popover: () => <div>流程发起人</div>,
      name: 'initiatorEvent',
      width: 210,
      height: 65,
      label: '发起人',
    },
    {
      component: ApproveNode,
      popover: () => <div>流程审批</div>,
      name: 'userTask',
      width: 210,
      height: 65,
      label: '流程审批',
    },
  ],
}, {
  key: "condition",
  title: '条件节点',
  nodes: [
    {
      component: ExclusiveGatewayNode,
      popover: () => <div>排他网关</div>,
      name: 'exclusiveGateway',
      width: 210,
      height: 65,
      label: '排他网关',
    },
    {
      component: ParallelGatewayNode,
      popover: () => <div>并行网关</div>,
      name: 'parallelGateway',
      width: 210,
      height: 65,
      label: '并行网关',
    },
    {
      component: ConditionNode,
      popover: () => <div>条件</div>,
      name: 'condition',
      width: 210,
      height: 65,
      label: '条件',
    },
  ],
},
  {
  key: "event",
  title: '事件节点',
  nodes: [
    {
      component: MailNode,
      popover: () => <div>邮件事件</div>,
      name: 'mailEvent',
      width: 210,
      height: 65,
      label: '邮件事件',
    },
  ],
}]
