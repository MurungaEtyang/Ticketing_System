import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './assets/component/Home';
import Verification from './assets/component/Verification';
import Login from './assets/component/Login'
import Dashboard from './assets/component/dashboard/Dashboard'
import Registration from "./assets/component/Registration.tsx";
import AdminDashboard from "./admin/AdminDashboard";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/verification" element={<Verification />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/register" element={<Registration />}/>
                        <Route path="/admin" element={<AdminDashboard />}/>
                    </Routes>
                </div>

            </Router>
        </>
    );
};

export default App;