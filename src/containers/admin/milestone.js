import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import Input from "../../components/input";
import "./milestone.css";
export default function Milestone({
  mileStone = [],
  onChange = () => {},
  addMileStone = () => {},
  removeMileStone = () => {},
}) {
  const [values, setValues] = useState([]);
  const [state, setState] = useState({ open: false, index: -1 });
  useEffect(() => {
    setValues(mileStone);
  }, [mileStone]);
  return (
    <>
      <Popup state={state} setState={setState} onOk={removeMileStone} />
      <p className="h5 text-center p-2">Vendor-Milestones</p>
      {values.map((mile, ind) => (
        <Fragment key={ind} >
          <Row className="mt-2" >
            <Col md={5} sm={5} >
              <Input
                label="milestone"
                value={mile.item}
                onChange={(e) => {
                  onChange({ ...mile, item: e.target.value }, ind);
                }}
              />
            </Col>
            <Col md={5} sm={5} >
              <Input
                label="%"
                value={mile.value}
                onChange={(e) => {
                  onChange({ ...mile, value: e.target.value }, ind);
                }}
              />
            </Col>
            <Col>
              <ClearIcon
                onClick={() => {
                  setState({ open: true, index: ind });
                }}
                style={{ fontSize: "14px" }}
              />
            </Col>
          </Row>
        </Fragment>
      ))}
      <AddIcon
        style={{ fontSize: "18px", cursor: "pointer" }}
        onClick={() => {
          addMileStone({ item: "", value: "" });
        }}
      />
    </>
  );
}

function Popup({
  state = { open: false, index: -1 },
  setState = () => {},
  onOk = () => {},
}) {
  const [pState, setPState] = useState(state);
  useEffect(() => {
    setPState(state);
  }, [state]);
  return (
    <Modal
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={pState.open}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm to submit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Are you sure to do this</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onOk(pState.index);
            setPState({ open: false, index: -1 });
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            setPState({ open: false, index: -1 });
          }}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
