import React from "react";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import USA from "../../assets/images/usa-flag.jpg";
import UK from "../../assets/images/uk-flag.jpg";
import DonationImage from "../../assets/images/donation-image.png";
import { Link } from "react-router-dom";

const CompletedDonationsData = [
  {
    _id: "613a9c256b6eef0015f3e663",
    category: "Education",
    goal: 10000,
    raised: 12000,
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
    raised: 15000,
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
    raised: 8000,
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
    raised: 5000,
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
    raised: 12000,
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
    raised: 8000,
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
    raised: 10000,
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
    raised: 15000,
    giver: 152,
    description: "Providing medical aid to rural communities",
    countryFlag: UK,
    image: DonationImage,
    date: "2023-08-12",
  },
];

const CompletedDonations = () => {
  return (
    <section className="py-20 bg-success">
      <div className="container">
        <SectionTitle className="text-white" title="Completed Donations" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CompletedDonationsData.map((donation) => {
            const raisedPercentage = Math.round((donation.raised / donation.goal) * 100);

            return (
              <div
                key={donation._id}
                className="bg-gray-200 text-gray-700 rounded-md overflow-hidden shadow-md"
              >
                <div className="relative">
                  <img
                    src={donation.image}
                    alt={donation.category}
                    className="w-full h-48 lg:h-52 object-cover bg-gray-400"
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
                  <h3 className="uppercase font-semibold">
                    You can donate various goods for citizens
                  </h3>
                  <div className="relative">
                    <div
                      style={{
                        left: `calc(${raisedPercentage > 0 ? 100 : raisedPercentage}% - 18px)`,
                        clipPath:
                          "polygon(100% 0, 100% 60%, 60% 60%, 51% 80%, 40% 60%, 0 60%, 0 0)",
                      }}
                      className="w-8 h-8 text-xs text-center pt-[2px] bg-primary text-white absolute top-0"
                    >
                      {raisedPercentage}%
                    </div>

                    <progress
                      className="progress bg-gray-400 progress-primary w-full mt-8 mb-3"
                      value={raisedPercentage}
                      max="100"
                    ></progress>
                  </div>

                  <div className="flex gap-2 items-center justify-between">
                    <div>
                      Raised: <span className="text-primary">${donation.raised}</span>
                    </div>
                    <div className="shrink-0">
                      <button className="btn btn-xs btn-outline cursor-default">
                        53 days ago
                      </button>
                    </div>
                    <div>
                      Goal: <span className="text-primary">${donation.goal}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 text-xl leading-none font-semibold text-white text-center bg-primary">
                  Completed
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompletedDonations;
