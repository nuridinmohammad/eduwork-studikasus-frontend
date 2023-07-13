import { useState } from "react";

const Button = () => {
  const [activeButton, setActiveButton] = useState(false);
  return (
    <div className="list-group">
      <button
        onClick={() => setActiveButton((activeButton) => !activeButton)}
        className={`list-group-item ${activeButton ? "active" : ""}`}
        aria-current="true"
      >
        An active item
      </button>
    </div>
  );
};

export default Button;
