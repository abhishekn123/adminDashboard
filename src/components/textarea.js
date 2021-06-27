import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

export default function Textarea({
  label = "",
  onChange = () => {},
  value = "",
  className=""
}) {
  return (
    <InputGroup size="sm" className={"input"+className}>
      <FormControl
        as="textarea"
        placeholder={label}
        onChange={(e) => onChange(e)}
        value={value}
        aria-label="Unit Name"
        className={"p-2 border border-right-0 border-top-0 border-bottom-0 input "}
        style={{ borderRadius: "8px" }}
      />
    </InputGroup>
  );
}
