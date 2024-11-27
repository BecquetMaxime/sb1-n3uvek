-- Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    phone VARCHAR(20),
    role ENUM('user', 'admin') DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Rooms table
CREATE TABLE rooms (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    longDescription TEXT,
    price DECIMAL(10, 2) NOT NULL,
    theme VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Room amenities table
CREATE TABLE room_amenities (
    id VARCHAR(36) PRIMARY KEY,
    roomId VARCHAR(36),
    amenity VARCHAR(100) NOT NULL,
    FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Room images table
CREATE TABLE room_images (
    id VARCHAR(36) PRIMARY KEY,
    roomId VARCHAR(36),
    imageUrl VARCHAR(255) NOT NULL,
    sortOrder INT DEFAULT 0,
    FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Bookings table
CREATE TABLE bookings (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36),
    roomId VARCHAR(36),
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    stripePaymentId VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (roomId) REFERENCES rooms(id)
);

-- User consents table
CREATE TABLE user_consents (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36),
    marketing BOOLEAN DEFAULT FALSE,
    analytics BOOLEAN DEFAULT FALSE,
    termsAccepted BOOLEAN NOT NULL,
    privacyAccepted BOOLEAN NOT NULL,
    ipAddress VARCHAR(45),
    userAgent TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert initial admin user
INSERT INTO users (id, email, password, firstName, lastName, role)
VALUES (
    UUID(),
    'admin@spas-galame.fr',
    '$2b$10$YourHashedPasswordHere', -- Will be replaced with actual hashed password
    'Admin',
    'User',
    'admin'
);