function ResetButton({ resetScanner }) {
  return (
    <button
      type="button"
      className="btn btn-primary m-3 bg-gradient shadow"
      onClick={resetScanner}
    >
      Go To Scanner Again
    </button>
  );
}
export default ResetButton;
