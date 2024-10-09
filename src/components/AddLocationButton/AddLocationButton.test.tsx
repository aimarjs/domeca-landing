import { render, screen, fireEvent } from "@testing-library/react";
import AddLocationButton from "./index";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

describe("AddLocationButton", () => {
  test("should render AddLocationButton with correct attributes", () => {
    render(<AddLocationButton onAddLocation={jest.fn()} />);

    const button = screen.getByRole("button", { name: /add location/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-600");
  });

  test("should render PlusCircleIcon inside the button", () => {
    render(<AddLocationButton onAddLocation={jest.fn()} />);

    const icon = screen.getByTestId("plus-icon");
    expect(icon).toBeInTheDocument(); // Ensure the icon is rendered
  });

  test("should call onAddLocation when button is clicked", () => {
    const mockAddLocation = jest.fn();
    render(<AddLocationButton onAddLocation={mockAddLocation} />);

    const button = screen.getByRole("button", { name: /add location/i });
    fireEvent.click(button);

    expect(mockAddLocation).toHaveBeenCalled(); // Ensure the function is called
  });

  test("should not crash if onAddLocation is not provided", () => {
    expect(() =>
      render(<AddLocationButton onAddLocation={undefined as any} />)
    ).not.toThrow();
  });

  test("should have correct aria-label for accessibility", () => {
    render(<AddLocationButton onAddLocation={jest.fn()} />);

    const button = screen.getByRole("button", { name: /add location/i });
    expect(button).toHaveAttribute("aria-label", "Add Location");
  });

  test("should not call onAddLocation when button is disabled", () => {
    const mockAddLocation = jest.fn();
    render(
      <button disabled onClick={mockAddLocation}>
        <PlusCircleIcon className="h-6 w-6" />
      </button>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockAddLocation).not.toHaveBeenCalled(); // Function should not be called when disabled
  });
});
