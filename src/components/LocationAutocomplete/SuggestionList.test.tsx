import { render, screen, fireEvent } from "@testing-library/react";
import SuggestionList from "./SuggestionList";

const mockSuggestions = [
  { id: 1, place_name: "Location 1" },
  { id: 2, place_name: "Location 2" },
  { id: 3, place_name: "Location 3" },
];

describe("SuggestionList", () => {
  test("renders a list of suggestions", () => {
    render(
      <SuggestionList suggestions={mockSuggestions} onClick={jest.fn()} />
    );

    const suggestionItems = screen.getAllByRole("listitem");
    expect(suggestionItems).toHaveLength(3); // Expect 3 suggestions
  });

  test("renders the correct text for each suggestion", () => {
    render(
      <SuggestionList suggestions={mockSuggestions} onClick={jest.fn()} />
    );

    mockSuggestions.forEach((suggestion) => {
      expect(screen.getByText(suggestion.place_name)).toBeInTheDocument();
    });
  });

  test("triggers onClick when a suggestion is clicked", () => {
    const mockOnClick = jest.fn();
    render(
      <SuggestionList suggestions={mockSuggestions} onClick={mockOnClick} />
    );

    const firstSuggestion = screen.getByText("Location 1");
    fireEvent.click(firstSuggestion);

    expect(mockOnClick).toHaveBeenCalledWith(mockSuggestions[0]); // First suggestion should be passed
  });

  test("renders no list items when no suggestions are provided", () => {
    render(<SuggestionList suggestions={[]} onClick={jest.fn()} />);

    const suggestionItems = screen.queryAllByRole("listitem");
    expect(suggestionItems).toHaveLength(0); // Expect no list items
  });

  test("handles onClick not being provided", () => {
    render(<SuggestionList suggestions={mockSuggestions} />);

    const firstSuggestion = screen.getByText("Location 1");
    expect(() => fireEvent.click(firstSuggestion)).not.toThrow(); // Should not throw error
  });
});
