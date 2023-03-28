import {
  PageContainer, ProList,
} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import {copyDefinition, getDefinitionList, updateInvertedDefinitionState} from "@/services/flow/api";
import {Button, Dropdown, MenuProps, message, Space, Tag, Tooltip} from 'antd';
import {
  CodeSandboxOutlined, DeleteOutlined, FormOutlined,
  MoreOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import DraftListForm from "@/pages/Definition/components/DraftListForm";
import DraftForm from "@/pages/Definition/components/DraftForm";
import {success, tips} from "@/common/messages";

const items: MenuProps['items'] = [
  {
    key: 'start',
    label: <Button size="small" type="link" icon={<DeleteOutlined />} onClick={() => {

    }}>发起流程</Button>,
  },
  {
    key: 'del',
    label: <Button size="small" type="link" icon={<DeleteOutlined />} onClick={() => {

    }}>销毁流程</Button>,
  },
];

const Definition: React.FC = () => {


  return (
    <PageContainer>
      <ProList<any>
        rowKey={"id"}
        request={getDefinitionList}
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
              <Button size="small" type="link" icon={<CodeSandboxOutlined />} onClick={() => {
                tips("将在新标签打开");
                setTimeout(() => {
                  window.open(`/workflow/flow/designable/edit/${row.id}`);
                }, 500)
              }}>设计</Button>,
              <Tooltip placement="top" title={"编辑将创建副本在草稿箱中进行编辑"} >
                <Button size="small" type="link" icon={<FormOutlined />} onClick={async () => {
                  const res = await copyDefinition(row.id)
                  if (res.success && res.data){
                    message.success("副本创建成功，将在新标签打开设计页面");
                    setTimeout(() => {
                      window.open(`/workflow/flow/designable/edit/${res.data}`);
                    }, 500)
                  }

                }}>编辑</Button>
              </Tooltip>
              ,
              <Button hidden={!row.isSuspended} size="small" type="link" icon={<PlayCircleOutlined />} onClick={async () => {
                const res = await updateInvertedDefinitionState(row.id)
                success(res)
              }}>激活</Button>,
              <Button hidden={row.isSuspended} size="small" type="link" icon={<PauseCircleOutlined />} onClick={async () => {
                const res = await updateInvertedDefinitionState(row.id)
                success(res)
              }}>挂起</Button>,
              <Dropdown menu={{ items }} placement="top" arrow>
                <Button size="small" type="link" icon={<MoreOutlined />} onClick={() => {

                }}>更多</Button>
              </Dropdown>

            ]
          },
          suspended: {
            // 自己扩展的字段，主要用于筛选，不在列表中显示
            title: '状态',
            valueType: "select",
            valueEnum: {
              true: '挂起',
              false: '正常'
            },
          },
        }}
        headerTitle="流程管理"
        toolBarRender={() => [
            <DraftListForm />,
            <DraftForm />,
        ]}

      />
    </PageContainer>
  );
};
export default Definition;
