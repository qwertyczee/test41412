
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Notification = ({ 
  message, 
  type = 'info',
  duration = 5000,
  onDismiss,
  dismissible = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef();

  const typeConfig = {
    success: {
      icon: CheckCircleIcon,
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      iconColor: 'text-green-400'
    },
    error: {
      icon: ExclamationCircleIcon,
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      iconColor: 'text-red-400'
    },
    warning: {
      icon: ExclamationTriangleIcon,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-400'
    },
    info: {
      icon: InformationCircleIcon,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-400'
    }
  };

  const { icon: Icon, bgColor, textColor, iconColor } = typeConfig[type];

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        handleDismiss();
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`rounded-md p-4 ${bgColor} mb-4`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>
            {message}
          </p>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={handleDismiss}
                className={`inline-flex rounded-md ${bgColor} p-1.5 ${iconColor} hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type}-500`}
                aria-label="Dismiss"
              >
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  duration: PropTypes.number,
  onDismiss: PropTypes.func,
  dismissible: PropTypes.bool
};

export default Notification;
