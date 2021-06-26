import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear";

export default function Milestone({ mileStone = [] ,onChange=()=>{}}) {
  const [values, setValues] = useState([]);
  useEffect(() => {
    setValues(mileStone);
  }, [mileStone]);
  return (
    <>
      <p className="h5 text-center p-2">Vendoe 1-Milestones</p>
      {values.map((mile, index) => (
        <Fragment key={index}>
          <Row>
            <Col>
              <FormControl className="p-2" />
            </Col>
            <Col>
              <FormControl className="p-2" />
            </Col>
            <Col>
              <ClearIcon style={{fontSize:"14px"}}/>
            </Col>
          </Row>
        </Fragment>
      ))}
    </>
  );
}
