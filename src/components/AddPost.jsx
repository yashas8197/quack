import { FileImage, Smile } from "lucide-react";

const AddPost = () => {
  const handleMediaInput = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };
  return (
    <div className="border rounded container p-3 d-flex align-items-start">
      <img
        className="rounded-circle me-3"
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="User Avatar"
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />
      <form className="flex-grow-1">
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Write something..."
          style={{
            border: "none",
            boxShadow: "none",
            resize: "none",
            padding: "10px",
          }}
        ></textarea>

        <div className="d-flex justify-content-between align-items-center">
          <div className="text-primary d-flex align-items-center">
            <label htmlFor="mediaForCreate" className="mx-2">
              <FileImage className="cursor-pointer" />
            </label>
            <input
              onChange={handleMediaInput}
              type="file"
              id="mediaForCreate"
              style={{ display: "none" }}
            />

            <Smile className="mx-2 cursor-pointer" />
          </div>
          <button className="btn btn-primary rounded-pill">Quack</button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
