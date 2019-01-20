import { ProvidedProps } from 'google-maps-react'
import { ReactNode } from 'react'
import { MapDisplayMode } from './enums'

export interface IGoogleMapInternalProps extends ProvidedProps {
  displayMode: MapDisplayMode
  initialLocation?: ILocation
  locations?: ILocation[]
  handleLocationInput?: (location: ILocation) => void
}
export interface IGoogleMapInternalState {
  radius: number
  initialCenter: ILocation
  selectedLocationName: string
  selectedLocation?: ILocation
  notification?: ReactNode
}

export interface ICustomMarkerProps extends google.maps.MarkerOptions, google.maps.Symbol {
  position: ILocation
}

export interface ILocation {
  lat: number
  lng: number
}
