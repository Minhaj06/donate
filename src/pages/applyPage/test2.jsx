<div className="form-control">
  <label className="label">
    <span className="label-text text-lg">Test</span>
  </label>

  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    listType="picture-card"
    fileList={documents}
    onPreview={handleDocument}
    onChange={handleDocumentChange}
  >
    {documents.length >= 8 ? null : <UploadButton />}
  </Upload>
  <Modal
    open={documentPreviewOpen}
    title={documentPreviewTitle}
    footer={null}
    onCancel={handleDocumentCancel}
  >
    <img
      alt="example"
      style={{
        width: "100%",
      }}
      src={documentPreview}
    />
  </Modal>
</div>;
