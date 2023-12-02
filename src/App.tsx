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
import DepartmentAssignTicket from "./admin/HODManagement/DepartmentAssignTicket";
import AllSentTickets from "./assets/component/dashboard/ticketHandle/AllSentTickets";

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

                        <Route path="/AssignTicket"
                        element = {<DepartmentAssignTicket />}/>
                        <Route path='/dashboard/dashboard/my-tickets' element={<AllSentTickets />}/>
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </div>

            </Router>
        </>
    );
};

export default App;