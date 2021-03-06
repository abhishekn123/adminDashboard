import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import "./vendor.css"
export default function Vendors({
  onChange = () => {},
  vendors = [],
  addMileStone = () => {},
}) {
  const [mode, setMode] = useState("work");
  const [values, setValues] = useState([]);
  useEffect(() => {
    setValues(vendors);
  }, [vendors]);
  return (
    <>
      {values.map((vendor, index) => (
        <Fragment key={index}>
          <p className="h5 text-center p-2">Component {index+1}</p>
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
            <Work
              vendor={vendor}
              onChange={onChange}
              index={index}
              addMileStone={addMileStone}
            />
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
    material: [],
  },
  index = -1,
  addMileStone = () => {},
}) {
  return (
    <>
      <Row>
            <Col><p className="heading"><span>Vendor {index+1}</span></p></Col>
          </Row>
      <Row>
        <Col>
          <p>Work Type</p>
        </Col>
        <Col className="text-right">
          <select className="drop" >
            <option>Only Work</option>
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Vendor Category</p>
        </Col>
        <Col className="text-right">
          <select className="drop" > 
            <option>Carpenter</option>
          </select>
        </Col>
      </Row>
      <Input
        label="heading"
        value={vendor.work?.headerName ?? ""}
        onChange={(e) => {
          onChange(
            { ...vendor, work: { ...vendor.work, headerName: e.target.value } },
            index
          );
        }}
      />
      <div className="mt-2">
      <Textarea
        label="Description"
        value={vendor.work.description}
        className="p-2 "
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
      </div>
      <Row className="mt-2">
        <Col>
        <Input label="quant" type="number"  value={vendor.work.quantity}     onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  work: { ...vendor.work, quantity: e.target.value },
                },
                index
              );
            }}/>
        </Col>
        <Col>
        <Input label="rate" type="number"    value={vendor.work.rate}    onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  work: { ...vendor.work, rate: e.target.value },
                },
                index
              );
            }}/>
        </Col>
        <Col>
        <Input label="unit"  value={vendor.work.units}   onChange={(e) => {
              onChange(
                {
                  ...vendor,
                  work: { ...vendor.work, units: e.target.value },
                },
                index
              );
            }} />
        </Col>
      </Row>
      <Row>
        <Col>???{0}</Col>
        <Col className="text-right cursor">
          <span
          className="navigator"
            style={{ fontSize: "14px" }}
            onClick={() => addMileStone(vendor.id)}
          >
            Add milestones
          </span>
        </Col>
      </Row>
      <AddIcon style={{ fontSize: "18px", cursor: "pointer" }} />
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
    material: [{ item: "", specification: "", quantity: "", rate: "" }],
  },
}) {
  return (
    <>
      {vendor.material.map((exp, i) => (
        <Fragment key={i}>
            <Row>
            <Col><p className="heading"><span>Material {i+1}</span></p></Col>
          </Row>
          <Row>
            <Col md={4} sm={4}>
              <select  className="drop" >
                <option>Carpenter</option>
              </select>
            </Col>
            <Col md={4} sm={4}>
              <Input
                label="item"
                value={exp.item}
                onChange={(e) => {
                  vendor.material[i] = {
                    ...vendor.material[i],
                    item: e.target.value,
                  };
                  onChange(
                    {
                      ...vendor,
                      material: [...vendor.material],
                    },
                    index
                  );
                }}
              />
            </Col>
            <Col md={4} sm={4}>
              <Input
                label="spec"
                value={exp.specification}
                onChange={(e) => {
                  vendor.material[i] = {
                    ...vendor.material[i],
                    specification: e.target.value,
                  };
                  onChange(
                    {
                      ...vendor,
                      material: [...vendor.material],
                    },
                    index
                  );
                }}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={4} sm={4}>
              <select  className="drop" >
                <option>PlyWood</option>
              </select>
            </Col>
            <Col md={4} sm={4}>
              <Input
                label="quant"
                value={exp.quantity}
                type="number"
                onChange={(e) => {
                  vendor.material[i] = {
                    ...vendor.material[i],
                    quantity: e.target.value,
                  };
                  onChange(
                    {
                      ...vendor,
                      material: [...vendor.material],
                    },
                    index
                  );
                }}
              />
            </Col>
            <Col md={4} sm={4}>
              <Input
                label="spec"
                type="number"
                value={exp.rate}
                onChange={(e) => {
                  vendor.material[i] = {
                    ...vendor.material[i],
                    rate: e.target.value,
                  };
                  onChange(
                    {
                      ...vendor,
                      material: [...vendor.material],
                    },
                    index
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>???{exp.quantity * exp.rate || 0}</Col>
          </Row>
        </Fragment>
      ))}
      <AddIcon
        style={{ fontSize: "18px", cursor: "pointer" }}
        onClick={() => {
          let length = vendor.material.length;
          vendor.material.push({
            item: "",
            specification: "",
            quantity: "",
            rate: "",
            id: length > 0 ? length : 0,
          });
          onChange({ ...vendor, material: [...vendor.material] }, index);
        }}
      />
    </>
  );
}
