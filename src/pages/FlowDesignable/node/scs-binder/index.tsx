import './index.less'
import {NodeCard} from "@/pages/FlowDesignable/node/components/NodeCard";

export const ScsBinder = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title: '事件消息',
        headerBackground: '#3db8e7',
      }}
      context={{
        body: label
      }}
    />

  )
}
