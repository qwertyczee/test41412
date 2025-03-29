
// frig-ai-chat/src/app/hooks/useKeyboardShortcuts.ts
"use client";

import { useEffect, useCallback } from 'react';

// Define a type for shortcut actions
type ShortcutAction = string;

// Define a map or configuration for shortcuts
const shortcutMap: Record<string, ShortcutAction> = {
  'ctrl+k': 'openSearch', // Example
  'ctrl+b': 'toggleLeftSidebar', // Example
  'alt+t': 'openTerminalTab', // Example
  // Add more shortcuts as needed (e.g., save, new chat, switch tabs)
};

// Define props interface
interface UseKeyboardShortcutsProps {
  onShortcutTrigger: (action: ShortcutAction) => void;
}

const useKeyboardShortcuts = ({ onShortcutTrigger }: UseKeyboardShortcutsProps) => {

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    let shortcutKey = '';

    if (event.ctrlKey) shortcutKey += 'ctrl+';
    if (event.metaKey) shortcutKey += 'meta+'; // Command key on Mac
    if (event.altKey) shortcutKey += 'alt+';
    if (event.shiftKey) shortcutKey += 'shift+';
    shortcutKey += key;

    const action = shortcutMap[shortcutKey];

    if (action) {
      // Prevent default browser behavior for matched shortcuts
      // Be selective about which defaults to prevent (e.g., ctrl+s for save)
      event.preventDefault();
      console.log(`Shortcut triggered: ${shortcutKey} -> Action: ${action}`);
      onShortcutTrigger(action);
    }
    // Consider handling keydown events in specific contexts (e.g., only when not typing in an input)
    // Implement Ctrl+Enter or Shift+Enter for sending messages in chat input elsewhere

  }, [onShortcutTrigger]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // This hook doesn't return anything directly, it just sets up the listener
};

export default useKeyboardShortcuts;

// Example usage (in a component):
// const handleShortcut = (action: ShortcutAction) => {
//   console.log(`Handling action: ${action}`);
//   // Implement logic based on the action (e.g., open modal, focus element)
// };
// useKeyboardShortcuts({ onShortcutTrigger: handleShortcut });
