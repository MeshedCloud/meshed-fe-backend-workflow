// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { Request } from '@/common/request';

/** 获取用户信息 GET /api/iam/current/userinfo */
export async function getCurrentInfo(
  options?: { [key: string]: any },
) {
  return Request.get<API.CurrentUser>('/api/iam/current/userinfo', {}, options);
}


/** 退出登录接口 POST /api/login/outLogin */
export async function logout(options?: { [key: string]: any }) {
  localStorage.removeItem("TOKEN")
  return Request.delete<API.CurrentUser>('/api/iam/logout', {}, options);

}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

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
