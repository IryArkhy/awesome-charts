import { Grid, Toolbar } from "./components";
import { GridProvider } from "./context";

export function AnalyticsWidget() {
  return (
    <GridProvider>
      <Toolbar />
      <Grid />
    </GridProvider>
  );
}
