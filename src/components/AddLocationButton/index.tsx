import { PlusCircleIcon } from "@heroicons/react/24/solid"; // Import the icon

interface AddLocationButtonProps {
  onAddLocation: () => void;
}

const AddLocationButton: React.FC<AddLocationButtonProps> = ({
  onAddLocation,
}) => {
  return (
    <button
      type="button"
      onClick={onAddLocation}
      className="p-2 ml-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
      aria-label="Add Location"
    >
      <PlusCircleIcon data-testid="plus-icon" className="h-6 w-6" />
    </button>
  );
};

export default AddLocationButton;
