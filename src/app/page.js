'use client';

import { React, useState } from 'react';

import dynamic from 'next/dynamic';

import Settings from '@/components/Settings/Settings';

const HeatMap = dynamic(() => import('../components/Heatmap/Heatmap'), { ssr: false });

export default function Home() {
  const [renderMap, setRenderMap] = useState(false);
  const [settings, setSettings] = useState({});

  return (
    <div className="w-full h-full min-h-screen">
      {!renderMap && <Settings onConfirm={(region, center, mode, type) => {
        setSettings({region: region, center: center, mode: mode, type: type})
        setRenderMap(true);
      }}/>}
      {renderMap && <HeatMap settings={settings} />}
    </div>
  );
}
