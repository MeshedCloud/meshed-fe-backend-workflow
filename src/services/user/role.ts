import { CommonItem } from '@/common/models';

export class RoleItem extends CommonItem {
  parentId: number | undefined;
  name: string | undefined;
  enname: string | undefined;
  ownerId: number | undefined;
  description: string | undefined;
}

export class RoleDetails extends RoleItem {
  access: number[] | undefined;
}

export class RoleGrantPermission {
  id: number | undefined;
  access: string[] | undefined;
}
