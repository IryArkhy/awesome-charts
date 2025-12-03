import { AnalyticsWidget, Header } from "./components";

import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <div className="app">
        <Header />
        <main>
          <AnalyticsWidget />
        </main>
      </div>
    </div>
  );
}

export default App;
