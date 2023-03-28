import './index.less'
import {NodeCard} from "@/pages/FlowDesignable/node/components/NodeCard";

export const MailNode = (props: { size?: { width: number; height: number } | undefined; data: any }) => {
  const {data: {label}} = props
  return (
    <NodeCard
      header={{
        title: '邮件',
        headerBackground: '#4c0c0c',
      }}
      context={{
        body: label
      }}
    />

  )
}
