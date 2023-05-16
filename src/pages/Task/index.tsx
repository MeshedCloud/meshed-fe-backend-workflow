import {
  ActionType,
  PageContainer, ProList,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useRef, useState} from 'react';
import {Space, Tag} from 'antd';


import {getTaskList} from "@/services/task/api";

import {history} from "@umijs/max";
import {formatDuring, timeToDate} from "@/common/time";


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
                pathname: `/task/details/${activeKey}/${record.instanceId}/${record.id}`
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
                <Tag color="#87d068" hidden={!(activeKey === 'TODO')}>{_}</Tag>
                <Tag color="#2db7f5">{timeToDate(row.createTime)}{row.endTime ? "-" + timeToDate(row.endTime) : ""}</Tag>
                <Tag color={row.endTime ? "#3498db" : "#00adb5"}>{row.endTime ? "已完成" : "进行中"}</Tag>
                <Tag color="#70a1d7" hidden={!row.claimTime}>{row.claimTime ? formatDuring(row.claimTime) : '未知'}</Tag>
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
                  <div>{activeKey === 'TODO' ? "处理人": "申请人" }: {row.assignee ? row.assignee : "您可以处理"}</div>
                </div>

              )
            }
          }
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
                label: '待办',
              },
              {
                key: 'HISTORY',
                label: '已办',
              },
              {
                key: 'MY',
                label: '已发起',
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
