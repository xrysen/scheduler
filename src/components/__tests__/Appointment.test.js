import React from "react";

import { render, cleanup } from "@testing-library/react";
import Application from "../Application";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
});
