import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import History from "./scenes/history";
import Testing from "./scenes/testing";
import Vaccines from "./scenes/vaccines";
import News from "./scenes/news"
import Cases from "./scenes/cases"
import Deaths from "./scenes/deaths"
import Feedback from "./scenes/feedback";

function App() {
  const [theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar /> 
        <main className="content">
          <Topbar />
          <Routes>
            /* <Route path="/" element={<Dashboard />} /> */
            <Route path="/history" element={<History />} />
            <Route path="/cases" element={<Cases/>} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/deaths" element={<Deaths />} />
            <Route path="/vaccines" element={<Vaccines />} />
            <Route path="/news" element={<News />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
