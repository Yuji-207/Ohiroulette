const VELOCITY = 80;  // 徒歩の速さ [m/minutes]
const RADIUS = 6371;  // 地球の半径 [km]
const RADIAN = Math.PI / 180;


// Vincenty (1975)
const calcTime = (lat1, lng1, lat2, lng2) => {

  lat1 *= RADIAN;
  lng1 *= RADIAN;
  lat2 *= RADIAN;
  lng2 *= RADIAN;

  let distance = Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
  distance *= RADIUS;

  // 距離[km]を移動時間[m/minutes]に変換（1分余分に追加）
  const time = Math.round(distance * 1000 / VELOCITY) + 1;

  return time;
  
}


export default calcTime;
