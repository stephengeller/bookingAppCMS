import axios from 'axios';

export class GoogleMapsAPI {
  constructor() {
    this.state = {
      selected: 'mi',
      key: 'AIzaSyBQi4BxTf1DMgJsQhuX8louSRU2R0NTxl0',
      getCoordinates : 'https://maps.googleapis.com/maps/api/geocode/json'
    };
    this.data = {
      result: [],
      postcode: ''
    };
    this.getPostcodeResults = this.getPostcodeResults.bind(this);
  }

  async getPostcodeResults() {
    await axios
      .get(getCoordinates, {
        params: {
          address: this.state.query4,
          key: this.state.key,
          sensor: true
        }
      })
      .then(response => {
        console.log('The force is strong with this POSTCODE', response);
        const { lat, lng } = response.data.results[0].geometry.location;
        this.setState({
          query: this.state.query4,
          longitude: lng,
          latitude: lat,
          loading: false
        });
      })
      .catch(error => {
        console.log(
          'The force is weak with this POSTCODE - Error fetching and parsing data',
          error
        );
      });
  }
}
