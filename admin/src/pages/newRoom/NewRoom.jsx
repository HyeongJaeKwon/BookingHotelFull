import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  // const [file, setFile] = useState("");

  const [info, setInfo] = useState({});

  const [hotelID, setHotelID] = useState("");

  const [rooms, setRooms] = useState([]);

  const handleSelect = (e) => {
    console.log(e.target.value);
    setHotelID(e.target.value);
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((each) => {
      return { number: each };
    });

    try {
      await axios.post(`/rooms/${hotelID}`, {
        ...info,
        roomNumbers: roomNumbers,
      });
      console.log("success!!!");
    } catch (err) {
      console.log(err);
    }
  };

  const { data, loading, error } = useFetch("/hotels");

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new rooms!</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <form>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Rooms Numbers</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="Type room numbers with comma"
                ></textarea>
              </div>

              <div className="formInput">
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={handleSelect}>
                  {loading
                    ? "Loading"
                    : data &&
                      data.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
