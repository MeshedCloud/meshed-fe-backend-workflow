import './index.less'
import * as React from "react";

// import {Card} from "antd";

interface NodeCardProps {
  header: {
    headerBackground?: string;
    headerColor?: string;
    title: React.ReactNode | string
  },
  context: {
    contextBackground?: string;
    contextColor?: string;
    body: React.ReactNode | string
  },
}

export const NodeCard = (props: NodeCardProps) => {
  const {header: {headerBackground,headerColor,title}, context: {contextBackground,contextColor,body}} = props
  return (
    <div className='box'>
      <div className='header' style={{
        background: headerBackground ? headerBackground : '#9a9595',
        color: headerColor ? headerColor : "#fff"
      }}>
        {title}
      </div>
      <div className='context' style={{
        background: contextBackground ? contextBackground : '#ffffff',
        color: contextColor ? contextColor : "#000"
      }}>
        {body}
      </div>
    </div>
  )
}
