-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 22, 2025 lúc 04:19 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ct313h_projects`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `admin_username` varchar(50) NOT NULL,
  `admin_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `admins`
--

INSERT INTO `admins` (`admin_id`, `admin_username`, `admin_password`) VALUES
(1, 'admin123', '$2b$10$ITYYTg06FR6Ll3OdbY6rh.hIkmCABUYtyBnX/GSTopdoM2GP1OxiO'),
(3, 'admin1234', '$2b$10$3c8q38.rYXI0RQMtlmEdieCCjCQwkUrQ9XggvsdG4/OCcyf0Nwa.i');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(10) DEFAULT NULL,
  `customer_address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`customer_id`, `customer_name`, `customer_email`, `customer_phone`, `customer_address`) VALUES
(200325229, 'a', 'dinhthongchau@gmail.com', '0889281103', 'Thành phố Hà Nội, Quận Ba Đình, Phường Phúc Xá, Chau Dinh Thong 616'),
(200325459, 'a', 'nso44106@bcooq.com', '0889281103', 'Tỉnh Hải Dương, Huyện Ninh Giang, Xã Hưng Long, số 15 lê bình'),
(200325563, 'Chau Dinh Thong', 'imprahimovic@gmail.com', '0889281103', 'Tỉnh Hải Dương, Huyện Ninh Giang, Xã Hiệp Lực, số 15 lê bình'),
(200325601, 'a', 'imprahimovic@gmail.com', '0889281103', 'Thành phố Hà Nội, Quận Ba Đình, Phường Phúc Xá, Chau Dinh Thong 616'),
(200325618, 'a', 'imprahimovic@gmail.com', '0889281103', 'Thành phố Hà Nội, Quận Hoàn Kiếm, Phường Trần Hưng Đạo, Chau Dinh Thong 616'),
(200325965, 'a', 'imprahimovic@gmail.com', '0889281103', 'Thành phố Hà Nội, Quận Ba Đình, Phường Phúc Xá, Chau Dinh Thong 616'),
(250317039, '3', '4', '1', '2'),
(250317111, '3', '', '5', '4'),
(250317134, '5', '6', '7', '8'),
(250317135, '2', '3', '4', '5'),
(250317163, '3', '4', '5', '6'),
(250317364, '5', '6', '2', '2'),
(250317662, '3', '4', '5', '6'),
(250317735, '12', '1', '12', ''),
(250317798, '2', '3', '41', '1'),
(250317837, '2', '3', '1', '1'),
(250320012, 'thong', '2811', '1', 'Xã Hoàng Tây, Thị xã Kim Bảng, Tỉnh Hà Nam'),
(250320079, 'Chau DInh Thong', 'dinhtohngchau@gmail.com', '0889281103', 'So 16 Tran Binh Trong, Xã Thống Nhất, Thành phố Lào Cai, Tỉnh Lào Cai'),
(250320134, 'Chau DInh Thong', 'dinhtohngchau@gmail.com', '0889281103', 'So 16 An Phu, Xã Thống Nhất, Thành phố Lào Cai, Tỉnh Lào Cai'),
(250320460, 'Chau DInh Thong', 'dinhtohngchau@gmail.com', '0889281103', 'Phường Sông Đà, Thị Xã Mường Lay, Tỉnh Điện Biên'),
(250320548, 'Chau DInh Thong', 'dinhtohngchau@gmail.com', '0889281103', 'Phường Tân Phong, Thành phố Lai Châu, Tỉnh Lai Châu'),
(250320882, 'Chau DInh Thong', 'dinhtohngchau@gmail.com', '0889281103', 'So 16 An khanh, Phường Sông Đà, Thị Xã Mường Lay, Tỉnh Điện Biên'),
(250321073, 'Chau DInh Thong', 'imprahimovic@gmail.com', '0889281103', 's, Xã Dền Sáng, Huyện Bát Xát, Tỉnh Lào Cai'),
(250321093, 'Chau DInh Thong', 'imprahimovic@gmail.com', '0889281103', 's, Xã Bản Vược, Huyện Bát Xát, Tỉnh Lào Cai'),
(250321209, 'Chau DInh Thong', 'imprahimovic@gmail.com', '0889281103', 'so 1 ABC, Xã Bản Vược, Huyện Bát Xát, Tỉnh Lào Cai'),
(250321254, 'Chau DInh Thong', 'imprahimovic@gmail.com', '0889281103', 'So 15 ABC, Phường Tân Hà, Thành phố Tuyên Quang, Tỉnh Tuyên Quang'),
(250321255, 'cdt', 'cdt', 'cdt', 'cdt, Phường Bình Minh, Thành phố Lào Cai, Tỉnh Lào Cai'),
(250321311, 'Chau DInh Thong', 'imprahimovic@gmail.com', '0889281103', 'So 16 ABC, Phường Bình Minh, Thành phố Lào Cai, Tỉnh Lào Cai'),
(250321317, 'Chau DInh Thong', 'imprahimovic@gmail.com', '0889281103', 'So 16 Abc, Xã Thống Nhất, Thành phố Lào Cai, Tỉnh Lào Cai'),
(250321748, 'a', 'a', 'a', 'a, Phường Bình Minh, Thành phố Lào Cai, Tỉnh Lào Cai'),
(250321803, 'Chau DInh Thong', 'imprahimovic@gmail.com', '0889281103', 's, Phường Sông Đà, Thị Xã Mường Lay, Tỉnh Điện Biên'),
(250321882, 'Chau DInh Thong', 'imprahimovic@gmail.com', '0889281103', 's, Phường Sông Đà, Thị Xã Mường Lay, Tỉnh Điện Biên'),
(250321891, 'Chau DInh Thong', 'imprahimovic@gmail.com', '0889281103', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_total` decimal(10,2) DEFAULT NULL,
  `order_payment_method` varchar(50) DEFAULT NULL,
  `order_status` varchar(50) DEFAULT NULL,
  `order_note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `order_date`, `order_total`, `order_payment_method`, `order_status`, `order_note`) VALUES
(102, 250317798, '2025-03-17 14:56:11', 30000000.00, 'Cash on Delivery', 'OK2', 'SP1: Iphone 16 Pro 512GB (Màu sắc: Titan Desert) SL: 1\nGhi chú của khách: 1'),
(103, 250317798, '2025-03-17 14:59:46', 90000000.00, 'Cash on Delivery', 'OK2', 'SP1: Iphone 16 Pro Max 1TB (Màu sắc: Titan Desert) SL: 2,\nSP2: Iphone 16 Pro 512GB (Màu sắc: Titan Desert) SL: 1\nGhi chú của khách: '),
(104, 250317798, '2025-03-17 15:01:55', 30000000.00, 'Cash on Delivery', 'OK2', 'SP1: Iphone 16 Pro 512GB (Màu sắc: Titan Desert) SL: 1\nGhi chú của khách: 2'),
(105, 250317364, '2025-03-17 15:17:07', 90000000.00, 'Cash on Delivery', 'OK2', 'SP1: Iphone 16 Pro 512GB (Màu sắc: Titan Desert) SL: 3\nGhi chú của khách: 2'),
(106, 200325618, '2025-03-20 03:32:54', 30000000.00, 'Tiền mặt', 'OK', 'SP1: Iphone 14 256GB (Màu sắc: Hồng phấn) SL: 2\n,Ghi chú của khách: Không'),
(107, 200325459, '2025-03-20 03:36:46', 40000000.00, 'Tiền mặt', 'OK', 'SP1: Iphone 14 256GB (Màu sắc: Hồng) SL: 2\n,Ghi chú của khách: Không'),
(108, 200325601, '2025-03-20 03:55:26', 20000000.00, 'Tiền mặt', 'OK', 'SP1: Iphone 14 256GB (Màu sắc: Hồng) SL: 1\n,Ghi chú của khách: Không'),
(109, 200325965, '2025-03-20 03:55:28', 20000000.00, 'Tiền mặt', 'OK', 'SP1: Iphone 14 256GB (Màu sắc: Hồng) SL: 1\n,Ghi chú của khách: Không'),
(110, 200325965, '2025-03-20 03:55:31', 20000000.00, 'Tiền mặt', 'OK', 'SP1: Iphone 14 256GB (Màu sắc: Hồng) SL: 1\n,Ghi chú của khách: Không'),
(111, 200325563, '2025-03-20 03:55:52', 20000000.00, 'Tiền mặt', 'OK', 'SP1: Iphone 14 256GB (Màu sắc: Hồng) SL: 1\n,Ghi chú của khách: Không'),
(112, 200325563, '2025-03-20 03:56:02', 20000000.00, 'Tiền mặt', 'OK', 'SP1: Iphone 14 256GB (Màu sắc: Hồng) SL: 1\n,Ghi chú của khách: Không'),
(113, 250320134, '2025-03-20 15:34:50', 99999999.99, 'Cash on Delivery', 'OK2', 'SP1: Iphone 14 256GB (Màu sắc: Hồng) SL: 14,\nSP2: Iphone 14 512GB (Màu sắc: Hồng) SL: 1\nGhi chú của khách: '),
(114, 250320134, '2025-03-20 15:38:19', 30000000.00, 'Cash on Delivery', 'OK2', 'SP1: Iphone 16 Pro 512GB (Màu sắc: Titan Desert) SL: 1\nGhi chú của khách: '),
(115, 250320134, '2025-03-20 15:39:29', 30000000.00, 'Cash on Delivery', 'OK2', 'SP1: Iphone 16 Pro 512GB (Màu sắc: Titan Desert) SL: 1\nGhi chú của khách: '),
(116, 250320134, '2025-03-21 03:32:26', 30000000.00, 'Cash on Delivery', 'Orded', 'SP1: Iphone 16 Pro 256GB (Màu sắc: Trắng) SL: 1\nGhi chú của khách: ok'),
(117, 250320134, '2025-03-21 03:38:35', 30000000.00, 'Cash on Delivery', 'Orded', 'SP1: Iphone 16 Pro Max 1TB (Màu sắc: Titan Desert) SL: 1\nGhi chú của khách: '),
(118, 250320134, '2025-03-21 03:38:41', 30000000.00, 'Cash on Delivery', 'Orded', 'SP1: Iphone 16 Pro 512GB (Màu sắc: Titan Desert) SL: 1\nGhi chú của khách: '),
(119, 250321748, '2025-03-21 05:19:40', 99999999.99, 'Cash on Delivery', 'Orded', 'SP1: Iphone 16 Pro 512GB (Màu sắc: Titan Desert) SL: 4\nGhi chú của khách: '),
(120, 250321254, '2025-03-21 15:05:14', 99000000.00, 'Cash on Delivery', 'Ordered', 'Iphone 14 128GB 99 (Hồng99) x 1\nGhi chú: Call toi truoc'),
(121, 250321254, '2025-03-21 15:05:51', 99000000.00, 'Cash on Delivery', 'Ordered', 'Iphone 14 128GB 99 (Hồng99) x 1\nGhi chú: Call toi truoc'),
(122, 250321254, '2025-03-21 15:10:58', 99000000.00, 'Cash on Delivery', 'Ordered', 'Iphone 14 128GB 99 (Hồng99) x 1\nGhi chú: call me'),
(123, 250321254, '2025-03-21 15:12:55', 99000000.00, 'Cash on Delivery', 'Ordered', 'Iphone 14 128GB 99 (Hồng99) x 1\nGhi chú: '),
(124, 250321254, '2025-03-21 15:13:50', 99000000.00, 'Cash on Delivery', 'Ordered', 'Iphone 14 128GB 99 (Hồng99) x 1\nGhi chú: '),
(125, 250321254, '2025-03-21 15:25:12', 99000000.00, 'Cash on Delivery', 'Ordered', 'Iphone 14 128GB 99 (Hồng99) x 1\nGhi chú: hello'),
(126, 250321254, '2025-03-21 15:25:37', 99000000.00, 'Cash on Delivery', 'Ordered', 'Iphone 14 128GB 99 (Hồng99) x 1\nGhi chú: hi'),
(127, 250321254, '2025-03-21 15:26:38', 99000000.00, 'Cash on Delivery', 'Ordered', 'Iphone 14 128GB 99 (Hồng99) x 1\nGhi chú: hi');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `product_color` varchar(100) DEFAULT NULL,
  `product_description` text DEFAULT NULL,
  `product_image` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_color`, `product_description`, `product_image`) VALUES
(40, 'Iphone 16 Pro 256GB', 30000000.00, 'Trắng', 'iPhone 16 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731830882027-865541648.jpg\",\"/public/uploads/1731830882028-853590116.jpg\",\"/public/uploads/1731830882028-889937388.jpg\",\"/public/uploads/1731830882028-3806260.jpg\",\"/public/uploads/1731830882029-38261881.jpg\",\"/public/uploads/1731830882029-818054538.png\"]'),
(41, 'Iphone 16 Pro 512GB', 30000000.00, 'Titan Desert', 'iPhone 16 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731830896109-760417944.jpg\",\"/public/uploads/1731830896109-592832677.jpg\",\"/public/uploads/1731830896109-149226362.jpg\",\"/public/uploads/1731830896109-324493275.jpg\",\"/public/uploads/1731830896110-457949400.jpg\",\"/public/uploads/1731830896110-507280070.png\"]'),
(42, 'Iphone 16 Pro Max 512GB', 30000000.00, 'Titan Desert', 'iPhone 16 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731830902071-109782729.jpg\",\"/public/uploads/1731830902071-929281811.jpg\",\"/public/uploads/1731830902071-262213671.jpg\",\"/public/uploads/1731830902071-773487497.jpg\",\"/public/uploads/1731830902072-90383002.jpg\",\"/public/uploads/1731830902072-691736266.png\"]'),
(43, 'Iphone 16 Pro Max 1TB', 30000000.00, 'Titan Desert', 'iPhone 16 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731830906976-382406215.jpg\",\"/public/uploads/1731830906977-879870012.jpg\",\"/public/uploads/1731830906977-982631979.jpg\",\"/public/uploads/1731830906977-329409040.jpg\",\"/public/uploads/1731830906977-357221717.jpg\",\"/public/uploads/1731830906977-406356025.png\"]'),
(44, 'Iphone 16 Pro Max 1TB', 30000000.00, 'Titan Desert', 'iPhone 16 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731830939085-15606761.jpg\",\"/public/uploads/1731830939085-55754210.jpg\",\"/public/uploads/1731830939085-5602485.jpg\",\"/public/uploads/1731830939085-553508939.jpg\",\"/public/uploads/1731830939085-93748999.jpg\",\"/public/uploads/1731830939086-655942826.png\"]'),
(45, 'Iphone 14 128GB 99', 99000000.00, 'Hồng99', '99iPhone 14 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731831575550-878134587.jpg\",\"/public/uploads/1731831575551-3911734.jpg\",\"/public/uploads/1731831575551-494826868.jpg\",\"/public/uploads/1731831575551-982869448.jpg\",\"/public/uploads/1731831575551-292378880.jpg\"]'),
(46, 'Iphone 14 256GB', 15000000.00, 'Hồng phấn', 'iPhone 14 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731831045726-339004117.png\",\"/public/uploads/1731831045728-669861851.jpg\",\"/public/uploads/1731831045728-175974347.jpg\",\"/public/uploads/1731831045728-967817479.jpg\",\"/public/uploads/1731831045728-820508246.jpg\"]'),
(47, 'Iphone 14 512GB', 15000000.00, 'Hồng', 'iPhone 14 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731831049850-813271860.png\",\"/public/uploads/1731831049853-711498125.jpg\",\"/public/uploads/1731831049853-769424861.jpg\",\"/public/uploads/1731831049854-418583098.jpg\",\"/public/uploads/1731831049854-537047404.jpg\"]'),
(48, 'Iphone 14 512GB', 30000000.00, 'Hồng', 'iPhone 14 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731831058557-453261218.png\",\"/public/uploads/1731831058559-499819368.jpg\",\"/public/uploads/1731831058559-392434053.jpg\",\"/public/uploads/1731831058560-565158790.jpg\",\"/public/uploads/1731831058560-873164555.jpg\"]'),
(49, 'Iphone 14 256GB', 20000000.00, 'Hồng', 'iPhone 14 mang đến trải nghiệm cao cấp với thiết kế hiện đại, kết hợp màu sắc titan sang trọng gồm Titan Đen, Titan Trắng và Titan Sa Mạc cho phiên bản Pro và Pro Max. Máy có nhiều tùy chọn dung lượng từ 64GB đến 1TB, đáp ứng mọi nhu cầu lưu trữ. Sở hữu hiệu năng vượt trội nhờ chipset mới, camera nâng cấp hỗ trợ chụp ảnh đêm và góc rộng, cùng màn hình OLED sắc nét, iPhone 16 là sự lựa chọn hoàn hảo cho người dùng đòi hỏi hiệu suất mạnh mẽ và tính năng cao cấp. Pin bền bỉ cho phép sử dụng lâu dài mà không lo gián đoạn.', '[\"/public/uploads/1731831069411-971352971.png\",\"/public/uploads/1731831069414-635002275.jpg\",\"/public/uploads/1731831069415-767366483.jpg\",\"/public/uploads/1731831069415-493900668.jpg\",\"/public/uploads/1731831069415-852508113.jpg\"]'),
(50, 'Iphone Test', 20000000.00, 'Trắng', 'Nội dung về tính năng: Quay video 4K, chụp ảnh chân dung tuyệt đẹp và chụp phong cảnh rộng với hệ thống camera kép hoàn toàn mới. ', '[\"/public/uploads/1731839350697-920061392.png\",\"/public/uploads/1731839350700-243048841.jpg\",\"/public/uploads/1731839350700-304130864.jpg\",\"/public/uploads/1731839350701-699846954.jpg\",\"/public/uploads/1731839350701-49745060.jpg\"]'),
(51, 'Iphone Test', 20000000.00, 'Trắng', 'Nội dung về tính năng: Quay video 4K, chụp ảnh chân dung tuyệt đẹp và chụp phong cảnh rộng với hệ thống camera kép hoàn toàn mới. ', '[\"/public/uploads/1731839365673-737138735.png\",\"/public/uploads/1731839365675-759295779.jpg\",\"/public/uploads/1731839365676-992013039.jpg\",\"/public/uploads/1731839365676-832342734.jpg\",\"/public/uploads/1731839365676-430016670.jpg\"]'),
(52, 'Iphone Test', 20000000.00, 'Trắng', 'Nội dung về tính năng: Quay video 4K, chụp ảnh chân dung tuyệt đẹp và chụp phong cảnh rộng với hệ thống camera kép hoàn toàn mới. ', '[\"/public/uploads/1731839366190-968844555.png\",\"/public/uploads/1731839366192-334001239.jpg\",\"/public/uploads/1731839366193-541432041.jpg\",\"/public/uploads/1731839366193-468566616.jpg\",\"/public/uploads/1731839366193-406058145.jpg\"]'),
(53, 'Iphone Test', 20000000.00, 'Trắng', 'Nội dung về tính năng: Quay video 4K, chụp ảnh chân dung tuyệt đẹp và chụp phong cảnh rộng với hệ thống camera kép hoàn toàn mới. ', '[\"/public/uploads/1731839366505-801036928.png\",\"/public/uploads/1731839366508-166491966.jpg\",\"/public/uploads/1731839366508-272753195.jpg\",\"/public/uploads/1731839366509-835509030.jpg\",\"/public/uploads/1731839366509-991234831.jpg\"]'),
(54, 'Iphone Test', 20000000.00, 'Trắng', 'Nội dung về tính năng: Quay video 4K, chụp ảnh chân dung tuyệt đẹp và chụp phong cảnh rộng với hệ thống camera kép hoàn toàn mới. ', '[\"/public/uploads/1731839366806-830052528.png\",\"/public/uploads/1731839366809-170662653.jpg\",\"/public/uploads/1731839366809-991604687.jpg\",\"/public/uploads/1731839366809-290633393.jpg\",\"/public/uploads/1731839366810-462920279.jpg\"]'),
(55, 'Iphone Test', 20000000.00, 'Trắng', 'Nội dung về tính năng: Quay video 4K, chụp ảnh chân dung tuyệt đẹp và chụp phong cảnh rộng với hệ thống camera kép hoàn toàn mới. ', '[\"/public/uploads/1731839366993-284287419.png\",\"/public/uploads/1731839366995-485160360.jpg\",\"/public/uploads/1731839366996-875779728.jpg\",\"/public/uploads/1731839366996-437707892.jpg\",\"/public/uploads/1731839366996-495001189.jpg\"]'),
(58, 'cdthong', 5000.00, 'Black', 'dep trai lam', '[\"/public/uploads/1738563708138-407508614.jpg\",\"/public/uploads/1738563708145-797667507.jpg\",\"/public/uploads/1738563708160-714167961.jpg\",\"/public/uploads/1738563708163-781582439.jpg\",\"/public/uploads/1738563708176-804140532.jpg\"]'),
(59, 'CDTHONG1 1', 500.00, 'red', 'dep trai du sai', '[\"/public/uploads/1738563852103-808067381.jpg\",\"/public/uploads/1738563852108-30839850.jpg\"]'),
(60, 'CDTHONG1 1', 500.00, 'red', 'dep trai du sai', '[\"/public/uploads/1738564023626-959367594.jpg\",\"/public/uploads/1738564023631-263412121.jpg\"]'),
(61, 'CDTHONG1 1', 500.00, 'red', 'dep trai du sai', '[\"/public/uploads/1738564024989-306105564.jpg\",\"/public/uploads/1738564024994-243751182.jpg\"]'),
(62, 'cdthong1', 5000.00, 'Black', 'dep trai lam', '[\"/public/uploads/1738564119736-205953622.jpg\",\"/public/uploads/1738564119744-851125949.jpg\",\"/public/uploads/1738564119751-393366639.jpg\",\"/public/uploads/1738564119757-131704165.jpg\",\"/public/uploads/1738564119760-497764853.jpg\"]'),
(63, 'CDTHONG1 2025', 500.00, 'red', 'dep trai du sai', '[\"/public/uploads/1738564190746-12622636.jpg\",\"/public/uploads/1738564190770-737510786.jpg\"]'),
(64, 'CDTHONG1 2025', 500.00, 'red,blue', 'dep trai du sai', '[\"/public/uploads/1738675825004-361442314.jpg\",\"/public/uploads/1738675825011-165057698.jpg\"]'),
(65, 'CDTHONG1 2025', 500.00, 'red', 'dep trai du sai', '[\"/public/uploads/1738676329590-52323076.jpg\",\"/public/uploads/1738676329595-834762748.jpg\"]'),
(66, 'CDTHONG1 2025', 500.00, '[\"red\",\"blue\",\"black\"]', 'dep trai du sai', '[\"/public/uploads/1738676405255-455564956.jpg\",\"/public/uploads/1738676405275-439002387.jpg\"]'),
(67, 'CDTHONG1 2025', 500.00, '[\"red\",\"blue\",\"black\"]', 'dep trai du sai', '[\"/public/uploads/1738676836933-84757835.jpg\",\"/public/uploads/1738676836939-606302962.jpg\"]'),
(68, 'CDTHONG1 2025', 500.00, '[\"red\",\"blue\",\"black\"]', 'dep trai du sai', '[\"/public/uploads/1738677006230-967467954.jpg\",\"/public/uploads/1738677006236-431407100.jpg\"]'),
(69, 'CDTHONG1 2025', 500.00, '[\"red\",\"blue\",\"black\"]', 'dep trai du sai', '[\"/public/uploads/1738677057938-17128206.jpg\",\"/public/uploads/1738677057945-166885479.jpg\"]'),
(70, 'CDTHONG1 2025', 500.00, '[\"red\",\"blue\",\"black\"]', 'dep trai du sai', '[\"/public/uploads/1738677279720-761154464.jpg\",\"/public/uploads/1738677279726-219563955.jpg\"]');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `admin_username` (`admin_username`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
