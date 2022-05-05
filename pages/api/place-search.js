import axios from 'axios';
import addParams from '@utils/add-params';


const placeSearch = async (req, res) => {

  const pagetoken = req.query.pagetoken;
  const url = addParams(
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    {
      location: process.env.LATITUDE + ',' + process.env.LONGITUDE,
      language: 'ja',
      maxprice: 3,
      minprice: 0,
      // opennow: true,
      pagetoken: pagetoken === undefined ? '' : pagetoken,
      // rankby: 'distance',
      radius: 500,
      type: 'restaurant',
      key: process.env.API_KEY,
    }
  )

await axios.get(url)
    .then(response => {

      const results = response.data.results;
      
      const places = [];
      for (const result of results) {
        const place = {
          name: result.name,
          // photo: result.photos[0],
          rating: result.rating,
          vicinity: result.vicinity,
        }
        places.push(place);
      }

      const pagetoken = response.data.next_page_token;
      
      return res.status(200).json({
        pagetoken: pagetoken === undefined ? '' : pagetoken,
        places: places,
      });

    })
    .catch(error => {
      
      console.log(error);
      return res.status(200).json([]);

    });

}


export default placeSearch;
