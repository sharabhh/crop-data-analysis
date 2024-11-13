import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import MinMaxCrop from "./components/MinMaxCrop";
import AvgCrop from "./components/AvgCrop";
import "./App.css";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <div className="container">
        <div className="min-container">
          <div className="">
            <h1>Table 1</h1>
            <MinMaxCrop />
          </div>
        </div>
        <div className="avg-container">
          <div className="">
            <h1>Table 2</h1>
            <AvgCrop />
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
