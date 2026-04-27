import ResetButton from "./ResetButton.jsx";

function TicketInfoDisplay({ qrScannerResponse, resetScanner }) {
  return (
    <>
      <div className="card border border-secondary bg-primary-subtle">
        <div className="card-body">
          <h5 className="card-title text-white bg-success bg-gradient rounded p-2 shadow">
            Valid Ticket Found
          </h5>

          <ul className="list-group">
            <li className="list-group-item bg-primary bg-gradient text-white">
              <div className="row">
                <div className="col bg-primary bg-gradient text-white">
                  Ticket Number:
                </div>
                <div className="col bg-primary bg-gradient text-white">
                  {qrScannerResponse.qrct_NUMBER}
                </div>
              </div>
            </li>
            <li className=" list-group-item bg-primary bg-gradient text-white">
              <div className="row">
                <div className="col bg-primary bg-gradient text-white">
                  Source Stn:
                </div>
                <div className="col bg-primary bg-gradient text-white">
                  {qrScannerResponse.src_STATION}
                </div>
              </div>
            </li>
            <li className="list-group-item bg-primary bg-gradient text-white">
              <div className="row">
                <div className="col bg-primary bg-gradient text-white">
                  Destination Stn:
                </div>
                <div className="col bg-primary bg-gradient text-white">
                  {qrScannerResponse.dest_STATION}
                </div>
              </div>
            </li>
            <li className="list-group-item bg-primary bg-gradient text-white">
              <div className="row">
                <div className="col bg-primary bg-gradient text-white">Fare:</div>
                <div className="col bg-primary bg-gradient text-white">
                  Rs.{qrScannerResponse.fare}
                </div>
              </div>
            </li>
            <li className="list-group-item bg-primary bg-gradient text-white">
              <div className="row">
                <div className="col bg-primary bg-gradient text-white">
                  Passenger Count:
                </div>
                <div className="col bg-primary bg-gradient text-white">
                  {qrScannerResponse.passenger_COUNT}
                </div>
              </div>
            </li>
            <li className="list-group-item bg-primary bg-gradient text-white">
              <div className="row">
                <div className="col bg-primary bg-gradient text-white">
                  Valid From:
                </div>
                <div className="col bg-primary bg-gradient text-white">
                  {qrScannerResponse.txn_TIME}
                </div>
              </div>
            </li>
            <li className="list-group-item bg-primary bg-gradient text-white">
              <div className="row">
                <div className="col bg-primary bg-gradient text-white">
                  Valid Upto:
                </div>
                <div className="col bg-primary bg-gradient text-white">
                  {qrScannerResponse.expiry_DATE}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ResetButton resetScanner={resetScanner} />
    </>
  );
}

export default TicketInfoDisplay;
