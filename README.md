# SakuraCafe

![SakuraCafe](./sakura-cafe.jpg)

## Overview

SakuraCafe is a website of a Japanese cuisine cafe. The main (fictitious) idea of the website is to provide an addictive site for Ukrainian users who are located in Japan, namely in the city of Tokyo. The website is fully Ukrainian-language and provides an intuitive and visually appealing interface that allows users to explore the cafe's menu, learn about its offers, place orders and interact with the cafe through various functions.

## Static DEMO Version

Check out the static DEMO version of the site on Netlify: [SakuraCafe Netlify DEMO](https://polite-pithivier-e08431.netlify.app/).

This version includes all features except server-side and database interactions.

## Server Side API (sakura-cafe-api)

Explore the server-side logic of SakuraCafe API in the [sakura-cafe-api repository](https://github.com/GamesFire/sakura-cafe-api.git). This repository handles various server-side operations, including database interactions, authentication, and more.

## Technology Stack

- **Vite**: Fast build tool for modern web development.
- **TypeScript**: Typed JavaScript at scale.
- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: State management library for React applications.
- **RTK Query**: Toolset for fetching, caching, and updating server state in Redux applications.
- **Tailwind CSS**: Utility-first CSS framework for designing custom user interfaces.
- **Material UI**: React components for faster and easier web development.

## Features

1. **Dynamic Content**: Home page, menu, about cafe, contacts, privacy policy, and terms and conditions pages.
2. **Menu Functionality**:
   - Categories with dish cards.
   - Search by name and sorting functionalities.
3. **Role-Based System**:
   - Guest: Initial role upon registration.
   - User: Access to order placement and order history upon email confirmation.
   - Administrator: Full CRUD access to site content and order management.
4. **Authentication and Authorization**:
   - JWT tokens for secure authentication.
   - Access token expires in 15 minutes; update token valid for 30 days.
5. **Order Management**:
   - Users can place, view, and cancel orders.
   - Administrators can confirm or reject orders.
6. **Rating System**:
   - Users can rate dishes, and ratings contribute to the dish's overall rating.
7. **Contact Us**:
   - Users can submit reviews, visible to administrators for review and response.
8. **Map Integration**:
   - A map displaying the location of SakuraCafe. Note: The location is fictional and not a real cafe, as the actual location hosts a different Japanese cafe.

## Detailed Features

### Rating System

- **Rating Each Dish**: Allows verified users to rate food products based on their satisfaction, helping other users make informed choices.
- **User Ratings**: Users can rate each food item from 1 to 5 stars.
- **Average Rating**: The average rating of all user ratings is displayed on each food card.

### Order Placement and History

- **Order Placement**: Users can place orders with the selected items in their tray.
- **Order History**: Users can view the items in their tray and place orders. After a successful order, it appears in the order history with a status of "pending".
- **Order Cancellation**: Users also have the option to cancel their last order.

### Admin Panel

- **Role Management**: Administrators can grant the role of administrator to verified users.
- **CRUD Operations**: Administrators can perform the entire CRUD cycle on categories, food items, and ingredients.
- **Order Management**: Administrators can reject or approve orders.
- **Feedback Management**: Administrators can review and mark feedback as "processed".

## Installation

1. **Clone Repository**:

   ```bash
   git clone https://github.com/GamesFire/sakura-cafe.git
   ```

2. **Install Dependencies**:

   ```bash
   cd sakura-cafe
   npm install
   ```

3. **Run Development Server**:

   ```bash
   npm run dev
   ```

4. **Build and Preview for Production**:

   ```bash
   npm run build
   npm run preview
   ```

5. **Environment Variables**:
   Create a `.env` file based on `.env.local` and configure necessary variables.

## Usage

- Access the SakuraCafe website at `http://localhost:5173` for development or at `http://localhost:4173` for production in your browser.
- Explore different pages, functionalities, and interact with the site as a guest, user, or administrator.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests to contribute to the development of SakuraCafe.
