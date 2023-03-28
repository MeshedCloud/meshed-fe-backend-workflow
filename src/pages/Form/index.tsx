import {
  PageContainer, ProList,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useState} from 'react';
import {Button, Space, Tag, Tooltip} from 'antd';


import {getFormList} from "@/services/form/api";
import {FormStatus} from "@/services/form/constant";
import {CloseSquareOutlined, DeleteOutlined, EyeOutlined, FormOutlined, PlayCircleOutlined} from "@ant-design/icons";
import AddForm from './components/AddForm';

const FormList: React.FC = () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('edit');
  return (
    <PageContainer>
      <ProList<any>
        rowKey={"id"}
        request={getFormList}
        pagination={{
          defaultPageSize: 16,
          showSizeChanger: false,
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
            render: (_,row) => {
              return (
                <Space size={1}>
                  <Tag color="blue">{_}</Tag>
                </Space>
              )
            }
          },
          content: {
            search: false,
            render: (_,row) => {
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
              <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => {

              }}>查看</Button>,
              <Tooltip placement="top" title={"编辑将创建副本进行编辑"} >
                <Button hidden={row.status === "DISCARD"}  size="small" type="link" icon={<FormOutlined />} onClick={() => {

                }}>编辑</Button>
              </Tooltip>,
              <Button hidden={row.status !== "RUN"} size="small" type="link" icon={<CloseSquareOutlined />} onClick={() => {

              }}>废弃</Button>,
              <Button hidden={row.status !== "DISCARD"}  size="small" type="link" icon={<PlayCircleOutlined />} onClick={() => {

              }}>激活</Button>,
              <Button hidden={row.status !== "DISCARD"}  size="small" type="link" icon={<DeleteOutlined />} onClick={() => {

              }}>删除</Button>,
              <Button hidden={row.status !== "EDIT"} size="small" type="link" icon={<CloseSquareOutlined />} onClick={() => {

              }}>发布</Button>,
            ],
          },
        }}
        headerTitle="表单管理"
        toolBarRender={() => [

        ]}

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
            },
          },
          search: {
            onSearch: (value: string) => {
              alert(value);
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
