import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AdvertType } from '@helpers'
import { Avatar, Chip, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { ICategorie } from '@user'
import React, { PureComponent } from 'react'
import { IAdvertFilterProps, IAdvertFilterState } from '../types'
import styles from './advertFilterStyles.css'
import { categorieFilterList } from './categorieFilterList'

export class AdvertFilter extends PureComponent<IAdvertFilterProps, IAdvertFilterState> {
  public state: IAdvertFilterState = {
    selectedCategorie: 'Alle',
    advertTypeSelection: 'Alle'
  }

  public render(): JSX.Element {
    const { advertListRenderProps } = this.props

    return (
      <section className={styles.advertFilter}>
        <div className={styles.filterWrapper}>
          {/* <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="on" indicatorColor="primary" textColor="primary">
          </Tabs> */}
          <div className={styles.filterPrimary}>
            <div className={styles.filterElement}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="advertType">Type</InputLabel>
                <Select
                  value={advertListRenderProps.type}
                  onChange={this.handleTypeChange}
                  inputProps={{
                    name: 'advertTypeSelection',
                    id: 'advertType'
                  }}
                >
                  <MenuItem value="Alle">Demands and Offers</MenuItem>
                  <MenuItem value={AdvertType.DEMAND}>{AdvertType.DEMAND}</MenuItem>
                  <MenuItem value={AdvertType.OFFER}>{AdvertType.OFFER}</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* <div className={styles.filterElement}>
              <TextField
                id="location"
                type="text"
                name="location"
                label={'Location'}
                value=""
                // onChange={handleChange}
                fullWidth
                margin="normal"
                variant="standard"
              />
            </div> */}
            <div className={styles.filterElement}>Radius</div>
          </div>
          <div className={styles.filterSecondary}>
            {categorieFilterList.map((categorie: ICategorie, index: number) => (
              <Chip
                key={index}
                label={categorie.name}
                avatar={
                  <Avatar>
                    <FontAwesomeIcon icon={categorie.icon} size="1x" />
                  </Avatar>
                }
                onClick={(event: React.MouseEvent<HTMLDivElement>): void => this.handleCategorieSelection(event, categorie.name)}
                className={styles.categorieChip}
                color={advertListRenderProps.categorie === categorie.name ? 'primary' : 'default'}
                variant={advertListRenderProps.categorie === categorie.name ? 'default' : 'outlined'}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  private handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    event.persist()
    const { handleTypeFilter } = this.props.advertListRenderProps
    const type = event.target.value
    this.setState({ advertTypeSelection: type })
    handleTypeFilter(type)
    // remove states
  }

  private handleCategorieSelection = (event: React.MouseEvent<HTMLElement>, categorie: string): void => {
    event.persist()
    const { handleCategorieFilter } = this.props.advertListRenderProps
    this.setState({ selectedCategorie: categorie })
    handleCategorieFilter(categorie)
  }
}
