import './index.less'
import {NodeCard} from "@/pages/Flow/node/components/NodeCard";

export const ExclusiveGatewayNode = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title: '排他网关',
        headerBackground: '#be1e1e',
      }}
      context={{
        body: label
      }}
    />

  )
}
