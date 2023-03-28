import './index.less'
import {NodeCard} from "@/pages/FlowDesignable/node/components/NodeCard";

export const ParallelGatewayNode = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title: '并行网关',
        headerBackground: '#e5e106',
      }}
      context={{
        body: label
      }}
    />
  )
}
