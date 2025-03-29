
// frig-ai-chat/src/app/lib/sessionManager.ts

/**
 * Saves the application state to localStorage.
 * @param key - The key under which to store the state.
 * @param state - The state object to save.
 */
export const saveState = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
    // TODO: Implement more robust error handling or user notification
  }
};

/**
 * Loads the application state from localStorage.
 * @param key - The key from which to retrieve the state.
 * @returns The loaded state object, or null if not found or error occurs.
 */
export const loadState = <T>(key: string): T | null => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return null; // No state found
    }
    return JSON.parse(serializedState) as T;
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    // TODO: Implement error handling or return a default state
    return null;
  }
};

/**
 * Removes the application state from localStorage.
 * @param key - The key of the state to remove.
 */
export const removeState = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing state from localStorage:", error);
    // TODO: Implement error handling
  }
};

// TODO: Consider adding throttling/debouncing for frequent state saves
// TODO: Add type safety checks after parsing JSON
// TODO: Define specific keys for different parts of the application state (e.g., 'chatHistory', 'userSettings')
