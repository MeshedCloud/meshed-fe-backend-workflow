import type { NsJsonSchemaForm } from '@antv/xflow'
import {multipleSelectShape} from "@/pages/Flow/form/custom-multiple-select";
import {autoCompleteShape} from "@/pages/Flow/form/custom-auto-complete";
import {selectShape} from "@/pages/Flow/form/custom-select";


/** 自定义form控件 */
export enum ControlShapeEnum {
  'CUSTOM_SELECT' = 'CUSTOM_SELECT',
  'MULTIPLE_SELECT' = 'MULTIPLE_SELECT',
  'AUTO_COMPLETE' = 'AUTO_COMPLETE',
}

export const controlMapService: NsJsonSchemaForm.IControlMapService = controlMap => {
  controlMap.set(ControlShapeEnum.CUSTOM_SELECT, selectShape)
  controlMap.set(ControlShapeEnum.MULTIPLE_SELECT, multipleSelectShape)
  controlMap.set(ControlShapeEnum.AUTO_COMPLETE, autoCompleteShape)
  return controlMap
}
