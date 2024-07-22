import React, { useEffect, useRef, useContext } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import Navbar from './Navbar';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePage.css';

const HomePage = () => {
    const mapRef = useRef(null);
    const mapInitializedRef = useRef(false);
    const mapInstanceRef = useRef(null);
    const routingControlRef = useRef(null);
    const navigate = useNavigate();
    const { points, currentPointIndex, setCurrentPointIndex, isFirstPointSubmitted, setIsFirstPointSubmitted } = useContext(AppContext);

    useEffect(() => {
        if (!mapInitializedRef.current) {
            initializeMap();
            mapInitializedRef.current = true;
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInitializedRef.current = false;
            }
        };
    }, []);

    useEffect(() => {
        if (mapInstanceRef.current && points.length > 0) {
            updateMapMarkers();

            if (isFirstPointSubmitted) {
                const nextClosestPointIndex = calculateNextClosestPoint(currentPointIndex);
                if (routingControlRef.current) {
                    routingControlRef.current.getPlan().setWaypoints([]);
                    mapInstanceRef.current.removeControl(routingControlRef.current);
                    routingControlRef.current = null;
                }
                routeToNextPoint(points[currentPointIndex], points[nextClosestPointIndex]);
                setCurrentPointIndex(nextClosestPointIndex);
                setIsFirstPointSubmitted(false);
            }
        }
    }, [currentPointIndex, isFirstPointSubmitted]);

    const initializeMap = () => {
        const initialPoint = points[0];
        const map = L.map(mapRef.current).setView([initialPoint.latitude, initialPoint.longitude], 15);
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        updateMapMarkers();
    };

    const updateMapMarkers = () => {
        if (!mapInstanceRef.current) return;

        mapInstanceRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapInstanceRef.current.removeLayer(layer);
            }
        });

        points.forEach((point, index) => {
            const marker = L.marker([point.latitude, point.longitude], {
                draggable: false,
                opacity: 1,
            }).addTo(mapInstanceRef.current);

            if (index === currentPointIndex) {
                marker.bindPopup(`<b>${point.name}</b><br>Click to fill data`).on('click', () => handleMarkerClick(index));
            } else {
                marker.bindPopup(`<b>${point.name}</b>`); // Show point name only for non-current points
            }
        });
    };

    const handleMarkerClick = (index) => {
        if (index === currentPointIndex) {
            navigate('/form');
        }
    };

    const routeToNextPoint = (startLocation, endLocation) => {
        if (!mapInstanceRef.current) return;

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(startLocation.latitude, startLocation.longitude),
                L.latLng(endLocation.latitude, endLocation.longitude)
            ],
            routeWhileDragging: true,
            createMarker: () => null,
        }).addTo(mapInstanceRef.current);
    };

    const calculateNextClosestPoint = (currentIndex) => {
        const currentPoint = points[currentIndex];
        let closestPointIndex = -1;
        let closestDistance = Infinity;

        points.forEach((point, index) => {
            if (index !== currentIndex) {
                const distance = Math.sqrt(
                    Math.pow(point.latitude - currentPoint.latitude, 2) + Math.pow(point.longitude - currentPoint.longitude, 2)
                );

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestPointIndex = index;
                }
            }
        });

        return closestPointIndex;
    };

    return (
        <div className="home-page">
            <Navbar />
            <div className="map-container" ref={mapRef}></div>
        </div>
    );
};

export default HomePage;
