
import React from "react";
import CountUp from "react-countup";
import "../styles/homecircles.css";

// Designed and developed by Priyanshu for MediBooker
const HomeStatsCircles = () => {
  const stats = [
    { end: 1000, label: ["Happy", "Patients"] },
    { end: 250, label: ["Verified", "Doctors"] },
    { end: 75, label: ["Expert", "Specialists"] },
  ];

  return (
    <section className="container circles">
      {stats.map((stat, index) => (
        <div className="circle" key={index}>
          <CountUp
            start={0}
            end={stat.end}
            delay={0}
            enableScrollSpy={true}
            scrollSpyDelay={300}
          >
            {({ countUpRef }) => (
              <div className="counter">
                <span ref={countUpRef} />+
              </div>
            )}
          </CountUp>
          <span className="circle-name">
            {stat.label[0]} <br /> {stat.label[1]}
          </span>
        </div>
      ))}
    </section>
  );
};

export default HomeStatsCircles;

