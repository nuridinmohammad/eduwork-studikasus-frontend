/* eslint-disable react-refresh/only-export-components */
import { Card } from "react-bootstrap";
import { CartPlusFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import TagComp from "./tag.comp";
import imageDummy from "../assets/react.svg";
import { formatRupiah } from "../utils";
import { addItem } from "../app/features/cart/actions.cart";
import { useDispatch } from "react-redux";
import { memo } from "react";

const CardProductComp = ({ products }) => {
  const dispatch = useDispatch();
  return (
    <>
      {products
        ? products.map((item) => (
            <div key={item._id}>
              <Card style={{ width: "16rem" }}>
                <div className="row d-flex justify-content-center">
                  <Card.Img
                    variant="top"
                    style={{ width: "8rem" }}
                    src={imageDummy}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{item.name.toLowerCase()}</Card.Title>
                  <TagComp tag={item.tags} />
                  <Card.Text>{item.description.toLowerCase()}</Card.Text>
                  <Card.Text>{formatRupiah(item.price)}</Card.Text>
                  <div
                    className="row bg-primary p-1 rounded"
                    onClick={() => {
                      dispatch(addItem(item));
                    }}
                  >
                    <CartPlusFill
                      className="text-white"
                      size={20}
                      role="button"
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        : null}
    </>
  );
};

export default memo(CardProductComp);

CardProductComp.propTypes = {
  products: PropTypes.array,
};
