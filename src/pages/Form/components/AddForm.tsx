import {PlusSquareOutlined} from '@ant-design/icons';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Form, message} from 'antd';


import {useEffect} from 'react';

import {FormCmd} from "@/services/form/form";
import {saveForm} from "@/services/form/api";

type Props = {};

export default (props: Props) => {
  const [form] = Form.useForm<FormCmd>();

  useEffect(() => {

  }, [])
  return (
    <ModalForm<FormCmd>
      title={"新建表单"}
      trigger={
        <Button type="primary">
          <PlusSquareOutlined/>
          新建表单
        </Button>
      }
      initialValues={{}}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        const res = await saveForm(values)
        if (res.success && res.data) {
          message.success("保存成功，自动进入设计页面(新标签)");
          setTimeout(() => {
            window.open(`/workflow/form/designable/${res.data}`);
          }, 1000)

          // history.push({
          //   pathname: `/flow/designable/edit/${res.data}`
          // })
        }
        return true;
      }}
    >
      <ProFormText
        name="name"
        label="表单名称"
        tooltip="表单名称"
        placeholder="请输入表单名称"
        rules={[{required: true, message: '请输入表单名称!'}]}
      />
      <ProFormText
        name="key"
        label="表单标识"
        tooltip="表单标识"
        placeholder="请输入表单标识"
        rules={[{required: true, message: '请输入表单标识!'}]}
      />
      <ProFormTextArea
        name="description"
        label="流程详情"
        tooltip="最长为 100 字符"
        placeholder="请输入描述"
        rules={[{required: true, max: 100, message: '请输入描述!(最长为 100 字符)'}]}
      />

    </ModalForm>
  );
};
