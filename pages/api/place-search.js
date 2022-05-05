import axios from 'axios';


const placeSearch = async (req, res) => {

  let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';

  const params = {
    location: process.env.LATITUDE + ',' + process.env.LONGITUDE,
    language: 'ja',
    maxprice: 3,
    minprice: 0,
    // opennow: true,
    // pagetoken: null,  // next_page_token
    rankby: 'distance',
    type: 'restaurant',
    key: process.env.API_KEY,
  }

  for (const key in params) {
    url += key + '=' + params[key] + '&'
  }

  url.slice(0, -1);

  await axios.get(url)
    .then(response => {

      const results = response.data.results;
      const places = [];
      for (const result of results) {
        places.push(result.name)
      }
      return res.status(200).json(places)

    })
    .catch(error => {
      console.log(error);
      return res.status(200).json({ name: 'John Doe' })
    });

}


export default placeSearch;
