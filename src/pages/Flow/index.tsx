import {IApplication, IAppLoad} from '@antv/xflow'
import React, {useRef, useEffect} from 'react'
/** 交互组件 */
import {
  /** XFlow核心组件 */
    XFlow,
  /** 流程图画布组件 */
    FlowchartCanvas,
  /** 流程图配置扩展 */
    FlowchartExtension,
  /** 流程图节点组件 */
    FlowchartNodePanel,
  /** 流程图表单组件 */
  // FlowchartFormPanel,
  /** 通用组件：快捷键 */
    KeyBindings,
  /** 通用组件：画布缩放 */
    CanvasScaleToolbar,
  /** 通用组件：右键菜单 */
    CanvasContextMenu,
  /** 通用组件：工具栏 */
    CanvasToolbar,
  /** 通用组件：对齐线 */
    CanvasSnapline,
  /** 通用组件：节点连接桩 */
    CanvasNodePortTooltip,
} from '@antv/xflow'
import type {Graph} from '@antv/x6'
/** 配置Command*/
import {useCmdConfig} from './config/config-cmd'
/** 配置Menu */
import {useMenuConfig} from './config/config-menu'
/** 配置Toolbar */
import {useToolbarConfig} from './config/config-toolbar'
/** 配置快捷键 */
import {useKeybindingConfig} from './config/config-keybinding'

import './index.less'
import '@antv/xflow/dist/index.css'
import {registerNode} from "@/pages/Flow/config/config-register-node";
import {CustomFlowchartFormPanel} from "@/pages/Flow/form";

import {initGraphCmds} from "@/pages/Flow/config/graph-cmd";

import {useMatch} from "@@/exports";

export interface IProps {
  meta: { flowId: string }
}

const FlowDesigner: React.FC<IProps> = props => {
  // @ts-ignore
  const {params: {flowId, type}} = useMatch('/flow/designable/:type/:flowId')
  const meta = {
    type: type,
    flowId: flowId
  }
  const toolbarConfig = useToolbarConfig()
  const menuConfig = useMenuConfig()
  const keybindingConfig = useKeybindingConfig()
  const graphRef = useRef<Graph>()
  const commandConfig = useCmdConfig()

  const cache = React.useMemo<{ app: IApplication | null } | null>(
    () => ({
      app: null,
    }),
    [],
  )

  /**
   * @param app 当前XFlow工作空间
   * @param extensionRegistry 当前XFlow配置项
   */
  const onLoad: IAppLoad = async app => {
    console.log("app", app)
    // @ts-ignore
    cache.app = app
    graphRef.current = await app.getGraphInstance()
    if (app) {
      initGraphCmds(app,flowId)
    }
  }

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.on('node:click', (...arg) => {
        console.log(arg)
      })
    }
    console.log(cache)
    if (cache && cache.app) {
      console.log("cache")
      initGraphCmds(cache.app,flowId)
    }
  }, [graphRef])


  return (
    <XFlow
      className="flow-user-custom-clz"
      commandConfig={commandConfig}
      onLoad={onLoad}
      meta={meta}
    >
      <FlowchartExtension/>
      <FlowchartNodePanel
        show={true}
        showOfficial={false}
        defaultActiveKey={['base', 'condition', 'event']}
        // @ts-ignore
        registerNode={registerNode}
        position={{width: 162, top: 40, bottom: 0, left: 0}}
      />
      <CanvasToolbar
        className="xflow-workspace-toolbar-top"
        layout="horizontal"
        config={toolbarConfig}
        position={{top: 0, left: 0, right: 0, bottom: 0}}
      />
      <FlowchartCanvas position={{top: 40, left: 0, right: 0, bottom: 0}}>
        <CanvasScaleToolbar
          layout="horizontal"
          position={{top: -40, right: 0}}
          style={{
            width: 150,
            left: 'auto',
            height: 39,
          }}
        />
        <CanvasContextMenu config={menuConfig}/>
        <CanvasSnapline color="#faad14"/>
        <CanvasNodePortTooltip/>
      </FlowchartCanvas>
      <CustomFlowchartFormPanel/>
      <KeyBindings config={keybindingConfig}/>
    </XFlow>
  )
}

// @ts-ignore
export default FlowDesigner;
