import {Request, Response} from 'express';

const getDefinitionList = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "totalCount": 6,
    "pageSize": 1,
    "pageIndex": 10,
    "data": [
      {
        "id": "key1:1:e6578788-cbd2-11ed-9aed-004238a4ec73",
        "category": "Test",
        "name": "name1",
        "key": "key1",
        "description": null,
        "version": 1,
        "deploymentId": "e62c7fe5-cbd2-11ed-9aed-004238a4ec73",
        "hasStartFormKey": false,
        "isSuspended": false
      },
      {
        "id": "key1:2:f87276a0-cc34-11ed-ab9d-004238a4ec73",
        "category": "Test",
        "name": "name1",
        "key": "key1",
        "description": null,
        "version": 2,
        "deploymentId": "f840df4d-cc34-11ed-ab9d-004238a4ec73",
        "hasStartFormKey": false,
        "isSuspended": false
      },
      {
        "id": "oa_leave_1:1:4ad50a02-ca30-11ed-91fe-004238a4ec73",
        "category": "Default",
        "name": "OA 请假",
        "key": "oa_leave_1",
        "description": null,
        "version": 1,
        "deploymentId": "4ac24550-ca30-11ed-91fe-004238a4ec73",
        "hasStartFormKey": false,
        "isSuspended": false
      },
      {
        "id": "oa_leave_1:2:6ac3d2eb-ca31-11ed-95f5-004238a4ec73",
        "category": "Default",
        "name": "OA 请假",
        "key": "oa_leave_1",
        "description": "",
        "version": 2,
        "deploymentId": "6aaf3979-ca31-11ed-95f5-004238a4ec73",
        "hasStartFormKey": false,
        "isSuspended": false
      },
      {
        "id": "oa_leave_1:3:934ba60b-ca31-11ed-a0a8-004238a4ec73",
        "category": "xxx",
        "name": "OA 请假",
        "key": "oa_leave_1",
        "description": null,
        "version": 3,
        "deploymentId": "933733a9-ca31-11ed-a0a8-004238a4ec73",
        "hasStartFormKey": false,
        "isSuspended": false
      },
      {
        "id": "oa_leave_1:4:c126ed65-ca33-11ed-af31-004238a4ec73",
        "category": "xxx",
        "name": "OA 请假",
        "key": "oa_leave_1",
        "description": null,
        "version": 4,
        "deploymentId": "c112c923-ca33-11ed-af31-004238a4ec73",
        "hasStartFormKey": false,
        "isSuspended": true
      }
    ],
    "notEmpty": true,
    "totalPages": 6,
    "empty": false
  });
};

const getFlowDraftList = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "totalCount": 30,
    "pageSize": 10,
    "pageIndex": 1,
    "data": [
      {
        "id": "draft_uuid29",
        "key": "key29",
        "category": "Test",
        "name": "name29",
        "formType": "FORM",
        "formId": "f29",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid28",
        "key": "key28",
        "category": "Test",
        "name": "name28",
        "formType": "FORM",
        "formId": "f28",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid27",
        "key": "key27",
        "category": "Test",
        "name": "name27",
        "formType": "FORM",
        "formId": "f27",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid26",
        "key": "key26",
        "category": "Test",
        "name": "name26",
        "formType": "FORM",
        "formId": "f26",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid25",
        "key": "key25",
        "category": "Test",
        "name": "name25",
        "formType": "FORM",
        "formId": "f25",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid24",
        "key": "key24",
        "category": "Test",
        "name": "name24",
        "formType": "FORM",
        "formId": "f24",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid23",
        "key": "key23",
        "category": "Test",
        "name": "name23",
        "formType": "FORM",
        "formId": "f23",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid22",
        "key": "key22",
        "category": "Test",
        "name": "name22",
        "formType": "FORM",
        "formId": "f22",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid21",
        "key": "key21",
        "category": "Test",
        "name": "name21",
        "formType": "FORM",
        "formId": "f21",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid20",
        "key": "key20",
        "category": "Test",
        "name": "name20",
        "formType": "FORM",
        "formId": "f20",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      },
      {
        "id": "draft_uuid19",
        "key": "key19",
        "category": "Test",
        "name": "name19",
        "formType": "FORM",
        "formId": "f19",
        "formUrl": null,
        "description": "Test",
        "version": 4,
      }
    ],
    "notEmpty": true,
    "totalPages": 3,
    "empty": false
  });
};

const getFlowCategoryOption = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "data": [
      { name: '业务流程', id: '123' },
      { name: '用户流程', id: '1232' },
    ]
  });
};

const updateInvertedDefinitionState = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};

const copyDefinition = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "data": "draft_uuid29"
  });
};

const saveFlowDraft = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "data": "draft_uuid29"
  });
};

const publishFlowDraft = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};

const saveFlowDesigner = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};

const initiateFlow = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
  });
};


const getFlowDesignableGraph = (req: Request, res: Response) => {
  res.json({
    "success": true,
    "errCode": null,
    "errMessage": null,
    "data": {
      "nodes":[
        {
          "id":"node-6775adc0-b896-4972-944c-9fc89adbc237",
          "renderKey":"startEvent",
          "name":"startEvent",
          "label":"流程开始",
          "width":210,
          "height":65,
          "ports":{
            "items":[
              {
                "group":"top",
                "id":"afafa9df-51e8-4d79-b5f4-1f0f9854cf0d"
              },
              {
                "group":"right",
                "id":"ee0db290-c56e-4867-a224-b6785b734757"
              },
              {
                "group":"bottom",
                "id":"1a7355aa-6683-428a-84f8-b824672a0ef2"
              },
              {
                "group":"left",
                "id":"38cd246a-c91c-4e8b-87cc-8ddcf77e8c5a"
              }
            ]
          },
          "isCustom":true,
          "parentKey":"base",
          "x":-70,
          "y":-210,
          "zIndex":10,
          "incomingEdges":null,
          "outgoingEdges":[
            {
              "shape":"edge",
              "id":"node-6775adc0-b896-4972-944c-9fc89adbc237:1a7355aa-6683-428a-84f8-b824672a0ef2-node-f3fcecd8-9651-494e-b26b-0f4c504c99ce:032b231b-0a7c-416f-915b-6f522b44373e",
              "targetPortId":"032b231b-0a7c-416f-915b-6f522b44373e",
              "sourcePortId":"1a7355aa-6683-428a-84f8-b824672a0ef2",
              "zIndex":1,
              "source":{
                "cell":"node-6775adc0-b896-4972-944c-9fc89adbc237",
                "port":"1a7355aa-6683-428a-84f8-b824672a0ef2"
              },
              "target":{
                "cell":"node-f3fcecd8-9651-494e-b26b-0f4c504c99ce",
                "port":"032b231b-0a7c-416f-915b-6f522b44373e"
              },
              "labels":[

              ]
            }
          ]
        },
        {
          "id":"node-f3fcecd8-9651-494e-b26b-0f4c504c99ce",
          "renderKey":"userTask",
          "name":"userTask",
          "label":"流程审批",
          "width":210,
          "height":65,
          "ports":{
            "items":[
              {
                "group":"top",
                "id":"032b231b-0a7c-416f-915b-6f522b44373e"
              },
              {
                "group":"right",
                "id":"7226dad1-501c-4383-99d7-567391e13119"
              },
              {
                "group":"bottom",
                "id":"1821c940-0424-4bca-85d2-8fd42d497425"
              },
              {
                "group":"left",
                "id":"8fc79d87-49ed-4307-9cb9-bedc5f47c392"
              }
            ]
          },
          "isCustom":true,
          "parentKey":"base",
          "x":-70,
          "y":-86,
          "zIndex":10,
          "incomingEdges":[
            {
              "shape":"edge",
              "id":"node-6775adc0-b896-4972-944c-9fc89adbc237:1a7355aa-6683-428a-84f8-b824672a0ef2-node-f3fcecd8-9651-494e-b26b-0f4c504c99ce:032b231b-0a7c-416f-915b-6f522b44373e",
              "targetPortId":"032b231b-0a7c-416f-915b-6f522b44373e",
              "sourcePortId":"1a7355aa-6683-428a-84f8-b824672a0ef2",
              "zIndex":1,
              "source":{
                "cell":"node-6775adc0-b896-4972-944c-9fc89adbc237",
                "port":"1a7355aa-6683-428a-84f8-b824672a0ef2"
              },
              "target":{
                "cell":"node-f3fcecd8-9651-494e-b26b-0f4c504c99ce",
                "port":"032b231b-0a7c-416f-915b-6f522b44373e"
              },
              "labels":[

              ]
            }
          ],
          "outgoingEdges":null
        }
      ],
      "edges":[
        {
          "id":"node-6775adc0-b896-4972-944c-9fc89adbc237:1a7355aa-6683-428a-84f8-b824672a0ef2-node-f3fcecd8-9651-494e-b26b-0f4c504c99ce:032b231b-0a7c-416f-915b-6f522b44373e",
          "targetPortId":"032b231b-0a7c-416f-915b-6f522b44373e",
          "sourcePortId":"1a7355aa-6683-428a-84f8-b824672a0ef2",
          "source":{
            "cell":"node-6775adc0-b896-4972-944c-9fc89adbc237",
            "port":"1a7355aa-6683-428a-84f8-b824672a0ef2"
          },
          "target":{
            "cell":"node-f3fcecd8-9651-494e-b26b-0f4c504c99ce",
            "port":"032b231b-0a7c-416f-915b-6f522b44373e"
          },
          "attrs":{
            "line":{
              "stroke":"#A2B1C3",
              "targetMarker":{
                "name":"block",
                "width":12,
                "height":8
              },
              "strokeDasharray":"5 5",
              "strokeWidth":1
            }
          },
          "zIndex":1,
          "sourcePort":"1a7355aa-6683-428a-84f8-b824672a0ef2",
          "targetPort":"032b231b-0a7c-416f-915b-6f522b44373e"
        }
      ]
    }
  });
};



export default {
  'GET /api/workflow/definition/list': getDefinitionList,
  'POST /api/workflow/flow/initiate': initiateFlow,
  'GET /api/workflow/flow/draft/list': getFlowDraftList,
  'GET /api/workflow/flow/category/select': getFlowCategoryOption,
  'POST /api/workflow/flow/draft/save': saveFlowDraft,
  'POST /api/workflow/flow/designer/save': saveFlowDesigner,
  'GET /api/workflow/flow/designer/*': getFlowDesignableGraph,
  'POST /api/workflow/flow/draft/publish/*': publishFlowDraft,
  'POST /api/workflow/definition/inverted/state/*': updateInvertedDefinitionState,
  'POST /api/workflow/definition/copy/*': copyDefinition,

};
