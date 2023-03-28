import type { NsGraphCmd } from '@antv/xflow'
import { XFlowGraphCommands } from '@antv/xflow'
import type { IApplication } from '@antv/xflow'
import type { IGraphPipelineCommand } from '@antv/xflow'
import {getFlowDesignableGraph} from "@/services/flow/api";

/** 查询图的节点和边的数据 */
export const initGraphCmds = (app: IApplication,flowId: string) => {
  app.executeCommandPipeline([
    /** 1. 从服务端获取数据 */
    {
      commandId: XFlowGraphCommands.LOAD_DATA.id,
      getCommandOption: async () => {
        // const res = await getFlowDesignableGraph(flowId)
        // console.log(res)
        return {
          args: {
            loadDataService: getFlowDesignableGraph,
          },
        }
      },
    } as IGraphPipelineCommand<NsGraphCmd.GraphLoadData.IArgs>,
    /** 2. 执行布局算法 */
    {
      commandId: XFlowGraphCommands.GRAPH_LAYOUT.id,
      getCommandOption: async ctx => {
        const { graphData } = ctx.getResult()
        return {
          args: {
            layoutType: 'dagre',
            layoutOptions: {
              type: 'dagre',
              /** 布局方向 */
              rankdir: 'TB',
              /** 节点间距 */
              nodesep: 60,
              /** 层间距 */
              ranksep: 30,
            },
            graphData,
          },
        }
      },
    } as IGraphPipelineCommand<NsGraphCmd.GraphLayout.IArgs>,
    /** 3. 画布内容渲染 */
    {
      commandId: XFlowGraphCommands.GRAPH_RENDER.id,
      getCommandOption: async ctx => {
        const { graphData } = ctx.getResult()
        return {
          args: {
            graphData,
          },
        }
      },
    } as IGraphPipelineCommand<NsGraphCmd.GraphRender.IArgs>,
    /** 4. 缩放画布 */
    {
      commandId: XFlowGraphCommands.GRAPH_ZOOM.id,
      getCommandOption: async () => {
        return {
          args: { factor: 'fit', zoomOptions: { maxScale: 1 } },
        }
      },
    } as IGraphPipelineCommand<NsGraphCmd.GraphZoom.IArgs>,
  ])
}
