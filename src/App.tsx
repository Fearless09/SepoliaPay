import "./App.css";
import { Footer, Navbar, Services, Transactions, Welcome } from "./components";
import useGetAccount from "./hooks/useGetAccount";

const App = () => {
  useGetAccount();

  return (
    <div className="min-h-dvh">
      <Navbar />
      <div className="gradient-bg-welcome text-white">
        <div className="container mx-auto">
          <Welcome />
        </div>
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
