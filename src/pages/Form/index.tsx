import {
  ActionType,
  PageContainer, ProList,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useRef, useState} from 'react';
import {Button, Space, Tag} from 'antd';


import {
  copyForm,
  deleteForm,
  discardForm,
  getFormList, getFormSchema,
  publishForm,
  resumeForm
} from "@/services/form/api";
import {FormStatus} from "@/services/form/constant";
import {
  CloseSquareOutlined,
  DeleteOutlined,
  EyeOutlined,
  FormOutlined,
  PlayCircleOutlined, SendOutlined,
} from "@ant-design/icons";
import AddForm from './components/AddForm';
import {success, tips} from "@/common/messages";
import {ModalSchema} from "@/components/Schema/ModalSchema";
import ConfirmButton from "@/components/ConfirmButton";

const FormList: React.FC = () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('RUN');
  const [keyword, setKeyword] = useState<String | undefined>();
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProList<any>
        actionRef={actionRef}
        rowKey={"id"}
        request={params => getFormList({
          ...params,
          status:activeKey,
          keyword
        })}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        showActions="hover"
        onItem={(record: any) => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        }}
        // @ts-ignore
        metas={{
          title: {
            dataIndex: 'name'
          },
          subTitle: {
            dataIndex: 'key',
            render: (_, row) => {
              return (
                <Space size={1}>
                  <Tag color="blue">{_}</Tag>
                </Space>
              )
            }
          },
          content: {
            search: false,
            render: (_, row) => {
              return (
                <Space size={1}>
                  <Tag color="blue">V{row.version}</Tag>
                  <Tag color={FormStatus[row.status].color}>{FormStatus[row.status].text}</Tag>
                </Space>
              )
            }
          },
          description: {
            dataIndex: 'description',
          },
          actions: {
            render: (text, row) => [
              <ModalSchema
                buttonText="查看"
                title="预留（无数据操作）"
                formId={row.id}
                businessId={row.id}
                request={async formId => {
                  return getFormSchema(formId);
                }}
                buttonType="link"
                icon={<EyeOutlined/>}
              />,
              <ConfirmButton
                label="编辑" hint="确认创建副本进行编辑？" size="small" type="link" tip="编辑将创建副本进行编辑"
                icon={<FormOutlined/>} hidden={row.status !== "RUN"}
                onConfirm={async e => {
                  const newFormId = await copyForm(row.id)
                  setActiveKey("EDIT")
                  actionRef.current?.reload()
                  tips("拷贝成功，将在新标签打开");
                  setTimeout(() => {
                    window.open(`/workflow/form/designable/${newFormId}`);
                  }, 500)
                }}
              />,
              <Button icon={<FormOutlined/>} type="link" hidden={row.status !== "EDIT"} onClick={async () => {
                setTimeout(() => {
                  window.open(`/workflow/form/designable/${row.id}`);
                }, 500)
              }}>编辑</Button>,
              <ConfirmButton
                label="废弃" hint="确认废弃表单？" size="small" type="link" tip="将表单置于不可用状态"
                icon={<CloseSquareOutlined/>} hidden={row.status !== "RUN"}
                onConfirm={async () => {
                  const res = await discardForm(row.id);
                  success(res, "作废成功")
                  if (res.success) {
                    actionRef.current?.reload()
                  }
                }}
              />,
              <ConfirmButton
                label="激活" hint="确认激活表单？" size="small" type="link" tip="将表单恢复正常状态（仅支持最新）"
                icon={<PlayCircleOutlined/>} hidden={row.status !== "DISCARD"}
                onConfirm={async () => {
                  const res = await resumeForm(row.id);
                  success(res, "激活成功")
                  setActiveKey("RUN")
                  if (res.success) {
                    actionRef.current?.reload()
                  }
                }}
              />,
              <ConfirmButton
                label="删除" hint="确认删除表单？" size="small" type="link" tip="将表单清除"
                icon={<DeleteOutlined/>} hidden={row.status !== "DISCARD"}
                onConfirm={async () => {
                  const res = await deleteForm(row.id);
                  success(res, "删除成功")
                  if (res.success) {
                    actionRef.current?.reload()
                  }
                }}
              />,
              <ConfirmButton
                label="发布" hint="确认发布表单？" size="small" type="link" tip="将表单置于运行状态"
                icon={<SendOutlined/>} hidden={row.status !== "EDIT"}
                onConfirm={async () => {
                  const res = await publishForm(row.id);
                  success(res, "发布成功")
                  setActiveKey("RUN")
                  if (res.success) {
                    actionRef.current?.reload()
                  }
                }}
              />,

            ],
          },
        }}
        headerTitle="表单管理"
        toolBarRender={() => []}

        toolbar={{
          menu: {
            activeKey,
            items: [
              {
                key: 'RUN',
                label: '正常',
              },
              {
                key: 'EDIT',
                label: '编辑中',
              },
              {
                key: 'DISCARD',
                label: '废弃',
              },
            ],
            onChange(key) {
              setActiveKey(key);
              actionRef.current?.reload()
            },
          },
          search: {
            onSearch: (value: string) => {
              setKeyword(value);
              actionRef.current?.reload()
            },
          },
          actions: [
            <AddForm/>,
          ],

        }}

      />
    </PageContainer>
  );
};
export default FormList;
