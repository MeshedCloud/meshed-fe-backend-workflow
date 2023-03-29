
export class Task {
  id!: string
  definitionId!: string

}


export class Comment {
  id!: string
  userName!: string
  message!: string
}


export class CommentCmd {
  taskId!: string
  definitionId!: string
  message!: string
}

export class CompleteTaskCmd {
  taskId!: string
  message!: string
}

export class ActivityRecord {
  id!: string
  activityName!: string
  assigneeName!: string
  message!: string
  endTime!: string
}
