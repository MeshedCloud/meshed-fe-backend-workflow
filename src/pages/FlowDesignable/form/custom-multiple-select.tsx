import {Form, Select} from "antd";
import {FormItemWrapper} from "@antv/xflow";

export const multipleSelectShape = (props: { controlSchema: any }) => {
  const {controlSchema} = props
  const { required, tooltip, extra, name, label, placeholder,defaultValue ,options} = controlSchema
  const selectOption: any[] | undefined = []
  if (options && options.length > 0){
    options.forEach((item: { title: any; value: any; }) => {
      selectOption.push({
        label:item.title,
        value:item.value
      })
    })
  }

  return (
    <FormItemWrapper schema={controlSchema}>
      {({ disabled, hidden, initialValue }) => {
        return (
          <Form.Item
            name={name}
            label={label}
            initialValue={initialValue}
            tooltip={tooltip}
            extra={extra}
            required={required}
            hidden={hidden}
          >
            {/* 这里的组件可以拿到onChange和value */}
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}

              placeholder={placeholder}
              defaultValue={defaultValue}
              // onChange={handleChange}
              options={selectOption}
            />
          </Form.Item>
        )
      }}
    </FormItemWrapper>
  )

}
