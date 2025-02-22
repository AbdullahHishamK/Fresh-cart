import { createRoot } from "react-dom/client";
import { StrictMode } from 'react'
import App from "./App";
import '@fortawesome/fontawesome-free/css/all.min.css'  // Font Awesome CSS
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
