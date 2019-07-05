export const fetchLocationId = async city => {
  console.log(city)
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`,
  );
  const locations = await response.json();
  console.log(locations)
  return locations[0].woeid;
};

export const fetchWeather = async woeid => {
  console.log(woeid)
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`,
  );
  const { title, consolidated_weather } = await response.json();
  console.log(title)
  console.log(consolidated_weather)

  const { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp,
  };
};
