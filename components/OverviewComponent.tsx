import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"


type Props = {
    data: any,
    units: string,
}

const OverviewComponent = ({ data, units }: Props) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {
                    data.list.slice(0, 16).map((item: any, index: number) => (
                        <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/6">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                        <h3>{index === 0 ? "Now" : item.dt_txt.split(" ").slice(1)}</h3>
                                        <Image
                                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                            alt={`icon depicting the weather conditions of (city name goes here)`}
                                            width={1024}
                                            height={1024}
                                            className="h-[36px] w-[36px] md:h-[75px] md:w-[75px]"
                                        />
                                        <p>{item.main.temp}{
                                            units === "standard" ?
                                                " K"
                                                : units === "metric" ?
                                                    "°C"
                                                    : units === "imperial" &&
                                                    "°F"
                                        }/{item.main.feels_like}{
                                                units === "standard" ?
                                                    " K"
                                                    : units === "metric" ?
                                                        "°C"
                                                        : units === "imperial" &&
                                                        "°F"
                                            }</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
            </CarouselContent>
            <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    )
}

export default OverviewComponent