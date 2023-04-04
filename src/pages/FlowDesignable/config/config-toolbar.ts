import {
  createToolbarConfig,
  IModelService,
  IToolbarItemOptions,
  NsGroupCmd,
  uuidv4,
  XFlowGroupCommands,
  XFlowNodeCommands,
  XFlowGraphCommands,
  NsGraphCmd,
  NsNodeCmd,
  IconStore,
  MODELS, NsGraph,
} from '@antv/xflow'
import {
  UngroupOutlined,
  SaveOutlined,
  GroupOutlined,
  GatewayOutlined,
  UndoOutlined,
  RedoOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  CopyOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'
import {cloneDeep} from "lodash";
import {success, tips} from "@/common/messages";
import {saveFlowDesigner} from "@/services/flow/api";
const GROUP_NODE_RENDER_ID = 'GROUP_NODE_RENDER_ID'

export namespace TOOLBAR_ITEMS {
  export const BACK_NODE = XFlowNodeCommands.BACK_NODE.id
  export const FRONT_NODE = XFlowNodeCommands.FRONT_NODE.id
  export const SAVE_GRAPH_DATA = XFlowGraphCommands.SAVE_GRAPH_DATA.id
  export const REDO_CMD = `${XFlowGraphCommands.REDO_CMD.id}`
  export const UNDO_CMD = `${XFlowGraphCommands.UNDO_CMD.id}`
  export const MULTI_SELECT = `${XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT.id}`
  export const ADD_GROUP = `${XFlowGroupCommands.ADD_GROUP.id}`
  export const DEL_GROUP = `${XFlowGroupCommands.DEL_GROUP.id}`
  export const COPY = `${XFlowGraphCommands.GRAPH_COPY.id}`
  export const PASTE = `${XFlowGraphCommands.GRAPH_PASTE.id}`
}

namespace NSToolbarConfig {
  /** toolbar依赖的状态 */
  export interface IToolbarState {
    isMultiSelectionActive: boolean
    isGroupSelected: boolean
    isNodeSelected: boolean
    isUndoable: boolean
    isRedoable: boolean
  }

  export const getDependencies = async (modelService: IModelService) => {
    return [
      await MODELS.SELECTED_NODES.getModel(modelService),
      await MODELS.GRAPH_ENABLE_MULTI_SELECT.getModel(modelService),
    ]
  }

  /** toolbar依赖的状态 */
  export const getToolbarState = async (modelService: IModelService) => {
    // isMultiSelectionActive
    const { isEnable: isMultiSelectionActive } = await MODELS.GRAPH_ENABLE_MULTI_SELECT.useValue(
      modelService,
    )
    // isGroupSelected
    const isGroupSelected = await MODELS.IS_GROUP_SELECTED.useValue(modelService)
    // isNormalNodesSelected: node不能是GroupNode
    const isNormalNodesSelected = await MODELS.IS_NORMAL_NODES_SELECTED.useValue(modelService)
    // undo redo
    const isUndoable = await MODELS.COMMAND_UNDOABLE.useValue(modelService)
    const isRedoable = await MODELS.COMMAND_REDOABLE.useValue(modelService)

    return {
      isUndoable,
      isRedoable,
      isNodeSelected: isNormalNodesSelected,
      isGroupSelected,
      isMultiSelectionActive,
    } as NSToolbarConfig.IToolbarState
  }

  export const getToolbarItems = async (state: IToolbarState) => {
    const toolbarGroup: IToolbarItemOptions[] = []
    // const history = getGraphHistory()

    // /** 撤销 */
    // toolbarGroup.push({
    //   tooltip: '撤销',
    //   iconName: 'UndoOutlined',
    //   id: TOOLBAR_ITEMS.UNDO_CMD,
    //   isEnabled: history.canUndo(),
    //   onClick: async () => {
    //     history.undo()
    //   },
    // })

    // /** 重做 */
    // toolbarGroup.push({
    //   tooltip: '重做',
    //   iconName: 'RedoOutlined',
    //   id: TOOLBAR_ITEMS.REDO_CMD,
    //   isEnabled: history.canRedo(),
    //   onClick: async () => {
    //     history.redo()
    //   },
    // })

    /** FRONT_NODE */
    toolbarGroup.push({
      tooltip: '置前',
      iconName: 'VerticalAlignTopOutlined',
      id: TOOLBAR_ITEMS.FRONT_NODE,
      isEnabled: state.isNodeSelected,
      onClick: async ({ commandService, modelService }) => {
        const node = await MODELS.SELECTED_NODE.useValue(modelService)
        commandService.executeCommand<NsNodeCmd.FrontNode.IArgs>(TOOLBAR_ITEMS.FRONT_NODE, {
          nodeId: node?.id,
        })
      },
    })

    /** BACK_NODE */
    toolbarGroup.push({
      tooltip: '置后',
      iconName: 'VerticalAlignBottomOutlined',
      id: TOOLBAR_ITEMS.BACK_NODE,
      isEnabled: state.isNodeSelected,
      onClick: async ({ commandService, modelService }) => {
        const node = await MODELS.SELECTED_NODE.useValue(modelService)
        commandService.executeCommand<NsNodeCmd.FrontNode.IArgs>(TOOLBAR_ITEMS.BACK_NODE, {
          nodeId: node?.id,
        })
      },
    })

    /** 开启框选 */
    toolbarGroup.push({
      tooltip: '开启框选',
      iconName: 'GatewayOutlined',
      id: TOOLBAR_ITEMS.MULTI_SELECT,
      active: state.isMultiSelectionActive,
      onClick: async ({ commandService }) => {
        commandService.executeCommand<NsGraphCmd.GraphToggleMultiSelect.IArgs>(
          TOOLBAR_ITEMS.MULTI_SELECT,
          {},
        )
      },
    })

    /** 新建群组 */
    toolbarGroup.push({
      tooltip: '新建群组',
      iconName: 'GroupOutlined',
      id: TOOLBAR_ITEMS.ADD_GROUP,
      isEnabled: state.isNodeSelected,
      onClick: async ({ commandService, modelService }) => {
        const cells = await MODELS.SELECTED_CELLS.useValue(modelService)
        const groupChildren = cells.map(cell => cell.id)
        commandService.executeCommand<NsGroupCmd.AddGroup.IArgs>(TOOLBAR_ITEMS.ADD_GROUP, {
          nodeConfig: {
            id: uuidv4(),
            renderKey: GROUP_NODE_RENDER_ID,
            groupChildren,
            groupCollapsedSize: { width: 200, height: 40 },
            label: '新建群组',
          },
        })
      },
    })

    /** 解散群组 */
    toolbarGroup.push({
      tooltip: '解散群组',
      iconName: 'UngroupOutlined',
      id: TOOLBAR_ITEMS.DEL_GROUP,
      isEnabled: state.isGroupSelected,
      onClick: async ({ commandService, modelService }) => {
        const cell = await MODELS.SELECTED_NODE.useValue(modelService)
        const nodeConfig = cell.getData()
        commandService.executeCommand<NsGroupCmd.AddGroup.IArgs>(XFlowGroupCommands.DEL_GROUP.id, {
          nodeConfig: nodeConfig,
        })
      },
    })

    function simplifyEdge(edges: any[]) {
      edges.forEach((edge: any,index) => {
        edge.data = undefined
        edge.attrs = undefined
        edge.labels = []
      })
    }

    function simplify(graphData: NsGraph.IGraphData) {
      const graph = cloneDeep(graphData);
      graph.nodes.forEach((node: any) => {
        delete node.originData;
        delete node.ports.groups;
        if (node.outgoingEdges) {
          simplifyEdge(node.outgoingEdges);
        }
        if (node.incomingEdges) {
          simplifyEdge(node.incomingEdges);
        }
      })
      graph.edges.forEach((edge: any) => {
        delete edge.data;
      })
      return graph;
    }

    /** 保存数据 */
    toolbarGroup.push({
      tooltip: '保存',
      iconName: 'SaveOutlined',
      id: TOOLBAR_ITEMS.SAVE_GRAPH_DATA,
      onClick: async ({ commandService }) => {
        commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
          TOOLBAR_ITEMS.SAVE_GRAPH_DATA,
          {
            // @ts-ignore
            saveGraphDataService: (meta, graphData) => {
              console.log(meta)
              if (meta.type == 'edit'){
                console.log(JSON.stringify(graphData))
                //简化数据
                const graph = simplify(graphData);
                console.log(JSON.stringify(graph))
                saveFlowDesigner({flowId: meta.flowId,graph:JSON.stringify(graph)}).then(res =>{
                  success(res,"保存成功")
                })
                //保存
              } else {
                tips("查看状态不能保存")
              }
              return graphData
            },
          },
        )
      },
    })


    return [
      {
        name: 'graphData',
        items: toolbarGroup,
      },
    ]
  }
}

/** 注册icon 类型 */
const registerIcon = () => {
  IconStore.set('SaveOutlined', SaveOutlined)
  IconStore.set('UndoOutlined', UndoOutlined)
  IconStore.set('RedoOutlined', RedoOutlined)
  IconStore.set('VerticalAlignTopOutlined', VerticalAlignTopOutlined)
  IconStore.set('VerticalAlignBottomOutlined', VerticalAlignBottomOutlined)
  IconStore.set('GatewayOutlined', GatewayOutlined)
  IconStore.set('GroupOutlined', GroupOutlined)
  IconStore.set('UngroupOutlined', UngroupOutlined)
  IconStore.set('CopyOutlined', CopyOutlined)
  IconStore.set('SnippetsOutlined', SnippetsOutlined)
}

export const useToolbarConfig = createToolbarConfig((toolbarConfig, proxy) => {
  registerIcon()
  /** 生产 toolbar item */
  toolbarConfig.setToolbarModelService(async (toolbarModel, modelService, toDispose) => {
    const updateToolbarModel = async () => {
      const state = await NSToolbarConfig.getToolbarState(modelService)
      const toolbarItems = await NSToolbarConfig.getToolbarItems(state)

      toolbarModel.setValue(toolbar => {
        toolbar.mainGroups = toolbarItems
      })
    }
    const models = await NSToolbarConfig.getDependencies(modelService)
    const subscriptions = models.map(model => {
      return model.watch(async () => {
        updateToolbarModel()
      })
    })
    toDispose.pushAll(subscriptions)
  })
})
