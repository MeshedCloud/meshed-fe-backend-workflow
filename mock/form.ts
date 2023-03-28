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

const getFormSchema = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "data": {
      "form": {
        "labelCol": 6,
        "wrapperCol": 12
      },
      "schema": {
        "type": "object",
        "properties": {
          "qnjjq0ntgmd": {
            "type": "string",
            "title": "Input",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "qnjjq0ntgmd",
            "x-index": 0
          },
          "v30v0qobr5n": {
            "type": "number",
            "title": "NumberPicker",
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "v30v0qobr5n",
            "x-index": 1
          },
          "no9co7687ly": {
            "type": "number",
            "title": "Rate",
            "x-decorator": "FormItem",
            "x-component": "Rate",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "no9co7687ly",
            "x-index": 2
          },
          "1vh46fto0bo": {
            "title": "Cascader",
            "x-decorator": "FormItem",
            "x-component": "Cascader",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "1vh46fto0bo",
            "x-index": 3
          },
          "bjp2qd5w3y1": {
            "type": "string | number",
            "title": "Radio Group",
            "x-decorator": "FormItem",
            "x-component": "Radio.Group",
            "enum": [
              {
                "label": "选项1",
                "value": 1
              },
              {
                "label": "选项2",
                "value": 2
              }
            ],
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "bjp2qd5w3y1",
            "x-index": 4
          },
          "aw5cnhisllc": {
            "type": "string[]",
            "title": "DateRangePicker",
            "x-decorator": "FormItem",
            "x-component": "DatePicker.RangePicker",
            "x-designable-id": "aw5cnhisllc",
            "x-index": 5
          }
        },
        "x-designable-id": "eic06kesj4u"
      }
    }
  });
};

const saveForm = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "data": "draft_uuid29"
  });
};


const saveFormSchema = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};

const getFormOption = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "data": [
      { name: '请假申请', id: '123' },
      { name: '用户流程', id: '1232' },
    ]
  });
};



export default {
  'GET /api/workflow/task/list': getTaskList,
  'GET /api/workflow/form/get/schema/*': getFormSchema,
  'GET /api/workflow/form/select': getFormOption,
  'POST /api/workflow/form/save': saveForm,
  'POST /api/workflow/form/save/schema': saveFormSchema,


};
