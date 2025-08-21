import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Weather.css"; 
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import search_icon from "../wheatherapp/Assets/search.png";
import clear_icon from "../wheatherapp/Assets/clear.png";
import cloud_icon from "../wheatherapp/Assets/cloud.png";
import drizzle_icon from "../wheatherapp/Assets/drizzle.png";
import humidity_icon from "../wheatherapp/Assets/humidity.png";
import rain_icon from "../wheatherapp/Assets/rain.png";
import snow_icon from "../wheatherapp/Assets/snow.png";
import wind_icon from "../wheatherapp/Assets/wind.png";

const Weather = () => {
  const inputRef = useRef(null);
  const [weather, setWeather] = useState(null);

  const API_KEY = "532379ed995281754fac466d05987f27";

  const search = useCallback(
    async (city) => {
      if (!city) return;

      const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
      };

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
          alert(data.message);
          return;
        }

        setWeather({
          city: data.name,
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windspeed: data.wind.speed,
          icon: allIcons[data.weather[0].icon] || clear_icon,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    },
    [API_KEY]
  );

  useEffect(() => {
    search("Madurai");
  }, []);



  return (
    <div className="container">
      <h1 className="title"> Weather App</h1>

      <div className="searchBox">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city..."
         
          className="input"
        />
        {/* <img
          src={search_icon}
          alt="search"
          onClick={() => search(inputRef.current.value)}
          className="searchBtn"
        /> */}
        <i onClick={()=>search(inputRef.current.value)}  ><SearchOutlinedIcon sx={{fontSize:40}}/></i>
      </div>

      {weather && (
        <div className="card">
          <h2>{weather.city}</h2>
          <img src={weather.icon} alt="no img" className="weatherIcon" />
          <p className="temp">{weather.temperature}°C</p>
         <h3 style={{ textTransform: "capitalize",color:"#a0f714" }}>{weather.description}</h3>

          <div className="extraInfo">
            <div className="infoItem">
              <img src={humidity_icon} alt="no img" className="smallIcon" />
              <p>{weather.humidity}%</p>
              <span>Humidity</span>
            </div>
            <div className="infoItem">
              <img src={wind_icon} alt="no img" className="smallIcon" />
              <p>{weather.windspeed} m/s</p>
              <span>Wind</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );    
};

export default Weather;
