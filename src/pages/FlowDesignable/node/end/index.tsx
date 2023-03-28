import './index.less'
import {NodeCard} from "@/pages/FlowDesignable/node/components/NodeCard";

export const EndNode = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title: '结束',
        headerBackground: '#d0d2d5',
      }}
      context={{
        body: label
      }}
    />
  )
}
