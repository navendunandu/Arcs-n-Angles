import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Line from "./scenes/line";
import District from "./scenes/location/District"
import Place from "./scenes/location/Place"
import Category from "./scenes/Classification/Category"
import SubCategory from "./scenes/Classification/SubCategory"
import Users from "./scenes/team/User"
import Builders from "./scenes/team/Builder"
import Architects from "./scenes/team/Architect"
import Reports from "./scenes/Report/Report"

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="aapp" style={{ display: "flex" }}>
          <Sidebar />
          <main className="content" style={{ width: "100%" }}>
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/line" element={<Line />} />
              <Route path="/district" element={<District />} />
              <Route path="/place" element={<Place />} />
              <Route path="/category" element={<Category />} />
              <Route path="/subcategory" element={<SubCategory />} />
              <Route path="/users" element={<Users />} />
              <Route path="/builders" element={<Builders />} />
              <Route path="/architects" element={<Architects />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
