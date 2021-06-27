import React, { useEffect, useState,Fragment } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Input from "../../components/input";
import DeleteIcon from '@material-ui/icons/Delete';

export default function Units({
  room = [],
  addUnit = () => {},
  addComponent = () => {},
}) {
  const [rooms, setRooms] = useState(room);
  useEffect(() => {
    setRooms(room);
  }, [room]);
  return (
    <>
      <p className="h5 text-center p-2">Add Units</p>
      <Row>
        {rooms.map((room,index) => (
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
    </>
  );
}

export function Unit({ addComponent = () => {}, roomId = 0, unitId = 0 }) {
  const [name, setName] = useState("");
  return (
    <>
      <Input label="Unit Name" icon={()=><DeleteIcon style={{fontSize:"20px"}} />}  value={name} onChange={(e) => setName(e.target.value)} />
      <p
        className="h6 text-right"
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
