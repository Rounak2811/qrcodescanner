// import React, { useState, useEffect } from "react";
// import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
// import "./App.css";
// import scannerGif from "./assets/qr-code.gif";

// function App() {
//   const [scanResult, setScanResult] = useState(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   // --- CAMERA SCANNING LOGIC ---
//   useEffect(() => {
//     let html5QrCode;

//     if (isScanning) {
//       const html5QrCode = new Html5Qrcode("reader", {
//         experimentalFeatures: {
//           useBarCodeDetectorIfSupported: true,
//         },
//       });
//       html5QrCode
//         .start(
//           { facingMode: "environment" },
//           {
//             fps: 10,
//             qrbox: { width: 250, height: 250 },
//             formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
//           },

//           (decodedText) => {
//             setScanResult(decodedText);
//             setIsScanning(false);
//             html5QrCode.stop().catch((err) => console.error(err));
//           },
//           undefined,
//         )
//         .catch((err) => {
//           console.error("Camera start failed", err);
//           setErrorMessage("Camera permission denied or no camera found.");
//           setIsScanning(false);
//         });
//     }

//     return () => {
//       if (html5QrCode && html5QrCode.isScanning) {
//         html5QrCode.stop().catch((err) => console.error(err));
//       }
//     };
//   }, [isScanning]);

//   // --- FILE UPLOAD LOGIC ---
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Initialize the scanner engine
//     const html5QrCode = new Html5Qrcode("reader");

//     // scanFile takes the file and a boolean (false = don't render the image to the UI)
//     html5QrCode
//       .scanFile(file, false)
//       .then((decodedText) => {
//         setScanResult(decodedText);
//         setErrorMessage(""); // Clear any previous errors
//       })
//       .catch((err) => {
//         console.error(err);
//         setErrorMessage("No QR code found in that image. Please try another.");
//       });

//     // Reset the input value so the user can upload the same file again if needed
//     e.target.value = "";
//   };

//   return (
//     <section id="center" style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Scan QR Code - Get the Information</h1>

//       {errorMessage && (
//         <div style={{ color: "red", marginBottom: "15px", fontWeight: "bold" }}>
//           {errorMessage}
//         </div>
//       )}

//       {/* CRITICAL: The reader div must always exist in the DOM for the library to work.
//         We use CSS to hide it when the user isn't actively using the camera.
//       */}
//       <div
//         id="reader"
//         style={{
//           display: isScanning ? "block" : "none",
//           width: "100%",
//           maxWidth: "500px",
//           margin: "0 auto",
//         }}
//       ></div>

//       {scanResult ? (
//         <div className="result-container">
//           <h2>Scan Successful!</h2>
//           <p style={{ fontSize: "1.2rem", wordBreak: "break-all" }}>
//             <strong>Result:</strong> {scanResult}
//           </p>
//           <button
//             className="btn btn-secondary"
//             onClick={() => {
//               setScanResult(null);
//               setErrorMessage("");
//             }}
//             style={{ marginTop: "15px" }}
//           >
//             Scan Another Code
//           </button>
//         </div>
//       ) : isScanning ? (
//         <div style={{ marginTop: "15px" }}>
//           <button
//             className="btn btn-danger"
//             onClick={() => setIsScanning(false)}
//           >
//             Cancel Camera Scan
//           </button>
//         </div>
//       ) : (
//         <div>
//           <img
//             src={scannerGif}
//             alt="Scanner GIF"
//             style={{ width: "250px", height: "auto", margin: "5px 0" }}
//           />
//           <br />

//           {/* Action Buttons Container */}
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "15px",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => {
//                 setErrorMessage("");
//                 setIsScanning(true);
//               }}
//             >
//               Scan with Camera
//             </button>

//             {/* File Input disguised as a secondary option */}
//             <div>
//               <label
//                 htmlFor="file-upload"
//                 className="btn btn-primary"
//                 style={{ cursor: "pointer", display: "inline-block" }}
//               >
//                 Upload Image File
//               </label>
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileUpload}
//                 style={{ display: "none" }} // Hide the ugly default file input
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import "./App.css";
import scannerGif from "./assets/qr-code.gif";
import QrScannerApp from "./QrScannerApp.jsx";

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const videoRef = useRef(null);

  // --- CAMERA SCANNING LOGIC ---
  useEffect(() => {
    let qrScanner;

    if (isScanning && videoRef.current) {
      qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setScanResult(result.data);
          setIsScanning(false);
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        },
      );

      qrScanner.start().catch((err) => {
        console.error(err);
        setErrorMessage("Camera blocked or not found.");
        setIsScanning(false);
      });
    }

    return () => {
      if (qrScanner) {
        qrScanner.stop();
        qrScanner.destroy();
      }
    };
  }, [isScanning]);

  // --- FILE UPLOAD LOGIC ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => {
        setScanResult(result.data);
        setErrorMessage(""); // Clear any previous errors
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("No QR code found in that image. Please try another.");
      });

    e.target.value = ""; 
  };

  return (
    <section id="center" className="text-center mx-auto  p-2">
      <marquee className="bg-primary bg-gradient text-white fs-3">
        Kolkata Metro Railways
      </marquee>
      <h1 className="text-primary">Scan QR Code - Get the Information</h1>

      {errorMessage && (
        <div className="text-red mb-3 text-bold">{errorMessage}</div>
      )}

      {scanResult ? (
        <QrScannerApp
          scanResult={scanResult}
          resetScanner={() => {
            setScanResult(null);
            setErrorMessage("");
          }}
        />
      ) : isScanning ? (
        <div className="m-auto" style={{ width: "350px" }}>
          <video ref={videoRef} className="w-100 rounded-4 shadow"></video>

          <button
            className="btn btn-danger mt-4"
            onClick={() => setIsScanning(false)}
          >
            Cancel Scan
          </button>
        </div>
      ) : (
        <div>
          <img src={scannerGif} alt="Scanner" height={200} width={200} />
          <br />

          <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center m-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                setErrorMessage("");
                setIsScanning(true);
              }}
            >
              Start Camera Scanner
            </button>

            <div>
              <label
                htmlFor="file-upload"
                className="btn btn-primary"
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  margin: 0,
                }}
              >
                Upload Image File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
