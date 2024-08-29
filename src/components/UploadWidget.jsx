import { FileImage } from "lucide-react";
import { useEffect, useRef } from "react";

const UploadWidget = ({ onUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlrlwy7hg",
        uploadPreset: "atcrtwgm",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          onUpload(result.info.secure_url); // Pass the uploaded media URL to the parent
        }
      }
    );
  }, [onUpload]);

  return (
    <FileImage
      onClick={() => widgetRef.current.open()}
      className="text-primary cursor-pointer"
    />
  );
};

export default UploadWidget;
