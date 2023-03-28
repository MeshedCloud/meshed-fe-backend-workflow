import './index.less'
import {NodeCard} from "@/pages/FlowDesignable/node/components/NodeCard";

// import {Card} from "antd";


export const StartNode = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title:'开始',
        headerBackground: '#576a95',
      }}
      context={{
        body: label
      }}
    />
  )
}
