import { Grid } from "./Grid";
import { Toolbar } from "./Toolbar";
import { GridProvider } from "./context";

export function AnalyticsWidget() {
  return (
    <GridProvider>
      <Toolbar />
      <Grid />
    </GridProvider>
  );
}
