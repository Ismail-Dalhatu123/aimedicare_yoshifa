import player from "../assets/png/player.png";
import Map from "./Map";

function SInfo(props) {
  return (
    <div className="s_info container containerv card">
      <div className="p_p_info">
        <div className="name">
          <h3>Ismail Dalhatu</h3>
          <span>ismaildalhatu442@gmail.com</span>
        </div>
        <div>
          <table>
            <tr>
              <td>Date of Birth:</td>
              <td>10 February 2002</td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>Male</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>+2349022314973</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="vif">
        <div className="h">
          <div>
            <span>Height</span>
            <h2>
              5.65<span>ft</span>
            </h2>
          </div>
        </div>
        <div className="img">
          <img src={player} alt="" />
        </div>
        <div className="h">
          <div>
            <span>Weight</span>
            <h2>
              50<span>kg</span>
            </h2>
          </div>
        </div>
      </div>
      <Map />
    </div>
  );
}

export default SInfo;
