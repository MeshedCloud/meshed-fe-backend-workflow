import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import {Definition, Draft} from "@/services/flow/definition";
import {NsGraph} from "@antv/xflow";
import {groups} from './constant';
import {DesignerCmd} from "@/services/flow/designer";
import {InitiateCmd} from "@/services/flow/flow";
import {category} from "@/services/flow/category";
import {RequestOptionsType} from "@ant-design/pro-components";

/**
 * ==========定义===========
 */

/** 获取定义列表 GET /api/workflow/definition/list */
export async function getDefinitionList(params: {}, options?: Record<string, any>) {
  return await Request.getPage<Definition>('/api/workflow/definition/list', <PageParams>params, options);
}

/** 反转定义状态 POST /api/workflow/definition/inverted/state/${definitionId} */
export async function updateInvertedDefinitionState(definitionId: string) {
  return await Request.post(`/api/workflow/definition/inverted/state/${definitionId}`);
}

/** 反转定义状态 POST /api/workflow/definition/inverted/state/${definitionId} */
export async function copyDefinition(definitionId: string) {
  return await Request.post<string>(`/api/workflow/definition/copy/${definitionId}`);
}


/**
 * ==========流程草稿===========
 */

/** 获取规则列表 GET /api/workflow/flow/draft/list */
export async function getFlowDraftList(params: {}, options?: Record<string, any>) {
  return await Request.getPage<Draft>('/api/workflow/flow/draft/list', <PageParams>params, options);
}

/** 获取分类选项 GET /api/category/select */
export function getCategorySelect(params?: {}, options?: { [key: string]: any }) {
  const list: RequestOptionsType[] = []
  Object.keys(category).forEach(key => {
    list.push({
      label: category[key],
      value: key
    })
  })
  return list
}


/** 保存草稿 POST /api/workflow/flow/draft/save */
export async function saveFlowDraft(data: Draft) {
  return await Request.post<string>('/api/workflow/flow/draft/save', data);
}

/** 保存草稿 POST /api/workflow/flow/draft/publish */
export async function publishFlowDraft(draftId: string) {
  return await Request.post<string>(`/api/workflow/flow/draft/publish/${draftId}`);
}

/** 保存草稿 POST /api/workflow/flow/draft/publish */
export async function deleteFlowDraft(draftId: string) {
  return await Request.delete(`/api/workflow/flow/draft/delete/${draftId}`);
}


/** 保存草稿 POST /api/workflow/flow/draft/save */
export async function saveFlowDesigner(data: DesignerCmd) {
  return await Request.post('/api/workflow/flow/designer/save', data);
}


/** 保存草稿 POST /api/workflow/flow/draft/save */
export async function getFlowDesignableGraph(meta: NsGraph.IGraphMeta) {
  const res = await Request.get<any>(`/api/workflow/flow/designer/${meta.flowId}`, {});
  if (res.success && res.data) {
    const graph = JSON.parse(res.data);
    if (graph.nodes && graph.nodes.length > 0) {
      graph.nodes.forEach((item: any) => {
        item.ports.groups = groups
      })
    }
    return graph
  }
  return {nodes: [], edges: []}
}

/** 发起新的流程 POST /api/workflow/flow/initiate */
export async function initiateFlow(data: InitiateCmd) {
  return await Request.post<any>('/api/workflow/flow/initiate', data);
}
