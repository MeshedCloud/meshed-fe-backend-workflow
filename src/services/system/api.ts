import { Request } from '@/common/request';


/** 获取规则列表 GET /api/system/label */
export async function getSystemSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getOptions(
    '/api/iam/system/select',
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
