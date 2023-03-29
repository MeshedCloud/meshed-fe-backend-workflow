import {Request, Response} from 'express';

const getFormList = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "totalCount": 3,
    "pageSize": 1,
    "pageIndex": 10,
    "data": [
      {
        "id": "e6578788cbd211ed9aed004238a4ec73",
        "key": "Test1",
        "name": "name1",
        "owner": "owner1",
        "description": "Td",
        "version": 2,
        "status": "EDIT",
      },
      {
        "id": "e6578788cbd211ed9aed004238a4ec73",
        "key": "Test2",
        "name": "name2",
        "owner": "owner1",
        "description": "Td",
        "version": 2,
        "status": "RUN",
      },
      {
        "id": "e6578788cbd211ed9aed004238a4ec73",
        "key": "Test3",
        "name": "name3",
        "owner": "owner1",
        "description": "Td",
        "version": 2,
        "status": "DISCARD",
      },
    ],
    "notEmpty": true,
    "totalPages": 1,
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
          "name": {
            "type": "string",
            "title": "姓名",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "qnjjq0ntgmd",
            "x-index": 0,
            "name": "name"
          },
          "day": {
            "type": "number",
            "title": "天数",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "v30v0qobr5n",
            "x-index": 1,
            "name": "day"
          }
        },
        "x-designable-id": "xkiy6y3wxpg"
      }
    }
  });
};

const getFormSchemaByKey = (req: Request, res: Response) => {
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
          "name": {
            "type": "string",
            "title": "姓名",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "qnjjq0ntgmd",
            "x-index": 0,
            "name": "name"
          },
          "day": {
            "type": "number",
            "title": "天数",
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": [],
            "x-component-props": {},
            "x-decorator-props": {},
            "x-designable-id": "v30v0qobr5n",
            "x-index": 1,
            "name": "day"
          }
        },
        "x-designable-id": "xkiy6y3wxpg"
      }
    }
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


const copyForm = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "data":"xxxxx"
  });
};

const discardForm = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};

const resumeForm = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};

const publishForm = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};

const deleteForm = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};



export default {
  'GET /api/workflow/form/list': getFormList,
  'GET /api/workflow/form/get/schema/*': getFormSchema,
  'GET /api/workflow/form/get/schema/key/*': getFormSchemaByKey,
  'GET /api/workflow/form/select': getFormOption,
  'POST /api/workflow/form/save': saveForm,
  'POST /api/workflow/form/copy/*': copyForm,
  'POST /api/workflow/form/save/schema': saveFormSchema,
  'POST /api/workflow/form/discard/*': discardForm,
  'POST /api/workflow/form/resume/*': resumeForm,
  'POST /api/workflow/form/publish/*': publishForm,
  'POST /api/workflow/form/delete/*': deleteForm,


};
