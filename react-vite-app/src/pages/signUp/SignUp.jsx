import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export default function SignUp() {
	const { register, handleSubmit } = useForm();
    const handleSignUp = () => {
        
    }
	return (
        <section className="grid place-content-center min-h-screen">
            <div>
                <Link to="/"> LOGO </Link>
                <div className=" bg-white">
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <ul>
                            <li>
                                <label htmlFor="username">username</label>
                                <input type="text" placeholder="username" {...register("username")} />
                            </li>
                            <li>
                                <label htmlFor="email">email</label>
                                <input type="email" placeholder="email" {...register("email")} />
                            </li>
                            <li>
                                <label htmlFor="password">password</label>
                                <input type="password" placeholder="password" {...register("password")} />
                            </li>
                            <li>
                                <button className="bg-gray-800 text-white px-4 py-2">sign</button>
                            </li>
                        </ul>
                        <div>
                            <p>
                                Already have an account? 
                                <Link className="text-blue-500" to="/login">login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
	);
}
