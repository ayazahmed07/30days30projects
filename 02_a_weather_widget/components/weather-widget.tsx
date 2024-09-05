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


    function gettemperaturemessage(temperature: number, unit: string) {
        if (unit === "C") {
            if (temperature < 0) {
                return `It's freezing at ${temperature} °C! Bundle up!`;
            }
            else if (temperature < 10) {
                return `It's quite cold at ${temperature}°C. Wear a warm Jacket.`;
            } else if (temperature < 20) {
                return `The temperature is ${temperature}°C. Comfortable for a light clothes.`;
            } else if (temperature < 30) {
                return `It's a pleasant ${temperature}°C. Enjoy the awsome weather!`;
            } else {
                return `It's hot at ${temperature}°C. Stay hydrated!`;
            }
        } else {
            // Placeholder for other temperature units (e.g., Fahrenheit)
            return `${temperature}°${unit}`;

        }
    }

    function getWeatherMessage(description: string): string {
        switch (description.toLowerCase()) {
            case "sunny":
                return "It's a beautiful sunny day!";
            case "partly cloudy":
                return "Expect some clouds and sunshine.";
            case "cloudy":
                return "It's cloudy today.";
            case "overcast":
                return "The sky is overcast.";
            case "rain":
                return "Don't forget your umbrella! It's raining.";
            case "thunderstorm":
                return "Thunderstorms are expected today.";
            case "snow":
                return "Bundle up! It's snowing.";
            case "mist":
                return "It's misty outside.";
            case "fog":
                return "Be careful, there's fog outside.";
            default:
                return description; // Default to returning the description as-is
        }
    }

    function getLocationMessage(location: string): string {
        const currentHour = new Date().getHours();
        const isNight = currentHour >= 18 || currentHour < 6; // Determine if it's night time

        return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
    }

    return (

        
        <div className="flex justify-center items-center h-screen bg-light-gray-500">
           <div className="text-center mb-8 absolute top-6 left-0 right-0">
               <h1 className="mt-2 text-lg text-black"><b> A Weather Widget App Developed by Ayaz Ahmed 
                </b>
               </h1>
    </div>

            <Card className="w-[550px] h-[450px] mx-auto text-center p-12 bg-gray-200">
                <CardHeader>
                        <CardTitle className="text-black items-center">Weather App</CardTitle>
                    <CardDescription className="text-black items-center">
                        <b> Search for the current weather in your city. </b>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlesearch} className="w-160 items-center gap-3">
                    <div className="flex flex-col space-y-2"> 
                        <Input
                            type="text"
                            placeholder="Enter a city name"
                            value={location}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                            className="flex-1"                     
                        />
                        <Button type="submit" 
                         className={`bg-blue-500 hover:bg-gray-600 text-white font-bold rounded ${
                            isLoading ? "opacity-100 cursor-not-allowed" : ""
                        } w-auto py-2 px-4 text-sm`}
                        disabled={isLoading}>
                            {isLoading ? "Searching..." : "Get Weather"}
                        </Button> </div>
                    </form>
                    {error && <div className="mt-4 text-red-500">{error}</div>}
                    {weather && (
                        <div className="mt-4 grid gap-2">
                            <div className="flex items-center gap-2">
                                <ThermometerIcon className="w-6 h-6" />
                                {gettemperaturemessage(weather.temperature, weather.unit)}
                            </div>
                            <div className="flex items-center gap-2">
                                <CloudIcon className="w-6 h-6 " />
                                <div>{getWeatherMessage(weather.description)}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-6 h-6 " />
                                <div>{getLocationMessage(weather.location)}</div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

    );
}

