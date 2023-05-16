import React from 'react'
import FormDesigner from "@/components/FormDesigner";
import {useMatch} from "@@/exports";
import {loadInitialSchema, saveSchema} from "@/services/form/api";

const FormDesignable: React.FC = () => {
  // @ts-ignore
  const {params: {formId}} = useMatch('/form/designable/:formId')
  return (
    <FormDesigner formId={formId} save={saveSchema} loadInitialSchema={loadInitialSchema}/>
  )
}

export default FormDesignable;
