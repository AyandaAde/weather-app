import Image from 'next/image'


const WeatherIcon = ({ data }: any) => {
    return (
        <Image
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={`icon depicting the weather conditions of (city name goes here)`}
            width={1024}
            height={1024}
            className="h-[36px] w-[36px] md:h-[75px] md:w-[75px]"
        />
    )
}

export default WeatherIcon