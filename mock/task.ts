import {Request, Response} from 'express';

const getTaskList = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "totalCount": 6,
    "pageSize": 1,
    "pageIndex": 10,
    "data": [
      {
        "id": "owner1:1:e6578788-cbd2-11ed-9aed-004238a4ec73",
        "definitionId": "owner1:1:e6578788-cbd2-11ed-9aed-004238a4ec73",
        "category": "Test",
        "name": "name1",
        "owner": "owner1",
        "description": null,
        "assignee": "zhangsan",
        "createTime": "2023年3月28日",
        "dueDate": "2023年3月28日",
        "claimTime": "1天"
      },
      {
        "id": "owner1:2:f87276a0-cc34-11ed-ab9d-004238a4ec73",
        "definitionId": "owner1:2:f87276a0-cc34-11ed-ab9d-004238a4ec73",
        "category": "Test",
        "name": "name1",
        "owner": "owner1",
        "description": null,
        "assignee": "zhangsan",
        "createTime": "2023年3月28日",
        "dueDate": "2023年3月28日",
        "claimTime": "1天"
      },
      {
        "id": "oa_leave_1:1:4ad50a02-ca30-11ed-91fe-004238a4ec73",
        "definitionId": "oa_leave_1:1:4ad50a02-ca30-11ed-91fe-004238a4ec73",
        "category": "Default",
        "name": "HR审批",
        "owner": "oa_leave_1",
        "description": null,
        "assignee": "zhangsan",
        "createTime": "2023年3月28日",
        "dueDate": "2023年3月28日",
        "claimTime": "1天"
      },
      {
        "id": "oa_leave_1:2:6ac3d2eb-ca31-11ed-95f5-004238a4ec73",
        "definitionId": "oa_leave_1:2:6ac3d2eb-ca31-11ed-95f5-004238a4ec73",
        "category": "Default",
        "name": "HR审批",
        "owner": "oa_leave_1",
        "description": "",
        "assignee": "zhangsan",
        "createTime": "2023年3月28日",
        "dueDate": "2023年3月28日",
        "claimTime": "1天"
      },
      {
        "id": "oa_leave_1:3:934ba60b-ca31-11ed-a0a8-004238a4ec73",
        "definitionId": "oa_leave_1:3:934ba60b-ca31-11ed-a0a8-004238a4ec73",
        "category": "xxx",
        "name": "HR审批",
        "owner": "oa_leave_1",
        "description": "任务描述",
        "assignee": "zhangsan",
        "createTime": "2023年3月28日",
        "dueDate": "2023年3月28日",
        "claimTime": "1天"
      },
      {
        "id": "oa_leave_1:4:c126ed65-ca33-11ed-af31-004238a4ec73",
        "definitionId": "oa_leave_1:4:c126ed65-ca33-11ed-af31-004238a4ec73",
        "category": "xxx",
        "name": "HR审批",
        "owner": "oa_leave_1",
        "description": null,
        "assignee": "zhangsan",
        "createTime": "2023年3月28日",
        "dueDate": "2023年3月28日",
        "claimTime": "1天"
      }
    ],
    "notEmpty": true,
    "totalPages": 6,
    "empty": false
  });
};
const getTaskActivityRecordList = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "totalCount": 6,
    "pageSize": 1,
    "pageIndex": 10,
    "data": [
      {
        id:12,
        activityName:'主管审批',
        assigneeName: '张三',
        message: '同意、审批通过',
        endTime: '2023年3月28日'
      },
      {
        id:13,
        activityName:'HR审批',
        assigneeName: '李四',
        message: '审批通过',
        endTime: '2023年3月28日'
      }
    ],
    "notEmpty": true,
    "totalPages": 6,
    "empty": false
  });
};
const getTaskCommentList = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "totalCount": 6,
    "pageSize": 1,
    "pageIndex": 10,
    "data": [
      {
        id:12,
        userName: '张三',
        message: '同意、审批通过',
        time: '2023年3月28日'
      },
      {
        id:13,
        userName: '李四',
        message: '审批通过',
        time: '2023年3月28日'
      }
    ],
    "notEmpty": true,
    "totalPages": 6,
    "empty": false
  });
};

const makeComment = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};
const agreeTask = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};
const refuseTask = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};

export default {
  'GET /api/workflow/task/list': getTaskList,
  'GET /api/workflow/task/activity/record/list/*': getTaskActivityRecordList,
  'GET /api/workflow/task/comment/list/*': getTaskCommentList,
  'POST /api/workflow/task/make/comment': makeComment,
  'POST /api/workflow/task/agree': agreeTask,
  'POST /api/workflow/task/refuse': refuseTask,


};
