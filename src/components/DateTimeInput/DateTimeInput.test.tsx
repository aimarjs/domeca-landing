import { render, screen, fireEvent } from "@testing-library/react";
import DateTimeInput from "./index";
import { Controller } from "react-hook-form";

// Mock the `react-hook-form` components you are using
jest.mock("react-hook-form", () => ({
  Controller: ({ render }: any) =>
    render({ field: { onChange: jest.fn(), value: "" } }),
}));

describe("DateTimeInput", () => {
  test("renders the input field with label", () => {
    render(
      <DateTimeInput
        name="startDateTime"
        label="Start Date and Time"
        control={{}} // Mock control
        errors={{}} // No errors initially
      />
    );

    // Check if label is rendered
    const label = screen.getByText("Start Date and Time");
    expect(label).toBeInTheDocument();

    // Check if the input is rendered
    const input = screen.getByLabelText("Start Date and Time"); // Now this should work
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "datetime-local");
  });

  test("calls onBlur when input loses focus", () => {
    const mockOnBlur = jest.fn();

    render(
      <DateTimeInput
        name="startDateTime"
        label="Start Date and Time"
        control={{}} // Mock control
        errors={{}}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByLabelText("Start Date and Time");
    fireEvent.blur(input); // Simulate the blur event

    expect(mockOnBlur).toHaveBeenCalled(); // Check if the blur handler was called
  });

  test("displays error message when errors prop is provided", () => {
    const mockErrors = {
      startDateTime: {
        message: "Start Date and Time is required",
      },
    };

    render(
      <DateTimeInput
        name="startDateTime"
        label="Start Date and Time"
        control={{}} // Mock control
        errors={mockErrors}
      />
    );

    const errorMessage = screen.getByText("Start Date and Time is required");
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders without crashing when onBlur is not provided", () => {
    render(
      <DateTimeInput
        name="startDateTime"
        label="Start Date and Time"
        control={{}} // Mock control
        errors={{}}
      />
    );

    const input = screen.getByLabelText("Start Date and Time");
    expect(input).toBeInTheDocument();
    expect(() => fireEvent.blur(input)).not.toThrow(); // No errors should occur
  });

  test("does not display error message when no error is provided", () => {
    render(
      <DateTimeInput
        name="startDateTime"
        label="Start Date and Time"
        control={{}} // Mock control
        errors={{}}
      />
    );

    const errorMessage = screen.queryByText(/is required/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
