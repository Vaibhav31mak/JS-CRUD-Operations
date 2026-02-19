# Product Management System (JavaScript CRUD App)

## Overview
This is a **Product Management System** built using **Vanilla JavaScript**, HTML, and CSS.  
The application allows users to manage products with full CRUD functionality, filtering, sorting, and client-side routing using browser features.

Data persistence is handled using **localStorage**, so products remain available after page refresh.

---

## Features

### CRUD Operations
- Create new product
- View product list
- Update existing product - UI comes in place of the add product instead of opening new page
- Delete product

### Product Attributes
- Product ID
- Product Name
- Image
- Price
- Description

### Additional Functionality
- Filter product by Product ID
- Sort products by:
  - Product ID
  - Product Name
  - Price
- Form validation

---

## Git Workflow

This project was developed using a **feature branch workflow**.

### Feature Branches Used
feature/html-setup
feature/core-crud
feature/filter


### Branch Purpose

#### `feature/html-setup`
- Base HTML structure
- Layout setup
- Page sections and UI skeleton

#### `feature/core-crud`
- Product model structure
- Create, Read, Update, Delete operations
- localStorage integration

#### `feature/filter`
- Product filtering functionality
- Sorting implementation

---

## Versions (Git Tags)

Two versions have been tagged during development:

v1.0
v2.0


### Version Notes

**v1.0**
- Initial working CRUD implementation
- Basic UI and localStorage support
- Filtering and sorting added

**v2.0**
- Improved validation and routing structure
- Image CRUD added with the help of local storage

---

## Storage
- Browser `localStorage` is used for data persistence.
- No backend or database required.

---

## Technologies Used
- HTML5
- Bootstrap
- CSS3
- JavaScript (Vanilla JS)
- Browser localStorage API

---

## Running the Project

1. Clone the repository
2. Open `index.html` in a browser

No build tools or dependencies required.

---

## Notes
- This project is built for learning and demonstration of JavaScript CRUD operations, Git Workflow and Bootstrap.
- Focus areas include modular structure, feature-based development, and clean separation of concerns.

---
