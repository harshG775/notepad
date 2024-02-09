import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNavBar from "../partials/topNavBar/TopNavBar";
export default function AppLayout() {
	const location = useLocation();
	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [location]);
	return (
		<>
            <TopNavBar />
			<Suspense fallback={"<LoadingScreen />"}>
                <Outlet />
			</Suspense>
		</>
	);
}
