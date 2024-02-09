
import UserProfile from "./UserProfile";

export default function TopNavBar() {

	return (
		<div className=" sticky top-0 bg-gray-600 text-gray-50">
			<ul className="flex justify-between p-2">
				<li>LOGO</li>
				<li>
					<UserProfile/>
				</li>
			</ul>
		</div>
	);
}
