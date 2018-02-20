import axios from 'axios';
import key from '../dev';

export default class GoogleMapsAPI {
  constructor() {
    this.state = {
      selected: 'mi',
      key: key.GoogleMapsAPIKey,
      getCoordinates: 'https://maps.googleapis.com/maps/api/geocode/json'
    };
    this.data = {
      result: [],
      postcode: ''
    };
    this.getPostcodeResults = this.getPostcodeResults.bind(this);
  }

  async getPostcodeResults(postcode) {
    let locationObject = {
      longitude: 0,
      latitude: 0
    };
    await axios
      .get(this.state.getCoordinates, {
        params: {
          address: postcode,
          key: this.state.key,
          sensor: true
        }
      })
      .then(response => {
        console.log('Frodo, we must carry this POSTCODE to Mordor', response);
        const { lat, lng } = response.data.results[0].geometry.location;
        locationObject = {
          longitude: lng,
          latitude: lat
        };
        return locationObject;
      })
      .catch(error => {
        console.log(
          'One does not simply work with this POSTCODE - Error fetching and parsing data',
          error
        );
      });
    return locationObject;
  }

  async getAddressFromLatLng(lat, lng) {
    let addressObject = {};
    const address = `${lat},${lng}`;
    await axios
      .get(this.state.getCoordinates, {
        params: {
          address,
          key: this.state.key,
          sensor: true
        }
      })
      .then(response => {
        console.log('Frodo, we must carry this LOCATION to Mordor', response);
        addressObject = response.data.results[0];
        return addressObject;
      })
      .catch(error => {
        console.log(
          'One does not simply work with this LOCATION - Error fetching and parsing data',
          error
        );
      });
    return addressObject;
  }
}
