import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecordPage from "./pages/Record";
import TranscriptPage from "./pages/Transcript";
import HistoryPage from "./pages/History";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Navigation */}
        <nav className="bg-gray-800 p-4 flex gap-6">
          <Link to="/" className="hover:underline">Record</Link>
          <Link to="/transcript" className="hover:underline">Transcript</Link>
          <Link to="/history" className="hover:underline">History</Link>
        </nav>

        {/* Pages */}
        <main className="flex-1 w-full flex items-center justify-center p-6">
          <Routes>
            <Route path="/" element={<RecordPage />} />
            <Route path="/transcript" element={<TranscriptPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
