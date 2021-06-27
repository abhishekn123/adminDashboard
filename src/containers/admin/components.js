import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Textarea from "../../components/textarea";
import Input from "../../components/input";
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import "./component.css"
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
      <Row>
        <Col className="header" >Upload Drawing/3D</Col>
        <Col className="text-right"><CloudUploadOutlinedIcon/></Col>
      </Row>
      {values.map((component, index) => (
        <Fragment key={index}>
          <Row>
            <Col><p className="heading"><span>Component {index+1}</span></p></Col>
          </Row>
          <Row>
            <Col>
             <Textarea label="Description"  value={component.description}  onChange={(e) => {onChange({ ...component, description: e.target.value },index);}} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
            <Input label="quant" type="number"  value={component.quantity}   onChange={(e) => {onChange({ ...component, quantity: e.target.value }, index);}} />
            </Col>
            <Col>
            <Input label="rate" type="number"  value={component.rate}   onChange={(e) => {onChange({ ...component, rate: e.target.value }, index)}} />
            </Col>
            <Col>
            <Input label="units"  value={component.units}   onChange={(e) => {onChange({ ...component, units: e.target.value }, index);}} />
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
                className="cursor navigator"
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
