
  import { createRoot } from "react-dom/client";
  import App from "./App";
  import AllProjectsPage from "./components/AllProjectsPage";
  import "./index.css";

  const path = window.location.pathname;

  let Page = App;
  if (path === "/all-projects") {
    Page = AllProjectsPage;
  }

  createRoot(document.getElementById("root")!).render(<Page />);
  