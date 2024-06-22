# Application Setup and Development Documentation

## Getting Started

This guide will help you set up and run the Matching Game application locally. Follow these steps to get started.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 20.x or higher)
- [npm](https://www.npmjs.com/get-npm) (version 10.5.x or higher)

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/GreoN5/matching_game.git matching-game
```
```bash
cd matching-game
```

## Install Dependencies
Install the necessary dependencies by running:
```bash
npm install
```

## Environment Variables
Create a `.env` or `.env.local` file in the root directory and add the following environment variable:
```env
NEXT_PUBLIC_API_URL=https://lenotask.000webhostapp.com/getCountiesData
NEXT_PUBLIC_API_TOKEN=c4caaefe5fa7dc03456136d044ab89555941a2
```

## Running the Application
To run the application in development mode, use the following command:
```bash
npm run dev
```
Open your browser and navigate to http://localhost:3000 to view the application.

## Running Tests
To run the tests using Jest, use the following command:
```bash
npm run test
```

## Technical Choices and Challenges
### Technical Choices
Next.js: Chosen for its server-side rendering capabilities, which improve performance and SEO.

React: Utilized for building user interfaces and managing component state.

Tailwind CSS: Selected for its utility-first approach to styling, allowing rapid and consistent UI development.

Jest: Employed for testing due to its powerful features and ease of use with React components.


## Challenges Faced
SSR and State Management: Integrating server-side rendering with client-side state management was complex. 
Managed to utilized Next.js's built-in SSR features and managed state using React's built-in state management hooks.

Drag-and-Drop Functionality: Implementing a user-friendly drag-and-drop interface with proper matching logic.
Used popular react library instead of going from scratch and waisting valuable time - `react-beautiful-dnd`.
