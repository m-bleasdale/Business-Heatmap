'use client';

import {React, useEffect, useState} from 'react';

import dynamic from 'next/dynamic';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HeatmapLayer = dynamic(() => import('./HeatmapLayer'), { ssr: false });


export default function HeatMap({settings}) {
    const [businessData, setBusinessData] = useState([]);

    useEffect(() => {
        getData().then(setBusinessData);
    }, []);

    async function getData() {
        try {
            let params = "";
            if(settings.type !== "All") params = `?placeType=${settings.type}`;
            
            console.log(`/api/getData/${settings.region}${params}`);
            const response = await fetch(`/api/getData/${settings.region}${params}`);

            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();

            return json.data;

        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <MapContainer center={settings.center} zoom={13} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <HeatmapLayer points={businessData} mode={settings.mode}/>
        </MapContainer>
    )
}
