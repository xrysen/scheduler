import React from "react";

import { render, waitForElement, getByText } from "@testing-library/react";
import Application from "../Application";

describe("Appointment", () => {
  it("renders without crashing", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen")); 
  });
});
