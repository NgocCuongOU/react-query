import "./App.css";
import Users from "./Users";
import { useState } from "react";
import UserDetail from "./UserDetail";
import CreateUser from "./CreateUser";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ padding: 20, width: "30%", borderRight: "1px solid #f9a0a0" }}
      >
        <Users setUserId={setUserId} />
      </div>
      <div
        style={{ padding: 20, width: "40%", borderRight: "1px solid #f9a0a0" }}
      >
        <UserDetail userId={userId} />
      </div>
      <div style={{ padding: 20, width: "30%" }}>
        <CreateUser />
      </div>
    </div>
  );
}

export default App;
