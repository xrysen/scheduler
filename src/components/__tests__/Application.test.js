import React from "react";

import { render, cleanup, waitForElement, getByText, prettyDOM } from "@testing-library/react";

import Application from "components/Application";
import { testHook } from "react-hooks-testing-library";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("Application", () => {
  it("Defaults to monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads, data, books an interview and reduces the spots remaning by one", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    console.log(prettyDOM(container));
  });
});
