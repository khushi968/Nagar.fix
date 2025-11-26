# Local Government Problem Reporter – AI Powered (Nagar Seva)

A web application where citizens can report local issues (potholes, garbage, streetlights), and GenAI enhances the reports, auto-categorizes them, detects severity, and provides an admin dashboard to manage complaints.

## Features

- **AI-Enhanced Reporting**: Automatically improves the clarity of problem descriptions.
- **Auto-Categorization**: AI detects if the issue is a Pothole, Garbage, Streetlight, etc.
- **Severity Detection**: AI analyzes the urgency of the report (High/Medium/Low).
- **Admin Dashboard**: View, filter, and manage reports.
- **Auto-Reply**: Generate professional responses to citizens using AI.
- **Dual Storage**: Supports both Backend (JSON file) and LocalStorage.

## Prerequisites

- Node.js installed
- OpenAI API Key (Optional, for AI features)

## Installation

1. Clone the repository or navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API Key:
   ```
   OPENAI_API_KEY=your_api_key_here
   PORT=3000
   ```

## Running the Application

### Full Stack Mode (Recommended)
This runs the Express backend which serves the frontend and handles data storage.

```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Frontend Only Mode
You can also just open `public/index.html` directly in your browser. The app will automatically fallback to `LocalStorage` if the backend is not reachable (though some AI features might need the backend proxy in a real production environment, here they are client-side for demo).

## Project Structure

- `public/`: Frontend files (HTML, CSS, JS)
- `backend/`: Node.js/Express server and logic
- `config/`: Configuration files
- `backend/data/reports.json`: JSON database for reports

## AI Capabilities

The app uses OpenAI's GPT models to:
1. **Enhance Description**: Rewrites user input to be more formal and detailed.
2. **Detect Category**: Classifies the issue based on keywords and context.
3. **Detect Severity**: Determines the urgency based on the description.
4. **Generate Reply**: Drafts an official response for the admin.

---
*Built for the Local Government Problem Reporter Challenge.*
