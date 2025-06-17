'use client';

import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.heat';

export default function HeatmapLayer({ points, mode }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !points?.length) return;

        //const heatData = points.map(({ lat, lng, score }) => [lat, lng, score / 5]);
        const heatData = points.map(({ lat, lng }) => [lat, lng]);

        let heatLayer;
        if(mode === "heatmap")
        {
            heatLayer = L.heatLayer(heatData, {
                radius: 25,
                blur: 15,
                maxZoom: 17,
            });
        }
        else if(mode === "points")
        {
            heatLayer = L.heatLayer(heatData, {
                radius: 10,
                blur: 1,
                maxZoom: 5,
            });
        }        

        heatLayer.addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, points]);

    return null;
}
