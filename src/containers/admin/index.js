import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Units from "./units";
import Components from "./components";
import Vendors from "./vendors";
import Milestone from "./milestone";
import { getRooms } from "../../service/adminService";
export default function Admin() {
  const [rooms, setRooms] = useState(new Map());
  const [selectedRoomId, setRoomId] = useState(null);
  const [selectedUnitId, setUnitId] = useState(null);
  const [selectedComId, setComId] = useState(null);
  const [selectedComp, setSelectedComp] = useState([]);
  const [selectedVendor, setVendor] = useState([]);
  useEffect(() => {
    getRooms().map((exp) => {
      rooms.set(exp.id, exp);
    });
    setRooms(new Map(rooms.entries()));
  }, []);
  function handleCreateUnit(roomId, unitObj) {
    let room = rooms.get(roomId);
    if (room) {
      setRoomId(roomId);
      let length = room.units.length;
      room.units.push({
        ...unitObj,
        id: length > 0 ? length : 0,
        components: [],
      });
    }
    rooms.set(roomId, room);
    setRooms(new Map(rooms.entries()));
  }
  function handleCreateComponent(roomId, unitId, compObj) {
    let room = rooms.get(roomId);
    if (room) {
      setRoomId(roomId);
      setUnitId(unitId);
      room.units.map((unit) => {
        if (unit.id == unitId) {
          let length = unit.components.length;
          if (length <= 0) {
            unit.components.push({
              ...compObj,
              vendors: [],
              id: length > 0 ? length : 0,
            });
          }
          setSelectedComp(unit.components);
        }
      });
    }
    rooms.set(roomId, room);
    setRooms(new Map(rooms.entries()));
  }
  function handleAddComponent() {
    let room = rooms.get(selectedRoomId);
    if (room) {
      room.units.map((unit) => {
        if (unit.id == selectedUnitId) {
          let length = unit.components.length;
          unit.components.push({
            unitName: unit.name,
            description: "",
            quantity: 0,
            rate: 0,
            units: "",
            vendors: [],
            id: length > 0 ? length : 0,
          });
        }
      });
    }
    rooms.set(selectedRoomId, room);
    setRooms(new Map(rooms.entries()));
  }
  function onComponentChange(obj, index) {
    let room = rooms.get(selectedRoomId);
    if (room) {
      room.units.map((unit) => {
        if (unit.id === selectedUnitId) {
          unit.components[index] = obj;
          setSelectedComp([...unit.components]);
        }
      });
    }
  }
  function handleCreateVendor(compId) {
    let room = rooms.get(selectedRoomId);
    if (room) {
      room.units.map((unit) => {
        if (unit.id === selectedUnitId) {
          let index = unit.components.findIndex((value) => value.id === compId);
          if (index >= 0) {
            setComId(compId);
            let length = unit.components[index].vendors.length;
            unit.components[index].vendors.push({
              id: length > 0 ? length : 0,
              compName: `Component ${index + 1}`,
              work: {
                headerName: "",
                description: "",
                quantity: "",
                rate: "",
                units: "",
              },
              material: {},
            });
            setVendor(unit.components[index].vendors);
          }
        }
      });
    }
    rooms.set(selectedRoomId, room);
    setRooms(new Map(rooms.entries()));
  }
  function onVendorChange(obj, index) {
    let room = rooms.get(selectedRoomId);
    if (room) {
      room.units.map((unit) => {
        if (unit.id === selectedUnitId) {
          let cindex = unit.components.findIndex(
            (exp) => exp.id === selectedComId
          );
          if (cindex >= 0) {
            unit.components[cindex].vendors[index] = obj;
          }
          setVendor([...unit.components[cindex].vendors]);
        }
      });
    }
  }
  return (
    <Container fluid>
      <Row>
        <Col className="border">
          <Units
            room={[...rooms.values()]}
            addUnit={handleCreateUnit}
            addComponent={handleCreateComponent}
          />
        </Col>
        <Col className={selectedComp.length > 0 ? "border" : ""}>
          {selectedComp.length > 0 ? (
            <Components
              components={selectedComp}
              onChange={onComponentChange}
              addComponent={handleAddComponent}
              addVendor={handleCreateVendor}
            />
          ) : null}
        </Col>
        <Col className={selectedVendor.length > 0 ? "border" : ""}>
          {selectedVendor.length > 0 ? (
            <Vendors vendors={selectedVendor} onChange={onVendorChange} />
          ) : null}
        </Col>
        <Col>
          <Milestone />
        </Col>
      </Row>
    </Container>
  );
}
