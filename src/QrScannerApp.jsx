import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TicketInfoDisplay from "./TicketInfoDisplay.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

// Accept scanResult and a reset function from the parent App.jsx
const QrScannerApp = ({ scanResult, resetScanner }) => {
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (scanResult) {
      fetchTicketData(scanResult);
    }
  }, [scanResult]);

  const fetchTicketData = async (scannedText) => {
    setLoading(true);
    setError(null);
    setTicketData(null);
    console.log(scannedText);

    try {
      const response = await fetch(
        "http://localhost:8080/QRCODESCANNER-0.0.1-SNAPSHOT/scan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            encryptedString: scannedText, // Send the automatically scanned text
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Invalid QR ticket or Server Error");
      }
      const data = await response.json();
      setTicketData(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 mw-60 my-auto font-sans-serif">
      {/* Loading Indicator */}
      {loading && (
        <div className="text-primary text-center">
          <h3 className="blue">Verifying Ticket with Server...</h3>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <ErrorMessage error={error} resetScanner={resetScanner} />}

      {/* Success Data Display */}
      {ticketData && (
        <TicketInfoDisplay
          qrScannerResponse={ticketData}
          resetScanner={resetScanner}
        />
      )}
    </div>
  );
};

export default QrScannerApp;
