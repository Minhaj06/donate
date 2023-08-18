import React from "react";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import USA from "../../assets/images/usa-flag.jpg";
import UK from "../../assets/images/uk-flag.jpg";
import DonationImage from "../../assets/images/donation-image.png";
import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";

const ongoingDonationsData = [
  {
    _id: "613a9c256b6eef0015f3e663",
    category: "Education",
    goal: 10000,
    raised: 7000,
    giver: 364,
    description: "Supporting underprivileged children's education",
    countryFlag: USA,
    image: DonationImage,
    date: "2023-08-16",
  },
  {
    _id: "613a9c256b6eef0015f3e664",
    category: "Healthcare",
    goal: 15000,
    raised: 6200,
    giver: 152,
    description: "Providing medical aid to rural communities",
    countryFlag: UK,
    image: DonationImage,
    date: "2023-08-12",
  },
  {
    _id: "613a9c256b6eef0015f3e665",
    category: "Environment",
    goal: 8000,
    raised: 3700,
    giver: 219,
    description: "Planting trees and conserving natural habitats",
    countryFlag: USA,
    image: DonationImage,
    date: "2023-08-09",
  },
  {
    _id: "613a9c256b6eef0015f3e666",
    category: "Animal Welfare",
    goal: 5000,
    raised: 2100,
    giver: 87,
    description: "Rescuing and caring for abandoned animals",
    countryFlag: UK,
    image: DonationImage,
    date: "2023-08-20",
  },
  {
    _id: "613a9c256b6eef0015f3e667",
    category: "Community Development",
    goal: 12000,
    raised: 8000,
    giver: 327,
    description: "Empowering local communities through sustainable projects",
    countryFlag: USA,
    image: DonationImage,
    date: "2023-08-18",
  },
  {
    _id: "613a9c256b6eef0015f3e365",
    category: "Environment",
    goal: 8000,
    raised: 3700,
    giver: 219,
    description: "Planting trees and conserving natural habitats",
    countryFlag: USA,
    image: DonationImage,
    date: "2023-08-09",
  },
  {
    _id: "613a9c256b6eef0015f3e668",
    category: "Education",
    goal: 10000,
    raised: 4500,
    giver: 364,
    description: "Supporting underprivileged children's education",
    countryFlag: USA,
    image: DonationImage,
    date: "2023-08-16",
  },
  {
    _id: "613a9c256b6eef0015f3e554",
    category: "Healthcare",
    goal: 15000,
    raised: 14000,
    giver: 152,
    description: "Providing medical aid to rural communities",
    countryFlag: UK,
    image: DonationImage,
    date: "2023-08-12",
  },
];

const OngoingDonations = () => {
  return (
    <section className="py-20">
      <div className="container">
        <SectionTitle className="text-white" title="Ongoing Donations" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ongoingDonationsData.map((donation) => {
            const raisedPercentage = Math.round((donation.raised / donation.goal) * 100);

            return (
              <div
                key={donation._id}
                className="bg-gray-700 text-white rounded-md overflow-hidden shadow-md"
              >
                <div className="relative">
                  <img
                    src={donation.image}
                    alt={donation.category}
                    className="w-full h-48 lg:h-52 object-cover bg-gray-600"
                  />

                  <img
                    src={donation.countryFlag}
                    alt="Country Flag"
                    className="w-14 h-8 absolute top-4 left-4"
                  />

                  <Link
                    to={`/category/${donation._id}`}
                    className="btn btn-sm capitalize btn-success absolute right-4 bottom-4"
                  >
                    {donation.category}
                  </Link>
                </div>

                <div className="p-5">
                  <h4 className="text-gray-300 font-semibold">{donation.description}</h4>

                  <div className="relative">
                    {/* <div
                      style={{
                        left: `calc(${raisedPercentage}% - 14px)`,
                        clipPath:
                          "polygon(100% 0, 100% 60%, 60% 60%, 51% 80%, 40% 60%, 0 60%, 0 0)",
                        clipPath:
                          "path('M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z')",
                      }}
                      className="w-12 h-12 text-xs text-center pt-[2px] bg-success absolute top-0"
                    >
                      {raisedPercentage}%
                    </div> */}
                    <div
                      className="text-xs text-center pt-[2px] absolute top-0"
                      style={{
                        left: `calc(${raisedPercentage}% - 17px)`,
                      }}
                    >
                      <span>
                        <BsFillHeartFill size={32} color="#dd0d0d" />
                      </span>
                      <span className="absolute top-[5px] left-0 w-full h-full flex justify-center">
                        {raisedPercentage}%
                      </span>
                    </div>

                    <progress
                      className="progress bg-gray-500 progress-success w-full mt-8 mb-3"
                      value={raisedPercentage}
                      max="100"
                    ></progress>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      Raised: <span className="text-success">${donation.raised}</span>
                    </div>
                    <div>
                      Goal: <span className="text-success">${donation.goal}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>Posted: 34 days ago</div>
                    <div>Giver: 344</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="btn btn-sm">View</button>

                    <button className="btn btn-sm btn-success">Donate</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OngoingDonations;
