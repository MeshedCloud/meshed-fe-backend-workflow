import {ActionType, ModalForm, ProList} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Space, Tag, Tooltip} from 'antd';
import React, {useRef} from 'react';
import {
  CloudUploadOutlined,
  CodeSandboxOutlined,
  DeleteOutlined,
  InboxOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import {Draft} from "@/services/flow/definition";
import {deleteFlowDraft, getFlowDraftList, publishFlowDraft} from "@/services/flow/api";
import {success, tips} from "@/common/messages";
import ConfirmButton from "@/components/ConfirmButton";
import {category} from "@/services/flow/category";

export type Props = {
  onCancel: () => void
};
const DraftListForm: React.FC<Props> = ({onCancel}) => {
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
        onCancel
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
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        rowKey="id"
        headerTitle="流程草稿"
        metas={{
          title: {
            dataIndex: 'name'
          },
          subTitle: {
            dataIndex: 'category',
            render: (_,row) => {
              return (
                <Space size={0}>
                  {
                    row.category ? <Tag color="blue">{category[row.category]}</Tag>: <></>
                  }
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
              <ConfirmButton
                label="流程部署" hint="确定将该流程进行部署？" size="small" type="link" tip="流程部署到运行中"
                icon={<CloudUploadOutlined/>}
                onConfirm={async e => {
                  const res =await publishFlowDraft(row.id)
                  success(res)
                  actionRef.current?.reload()
                }}
              />,
              <ConfirmButton
                label="删除" hint="确定将该流程草稿删除？" size="small" type="link" tip="将该流程草稿删除"
                icon={<DeleteOutlined/>}
                onConfirm={async e => {
                  const res =await deleteFlowDraft(row.id)
                  success(res)
                  actionRef.current?.reload()
                }}
              />,
            ],
          },
        }}
      />

    </ModalForm>
  );
};
export default DraftListForm;
