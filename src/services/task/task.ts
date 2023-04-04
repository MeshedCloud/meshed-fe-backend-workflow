
export class Task {
  id!: string
  definitionId!: string
  formKey?: string
  variables?: any

}


export class Comment {
  id!: string
  userName!: string
  message!: string
}


export class CommentCmd {
  taskId!: string
  instanceId!: string
  message!: string
}

export class CompleteTaskCmd {
  taskId!: string
  instanceId!: string
  message!: string
}

export class ActivityRecord {
  id!: string
  activityName!: string
  assigneeName!: string
  fullMessage!: string
  endTime!: string
}
