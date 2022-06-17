import "./App.css";
import Users from "./Users";
import { useState } from "react";
import UserDetail from "./UserDetail";

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ padding: 20, width: "30%", borderRight: "1px solid #f9a0a0" }}
      >
        <Users setUserId={setUserId} />
      </div>
      <div style={{ padding: 20, width: "70%" }}>
        <UserDetail userId={userId} />
      </div>
    </div>
  );
}

export default App;
