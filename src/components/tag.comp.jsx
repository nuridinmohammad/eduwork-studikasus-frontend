import { TagFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

const TagComp = ({ tag }) => {
  // console.log(tag);
  return (
    <>
      {tag && tag.length
        ? tag.map((item) => (
            <button
            key={item._id}
              style={{ marginLeft: "4px" }}
              className="badge rounded-pill text-bg-warning"
            >
              <TagFill />
              {item.name.toLowerCase()}
            </button>
          ))
        : ""}
    </>
  );
};

export default TagComp;

TagComp.propTypes = {
  tag: PropTypes.array,
};
