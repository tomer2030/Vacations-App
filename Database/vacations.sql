-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2023 at 07:39 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`vacationId`, `userId`) VALUES
(1, 3),
(3, 3),
(5, 3),
(4, 3),
(11, 3),
(1, 4),
(3, 4),
(5, 4),
(9, 4),
(7, 4),
(11, 4),
(1, 2),
(3, 2),
(5, 2),
(7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `role` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `role`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
(1, 'Admin', 'Admin', 'Admin', '95f2547b877d22dfb245fb0fafe080db113e2cd13636972bc9ae5852f8ae53cefba594d543aa832ae6a0156bd0d5ce9771a678a44a62dbd0b8cde59b84a4b051', 2),
(2, 'Dani', 'Eli', 'dani123', '4fc2c2ee185207531b9097b88e2ca9c69f93b934329064dd87ea47f20d3c99ef787d003b6db57a9b94dde9b1331c396b59ff8ebdc1db32b461e92665b0fcb844', 1),
(3, 'Gal', 'Alon', 'gal123', '4fc2c2ee185207531b9097b88e2ca9c69f93b934329064dd87ea47f20d3c99ef787d003b6db57a9b94dde9b1331c396b59ff8ebdc1db32b461e92665b0fcb844', 1),
(4, 'Yosi', 'Avi', 'yosi123', '4fc2c2ee185207531b9097b88e2ca9c69f93b934329064dd87ea47f20d3c99ef787d003b6db57a9b94dde9b1331c396b59ff8ebdc1db32b461e92665b0fcb844', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `description` varchar(200) NOT NULL,
  `imageName` varchar(100) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `imageName`, `startDate`, `endDate`, `price`) VALUES
(1, 'Jerusalem', 'Beutiful city', '7cfb77f7-19fe-400c-adf5-a212b72b40b6.jpg', '2023-01-16', '2023-01-16', '150.00'),
(2, 'New York', 'The big city new york. nice place to be there', '50c86872-44c1-4062-bff8-2062c818f707.jpg', '2023-08-20', '2023-10-12', '3500.00'),
(3, 'Tel Aviv', 'The most expensive city of the world!! but thesun is free :-)', 'b612b5be-dac7-48a3-91da-917d2ada7b60.jpg', '2023-01-16', '2023-02-08', '15000.00'),
(4, 'Buenos Aires', 'You can find the best steakes of the world ', '42fd92f5-aa59-4149-9502-962e126a9c5e.jpg', '2023-04-19', '2023-06-03', '25000.00'),
(5, 'Gan Yavne', 'Beautiful city', 'f63173ae-27c6-4320-b08f-67489c99b6ba.jpg', '2023-01-22', '2023-01-31', '40.00'),
(6, 'Paris', 'Aifel tower never been so beautiful. Exelent destination for couples', '71ef38f0-fbc4-42a2-bba2-530bbd0d1daf.jpg', '2023-06-14', '2023-06-30', '250.00'),
(7, 'Amsterdam', 'The best amsterdam coockies are in..... Amsterdam!', 'c5372bdc-8bd1-41d5-a3b0-820eb2425812.jpg', '2023-01-30', '2023-02-09', '350.00'),
(8, 'Miami', 'The city of the sun. Also good basketball', 'b4582915-beee-4182-9fef-1627f3f61e7c.jpg', '2023-03-28', '2023-04-24', '2000.00'),
(9, 'Milano', 'Very good food out of rome', '07ef20b5-f23b-477a-8d03-af99bbfc4310.jpg', '2023-02-01', '2023-03-10', '229.00'),
(10, 'Budapest', 'Beautiful wiews and exelent shoping (very cheap)', '965eec25-f793-48fb-93c4-30e1c2700d2f.jpg', '2023-03-23', '2023-04-06', '150.00'),
(11, 'Rio de Jenero', 'The brasilian samba is there..', '30a8efbd-54d4-4e4a-94d9-e9166fbb86fc.jpg', '2023-02-05', '2023-02-28', '2800.00'),
(12, 'Rome', 'The best food in entire world is there...', '1072d24a-8788-4058-8c60-e9ef82e31b18.jpg', '2023-05-16', '2023-06-14', '400.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacationId` (`vacationId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
