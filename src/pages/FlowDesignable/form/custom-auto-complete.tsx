import {AutoComplete, Form} from "antd";
import {FormItemWrapper} from "@antv/xflow";

export const autoCompleteShape = (props: { controlSchema: any }) => {
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
            <AutoComplete
              allowClear
              style={{ width: '100%' }}
              options={selectOption}
              placeholder={placeholder}
              defaultValue={defaultValue}
            />
          </Form.Item>
        )
      }}
    </FormItemWrapper>
  )

}
