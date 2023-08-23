import React, { useRef, useState } from "react";
import { Modal, Upload } from "antd";
import CaptureModal from "./CaptureModal";
import CaptureButton from "./CaptureButton";
import UploadButton from "./UploadButton";

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

  // dfkdfsk
  const [webcamModalOpen, setWebcamModalOpen] = useState(false);
  const [capturedWebcamImage, setCapturedWebcamImage] = useState("");

  const captureWebcamVolunteerPhoto = (imageSrc) => {
    const arr = capturedWebcamPhoto(imageSrc);

    setVolunteerPhoto(arr);
    handleWebcamVolunteerModalOpen();
  };
  const capturedWebcamPhoto = (imageSrc) => {
    setCapturedWebcamImage(imageSrc);

    const arr = [];
    const webcamFile = {
      uid: Math.floor(Math.random() * 1000000),
      name: `${Math.floor(Math.random() * 1000000)}.jpg`,
      status: "error",
      url: imageSrc,
    };

    arr.push(webcamFile);
    return arr;
  };

  const handleWebcamVolunteerModalOpen = () => {
    setWebcamModalOpen(!webcamModalOpen);
  };

  // Handle Identity Photos
  const [NID, setNID] = useState(true);
  const [identityPhotoPreviewOpen, setIdentityPhotoPreviewOpen] = useState(false);
  const [identityPreviewImage, setIdentityPreviewImage] = useState("");
  const [identityPhotoPreviewTitle, setIdentityPhotoPreviewTitle] = useState("");
  const [identityPhoto, setIdentityPhoto] = useState([]);

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

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Photo of Volunteer</span>
        </label>
        {volunteerPhoto.length > 0 ? (
          <Upload
            className="mt-2"
            action=""
            listType="picture-circle"
            fileList={volunteerPhoto}
            onPreview={handleVolunteerPhoto}
            onChange={handleVolunteerPhotoChange}
          >
            {volunteerPhoto.length >= 1 ? null : <UploadButton buttonText="Volunteer photo" />}
          </Upload>
        ) : (
          <CaptureButton
            buttonText="Volunteer photo"
            handleModal={handleWebcamVolunteerModalOpen}
          />
        )}
        {/* <Modal
          key="volunteerPhotoCaptureModal"
          centered
          title="Take a photo"
          open={webcamModalOpen}
          onCancel={handleWebcamVolunteerModalOpen}
          footer={[
            <button
              key="volunterPhotoCaptureModalClose"
              onClick={handleWebcamVolunteerModalOpen}
              className="btn btn-error btn-sm normal-case"
            >
              , Close
            </button>,
          ]}
        >
          <div className="flex flex-col items-center">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <div>
              <button
                onClick={captureWebcamVolunteerPhoto}
                className="btn btn-primary btn-sm normal-case mt-2"
              >
                Capture
              </button>
            </div>
          </div>
        </Modal> */}
        {/* const CaptureModal = ({(modalState, handleModalOpen, captureState)}) */}

        <CaptureModal
          modalState={webcamModalOpen}
          handleModalOpen={handleWebcamVolunteerModalOpen}
          captureState={captureWebcamVolunteerPhoto}
        />

        {/* Preview Modal */}
        <Modal
          key="volunteerPhotoPreviewModal"
          centered
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
          identityPhoto.length > 0 ? (
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
                  key="identityPhotoUploadButton"
                  buttonText={identityPhoto.length <= 0 ? "NID front side" : "NID back side"}
                />
              )}
            </Upload>
          ) : (
            <CaptureButton
              buttonText="Volunteer photo"
              handleModal={handleWebcamVolunteerModalOpen}
            />
          )
        ) : (
          <Upload
            className="mt-2"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e7"
            listType="picture-circle"
            fileList={identityPhoto}
            onPreview={handleIdentityPhoto}
            onChange={handleIdentityPhotoChange}
          >
            {identityPhoto.length >= 1 ? null : (
              <UploadButton
                key="birthCertificatePhotoUploadButton"
                buttonText="Birth Certificate"
              />
            )}
          </Upload>
        )}
        <Modal
          key="identityPhotoPreviewModal"
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
