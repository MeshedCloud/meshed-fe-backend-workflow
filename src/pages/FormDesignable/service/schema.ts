import {Engine} from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import {getFormSchema, saveFormSchema} from "@/services/form/api";
import {success} from "@/common/messages";

export const saveSchema = (designer: Engine, formId: string) => {
  saveFormSchema({
    id:formId,
    schema: JSON.stringify(transformToSchema(designer.getCurrentTree()))
  }).then(res =>{
    success(res,"保存成功")
  })
}

export const loadInitialSchema = async (designer: Engine, formId: string) => {
  try {

    designer.setCurrentTree(
      transformToTreeNode(await getFormSchema(formId))
    )
  } catch {
  }
}
