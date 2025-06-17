'use client';

import {React, useState} from 'react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from "@/components/ui/select";
import { Button } from '@/components/ui/button'; 
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from "@/components/ui/label"

/*
FHRS Business Type
Retailers - other
Other catering premises
Restaurant/Cafe/Canteen
Retailers - supermarkets/hypermarkets
Pub/bar/nightclub
Hospitals/Childcare/Caring Premises
Mobile caterer
Takeaway/sandwich shop
School/college/university
Importers/Exporters
Distributors/Transporters
*/

export default function Settings ({onConfirm}) {
    const [region, setRegion] = useState('');
    const [center, setCenter] = useState([]);
    const [mode, setMode] = useState('heatmap');
    const [type, setType] = useState('All');

    function handleConfirm() {
        if(!region) return;
        onConfirm(region, center, mode, type);
    }

    function calculateCenter(region){
        const centers = {
            "Cardiff": [51.481583, -3.179090],
            "Swansea": [51.6214, -3.9436],
            "Bath": [51.3781, -2.3597],
            "KensingtonChelsea": [51.4953, -0.1790],
            "Westminster": [51.494720, -0.135278]
        }

        return centers[region];
    }

    return (
        <div className="h-screen flex flex-col gap-5 items-center justify-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl text-center font-semibold">Business Location Hotspot</h1>
                <p className="text-md text-center">Built by <a href="https://github.com/m-bleasdale" className="underline text-primary">M Bleasdale</a></p>
            </div>
            <div className="flex flex-col gap-2 w-[220px]">
                <label>Region</label>
                <Select onValueChange={(value) => {
                    setRegion(value);
                    setCenter(calculateCenter(value));
                }}>
                    <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>London</SelectLabel>
                            <SelectItem value="KensingtonChelsea">Kensington and Chelsea</SelectItem>
                            <SelectItem value="Westminster">Westminster</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>Wales</SelectLabel>
                            <SelectItem value="Cardiff">Cardiff</SelectItem>
                            <SelectItem value="Swansea">Swansea</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>South West England</SelectLabel>
                        <SelectItem value="Bath">Bath</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2 w-[220px]">
                <label>Mode</label>
                <RadioGroup defaultValue="heatmap" onValueChange={(value) => setMode(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="heatmap" id="heatmap" />
                        <Label htmlFor="heatmap">Heatmap (recommended)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="points" id="points" />
                        <Label htmlFor="points">Points</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="flex flex-col gap-2 w-[220px]">
                <label>FHRS Business Type</label>
                <Select defaultValue="All" onValueChange={(value) => setType(value)}>
                <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select a business type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All</SelectItem>

                    <SelectGroup>
                    <SelectLabel>Food & Hospitality</SelectLabel>
                    <SelectItem value="Restaurant%2FCafe%2FCanteen">Restaurant/Cafe/Canteen</SelectItem>
                    <SelectItem value="Takeaway%2Fsandwich%20shop">Takeaway/sandwich shop</SelectItem>
                    <SelectItem value="Mobile%20caterer">Mobile caterer</SelectItem>
                    <SelectItem value="Hotel%2Fbed%20%26%20breakfast%2Fguest%20house">Hotel/bed & breakfast/guest house</SelectItem>
                    <SelectItem value="Pub%2Fbar%2Fnightclub">Pub/bar/nightclub</SelectItem>
                    <SelectItem value="Other%20catering%20premises">Other catering premises</SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                    <SelectLabel>Commercial/Retail</SelectLabel>
                    <SelectItem value="Distributors%2FTransporters">Distributors/Transporters</SelectItem>
                    <SelectItem value="Importers%2FExporters">Importers/Exporters</SelectItem>
                    <SelectItem value="Retailers%20-%20other">Retailers - other</SelectItem>
                    <SelectItem value="Retailers%20-%20supermarkets%2Fhypermarkets">Retailers - supermarkets/hypermarkets</SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                    <SelectLabel>Production & Agriculture</SelectLabel>
                    <SelectItem value="Farmers%2Fgrowers">Farmers/growers</SelectItem>
                    <SelectItem value="Manufacturers%2Fpackers">Manufacturers/packers</SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                    <SelectLabel>Institutions & Care</SelectLabel>
                    <SelectItem value="Hospitals%2FChildcare%2FCaring%20Premises">Hospitals/Childcare/Caring Premises</SelectItem>
                    <SelectItem value="School%2Fcollege%2Funiversity">School/college/university</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>
            <Button variant="default" onClick={handleConfirm} className="w-[80px]">
                Go
            </Button>

        </div>
        
    )
}