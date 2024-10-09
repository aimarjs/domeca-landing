import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LocationAutocomplete from "./index";

// Mock fetchSuggestions and other utility functions
jest.mock("../../utils/geocodingClient", () => ({
  fetchSuggestions: jest.fn(),
}));

const mockPlaceSelected = jest.fn();
const mockAddLocation = jest.fn();
const mockRemoveLocation = jest.fn();

describe("LocationAutocomplete Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with default values", () => {
    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={mockPlaceSelected}
        index={0}
      />
    );

    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter a first location")
    ).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  test("triggers fetchSuggestions when input changes", () => {
    const { fetchSuggestions } = require("../../utils/geocodingClient");
    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={mockPlaceSelected}
        index={0}
      />
    );

    const input = screen.getByPlaceholderText("Enter a first location");
    fireEvent.change(input, { target: { value: "New York" } });

    expect(fetchSuggestions).toHaveBeenCalledWith(
      "New York",
      expect.any(Function), // Set suggestions callback
      expect.any(Function) // Set isLoading callback
    );
  });

  test("displays suggestions and handles suggestion click", () => {
    const suggestions = [
      { id: 1, place_name: "New York", center: [-74.006, 40.7128] },
    ];

    const { fetchSuggestions } = require("../../utils/geocodingClient");
    fetchSuggestions.mockImplementation(
      (
        _: any,
        setSuggestions: (
          arg0: { id: number; place_name: string; center: number[] }[]
        ) => void
      ) => {
        setSuggestions(suggestions);
      }
    );

    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={mockPlaceSelected}
        index={0}
      />
    );

    // Trigger input change
    const input = screen.getByPlaceholderText("Enter a first location");
    fireEvent.change(input, { target: { value: "New York" } });

    // Check if the suggestion list appears
    expect(screen.getByText("New York")).toBeInTheDocument();

    // Click the suggestion
    fireEvent.click(screen.getByText("New York"));

    // Ensure place is selected and passed to the callback
    expect(mockPlaceSelected).toHaveBeenCalledWith(
      "New York",
      40.7128,
      -74.006
    );
  });

  test("calls addLocation when clicking the + button", () => {
    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={mockPlaceSelected}
        addLocation={mockAddLocation}
        index={0}
      />
    );

    fireEvent.click(screen.getByText("+"));
    expect(mockAddLocation).toHaveBeenCalled();
  });

  test("calls removeLocation when clicking the − button", () => {
    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={mockPlaceSelected}
        isRemovable={true}
        removeLocation={mockRemoveLocation}
        index={1}
      />
    );

    fireEvent.click(screen.getByText("−"));
    expect(mockRemoveLocation).toHaveBeenCalled();
  });

  test("displays loading indicator when isLoading is true", () => {
    const { fetchSuggestions } = require("../../utils/geocodingClient");
    fetchSuggestions.mockImplementation(
      (_: any, __: any, setIsLoading: (arg0: boolean) => void) => {
        setIsLoading(true);
      }
    );

    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={mockPlaceSelected}
        index={0}
      />
    );

    // Trigger input change
    const input = screen.getByPlaceholderText("Enter a first location");
    fireEvent.change(input, { target: { value: "New York" } });

    // Ensure loading indicator is visible
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays dynamic placeholder based on index", () => {
    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={mockPlaceSelected}
        index={1}
      />
    );

    expect(
      screen.getByPlaceholderText("Enter a second location")
    ).toBeInTheDocument();
  });
});

describe("LocationAutocomplete - Placeholder Function", () => {
  test("returns correct placeholder for first location", () => {
    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={jest.fn()}
        index={0} // First location
      />
    );

    const input = screen.getByPlaceholderText("Enter a first location");
    expect(input).toBeInTheDocument();
  });

  test("returns correct placeholder for second location", () => {
    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={jest.fn()}
        index={1} // Second location
      />
    );

    const input = screen.getByPlaceholderText("Enter a second location");
    expect(input).toBeInTheDocument();
  });

  test("returns correct placeholder for third location", () => {
    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={jest.fn()}
        index={2} // Third location
      />
    );

    const input = screen.getByPlaceholderText("Enter a third location");
    expect(input).toBeInTheDocument();
  });

  test("returns dynamic placeholder for location beyond predefined names", () => {
    render(
      <LocationAutocomplete
        label="Location"
        onPlaceSelected={jest.fn()}
        index={5} // Sixth location
      />
    );

    const input = screen.getByPlaceholderText("Enter a 6th location");
    expect(input).toBeInTheDocument();
  });
});
