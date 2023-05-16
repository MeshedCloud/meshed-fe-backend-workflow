import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import {FormCmd, FormSchemaCmd} from "@/services/form/form";

import {Engine} from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import {success} from "@/common/messages";

/**
 * ==========表单===========
 */

/** 获取表单列表 GET /api/workflow/form/list */
export async function getFormList(params: {}, options?: Record<string, any>) {
  return await Request.getPage<FormCmd>('/api/workflow/form/list', <PageParams>params, options);
}

/** 获取表单列表 GET /api/workflow/form/get/schema/{formId} */
export async function getFormSchema(formId: string) {
  const res = await Request.get<any>(`/api/workflow/form/get/schema/${formId}`, {});
  if (res.success && res.data){
    return JSON.parse(res.data)
  }
  return undefined
}
/** 获取表单列表 GET /api/workflow/form/get/schema/{formId} */
export async function getFormSchemaByKey(formKey: string) {
  const res = await Request.get<any>(`/api/workflow/form/get/schema/key/${formKey}`, {});
  if (res.success && res.data){
    return JSON.parse(res.data)
  }
  return undefined
}


/** 获取表单列表 GET /api/workflow/form/list */
export async function saveForm(data: FormCmd) {
  return await Request.post<string>('/api/workflow/form/save', data);
}

/** 获取表单列表 GET /api/workflow/form/copy/formId */
export async function copyForm(formId: string) {
  const res = await Request.post<string>(`/api/workflow/form/copy/${formId}`);
  if (res.success){
    return res.data;
  }
  return undefined
}

/** 获取表单列表 POST /api/workflow/form/list */
export async function saveFormSchema(data: FormSchemaCmd) {
  return await Request.post('/api/workflow/form/save/schema', data);
}

/** 获取表单列表 POST /api/workflow/form/discard/${formId} */
export async function discardForm(formId: string) {
  return await Request.post(`/api/workflow/form/discard/${formId}`);
}

/** 获取表单列表 POST /api/workflow/form/delete/${formId} */
export async function deleteForm(formId: string) {
  return await Request.delete(`/api/workflow/form/delete/${formId}`);
}

/** 获取表单列表 POST /api/workflow/form/resume/${formId} */
export async function resumeForm(formId: string) {
  return await Request.post(`/api/workflow/form/resume/${formId}`);
}

/** 获取表单列表 POST /api/workflow/form/publish/${formId} */
export async function publishForm(formId: string) {
  return await Request.post(`/api/workflow/form/publish/${formId}`);
}

/** 获取分类选项 GET /api/form/select */
export async function getFormSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getOptions(
    '/api/workflow/form/select',
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


export const saveSchema = (designer: Engine, formId: string) => {
  Request.post('/api/workflow/form/save/schema', {
    id:formId,
    schema: JSON.stringify(transformToSchema(designer.getCurrentTree()))
  }).then(res =>{
    success(res,"保存成功")
  })
}

export const loadInitialSchema = async (designer: Engine, formId: string) => {
  try {

    designer.setCurrentTree(
      transformToTreeNode(await getFormSchema(formId))
    )
  } catch {
  }
}
