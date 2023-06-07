import React from "react";
import { Form } from "react-bootstrap";
import Store from "../store/GeneralContext";

export default function SearchForm() {
  const { searchHandler, onChangeHandler } = Store();

  return (
    <div className="container mt-5">
      <section className="row d-flex justify-content-center">
        <Form className="col-12 col-lg-8 my-2">
          <Form.Group className="d-md-flex" controlId="searchForm">
            <Form.Select onChange={onChangeHandler} aria-label="searchOption">
              <option defaultValue="characters">characters</option>
              <option value="comics">comics</option>
              <option value="creators">creators</option>
              <option value="events">events</option>
              <option value="series">series</option>
            </Form.Select>
            <Form.Control type="text" placeholder=""/>
            <button
              className="search-button"
              onClick={searchHandler}
              type="submit"
            >
              search
            </button>
          </Form.Group>
        </Form>
      </section>
    </div>
  );
}
