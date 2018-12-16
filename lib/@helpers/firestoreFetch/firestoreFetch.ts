// tslint:disable:no-any
// Stay informed: https://cloud.google.com/firestore/docs/reference/rest/

import fetch from 'isomorphic-unfetch'
import FireStoreParser from './helper'
import { IFirestoreFetch } from './types'

export const firestoreFetch = async (collection: string, document: string): Promise<IFirestoreFetch> => {
  const baseUrl = 'https://firestore.googleapis.com/v1beta1'
  const project = 'publify-hsr18fe'
  const database = '(default)'

  const url = `${baseUrl}/projects/${project}/databases/${database}/documents/${collection}/${document}`
  const options = {
    method: 'GET'
  }

  const data = await fetch(url, options)
    .then((response: FirebaseFirestore.DocumentData) => response.json())
    .then((json: any) => FireStoreParser(json))

  return { data }
}
