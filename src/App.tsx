import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './assets/component/Home';
import Verification from './admin/users/Verification.tsx';
import Login from './assets/component/Login'
import Dashboard from './assets/component/dashboard/Dashboard'
import Registration from "./admin/users/Registration.tsx";
import AdminDashboard from "./admin/AdminDashboard";
import EmployeeDashboard from "./employee/EmployeeDashboard.tsx";
import NotFound from "./privateRoute/NotFound";
import TicketTrackProgress from "./assets/component/dashboard/ticketHandle/TicketTrackProgress";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <div className="App">
                    <Routes>
                        {/* <Route path='/' element={<Test />}/> */}
                        <Route path="/" element={<Home />} />
                        <Route path="/verification" element={<Verification />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard"
                            element={<Dashboard />}
                        />
                        <Route path="/register" element={<Registration />} />
                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/employee"
                            element={<EmployeeDashboard />}
                        />

                        <Route
                        path="/tickets_check"
                        element={<TicketTrackProgress />}
                        />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </div>

            </Router>
        </>
    );
};

export default App;