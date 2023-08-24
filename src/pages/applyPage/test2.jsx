import React, { useState, useCallback } from "react";
import { Modal, Upload } from "antd";
import CaptureModal from "./CaptureModal";
import CaptureButton from "./CaptureButton";
import UploadButton from "./UploadButton";

const VolunteerContactInputs = () => {
  const [webcamModalOpen, setWebcamModalOpen] = useState(false);
  const [capturedWebcamImage, setCapturedWebcamImage] = useState("");
  const [currentContext, setCurrentContext] = useState("");
  const [volunteerPhotoPreviewOpen, setVolunteerPhotoPreviewOpen] = useState(false);
  const [volunteerPreviewImage, setVolunteerPreviewImage] = useState("");
  const [volunteerPhotoPreviewTitle, setVolunteerPhotoPreviewTitle] = useState("");
  const [volunteerPhotos, setVolunteerPhotos] = useState([]);
  const [NID, setNID] = useState(true);
  const [identityPhotoPreviewOpen, setIdentityPhotoPreviewOpen] = useState(false);
  const [identityPreviewImage, setIdentityPreviewImage] = useState("");
  const [identityPhotoPreviewTitle, setIdentityPhotoPreviewTitle] = useState("");
  const [identityPhotos, setIdentityPhotos] = useState([]);

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
            {renderUploadButton(
              "volunteer",
              "Volunteer photo",
              volunteerPhotos,
              setVolunteerPhotos,
              1
            )}
          </Upload>
        ) : (
          <CaptureButton
            buttonText="Volunteer photo"
            handleModal={() => handleWebcamModalOpen("volunteer")}
          />
        )}
        {/* Capture Modal */}
        {/* Preview Modal */}
        {/* Other input controls */}
      </div>
    </>
  );
};

export default VolunteerContactInputs;
