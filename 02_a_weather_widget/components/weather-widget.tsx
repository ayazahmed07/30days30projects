"use client";
import { useState, ChangeEvent, FormEvent } from "react"; 
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";

const [location, setLocation] = useState<string>("")
