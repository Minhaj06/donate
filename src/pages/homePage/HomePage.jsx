import React from "react";
import HomeBanner from "./HomeBanner";
import StandPeople from "./StandPeople";
import HowWorks from "./HowWorks";
import OngoingDonations from "./OngoingDonations";
import CompletedDonations from "./CompletedDonations";
import Counters from "./Counters";
import BottomBanner from "./BottomBanner";

const HomePage = () => {
  return (
    <>
      <HomeBanner />
      <StandPeople />
      <HowWorks />
      <OngoingDonations />
      <CompletedDonations />
      <Counters />
      <BottomBanner />
    </>
  );
};

export default HomePage;
