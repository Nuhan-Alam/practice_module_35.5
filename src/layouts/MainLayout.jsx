import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router';
import Footer from './footer';

const MainLayout = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default MainLayout;