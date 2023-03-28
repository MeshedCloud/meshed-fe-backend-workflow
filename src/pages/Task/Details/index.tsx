import React from "react";
import {PageContainer, ProCard, ProList} from "@ant-design/pro-components";
import {useMatch} from "@@/exports";
import {Alert, Avatar, Button, Input, Space, Timeline} from "antd";
import { Form } from "@formily/antd";
import {Schema} from "@/components/Schema";
import {createForm} from "@formily/core";

const normalSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      "x-pattern": "readPretty",
    },
    day: {
      type: 'string',
      title: '天数',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      "x-pattern": "readPretty",
    },
  },
}

export const commonForm = createForm({
  validateFirst: true,
  values:{
    name:'张三',
    day: 23
  }
})

const activityRecords = [
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
]

const dataSource = [
  {
    id: '1',
    name: '语雀的天空',
    message: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    message: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    message: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    message: '我是一条测试的描述',
  },
];

const TaskDetails: React.FC = () => {
  // @ts-ignore
  const {params: {taskId}} = useMatch('/task/details/:taskId')
  console.log(taskId)
  return (
    <PageContainer
      fixedHeader
      extra={[
        <Button key="app" type="primary">
          审批
        </Button>,
      ]}
    >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <ProCard title="审批信息">
          <Form
            form={commonForm}
            layout="vertical"
            size="large"
            onAutoSubmit={console.log}
          >
            <Schema schema={normalSchema} />
          </Form>
        </ProCard>
        <ProCard title="流程记录" >
          <Timeline>

            {
              activityRecords.length <= 0 ? <>123</> : activityRecords.map(activityRecord => {
                return <Timeline.Item key={activityRecord.id}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{fontSize: 18}}>{activityRecord.activityName}</div>
                    <div style={{fontSize: 18}}>{activityRecord.endTime}</div>
                  </div>
                  <div>
                    <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle', margin : "5px" }} size="default" >
                      {activityRecord.assigneeName[0]}
                    </Avatar>
                    <span>{activityRecord.assigneeName}</span>

                  </div>
                  <div>
                    <Alert message={activityRecord.message} type="info" />
                  </div>
                </Timeline.Item>
              })
            }
          </Timeline>
        </ProCard>
        <ProCard title="评论" >

          <ProList<any>
            rowKey="id"
            dataSource={dataSource}
            showActions="hover"
            editable={{
              onSave: async (key, record, originRow) => {
                console.log(key, record, originRow);
                return true;
              },
            }}
            metas={{
              title: {
                dataIndex: 'name',
              },
              avatar: {
                dataIndex: 'name',
                render:(_,row) => {
                  return (
                    <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle', margin : "5px" }} size="default" >
                      {row.name[0]}
                    </Avatar>
                  )
                }
              },
              description: {
                dataIndex: 'message',
              },
              actions: {
                render: (text, row, index, action) => [
                  <a
                    onClick={() => {
                      action?.startEditable(row.id);
                    }}
                    key="link"
                  >
                    删除
                  </a>,
                ],
              },
            }}
          />

          <Space.Compact style={{ width: '100%' }}>
            <Input placeholder="发起对任务的指导意见"/>
            <Button type="primary">发表</Button>
          </Space.Compact>

        </ProCard>
      </Space>


    </PageContainer>
  )
}

export default TaskDetails
