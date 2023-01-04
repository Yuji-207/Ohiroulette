import axios from 'axios';
import addParams from '@utils/add-params';
import calcDistance from '@utils/calc-distance';


const placeSearchTmp = async (req, res) => {

  const baseUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
  const currentLocation = req.query.location;

  const place_ids = [
    'ChIJfZGP0UJcGGARcJr6fitijNU',  // 築地食堂源ちゃん
    'ChIJfZGP0UJcGGAR1AnzRqMEGQ8', // お盆でご飯
    'ChIJG4bw41xcGGARdggvgYmahfk', // スンドゥブ
    'ChIJfZGP0UJcGGART0y4nWvHEmw', // 石窯やハンバーグ
    'ChIJW0Me61xcGGARybJrhxbnO3w', // 東急スクエア　焼肉　還元
    'ChIJTxD-61xcGGARtbugOnAiii4', // サボテン
    'ChIJ_ZR4j1xcGGARqx6F9Du2Dpo', // ニンニク
    'ChIJj_4K6VxcGGARuRLDxyZTi1A', // カザーナ　カレー
    'ChIJgXz0jS9dGGARqrifsw0rWLY', // 天塩ご飯　げん
    'ChIJ7ZzAEdtdGGAR4uJEM2UrM3Q', //みなとみらい食堂
    'ChIJEaFmc11cGGARF3VTM4IfED8', //ランドマーク　ぼてじゅう
  ];

  const places = [];
  for (const place_id of place_ids) {

    const params = {
      place_id: place_id,
      language: 'ja',
      key: process.env.API_KEY,
    };

    await axios.get(addParams(baseUrl, params))
    .then(response => {
      console.log(response.data)
      const result = response.data.result;
      
      const location = result.geometry.location;
      places.push({
        id: result.place_id,
        name: result.name,
        // photo: result.photos[0],
        rating: result.rating,
        vicinity: result.vicinity,
        distance: calcDistance(...currentLocation.split(','), location.lat, location.lng),
      });

    })
    .catch(error => {
      console.log({error});
    });

  }

  return res.status(200).json({places: places});

}


export default placeSearchTmp;
