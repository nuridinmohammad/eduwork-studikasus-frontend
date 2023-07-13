/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { useState } from "react";
import { memo } from "react";

const BreadcrumbComp = ({ page, totalPages, setSkip, skip }) => {
  const [toPage, setToPage] = useState(page);

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center align-items-center gap-3">
        <button
          className="btn btn-secondary"
          disabled={skip < 1 ? true : false}
          onClick={() => {
            setSkip(0);
            if (toPage > 1) {
              setToPage(toPage - 1);
            }
          }}
        >
          <ArrowLeft />
          <span className="mx-2">prev</span>
        </button>
        <button
          className="btn btn-secondary"
          disabled={skip > 1 ? true : false}
          onClick={() => {
            setSkip(3);
            if (skip < toPage) {
              setToPage(toPage + 1);
            }
          }}
        >
          <span className="mx-2">next</span>
          <ArrowRight />
        </button>
      </div>
      <div className="text-center">
        <span>
          Page : {toPage >= totalPages ? totalPages : 1}/{totalPages}{" "}
        </span>
        <h6 className="text-center" style={{ marginTop: "0.5rem" }}></h6>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(BreadcrumbComp);

BreadcrumbComp.propTypes = {
  totalPages: PropTypes.number,
  page: PropTypes.number,
};
