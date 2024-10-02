import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./tailwind.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "770837864525-occ70gomjga1oln3pp559l3pc8jlmc0o.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
