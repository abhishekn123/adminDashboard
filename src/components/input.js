import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import "./input.css";
export default function Input({
  label = "",
  onChange = () => {},
  value = "",
  type = "text",
  icon = null,
}) {
  return (
    <InputGroup size="sm" className="input">
      <FormControl
        onChange={(e) => onChange(e)}
        value={value}
        type={type}
        aria-label={label}
        className="p-2 border border-right-0 border-top-0 border-bottom-0 input"
        style={{ borderRadius: "8px" }}
      />
      <InputGroup.Append className="input p-0 m-0 border border-right-0 border-top-0 border-left-0 border-bottom-0 border-left-0">
        <InputGroup.Text
          className="input text-wrap w-50 pt-0 pb-0 border border-left-0 border-top-0 border-bottom-0 border-right-0"
          style={{ fontSize: "10px" }}
        >
        {label}
        </InputGroup.Text>
        {icon ? (
          <InputGroup.Text className="input input-ctrl border border-right-0 border-left-0 border-top-0 border-bottom-0">
            {icon()}
          </InputGroup.Text>
        ) : null}
      </InputGroup.Append>
    </InputGroup>
  );
}
