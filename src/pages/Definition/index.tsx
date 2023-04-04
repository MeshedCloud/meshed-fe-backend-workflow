import {
  ActionType,
  PageContainer, ProList,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useRef, useState} from 'react';
import {copyDefinition, getDefinitionList, initiateFlow, updateInvertedDefinitionState} from "@/services/flow/api";
import {Button, message, Space, Tag, Tooltip} from 'antd';
import {
  EyeOutlined, FormOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined, SendOutlined
} from "@ant-design/icons";
import DraftListForm from "@/pages/Definition/components/DraftListForm";
import DraftForm from "@/pages/Definition/components/DraftForm";
import {success, tips} from "@/common/messages";
import { ModalSchema } from '@/components/Schema/ModalSchema';
import {getFormSchema} from "@/services/form/api";
import ConfirmButton from "@/components/ConfirmButton";

const Definition: React.FC = () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('ACTIVE');
  const [keyword, setKeyword] = useState<String | undefined>();
  const actionRef = useRef<ActionType>();
  // @ts-ignore
  return (
    <PageContainer>
      <ProList<any>
        actionRef={actionRef}
        rowKey={"id"}
        request={params => getDefinitionList({
          ...params,
          status: activeKey,
          name: keyword
        })}
        postData={data => {
          if (data && data.length > 0) {
            data.forEach(item => item.avatar = "https://s.meshed.cn/meshed/svg/flow.svg")
          }
          return data
        }}
        search={{
          filterType: 'light',
        }}
        pagination={{
          defaultPageSize: 16,
          showSizeChanger: false,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 4 }}
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
            search: false,
            dataIndex: 'name'
          },
          subTitle: {
            search: false,
            dataIndex: 'category',
            render: (_,row) => {
              return (
              <Space size={0}>
                <Tag color="blue">{_}</Tag>
                <Tag color={row.isSuspended ? "#f50" : "#5BD8A6"}>{row.isSuspended ? "挂起" : "激活"}</Tag>
              </Space>
              )
            }
          },
          type: {search: false,},
          avatar: {search: false,},
          content: {
            search: false,
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
            cardActionProps: 'actions',
            render: (text, row) => [
              <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => {
                tips("将在新标签打开");
                setTimeout(() => {
                  window.open(`/workflow/flow/designable/edit/${row.id}`);
                }, 500)
              }}>查看</Button>,
              <ConfirmButton
                label="编辑" hint="确定创建副本草稿编辑？" size="small" type="link" tip="编辑将创建副本在草稿箱中进行编辑"
                icon={<FormOutlined/>}
                onConfirm={async e => {
                  const res = await copyDefinition(row.id)
                  if (res.success && res.data){
                    message.success("副本创建成功，将在新标签打开设计页面");
                    setTimeout(() => {
                      window.open(`/workflow/flow/designable/edit/${res.data}`);
                    }, 500)
                  }
                }}
              />,
              <ConfirmButton
                label="激活" hint="确定激活流程？" size="small" type="link" tip="激活流程"
                icon={<PlayCircleOutlined/>} hidden={!row.isSuspended}
                onConfirm={async e => {
                  const res = await updateInvertedDefinitionState(row.id)
                  success(res)
                  if (res.success) {
                    actionRef.current?.reload()
                  }
                }}
              />,
              <ConfirmButton
                label="挂起" hint="确定挂起流程？" size="small" type="link" tip="挂起流程"
                icon={<PauseCircleOutlined/>} hidden={row.isSuspended}
                onConfirm={async e => {
                  const res = await updateInvertedDefinitionState(row.id)
                  success(res)
                  if (res.success) {
                    actionRef.current?.reload()
                  }
                }}
              />,
              <ModalSchema
                hidden={!row.hasStartFormKey}
                buttonText="发起"
                title="发起流程" icon={<SendOutlined />} buttonType="link"
                formId={row.formKey}
                businessId={row.key}
                request={async formId => {
                  return getFormSchema(formId);
                }}
                onFinish={async (formId, businessId,formData) => {
                  const res = await initiateFlow({
                    tenantId: row.tenantId,
                    key: businessId,
                    param: formData
                  })
                  success(res,"发起成功")
                  return res.success
                }}
              />,
            ]
          }
        }}
        toolBarRender={() => [
            <DraftListForm />,
            <DraftForm />,
        ]}
        toolbar={{
          menu: {
            activeKey,
            items: [
              {
                key: "ACTIVE",
                label: '正常',
              },
              {
                key: 'SUSPENDED',
                label: '挂起',
              }
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
          }

        }}

      />
    </PageContainer>
  );
};
export default Definition;
