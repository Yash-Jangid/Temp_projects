# Event Management System

## Overview

This project is an Event Management System designed to manage events with features including CRUD operations, image uploads, and more. It includes both a frontend built with React and a backend developed using NestJS.

## Features

- **Event Creation**: Create new events with details including name, description, start and end dates, total guests, and images.
- **Event Management**: Update and delete events.
- **Image Uploads**: Supports uploading multiple images for each event.
- **Pagination and Filtering**: Allows fetching events with pagination, filtering, and searching.

## Setup

### Backend Setup

1. **Clone the Repository**

    ```bash
    git clone git@github.com:Yash-Jangid/Temp_projects.git
    ```

2. **Navigate to the Backend Directory**

    ```bash
    cd Temp_projects/event-management-backend
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Set Up Environment Variables**

    Create a `.env` file in the root of the backend directory and add the following variables:

    ```plaintext
    DATABASE_URL=mysql://username:password@localhost:3306/your-database
    ```

5. **Run Migrations**

    Ensure the database is correctly set up with the required tables:

    ```bash
    npx sequelize-cli db:migrate
    ```

6. **Start the Backend Server**

    ```bash
    npm run start:dev
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

    ```bash
    cd Temp_projects/event-management-frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the Frontend Application**

    ```bash
    npm start
    ```

## Troubleshooting

### Known Issues

- **Image Path Not Saving Correctly**: 
  Due to an issue with free-hosted SQL databases, image paths may not be saving correctly. This is often due to incorrect image paths being generated. The solution involves configuring Multer correctly to ensure that it passes the correct image path. Check your Multer setup in the backend to ensure that image paths are being handled correctly.

### Performance Issues

- **Slow Response Times**: 
  Performance issues may arise due to the limitations of free-hosted SQL databases. Consider optimizing queries or using a more robust database solution if performance becomes a significant issue.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any issues or questions, please reach out to [Yash Jangid](mailto:yashjangid8078@gmail.com).

