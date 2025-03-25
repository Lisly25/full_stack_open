const Weather = (props) => {

    const title = `Weather in ${props.country.capital}`
    const url_to_weather_data = `https://wttr.in/${props.country.capital}_0tqp_lang=en.png`

    return (
        <div>
            <h2>{title}</h2>
            <img src={url_to_weather_data}/>
        </div>
    )
}

export default Weather