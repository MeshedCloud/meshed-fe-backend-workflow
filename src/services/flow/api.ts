import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import {Definition, Draft} from "@/services/flow/definition";
import {NsGraph} from "@antv/xflow";
import { groups } from './constant';
import {DesignerCmd} from "@/services/flow/designer";

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
export async function getCategorySelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getOptions(
    '/api/workflow/flow/category/select',
    params,
    options,
    (value) => {
      return {
        label:value.name,
        value:value.id
      }
    }
  );
}


/** 保存草稿 POST /api/workflow/flow/draft/save */
export async function saveFlowDraft(data: Draft) {
  return await Request.post<string>('/api/workflow/flow/draft/save', data);
}

/** 保存草稿 POST /api/workflow/flow/draft/publish */
export async function publishFlowDraft(draftId: string) {
  return await Request.post<string>(`/api/workflow/flow/draft/publish/${draftId}`);
}


/** 保存草稿 POST /api/workflow/flow/draft/save */
export async function saveFlowDesigner(data: DesignerCmd) {
  return await Request.post('/api/workflow/flow/designer/save', data);
}


/** 保存草稿 POST /api/workflow/flow/draft/save */
export async function getFlowDesignableGraph(meta: NsGraph.IGraphMeta) {
   const res = await Request.get<any>(`/api/workflow/flow/designer/${meta.flowId}`,{});
   if (res.success && res.data){
     if (res.data.nodes.length > 0){
       res.data.nodes.forEach((item: any) =>{
         item.ports.groups = groups
       })
     }
     return res.data
   }
   return {nodes:[],edges:[]}
}
