import React from "react";
import Info from "./components/Info";
import Weather from "./components/Weather";
import Form from "./components/Form";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "ee55b6855ec750af3d410b4ca101cb67"

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }

    getWeather = async (e) => {
        // Сброс стандартного поведения, которая обновляет страницу
        e.preventDefault();
        // e.target обозначаем объект, в котором вызовется данная функция (форма)
        // .elements обозначает, что обращаемся к объекту, который имеет name=city
        const city = e.target.elements.city.value


        // Можно просто if (city)
        if (city) {
            // Создаем переменную, в которую передаем наш асинхронный запрос
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            // Упаковываем ответ от сервера в json-формат
            const data = await api_url.json();

            // Перевод sunset во временное значение
            let sunset = data.sys.sunset;
            let sunset_date = new Date(sunset * 1000);
            let sunset_hours = sunset_date.getHours();
            let sunset_minutes = "0" + sunset_date.getMinutes()
            let sunset_seconds = "0" + sunset_date.getSeconds()
            let sunsetTime = sunset_hours + ":" + sunset_minutes.substr(-2) + ":" + sunset_seconds.substr(-2)

            // Перевод sunrise во временное значение
            let sunrise = data.sys.sunrise;
            let sunrise_date = new Date(sunrise * 1000);
            let sunrise_hours = sunrise_date.getHours();
            let sunrise_minutes = "0" + sunrise_date.getMinutes()
            let sunrise_seconds = "0" + sunrise_date.getSeconds()
            let sunriseTime = sunrise_hours + ":" + sunrise_minutes.substr(-2) + ":" + sunrise_seconds.substr(-2)

            this.setState({
                // data в данном случае это JSON. Обращаемся к нужным свойствам через точку
                temperature: Math.round(Number(data.main.temp) - 273.15) + '°C',
                city: data.name,
                country: data.sys.country,
                sunrise: sunriseTime,
                sunset: sunsetTime,
                error: undefined
            })
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                error: "Введите название локации"
            });
        }
    }

    render() {
        return (
            <div className="wrapper body">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info/>
                            </div>
                            <div className="col-sm-7 form">
                                <Form weather={this.getWeather}/>
                                <Weather
                                    temperature={this.state.temperature}
                                    city={this.state.city}
                                    country={this.state.country}
                                    sunrise={this.state.sunrise}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;