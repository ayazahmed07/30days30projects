"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";

interface WeatherData {
    temperature: number;
    description: string;
    location: string;
    unit: string;

}

export default function WeatherWidget() {

    const [location, setLocation] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(false);

    const handlesearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedlocation = location.trim();
        if (trimmedlocation === "") {
            setError("Please enter a valid location.");
            setWeather(null);
            return;
        }

        setIsloading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedlocation}`)
            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            const weatherData: WeatherData = {
                temperature: data.current.temp_c,
                description: data.current.condition.text,
                location: data.location.name,
                unit: "C"

            };

            setWeather(weatherData);
        } catch (error) {
            console.error("Error in fetching data.", error);
            setError("City not found. Please try again.");
            setWeather(null);
        } finally {
            setIsloading(false);
        }



    };


function gettemperaturemessage (temperature: number, unit: string)  {
if (unit === "C") {
    if(temperature < 0) {
return `It's freezing at ${temperature} `
    }
}
}



}