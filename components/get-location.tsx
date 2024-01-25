"use client";

import { useGeolocated } from "react-geolocated";
import axios from "axios";
import { useState } from "react";
export default function GetLocation() {
    const [weather, setWeather] = useState({});

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    if (coords) {
        const lat = coords.latitude;
        const long = coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
        axios.get(url).then((response) => {
            console.log(response.data);
            setWeather(response.data);
        })
    }
    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <table>
            <tbody>
                <tr>
                    <td>latitude</td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{coords.longitude}</td>
                </tr>
            </tbody>
        </table>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
};
