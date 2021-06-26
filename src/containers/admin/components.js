import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
export default function Components({
  components = [
    {
      unitName: "",
      description: "",
      quantity: 0,
      rate: 0,
      units: "",
    },
  ],
  onChange = () => {},
  addComponent = () => {},
  addVendor = () => {},
}) {
  const [values, setValues] = useState([]);
  useEffect(() => {
    setValues(components);
  }, [components]);
  return (
    <>
      <p className="h5 text-center p-2">{`${
        components[0]?.unitName ?? ""
      } - Add Components`}</p>
      {values.map((component, index) => (
        <Fragment key={index}>
          <Row>
            <Col>
              <FormControl
                as="textarea"
                aria-label="Unit Name"
                className="p-2"
                value={component.description}
                onChange={(e) => {
                  onChange(
                    { ...component, description: e.target.value },
                    index
                  );
                }}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <FormControl
                type="number"
                className="p-2"
                value={component.quantity}
                onChange={(e) => {
                  onChange({ ...component, quantity: e.target.value }, index);
                }}
              />
            </Col>
            <Col>
              <FormControl
                type="number"
                className="p-2"
                value={component.rate}
                onChange={(e) => {
                  onChange({ ...component, rate: e.target.value }, index);
                }}
              />
            </Col>
            <Col>
              <FormControl
                className="p-2"
                value={component.units}
                onChange={(e) => {
                  onChange({ ...component, units: e.target.value }, index);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>₹{component.quantity * component.rate || 0}</Col>
            <Col>
              <span
                onClick={() => {
                  addVendor(component.id);
                }}
                style={{ fontSize: "14px" }}
              >
                Add Vendors/Material
              </span>
            </Col>
          </Row>
        </Fragment>
      ))}
      <AddIcon
        style={{ fontSize: "18px", cursor: "pointer" }}
        onClick={addComponent}
      />
    </>
  );
}