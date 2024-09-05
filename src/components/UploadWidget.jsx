import { Camera } from "lucide-react";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const UploadWidget = ({ onUpload }) => {
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!cloudinaryRef.current && window.cloudinary) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dlrlwy7hg",
          uploadPreset: "atcrtwgm",
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            return;
          }
          if (result && result.event === "success") {
            onUpload(result.info.secure_url);
          }
        }
      );
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current = null;
      }
    };
  }, [onUpload]);

  return (
    <Camera
      onClick={() => widgetRef.current?.open()}
      className="cursor-pointer"
    />
  );
};

UploadWidget.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default UploadWidget;
