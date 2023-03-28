import { CommonItem } from '@/common/models';

export class SystemItem extends CommonItem {
  parentId: number | undefined;
  name: string | undefined;
  enname: string | undefined;
  description: string | undefined;
}

export const SystemItemStatusEnum = {
  ALL: { text: '全部', status: 'Default' },
  RUN: {
    text: '运行中',
    status: 'Success',
    color: 'green',
  },
  OFFLINE: {
    text: '下线',
    status: 'Error',
    color: 'red',
  },
  DISCARD: {
    text: '废弃',
    status: 'Error',
    color: 'yellow',
  },
  INITIATION: {
    text: '立项',
    status: 'Processing',
    color: 'purple',
  },
  RD: {
    text: '研发',
    status: 'Processing',
    color: 'blue',
  },
};

export const SystemItemStatus = [
  {
    value: 'RUN',
    label: '运行中',
  },
  {
    value: 'OFFLINE',
    label: '下线',
  },
  {
    value: 'DISCARD',
    label: '废弃',
  },
  {
    value: 'INITIATION',
    label: '立项',
  },
  {
    value: 'RD',
    label: '研发',
  },
];
