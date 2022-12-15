import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdmin from '../../hook/useAdmin';
import Loader from '../../Loader/Loader';

const AdminRoutes = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const [isAdmin, isAdminLoading] = useAdmin(user?.email);
	const location = useLocation();
		if (user && isAdmin) {
		return children;
	}
	return <Navigate to='/login' state={{ from: location, toast: true }} replace ></Navigate>;



	if (loading || isAdminLoading) {
		return <Loader></Loader>
	}


	




	// //!===============>==========>
	// 1st time jodi admin na thake .... tahole children er modde access dibe.... R jodi admin thake taholy check korbe j user ta admin ki na... jodi admin hoy taholy se access pabe naholy login page a pathiye dibe....

	// 	const konoAdminNae = true;

	// 	const amiAdmin = false;
	// 	// ! if no none admin condition (if no user make me admin)
	// 	if (konoAdminNae) {
	// 		// make me admin in server side.
	// 	}

	// 	//! Admin hole
	// 	else if (amiAdmin) {
	// 		return children;
	// 	} else {
	// 		return (
	// 			<Navigate
	// 				to='/login'
	// 				state={{ from: location, toast: true }}
	// 				replace
	// 			></Navigate>
	// 		);
	// 	}
	// //!===============>==========>
};

export default AdminRoutes;
