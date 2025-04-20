-- Create house owners table
CREATE TABLE IF NOT EXISTS house_owners (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) DEFAULT 0.00
);

-- Create houses table
CREATE TABLE IF NOT EXISTS houses (
    id UUID PRIMARY KEY,
    owner_id UUID REFERENCES house_owners(id),
    name VARCHAR(255) NOT NULL,
    keeper_name VARCHAR(255),
    keeper_phone VARCHAR(20),
    amenities TEXT,
    location VARCHAR(255)
);

-- Create house keepers table
CREATE TABLE IF NOT EXISTS house_keepers (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    house_id UUID REFERENCES houses(id),
    owner_id UUID REFERENCES house_owners(id)
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY,
    house_id UUID REFERENCES houses(id),
    room_no VARCHAR(50) NOT NULL,
    description TEXT,
    room_type VARCHAR(50),
    max_capacity INTEGER,
    price_per_hour DECIMAL(10,2),
    price_per_day DECIMAL(10,2),
    price_per_monthly DECIMAL(10,2),
    images TEXT[],
    videos TEXT[],
    status VARCHAR(50) DEFAULT 'available'
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20)
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY,
    renter_id UUID REFERENCES users(id),
    room_id UUID REFERENCES rooms(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending'
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY,
    owner_id UUID REFERENCES house_owners(id),
    amount DECIMAL(10,2) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL
);

-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    room_id UUID REFERENCES rooms(id)
);

-- Create rental history table
CREATE TABLE IF NOT EXISTS rental_history (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    room_id UUID REFERENCES rooms(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- Insert sample house owners
INSERT INTO house_owners (id, name, phone, email, amount) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'John Smith', '+1234567890', 'john@example.com', 5000.00),
('550e8400-e29b-41d4-a716-446655440001', 'Sarah Johnson', '+1234567891', 'sarah@example.com', 3500.00),
('550e8400-e29b-41d4-a716-446655440002', 'Michael Brown', '+1234567892', 'michael@example.com', 7500.00);

-- Insert sample houses
INSERT INTO houses (id, owner_id, name, keeper_name, keeper_phone, amenities, location) VALUES
('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Sunset Apartments', 'Tom Wilson', '+1987654321', 'WiFi, Parking, Security', 'Law Gate'),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Green Valley Residency', 'Alice Cooper', '+1987654322', 'Pool, Gym, Garden', 'Green Valley'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'City View Complex', 'Bob Martin', '+1987654323', 'WiFi, Security, Elevator', 'Law Gate');

-- Insert sample house keepers
INSERT INTO house_keepers (id, name, phone, email, house_id, owner_id) VALUES
('770e8400-e29b-41d4-a716-446655440000', 'Tom Wilson', '+1987654321', 'tom@example.com', '660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000'),
('770e8400-e29b-41d4-a716-446655440001', 'Alice Cooper', '+1987654322', 'alice@example.com', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001'),
('770e8400-e29b-41d4-a716-446655440002', 'Bob Martin', '+1987654323', 'bob@example.com', '660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002');

-- Insert sample rooms
INSERT INTO rooms (id, house_id, room_no, description, room_type, max_capacity, price_per_hour, price_per_day, price_per_monthly, images, videos, status) VALUES
('880e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'A101', 'Luxurious 2BHK with city view', '2BHK', 4, 20.00, 150.00, 3000.00, ARRAY['room1.jpg', 'room1_2.jpg'], ARRAY['tour1.mp4'], 'available'),
('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'B202', 'Cozy 1BHK studio apartment', '1BHK', 2, 15.00, 100.00, 2000.00, ARRAY['room2.jpg'], ARRAY['tour2.mp4'], 'available'),
('880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 'C303', 'Spacious 3BHK with balcony', '3BHK', 6, 30.00, 200.00, 4000.00, ARRAY['room3.jpg', 'room3_2.jpg'], ARRAY['tour3.mp4'], 'available');

-- Insert sample users
INSERT INTO users (id, name, email, phone) VALUES
('990e8400-e29b-41d4-a716-446655440000', 'David Wilson', 'david@example.com', '+1122334455'),
('990e8400-e29b-41d4-a716-446655440001', 'Emma Davis', 'emma@example.com', '+1122334456'),
('990e8400-e29b-41d4-a716-446655440002', 'James Taylor', 'james@example.com', '+1122334457');

-- Insert sample bookings
INSERT INTO bookings (id, renter_id, room_id, start_time, end_time, total_price, status) VALUES
('aa0e8400-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', '2024-01-01 14:00:00', '2024-01-01 20:00:00', 120.00, 'completed'),
('aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '2024-01-02 10:00:00', '2024-01-03 10:00:00', 100.00, 'active'),
('aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', '2024-02-01 12:00:00', '2024-03-01 12:00:00', 4000.00, 'pending');

-- Insert sample transactions
INSERT INTO transactions (id, owner_id, amount, transaction_type) VALUES
('bb0e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 120.00, 'credit'),
('bb0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 100.00, 'credit'),
('bb0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 4000.00, 'credit');

-- Insert sample wishlist entries
INSERT INTO wishlist (id, user_id, room_id) VALUES
('cc0e8400-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440002'),
('cc0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440000'),
('cc0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001');

-- Insert sample rental history
INSERT INTO rental_history (id, user_id, room_id, start_time, end_time, total_price) VALUES
('dd0e8400-e29b-41d4-a716-446655440000', '990e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440000', '2023-12-01 14:00:00', '2023-12-01 20:00:00', 120.00),
('dd0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '2023-12-02 10:00:00', '2023-12-03 10:00:00', 100.00),
('dd0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', '2023-11-01 12:00:00', '2023-12-01 12:00:00', 4000.00);