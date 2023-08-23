import React from "react";

const PublicContactInputs = () => {
  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Profile Photos</span>
        </label>
        <input type="file" accept="image/*" className="input" />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Contact Number</span>
        </label>
        <input
          type="tel"
          placeholder="(###) #### ###"
          className="input placeholder:text-gray-600"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Email Address</span>
        </label>
        <input
          type="email"
          placeholder="contact@example.com"
          className="input placeholder:text-gray-600"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Social Media Link</span>
        </label>
        <input
          type="text"
          placeholder="https://www.linkedin.com/in/your-profile"
          className="input placeholder:text-gray-600"
        />
      </div>
    </>
  );
};

export default PublicContactInputs;
