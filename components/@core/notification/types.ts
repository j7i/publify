import { NotificationSeverity } from './enums'

export interface INotificationProps {
  severity: NotificationSeverity
  message: string
}
export interface INotificationState {
  open: boolean
}
