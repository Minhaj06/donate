import React, { useState } from "react";
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
  // Webcam Capture States
  const [webcamModalOpen, setWebcamModalOpen] = useState(false);
  const [capturedWebcamImage, setCapturedWebcamImage] = useState("");
  const [currentContext, setCurrentContext] = useState("");

  // Volunteer States
  const [volunteerPhotoPreviewOpen, setVolunteerPhotoPreviewOpen] = useState(false);
  const [volunteerPreviewImage, setVolunteerPreviewImage] = useState("");
  const [volunteerPhotoPreviewTitle, setVolunteerPhotoPreviewTitle] = useState("");
  const [volunteerPhotos, setVolunteerPhotos] = useState([]);

  // Identity States
  const [NID, setNID] = useState(true);
  const [identityPhotoPreviewOpen, setIdentityPhotoPreviewOpen] = useState(false);
  const [identityPreviewImage, setIdentityPreviewImage] = useState("");
  const [identityPhotoPreviewTitle, setIdentityPhotoPreviewTitle] = useState("");
  const [identityPhotos, setIdentityPhotos] = useState([]);

  // Handle Webcam Capture Photos
  const handleWebcamModalOpen = (context) => {
    setWebcamModalOpen(!webcamModalOpen);
    setCurrentContext(context);
  };

  const capturedWebcamPhoto = (imageSrc, prevPhotos) => {
    setCapturedWebcamImage(imageSrc);

    let arr = [];

    if (prevPhotos) {
      arr = [...prevPhotos];
    } else {
      arr = [];
    }

    const webcamFile = {
      uid: Math.floor(Math.random() * 1000000),
      name: `${Math.floor(Math.random() * 1000000)}.jpg`,
      status: "error",
      url: imageSrc,
    };

    arr.push(webcamFile);
    return arr;
  };

  const captureWebcamPhoto = (imageSrc) => {
    let arr = [];

    if (currentContext === "volunteer") {
      arr = capturedWebcamPhoto(imageSrc, volunteerPhotos);
      setVolunteerPhotos(arr);
    } else if (currentContext === "identity") {
      arr = capturedWebcamPhoto(imageSrc, identityPhotos);
      setIdentityPhotos(arr);
    }

    handleWebcamModalOpen("");
  };

  // Handle Volunteer Photos
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
    setVolunteerPhotos(newFileList);

  // Handle Identify Photos
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
    setIdentityPhotos(newFileList);

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Photo of Volunteer</span>
        </label>
        {volunteerPhotos.length > 0 ? (
          <Upload
            className="mt-2"
            action=""
            listType="picture-circle"
            fileList={volunteerPhotos}
            onPreview={handleVolunteerPhoto}
            onChange={handleVolunteerPhotoChange}
          >
            {volunteerPhotos.length >= 1 ? null : (
              <UploadButton buttonText="Volunteer photo" />
            )}
          </Upload>
        ) : (
          <CaptureButton
            buttonText="Volunteer photo"
            handleModal={() => handleWebcamModalOpen("volunteer")}
          />
        )}

        <CaptureModal
          modalState={webcamModalOpen}
          handleModalOpen={() => handleWebcamModalOpen("")}
          captureState={captureWebcamPhoto}
          photoSize={{ width: 300, height: 300 }}
        />

        {/* Preview Modal */}
        <Modal
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
        <select
          onChange={() => {
            setNID(!NID);
            setIdentityPhotos([]);
          }}
          className="input"
        >
          <option value="nid">NID</option>
          <option value="birth">Birth Certificate</option>
        </select>

        {NID ? (
          identityPhotos.length > 1 ? (
            <Upload
              className="mt-2"
              action=""
              listType="picture-card"
              fileList={identityPhotos}
              onPreview={handleIdentityPhoto}
              onChange={handleIdentityPhotoChange}
              maxCount={2}
            >
              {identityPhotos.length >= 2 ? null : (
                <UploadButton
                  buttonText={identityPhotos.length <= 0 ? "NID front" : "NID back"}
                />
              )}
            </Upload>
          ) : (
            <>
              <CaptureButton
                buttonText={identityPhotos.length <= 0 ? "NID front" : "NID back"}
                handleModal={() => handleWebcamModalOpen("identity")}
              />{" "}
              <CaptureModal
                modalState={webcamModalOpen}
                handleModalOpen={() => handleWebcamModalOpen("")}
                captureState={captureWebcamPhoto}
                photoSize={{ width: 640, height: 480 }}
              />
            </>
          )
        ) : (
          <>
            {/* <Upload
              className="mt-2"
              action=""
              listType="picture-circle"
              fileList={identityPhotos}
              onPreview={handleIdentityPhoto}
              onChange={handleIdentityPhotoChange}
            >
              {identityPhotos.length >= 1 ? null : (
                <UploadButton buttonText="Birth Certificate" />
              )}
            </Upload> */}
            {identityPhotos.length > 0 ? (
              <Upload
                className="mt-2"
                action=""
                listType="picture-card"
                fileList={identityPhotos}
                onPreview={handleIdentityPhoto}
                onChange={handleIdentityPhotoChange}
                maxCount={2}
              >
                {identityPhotos.length >= 1 ? null : (
                  <UploadButton buttonText="Birth Certificate" />
                )}
              </Upload>
            ) : (
              <>
                <CaptureButton
                  buttonText="Birth Certificate"
                  handleModal={() => handleWebcamModalOpen("identity")}
                />{" "}
                <CaptureModal
                  modalState={webcamModalOpen}
                  handleModalOpen={() => handleWebcamModalOpen("")}
                  captureState={captureWebcamPhoto}
                  photoSize={{ width: 413, height: 531 }}
                />
              </>
            )}
          </>
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
