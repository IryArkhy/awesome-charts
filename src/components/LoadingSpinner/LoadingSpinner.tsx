import './LoadingSpinner.css';

export function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__circle"></div>
      <p className="loading-spinner__text">Loading...</p>
    </div>
  );
}
