import React, { useState } from "react";
import { render } from "react-dom";
import axios from "axios";

const WeatherApp = () => {
  const [temperature, setTemperature] = useState("");
  const [day1, setDay1] = useState("");
  const [day2, setDay2] = useState("");
  const [day3, setDay3] = useState("");
  const [day4, setDay4] = useState("");
  // const [desc, setDesc] = useState("");
  const [ hour1,setHour1] = useState("");
  const [ hour2,setHour2] = useState("");
  const [ hour3,setHour3] = useState("");
  const [city, setCity] = useState("Melbourne");
  const [country, setCountry] = useState("AU");
  const [lat,setLat] = useState("")
  const [long,setLong] = useState("")
  
  const getWeatherData = (city, country) => {
    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=83435ee9f975acd42bc3d111c0de5b18`,
    })
      .then((response) => {
        console.log(response)
        // console.log(response.data.list[1].main.temp);
        // Kelvin to Fahrenheit
        setTemperature((response.data.list[0].main.temp - 273.15) * 1.8 + 32);
        setDay1((response.data.list[3].main.temp - 273.15) * 1.8 + 32)
        setDay2((response.data.list[6].main.temp - 273.15) * 1.8 + 32)
        setDay3((response.data.list[9].main.temp - 273.15) * 1.8 + 32)
        setDay4((response.data.list[12].main.temp - 273.15) * 1.8 + 32)
        
        // Kelvin to Celsius
        // setTemperature(response.data.main.temp - 273.15);
        // console.log(response.data);
        // setDesc(response.data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCordData = (city) => {
    axios({
      method: "GET",
      url: `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=a7b15ee87d1648a595dda2ac14937a2e`,
    })
      .then((response) => {
        console.log(response)
        setLat(response.data.results[0].geometry.lat);
        setLong(response.data.results[0].geometry.lng);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getHourlyData = (day) => {
    axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=83435ee9f975acd42bc3d111c0de5b18`,
    })
      .then((response) => {
        console.log(response)
        setHour1(response.data.list[parseInt(day)].main.temp);
        setHour2(response.data.list[parseInt(day)+1].main.temp );
        setHour3(response.data.list[parseInt(day)+2].main.temp)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70px",
          width: "100%",
          backgroundColor: "#226ba3",
          fontSize: "30px",
          color: "#fff",
        }}
      >
        Weather APP
      </div>
      {/* <div
        style={{ height: "5px", width: "100%", backgroundColor: "blue" }}
      ></div> */}
      <br />
      <div style={{ marginLeft: "33%" }}>
        <div
          style={{

            backgroundColor: "#94e5ff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
          }}
        >
          {new Date().toLocaleString()}
          <br />
          {city} Weather
          <br />
          <h1>Daily Data</h1>
          {/* {Math.round(temperature * 100) / 100} ℉ */}
          <div onClick={() => {
              getHourlyData(0)
          }}><span>Day 1</span> - {Math.round(temperature * 100) / 100} ℃</div>
          <div onClick={() => {
              getHourlyData(1)
          }}>Day 2 - {Math.round(day1 * 100) / 100} ℃</div>
          <div onClick={() => {
              getHourlyData(2)
          }}>Day 3 - {Math.round(day2 * 100) / 100} ℃</div>
          <div onClick={() => {
              getHourlyData(3)
          }}>Day 4 - {Math.round(day3 * 100) / 100} ℃</div>
          <div onClick={() => {
              getHourlyData(4)
          }}>Day 5 - {Math.round(day4 * 100) / 100} ℃</div>
        </div>
        <h2>Hourly Data</h2>
        <p>{hour1}</p>
        <p>{hour2}</p>
        <p>{hour3}</p>
        <br />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          onClick={() => {
            getWeatherData(city, country);
            getCordData(city);
          }}
        >
          GET
        </button>
      </div>
    </>
  );
};

render(<WeatherApp />, document.querySelector("#root"));