import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Input from "../../components/input";
import DeleteIcon from "@material-ui/icons/Delete";
import "./unit.css";
import useWindowSize from "../../hooks/windowSize";

export default function Units({
  room = [],
  addUnit = () => {},
  addComponent = () => {},
}) {
  const [rooms, setRooms] = useState(room);
  const { height } = useWindowSize();
  useEffect(() => {
    setRooms(room);
  }, [room]);
  return (
    <div style={{height:height}}>
      <p className="h5 text-center p-2">Add Units</p>
      <Row
        style={{
          height:height,
          maxHeight: height -150,
          overflow: "auto",
          overflowX: "hidden",
        }}
      >
        {rooms.map((room, index) => (
          <Col md={12} sm={12} key={index}>
            <p className="h6 pb-2 pt-2">{room.name}</p>
            {room.units.map((unit, index) => (
              <Unit
                key={index}
                addComponent={addComponent}
                roomId={room.id}
                unitId={unit.id}
              />
            ))}
            <AddIcon
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => addUnit(room.id, { name: "" })}
            />
          </Col>
        ))}
      </Row>
      <Row className="w-100" style={{position:"absolute",zIndex:1,overflow:"hidden"}} >
        <Col md={12}>
          {" "}
          <Button variant="primary" className="w-100" size="lg">
            Save
          </Button>
        </Col>
        <Col md={12} className="mt-1">
          {" "}
          <Button variant="outline-primary" className="w-100" size="lg">
            Start Work
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export function Unit({ addComponent = () => {}, roomId = 0, unitId = 0 }) {
  const [name, setName] = useState("");
  return (
    <>
      <Input
        label="Unit Name"
        icon={() => <DeleteIcon style={{ fontSize: "20px" }} />}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p
        className="h6 text-right cursor navigator"
        color="primary"
        onClick={() =>
          addComponent(roomId, unitId, {
            unitName: name,
            description: "",
            rate: 0,
            quantity: 0,
            units: 0,
          })
        }
      >
        Add component(s)
      </p>
    </>
  );
}
