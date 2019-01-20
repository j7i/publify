import { NotificationSeverity, SnackbarNotification } from '@core'
import classNames from 'classnames'
import { GoogleApiWrapper, Map, MapProps, Marker } from 'google-maps-react'
import getConfig from 'next/config'
import { PureComponent, ReactNode } from 'react'
import Geosuggest, { Suggest } from 'react-geosuggest'
import { MapDisplayMode } from './enums'
import './geoSuggestStyles.css'
import styles from './mapsStyles.css'
import { IGoogleMapInternalProps, IGoogleMapInternalState, ILocation } from './types'

const { publicRuntimeConfig } = getConfig()
const GoogleMapsApiKey = publicRuntimeConfig.GOOGLE_MAPS_API_KEY
const defaultLocation = {
  lat: 47.36667,
  lng: 8.55
}

/**
 * Internal class due to named export with a wrapping HOC
 */
class GoogleMapInternal extends PureComponent<IGoogleMapInternalProps, IGoogleMapInternalState> {
  public state: IGoogleMapInternalState = {
    selectedLocationName: '',
    radius: 14,
    initialCenter: this.props.initialLocation || defaultLocation,
    notification: null
  }

  public componentDidMount(): void {
    const { displayMode, initialLocation, locations } = this.props

    if (locations) {
      this.setState({ initialCenter: locations[0] || defaultLocation })
    }

    if (displayMode === MapDisplayMode.SINGLE_WITH_SEARCH) {
      if (initialLocation) {
        this.setLocationName(initialLocation)
      }
    }
  }

  public render(): ReactNode {
    const { selectedLocationName, selectedLocation, initialCenter } = this.state
    const { locations, google, displayMode } = this.props
    const markerColor = '#009688'

    const isFront = displayMode === MapDisplayMode.MULTIPLE_LOCATIONS
    const isForm = displayMode === MapDisplayMode.SINGLE_WITH_SEARCH
    const isDetail = displayMode === MapDisplayMode.SINGLE_LOCKED

    return (
      <>
        {isForm && <Geosuggest placeholder={'Type to add your location...'} initialValue={selectedLocationName} onSuggestSelect={this.onSuggestSelect} />}
        <div className={classNames(styles.map, { [styles.fullHeightMap]: isDetail || isFront })}>
          <Map
            google={google}
            streetViewControl={false}
            fullscreenControl={false}
            mapTypeControl={false}
            gestureHandling="cooperative"
            zoom={15}
            initialCenter={initialCenter}
            center={isForm ? selectedLocation : undefined}
            bounds={locations && this.getLatLngBounds(locations)}
            onClick={this.onMapClick}
            zoomControlOptions={{ position: google.maps.ControlPosition.TOP_LEFT }}
          >
            {locations
              ? locations.map((location: ILocation, index: number) => {
                  return this.renderMarker(location, markerColor, index)
                })
              : this.renderMarker(selectedLocation ? selectedLocation : initialCenter, markerColor)}
          </Map>
        </div>
      </>
    )
  }

  /**
   * A LatLngBounds instance represents a rectangle in geographical coordinates,
   * including one that crosses the 180 degrees longitudinal meridian. We use this function
   * to provide an initial view of all published adverts on the map.
   */
  private getLatLngBounds = (locations: ILocation[]): google.maps.LatLngBounds => {
    let mapBounds = new google.maps.LatLngBounds()

    for (let index = 0; index < locations.length; index++) {
      mapBounds.extend(locations[index])
    }
    return mapBounds
  }

  /**
   * Renders a custom GoogleMaps Marker by providing a location and color
   */
  private renderMarker = (location: ILocation, color: string, index?: number): ReactNode => (
    <Marker
      position={location}
      key={index}
      icon={{
        anchor: new google.maps.Point(35.5, 105),
        fillColor: color,
        strokeColor: color,
        fillOpacity: 1,
        path:
          'M53.345,9.155c-12.207-12.207-31.982-12.207-44.189,0c-12.207,12.201-12.207,31.995,0,44.189 c0,0,22.083,21.655,22.083,46.655c0-25,22.106-46.655,22.106-46.655C65.552,41.15,65.552,21.356,53.345,9.155z M31.238,43.769 c-6.897,0-12.488-5.591-12.488-12.5s5.591-12.5,12.488-12.5c6.921,0,12.512,5.591,12.512,12.5S38.159,43.769,31.238,43.769z',
        scale: 0.5 // original-size: 71 x 105
      }}
    />
  )

  /**
   * Translates a location into a name and sets a state "selectedLocationName"
   * The translated location result is displayed in the Geosuggest search bar (e.g. onMount or onUpdate)
   */
  private setLocationName = (location: ILocation): void => {
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ location }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.setState({
            selectedLocationName: results[0].formatted_address
          })
        } else {
          return `Your adress could not be recognized`
        }
      } else {
        this.setState({
          notification: (
            <SnackbarNotification key={Date.now() + Math.random()} message={`Geocoder failed due to: ${status}`} severity={NotificationSeverity.ERROR} />
          )
        })
      }
    })
  }

  /**
   * onSuggestSelect is used by Geosuggest which will autosuggest locations while typing
   * and will set the selected location as selectedLocation state.
   * See {@link https://github.com/ubilabs/react-geosuggest}
   */
  private onSuggestSelect = (place?: Suggest): void => {
    if (place) {
      const {
        location: { lat, lng }
      } = place
      const { handleLocationInput } = this.props

      const selectedLocation = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }

      this.setState({
        selectedLocation
      })

      if (handleLocationInput) {
        handleLocationInput(selectedLocation)
      }
    }
  }

  /**
   * If a user is creating a new advert, he can click on the map to provide a more specific location.
   * onClick will pass the location to the formController if a handleLocationInput event is provided.
   * onClick will only be executed when the displayMode is set to MULTIPLE_LOCATIONS
   * @type {(MapDisplayMode.MULTIPLE_LOCATIONS)}
   */
  private onMapClick = (_mapProps: MapProps, _map: google.maps.Map, event: google.maps.MouseEvent): void => {
    const { handleLocationInput, displayMode } = this.props

    if (displayMode === MapDisplayMode.MULTIPLE_LOCATIONS || displayMode === MapDisplayMode.SINGLE_LOCKED) {
      return
    }

    const selectedLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }

    this.setState(
      {
        selectedLocation
      },
      () => {
        this.setLocationName(selectedLocation)
        if (handleLocationInput) {
          handleLocationInput(selectedLocation)
        }
      }
    )
  }
}

/**
 * @function handleLocationInput will be passed in through a wrapping formController to gather a selected location.
 * @helpers The GoogleMap component is using google-maps-react {@link https://github.com/fullstackreact/google-maps-react}
 * and react-geosuggest {@link https://github.com/ubilabs/react-geosuggest}
 */
export const GoogleMap = GoogleApiWrapper({
  apiKey: GoogleMapsApiKey
})(GoogleMapInternal)
