export class Definition {
  id!: string
  name!: string
  key!: string
  version!: number
  category: string | undefined
  isSuspended: boolean | undefined
}
export class Draft extends Definition{

}
