import React from "react";
import { Link } from "react-router-dom";

const CompletedDonationCard = ({ donation, raisedPercentage }) => {
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
        <h3 className="uppercase font-semibold">You can donate various goods for citizens</h3>
        <div className="relative">
          <div
            style={{
              left: `calc(${raisedPercentage > 0 ? 100 : raisedPercentage}% - 18px)`,
              clipPath: "polygon(100% 0, 100% 60%, 60% 60%, 51% 80%, 40% 60%, 0 60%, 0 0)",
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
            <button className="btn btn-xs btn-outline cursor-default">53 days ago</button>
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
};

export default CompletedDonationCard;
