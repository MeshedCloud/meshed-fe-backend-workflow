import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import {Task} from "@/services/task/task";


/**
 * ==========定义===========
 */

/** 获取定义列表 GET /api/workflow/task/list */
export async function getTaskList(params: {}, options?: Record<string, any>) {
  return await Request.getPage<Task>('/api/workflow/task/list', <PageParams>params, options);
}

