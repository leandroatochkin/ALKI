📘 ALKI Documentation
🧠 Overview
ALKI is a modern, modular web application built with React, TypeScript, and Vite. It leverages MUI for styling and integrates various libraries to enhance functionality and user experience.

🚀 Features
React & TypeScript: Ensures type safety and efficient component-based architecture.

Vite: Provides fast development and optimized builds.

MUI: Offers utility-first styling for rapid UI development.

React Router: Manages client-side routing seamlessly.

React Hook Form: Simplifies form handling and validation.

Redux: Manages global state and application logic.

Redux Toolkit: Manages server state and data fetching.



📁 Project Structure
pgsql
Copiar
Editar
ALKI/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
🛠️ Installation
Clone the repository:

bash
Copiar
Editar
git clone https://github.com/leandroatochkin/ALKI.git
cd ALKI
Install dependencies:

bash
Copiar
Editar
npm install
Start the development server:

bash
Copiar
Editar
npm run dev
Build for production:

bash
Copiar
Editar
npm run build
Preview the production build:

bash
Copiar
Editar
npm run preview


📦 Dependencies
Key dependencies include:



react-router-dom

react-hook-form

react-spinners

MUI/material

framer-motion


For a complete list, refer to the package.json file.

🔧 Configuration

TypeScript: Configured with tsconfig.json.

Vite: Build and development settings in vite.config.ts.

📄 License
Specify the license under which ALKI is distributed. For example:

This project is licensed under the MIT License.

🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.


-TABLES SCHEMAS-

USERS

```
CREATE TABLE users (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    firstName VARCHAR(255) DEFAULT NULL,
    lastName VARCHAR(255) DEFAULT NULL,
    middleName VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber VARCHAR(20) DEFAULT NULL,
    countryCode VARCHAR(5) DEFAULT NULL,
    addressLine1 VARCHAR(255) DEFAULT NULL,
    addressLine2 VARCHAR(255) DEFAULT NULL,
    monthlyRevenue DECIMAL(15,2) DEFAULT NULL,
    state VARCHAR(100) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    postalCode VARCHAR(20) DEFAULT NULL,
    autoCalculateMRR TINYINT(1) DEFAULT NULL,
    theme VARCHAR(20) DEFAULT 'light',
    permissions VARCHAR(50) DEFAULT NULL,
    isPremium TINYINT(1) DEFAULT NULL,
    parentUserId VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isNew TINYINT(1) DEFAULT NULL
);
```

TENANTS
```
CREATE TABLE tenants (
    tenantId VARCHAR(255) NOT NULL PRIMARY KEY,
    propietorId VARCHAR(255) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) DEFAULT NULL,
    phoneNumber VARCHAR(50) DEFAULT NULL,
    observations TEXT DEFAULT NULL,
    contractStartDate DATE NOT NULL,
    contractEndDate DATE NOT NULL,
    contractStatus VARCHAR(50) NOT NULL,
    contractId VARCHAR(255) DEFAULT NULL,
    contractType VARCHAR(100) DEFAULT NULL,
    contractValue DECIMAL(12,2) NOT NULL,
    contractCurrency VARCHAR(10) NOT NULL,
    contractPaymentMethod INT NOT NULL,
    contractPaymentFrequency VARCHAR(50) NOT NULL,
    pets INT DEFAULT 0,
    children INT DEFAULT 0,
    smoking TINYINT(1) DEFAULT 0,
    propertyId VARCHAR(255) DEFAULT NULL,
    terminationReason TEXT DEFAULT NULL,
    isActive TINYINT(1) DEFAULT NULL
);
```

PROPERTIES
```
CREATE TABLE properties (
    propId VARCHAR(255) NOT NULL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    title VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    state VARCHAR(100) DEFAULT NULL,
    country VARCHAR(100) DEFAULT NULL,
    occupied TINYINT(1) DEFAULT 0,
    type INT DEFAULT NULL
);
```

SERVICES
```

CREATE TABLE services (
    serviceId VARCHAR(36) NOT NULL PRIMARY KEY,
    propertyId VARCHAR(36) DEFAULT NULL,
    serviceName VARCHAR(255) DEFAULT NULL,
    serviceCost BIGINT DEFAULT NULL,
    serviceResponsibility VARCHAR(50) DEFAULT NULL,
    serviceDescription VARCHAR(255) DEFAULT NULL,
    userId VARCHAR(36) DEFAULT NULL
);
```

PAYMENTS
```
CREATE TABLE payments (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    tenantId VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    method INT NOT NULL,
    period VARCHAR(50) NOT NULL,
    status INT NOT NULL,
    userId VARCHAR(36) DEFAULT NULL,
    INDEX idx_tenantId (tenantId)
);
```

ORGANIZATIONS
```
CREATE TABLE organizations (
    organizationId VARCHAR(36) NOT NULL PRIMARY KEY,
    userId VARCHAR(36) DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL,
    name VARCHAR(100) DEFAULT NULL
);
```

ORGANIZATION MEMBERS
```
CREATE TABLE organization_members (
    memberId VARCHAR(36) NOT NULL PRIMARY KEY,
    organizationId VARCHAR(36) DEFAULT NULL,
    creatorId VARCHAR(36) DEFAULT NULL,
    name VARCHAR(36) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    permissions TEXT DEFAULT NULL,
    acceptedInvite TINYINT(1) DEFAULT NULL
);
```

INVENTORIES
```
CREATE TABLE inventories (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    propertyId VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

INVENTORY ITEMS
```
CREATE TABLE inventory_items (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    inventoryId VARCHAR(255) NOT NULL,
    declaredPrice BIGINT DEFAULT NULL
);
```

TENANT USERS
```
CREATE TABLE tenantUsers (
    id VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    invitationToken VARCHAR(36),
    tenantTableReferenceId VARCHAR(255) PRIMARY KEY,
    firstName VARCHAR(255) DEFAULT NULL,
    lastName VARCHAR(255) DEFAULT NULL,
    middleName VARCHAR(255) DEFAULT NULL,
    parentUserId VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);
