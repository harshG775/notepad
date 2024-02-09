import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes.jsx";
import "./global.css";

import ContextProvider_db from "./store/ContextProvider_db.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ContextProvider_db>
				<AppRoutes />
			</ContextProvider_db>
		</QueryClientProvider>
	</React.StrictMode>
);
