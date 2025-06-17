import { NextResponse } from "next/server";

import fs from 'fs';
import { parseStringPromise } from 'xml2js';

export async function GET(req, { params }) {
    const { region } = await params;
    const url = new URL(req.url);
    const placeType = url.searchParams.get('placeType');
    
    try{
        const filePath = `./public/data/${region}.xml`;
        const xml = fs.readFileSync(filePath, 'utf-8');

        const data = await parseStringPromise(xml, {
            explicitArray: false,
            mergeAttrs: true,
            trim: true
        });

        const array = data.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail;

        let cleanedData;
        if(!placeType) {
            cleanedData = array
                .map(element => ({
                    name: element.BusinessName,
                    lat: element.Geocode?.Latitude,
                    lng: element.Geocode?.Longitude,
                    score: element.RatingValue
                }))
                .filter(element => 
                    element.name && 
                    !isNaN(element.score) &&
                    (element.lat && element.lng)
                );
        }
        else {
            cleanedData = array
                .map(element => ({
                    name: element.BusinessName,
                    lat: element.Geocode?.Latitude,
                    lng: element.Geocode?.Longitude,
                    score: element.RatingValue,
                    type: element.BusinessType
                }))
                .filter(element => 
                    element.name && 
                    !isNaN(element.score) &&
                    (element.lat && element.lng) &&
                    element.type === placeType
                );
        }

        return NextResponse.json({ data: cleanedData }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error parsing XML data", error_message: error }, { status: 500 });
    }


    return NextResponse.json({region: region});
}