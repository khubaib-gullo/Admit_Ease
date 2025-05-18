import About from "../components/About";
import Admissions from "../components/Admissions";
import CampusLife from "../components/CampusLife";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Programs from "../components/Programs";

// import { useEffect } from "react";

const home = () => {
  // const handleApplyNow = () => {
  //     // Navigate to the local admission form application
  //     // window.open("http://localhost:5173/", "_blank");
  //   };
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Admissions />
      <CampusLife />
      <Contact />
      <Footer />
    </div>
  );
};

export default home;
