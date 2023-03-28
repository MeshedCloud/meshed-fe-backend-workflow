import {ActionType, ModalForm, ProList} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Space, Tag, Tooltip} from 'antd';
import React, {useRef} from 'react';
import {
  CloudUploadOutlined,
  CodeSandboxOutlined,
  InboxOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import {Draft} from "@/services/flow/definition";
import {getFlowDraftList, publishFlowDraft} from "@/services/flow/api";
import {success, tips} from "@/common/messages";

export type Props = {

};
const DraftListForm: React.FC<Props> = (props) => {
  const actionRef = useRef<ActionType>();
  return (
    <ModalForm
      trigger={
        <Button type="primary">
          <InboxOutlined />草稿箱
        </Button>
      }
      width={1000}
      initialValues={{}}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitter={false}
    >
      <ProList<Draft>
        actionRef={actionRef}
        request={getFlowDraftList}
        postData={data => {
          if (data && data.length > 0) {
            data.forEach(item => item.avatar = "https://s.meshed.cn/meshed/svg/flow.svg")
          }
          console.log(data)
          return data
        }}
        rowKey="id"
        headerTitle="流程草稿"
        showActions="hover"
        metas={{
          title: {
            dataIndex: 'name'
          },
          subTitle: {
            dataIndex: 'category',
            render: (_,row) => {
              return (
                <Space size={0}>
                  <Tag color="blue">{_}</Tag>
                </Space>
              )
            }
          },
          type: {},
          avatar: {},
          content: {
            render: (_,row) => {
              return (
                <div>
                  <Tooltip placement="left" title={"流程Key"} >
                    <div><span>{row.key}</span> | <span> V{row.version}</span> <QuestionCircleOutlined/></div>
                  </Tooltip>
                </div>

              )
            }
          },
          actions: {
            render: (text, row) => [
              <Button size="small" type="link" icon={<CodeSandboxOutlined />} onClick={() => {
                tips("将在新标签打开");
                setTimeout(() => {
                  window.open(`/workflow/flow/designable/edit/${row.id}`);
                }, 500)
              }}>流程设计</Button>,
              <Button size="small" type="link" icon={<CloudUploadOutlined />} onClick={async () => {
                const res =await publishFlowDraft(row.id)
                success(res)
                actionRef.current?.reload()
              }}>流程部署</Button>
            ],
          },
        }}
      />

    </ModalForm>
  );
};
export default DraftListForm;
