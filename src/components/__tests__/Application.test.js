import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  queryByText,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import axios from "axios";

import Application from "components/Application";
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
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((ele) =>
      queryByText(ele, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels interview and increases spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find((ele) =>
      queryByText(ele, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(
        appointment,
        "Are you sure you want to delete this appointment?"
      )
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining"));
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find((ele) =>
      queryByText(ele, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));

    await waitForElement(() => getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining"));
  });

  it("Shows the save error when failing to save an appointment", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find((ele) =>
      queryByText(ele, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));
    axios.put.mockRejectedValue();
    fireEvent.click(getByText(appointment, "Save"));

    await waitForElementToBeRemoved(() =>
      queryByText(appointment, "Saving...")
    );
    expect(
      getByText(appointment, "There was an error while saving your request")
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to save an appointment", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find((ele) =>
      queryByText(ele, "Archie Cohen")
    );
    axios.delete.mockRejectedValue();
    fireEvent.click(getByAltText(appointment, "Delete"));
    fireEvent.click(getByText(appointment, "Confirm"));

    await waitForElementToBeRemoved(() =>
      queryByText(appointment, "Deleting...")
    );
    expect(
      getByText(appointment, "There was an error while deleting your interview")
    ).toBeInTheDocument();
  });
});
