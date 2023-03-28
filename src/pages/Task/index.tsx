import {
  PageContainer, ProList,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useState} from 'react';
import {Space, Tag} from 'antd';


import {getTaskList} from "@/services/task/api";

import {history} from "@umijs/max";


const TaskList: React.FC = () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('task');

  return (
    <PageContainer>
      <ProList<any>
        rowKey={"id"}
        request={getTaskList}
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
                pathname: `/task/details/${record.id}`
              })
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
              <Space size={1}>
                <Tag color="blue">{_}</Tag>
                <Tag color="#87d068">申请人：{row.owner}</Tag>
                <Tag color="#2db7f5">{row.createTime}</Tag>
                <Tag color="orange">处理：{row.claimTime}</Tag>
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
                  <div>处理人: {row.assignee}</div>
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
                key: 'TASK',
                label: '任务列表',
              },
              {
                key: 'HISTORY',
                label: '历史任务',
              },
            ],
            onChange(key) {
              setActiveKey(key);
            },
          },
          search: {
            onSearch: (value: string) => {
              alert(value);
            },
          }

        }}


      />
    </PageContainer>
  );
};
export default TaskList;
