import React, { useCallback, useState } from "react";
import { Modal, Upload } from "antd";
import CaptureModal from "../CaptureModal";
import CaptureButton from "../CaptureButton";
import UploadButton from "../UploadButton";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ResponseInputs = () => {
  // Webcam Capture States
  const [webcamModalOpen, setWebcamModalOpen] = useState(false);
  const [capturedWebcamImage, setCapturedWebcamImage] = useState("");
  const [currentContext, setCurrentContext] = useState("");

  // Applicant States
  const [applicantPhotoPreviewOpen, setApplicantPhotoPreviewOpen] = useState(false);
  const [applicantPreviewImage, setApplicantPreviewImage] = useState("");
  const [applicantPhotoPreviewTitle, setApplicantPhotoPreviewTitle] = useState("");
  const [applicantPhotos, setApplicantPhotos] = useState([]);

  // Identity States
  const [NID, setNID] = useState(true);
  const [identityPhotoPreviewOpen, setIdentityPhotoPreviewOpen] = useState(false);
  const [identityPreviewImage, setIdentityPreviewImage] = useState("");
  const [identityPhotoPreviewTitle, setIdentityPhotoPreviewTitle] = useState("");
  const [identityPhotos, setIdentityPhotos] = useState([]);

  // Document States
  const [documentPreviewOpen, setDocumentPreviewOpen] = useState(false);
  const [documentPreview, setDocumentPreview] = useState("");
  const [documentPreviewTitle, setDocumentPreviewTitle] = useState("");
  const [documents, setDocuments] = useState([]);

  // Handle Webcam Capture Photos
  const handleWebcamModalOpen = useCallback((context) => {
    setWebcamModalOpen(!webcamModalOpen);
    setCurrentContext(context);
  }, []);

  const capturedWebcamPhoto = useCallback((imageSrc, prevPhotos) => {
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
  }, []);

  const captureWebcamPhoto = useCallback(
    (imageSrc) => {
      let arr = [];

      if (currentContext === "Applicant") {
        arr = capturedWebcamPhoto(imageSrc, ApplicantPhotos);
        setApplicantPhotos(arr);
      } else if (currentContext === "identity") {
        arr = capturedWebcamPhoto(imageSrc, identityPhotos);
        setIdentityPhotos(arr);
      }

      handleWebcamModalOpen("");
    },
    [
      currentContext,
      capturedWebcamPhoto,
      applicantPhotos,
      identityPhotos,
      handleWebcamModalOpen,
    ]
  );

  // Handle Applicant Photos
  const handleApplicantPhotoCancel = useCallback(
    () => setApplicantPhotoPreviewOpen(false),
    []
  );

  const handleApplicantPhoto = useCallback(async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setApplicantPreviewImage(file.url || file.preview);
    setApplicantPhotoPreviewOpen(true);
    setApplicantPhotoPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  }, []);

  const handleApplicantPhotoChange = useCallback(({ fileList: newFileList }) => {
    setApplicantPhotos(newFileList);
  }, []);

  // Handle Identify Photos
  const handleIdentityPhotoCancel = useCallback(() => setIdentityPhotoPreviewOpen(false), []);

  const handleIdentityPhoto = useCallback(async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setIdentityPreviewImage(file.url || file.preview);
    setIdentityPhotoPreviewOpen(true);
    setIdentityPhotoPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  }, []);

  const handleIdentityPhotoChange = useCallback(({ fileList: newFileList }) => {
    setIdentityPhotos([]);
  }, []);

  // Handle Documents
  const handleDocumentCancel = useCallback(() => setDocumentPreviewOpen(false), []);

  const handleDocument = useCallback(async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setDocumentPreview(file.url || file.preview);
    setDocumentPreviewOpen(true);
    setDocumentPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  }, []);

  const handleDocumentChange = useCallback(({ fileList: newFileList }) => {
    setDocuments(newFileList);
  }, []);

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Who will you apply for?</span>
        </label>
        <select className="select">
          <option value="myself">Myself</option>
          <option value="family">Family</option>
          <option value="relatives">Relatives</option>
          <option value="public">Public</option>
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">In which mode do you want to apply?</span>
        </label>
        <select className="select">
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="emergency">Emergency</option>
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">What are the types of grants?</span>
        </label>
        <select className="select">
          <option value="medical">Medical</option>
          <option value="education">Education</option>
          <option value="employment">Employment</option>
          <option value="physical disability">Physical disability</option>
          <option value="religious institutions">Religious institutions</option>
          <option value="orphanage">Orphanage</option>
          <option value="natural disaster">Natural disaster</option>
          <option value="developmental work">Developmental work</option>
          <option value="sports">Sports</option>
          <option value="animals">Animals</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Photo of Applicant</span>
        </label>
        {applicantPhotos.length > 0 ? (
          <Upload
            className="mt-2"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-circle"
            fileList={applicantPhotos}
            onPreview={handleApplicantPhoto}
            onChange={handleApplicantPhotoChange}
          >
            {applicantPhotos.length >= 1 ? null : (
              <UploadButton buttonText="Applicant photo" />
            )}
          </Upload>
        ) : (
          <CaptureButton
            buttonText="Applicant photo"
            handleModal={() => handleWebcamModalOpen("Applicant")}
            circle
          />
        )}
        {currentContext === "Applicant" && (
          <CaptureModal
            modalState={webcamModalOpen}
            handleModalOpen={() => handleWebcamModalOpen("")}
            captureState={captureWebcamPhoto}
            photoSize={{ width: 300, height: 300 }}
          />
        )}

        {/* Preview Modal */}
        <Modal
          centered
          open={applicantPhotoPreviewOpen}
          title={applicantPhotoPreviewTitle}
          footer={null}
          onCancel={handleApplicantPhotoCancel}
        >
          <img
            className="border bg-green-400"
            alt="example"
            style={{
              width: "100%",
            }}
            src={applicantPreviewImage}
          />
        </Modal>
      </div>
    </>
  );
};

export default ResponseInputs;
