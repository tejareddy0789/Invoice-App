# Invoice App

Invoice App is a web-based application designed to streamline the process of creating, managing, and viewing invoices. Built with React and Vite, this app provides an intuitive user interface and efficient state management for handling invoice-related tasks.

## Features

- **Create Invoices**: Easily generate new invoices with a user-friendly form.
- **View Invoice List**: Access a list of all created invoices in one place.
- **Invoice Details**: View detailed information about each invoice.
- **Responsive Design**: Optimized for various screen sizes and devices.

## Project Structure

The project is organized as follows:

```
invoice-app/
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── component/
│   │   ├── AppContent.jsx
│   │   ├── BillForm.jsx
│   │   ├── BillList.jsx
│   │   ├── Header.jsx
│   │   └── InvoiceDetails.jsx
│   └── store/
│       ├── InvoiceSlice.js
│       └── store.js
```

## Technologies Used

- **Frontend**: React, Vite
- **State Management**: Redux Toolkit
- **Styling**: CSS

## Components

- **Header**: Displays the app's title and navigation.
- **AppContent**: Wraps the main content of the application.
- **BillForm**: A form for creating and editing invoices.
- **BillList**: Displays a list of all invoices.
- **InvoiceDetails**: Shows detailed information about a selected invoice.

## State Management

The app uses Redux Toolkit for state management. The `InvoiceSlice.js` file contains the logic for managing invoice-related state, while `store.js` sets up the Redux store.

## Assets

Static assets such as images and icons are stored in the `src/assets/` directory.

## Public Folder

The `public/` folder contains static files that are served directly, such as the Vite logo.

## Contribution

Contributions are always welcome! If you find a bug or have an idea for improvement, feel free to fork the repository, make your changes, and submit a pull request.
