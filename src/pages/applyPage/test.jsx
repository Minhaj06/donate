import React, { useState } from "react";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const VolunteerContactInputs = () => {
  // Handle Volunteer Photos
  const [volunteerPhotoPreviewOpen, setVolunteerPhotoPreviewOpen] = useState(false);
  const [volunteerPreviewImage, setVolunteerPreviewImage] = useState("");
  const [volunteerPhotoPreviewTitle, setVolunteerPhotoPreviewTitle] = useState("");
  const [volunteerPhoto, setVolunteerPhoto] = useState([]);

  // Handle Identity Photos
  const [NID, setNID] = useState(true);
  const [identityPhotoPreviewOpen, setIdentityPhotoPreviewOpen] = useState(false);
  const [identityPreviewImage, setIdentityPreviewImage] = useState("");
  const [identityPhotoPreviewTitle, setIdentityPhotoPreviewTitle] = useState("");
  const [identityPhoto, setIdentityPhoto] = useState([]);

  // Volunteer Photo
  const handleVolunteerPhotoCancel = () => setVolunteerPhotoPreviewOpen(false);
  const handleVolunteerPhoto = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setVolunteerPreviewImage(file.url || file.preview);
    setVolunteerPhotoPreviewOpen(true);
    setVolunteerPhotoPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleVolunteerPhotoChange = ({ fileList: newFileList }) =>
    setVolunteerPhoto(newFileList);

  // Identity Photo
  const handleIdentityPhotoCancel = () => setIdentityPhotoPreviewOpen(false);
  const handleIdentityPhoto = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setIdentityPreviewImage(file.url || file.preview);
    setIdentityPhotoPreviewOpen(true);
    setIdentityPhotoPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleIdentityPhotoChange = ({ fileList: newFileList }) =>
    setIdentityPhoto(newFileList);

  // const UploadButton = (
  //   <div>
  //     <PlusOutlined />
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </div>
  // );

  const UploadButton = ({ buttonText = "Upload" }) => {
    return (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          {buttonText}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Photo of Volunteer</span>
        </label>

        <ImgCrop rotationsSlider>
          <Upload
            className="mt-12"
            action=""
            listType="picture-circle"
            fileList={volunteerPhoto}
            onPreview={handleVolunteerPhoto}
            onChange={handleVolunteerPhotoChange}
          >
            {volunteerPhoto.length >= 1 ? null : <UploadButton buttonText="Volunteer photo" />}
          </Upload>
        </ImgCrop>

        <Modal
          open={volunteerPhotoPreviewOpen}
          title={volunteerPhotoPreviewTitle}
          footer={null}
          onCancel={handleVolunteerPhotoCancel}
        >
          <img
            className="border bg-green-400"
            alt="example"
            style={{
              width: "100%",
            }}
            src={volunteerPreviewImage}
          />
        </Modal>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Photo of NID or Birth Certificate</span>
        </label>
        <select onChange={() => setNID(!NID)} className="input">
          <option value="nid">NID</option>
          <option value="birth">Birth Certificate</option>
        </select>

        {NID ? (
          <ImgCrop rotationsSlider>
            <Upload
              className="mt-2"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e7"
              listType="picture-card"
              fileList={identityPhoto}
              onPreview={handleIdentityPhoto}
              onChange={handleIdentityPhotoChange}
              maxCount={2}
            >
              {identityPhoto.length >= 2 ? null : (
                <UploadButton
                  buttonText={identityPhoto.length <= 0 ? "NID front side" : "NID back side"}
                />
              )}
            </Upload>
          </ImgCrop>
        ) : (
          <ImgCrop rotationSlider>
            <Upload
              className="mt-2"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e7"
              listType="picture-circle"
              fileList={identityPhoto}
              onPreview={handleIdentityPhoto}
              onChange={handleIdentityPhotoChange}
            >
              {identityPhoto.length >= 1 ? null : (
                <UploadButton buttonText="Birth Certificate" />
              )}
            </Upload>
          </ImgCrop>
        )}
        <Modal
          open={identityPhotoPreviewOpen}
          title={identityPhotoPreviewTitle}
          footer={null}
          onCancel={handleIdentityPhotoCancel}
        >
          <img
            className="border bg-green-400"
            alt="example"
            style={{
              width: "100%",
            }}
            src={identityPreviewImage}
          />
        </Modal>
      </div>
      {/* <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Birth Certificate</span>
        </label>
        <input type="file" accept=".pdf, .jpg, .jpeg, .png" className="input" />
      </div> */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Other Documents</span>
        </label>
        <input type="file" accept=".pdf, .jpg, .jpeg, .png" multiple className="input" />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Email</span>
        </label>
        <input
          type="email"
          placeholder="info@site.com"
          className="input placeholder:text-gray-600"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Telephone Number</span>
        </label>
        <input
          type="tel"
          placeholder="(###) #### ###"
          className="input placeholder:text-gray-600"
        />
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
    </>
  );
};

export default VolunteerContactInputs;
