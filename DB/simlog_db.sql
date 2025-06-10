-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2025 at 05:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simlog_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `financial_records`
--

CREATE TABLE `financial_records` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `transaction_type` varchar(20) NOT NULL,
  `amount` float NOT NULL,
  `description` text DEFAULT NULL,
  `transaction_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` float NOT NULL,
  `total_cost` float NOT NULL,
  `logistics_cost` float DEFAULT NULL,
  `package_type` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `supplier_id`, `product_id`, `quantity`, `unit_price`, `total_cost`, `logistics_cost`, `package_type`, `status`, `order_date`) VALUES
(1, 2, 1, 1, 5, 35000, 225000, 50000, 'basic', 'delivered', '2025-06-05 22:15:28'),
(2, 2, 1, 1, 50, 35000, 1800000, 50000, 'basic', 'confirmed', '2025-06-09 11:22:01'),
(3, 3, 3, 3, 20, 500000, 10100000, 100000, 'standard', 'pending', '2025-06-09 15:38:57'),
(4, 3, 2, 5, 5, 5199000, 26195000, 200000, 'premium', 'pending', '2025-06-09 15:39:21'),
(5, 3, 5, 4, 20, 7999000, 160180000, 200000, 'premium', 'pending', '2025-06-09 15:39:42'),
(6, 3, 4, 2, 5, 17499000, 87545000, 50000, 'basic', 'pending', '2025-06-09 15:40:08');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  `min_stock_level` int(11) DEFAULT NULL,
  `unit_price` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `stock_quantity`, `min_stock_level`, `unit_price`, `created_at`, `updated_at`) VALUES
(1, 'Dell XPS 13', 'Dell XPS 13 RTX 4090', 150, 5, 18000000, '2025-06-04 01:38:50', '2025-06-09 11:31:23'),
(2, 'IPhone 16 Pro', 'iPhone 16 Pro memiliki desain titanium Kelas 5 dengan tekstur mikroblasting baru yang disempurnakan. Titanium memiliki salah satu rasio kekuatan terhadap berat tertinggi dibandingkan logam lainnya, yang membuat model ini sangat tangguh dan luar biasa ringan. iPhone 16 Pro hadir dalam empat warna memukau — termasuk Titanium Gurun baru.', 30, 3, 17499000, '2025-06-09 13:35:17', '2025-06-09 13:35:17'),
(3, 'Smartwatch Xiaomi Smart Band 9', 'Smartwatch Xiaomi Smart Band 9 Glacier Silver', 50, 10, 500000, '2025-06-09 15:36:11', '2025-06-09 15:36:11'),
(4, 'iPad Air 5 WiFi 10.9 inch 64GB', 'iPad Air 5 WiFi 10.9 inch 64GB SPACE GREY', 20, 5, 7999000, '2025-06-09 15:37:07', '2025-06-09 15:37:07'),
(5, 'Google TV TCL 4K UHD 55 Inch', 'Google TV TCL 4K UHD 55 Inch 55P655', 10, 3, 5199000, '2025-06-09 15:38:01', '2025-06-09 15:38:01');

-- --------------------------------------------------------

--
-- Table structure for table `shipments`
--

CREATE TABLE `shipments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `tracking_number` varchar(50) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `shipped_date` datetime DEFAULT NULL,
  `estimated_delivery` datetime DEFAULT NULL,
  `actual_delivery` datetime DEFAULT NULL,
  `current_location` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipments`
--

INSERT INTO `shipments` (`id`, `order_id`, `tracking_number`, `status`, `shipped_date`, `estimated_delivery`, `actual_delivery`, `current_location`) VALUES
(1, 1, 'SIMLOG0C5B7C25', 'delivered', NULL, '2025-06-12 22:15:38', '2025-06-05 22:17:57', ''),
(2, 2, 'SIMLOG95200B25', 'in_transit', '2025-06-09 13:32:28', '2025-06-16 11:22:41', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `contact_person`, `email`, `phone`, `address`, `rating`, `created_at`) VALUES
(1, 'PT. Karya Mitra Samudera', 'Agus', 'karyamitrasamudera@gmail.com', '082238727632', 'Jl. Industri Mataram II Blok VII No.19-21 C/ 29-31, Surabaya, Jawa Timur', 0, '2025-06-03 12:28:12'),
(2, 'PT. IndoTech Solutions', '083245673209', 'indotech@solutions.id', '', 'Sleman, Daerah Istimewa Yogyakarta', 0, '2025-06-09 13:33:21'),
(3, 'PT. WijayaTech', 'Wijaya Kusuma', 'wijaya@tech.id', '082110936745', 'Tangerang Selatan, Banten', 0, '2025-06-09 13:48:26'),
(4, 'CV. SukaTekno', 'Adi Kurniawan', 'sukatekno@gmail.com', '082238473645', 'Sleman, Daerah Istimewa Yogyakarta', 0, '2025-06-09 15:32:22'),
(5, 'PT. HakikiTech Solutions', 'Hakiki', 'hakikitech@gmail.com', '0822374814', 'Palembang, Sumatera Selatan', 0, '2025-06-09 15:33:29');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_transactions`
--

CREATE TABLE `supplier_transactions` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `transaction_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier_transactions`
--

INSERT INTO `supplier_transactions` (`id`, `supplier_id`, `order_id`, `amount`, `transaction_date`) VALUES
(1, 1, 1, 175000, '2025-06-05 22:15:38'),
(2, 1, 2, 1750000, '2025-06-09 11:22:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(80) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password_hash` varchar(256) NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'admin', 'admin@simlog.com', 'scrypt:32768:8:1$IfyxWMPep5K7DI9M$d888b202315f238e1c861d561424bd4bec24441b2a9b7c68b669be1b1d316e01798f44c10c819f6ff07ad1863bce7bf9de27b25237d68fb20d13302227be50d9', 'admin', '2025-06-03 11:08:01'),
(2, 'user1', 'fufufafa123@gmail.com', 'scrypt:32768:8:1$Nj33YhmtRfiuP7gO$7cd89af47ff48334d696d6d0f48b84574fece0c7150cd084e1994d634192f41a7ae247e1aad3515fef9868375422d60f337a44b1daabe1fe013a6fa46d182cd5', 'user', '2025-06-03 11:17:33'),
(3, 'aditwi', 'aditwi@gmail.com', 'scrypt:32768:8:1$nhSbsonevfRfSgOr$88241fc48b72d03ec58fe7ae15579dfe61ec1931ea64366d9e7c8ba3a2d5a4b5632fbcad4f55b4428efae6d8feab4b07b3d995811ae77953c0fab92fdcc2c46a', 'user', '2025-06-09 13:30:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `financial_records`
--
ALTER TABLE `financial_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tracking_number` (`tracking_number`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier_transactions`
--
ALTER TABLE `supplier_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `financial_records`
--
ALTER TABLE `financial_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `supplier_transactions`
--
ALTER TABLE `supplier_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `financial_records`
--
ALTER TABLE `financial_records`
  ADD CONSTRAINT `financial_records_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `supplier_transactions`
--
ALTER TABLE `supplier_transactions`
  ADD CONSTRAINT `supplier_transactions_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `supplier_transactions_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
