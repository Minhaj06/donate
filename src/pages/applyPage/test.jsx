import React, { useState } from "react";
import { Modal, Upload } from "antd";
import CaptureModal from "./CaptureModal";
import CaptureButton from "./CaptureButton";
import UploadButton from "./UploadButton";

// ... (getBase64 function)

const VolunteerContactInputs = () => {
  const [webcamModalOpen, setWebcamModalOpen] = useState(false);
  const [capturedWebcamImage, setCapturedWebcamImage] = useState("");
  const [currentContext, setCurrentContext] = useState(""); // Add this state

  const [volunteerPhotoPreviewOpen, setVolunteerPhotoPreviewOpen] = useState(false);
  const [volunteerPreviewImage, setVolunteerPreviewImage] = useState("");
  const [volunteerPhotoPreviewTitle, setVolunteerPhotoPreviewTitle] = useState("");
  const [volunteerPhotos, setVolunteerPhotos] = useState([]); // Renamed to volunteerPhotos

  const [NID, setNID] = useState(true);
  const [identityPhotoPreviewOpen, setIdentityPhotoPreviewOpen] = useState(false);
  const [identityPreviewImage, setIdentityPreviewImage] = useState("");
  const [identityPhotoPreviewTitle, setIdentityPhotoPreviewTitle] = useState("");
  const [identityPhotos, setIdentityPhotos] = useState([]);

  const handleWebcamModalOpen = (context) => {
    setWebcamModalOpen(!webcamModalOpen);
    setCurrentContext(context); // Store the current capturing context
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

  // ... handleVolunteerPhoto and handleIdentityPhoto ...

  return (
    <>
      {/* ... your existing JSX ... */}

      <CaptureModal
        modalState={webcamModalOpen}
        handleModalOpen={handleWebcamModalOpen}
        captureState={captureWebcamPhoto}
      />

      {/* ... your existing JSX ... */}
    </>
  );
};

export default VolunteerContactInputs;
