import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomFooter from '../../Shared/Footer/CustomFooter';
import CustomNav from '../../Shared/Navbar/CustomNav';

const Main = () => {
    return (
			<div>
			<CustomNav></CustomNav>
			<Outlet></Outlet>
			<CustomFooter></CustomFooter>
			</div>
		);
};

export default Main;