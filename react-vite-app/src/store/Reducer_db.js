// Reducer_db.jsx
export const Actions = {
	TOGGLE_MENU: "toggle_menu",
    LOGIN: "login",
	LOGOUT: "logout",

	CREATE: "CREATE",
	UPDATE: "UPDATE",
	DELETE: "DELETE",
};
export default function Reducer_db(state, { actionType, payload }) {
	switch (actionType) {
		case Actions.TOGGLE_MENU: {
			return {
				...state,
				isOpen: payload,
			};
		}
		case Actions.LOGIN: {
			localStorage.setItem("user", payload);
			return {
				...state,
				user: JSON.parse(payload),
			};
		}
		case Actions.LOGOUT: {
			localStorage.setItem("user", payload);
			return {
				...state,
				user: payload,
			};
		}


        case Actions.CREATE: {
            localStorage.setItem("notes", JSON.stringify(payload));
			return {
				...state,
				notes: payload,
			};
		}
        case Actions.UPDATE: {
			return {
				...state,
				notes: payload,
			};
		}
        case Actions.DELETE: {
			return {
				...state,
				notes: payload,
			};
		}

		// default:
		//   throw new Error();

		default:
			return state;
	}
}
