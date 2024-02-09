import axios from "axios";

export default function useAuth() {
	const getCurrentUser = () => {
		try {
			const currentUser = JSON.parse(localStorage.getItem("currentUser"));
			return currentUser || null;
		} catch (error) {
			console.error("Error fetching current user:", error);
			return null;
		}
	};

	const signupUser = async (userData) => {
		try {
			// Make a POST request to your signup endpoint
			const response = await axios.post("your/signup/endpoint", userData);

			// Save user data to localStorage or handle it based on your server response
			localStorage.setItem("currentUser", JSON.stringify(response.data));

			return true;
		} catch (error) {
			console.error("Error signing up user:", error);
			return false;
		}
	};

	const loginUser = async (credentials) => {
		try {
			// Make a POST request to your login endpoint
			const response = await axios.post(
				"your/login/endpoint",
				credentials
			);

			// Save user data to localStorage or handle it based on your server response
			localStorage.setItem("currentUser", JSON.stringify(response.data));

			return true;
		} catch (error) {
			console.error("Error logging in user:", error);
			return false;
		}
	};

	const logoutUser = () => {
		try {
			// Clear user data from localStorage or perform necessary logout actions
			localStorage.removeItem("currentUser");
			return true;
		} catch (error) {
			console.error("Error logging out user:", error);
			return false;
		}
	};

	return { getCurrentUser, signupUser, loginUser, logoutUser };
}
