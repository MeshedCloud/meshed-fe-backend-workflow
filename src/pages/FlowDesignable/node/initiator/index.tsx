import './index.less'
import {NodeCard} from "@/pages/FlowDesignable/node/components/NodeCard";

export const InitiatorNode = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title: '提交',
        headerBackground: '#0a97ce',
      }}
      context={{
        body: label
      }}
    />
  )
}
