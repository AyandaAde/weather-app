"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@tremor/react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowBottomLeftIcon, ArrowBottomRightIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowTopLeftIcon, ArrowTopRightIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import OverviewComponent from "@/components/OverviewComponent";
import { useTheme } from "next-themes"
import { generateImage } from "@/lib/openai";
import LoadingSkeleton from "@/components/LoadingSkeleton";



export default function Home() {
  const { setTheme } = useTheme()
  const [weather, setWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("Harare");
  const [imageURL, setImageURL] = useState("");

  async function getWeather(e: any) {
    e.preventDefault();
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`;
    axios.get(url).then((response) => {
      setWeather(response.data)
      console.log(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data)
      }
    })
    axios.get(forecastURL).then((response) => {
      setForecastData(response.data)
      console.log(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data)
      }
    })

    const time = weather?.weather[0].icon.split("").slice(2);
    const conditions = weather?.weather[0].description;
    const location = city;

    setImageURL(await generateImage(time, conditions, location));
    setLoading(false);
  }

  async function getInitialWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`;

    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data)
      console.log(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data)
      }
    })
    axios.get(forecastURL).then((response) => {
      setForecastData(response.data)
      console.log(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data)
      }
    })
    const time = weather?.weather[0].icon.split("").slice(2);
    const conditions = weather?.weather[0].description;
    const location = city;
    const image = await generateImage(time, conditions, location);
    setImageURL(image);
    setLoading(false);
  }

  useEffect(() => {
    getInitialWeather()
  }, []);

  const date = new Date();
  let day = date.getDay().toString();
  const time = date.getHours();

  if (day === "1") {
    day = "Monday";
  } else if (day === "2") {
    day = "Tuesday";
  } else if (day === "3") {
    day = "Wednesday";
  } else if (day === "4") {
    day = "Thursday";
  } else if (day === "5") {
    day = "Friday";
  } else if (day === "6") {
    day = "Saturday"
  } else {
    day = "Sunday"
  }
  const temperature = [
    {
      time: forecastData?.list[0].dt_txt.split(" ").slice(1),
      temperature: forecastData?.list[0].main.temp,
    },
    {
      time: forecastData?.list[1].dt_txt,
      temperature: forecastData?.list[1].main.temp,
    },
    {
      time: forecastData?.list[2].dt_txt,
      temperature: forecastData?.list[2].main.temp,
    },
    {
      time: forecastData?.list[3].dt_txt,
      temperature: forecastData?.list[3].main.temp,
    },
    {
      time: forecastData?.list[4].dt_txt,
      temperature: forecastData?.list[4].main.temp,
    },
    {
      time: forecastData?.list[5].dt_txt,
      temperature: forecastData?.list[5].main.temp,
    },
    {
      time: forecastData?.list[6].dt_txt,
      temperature: forecastData?.list[6].main.temp,
    },
    {
      time: forecastData?.list[7].dt_txt,
      temperature: forecastData?.list[7].main.temp,
    },
    {
      time: forecastData?.list[8].dt_txt,
      temperature: forecastData?.list[8].main.temp,
    },
    {
      time: forecastData?.list[9].dt_txt,
      temperature: forecastData?.list[9].main.temp,
    },
    {
      time: forecastData?.list[10].dt_txt,
      temperature: forecastData?.list[10].main.temp,
    },
    {
      time: forecastData?.list[11].dt_txt,
      temperature: forecastData?.list[11].main.temp,
    },
    {
      time: forecastData?.list[12].dt_txt,
      temperature: forecastData?.list[12].main.temp,
    },
    {
      time: forecastData?.list[13].dt_txt,
      temperature: forecastData?.list[13].main.temp,
    },
    {
      time: forecastData?.list[14].dt_txt,
      temperature: forecastData?.list[14].main.temp,
    },
    {
      time: forecastData?.list[15].dt_txt,
      temperature: forecastData?.list[15].main.temp,
    },
  ];
  const humidity = [
    {
      time: forecastData?.list[0].dt_txt.split(" ").slice(1),
      percentage: forecastData?.list[0].main.humidity,
    },
    {
      time: forecastData?.list[1].dt_txt,
      percentage: forecastData?.list[1].main.humidity,
    },
    {
      time: forecastData?.list[2].dt_txt,
      percentage: forecastData?.list[2].main.humidity,
    },
    {
      time: forecastData?.list[3].dt_txt,
      percentage: forecastData?.list[3].main.humidity,
    },
    {
      time: forecastData?.list[4].dt_txt,
      percentage: forecastData?.list[4].main.humidity,
    },
    {
      time: forecastData?.list[5].dt_txt,
      percentage: forecastData?.list[5].main.humidity,
    },
    {
      time: forecastData?.list[6].dt_txt,
      percentage: forecastData?.list[6].main.humidity,
    },
    {
      time: forecastData?.list[7].dt_txt,
      percentage: forecastData?.list[7].main.humidity,
    },
    {
      time: forecastData?.list[8].dt_txt,
      percentage: forecastData?.list[8].main.humidity,
    },
    {
      time: forecastData?.list[9].dt_txt,
      percentage: forecastData?.list[9].main.humidity,
    },
    {
      time: forecastData?.list[10].dt_txt,
      percentage: forecastData?.list[10].main.humidity,
    },
    {
      time: forecastData?.list[11].dt_txt,
      percentage: forecastData?.list[11].main.humidity,
    },
    {
      time: forecastData?.list[12].dt_txt,
      percentage: forecastData?.list[12].main.humidity,
    },
    {
      time: forecastData?.list[13].dt_txt,
      percentage: forecastData?.list[13].main.humidity,
    },
    {
      time: forecastData?.list[14].dt_txt,
      percentage: forecastData?.list[14].main.humidity,
    },
    {
      time: forecastData?.list[14].dt_txt,
      percentage: forecastData?.list[14].main.humidity,
    },
  ];

  if (loading === true || weather === null || forecastData === null || imageURL === null) {
    return (
      <LoadingSkeleton />
    )
  }
  if (weather.weather[0].icon.split("").slice(2) === "d") {
    setTheme("light")
  } else if (weather.weather[0].icon.split("").slice(2) === "n") {
    setTheme("dark")
  }
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <h1 className="text-center font-semibold text-3xl mt-[10px]">Nimbus Navigator</h1>
      <form onSubmit={getWeather} className="mt-[5px] mb-[10px]">
        <Label htmlFor="city name">Type in a city name.</Label>
        <Input
          type="text"
          name="city"
          placeholder={weather.name}
          className="w-[300px]"
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          type="submit"
          onClick={getWeather}
          variant="default"
          className="mt-[10px]"
        >Search</Button>
      </form>
      <div className="w-screen h-content relative overflow-x-hidden pb-5">
        <Image
          src={imageURL}
          alt={`weather description`}
          width={1024}
          height={1024}
          className="absolute w-full h-[200px] md:h-full -z-10 object-cover"
        />
        <div className="flex justify-between w-full md:w-10/12 mx-auto">
          <div className="flex flex-row justify-between items-end md:items-start mt-[30px] px-3 pb-14 md:p-7 rounded-md w-full md:w-[380px] lg:w-[410px] h-[150px] md:h-[260px] backdrop-blur-sm">
            <div>
              <h2 className="font-medium md:font-semibold text-md md:text-5xl mb-[0] md:mb-[20px]">Now</h2>
              <div className="flex flex-row mb-[0] md:mb-[20px]">
                <h3 className="font-semibold text-3xl mr-[0] md:mr-[20px]">
                  {
                    weather.main.temp
                  }°C
                </h3>
                <Image

                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={`icon depicting the weather conditions of (city name goes here)`}
                  width={1024}
                  height={1024}
                  className="h-[36px] w-[36px] md:h-[75px] md:w-[75px]"
                />
              </div>
              <h3 className="text-sm">
                Feels like temp {
                  weather.main.feels_like}°C</h3>
            </div>
            <Separator orientation="vertical" className="mx-[10px] hidden md:block" />
            <div className="text-xs md:text-base text-right">
              <h4 className="block md:hidden text-sm">
                {
                  weather.weather[0].description
                }</h4>
              <p>Humidity: {
                weather.main.humidity}%</p>
              <p>Wind: {
                weather.wind.speed
              } m/s</p>
            </div>
          </div>
          <div className="hidden md:block mt-[30px] p-7 backdrop-blur-sm rounded-md text-right space-y-2">
            <h2 className="text-3xl md:text-5xl font-semibold">Weather</h2>
            <h3 className="text-lg md:text-xl">{day + " " + time + ":00"}</h3>
            <h3 className="text-lg md:text-xl">{
              weather.weather[0].description}</h3>
          </div>
        </div>
        <Tabs defaultValue="overview" className="w-full md:w-10/12 mx-auto bg-transparent backdrop-blur-sm mt-5">
          <TabsList className="mb-[20px] md:mb-[0] bg-transparent backdrop-blur-sm w-full grid grid-cols-3 sm:grid-cols-4 text-neutral-200">
            <TabsTrigger value="overview" className="text-xs md:text-lg">Overview</TabsTrigger>
            <TabsTrigger value="temperature" className="text-xs md:text-lg">Temperature</TabsTrigger>
            <TabsTrigger value="humidity" className="text-xs md:text-lg">Humidity</TabsTrigger>
            <TabsTrigger value="wind" className="text-xs md:text-lg">Wind</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-black">
            <OverviewComponent data={forecastData} />
          </TabsContent>
          <TabsContent value="temperature">
            <Card className="mx-auto w-[97%] md:w-full">
              <LineChart
                className="h-56 md:h-72 mt-4"
                data={temperature}
                index="time"
                categories={["temperature"]}
                colors={["blue"]}
                yAxisWidth={30}
              />
            </Card>
            <OverviewComponent data={forecastData} />
          </TabsContent>
          <TabsContent value="wind">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {
                  forecastData.list.slice(0, 16).map((item: any, index: number) => (
                    <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/6">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex flex-col aspect-square items-center justify-center p-6 bg-transparent gap-y-3">
                            <h3>{item.wind.speed} m/s</h3>
                            {item.wind.deg === 360 || item.wind.deg <= 44 ? <ArrowUpIcon />
                              : item.wind.deg <= 89 ? <ArrowTopRightIcon />
                                : item.wind.deg <= 134 ? <ArrowRightIcon />
                                  : item.wind.deg <= 179 ? <ArrowBottomRightIcon />
                                    : item.wind.deg <= 224 ? <ArrowDownIcon />
                                      : item.wind.deg <= 269 ? <ArrowBottomLeftIcon />
                                        : item.wind.deg <= 314 ? <ArrowLeftIcon />
                                          : item.wind.deg <= 359 && <ArrowTopLeftIcon />
                            }
                            <h3>{index === 0 ? "Now" : item.dt_txt.split(" ").slice(1)}</h3>
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
            <OverviewComponent data={forecastData} />
          </TabsContent>
          <TabsContent value="humidity">
            <Card className="mx-auto w-[97%] md:w-full">
              <LineChart
                className="h-56 md:h-72 mt-4"
                data={humidity}
                index="time"
                categories={["percentage"]}
                colors={["blue"]}
                yAxisWidth={30}
              />
            </Card>
            <OverviewComponent data={forecastData} />
          </TabsContent>
        </Tabs>
      </div >
      <footer>Made by Ayanda Kinyambo © {new Date().getFullYear()}</footer>
    </div >
  )
}
