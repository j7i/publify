import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Categorie } from '@helpers'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { categorieList } from '@user/dashboard/advertHandling/advertForm/categories/categorieList'
import { ICategorie } from '@user/dashboard/types'
import React, { PureComponent } from 'react'
import { IAdvertFilterProps, IAdvertFilterState } from '../types'
import styles from './advertFilterStyles.css'

export class AdvertFilter extends PureComponent<IAdvertFilterProps, IAdvertFilterState> {
  public state: IAdvertFilterState = {
    value: Categorie.HOUSEHOLD
  }

  public render(): JSX.Element {
    const { value } = this.state

    return (
      <div className={styles.advertFilter}>
        <AppBar position="static" color="default" className={styles.filterTabWrapper}>
          <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="on" indicatorColor="primary" textColor="primary">
            {categorieList.map((categorie: ICategorie, index: number) => (
              <Tab key={index} label={categorie.name} value={categorie.name} icon={<FontAwesomeIcon icon={categorie.icon} size="2x" />} />
            ))}
          </Tabs>
        </AppBar>
      </div>
    )
  }

  // tslint:disable-next-line:no-any
  private handleChange = (event: React.ChangeEvent, value: any): void => {
    event.preventDefault()
    const categorie = value as Categorie

    this.props.handleFilter(categorie)
    this.setState({ value })
  }
}
