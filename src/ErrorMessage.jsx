import ResetButton from "./ResetButton.jsx";

function ErrorMessage({ error, resetScanner }) {
  return (
    <>
      <div>
        <div className="card">
          <div className="card-body bg-danger text-white ">
            Error Occurred : {error}
          </div>
        </div>
        <ResetButton resetScanner={resetScanner} />
      </div>
    </>
  );
}

export default ErrorMessage;
