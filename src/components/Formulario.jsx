import { useState } from "react";

function Formulario({ latitud, longitud }) {
  const [oferta, setOferta] = useState("");
  const [latitudForm, setLatitudForm] = useState("");
  const [longitudForm, setLongitudForm] = useState("");
  return (
    <>
      <h2 className=" font-black text-3xl text-center ">
        Administrador de Predios
      </h2>
      <p className=" text-xl mt-5 mb-10 text-center">
        Añade tus predios y{" "}
        <span className=" text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        action=""
        className=" bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
      >
        <div className=" mb-5">
          <label
            htmlFor="oferta"
            className=" text-gray-700 uppercase font-bold"
          >
            oferta*
          </label>
          <input
            id="oferta"
            type="number"
            placeholder="oferta"
            className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={oferta}
            onChange={(e) => setOferta(e.target.value)}
          />
        </div>
        <div className=" mb-5">
          <label
            htmlFor="latitud"
            className=" text-gray-700 uppercase font-bold"
          >
            latitud
          </label>
          <input
            id="latitud"
            type="number"
            step="0.0001"
            pattern="^\d+(.\d{1,4})?$"
            placeholder="latitud"
            className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={latitud || ""}
            onChange={(e) => setLatitudForm(e.target.value)}
          />
        </div>
        <div className=" mb-5">
          <label
            htmlFor="longitud"
            className=" text-gray-700 uppercase font-bold"
          >
            longitud
          </label>
          <input
            id="longitud"
            type="number"
            step="0.0001"
            pattern="^\d+(.\d{1,4})?$"
            placeholder="longitud"
            className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={longitud || ""}
            onChange={(e) => setLongitudForm(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default Formulario;
