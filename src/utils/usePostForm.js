import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "./postSlice";

const usePostForm = (initialFormState) => {
  const [postForm, setPostForm] = useState(initialFormState);
  const dispatch = useDispatch();

  const handleUpload = (url) => {
    setPostForm((prev) => ({
      ...prev,
      mediaUrl: url,
      type: url.endsWith(".mp4") ? "video" : "image",
    }));
  };

  const handleChange = (e) => {
    setPostForm((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const resetForm = () => {
    setPostForm(initialFormState);
  };

  const handleSubmit = (e, resetForm) => {
    e.preventDefault();
    dispatch(createPost({ dataToUpload: postForm }));
    resetForm();
  };

  return {
    postForm,
    handleUpload,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default usePostForm;
