const getLocation = async () => {
  try {

    const position = await (() => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    })()

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude

    return [latitude, longitude]

  } catch (GeolocationPositionError) {
    return []
  }
}

export default getLocation;
