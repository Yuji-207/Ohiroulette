import axios from 'axios';
import addParams from '@utils/add-params';
import calcDistance from '@utils/calc-distance';


const placeSearch = async (req, res) => {

  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  const currentLat = process.env.LATITUDE;
  const currentLng = process.env.LONGITUDE;

  let params = {
    location: currentLat + ',' + currentLng,
    language: 'ja',
    maxprice: 3,
    minprice: 0,
    // opennow: true,
    // pagetoken: '',
    rankby: 'distance',
    // radius: 500,
    type: 'restaurant',
    key: process.env.API_KEY,
  };

  const places = [];
  // for (let i = 0; i < 3; i++) {
  for (let i = 0; i < 1; i++) {  // pagetokenが使えない
    await axios.get(addParams(url, params))
      .then(response => {
        
        const data = response.data;
        // params.pagetoken = data.next_page_token;  // pagetokenが使えない
        
        for (const result of data.results) {
          const location = result.geometry.location;
          places.push({
            name: result.name,
            // photo: result.photos[0],
            rating: result.rating,
            vicinity: result.vicinity,
            distance: calcDistance(currentLat, currentLng, location.lat, location.lng),
          });
        }

      })
      .catch(error => {
        console.log(error);
      });
  }

  // places.sort((a, b) => a.distance - b.distance);  // pagetokenが使えない
  return res.status(200).json({places: places});

}


export default placeSearch;
