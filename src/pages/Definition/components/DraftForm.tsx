import {PlusSquareOutlined} from '@ant-design/icons';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Form, message} from 'antd';


import {useEffect} from 'react';
import {Draft} from "@/services/flow/definition";
import {getSystemSelect} from "@/services/system/api";
import {getCategorySelect, saveFlowDraft} from "@/services/flow/api";

type Props = {};

export default (props: Props) => {
  const [form] = Form.useForm<Draft>();

  useEffect(() => {

  }, [])
  return (
    <ModalForm<Draft>
      title={"流程信息-草稿"}
      trigger={
        <Button type="primary">
          <PlusSquareOutlined/>
          新建流程
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
        const res = await saveFlowDraft(values);
        if (res.success && res.data) {
          message.success("保存成功，可以在草稿箱中查看，自动进入设计页面(新标签)");
          setTimeout(() => {
            window.open(`/workflow/flow/designable/edit/${res.data}`);
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
        label="流程名称"
        tooltip="流程名称"
        placeholder="请输入流程名称"
        rules={[{required: true, message: '请输入流程名称!'}]}
      />
      <ProFormText
        name="key"
        label="流程标识"
        tooltip="流程标识"
        placeholder="请输入流程标识"
        rules={[{required: true, message: '请输入流程标识!'}]}
      />
      <ProFormSelect
        name="tenantId"
        request={getSystemSelect}
        label="归属系统"
        placeholder="选择归属系统"
        rules={[{required: true, message: '选择归属系统!'}]}
      />
      <ProFormSelect
        name="category"
        request={async params => getCategorySelect(params)}
        label="流程分类"
        placeholder="选择流程分类"
        rules={[{required: true, message: '选择流程分类!'}]}
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
