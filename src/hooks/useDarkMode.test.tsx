import { renderHook, act } from "@testing-library/react";
import useDarkMode from "./useDarkMode";

describe("useDarkMode hook", () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value;
      },
      clear() {
        store = {};
      },
      removeItem(key: string) {
        delete store[key];
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
    localStorageMock.clear();
  });

  test("should default to 'light' mode when no preference is set", () => {
    const { result } = renderHook(() => useDarkMode());

    expect(result.current[0]).toBe("light"); // theme is light by default
  });

  test("should initialize with 'dark' theme if localStorage has 'dark'", () => {
    localStorage.setItem("theme", "dark");

    const { result } = renderHook(() => useDarkMode());

    expect(result.current[0]).toBe("dark"); // theme should be dark based on localStorage
  });

  test("should toggle between 'light' and 'dark' themes", () => {
    const { result } = renderHook(() => useDarkMode());

    // Initially 'light'
    expect(result.current[0]).toBe("light");

    // Toggle to 'dark'
    act(() => {
      result.current[1]("dark");
    });
    expect(result.current[0]).toBe("dark");

    // Toggle back to 'light'
    act(() => {
      result.current[1]("light");
    });
    expect(result.current[0]).toBe("light");
  });

  test("should update localStorage when theme changes", () => {
    const { result } = renderHook(() => useDarkMode());

    // Toggle to 'dark'
    act(() => {
      result.current[1]("dark");
    });
    expect(localStorage.getItem("theme")).toBe("dark");

    // Toggle back to 'light'
    act(() => {
      result.current[1]("light");
    });
    expect(localStorage.getItem("theme")).toBe("light");
  });

  test("should update the document root class when theme changes", () => {
    const { result } = renderHook(() => useDarkMode());

    const root = document.documentElement;

    // Initially, it should add the 'light' class
    expect(root.classList.contains("light")).toBe(true);
    expect(root.classList.contains("dark")).toBe(false);

    // Change to 'dark'
    act(() => {
      result.current[1]("dark");
    });
    expect(root.classList.contains("dark")).toBe(true);
    expect(root.classList.contains("light")).toBe(false);

    // Change back to 'light'
    act(() => {
      result.current[1]("light");
    });
    expect(root.classList.contains("light")).toBe(true);
    expect(root.classList.contains("dark")).toBe(false);
  });

  // test("should handle SSR correctly (no window object)", () => {
  //   // Mock window object as undefined to simulate SSR
  //   const originalWindow = global.window;
  //   delete (global as any).window;

  //   // Mock window.document.documentElement for the test to avoid rendering issues
  //   const mockDocument = jest.spyOn(document, "documentElement", "get");

  //   // Execute the hook
  //   const { result } = renderHook(() => useDarkMode());

  //   // Should default to 'light' without accessing window
  //   expect(result.current[0]).toBe("light");

  //   // Restore the window object after the test
  //   global.window = originalWindow;
  //   mockDocument.mockRestore();
  // });
});
