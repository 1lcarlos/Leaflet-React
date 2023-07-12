import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import Formulario from "./Formulario";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

function Map() {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showUserMarker, setShowUserMarker] = useState(true);

  const [editingMode, setEditingMode] = useState(false);
  const [markers, setMarkers] = useState([]);

  /* const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLng, setSelectedLng] = useState(null); */

  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if (userLocation) {
      mapRef.current.setView(userLocation, 20);
    }
  }, [userLocation]);

  const handleLocationFound = (e) => {
    setUserLocation(e.latlng);
    setShowUserMarker(false);
  };
  const handleLocationError = (e) => {
    if (e.code === 3) {
      console.error(
        "La geolocalización tardó demasiado tiempo en responder. Inténtalo nuevamente."
      );
    } else {
      console.error(e.message);
    }
  };
  const MapEvents = () => {
    useMapEvents({
      locationfound: handleLocationFound,
      locationerror: handleLocationError,
      locationwatcherror: handleLocationError,
    });

    return null;
  };

  const locateUser = () => {
    if (mapRef.current) {
      mapRef.current.locate({
        enableHighAccuracy: true, // Habilita la máxima precisión posible
        /*  watch: true, */ // Realiza un seguimiento continuo de la ubicación
        timeout: 10000, // Aumenta el tiempo de espera a 10 segundos (10000 ms)
      });
      setEditingMode(false);
    }
  };

  const handleMapClick = (e) => {
    if (editingMode) {
      const { lat, lng } = e.latlng;
      const newMarker = { lat, lng };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

      /* setSelectedLat(lat);
      setSelectedLng(lng); */

      setSelectedLocation({ lat, lng });
    }
  };

  const MapClickEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  const toggleEditingMode = () => {
    setEditingMode(!editingMode);
    console.log("Marcadores dibujados:", markers);
  };

  /* const handleFinishEditing = () => {
    console.log("Marcadores dibujados:", markers);
  }; */

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          {/* <!-- Contenido del formulario --> */}
          <Formulario
            latitud={selectedLocation.lat}
            longitud={selectedLocation.lng}
          />
        </div>
        <div className="col-span-3">
          
          {/* <!-- Contenido del mapa --> */}
          <div>
            <button
              className=" py-2 px-2 m-3 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
              onClick={toggleEditingMode}
            >
              {editingMode ? "Finalizar edición" : "Iniciar edición"}
            </button>
            {editingMode && <p>Haz clic en el mapa para añadir marcadores</p>}
            <button
              className=" py-2 px-2 m-3 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
              onClick={locateUser}
            >
              Obtener ubicación
            </button>
            <MapContainer
              center={[5, -74]}
              zoom={5}
              style={{ height: "500px", width: "100%" }}
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapEvents />
              {showUserMarker && userLocation && (
                <Marker position={userLocation} />
              )}
              {markers.map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lng]} />
              ))}
              <MapClickEvents />
            </MapContainer>
            {/* {editingMode && (
          <button onClick={handleFinishEditing}>Finalizar edición</button>
        )} */}
            {/* <form action="">
          <div>
            <label>Latitud: </label>
            <input type="text" value={selectedLat || ""} readOnly />
          </div>
          <div>
            <label>Longitud: </label>
            <input type="text" value={selectedLng || ""} readOnly />
          </div>
        </form> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Map;
