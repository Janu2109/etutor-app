import { useNavigate } from "react-router-dom";

function HomeView() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home</h1>
      <h4 onClick={() => navigate("/login")}>Go To Login</h4>
    </>
  );
}

export default HomeView;
