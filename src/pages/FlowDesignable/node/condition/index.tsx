import './index.less'
import {NodeCard} from "@/pages/FlowDesignable/node/components/NodeCard";

export const ConditionNode = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title: '条件',
        headerBackground: 'rgb(79,75,75)',
      }}
      context={{
        body: label
      }}
    />
  )
}
