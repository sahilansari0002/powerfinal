-- Women Support NGO Database Schema
CREATE DATABASE IF NOT EXISTS women_support_ngo;
USE women_support_ngo;

-- Help Requests Table
CREATE TABLE help_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    problem_description TEXT NOT NULL,
    priority ENUM('EMERGENCY', 'HIGH', 'MEDIUM') DEFAULT 'MEDIUM',
    status ENUM('NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    assigned_to VARCHAR(255) NULL,
    notes TEXT NULL
);

-- Contact Messages Table
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    subject VARCHAR(255) NULL,
    message TEXT NOT NULL,
    type ENUM('GENERAL', 'INQUIRY', 'FEEDBACK', 'COMPLAINT') DEFAULT 'GENERAL',
    status ENUM('NEW', 'READ', 'REPLIED', 'CLOSED') DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Donations Table
CREATE TABLE donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donor_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    donation_type ENUM('ONE_TIME', 'MONTHLY', 'YEARLY') DEFAULT 'ONE_TIME',
    purpose VARCHAR(255) NULL,
    payment_method VARCHAR(50) NULL,
    transaction_id VARCHAR(255) NULL,
    status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Volunteers Table
CREATE TABLE volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    age INT NULL,
    gender ENUM('FEMALE', 'MALE', 'OTHER') NULL,
    education VARCHAR(255) NULL,
    profession VARCHAR(255) NULL,
    skills TEXT NULL,
    availability VARCHAR(255) NULL,
    experience TEXT NULL,
    motivation TEXT NULL,
    emergency_contact_name VARCHAR(255) NULL,
    emergency_contact_phone VARCHAR(20) NULL,
    status ENUM('PENDING', 'APPROVED', 'ACTIVE', 'INACTIVE') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Activities Table
CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('AWARENESS', 'COUNSELING', 'COMMUNITY', 'EVENTS', 'TRAINING') NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    participants_count INT DEFAULT 0,
    target_participants INT NULL,
    status ENUM('PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED') DEFAULT 'PLANNED',
    organizer VARCHAR(255) NULL,
    budget DECIMAL(10,2) NULL,
    actual_cost DECIMAL(10,2) NULL,
    impact_description TEXT NULL,
    photos TEXT NULL, -- JSON array of photo URLs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Impact Metrics Table
CREATE TABLE impact_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metric_name VARCHAR(255) NOT NULL,
    metric_value INT NOT NULL,
    metric_type ENUM('WOMEN_HELPED', 'STATES_COVERED', 'VOLUNTEERS', 'ACTIVITIES', 'DONATIONS_RECEIVED') NOT NULL,
    period_start DATE NULL,
    period_end DATE NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Support Cases Table
CREATE TABLE support_cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_number VARCHAR(50) UNIQUE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    client_city VARCHAR(100) NOT NULL,
    case_type ENUM('DIVORCE', 'HARASSMENT', 'DOMESTIC_VIOLENCE', 'LEGAL_AID', 'MARRIAGE_SUPPORT', 'COUNSELING') NOT NULL,
    priority ENUM('EMERGENCY', 'HIGH', 'MEDIUM', 'LOW') DEFAULT 'MEDIUM',
    status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REFERRED') DEFAULT 'OPEN',
    description TEXT NOT NULL,
    assigned_counselor VARCHAR(255) NULL,
    assigned_lawyer VARCHAR(255) NULL,
    case_notes TEXT NULL,
    resolution_notes TEXT NULL,
    follow_up_required BOOLEAN DEFAULT TRUE,
    next_follow_up_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NULL
);

-- Newsletter Subscriptions Table
CREATE TABLE newsletter_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NULL,
    status ENUM('ACTIVE', 'UNSUBSCRIBED') DEFAULT 'ACTIVE',
    subscription_source VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_type ENUM('WORKSHOP', 'SEMINAR', 'CONFERENCE', 'TRAINING', 'AWARENESS', 'FUNDRAISER') NOT NULL,
    location VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_participants INT NULL,
    registered_participants INT DEFAULT 0,
    registration_fee DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED') DEFAULT 'UPCOMING',
    organizer VARCHAR(255) NULL,
    contact_person VARCHAR(255) NULL,
    contact_phone VARCHAR(20) NULL,
    registration_required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Event Registrations Table
CREATE TABLE event_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    participant_name VARCHAR(255) NOT NULL,
    participant_email VARCHAR(255) NULL,
    participant_phone VARCHAR(20) NOT NULL,
    participant_city VARCHAR(100) NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attendance_status ENUM('REGISTERED', 'ATTENDED', 'NO_SHOW', 'CANCELLED') DEFAULT 'REGISTERED',
    payment_status ENUM('PENDING', 'PAID', 'WAIVED', 'REFUNDED') DEFAULT 'PENDING',
    special_requirements TEXT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_help_requests_priority ON help_requests(priority);
CREATE INDEX idx_help_requests_status ON help_requests(status);
CREATE INDEX idx_help_requests_created ON help_requests(created_at);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_volunteers_status ON volunteers(status);
CREATE INDEX idx_activities_category ON activities(category);
CREATE INDEX idx_activities_date ON activities(date);
CREATE INDEX idx_support_cases_status ON support_cases(status);
CREATE INDEX idx_support_cases_priority ON support_cases(priority);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);

-- Insert sample data
INSERT INTO impact_metrics (metric_name, metric_value, metric_type, description) VALUES
('Total Women Helped', 2500, 'WOMEN_HELPED', 'Total number of women who received support'),
('States Covered', 15, 'STATES_COVERED', 'Number of Indian states where we operate'),
('Active Volunteers', 150, 'VOLUNTEERS', 'Current active volunteer count'),
('Activities Conducted', 200, 'ACTIVITIES', 'Total activities conducted this year'),
('Donations Received', 500000, 'DONATIONS_RECEIVED', 'Total donations received in INR');

-- Insert sample activities
INSERT INTO activities (title, description, category, location, date, participants_count, status, impact_description) VALUES
('Women Rights Workshop', 'Educational session on legal rights and protection laws', 'AWARENESS', 'Surat Community Center', '2024-01-15', 52, 'COMPLETED', '52 women learned about their legal rights'),
('Support Group Meeting', 'Group therapy session for domestic violence survivors', 'COUNSELING', 'Private Counseling Center', '2024-01-20', 18, 'COMPLETED', '18 survivors received emotional support'),
('Rural Community Outreach', 'Reaching out to rural communities for awareness', 'COMMUNITY', 'Villages near Surat', '2024-01-25', 200, 'COMPLETED', '200+ people reached in rural areas'),
('Annual Conference 2024', 'Annual gathering of supporters and beneficiaries', 'EVENTS', 'Surat Convention Hall', '2024-02-01', 300, 'COMPLETED', '300 participants celebrated progress'),
('Self Defense Training', 'Physical and mental self-defense workshop', 'TRAINING', 'Sports Complex', '2024-02-05', 35, 'COMPLETED', '35 women learned self-defense techniques');
