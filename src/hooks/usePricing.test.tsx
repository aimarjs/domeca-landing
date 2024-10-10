import { renderHook, act } from "@testing-library/react";
import { usePricing } from "./usePricing";
import {
  fetchPricingData,
  calculateEstimatedCost,
} from "../services/pricingService";
import { waitFor } from "@testing-library/react";

jest.mock("../services/pricingService");

describe("usePricing hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize with default pricing and estimatedCost = 0", async () => {
    (fetchPricingData as jest.Mock).mockResolvedValue({
      baseFarePerKm: 0.5,
      oneTimeStartingFee: 10,
      hourPrice: 15,
      waitingHourPrice: 5,
      discount: 10,
      discountStartKm: 100,
    });

    const { result } = renderHook(() => usePricing(0, 0, 0, 0, 0.2, false));

    // Initial state checks
    expect(result.current.pricing).toEqual({
      baseFarePerKm: 0.5,
      oneTimeStartingFee: 0,
      hourPrice: 0,
      waitingHourPrice: 0,
      discount: 0,
      discountStartKm: 0,
    });

    expect(result.current.estimatedCost).toBe(0);
  });

  test("should fetch pricing data and update pricing state", async () => {
    const mockPricingData = {
      baseFarePerKm: 1,
      oneTimeStartingFee: 5,
      hourPrice: 15,
      waitingHourPrice: 10,
      discount: 20,
      discountStartKm: 50,
    };

    (fetchPricingData as jest.Mock).mockResolvedValue(mockPricingData);

    const { result } = renderHook(() => usePricing(100, 2, 60, 30, 0.2, false));

    // Wait for fetchPricingData to resolve
    await waitFor(() => {
      expect(result.current.pricing).toEqual(mockPricingData);
    });
  });

  test("should calculate estimated cost correctly", async () => {
    const mockPricingData = {
      baseFarePerKm: 1,
      oneTimeStartingFee: 5,
      hourPrice: 15,
      waitingHourPrice: 10,
      discount: 20,
      discountStartKm: 50,
    };

    const mockEstimatedCost = 150;

    (fetchPricingData as jest.Mock).mockResolvedValue(mockPricingData);
    (calculateEstimatedCost as jest.Mock).mockReturnValue(mockEstimatedCost);

    const { result } = renderHook(() => usePricing(100, 2, 60, 30, 0.2, false));

    // Wait for the pricing data to be fetched
    await waitFor(() => {
      expect(result.current.pricing).toEqual(mockPricingData);
    });

    // Trigger the cost calculation
    act(() => {
      result.current;
    });

    // Check if calculateEstimatedCost was called with correct arguments
    expect(calculateEstimatedCost).toHaveBeenCalledWith(
      mockPricingData,
      100,
      2,
      60,
      30,
      0.2
    );

    // Wait for the estimated cost to update
    await waitFor(() => {
      expect(result.current.estimatedCost).toBe(mockEstimatedCost);
    });
  });

  test("should handle fetchPricingData error", async () => {
    (fetchPricingData as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );

    const { result } = renderHook(() => usePricing(100, 2, 60, 30, 0.2, false));

    // Wait for the error to be caught
    await waitFor(() => {
      expect(result.current.pricing).toEqual({
        baseFarePerKm: 0.5,
        oneTimeStartingFee: 0,
        hourPrice: 0,
        waitingHourPrice: 0,
        discount: 0,
        discountStartKm: 0,
      });
    });

    // Ensure the estimated cost is reset to 0 due to failed data fetch
    expect(result.current.estimatedCost).toBe(0);
  });
});
