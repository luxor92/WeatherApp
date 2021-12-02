import React from "react";

const Weather = (props) => {
        return (
            // Важно, чтобы JSX-элемент был обернут <div> и объект если значение города true тоже
            <div>
                {props.city &&
                    <div className="weathertoday">
                    <div>Местоположение: {props.city}</div>
                    <div>Температура: {props.temperature}</div>
                    <div>Восход солнца: {props.sunrise}</div>
                    <div>Закат солнца: {props.sunset}</div>
                    </div>
                }
                <div className="emptyresponse"> {props.error} </div>
            </div>
        )
}

export default Weather