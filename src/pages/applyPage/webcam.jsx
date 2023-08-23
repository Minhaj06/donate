import React, { useState } from "react";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Webcam from "react-webcam";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const VolunteerContactInputs = () => {
  const [volunteerPhotoPreviewOpen, setVolunteerPhotoPreviewOpen] = useState(false);
  const [volunteerPreviewImage, setVolunteerPreviewImage] = useState("");
  const [volunteerPhotoPreviewTitle, setVolunteerPhotoPreviewTitle] = useState("");
  const [volunteerPhoto, setVolunteerPhoto] = useState([]);

  const handleVolunteerPhotoChange = ({ fileList: newFileList }) => {
    const capturedImageIndex = newFileList.findIndex((file) => file.capturedImage);

    if (capturedImageIndex !== -1) {
      const capturedImage = newFileList[capturedImageIndex];
      const updatedFileList = newFileList.filter((_, index) => index !== capturedImageIndex);

      setVolunteerPreviewImage(capturedImage.preview);
      setVolunteerPhotoPreviewOpen(true);
      setVolunteerPhotoPreviewTitle(capturedImage.name);
      setVolunteerPhoto(updatedFileList);
    } else {
      setVolunteerPhoto(newFileList);
    }
  };

  const webcamRef = React.useRef(null);
  const captureVolunteerPhoto = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const capturedImage = {
        preview: imageSrc,
        name: "VolunteerCapturedPhoto.jpg", // Customize the name as needed
        capturedImage: true,
      };
      const updatedFileList = [...volunteerPhoto, capturedImage];
      setVolunteerPhoto(updatedFileList);
    }
  }, [webcamRef, volunteerPhoto]);

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
            onPreview={handleVolunteerPhotoChange}
            onChange={handleVolunteerPhotoChange}
          >
            {volunteerPhoto.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  {volunteerPhoto.some((file) => file.capturedImage)
                    ? "Volunteer photo (Captured)"
                    : "Volunteer photo"}
                </div>
              </div>
            )}
          </Upload>
        </ImgCrop>
        <Modal
          open={volunteerPhotoPreviewOpen}
          title={volunteerPhotoPreviewTitle}
          footer={null}
          onCancel={() => setVolunteerPhotoPreviewOpen(false)}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={volunteerPreviewImage}
          />
        </Modal>
      </div>
      <div className="form-control">{/* Other controls */}</div>
    </>
  );
};

export default VolunteerContactInputs;
