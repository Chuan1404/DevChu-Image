# DEVCHU IMAGE

## 1. Introduction

DevChu Image is a web-based platform designed for trading image files. The system is built with **ReactJS** for the frontend and **Node.js** with **TypeScript** for the backend, utilizing **ExpressJS** and **MongoDB** for data storage. It follows a layered architecture, applying Object-Oriented Programming (OOP) techniques and adhering to SOLID principles for maintainable and scalable development.

### 1.1. Models

#### Users Table
| Column        | Data Type                                 | Description                                      |
|---------------|-------------------------------------------|--------------------------------------------------|
| id            | CHAR(36)                                  | Primary key (unique identifier)                  |
| email         | VARCHAR(100)                              | User email (unique)                              |
| password      | TEXT                                      | User password                                    |
| name          | VARCHAR(50)                               | User name                                        |
| avatar        | VARCHAR(255)                              | Avatar URL or path                               |
| accountStatus | ENUM ('VERIFIED', 'UNVERIFIED', 'BANNED') | User account status                              |
| role          | ENUM ('ROLE_CUSTOMER', 'ROLE_ADMIN', 'ROLE_EDITOR') | User role                              |
| createdAt     | TIMESTAMP                                 | Timestamp of creation                            |
| updatedAt     | TIMESTAMP                                 | Timestamp of last update                         |

#### Uploaded_files Table
| Column     | Data Type           | Description                                      |
|------------|---------------------|--------------------------------------------------|
| id         | CHAR(36)            | Primary key (unique identifier)                  |
| title      | VARCHAR(100)        | File title (unique)                              |
| price      | DOUBLE              | File price                                       |
| root       | VARCHAR(255)        | Path for the root image                          |
| display    | VARCHAR(255)        | Path for the display image                       |
| medium     | VARCHAR(255)        | Path for the medium image                        |
| high       | VARCHAR(255)        | Path for the high-quality image                  |
| size       | DECIMAL(4, 2)       | File size                                        |
| width      | SMALLINT UNSIGNED   | Image width                                      |
| height     | SMALLINT UNSIGNED   | Image height                                     |
| status     | ENUM ("ACTIVE", "INACTIVE", "DELETED") | File status      |
| file_type  | ENUM ("jpeg", "jpg", "png") | Image file type                                |
| createdAt  | TIMESTAMP           | Timestamp of creation                            |
| updatedAt  | TIMESTAMP           | Timestamp of last update                         |
| userId     | CHAR(36)            | Foreign key referencing `users.id`               |



---

## 2. Features

### 2.1. Front-end

- **Main Tech Stack:** ReactJS, SCSS, Material-UI (MUI)
- **Key Features:**
  - Responsive and user-friendly interface.
  - Advanced filtering options:
    - Filter products by price range, file type, and file name.
    - Provide seamless search and browsing experiences.

---

### 2.2. Back-end

- **Main Tech Stack:** Node.js, ExpressJS, TypeScript, Prisma (ORM framework)
- **Database:** MongoDB
- **Key Features:**
  1. **Architecture & Scalability:**
     - Modular and scalable **Dependency Injection (DI)** architecture using **Tsyringe**.
  2. **Authentication & Security:**
     - User authentication and authorization via **JWT**.
     - Integrated **email verification** with Google's secure account verification codes.
  3. **Image Quality & Validation:**
     - File quality verification:
       - **Image quality checks**
       - File type validation
       - Automated **image resizing**.
  4. **Cloud Storage:**
     - Secure and efficient image storage and management using **Amazon S3**.
---
