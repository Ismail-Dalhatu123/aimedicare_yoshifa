import SInfo from "../components/SInfo";
import { Route, Routes } from "react-router-dom";
import HeartRate from "./HeartRate";
import BloodOxygen from "./BloodOxygen";
import Pedometer from "./Pedometer";
import SVitals from "../components/SVitals";
import "../css/view_student.css";
import C404 from "./404";

function ViewStudent(props) {
  return (
    <div className="view_student">
      <SInfo />
      <div className="s_routes container containerv">
        <Routes>
          <Route path="/" element={<HeartRate />} />
          <Route path="/blood-oxygen" element={<BloodOxygen />} />
          <Route path="/pedometer" element={<Pedometer />} />
          <Route path="*" element={<C404 className="v_s_404" />} />
        </Routes>
      </div>
      <SVitals />
    </div>
  );
}

export default ViewStudent;
