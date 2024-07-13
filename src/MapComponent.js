import React, { useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from 'react-simple-maps';

import worldMap from './world-110m.json';
import countryNames from './countryNames';

const MapComponent = ({ data }) => {
    const [tooltipContent, setTooltipContent] = useState('');
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleCountryClick = (countryId) => {
        const country = countryNames[countryId];
        const countryData = data.find((item) => item.country === country);
        setTooltipContent(`${country}: ${countryData ? countryData.headCount : 'No data'}`);
    };

    const handleZoomIn = () => {
        setZoom(zoom * 2); // Double the current zoom level
    };

    const handleZoomOut = () => {
        setZoom(zoom / 2); // Halve the current zoom level
    };

    const getColor = (country) => {
        const countryData = data.find((item) => item.country === country);
        return countryData ? countryData.color : '#ECEFF1'; // Default color if no data found
    };

    const handleMouseEnter = (event, countryId) => {
        const country = countryNames[countryId];
        const countryData = data.find((item) => item.country === country);
        if (countryData) {
            const { clientX, clientY } = event;
            setHoveredCountry(country);
            setTooltipContent(`${country}: ${countryData.headCount}`);
            setTooltipPosition({ x: clientX, y: clientY });
        }
    };

    const handleMouseLeave = () => {
        setHoveredCountry(null);
        setTooltipContent('');
    };

    return (
        <div style={{ position: 'relative' }}>
            <button onClick={handleZoomIn}>Zoom In</button>
            <button onClick={handleZoomOut}>Zoom Out</button>
            <ComposableMap
                projectionConfig={{
                    scale: 160,
                }}
                data-tip=""
            >
                <ZoomableGroup zoom={zoom}>
                    <Geographies geography={worldMap}>
                        {({ geographies }) =>
                            geographies.map((geo) => {

                                const countryId = geo.id;
                                const country = countryNames[countryId];
                                const fillColor = getColor(country);

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => handleCountryClick(countryId)}
                                        onMouseEnter={(event) => handleMouseEnter(event, countryId)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            default: {
                                                fill: fillColor,
                                                outline: 'none',
                                            },
                                            hover: {
                                                fill: '#FF7043',
                                                outline: 'none',
                                            },
                                            pressed: {
                                                fill: '#FF5722',
                                                outline: 'none',
                                            },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            {hoveredCountry && tooltipContent && (
                <div
                    style={{
                        position: 'absolute',
                        top: tooltipPosition.y - 70,
                        left: tooltipPosition.x - 55,
                        zIndex: 999,
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: 0,
                            height: 0,
                            borderLeft: '15px solid transparent',
                            borderRight: '15px solid transparent',
                            borderBottom: '20px solid rgba(0, 0, 0, 0.8)',
                            transform: 'translateX(-50%)',
                            marginLeft: '50%',
                            zIndex: 1000,
                        }}
                    />
                    <div
                        style={{
                            position: 'relative',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: '#fff',
                            padding: '8px',
                            borderRadius: '4px',
                            zIndex: 1000,
                            pointerEvents: 'none',
                        }}
                    >
                        {tooltipContent}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
