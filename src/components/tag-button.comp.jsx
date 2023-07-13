/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { memo, useState } from "react";
import { TagFill } from "react-bootstrap-icons";

const TagButton = ({ titleTage, setTag, tag, setClearTag }) => {
  const [active, setActive] = useState(false);
  return (
    <div>
      <div className="d-flex align-items-center">
        <button
          className={`bagde rounded-pill mx-1 bg-${
            active === titleTage ? "warning" : ""
          }`}
          aria-current="true"
          disabled={active === titleTage ? true : false}
          value={titleTage}
          onClick={(e) => {
            if (!tag.includes(titleTage)) {
              setActive(e.target.value);
              setTag((preTag) => [...preTag, titleTage]);
              setClearTag(true);
            }
          }}
        >
          <TagFill />
          {titleTage}
        </button>
      </div>
    </div>
  );
};

export default memo(TagButton);
