import { IMessage } from '../types'

export const sortMessageByTimeStamp = (messages: IMessage[]): IMessage[] =>
  messages.sort((a: IMessage, b: IMessage) => {
    let timeA = `${a.date.seconds}${a.date.nanoseconds}`
    let timeB = `${b.date.seconds}${b.date.nanoseconds}`
    return parseInt(timeA, 10) - parseInt(timeB, 10)
  })
