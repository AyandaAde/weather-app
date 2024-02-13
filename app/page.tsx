"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart } from "@tremor/react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ArrowBottomLeftIcon, ArrowBottomRightIcon, ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowTopLeftIcon, ArrowTopRightIcon, ArrowUpIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import OverviewComponent from "@/components/OverviewComponent";
import { useTheme } from "next-themes"
import { generateImage } from "@/lib/openai";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { getWeatherData, getForecastData } from "./features/weather/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const FormSchema = z.object({
  city: z
    .string(),
  units: z.string(),
});

export default function Home() {
  const { setTheme } = useTheme()
  const dispatch = useDispatch();

  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const [imageURL, setImageURL] = useState("");
  const [enabled, setEnabled] = useState(false);
  const { weather, forecastData, loading } = useSelector((state: any) => state.weather);
  let weatherData = useRef({
    city,
    units,
  });
  const date = new Date();
  let day = date.getDay().toString();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: weatherData.current.city,
      units: weatherData.current.units,
    }
  });

  async function getImageUrl() {
    const time = weather?.weather[0].icon.split("").slice(2);
    const conditions = weather?.weather[0].description;
    const location = weatherData.current.city;
    const imageURL = await generateImage(time, conditions, location);
    setImageURL(imageURL);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {

    if (data.units !== weatherData.current.units && data.city !== "") {
      setUnits(data.units);
      weatherData.current = {
        city: data.city,
        units: data.units,
      }
    } else if (data.units !== weatherData.current.units && data.city === "") {
      setUnits(data.units);
      weatherData.current = {
        city: weatherData.current.city,
        units: data.units,
      }
    } else if (data.units === weatherData.current.units && data.city !== "") {
      weatherData.current = {
        city: data.city,
        units: weatherData.current.units,
      }
    }
    //  else {
    //   toast("Please enter a city name or select units.")
    // };
    setEnabled(false);
    console.log(weatherData.current);
    dispatch(getWeatherData(weatherData.current));
    dispatch(getForecastData(weatherData.current));
    getImageUrl();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const resp = await axios(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      const currentLocation = resp.data;
      setUnits("metric");
      weatherData.current = {
        city: currentLocation.address.city,
        units,
      };
      console.log(weatherData.current);
      console.log(currentLocation);
      dispatch(getWeatherData(weatherData.current));
      dispatch(getForecastData(weatherData.current));
    })

    getImageUrl();

  }, []);

  // async function getWeather() {
  //   dispatch(getWeatherData(weatherData));
  //   dispatch(getForecastData(weatherData));
  //   getImageUrl();

  // }

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
  };

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

  if (loading === true || weather.weather[0].main === null || forecastData.message === null || imageURL === "") {
    return (
      <LoadingSkeleton />
    )
  }
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <h1 className="text-center font-semibold text-3xl mt-[10px]">Nimbus Navigator</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[5px] mb-[10px] space-y-1">
          <Label htmlFor="city name">Type in a city name.</Label>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <Input
                  type="text"
                  name="city"
                  placeholder={weather.name}
                  className="w-[300px]"
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />
          <div className="flex flex-row space-x-2 items-center mt-[10px]">
            <FormField
              control={form.control}
              name="units"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Units" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="standard">standard</SelectItem>
                      <SelectItem value="metric">metric</SelectItem>
                      <SelectItem value="imperial">imperial</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
            >Search</Button>
            <div>
              <Button
                onClick={() => setTheme("dark")}
                variant="outline"
                size="icon"
                className="block dark:hidden"
              >
                <SunIcon
                  className="h-[1.2rem] w-[1.2rem] m-auto"
                />
              </Button>
              <Button
                onClick={() => setTheme("light")}
                variant="outline"
                size="icon"
                className="relative top-0 hidden dark:block"
              >
                <MoonIcon
                  className="h-[1.2rem] w-[1.2rem] m-auto"
                />
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="w-screen h-content relative overflow-x-hidden pb-5">
        {imageURL === "" ?
          <Skeleton className="w-full h-52 md:h-full" /> :
          <Image
            src={imageURL}
            alt={`weather depiction`}
            width={1024}
            height={1024}
            className="absolute w-full h-[200px] md:h-full -z-10 object-cover"
          />
        }
        <div className="flex justify-between w-full md:w-10/12 mx-auto">
          <div className="flex flex-row justify-between items-end md:items-start mt-[30px] px-3 pb-14 md:p-7 rounded-md w-full md:w-[380px] lg:w-[410px] h-[150px] md:h-[260px] backdrop-blur-sm">
            <div>
              <h2 className="font-medium md:font-semibold text-md md:text-5xl mb-[0] md:mb-[20px]">Now</h2>
              <div className="flex flex-row mb-[0] md:mb-[20px]">
                <h3 className="font-semibold text-3xl mr-[0] md:mr-[20px]">
                  {
                    weather.main.temp
                  }{
                    units === "standard" ?
                      " K"
                      : units === "metric" ?
                        "°C"
                        : units === "imperial" &&
                        "°F"
                  }
                </h3>
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={`icon depicting the current weather conditions in ${weather.name}`}
                  width={1024}
                  height={1024}
                  className="h-[36px] w-[36px] md:h-[75px] md:w-[75px]"
                />
              </div>
              <h3 className="text-sm">
                Feels like temp {
                  weather.main.feels_like}{
                  units === "standard" ?
                    " K"
                    : units === "metric" ?
                      "°C"
                      : units === "imperial" &&
                      "°F"
                }</h3>
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
              }{
                  units === "standard" || units === "metric" ?
                    " m/s"
                    : units === "imperial" &&
                    " m/h"
                }</p>
            </div>
          </div>
          <div className="hidden md:block mt-[30px] p-7 backdrop-blur-sm rounded-md text-right space-y-2">
            <h2 className="text-3xl md:text-5xl font-semibold">Weather</h2>
            <h3 className="text-lg md:text-xl">{day + " " + hours + ":"}{
              minutes < 10 ? (
                "0" + minutes
              )
                : minutes
            }</h3>
            <h3 className="text-lg md:text-xl">{
              weather.weather[0].description}</h3>
          </div>
        </div>
        <Tabs defaultValue="overview" className="w-full md:w-10/12 mx-auto bg-transparent backdrop-blur-sm mt-5">
          <TabsList className="mt-[10px] mb-[20px] md:mb-[0] text-white dark:text-black bg-black dark:bg-white h-fit pb-1 backdrop-blur-sm w-full grid grid-cols-3 sm:grid-cols-4">
            <TabsTrigger value="overview" className="text-sm md:text-lg">Overview</TabsTrigger>
            <TabsTrigger value="temperature" className="text-sm md:text-lg">Temperature</TabsTrigger>
            <TabsTrigger value="humidity" className="text-sm md:text-lg">Humidity</TabsTrigger>
            <TabsTrigger value="wind" className="text-sm md:text-lg">Wind</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-black">
            <OverviewComponent units={units} data={forecastData} />
          </TabsContent>
          <TabsContent value="temperature">
            <Card className="mx-auto w-[97%] md:w-full">
              <AreaChart
                className="h-72 mt-4"
                data={temperature}
                index="time"
                categories={["temperature"]}
                colors={["purple"]}
                yAxisWidth={30}
              />
            </Card>
            <OverviewComponent units={units} data={forecastData} />
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
                            <h3>{item.wind.speed}{
                              units === "standard" || units === "metric" ?
                                " m/s"
                                : units === "imperial" &&
                                " m/h"
                            }</h3>
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
            <OverviewComponent units={units} data={forecastData} />
          </TabsContent>
          <TabsContent value="humidity">
            <Card className="mx-auto w-[97%] md:w-full">
              <AreaChart
                className="h-72 mt-4"
                data={humidity}
                index="time"
                categories={["percentage"]}
                colors={["purple"]}
                yAxisWidth={30}
              />
            </Card>
            <OverviewComponent units={units} data={forecastData} />
          </TabsContent>
        </Tabs>
      </div >
      <footer>Made by Ayanda Kinyambo © {new Date().getFullYear()}</footer>
    </div >
  )
}
