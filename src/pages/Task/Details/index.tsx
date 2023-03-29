import React, {useEffect, useRef, useState} from "react";
import {
  ActionType,
  PageContainer,
  ProCard,
  ProForm,
  ProFormInstance,
  ProFormTextArea,
  ProList
} from "@ant-design/pro-components";
import {useMatch} from "@@/exports";
import {Alert, Avatar, Space, Timeline} from "antd";
import { Form } from "@formily/antd";
import {Schema} from "@/components/Schema/Schema";
import {createForm} from "@formily/core";
import {getFormSchema} from "@/services/form/api";
import {agreeTask, getTaskActivityRecordList, getTaskCommentList, makeComment, refuseTask} from "@/services/task/api";
import { ActivityRecord } from "@/services/task/task";
import ApproveForm, {Approve} from "@/pages/Task/Details/components/ApproveForm";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";

export const commonForm = createForm({
  validateFirst: true,
  values:{
    name:'张三',
    day: 23
  },
  readPretty: true
})

const TaskDetails: React.FC = () => {
  // @ts-ignore
  const {params: {definitionId, taskId}} = useMatch('/task/details/:definitionId/:taskId')
  const [schema,setSchema] = useState<any>();
  const [activityRecords,setActivityRecords] = useState<ActivityRecord[]>([]);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  useEffect(() =>{
    getFormSchema(definitionId).then(data =>{
      if (data && data.schema){
        setSchema(data.schema)
      }
    })
    getTaskActivityRecordList(definitionId).then(list =>{
      if (list){
        setActivityRecords(list)
      }
    })
  },[])

  const makeCommentSubmit =async (values: { message: string }) => {
    const res = await makeComment({
      taskId,
      definitionId,
      message:values.message
    })
    if (res.success){
      formRef.current?.resetFields()
      actionRef.current?.reload()
    }
  }

  const agreeSubmit = async (data: Approve) => {
    const res = await agreeTask({
      taskId,
      message: data.message
    })
    return res.success
  }
  const refuseSubmit = async (data: Approve) => {
    const res = await refuseTask({
      taskId,
      message: data.message
    })
    return res.success
  }


  return (
    <PageContainer
      fixedHeader
      footer={[
        <ApproveForm icon={<CloseCircleOutlined />} title="拒绝" onFinish={refuseSubmit}/>,
        <ApproveForm icon={<CheckCircleOutlined />} buttonType="primary" title="通过" onFinish={agreeSubmit}/>,
      ]}
    >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <ProCard split="vertical">
          <ProCard title="审批概要" colSpan="30%">
            <div>
              <span>发起人:</span>
              <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle', margin : "5px" }} size="default" >
                U
              </Avatar>
              <span>User</span>
            </div>
            <div>
              <span>当前审批人:</span>
              <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle', margin : "5px" }} size="default" >
                A
              </Avatar>
              <span>Admin</span>
            </div>
            <div>
              <span>流程发起时间: </span>
              <span>2023年3月29日</span>
            </div>
          </ProCard>
          <ProCard title="审批内容" headerBordered>
            <Form
              form={commonForm}
              layout="vertical"
              size="large"
              onAutoSubmit={console.log}
            >
              <Schema schema={schema} />
            </Form>
          </ProCard>
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
            actionRef={actionRef}
            rowKey="id"
            request={(params => getTaskCommentList(definitionId,params))}
            showActions="hover"
            editable={{
              onSave: async (key, record, originRow) => {
                console.log(key, record, originRow);
                return true;
              },
            }}
            metas={{
              title: {
                dataIndex: 'userName',
              },
              subTitle:{
                dataIndex: 'time',
              },
              avatar: {
                dataIndex: 'userName',
                render:(_,row) => {
                  return (
                    <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle', margin : "5px" }} size="default" >
                      {row.userName[0]}
                    </Avatar>
                  )
                }
              },
              description: {
                dataIndex: 'message',
              },
              actions: {
                render: (text, row, index, action) => [
                ],
              },
            }}
          />

          <div style={{margin : "20px" }}>
            <ProForm<{message: string; }>
              formRef={formRef}
              onFinish={makeCommentSubmit}
            >
              <ProFormTextArea
                style={{width:"100%"}}
                rules={[{ required: true, message: '评论不能为空' }]}
                name="message"
                tooltip="最长为 24 位"
                placeholder="请输入评论"
              />

            </ProForm>
          </div>

        </ProCard>
      </Space>


    </PageContainer>
  )
}

export default TaskDetails
