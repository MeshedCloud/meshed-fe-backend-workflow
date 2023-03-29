import React from "react";
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, Password } from '@formily/antd'
import * as ICONS from '@ant-design/icons'


export const Schema = createSchemaField({
  components: {
    Form,
    FormItem,
    Input,
    Password,
  },
  scope: {
    icon(name: string | number) {
      return React.createElement(ICONS[name])
    },
  },
})

export const commonForm = createForm({
  validateFirst: true,
})
