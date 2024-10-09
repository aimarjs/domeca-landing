import { render, screen, fireEvent } from "@testing-library/react";
import ActionButton from "./ActionButton";

describe("ActionButton", () => {
  test("renders ActionButton with correct label", () => {
    render(<ActionButton label="Click Me" />);
    const labelElement = screen.getByTestId("button-label");
    expect(labelElement).toHaveTextContent("Click Me");
  });

  test("triggers onClick when button is clicked", () => {
    const mockClick = jest.fn();
    render(<ActionButton label="Click Me" onClick={mockClick} />);

    const button = screen.getByTestId("action-button");
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test("applies correct class based on color prop", () => {
    render(<ActionButton label="Click Me" color="bg-red-500" />);

    const button = screen.getByTestId("action-button");
    expect(button).toHaveClass("bg-red-500");
  });

  test("does not crash without onClick handler", () => {
    render(<ActionButton label="Click Me" />);

    const button = screen.getByTestId("action-button");
    expect(() => fireEvent.click(button)).not.toThrow(); // Shouldn't throw an error
  });

  test("renders button with empty label", () => {
    render(<ActionButton label="" />);

    const labelElement = screen.getByTestId("button-label");
    expect(labelElement).toBeInTheDocument(); // Label span should still exist
  });

  test("handles invalid color prop gracefully", () => {
    render(<ActionButton label="Click Me" color="invalid-color" />);

    const button = screen.getByTestId("action-button");
    expect(button).toHaveClass("invalid-color"); // Should apply the class even if it's invalid
  });
});
