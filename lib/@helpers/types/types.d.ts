import { ISeeking } from '@advert/advertListElement/types'
import * as http from 'http'

export interface IDatailPageProps {
  data: ISeeking
}

export interface IExtendedServerResponse extends http.ServerResponse, IDatailPageProps {}
