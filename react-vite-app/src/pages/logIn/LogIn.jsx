import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Context_db from "../../store/Context_db";
import { Actions } from "../../store/Reducer_db";
export default function LogIn() {
    const [state, dispatch] = useContext(Context_db);
	const { register, handleSubmit } = useForm();
    if (state.user) {
        return (
            <section className="grid place-content-center min-h-screen">
                <div>
                    <Link to="/"> LOGO </Link>
                    <div className=" bg-white">
                        <h1>already logged in</h1>
                    </div>
                </div>
            </section>
        );
        
    }
    const handleLogin = (submitData) => {
        dispatch({
            actionType: Actions.LOGIN,
            payload: JSON.stringify(submitData),
        })
    }
	return (
        <section className="grid place-content-center min-h-screen">
            <div>
                <Link to="/"> LOGO </Link>
                <div className=" bg-white">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <ul>
                            <li>
                                <label htmlFor="email">email</label>
                                <input type="email" placeholder="email" {...register("email")} />
                            </li>
                            <li>
                                <label htmlFor="password">password</label>
                                <input type="password" placeholder="password" {...register("password")} />
                            </li>
                            <li>
                                <button className="bg-gray-800 text-white px-4 py-2">login</button>
                            </li>
                            <li>
                                <label htmlFor="remember">remember</label>
                                <input type="checkbox" name="remember" id="remember" />
                            </li>
                        </ul>
                        <div>
                            <p>
                                create an account 
                                <Link className="text-blue-500" to="/sign-up">sign Up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
	);
}
