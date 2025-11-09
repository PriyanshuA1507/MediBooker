// import React from "react";
// import Contact from "../components/Contact";
// import AboutUs from "../components/AboutUs";
// import Footer from "../components/Footer";
// import Hero from "../components/Hero";
// import Navbar from "../components/Navbar";
// import HomeCircles from "../components/HomeCircles";

// const Home = () => {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <AboutUs />
//       <HomeCircles />
//       <Contact />
//       <Footer />
//     </>
//   );
// };

// export default Home;
// Home Page - MediBooker Landing Page
// Developed by Priyanshu

import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import HomeCircles from "../components/HomeCircles";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <HomeCircles />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
