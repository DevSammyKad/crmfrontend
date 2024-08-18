import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';
import Payment from './pages/Payment';
import Reports from './pages/Reports';
import Setting from './pages/Setting';
import Help from './pages/Help';
import OldAgeHome from './pages/OldAgeHome';
import CsrFunds from './pages/CsrFunds';
import OtherActivity from './pages/OtherActivity';
import BachatGat from './pages/BachatGat';
import { Breadcrumbs } from '@mui/material';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F2F6FF] p-4">
              <Breadcrumbs />
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/oldAgeHome" element={<OldAgeHome />} />
                <Route path="/csrfunds" element={<CsrFunds />} />
                <Route path="/bachatgat" element={<BachatGat />} />
                <Route path="/otheractivity" element={<OtherActivity />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/help" element={<Help />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
