import { Link } from "react-router-dom";
import { useContext } from "react";
import Context_db from "../../store/Context_db";
import { Actions } from "../../store/Reducer_db";
export default function UserProfile() {
	const [state, dispatch] = useContext(Context_db);

	if (!state.user) {
		return (
			<div className="flex gap-2">
				<Link className="hover:text-blue-400" to={"/login"}>login</Link>
				<Link className="hover:text-blue-400" to={"/sign-up"}>signUp</Link>
			</div>
		);
	}
	const handleLogOut = () => {
		dispatch({
			actionType: Actions.LOGOUT,
			payload: null,
		});
	};
	return (
		<div className="group">
			<div className="cursor-pointer">
				{state.user?.email}
			</div>
			<ul className="group-hover:block hidden absolute top-8 right-2 bg-gray-200 hover:bg-blue-600 hover:text-gray-100 text-gray-900">
				<li>
					<button
						onClick={handleLogOut}
						className="cursor-pointer rounded-md px-2">
						{state != "null" ? "logout" : ""}
					</button>
				</li>
			</ul>
		</div>
	);
}
