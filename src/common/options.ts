// 接口泛型与函数泛型结合

import {RequestOptionsType} from "@ant-design/pro-components";

export interface OptionsConvert {
  (value: any): RequestOptionsType;
}

export const DefaultOptionsConvert = (value: any): RequestOptionsType =>  {
  const item: RequestOptionsType = {
    label:value.label,
    value:value.value
  }
  return item
}
