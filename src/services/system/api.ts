// import { Request } from '@/common/request';
import {RequestOptionsType} from "@ant-design/pro-components";


// /** 获取规则列表 GET /api/system/label */
// export async function getSystemSelect(params?: {}, options?: { [key: string]: any }) {
//   return await Request.getOptions(
//     '/api/iam/system/select',
//     params,
//     options,
//     (value) => {
//       return {
//         label:value.name,
//         value:value.id
//       }
//     }
//   );
// }

/** 获取规则列表 GET /api/system/label */
export function getSystemSelect(params?: {}, options?: { [key: string]: any }) {
  const list: RequestOptionsType[] = []
  list.push({
    label:"身份中心",
    value:"iam"
  })
  return list;
}
