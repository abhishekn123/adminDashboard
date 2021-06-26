import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
export default function Input({ label = "" }) {
  const [value, setValue] = useState("");
  return (
    <FormControl
      placeholder="Unit Name"
      onChange={(e) => setValue(e.target.value)}
      aria-label="Unit Name"
      className="p-2"
      value={label}
    />
  );
}
