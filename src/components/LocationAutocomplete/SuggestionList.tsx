const SuggestionList: React.FC<{
  suggestions: any[];
  onClick: (suggestion: any) => void;
}> = ({ suggestions, onClick }) => (
  <ul className="suggestion-list absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 max-h-48 overflow-y-auto">
    {suggestions.map((suggestion) => (
      <li
        key={suggestion.id}
        className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:text-gray-200"
        onClick={() => onClick(suggestion)}
      >
        {suggestion.place_name}
      </li>
    ))}
  </ul>
);

export default SuggestionList;
