import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import BannerImage from "../../assets/images/volunteer.jpg";
import PersonalInfoInputs from "./PersonalInfoInputs";
import VolunteerContactInputs from "./VolunteerContactInputs";
import PublicContactInputs from "./PublicContactInputs";

const steps = [
  {
    title: "Volunteer personal info",
    content: <PersonalInfoInputs />,
  },
  {
    title: "Volunteer Contact info",
    content: <VolunteerContactInputs />,
  },
  {
    title: "Public contact info",
    content: <PublicContactInputs />,
  },
];

const ApplyPage = () => {
  const [volunteerApply, setVolunteerApply] = useState(false);

  const sectionStyle = {
    backgroundImage: `url(${BannerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  };

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item, index) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <section className="py-20" style={sectionStyle}>
      <div style={overlayStyle}></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center flex-wrap gap-4 justify-center sm:justify-between mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold font-noto text-center text-gray-300">
            {volunteerApply ? "Be a Volunteer!" : "Apply for Donation!"}
          </h1>
          <button
            onClick={() => setVolunteerApply(!volunteerApply)}
            className="btn btn-primary btn-sm sm:btn-md"
          >
            {volunteerApply ? "Apply for Donation" : "Be a Volunteer"}
          </button>
        </div>

        {/* <form> */}
        <div className="p-5 py-8 sm:p-8 bg-gray-200 rounded-xl">
          {volunteerApply ? (
            <>
              <Steps current={current} items={items} />
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 mt-6 ">
                {steps[current].content}
              </div>

              <div className="flex items-center justify-between flex-wrap gap-6 mt-10">
                {current > 0 && (
                  <button className="btn btn-primary btn-sm" onClick={() => prev()}>
                    Previous
                  </button>
                )}
                {current < steps.length - 1 && (
                  <button className="btn btn-primary btn-sm ml-auto" onClick={(e) => next()}>
                    Next
                  </button>
                )}
                {current === steps.length - 1 && (
                  <button
                    className="btn btn-primary btn-sm ml-auto"
                    onClick={() => message.success("Processing complete!")}
                  >
                    Done
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl">Donation Form</h1>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplyPage;
