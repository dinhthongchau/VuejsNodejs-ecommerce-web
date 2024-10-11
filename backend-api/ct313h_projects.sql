CREATE TABLE Product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255),
    product_price DECIMAL(10, 2),
    product_color VARCHAR(100),
    product_description TEXT,
    product_image VARCHAR(1000)
);

CREATE TABLE Customer (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(10),
    customer_address VARCHAR(255)
);

CREATE TABLE Cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_total DECIMAL(10, 2),
    order_payment_method VARCHAR(50),
    order_status VARCHAR(50),
    order_note VARCHAR(255),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

