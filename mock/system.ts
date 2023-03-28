import { Request, Response } from 'express';

const getSystemOption = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: [
      {
        id: 1,
        name: '身份中心',
      },
      {
        id: 2,
        name: '研发中心',
      },
      {
        id: 3,
        name: '运维中心',
      },
      {
        id: 4,
        name: '平台中心',
      },
      {
        id: 5,
        name: '流程中心',
      },
    ],
  });
};


export default {
  'GET /api/iam/system/select': getSystemOption,
};
