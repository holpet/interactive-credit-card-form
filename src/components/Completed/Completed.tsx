import "./Completed.scss";
import { icon_complete } from "../../assets/images";

const Completed = () => {
  return (
    <div className="completed-wrapper">
      <img
        src={icon_complete}
        alt="Icon signifying form has been successfully submitted."
      />

      <h1>Thank you!</h1>
      <p>We've added your card details</p>

      <button>Continue</button>
    </div>
  );
};

export default Completed;
