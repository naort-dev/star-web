import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import loadScript from '../../utils/scriptLoader';
import PlacesStyled from './styled';

export default class PlacesAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placesArray: [],
    };
    this.autoComplete = null;
    this.placeDetails = null;
  }
  componentWillMount() {
    const googlePlacesAvailable = !window.google || !window.google.maps || (window.google && window.google.maps && !window.google.maps.places);
    if (googlePlacesAvailable && !document.getElementById('google-places')) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${env('GOOGLE_PLACES_KEY')}&libraries=places`, 'google-places')
        .then(() => {
          this.autoCompleteInit();
        });
    } else if (!googlePlacesAvailable) {
      this.autoCompleteInit();
    }
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  onFieldChange = (value) => {
    const googlePlacesAvailable = !window.google || !window.google.maps || (window.google && window.google.maps && !window.google.maps.places);
    if (!googlePlacesAvailable) {
      this.autoCompleteInit();
    }
    this.props.onChange(value);
    if (value) {
      this.autoComplete.getPlacePredictions({ input: value, componentRestrictions: { country: 'us' } }, pred => this.fillAddress(pred));
    } else {
      this.setState({ placesArray: [] });
    }
  }

  getAddress = (placeId) => {
    this.setState({ placesArray: [] });
    this.geocoder.geocode({ placeId }, (results, status) => {
      if (status === 'OK') {
        const address = {};
        results[0].address_components.forEach((item) => {
          if (item.types.indexOf('administrative_area_level_1') > -1) {
            address.state = item.long_name;
          } else if (item.types.indexOf('postal_code') > -1) {
            address.zip = item.long_name;
          } else if (item.types.indexOf('locality') > -1) {
            address.city = item.long_name;
          }
        });
        this.props.getAddress(address);
      }
    });
  }
  
  fillAddress = (placesArray) => {
    if (placesArray) {
      this.setState({ placesArray });
    }
  }

  autoCompleteInit = () => {
    this.autoComplete = new window.google.maps.places.AutocompleteService();
    this.geocoder = new window.google.maps.Geocoder();
  }

  handleClickOutside = (e) => {
    if (this.placeElement && !this.placeElement.contains(e.target)) {
      this.setState({ placesArray: [] });
    }
  }

  renderPlaces = () => {
    return this.state.placesArray.map((item) => {
      return (
        <PlacesStyled.ListItem
          onClick={() => this.getAddress(item.place_id)}
          key={item.place_id}
        >
          {item.description}
        </PlacesStyled.ListItem>
      );
    });
  }

  render() {
    return (
      <PlacesStyled innerRef={(node) => { this.placeElement = node; }}>
        <PlacesStyled.Input
          {...this.props}
          onChange={event => this.onFieldChange(event.target.value)}
        />
        {
          this.state.placesArray.length ?
            <PlacesStyled.ListWrapper>
              <Scrollbars>
                { this.renderPlaces() }
              </Scrollbars>
            </PlacesStyled.ListWrapper>
          : null
        }
      </PlacesStyled>
    );
  }
}
