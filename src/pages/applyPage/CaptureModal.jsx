import React, { useRef } from "react";
import { Modal } from "antd";
import Webcam from "react-webcam";

const CaptureModal = ({ modalState, handleModalOpen, captureState }) => {
  const webcamRef = useRef(null);

  return (
    <Modal
      key="volunteerPhotoCaptureModal"
      centered
      title="Take a photo"
      open={modalState}
      onCancel={handleModalOpen}
      footer={[
        <button
          key="volunteerPhotoCaptureModalClose"
          onClick={handleModalOpen}
          className="btn btn-error btn-sm normal-case"
        >
          Close
        </button>,
      ]}
    >
      <div className="flex flex-col items-center">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <div>
          <button
            onClick={() => captureState(webcamRef.current.getScreenshot())}
            className="btn btn-primary btn-sm normal-case mt-2"
          >
            Capture
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CaptureModal;
