import {Request} from '@/common/request';
import type {PageParams} from '@/common/models';
import {ActivityRecord, CommentCmd, CompleteTaskCmd, Task} from "@/services/task/task";


/**
 * ==========任务===========
 */

/** 获取任务列表 GET /api/workflow/task/list */
export async function getTaskList(params: {}, options?: Record<string, any>) {
  return await Request.getPage<Task>('/api/workflow/task/list', <PageParams>params, options);
}

/** 获取任务活动节点列表 GET /api/workflow/task/list/${definitionId} */
export async function getTaskActivityRecordList(definitionId: string) {
  const res = await Request.getList<ActivityRecord>(`/api/workflow/task/activity/record/list/${definitionId}`);
  return res.data
}

/** 获取任务活动节点列表 GET /api/workflow/task/list/${definitionId} */
export async function getTaskCommentList(definitionId: string, params: {}, options?: Record<string, any>) {
  return await Request.getPage<ActivityRecord>(`/api/workflow/task/comment/list/${definitionId}`, <PageParams>params, options);

}


/** 获取任务活动节点列表 GET /api/workflow/task/make/comment */
export async function makeComment(data: CommentCmd) {
  return await Request.post('/api/workflow/task/make/comment', data);

}

/** 同意批准 GET /api/workflow/task/agree */
export async function agreeTask(data: CompleteTaskCmd) {
  return await Request.post('/api/workflow/task/agree', data);

}

/** 审批拒绝 GET /api/workflow/task/refuse */
export async function refuseTask(data: CompleteTaskCmd) {
  return await Request.post('/api/workflow/task/refuse', data);
}
