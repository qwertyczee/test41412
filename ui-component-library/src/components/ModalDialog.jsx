
import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

function ModalDialog({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        transition // Enable transitions for backdrop
      />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel */}
        <DialogPanel
          className="max-w-lg space-y-4 rounded-lg bg-white p-8 shadow-xl duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          transition // Enable transitions for panel
        >
          {title && (
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
          )}
          {/* Optional: Use <DialogDescription> from Headless UI here for better accessibility if needed */}
          <div className="text-sm text-gray-600">
            {children}
          </div>
          {/* Headless UI handles basic focus trapping. Customizations can be added if needed. */}
          {/* Consider adding autofocus to a specific element using data-autofocus or autoFocus prop */}
          {/* Example: Add buttons or interactive elements here */}
          <div className="flex justify-end gap-4 mt-4">
             {/* Example Close Button - users will typically add their own action buttons */}
             <button
               type="button"
               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
               onClick={onClose} // Use the provided onClose handler
             >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ModalDialog;
