import React, { useCallback, useState } from "react";
import { Modal, Upload } from "antd";
import UploadButton from "./UploadButton";
import ImgCrop from "antd-img-crop";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PublicContactInputs = () => {
  // Profile Photo States
  const [profilePhotoPreviewOpen, setProfilePhotoPreviewOpen] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");
  const [profilePhotoPreviewTitle, setProfilePhotoPreviewTitle] = useState("");
  const [profilePhotos, setProfilePhotos] = useState([]);

  const handleProfilePhotoCancel = useCallback(() => setProfilePhotoPreviewOpen(false), []);

  const handleProfilePhoto = useCallback(async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setProfilePhotoPreview(file.url || file.preview);
    setProfilePhotoPreviewOpen(true);
    setProfilePhotoPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  }, []);

  const handleProfilePhotoChange = useCallback(({ fileList: newFileList }) => {
    setProfilePhotos(newFileList);
  }, []);

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Profile Photos</span>
        </label>
        <Upload
          className="mt-2"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={profilePhotos}
          onPreview={handleProfilePhoto}
          onChange={handleProfilePhotoChange}
          maxCount={5}
        >
          {profilePhotoPreviewTitle.length >= 5 ? null : <UploadButton buttonText="Upload" />}
        </Upload>
        <Modal
          open={profilePhotoPreview}
          title={profilePhotoPreviewTitle}
          footer={null}
          onCancel={handleProfilePhotoCancel}
        >
          <img
            className="border bg-green-400"
            alt="example"
            style={{
              width: "100%",
            }}
            src={profilePhotoPreview}
          />
        </Modal>
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
