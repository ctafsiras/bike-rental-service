import { Button } from "@/components/ui/button";
import Navbar from "./components/navbar";
// import Navbar from "./components/nav2";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">

      <h1 className="text-3xl font-bold ">Hello world!</h1>
  
      <Button>Click me</Button>
      </div>
      <Footer />
    </>
  );
}

export default App;
