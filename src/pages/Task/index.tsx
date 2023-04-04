import {
  ActionType,
  PageContainer, ProList,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useRef, useState} from 'react';
import {Space, Tag} from 'antd';


import {getTaskList} from "@/services/task/api";

import {history} from "@umijs/max";


const TaskList: React.FC = () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('TODO');
  const [keyword, setKeyword] = useState<React.Key | undefined>('');
  const actionRef = useRef<ActionType>();


  return (
    <PageContainer>
      <ProList<any>
        actionRef={actionRef}
        rowKey={"id"}
        request={params => getTaskList({
          ...params,
          type: activeKey,
          name: keyword
        })}
        search={{
          filterType: 'light',
        }}
        pagination={{
          defaultPageSize: 16,
          showSizeChanger: false,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any) => {
          return {
            onClick: () => {
              console.log(record);
              history.push({
                pathname: `/task/details/${record.instanceId}/${record.id}`
              })
            },
          };
        }}
        // @ts-ignore
        metas={{
          title: {
            search: false,
            dataIndex: 'definitionName'

          },
          subTitle: {
            search: false,
            dataIndex: 'name',
            render: (_,row) => {
              return (
              <Space size={1}>
                <Tag color="#87d068" hidden={activeKey === 'MY_INITIATION'}>{_}</Tag>
                <Tag color="#2db7f5" hidden={!row.createTime}>{row.createTime}</Tag>
                {row.dueDate ? <Tag color="magenta">截至：{row.dueDate}</Tag> : <></>}
              </Space>
              )
            }
          },
          type: {search: false,},
          content: {
            search: false,
            render: (_,row) => {
              return (
                <div>
                  <div>{activeKey === 'MY_INITIATION' ? "申请人" :"处理人"}: {row.assignee}</div>
                </div>

              )
            }
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

        ]}

        toolbar={{
          menu: {
            activeKey,
            items: [
              {
                key: 'TODO',
                label: '待办任务',
              },
              {
                key: 'COMPLETE',
                label: '已办任务',
              },
              {
                key: 'MY_INITIATION',
                label: '发起记录',
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

          ]

        }}


      />
    </PageContainer>
  );
};
export default TaskList;
