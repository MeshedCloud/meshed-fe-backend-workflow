import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import {FormCmd, FormSchemaCmd} from "@/services/form/form";


/**
 * ==========表单===========
 */

/** 获取表单列表 GET /api/workflow/form/list */
export async function getFormList(params: {}, options?: Record<string, any>) {
  return await Request.getPage<FormCmd>('/api/workflow/form/list', <PageParams>params, options);
}

/** 获取表单列表 GET /api/workflow/form/get/schema/{formId} */
export async function getFormSchema(formId: string) {
  const res = await Request.get<string>(`/api/workflow/form/get/schema/${formId}`, {});
  if (res.success && res.data){
    return res.data
  }
  return {}
}


/** 获取表单列表 GET /api/workflow/form/list */
export async function saveForm(data: FormCmd) {
  return await Request.post<string>('/api/workflow/form/save', data);
}



/** 获取表单列表 GET /api/workflow/form/list */
export async function saveFormSchema(data: FormSchemaCmd) {
  return await Request.post('/api/workflow/form/save/schema', data);
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
