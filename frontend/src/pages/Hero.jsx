import React, { useState } from "react";
import api from "../../utils/api";

const Hero = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const fileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError(true);
      setMessage("Please select a file first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError(false);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/upload", formData);
      console.log(response.data);

      setError(false);
      setMessage(response.data.message || "File uploaded successfully!");
    } catch (err) {
      console.error(err);
      setError(true);
      setMessage(
        err.response?.data?.message || "Error uploading file. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col items-center justify-center gap-8 sm:gap-12 p-6 sm:p-12 md:p-16">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center text-zinc-800">
        Analyze Your ATS Score
      </h1>
      <div className="w-full max-w-lg flex flex-col gap-4">
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
            setMessage("");
          }}
          type="file"
          className="w-full h-48 sm:h-64 p-6 sm:p-8 bg-slate-50 border-2 border-dashed rounded-2xl border-blue-500/40 text-slate-600 text-sm sm:text-base file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer cursor-pointer flex items-center justify-center"
        />
        {message && (
          <p
            className={`text-center font-medium text-sm sm:text-base ${
              error ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <button
        onClick={fileUpload}
        disabled={loading}
        className="w-full sm:w-auto px-10 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold text-lg sm:text-xl rounded-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer border-0 transition-all"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default Hero;

