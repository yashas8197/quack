import { CalendarDays } from "lucide-react";

const Profile = () => {
  return (
    <div className="container" style={{ height: "92vh", overflowY: "scroll" }}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <img
            className="rounded-circle"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User Avatar"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <h4>Neha Dung</h4>
          <p>@Neha</p>
        </div>

        <div>
          <button className="btn btn-light rounded-pill">Edit Profile</button>
        </div>
      </div>
      <div>
        <p>
          Dancing soul with rhythm in my veins. Embracing melodies through
          movement. 🎶💃 #DanceLover
        </p>
        <p className="float-end">
          <CalendarDays />
          Joined Nov 4, 2016
        </p>
        <p>
          <span>2</span>Posts <span>4</span>Following <span>3</span>Followers
        </p>
      </div>
    </div>
  );
};

export default Profile;
