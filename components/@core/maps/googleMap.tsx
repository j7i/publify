import { GoogleApiWrapper, Map, MapProps, Marker } from 'google-maps-react'
import getConfig from 'next/config'
import { PureComponent, ReactNode } from 'react'
import Geosuggest, { Suggest } from 'react-geosuggest'
import './geoSuggestStyles.css'
import styles from './mapsStyles.css'
import { IGoogleMapInternalProps, IGoogleMapInternalState, ILocation } from './types'

const { publicRuntimeConfig } = getConfig()
const GoogleMapsApiKey = publicRuntimeConfig.GOOGLE_MAPS_API_KEY

// tslint:disable-next-line:no-any
class GoogleMapInternal extends PureComponent<IGoogleMapInternalProps, IGoogleMapInternalState> {
  public state: IGoogleMapInternalState = {
    selectedLocationName: 'Zurich',
    radius: 14,
    initialCenter: {
      lat: 47.36667,
      lng: 8.55
    }
  }

  public componentDidMount(): void {
    const location = this.getLocation()
    this.setLocationName(location)
  }

  public render(): ReactNode {
    const { selectedLocationName, newLocation } = this.state
    const { locationBounds, google, isDetailPage = false } = this.props
    let mapBounds

    if (locationBounds) {
      mapBounds = new google.maps.LatLngBounds()

      for (let index = 0; index < locationBounds.length; index++) {
        mapBounds.extend(locationBounds[index])
      }
    }

    return (
      <>
        <Geosuggest
          placeholder={mapBounds ? 'Search for locations' : 'Add your location'}
          initialValue={mapBounds ? '' : selectedLocationName}
          onSuggestSelect={this.onSuggestSelect}
          disabled={isDetailPage}
        />
        <div className={styles.map}>
          <Map
            google={google}
            streetViewControl={false}
            fullscreenControl={false}
            mapTypeControl={false}
            scrollwheel={false}
            zoom={15}
            bounds={mapBounds && mapBounds}
            initialCenter={this.getLocation()}
            center={newLocation}
            onClick={this.onMapClick}
            zoomControlOptions={{ position: google.maps.ControlPosition.TOP_LEFT }}
          >
            {locationBounds ? (
              locationBounds.map((bound: ILocation, index: number) => <Marker key={index} position={bound} />)
            ) : (
              <Marker position={this.getLocation()} />
            )}
          </Map>
        </div>
      </>
    )
  }

  private getLocation = (): ILocation => {
    const { initialCenter, newLocation } = this.state
    const { initialLocation } = this.props

    if (newLocation) {
      return newLocation
    } else if (initialLocation) {
      return initialLocation
    } else {
      return initialCenter
    }
  }

  private setLocationName = (location: ILocation): void => {
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ location }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          // map.setZoom(11)
          // let marker = new google.maps.Marker({
          //   position: latlng,
          //   map
          // })
          this.setState({
            selectedLocationName: results[0].formatted_address
          })
          // infowindow.open(map, marker)
        } else {
          return `Your adress couldn't be recognized`
        }
      } else {
        // TODO: Notification
        window.alert('Geocoder failed due to: ' + status)
        return 'Something went wrong'
      }
    })
  }

  private onMapClick = (_mapProps: MapProps, _map: google.maps.Map, event: google.maps.MouseEvent): void => {
    const { handleLocationInput, locationBounds, isDetailPage } = this.props

    if (locationBounds || isDetailPage) {
      return
    }

    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }

    this.setState(
      {
        newLocation
      },
      () => {
        this.setLocationName(newLocation)
        if (handleLocationInput) {
          handleLocationInput(newLocation)
        }
      }
    )
  }

  private onSuggestSelect = (place?: Suggest): void => {
    if (place) {
      const {
        location: { lat, lng }
      } = place

      this.setState({
        initialCenter: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }
      })
    }
  }
}

export const GoogleMap = GoogleApiWrapper({
  apiKey: GoogleMapsApiKey
})(GoogleMapInternal)
