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
import {
  agreeTask,
  getTask,
  getTaskActivityRecordList,
  getTaskCommentList,
  makeComment,
  refuseTask
} from "@/services/task/api";
import { ActivityRecord } from "@/services/task/task";
import ApproveForm, {Approve} from "@/pages/Task/Details/components/ApproveForm";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

export const readOnlyForm = createForm({
  validateFirst: true,
  values:{},
  readPretty: true
})

const TaskDetails: React.FC = () => {
  // @ts-ignore
  const {params: {instanceId, taskId}} = useMatch('/task/details/:instanceId/:taskId')
  const [schema,setSchema] = useState<any>();
  const [schemaForm,setSchemaForm] = useState<any>(readOnlyForm);
  const [task,setTask] = useState<any>({});
  const [activityRecords,setActivityRecords] = useState<ActivityRecord[]>([]);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  useEffect(() =>{

    getTaskActivityRecordList({instanceId,taskId}).then(list =>{
      if (list){
        setActivityRecords(list)
      }
    })
    getTask({instanceId,taskId}).then(res => {
      if (res.success && res.data){
        setTask(res.data)
        if (res.data.formKey){
          getFormSchema(res.data.formKey).then(data =>{
            if (data && data.schema){
              setSchema(data.schema)
            }
          })
        }
      //variables
        schemaForm.values = res.data.variables
        setSchemaForm(schemaForm)
      }
    })
  },[])

  const makeCommentSubmit =async (values: { message: string }) => {
    const res = await makeComment({
      taskId,
      instanceId,
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
      instanceId,
      message: data.message
    })
    return res.success
  }
  const refuseSubmit = async (data: Approve) => {
    const res = await refuseTask({
      taskId,
      instanceId,
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
        <ProCard split="vertical" style={{minHeight: "300px"}}>
          <ProCard title="审批概要" colSpan="30%">
            <div hidden={!task.definitionName}>
              <h1>{task.definitionName ? task.definitionName : '未知'}</h1>
            </div>
            <div hidden={!task.initiator}>
              <span>发起人:</span>
              <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle', margin : "5px" }} size="default" >
                {task.initiator ? task.initiator[0] : '未知'}
              </Avatar>
              <span>{task.initiator ? task.initiator : '未知'}</span>
            </div>
            <div hidden={!task.assignee}>
              <span>当前审批人:</span>
              <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle', margin : "5px" }} size="default" >
                {task.assignee ? task.assignee[0] : '未知'}
              </Avatar>
              <span>{task.assignee ? task.assignee : '未知'}</span>
            </div>
            <div hidden={!task.createTime}>
              <span>流程发起时间: </span>
              <span>{task.createTime ? task.createTime : '未知'}</span>
            </div>
            <div hidden={!task.dueDate}>
              <span>任务截至时间: </span>
              <span>{task.dueDate ? task.dueDate : '未知'}</span>
            </div>
          </ProCard>
          <ProCard title="审批内容" headerBordered>
            <Form
              form={schemaForm}
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
              activityRecords.length <= 0 ? <></> : activityRecords.map(activityRecord => {
                return <Timeline.Item
                  key={activityRecord.id}
                  color={!activityRecord.endTime ? 'blue' : 'green' }
                  dot={!activityRecord.endTime ? <ClockCircleOutlined /> : undefined }
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{fontSize: 18}}>{activityRecord.activityName}</div>
                    <div style={{fontSize: 18}}>{activityRecord.endTime}</div>
                  </div>
                  <div hidden={!activityRecord.endTime && activityRecord.assigneeName === undefined}>
                    <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle', margin : "5px" }} size="default" >
                      {activityRecord.assigneeName? activityRecord.assigneeName[0] : "系统"}
                    </Avatar>
                    <span>{activityRecord.assigneeName ? activityRecord.assigneeName : "系统"}</span>

                  </div>
                  <div>
                    {!activityRecord.endTime && activityRecord.assigneeName === undefined ? <span>待领取任务</span> : <></> }
                  </div>
                  <div>
                    {!activityRecord.endTime ? <span>等待审批</span> : <Alert message={activityRecord.fullMessage} type="info" /> }
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
            request={(params => getTaskCommentList(instanceId,params))}
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
                      {row.userName ? row.userName[0] : 'M'}
                    </Avatar>
                  )
                }
              },
              description: {
                dataIndex: 'fullMessage',
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
