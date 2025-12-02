import { Grid, Toolbar, Header } from "./components";
import { GridProvider } from "./contexts";

import "./App.css";

function App() {
  return (
    <GridProvider>
      <div className="app">
        <Header />
        <main>
          <Toolbar />
          <Grid />
        </main>
      </div>
    </GridProvider>
  );
}

export default App;
