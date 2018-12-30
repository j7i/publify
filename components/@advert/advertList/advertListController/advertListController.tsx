import { FirebaseCollection, firestore } from '@config'
import { PureComponent, ReactNode } from 'react'
import { IAdvertListControllerProps, IAdvertListControllerState, IAdvertListRenderProps } from '../types'

export class AdvertListController extends PureComponent<IAdvertListControllerProps, IAdvertListControllerState> {
  public state: IAdvertListControllerState = {
    categorie: 'Alle',
    type: 'Alle'
  }

  public handleCategorieFilter = (categorie: string): void => {
    this.setState(
      {
        categorie
      },
      () => this.getAdverts()
    )
  }

  public handleTypeFilter = (type: string): void => {
    this.setState(
      {
        type
      },
      () => this.getAdverts()
    )
  }

  public render(): ReactNode {
    const { children } = this.props

    const advertListRenderProps: IAdvertListRenderProps = {
      ...this.state,
      handleCategorieFilter: this.handleCategorieFilter,
      handleTypeFilter: this.handleTypeFilter
    }

    return children(advertListRenderProps)
  }

  private getAdverts = (): void => {
    // tslint:disable-next-line:no-any
    let adverts: any[] = []
    let advertsRef = firestore.collection(FirebaseCollection.ADVERTS)
    let advertsQuery
    const { type, categorie } = this.state

    if (categorie === 'Alle' && type === 'Alle') {
      advertsQuery = advertsRef.where('published', '==', true)
    } else if (categorie !== 'Alle' && type === 'Alle') {
      advertsQuery = advertsRef.where('published', '==', true).where('categories', 'array-contains', categorie)
    } else if (type !== 'Alle' && categorie === 'Alle') {
      advertsQuery = advertsRef.where('published', '==', true).where('type', '==', type)
    } else {
      advertsQuery = advertsRef
        .where('published', '==', true)
        .where('type', '==', type)
        .where('categories', 'array-contains', categorie)
    }

    advertsQuery
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          adverts.push({ id: doc.id, ...doc.data() })
        })
      })
      .then(() => {
        this.setState({ filteredAdverts: adverts })
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
