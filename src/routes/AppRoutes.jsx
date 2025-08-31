import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Register from '../pages/Register';
import CheckEmailRedirect from '../components/CheckEmailRedirect';
import ResendEmail from '../pages/ResendEmail';
import ActivateAccount from '../components/Registrations/ActivateAccount';
import ForgotPassword from '../pages/ForgotPassword';
import ConfirmNewPassword from '../pages/ConfirmNewPassword';
import Login from '../pages/Login';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="register" element={<Register/>} />
                <Route path="login" element={<Login/>} />
                <Route path="checkemail" element={<CheckEmailRedirect/>} />
                <Route path="resendemail" element={<ResendEmail/>} />
                <Route path="forgotpassword" element={<ForgotPassword/>} />
                <Route path="activate/:uid/:token" element={<ActivateAccount />} />
                <Route path="password/reset/confirm/:uid/:token" element={<ConfirmNewPassword />} />
                
            </Route>
        </Routes>
    );
};

export default AppRoutes;