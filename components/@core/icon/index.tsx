import authorities from '@static/icons/authorities.svg'
import finance from '@static/icons/finance.svg'
import garden from '@static/icons/garden.svg'
import household from '@static/icons/household.svg'
import multimedia from '@static/icons/multimedia.svg'
import shopping from '@static/icons/shopping.svg'
import special from '@static/icons/special.svg'
import transportation from '@static/icons/transportation.svg'
import classNames from 'class-names'
import styles from './iconStyles.css'
import { IIconProps } from './types'

type JsxOrNull = JSX.Element | null

/* tslint:disable no-any variable-name */
export const wrapIcon = (Icon: any, { width = 16, height = 16, className }: IIconProps): JsxOrNull => (
  <Icon width={width} height={height} className={classNames(styles.icon, className)} />
)

export const AuthoritiesIcon: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(authorities, props)
export const FinanceIcon: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(finance, props)
export const GardenIcon: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(garden, props)
export const HouseholdIcon: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(household, props)
export const MultimediaIcon: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(multimedia, props)
export const ShoppingIcon: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(shopping, props)
export const SpecialIcon: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(special, props)
export const TransportationIcon: React.SFC<IIconProps> = (props: IIconProps): JsxOrNull => wrapIcon(transportation, props)
