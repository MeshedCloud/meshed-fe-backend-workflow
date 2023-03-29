import React from "react";
import {Button} from "antd";
import {FormDialog, FormLayout} from "@formily/antd";
import {createForm} from "@formily/core";
import {Schema} from "@/components/Schema/Schema";

export const commonForm = createForm({
  validateFirst: true,
})

type IModalSchemaProps = {
  title: string
  buttonText: string
  formId: string
  //系统自定义的业务ID 非必须
  businessId?: string
  request: (formId: string) => Promise<any | undefined>;
  //初始化业务会携带业务ID和当前表单ID
  initial?: (formId: string, businessId?: string) => Promise<any | undefined>;
  onFinish?: (formId: string, formData: any) => Promise<boolean | void>;
  onCancel?: () => void;
  buttonType?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined
  icon?: React.ReactNode;
};

export const ModalSchema = (props: IModalSchemaProps) => {
  return (
    <FormDialog.Portal>
      <Button
        type={props.buttonType}
        icon={props.icon}
        onClick={async () => {
          const data = await props.request(props.formId);
          let schema: any = undefined;
          if (data) {
            if (data.schema) {
              schema = data.schema
            } else {
              schema = data
            }
          }
          let initialValues: any = {};
          if (props.initial) {
            initialValues = await props.initial(props.formId, props.businessId);
          }

          const dialog = FormDialog(props.title, () => {
            return (
              <FormLayout labelCol={6} wrapperCol={10}>
                <Schema schema={schema}/>
              </FormLayout>
            )
          })
          dialog
            .forOpen((payload, next) => {

              next({
                initialValues: initialValues,
              })
            })
            .forConfirm(async (payload, next) => {
              if (props.onFinish) {
                const op = await props.onFinish(props.formId, payload.values);
                if (op) {
                  //成功继续
                  next(payload)
                }
              } else {
                //没有完成操作直接关闭
                next(payload)
              }

            })
            .forCancel((payload, next) => {
              if (props.onCancel) {
                props.onCancel()
              }
              next(payload)
            })
            .open()
            .then(console.log)
        }}
      >
        {props.buttonText}
      </Button>
    </FormDialog.Portal>
  )
}

