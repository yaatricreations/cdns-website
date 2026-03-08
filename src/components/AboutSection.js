import React from "react";
import "./AboutSection.css";

import AboutIntro from "../components/AboutIntro";

import {
  FaUserNurse,
  FaClipboardList,
  FaHandsHelping,
  FaHeartbeat,
  FaNetworkWired,
  FaSmile,
} from "react-icons/fa";

function About() {
  return (
    <div className="about-page">
      <AboutIntro />

      {/* PREMIUM WHY SECTION */}
      <section className="premium-why">
        <h2>REDEFINING DISABILITY SERVICES IN MELBOURNE</h2>
        <p className="premium-sub">
          Nurse-Led Care. Clinical Excellence. Human Connection.
        </p>

        <div className="premium-grid">
          <div className="premium-card">
            <div className="icon-circle">
              <FaUserNurse />
            </div>
            <h4>RN-Led Care Team</h4>
            <p>
              Expert healthcare from our registered nurse-led specialised team.
            </p>
          </div>

          <div className="premium-card">
            <div className="icon-circle">
              <FaClipboardList />
            </div>
            <h4>Customised Care Plans</h4>
            <p>Personalised support plans created to match individual needs.</p>
          </div>

          <div className="premium-card">
            <div className="icon-circle">
              <FaHandsHelping />
            </div>
            <h4>Independence Focused</h4>
            <p>We empower you to cultivate skills for independent living.</p>
          </div>

          <div className="premium-card">
            <div className="icon-circle">
              <FaHeartbeat />
            </div>
            <h4>Compassionate Support</h4>
            <p>Respectful care that always values your voice and choices.</p>
          </div>

          <div className="premium-card">
            <div className="icon-circle">
              <FaNetworkWired />
            </div>
            <h4>Community Connections</h4>
            <p>Strong links to Melbourne’s support networks.</p>
          </div>

          <div className="premium-card">
            <div className="icon-circle">
              <FaSmile />
            </div>
            <h4>Enhanced Well-Being</h4>
            <p>Your happiness, dignity and quality of life come first.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
