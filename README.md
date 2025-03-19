# Plant Care Application

## Watering Reminders Feature

The application now includes an automated watering reminder system that helps users keep track of their plants' watering schedules. The system:

- Calculates next watering dates based on each plant's watering frequency
- Sends daily email reminders at 9:00 AM for plants that need watering
- Updates last watered date automatically when watering events are recorded

### Configuration

To enable email reminders, add the following to your `.env` file:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

Note: For Gmail, you'll need to use an App-Specific Password. Regular password won't work due to security settings.

### API Endpoints

New endpoint for recording watering events:
- POST `/api/care-events/watering`
  - Requires authentication
  - Body: `{ plantId, date, notes }`
  - Updates plant's lastWatered date automatically

### Technical Implementation

- Uses node-cron for scheduling daily checks
- Implements email notifications using nodemailer
- Stores watering frequency and last watered date for each plant
- Includes utility functions for date calculations and formatting
