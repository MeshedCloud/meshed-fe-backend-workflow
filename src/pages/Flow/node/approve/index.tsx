import './index.less'
import {NodeCard} from "@/pages/Flow/node/components/NodeCard";

export const ApproveNode = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title: '审批',
        headerBackground: '#1890ff',
      }}
      context={{
        body: label
      }}
    />
  )
}
