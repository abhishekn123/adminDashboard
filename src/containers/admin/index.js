import React, { useState, useEffect } from "react";
import { Container, Row, Col,Navbar } from "react-bootstrap";
import Units from "./units";
import Components from "./components";
import Vendors from "./vendors";
import Milestone from "./milestone";
import { getRooms } from "../../service/adminService";
import "./index.css";
export default function Admin() {
  const [rooms, setRooms] = useState(new Map());
  const [selectedRoomId, setRoomId] = useState(null);
  const [selectedUnitId, setUnitId] = useState(null);
  const [selectedComId, setComId] = useState(null);
  const [selectedvendId, setVendId] = useState(null);
  const [selectedComp, setSelectedComp] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState([]);
  const [selectedMileStone, setMileStone] = useState([]);

  //All States Managed here
  const [roomGroup, setRoomGroup] = useState(new Map());
  const [components, setComponents] = useState(new Map());
  const [vendors, setVendors] = useState(new Map());
  const [milestones, setMileStones] = useState(new Map());
  useEffect(() => {
    getRooms().map((exp) => {
      rooms.set(exp.id, exp);
      roomGroup.set(exp.id, exp);
      exp.units.map((unt) => {
        let comp = [];
        let vend = [];
        unt.components.map((cmp) => {
          comp.push(cmp);
          exp.vendors.map((vnd) => {
            vend.push(vnd);
            milestones.set(vnd.id, vnd.milestones);
          });
          vendors.set(cmp.id, vend);
        });
        components.set(unt.id, [...comp]);
      });
    });
    setRoomGroup(new Map([...roomGroup.entries()]));
    setComponents(new Map([...components.entries()]));
    setVendors(new Map([...vendors.entries()]));
    setMileStones(new Map([...milestones.entries()]));
    setRooms(new Map(rooms.entries()));
  }, []);
  function handleCreateUnit(roomId, unitObj) {
    let room = roomGroup.get(roomId);
    if (room) {
      let length = room.units.length;
      roomGroup.set(roomId, {
        ...room,
        units: [...room.units, { ...unitObj, id: length > 0 ? length : 0 }],
      });
    }
    setRoomGroup(new Map([...roomGroup.entries()]));
  }

  function handleCreateComponent(roomId, unitId, compObj) {
    let component = components.get(unitId);
    if (component) {
      let length = component.length;
      if (component.length === 0) {
        component.push({ ...compObj, id: length > 0 ? length : 0 });
      }
      components.set(unitId, [...component]);
      vendors.set(length > 0 ? length : 0, []);
      setVendors(new Map([...vendors.entries()]));
      setSelectedComp([...component]);
      setComponents(new Map([...components.entries()]));
      setUnitId(unitId);
      setSelectedVendor([]);
      setMileStone([]);
    }
  }

  function handleAddComponent() {
    let component = components.get(selectedUnitId);
    if (component) {
      let length = component.length;
      component.push({
        unitName: "",
        description: "",
        rate: 0,
        quantity: 0,
        units: 0,
        id: length > 0 ? length : 0,
      });
      vendors.set(length > 0 ? length : 0, []);
      setVendors(new Map([...vendors.entries()]));
      components.set(selectedUnitId, [...component]);
      setSelectedComp([...component]);
      setComponents(new Map([...components.entries()]));
    }
  }

  function handleCreateVendor(compId) {
    let vendor = vendors.get(compId);
    if (vendor) {
      let length = vendor.length;
      if (vendor.length === 0) {
        vendor.push({
          id: length > 0 ? length : 0,
          compName: "",
          work: {
            headerName: "",
            description: "",
            quantity: 0,
            rate: 0,
            units: "",
          },
          material: [{ item: "", specification: "", quantity: "", rate: "" }],
        });
      }
      vendors.set(compId, [...vendor]);
      milestones.set(length > 0 ? length : 0, []);
      setSelectedVendor([...vendor]);
      setVendors(new Map([...vendors.entries()]));
      setMileStones(new Map([...milestones.entries()]));
      setComId(compId);
    }
  }

  function onComponentChange(obj, index) {
    let component = components.get(selectedUnitId);
    if (component) {
      component[index] = obj;
      components.set(selectedUnitId, [...component]);
      setSelectedComp([...component]);
      setComponents(new Map([...components.entries()]));
    }
  }
  function onVendorChange(obj, index) {
    let vendor = vendors.get(selectedComId);
    if (vendor) {
      vendor[index] = obj;
      vendors.set(selectedComId, [...vendor]);
      setSelectedVendor([...vendor]);
      setVendors(new Map([...vendors.entries()]));
    }
  }
  function handleCreateMileStone(vendorId) {
    let milestone = milestones.get(vendorId);
    setVendId(vendorId);
    if (milestone) {
      let length = milestone.length;
      if (milestone.length === 0) {
        milestone.push({
          id: length > 0 ? length : 0,
          item: "",
          value: "",
        });
      }
      milestones.set(vendorId, [...milestone]);
      milestones.set(length > 0 ? length : 0, []);
      setMileStone([...milestone]);
      setMileStones(new Map([...milestones.entries()]));
      setVendId(vendorId);
    }
  }

  function onMileStoneChange(obj, index) {
    let milestone = milestones.get(selectedvendId);
    if (milestone) {
      milestone[index] = obj;
      milestones.set(selectedvendId, [...milestone]);
      setMileStone([...milestone]);
      setMileStones(new Map([...milestones.entries()]));
    }
  }
  function handleAddMileStone(obj) {
    let milestone = milestones.get(selectedvendId);
    if (milestone) {
      milestone.push(obj);
      milestones.set(selectedvendId, [...milestone]);
      setMileStone([...milestone]);
      setMileStones(new Map([...milestones.entries()]));
    }
  }
  function handleRemoveMileStone(index) {
    let milestone = milestones.get(selectedvendId);
    if (milestone) {
      milestone.splice(index,1);
      milestones.set(selectedvendId, [...milestone]);
      setMileStone([...milestone]);
      setMileStones(new Map([...milestones.entries()]));
    }
  }
  return (
    <Container fluid className="mt-2" >
      <Row>
        <Col className="border" sm={12} md={6} lg={3}>
          <Units
            room={[...roomGroup.values()]}
            addUnit={handleCreateUnit}
            addComponent={handleCreateComponent}
          />
        </Col>
        <Col className={selectedComp.length > 0 ? "border" : ""} sm={12} md={6} lg={3} >
          {selectedComp.length > 0 ? (
            <Components
              components={selectedComp}
              onChange={onComponentChange}
              addComponent={handleAddComponent}
              addVendor={handleCreateVendor}
            />
          ) : null}
        </Col>
        <Col className={selectedVendor.length > 0 ? "border" : ""} sm={12} md={6} lg={3} >
          {selectedVendor.length > 0 ? (
            <Vendors
              vendors={selectedVendor}
              onChange={onVendorChange}
              addMileStone={handleCreateMileStone}
            />
          ) : null}
        </Col>
        <Col className={selectedMileStone.length > 0 ? "border" : ""} sm={12} md={6} lg={3} >
          {selectedMileStone.length > 0 ? (
            <Milestone
              mileStone={selectedMileStone}
              onChange={onMileStoneChange}
              addMileStone={handleAddMileStone}
              removeMileStone={handleRemoveMileStone}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

