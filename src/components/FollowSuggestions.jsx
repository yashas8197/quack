const FollowSuggestions = () => {
  return (
    <div
      className="p-4 rounded shadow-sm"
      style={{ backgroundColor: "#1c1c1c" }}
    >
      <p className="h4 text-white mb-3">Who to Follow?</p>
      <div className="d-flex align-items-center justify-content-between my-2">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User Avatar"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div className="ms-3">
            <p className="my-0 text-white fw-bold">Jane Doe</p>
            <p className="text-secondary mb-0">@janeDoe</p>
          </div>
        </div>
        <div className="mx-4">
          <button className="btn btn-outline-light btn-sm">Follow</button>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User Avatar"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div className="ms-3">
            <p className="my-0 text-white fw-bold">Jane Doe</p>
            <p className="text-secondary mb-0">@janeDoe</p>
          </div>
        </div>
        <div className="mx-4">
          <button className="btn btn-outline-light btn-sm">Follow</button>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User Avatar"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div className="ms-3">
            <p className="my-0 text-white fw-bold">Jane Doe</p>
            <p className="text-secondary mb-0">@janeDoe</p>
          </div>
        </div>
        <div className="mx-4">
          <button className="btn btn-outline-light btn-sm">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default FollowSuggestions;
