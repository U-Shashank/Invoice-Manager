# Invoice Management System

This project is a comprehensive invoice management system built with Next.js 15, Prisma, and Tailwind CSS. It provides a robust and user-friendly platform for creating, managing, and tracking invoices.

## Live Link

[Live Demo Link Here]

## Demo Video

[Demo Video Link Here]

## Features

-   **User Authentication:** Secure user authentication using NextAuth.js, supporting email and potentially other providers.
-   **Invoice Management:** Create, edit, delete, and mark invoices as paid. Generate unique invoice IDs and view detailed invoice information.
-   **Dashboard:** Overview of key invoice metrics, graphical representation of invoice data, recent invoices display, and quick links to important pages.
-   **Email Integration:** Sends emails using Mailtrap for invoice-related notifications.
-   **Database:** Uses Prisma ORM with a PostgreSQL database.
-   **UI Components:** Utilizes a rich set of reusable UI components built with Tailwind CSS and Shadcn UI.
-   **Form Validation:** Implements form validation using Zod.
-   **Currency Formatting:** Provides currency formatting.
-   **Magic UI:** Custom UI components for specific functionalities.
-   **Responsive Design:** Ensures a seamless experience across various devices.
-   **Notifications:** Uses Sonner for user notifications.

## Technologies Used

-   **Next.js 15:** React framework for server-side rendering and routing.
-   **Prisma:** ORM for database access.
-   **Tailwind CSS:** Utility-first CSS framework.
-   **NextAuth.js:** Authentication library.
-   **Zod:** Schema validation library.
-   **Shadcn UI:** Beautifully designed, accessible components built with Radix UI and Tailwind CSS.
-   **Mailtrap:** Email testing and sending service.
-   **TypeScript:** Static typing for improved code quality.
-   **Sonner:** Notification library.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/U-Shashank/Invoice-Manager.git
    cd Invoice-Manager
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    -   Create a `.env` file in the root directory.
    -   Add the necessary environment variables.
    -   Example:
        ```
        DATABASE_URL="your_postgresql_connection_string"
        AUTH_SECRET="your_auth_secret"
        HOSTED_URL="http://localhost:3000"
        MAILTRAP_TOKEN="your_mailtrap_token"
        EMAIL_SERVER_USER="api"
        EMAIL_SERVER_PASSWORD="your_email_server_password"
        EMAIL_SERVER_HOST="your_smtp_host"
        EMAIL_SERVER_PORT="587"
        EMAIL_FROM="your_email_from_address"
        ```

4.  **Run database migrations:**

    ```bash
    pnpm prisma migrate dev
    ```

5.  **Start the development server:**

    ```bash
    pnpm dev
    ```

6.  **Open your browser and navigate to `http://localhost:3000`.**

## License

[MIT](LICENSE)