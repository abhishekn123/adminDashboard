import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
export default function Vendors({ onChange = () => {}, vendors = [] }) {
  const [mode, setMode] = useState("work");
  const [values, setValues] = useState([]);
  useEffect(() => {
    setValues(vendors);
  }, [vendors]);
  return (
    <>
      {values.map((vendor, index) => (
        <Fragment key={index}>
          <p className="h5 text-center p-2">{vendor.compName}</p>
          <Row>
            <Col>
              <p className="text-center h6" onClick={() => setMode("work")}>
                Work
              </p>
            </Col>
            <Col>
              <p className="text-center h6" onClick={() => setMode("material")}>
                Material
              </p>
            </Col>
          </Row>
          {mode === "work" ? (
            <Work vendor={vendor} onChange={onChange} index={index} />
          ) : (
            <Material vendor={vendor} onChange={onChange} index={index} />
          )}
        </Fragment>
      ))}
    </>
  );
}

function Work({
  onChange = () => {},
  vendor = {
    id: 0,
    compName: "",
    work: { headerName: "", description: "", quantity: 0, rate: 0, units: "" },
    material: {},
  },
  index = -1,
}) {
  return (
    <>
      <Row>
        <Col>
          <p>Work Type</p>
        </Col>
        <Col className="text-right">
          <select>
            <option>Only Work</option>
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Vendor Category</p>
        </Col>
        <Col className="text-right">
          <select>
            <option>Carpenter</option>
          </select>
        </Col>
      </Row>
      <FormControl
        className="p-2"
        value={vendor.work.headerName}
        onChange={(e) => {
          onChange(
            {
              ...vendor,
              work: { ...vendor.work, headerName: e.target.value },
            },
            index
          );
        }}
      />
      <FormControl
        as="textarea"
        aria-label="Unit Name"
        className="mt-2"
        value={vendor.work.description}
        onChange={(e) => {
          onChange(
            {
              ...vendor,
              work: { ...vendor.work, description: e.target.value },
            },
            index
          );
        }}
      />
      <Row className="mt-2">
        <Col>
          <FormControl
            type="number"
            className="p-2"
            value={vendor.work.quantity}
            onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  work: { ...vendor.work, quantity: e.target.value },
                },
                index
              );
            }}
          />
        </Col>
        <Col>
          <FormControl
            type="number"
            className="p-2"
            value={vendor.work.rate}
            onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  work: { ...vendor.work, rate: e.target.value },
                },
                index
              );
            }}
          />
        </Col>
        <Col>
          <FormControl
            className="p-2"
            value={vendor.work.units}
            onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  work: { ...vendor.work, units: e.target.value },
                },
                index
              );
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>₹{0}</Col>
        <Col className="text-right">
          <span style={{ fontSize: "14px" }}>Add milestones</span>
        </Col>
      </Row>
      <AddIcon
        style={{ fontSize: "18px", cursor: "pointer" }}
        onClick={() => {}}
      />
    </>
  );
}

function Material({
  onChange = () => {},
  index = -1,
  vendor = {
    id: 0,
    compName: "",
    work: { headerName: "", description: "", quantity: 0, rate: 0, units: "" },
    material: { item: "", specification: "", quantity: "", rate: "" },
  },
}) {
  return (
    <>
      <Row>
        <Col md={4} sm={4}>
          <select>
            <option>Carpenter</option>
          </select>
        </Col>
        <Col md={4} sm={4}>
          <FormControl
            value={vendor.material.item}
            onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  material: { ...vendor.material, item: e.target.value },
                },
                index
              );
            }}
            className="p-2"
          />
        </Col>
        <Col md={4} sm={4}>
          <FormControl
            value={vendor.material.specification}
            onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  material: {
                    ...vendor.material,
                    specification: e.target.value,
                  },
                },
                index
              );
            }}
            className="p-2"
          />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={4}>
          <select>
            <option>PlyWood</option>
          </select>
        </Col>
        <Col md={4} sm={4}>
          <FormControl
            type="number"
            value={vendor.material.quantity}
            onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  material: { ...vendor.material, quantity: e.target.value },
                },
                index
              );
            }}
            className="p-2"
          />
        </Col>
        <Col md={4} sm={4}>
          <FormControl
            type="number"
            value={vendor.material.rate}
            className="p-2"
            onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  material: { ...vendor.material, rate: e.target.value },
                },
                index
              );
            }}
          />
        </Col>
      </Row>
    </>
  );
}
