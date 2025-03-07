import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TransactionProvider } from "./context/TransactionContext.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <TransactionProvider>
    <App />
    <Toaster />
  </TransactionProvider>,
);
