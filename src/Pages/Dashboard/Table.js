import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../../Components/Dashboard/Pagination/Pagination";
import { Axios } from "../../API/axios";
import TransformDated from "../../helpers/TransformDated";
import "./table.css";

export default function TableShow(props) {
  const currentUser = props.currentUser || {
    email: "",
  };

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filtredData, setFilterdData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filtredDataByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDated(item.created_at) === date)
      : props.data;

  const filterSearchByDate =
    date.length !== 0
      ? filtredData.filter((item) => TransformDated(item.created_at) === date)
      : filtredData;

  const showWichData =
    search.length > 0 ? filterSearchByDate : filtredDataByDate;

  async function getSearchedData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilterdData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search, date]);

  // Header Show
  const headerShow = props.header.map((item) => <th>{item.name}</th>);

  // Body Show
  const dataShow = showWichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img width={"50px"} src={item[item2.key]} alt="" />
          ) : item2.key === "images" ? (
            <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
              {item[item2.key].map((img) => (
                <img width={"50px"} src={img.image} alt="" />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDated(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "user"
          ) : item[item2.key] === "1996" ? (
            "writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manager"
          ) : item2.key === "description" ? (
            item[item2.key].length > 20 ? (
              item[item2.key].slice(0, 30) + "..."
            ) : (
              item[item2.key]
            )
          ) : item2.key === "price" ? (
            "$" + item[item2.key]
          ) : item2.key === "rating" ? (
            item[item2.key].slice(0, 1)
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.email && " ( You ) "}
        </td>
      ))}
      <td key={key + 1}>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          {currentUser.email !== item.email && (
            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));

  function handlePagination(e) {
    props.setLimit(e.target.value);
    props.setPage(1);
  }

  // TransformDated("2024-02-07T11:16:32.000000Z");

  // Return Data
  return (
    // <table>
    <>
      <div className="col-3 z-n1">
        <Form.Control
          type="search"
          className="my-2"
          aria-label="Search here..."
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>{" "}
      <div className="col-5">
        <Form.Control
          type="date"
          className="my-2"
          placeholder="Search"
          onChange={(e) => {
            setDate(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>
      <div class=".table-responsive px-md-4 px-2 pt-3">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>id</th>
              {headerShow}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.loading ? (
              <tr style={{ textAlign: "center" }}>
                <td colSpan={12}>Loading...</td>
              </tr>
            ) : searchLoading ? (
              <tr style={{ textAlign: "center" }}>
                <td colSpan={12}>Searching...</td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </Table>
      </div>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={handlePagination}
            aria-label="Default select example"
          >
            <option value="1">5</option>
            <option value="2">15</option>
            <option value="25">25</option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          total={props.total}
          typeName={props.typeName}
        />{" "}
      </div>
    </>
    // </table>
  );
}
