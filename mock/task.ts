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


// const saveFlowDesigner = (req: Request, res: Response) => {
//   res.json({
//     "success": true,
//     "errCode": null,
//     "errMessage": null,
//   });
// };
//




export default {
  'GET /api/workflow/form/list': getFormList,


};
