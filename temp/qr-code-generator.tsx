import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

import { FiDownload, FiCopy, FiCheck, FiX } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";

export default function QrDetailPage() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");

    link.href = pngUrl;
    link.download = "NodeQR.png";
    link.click();
  };

  //handle this to allow copying and sharing the qr code
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy Failed ", error);
    }
  };

  const handleClear = () => {
    setInputText("");
  };
  // const handleShare = () => {
  //use this to handle sharing of the qr code withing the website where users can see the code to scan
  // }

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-400 to-indigo-400">
        <div
          className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg shadow-black/40 hover:shadow-2xl
flex flex-col items-center hover:scale-105 transition-all ease-in-out duration-4    00
"
        >
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-18 h-18 flex items-center justify-center rounded-full bg-gradient-to-r from-rose-400 to-indigo-400
                        mb-2
                        "
            >
              <BsQrCode className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mb-1">NodeQR</h1>

            <p className="text-gray-500 text-sm">
              Enter Text & Url to create a Qr Code
            </p>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter URL"
            className="w-full mb-5 px-4 py-3 bg-gray-50
                     border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none text-gray-700  
                     placeholder-gray-400 shadow-sm transition duration-400
                     "
          />
          <div className="mb-5 flex items-center justify-center w-full">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center p-4 min-h-[200px] w-full">
              {inputText.trim() ? (
                <QRCodeCanvas
                  value={inputText}
                  size={200}
                  className="rounded"
                />
              ) : (
                <BsQrCode className="w-16 h-16 text-gray-300 mb-2" />
              )}
            </div>
          </div>

          <div className="flex sm:flex-row flex-col w-full gap-3 mb-2 ">
            <button
              onClick={handleDownload}
              disabled={!inputText.trim()}
              className="flex-1 flex items-center justify-center gap-2 
px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
transition cursor-pointer"
            >
              <FiDownload className="w-4" />
              Download
            </button>

            <button
              onClick={handleCopy}
              disabled={!inputText.trim()}
              className="flex-1 flex items-center justify-center gap-2 
px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
transition cursor-pointer"
            >
              {copied ? (
                <FiCheck className="w-4 h-4 text-green-500" />
              ) : (
                <FiX className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={handleClear}
              disabled={!inputText.trim()}
              className="flex-1 flex items-center justify-center gap-2 
px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
transition cursor-pointer"
            >
              <FiX className="w-4" />
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
