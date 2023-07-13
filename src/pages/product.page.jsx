/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductByCategory,
  fetchProductByKeyword,
  fetchProductByTag,
  fetchProducts,
  setNextPage,
} from "../app/features/product/actions.product";
import { getCategories, getTags } from "../app/apis/product.api";
import CardProductComp from "../components/card-product.comp";
import BreadcrumbComp from "../components/breadcrumb.comp";
import TagButton from "../components/tag-button.comp";
import { TrashFill } from "react-bootstrap-icons";

function ProductPage() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clearTag, setClearTag] = useState(false);

  // filter
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState([]);
  const [skip, setSkip] = useState(0);

  // fetch api
  const fetchTags = async () => {
    const { data } = await getTags();
    setTags(data);
  };
  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchTags();
    fetchCategories();
    dispatch(fetchProductByCategory(category));
    dispatch(fetchProductByKeyword(query));
    dispatch(fetchProductByTag(tag));
    dispatch(setNextPage(skip));
    dispatch(fetchProducts());
  }, [dispatch, category, query, tag, skip]);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-3 mt-2 d-flex align-items-center gap-3">
          <div>Kategori</div>
          <select
            className="form-select"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            name="category"
            role="button"
          >
            <option value>-</option>
            {categories.length
              ? categories.map((item) => (
                  <option key={item._id}>{item.name}</option>
                ))
              : "Loading.."}
          </select>
        </div>
        <div className="col-md-9">
          <div className="input-group mt-2">
            <input
              className="bg-transparent form-control border border-1 text-dark"
              placeholder="Cari.."
              type="text"
              name="keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <div className="d-flex flex-wrap align-items-center">
          <span className="ml-3">Tags :</span>
          {tags.length
            ? tags.map((item) => (
                <TagButton
                  key={item._id}
                  titleTage={item.name}
                  setTag={setTag}
                  tag={tag}
                  setClearTag={setClearTag}
                />
              ))
            : "loading.."}
          {clearTag ? (
            <TrashFill
              color="red"
              role="button"
              className="mx-2"
              onClick={() => {
                setClearTag(false);
                setTag([]);
                location.reload();
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mt-5 d-flex flex-wrap justify-content-center gap-3">
        {products.skip >= 0 && products.skip < products.totalData ? (
          <CardProductComp products={products.data} />
        ) : (
          <h6 className="text-center">No products found</h6>
        )}
      </div>
      <div>
        <BreadcrumbComp
          page={products.page}
          totalPages={products.totalPages}
          setSkip={setSkip}
          skip={skip}
          pagination={products.pagination}
        />
      </div>
    </div>
  );
}

export default ProductPage;
