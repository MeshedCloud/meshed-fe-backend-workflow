import type { NsJsonSchemaForm } from '@antv/xflow'
import {multipleSelectShape} from "@/pages/Flow/form/custom-multiple-select";


/** 自定义form控件 */
export enum ControlShapeEnum {
  'MULTIPLE_SELECT' = 'MULTIPLE_SELECT',
}

export const controlMapService: NsJsonSchemaForm.IControlMapService = controlMap => {
  controlMap.set(ControlShapeEnum.MULTIPLE_SELECT, multipleSelectShape)
  return controlMap
}
