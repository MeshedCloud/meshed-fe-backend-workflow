import  { useEffect } from 'react'
import { Space, Button, Radio } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import {Engine, GlobalRegistry} from '@designable/core'
import { observer } from '@formily/react'
export interface IProps {
  formId: string
  loadInitialSchema: (designer: Engine, formId: string) => void
  save: (designer: Engine, formId: string) => void;
}
export const ActionsWidget = observer((props: IProps) => {
  const designer = useDesigner()
  useEffect(() => {
    props.loadInitialSchema(designer,props.formId)
  }, [])
  //'ko-kr'
  const supportLocales = ['zh-cn', 'en-us']
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn')
    }
  }, [])
  return (
    <Space style={{ marginRight: 10 }}>
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
          // { label: '한국어', value: 'ko-kr' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value)
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          props.save(designer,props.formId)
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
    </Space>
  )
})
