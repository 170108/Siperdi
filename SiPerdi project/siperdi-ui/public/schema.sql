  -- SiPerdi Database Schema (MySQL 8.x)
-- Created for: SMK Negeri 1 Cikarang Selatan

CREATE DATABASE IF NOT EXISTS siperdi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE siperdi;

-- Users (students + admins)
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role ENUM('student','admin') NOT NULL DEFAULT 'student',
  name VARCHAR(120) NOT NULL,
  nis VARCHAR(20) UNIQUE,
  class_name VARCHAR(50),
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255),
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Books (physical)
CREATE TABLE books (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  isbn VARCHAR(20),
  title VARCHAR(200) NOT NULL,
  author VARCHAR(120),
  publisher VARCHAR(120),
  publish_year SMALLINT,
  category VARCHAR(80),
  description TEXT,
  cover_url VARCHAR(255),
  location_shelf VARCHAR(50),
  total_stock INT NOT NULL DEFAULT 0,
  available_stock INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_books_title (title),
  INDEX idx_books_category (category)
) ENGINE=InnoDB;

-- Loan header
CREATE TABLE loans (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  loan_code VARCHAR(30) NOT NULL UNIQUE,
  loan_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status ENUM('pending','approved','rejected','borrowed','returned','overdue') NOT NULL DEFAULT 'pending',
  approved_by BIGINT UNSIGNED NULL,
  approved_at DATETIME NULL,
  notes VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_loans_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_loans_approved_by FOREIGN KEY (approved_by) REFERENCES users(id),
  INDEX idx_loans_user (user_id),
  INDEX idx_loans_status (status)
) ENGINE=InnoDB;

-- Loan items (one loan can have multiple books)
CREATE TABLE loan_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  loan_id BIGINT UNSIGNED NOT NULL,
  book_id BIGINT UNSIGNED NOT NULL,
  qty INT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_loan_items_loan FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE,
  CONSTRAINT fk_loan_items_book FOREIGN KEY (book_id) REFERENCES books(id),
  INDEX idx_loan_items_loan (loan_id),
  INDEX idx_loan_items_book (book_id)
) ENGINE=InnoDB;

-- Returns
CREATE TABLE returns (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  loan_item_id BIGINT UNSIGNED NOT NULL,
  return_date DATE NOT NULL,
  condition_note VARCHAR(120),
  late_days INT NOT NULL DEFAULT 0,
  fine_amount INT NOT NULL DEFAULT 0,
  processed_by BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_returns_loan_item FOREIGN KEY (loan_item_id) REFERENCES loan_items(id) ON DELETE CASCADE,
  CONSTRAINT fk_returns_processed_by FOREIGN KEY (processed_by) REFERENCES users(id),
  INDEX idx_returns_loan_item (loan_item_id)
) ENGINE=InnoDB;

-- Fines summary
CREATE TABLE fines (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  loan_id BIGINT UNSIGNED NOT NULL,
  total_amount INT NOT NULL DEFAULT 0,
  status ENUM('unpaid','paid','waived') NOT NULL DEFAULT 'unpaid',
  calculated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_fines_loan FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE,
  INDEX idx_fines_status (status)
) ENGINE=InnoDB;

-- Payments (QRIS or others)
CREATE TABLE payments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fine_id BIGINT UNSIGNED NOT NULL,
  method ENUM('qris','cash','transfer') NOT NULL DEFAULT 'qris',
  reference_no VARCHAR(60),
  amount INT NOT NULL DEFAULT 0,
  status ENUM('pending','confirmed','failed') NOT NULL DEFAULT 'pending',
  paid_at DATETIME NULL,
  proof_url VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_fine FOREIGN KEY (fine_id) REFERENCES fines(id) ON DELETE CASCADE,
  INDEX idx_payments_status (status)
) ENGINE=InnoDB;

-- Notifications (e.g., due date reminders)
CREATE TABLE notifications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  type ENUM('due_soon','overdue','approval','general') NOT NULL DEFAULT 'general',
  title VARCHAR(120) NOT NULL,
  message VARCHAR(255) NOT NULL,
  due_date DATE NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_notifications_user (user_id),
  INDEX idx_notifications_read (is_read)
) ENGINE=InnoDB;

