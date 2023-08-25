import React, { useState, useCallback } from "react";
import { Modal, Upload } from "antd";
import CaptureModal from "./CaptureModal";
import CaptureButton from "./CaptureButton";
import UploadButton from "./UploadButton";

const VolunteerContactInputs = () => {
  const [webcamModalOpen, setWebcamModalOpen] = useState(false);
  const [currentContext, setCurrentContext] = useState("");
  const [volunteerPhotos, setVolunteerPhotos] = useState([]);
  const [identityPhotos, setIdentityPhotos] = useState({ front: [], back: [] });
  const [identityPhotoSide, setIdentityPhotoSide] = useState("front");
  const [identityPhotoPreviewOpen, setIdentityPhotoPreviewOpen] = useState(false);
  const [identityPreviewImage, setIdentityPreviewImage] = useState("");
  const [identityPhotoPreviewTitle, setIdentityPhotoPreviewTitle] = useState("");

  const handleWebcamModalOpen = useCallback((context) => {
    setWebcamModalOpen((prevOpen) => !prevOpen);
    setCurrentContext(context);
  }, []);

  const capturedWebcamPhoto = (imageSrc, prevPhotos) => {
    const webcamFile = {
      uid: Math.floor(Math.random() * 1000000),
      name: `${Math.floor(Math.random() * 1000000)}.jpg`,
      status: "error",
      url: imageSrc,
    };

    return [...prevPhotos, webcamFile];
  };

  const captureWebcamPhoto = (imageSrc) => {
    if (currentContext === "volunteer") {
      setVolunteerPhotos((prevPhotos) => capturedWebcamPhoto(imageSrc, prevPhotos));
    } else if (currentContext === "identity") {
      setIdentityPhotos((prevPhotos) => ({
        ...prevPhotos,
        [identityPhotoSide]: capturedWebcamPhoto(imageSrc, prevPhotos[identityPhotoSide]),
      }));
    }

    handleWebcamModalOpen("");
  };

  const handlePhotoPreview = useCallback((imageSrc, setTitle, setOpen) => {
    setTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    setOpen(true);
  }, []);

  const handlePhotoCancel = useCallback((setOpen) => {
    setOpen(false);
  }, []);

  const handlePhotoChange = useCallback((newFileList, setPhotos) => {
    setPhotos(newFileList);
  }, []);

  const handlePhotoCapture = useCallback(
    (context, photoSize, photos, setPhotos) => {
      handleWebcamModalOpen(context);
      handlePhotoChange(capturedWebcamPhoto(photoSize, photos), setPhotos);
    },
    [handleWebcamModalOpen, handlePhotoChange]
  );

  const handlePhotoSideChange = useCallback((newSide) => {
    setIdentityPhotoSide(newSide);
  }, []);

  const renderUploadButton = (context, buttonText, photos, setPhotos, maxCount) => {
    if (photos.length >= (maxCount || 1)) {
      return null;
    }

    if (context === "identity") {
      return (
        <UploadButton
          buttonText={photos.length <= 0 ? "NID front" : "NID back"}
          handleModal={() =>
            handlePhotoCapture(context, { width: 640, height: 480 }, photos, setPhotos)
          }
        />
      );
    }

    return (
      <UploadButton
        buttonText={photos.length <= 0 ? "Volunteer photo" : "Capture another"}
        handleModal={() =>
          handlePhotoCapture(context, { width: 300, height: 300 }, photos, setPhotos)
        }
      />
    );
  };

  return (
    <>
      {/* Volunteer Photo */}
      {/* Identity Photo */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Photo of NID or Birth Certificate</span>
        </label>
        <select
          onChange={() => {
            setNID(!NID);
            setIdentityPhotos({ front: [], back: [] });
          }}
          className="input"
        >
          <option value="nid">NID</option>
          <option value="birth">Birth Certificate</option>
        </select>

        {NID ? (
          <Upload
            className="mt-2"
            action=""
            listType="picture-card"
            fileList={identityPhotos[identityPhotoSide]}
            onPreview={handleIdentityPhoto}
            onChange={handleIdentityPhotoChange}
            maxCount={2}
          >
            {identityPhotos[identityPhotoSide].length >= 2 ? null : (
              <UploadButton
                buttonText={
                  identityPhotos[identityPhotoSide].length <= 0 ? "NID front" : "NID back"
                }
              />
            )}
          </Upload>
        ) : (
          <Upload
            className="mt-2"
            action=""
            listType="picture-card"
            fileList={identityPhotos[identityPhotoSide]}
            onPreview={handleIdentityPhoto}
            onChange={handleIdentityPhotoChange}
            maxCount={2}
          >
            {identityPhotos[identityPhotoSide].length >= 1 ? null : (
              <UploadButton buttonText="Birth Certificate" />
            )}
          </Upload>
        )}
        {currentContext === "identity" && (
          <CaptureModal
            modalState={webcamModalOpen}
            handleModalOpen={() => handleWebcamModalOpen("")}
            captureState={captureWebcamPhoto}
            photoSize={{ width: 640, height: 480 }}
          />
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
      {/* Other input controls */}
    </>
  );
};

export default VolunteerContactInputs;
