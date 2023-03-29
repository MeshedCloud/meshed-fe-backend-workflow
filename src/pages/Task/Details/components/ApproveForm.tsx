import {
  ModalForm,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Form} from 'antd';


import {useEffect} from 'react';
import * as React from "react";

type Props = {
  title: string
  onFinish: (formData: Approve) => Promise<boolean | void>;
  buttonType?:  "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined
  icon?: React.ReactNode;
};

export class Approve {
  message!: string
}
export default (props: Props) => {
  const [form] = Form.useForm<Approve>();
  useEffect(() => {
  }, [])
  return (
    <ModalForm<Approve>
      title={props.title}
      trigger={
        <Button type={props.buttonType} icon={props.icon}>
          {props.title}
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
      onFinish={props.onFinish}
    >
      <ProFormTextArea
        name="message"
        label="审批理由"
        tooltip="最长为 100 字符"
        placeholder="请输入描述"
        rules={[{required: true, max: 100, message: '请输入描述!(最长为 100 字符)'}]}
      />

    </ModalForm>
  );
};
