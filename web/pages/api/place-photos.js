import axios from 'axios';


const placeSearch = async (req, res) => {

  let url = 'https://maps.googleapis.com/maps/api/place/photo?';

  const params = {
    photo_reference: 'Aap_uEDnz_WTtjeSoT06mpN-Yr6NuNoGVip9P74POPIyhLv0Kvr-GORZFWiSGCAf1UnQN29IElWm3J3_KyFw1zUd7IHkVTDDjcjtMp9vQkupTQt0b-BsKLvC6MotMONrakPg4g0Nb-lzhVp8znaorp3klzcdoZJjgamJXZZn6strL82BOIxG',
    maxheight: 400,
    maxwidth: 400,
    key: process.env.API_KEY,
  }

  for (const key in params) {
    url += key + '=' + params[key] + '&'
  }

  url.slice(0, -1);

  await axios.get(url)
    .then(response => {

      const results = response.data;
      console.log(results)
      return res.status(200).json(results)

    })
    .catch(error => {
      console.log(error);
      return res.status(200).json({ name: 'John Doe' })
    });

}


export default placeSearch;
