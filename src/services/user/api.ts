import { Request } from '@/common/request';

/** 获取用户选项 GET /api/iam/user/select */
export async function getUserSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getOptions<any>(
    '/api/iam/user/select',
    params,
    options,
    (value) => {
      return { label: value.name, value: value.id };
    },
  );
}

/** 获取角色选项 GET /api/iam/role/select */
export async function getRoleSelect(params?: {}, options?: { [key: string]: any }) {
  return await Request.getOptions<any>(
    '/api/iam/role/select',
    params,
    options,
    (value) => {
      return { label: value.name, value: value.id };
    },
  );
}
