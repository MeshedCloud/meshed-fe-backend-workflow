export class AccountItem {
  id!: number;
  loginId: number | undefined;
  email: string | undefined;
  phone: string | undefined;
  status: string | undefined;
  validEmail: boolean | undefined;
  validPhone: boolean | undefined;
  locked: boolean | undefined;
  createTime: string | undefined;
  updateTime: string | undefined;
}

export class AccountDetail extends AccountItem {
}

export class AccountGrantRole {
  id: number | undefined;
  roles: string[] | undefined;
}

