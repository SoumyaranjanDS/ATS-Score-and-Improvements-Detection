import React, { useState } from "react";
import api from "../../utils/api";

const Hero = () => {
  const [file, setFile] = useState();

  const fileUpload = async (e) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/upload", formData);

    console.log(response.data);
  };

  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center justify-center gap-8 sm:gap-12 p-6 sm:p-12 md:p-16">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center text-zinc-800">
        Analyze Your ATS Score
      </h1>
      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        type="file"
        className="w-full max-w-lg h-48 sm:h-64 p-6 sm:p-8 bg-slate-50 border-2 border-dashed rounded-2xl border-blue-500/40 text-slate-300 text-sm sm:text-base file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer cursor-pointer"
      />
      <button
        onClick={fileUpload}
        className="w-full sm:w-auto px-10 py-3.5 sm:py-4 bg-blue-600 text-white font-semibold text-lg sm:text-xl rounded-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer border-0"
      >
        Analyze
      </button>
    </div>
  );
};

export default Hero;
