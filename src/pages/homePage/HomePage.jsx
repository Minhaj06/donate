import React from "react";
import HomeBanner from "./HomeBanner";
import StandPeople from "./StandPeople";
import HowWorks from "./HowWorks";
import OngoingDonations from "./OngoingDonations";
import CompletedDonations from "./CompletedDonations";
import Counters from "./Counters";
import BottomBanner from "./BottomBanner";
import TypeOfGrant from "./TypeOfGrant";

// const grantTypeData = [
//   {
//     label: "Medical",
//     icon: <BsHeartPulseFill />,
//   },
//   {
//     label: "Education",
//     icon: <MdCastForEducation />,
//   },
//   {
//     label: "Memorial",
//     icon: <BsFillBookmarkHeartFill />,
//   },
//   {
//     label: "Emergency",
//     icon: <PiSirenFill />,
//   },
//   {
//     label: "Nonprofit",
//     icon: <PiHandHeartFill />,
//   },

//   {
//     label: "Animals",
//     icon: <GiDeer />,
//   },
//   {
//     label: "Environment",
//     icon: <MdGrass />,
//   },
//   {
//     label: "Business",
//     icon: <BsBriefcaseFill />,
//   },
//   {
//     label: "Community",
//     icon: <RiCommunityFill />,
//   },
//   {
//     label: "Competition",
//     icon: <GiPodiumWinner />,
//   },
//   {
//     label: "Creative",
//     icon: <IoColorPaletteSharp />,
//   },
//   {
//     label: "Event",
//     icon: <BsFillCalendarEventFill />,
//   },
// ];

const HomePage = () => {
  return (
    <>
      <HomeBanner />
      <StandPeople />
      <HowWorks />
      <TypeOfGrant />
      <OngoingDonations />
      <CompletedDonations />
      <Counters />
      <BottomBanner />
    </>
  );
};

export default HomePage;
