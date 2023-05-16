import React from "react";
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  Input,
  Password,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  Checkbox,
  NumberPicker,
  Transfer,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  ArrayCards,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
} from '@formily/antd'
import * as ICONS from '@ant-design/icons'
import {Card, ObjectContainer, Rate, Slider} from "@designable/formily-antd";


export const Schema = createSchemaField({
  components: {
    Form,
    FormItem,
    Input,
    Password,
    Select,
    TreeSelect,
    Cascader,
    Radio,
    Checkbox,
    Slider,
    Rate,
    NumberPicker,
    Transfer,
    DatePicker,
    TimePicker,
    Upload,
    Switch,
    Card,
    ArrayCards,
    ObjectContainer,
    ArrayTable,
    Space,
    FormTab,
    FormCollapse,
    FormLayout,
    FormGrid,
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
