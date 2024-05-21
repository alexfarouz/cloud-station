import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { useProgress } from "@react-three/drei";
import { Section1 } from "./Sections/Section1";
import { SectionFAQ } from "./Sections/SectionFAQ";
import { SectionFooter } from "./Sections/SectionFooter";
import CanvasContainer from "./CanvasContainer";
import './styles.css';

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  return (
    <div className={`loading-screen ${active ? "" : "loading-screen--hidden"}`}>
      <div className="loading-screen__container">
        <img src="../public/logos/cloud-logo.png" className="logo-loading-image"/>
        <div className="progress__container">
          <div className="progress__bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 0.5,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <Router>
      <>
        <LoadingScreen />

        <div className="experience" >
          <div className="mobile-scroll" />
          <CanvasContainer />
        </div>

        <div className="nav">
          <img src="../public/logos/cloud-logo.png" alt="Cloud Stations Logo" className="logo-image"/>
        </div>
        

        <Routes>
          <Route path="/" element={<Section1 />} />
          {/* <Route path="/faq" element={<SectionFAQ />} /> */}
        </Routes>

        <SectionFooter />
      </>
    </Router>
  );
}

export default App;