import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.tsx";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary fallbackRender={(props) => <ErrorFallback error={props.error as Error} />}>
        <App />
    </ErrorBoundary>,
);
