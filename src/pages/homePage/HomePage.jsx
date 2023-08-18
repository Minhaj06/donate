import React from "react";
import HomeBanner from "./HomeBanner";
import StandPeople from "./StandPeople";
import HowWorks from "./HowWorks";
import OngoingDonations from "./OngoingDonations";

const HomePage = () => {
  return (
    <>
      <HomeBanner />
      <StandPeople />
      <HowWorks />
      <OngoingDonations />
    </>
  );
};

export default HomePage;
