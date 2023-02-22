import React, { useEffect, useState } from 'react'
import './style.css'

function msToTime(s) {
    let d = new Date(s*1000);
    let st = "AM";
    let hr = d.getHours() > 11 ? d.getHours()-12:d.getHours();
    if(d.getHours() > 11) st = "PM"; 
    return `${hr}:${d.getMinutes()}:${d.getSeconds()} ${st}`;
}

const kdfun = (e) => {
    // console.log(e);
    if(e.key === "Enter"){
        const btn = document.querySelector(".searchButton");
        // console.log(btn);
        btn.click();
    }
}

const Weather = () => {

    const [searchValue, setSearchValue] = useState("Jalandhar");
    const [tempInfo, setTempInfo] = useState("");
    const [weatherState, setWeatherState] = useState("");
    const getWeather = async (tempData) => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=38c4f37bd41e8229065ae843ef801097`;
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            const {temp, humidity, pressure} = data.main;
            const {main:weatherMood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;
            const weatherDetails = {
                temp,
                humidity,
                pressure,
                name,
                speed,
                country,
                sunset,
                weatherMood
            }
            console.log(weatherDetails);
            setTempInfo(weatherDetails);
            setWeatherState(weatherMood);
            setSearchValue("");
            switch(weatherMood) {
                case "Clouds" : setWeatherState("wi-day-cloudy");
                break;
                case "Haze" : setWeatherState("wi-fog");
                break;
                case "Clear" : setWeatherState("wi-day-sunny");
                break;
                case "Mist" : setWeatherState("wi-dust");
                break;
                default: setWeatherState("wi-day-sunny");
            }
        }
        catch(err){
            // alert("Enter correct city name");
            console.log(err);
        }
    };

    useEffect(()=>{
        getWeather("Jalandhar");
    },[]);

    useEffect(()=>{
        if(tempInfo.weatherMood){
            switch(tempInfo.weatherMood) {
                case "Clouds" : setWeatherState("wi-day-cloudy");
                break;
                case "Haze" : setWeatherState("wi-fog");
                break;
                case "Clear" : setWeatherState("wi-day-sunny");
                break;
                case "Mist" : setWeatherState("wi-dust");
                break;
                default: setWeatherState("wi-day-sunny");
            }
        }
    },[tempInfo.weatherMood])


  return (
    <>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder='search...' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(event) => setSearchValue(event.target.value)} onKeyDown={kdfun} />
            <button className='searchButton' type='button' onClick={()=>getWeather(searchValue)}>Search</button>
            </div>
        </div>
        <article className='widget'>
            <div className="weatherIcon">
                <i className={weatherState}></i>
            </div>
            <div className="weatherInfo">
                <div className="temperature">
                    <span>{tempInfo.temp}&deg;</span>
                </div>
                <div className="description">
                    <div className="weatherCondition">{tempInfo.weatherMood}</div>
                    <div className='place'>{tempInfo.name}, {tempInfo.country}</div>
                </div>
            </div>
            <div className="date">{new Date().toLocaleString()}</div>
            {/* Our 4 column section */}
            <div className="extra-temp">
                <div className="temp-info-minmax">
                    <div className="two-sided-section">
                        <p>
                            <i className="wi wi-sunset"></i>
                        </p>
                        <p className="extra-info-leftside">
                            {msToTime(tempInfo.sunset)} <br />
                            Sunset
                        </p>
                    </div>
                    <div className="two-sided-section">
                        <p>
                            <i className="wi wi-humidity"></i>
                        </p>
                        <p className="extra-info-leftside">
                            {tempInfo.humidity} <br />
                            Humidity
                        </p>
                    </div>
                    <div className="two-sided-section">
                        <p>
                            <i className="wi wi-rain"></i>
                        </p>
                        <p className="extra-info-leftside">
                            {tempInfo.pressure} <br />
                            Pressure
                        </p>
                    </div>
                    <div className="two-sided-section">
                        <p>
                            <i className="wi wi-strong-wind"></i>
                        </p>
                        <p className="extra-info-leftside">
                            {tempInfo.speed} <br />
                            Speed
                        </p>
                    </div>
                </div>
            </div>
        </article>
    </>
  )
}

export default Weather