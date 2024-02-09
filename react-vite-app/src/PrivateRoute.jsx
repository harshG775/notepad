import { useEffect } from "react";
import useAuth from "./hooks/UseAuth";
import { useNavigate } from "react-router-dom";
export default function PrivateRoute({ components: Components, ...props }) {
	const navigate = useNavigate();
	let { currentUser, userRole } = useAuth();

	const token = currentUser?.accessToken;
	useEffect(() => {
		if (token === null || !userRole) {
			navigate("/login");
		}
	}, [token, userRole, navigate]);

	switch (userRole) {
		case "normal":
			return <Components.user {...props} />;
		case "admin":
			return <Components.admin {...props} />;
		case "superAdmin":
			return <Components.superAdmin {...props} />;
		default:
			navigate("/login");
			return null;
	}
}
