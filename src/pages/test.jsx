import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import ImgCrop from "antd-img-crop";
import { Upload, Button } from "antd";

const Test = () => {
  const webcamRef = useRef(null);
  const [capturedWebcamImage, setCapturedWebcamImage] = useState(null);
  const [volunteerPhoto, setVolunteerPhoto] = useState([]);

  const handleVolunteerPhotoChange = ({ fileList }) => {
    setVolunteerPhoto(fileList);
  };

  const handleWebcamPhotoCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedWebcamImage(imageSrc);
  };

  const handleWebcamPhotoUpload = () => {
    // Upload capturedWebcamImage to your server or storage
    const newVolunteerPhoto = [
      { uid: "-1", url: capturedWebcamImage, thumbUrl: capturedWebcamImage },
    ];
    setVolunteerPhoto(newVolunteerPhoto);
    setCapturedWebcamImage(null);
  };

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

  const UploadButton = ({ buttonText = "Upload" }) => {
    return (
      <div>
        {/* <PlusOutlined /> */}
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
    <div className="p-14 bg-gray-300">
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

      {capturedWebcamImage && <img src={capturedWebcamImage} alt="Captured from Webcam" />}

      <Webcam
        audio={false}
        height={176}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={176}
      />
      <Button onClick={handleWebcamPhotoCapture} className="btn btn-primary mt-2">
        Capture Webcam Photo
      </Button>

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

      {volunteerPhoto.length > 0 && (
        <Button onClick={handleWebcamPhotoUpload} className="btn btn-primary mt-2">
          Upload Captured Webcam Photo
        </Button>
      )}
    </div>
  );
};

export default Test;
