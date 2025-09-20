import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AppLayout from "@/layouts/App";
import RecordPage from "@/pages/Record";
import TranscriptPage from "@/pages/Transcript";
import HistoryPage from "@/pages/History";

function App() {
  return (
    <Router>
      <div className="min-h-dvh flex flex-col">
        {/* Navbar always at the top */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <RecordPage />
              </AppLayout>
            }
          />
          <Route
            path="/transcript"
            element={
              <AppLayout>
                <TranscriptPage />
              </AppLayout>
            }
          />
          <Route
            path="/history"
            element={
              <AppLayout>
                <HistoryPage />
              </AppLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
