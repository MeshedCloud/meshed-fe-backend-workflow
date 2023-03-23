import './index.less'
import {NodeCard} from "@/pages/Flow/node/components/NodeCard";

export const InitiatorNode = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title: '发起人',
        headerBackground: '#0a97ce',
      }}
      context={{
        body: label
      }}
    />
  )
}
