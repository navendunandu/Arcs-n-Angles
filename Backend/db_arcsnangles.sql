-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2023 at 02:34 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_arcsnangles`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(30) NOT NULL,
  `admin_email` varchar(30) NOT NULL,
  `admin_password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`admin_id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(1, 'Admin', 'admin@gmail.com', 'admin@1234');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_architect`
--

CREATE TABLE `tbl_architect` (
  `architect_id` int(11) NOT NULL,
  `architect_name` varchar(30) NOT NULL,
  `architect_contact` varchar(30) NOT NULL,
  `architect_email` varchar(30) NOT NULL,
  `architect_address` varchar(50) NOT NULL,
  `place_id` int(11) NOT NULL,
  `architect_password` varchar(30) NOT NULL,
  `architect_photo` varchar(300) NOT NULL,
  `architect_proof` varchar(300) NOT NULL,
  `architect_vstatus` int(11) NOT NULL DEFAULT 0,
  `architect_gender` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_builder`
--

CREATE TABLE `tbl_builder` (
  `builder_id` int(11) NOT NULL,
  `builder_name` varchar(30) NOT NULL,
  `builder_contact` varchar(30) NOT NULL,
  `builder_address` varchar(50) NOT NULL,
  `place_id` int(11) NOT NULL,
  `builder_password` varchar(30) NOT NULL,
  `builder_photo` varchar(300) NOT NULL,
  `builder_proof` varchar(300) NOT NULL,
  `builder_vstatus` int(11) NOT NULL DEFAULT 0,
  `builder_email` varchar(30) NOT NULL,
  `builder_gender` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`category_id`, `category_name`) VALUES
(1, 'Residential'),
(4, 'Indutrisal'),
(5, 'Educational'),
(6, 'Commercial'),
(7, 'Health Service');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat`
--

CREATE TABLE `tbl_chat` (
  `chat_id` int(11) NOT NULL,
  `chat_datetime` varchar(30) NOT NULL,
  `chat_content` varchar(1000) NOT NULL,
  `from_userid` int(11) NOT NULL DEFAULT 0,
  `to_userid` int(11) NOT NULL DEFAULT 0,
  `from_builderid` int(11) NOT NULL DEFAULT 0,
  `to_builderid` int(11) NOT NULL DEFAULT 0,
  `from_architectid` int(11) NOT NULL DEFAULT 0,
  `to_architectid` int(11) NOT NULL DEFAULT 0,
  `chat_attachment` varchar(500) NOT NULL DEFAULT '0',
  `chat_status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_district`
--

CREATE TABLE `tbl_district` (
  `district_id` int(11) NOT NULL,
  `district_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_district`
--

INSERT INTO `tbl_district` (`district_id`, `district_name`) VALUES
(1, ' Thiruvananthapuram'),
(2, ' Kollam'),
(3, ' Pathanamtitta'),
(4, ' Alapuzha'),
(5, ' Kottayam'),
(6, ' Idukki'),
(7, ' Ernakulam'),
(8, ' Thrissur'),
(9, ' Palakkad'),
(10, ' Malappuram'),
(11, ' Kozhikode'),
(12, ' Wayanad'),
(13, ' Kannur'),
(14, ' Kasargode');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_gallery`
--

CREATE TABLE `tbl_gallery` (
  `gallery_id` int(11) NOT NULL,
  `gallery_image` varchar(300) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_gallery`
--

INSERT INTO `tbl_gallery` (`gallery_id`, `gallery_image`, `project_id`) VALUES
(42, 'http://127.0.0.1:4000/images/Snapinsta.app_344239101_1197770067606928_8166660157010516518_n_1080.jpg', 2),
(43, 'http://127.0.0.1:4000/images/Snapinsta.app_344340679_120928860953810_5056926894935524139_n_1080.jpg', 2),
(44, 'http://127.0.0.1:4000/images/Snapinsta.app_344393461_917847899434069_6543265519157778964_n_1080.jpg', 2),
(45, 'http://127.0.0.1:4000/images/Snapinsta.app_344364555_630611875159231_5334756287939090303_n_1080.jpg', 2),
(46, 'http://127.0.0.1:4000/images/Snapinsta.app_344332744_248546001058221_1822053811127631634_n_1080.jpg', 2),
(47, 'http://127.0.0.1:4000/images/Snapinsta.app_344421069_6627695243909364_8652369074340615108_n_1080.jpg', 2),
(48, 'http://127.0.0.1:4000/images/Snapinsta.app_344364610_1161677307859556_4324899040895614094_n_1080.jpg', 2),
(49, 'http://127.0.0.1:4000/images/Snapinsta.app_344360412_978730643296104_379965718166125044_n_1080.jpg', 2),
(50, 'http://127.0.0.1:4000/images/cottage.fbx', 18);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_like`
--

CREATE TABLE `tbl_like` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `architect_id` int(11) NOT NULL DEFAULT 0,
  `builder_id` int(11) NOT NULL DEFAULT 0,
  `project_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_like`
--

INSERT INTO `tbl_like` (`like_id`, `user_id`, `architect_id`, `builder_id`, `project_id`) VALUES
(93, 0, 0, 7, 17);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_material`
--

CREATE TABLE `tbl_material` (
  `material_id` int(11) NOT NULL,
  `material_date` varchar(30) NOT NULL,
  `material_brick` varchar(50) NOT NULL,
  `material_rebar` varchar(50) NOT NULL,
  `material_cement` varchar(50) NOT NULL,
  `material_steel` varchar(50) NOT NULL,
  `material_wood` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_place`
--

CREATE TABLE `tbl_place` (
  `place_id` int(11) NOT NULL,
  `place_name` varchar(100) NOT NULL,
  `district_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_place`
--

INSERT INTO `tbl_place` (`place_id`, `place_name`, `district_id`) VALUES
(53, ' Alamcode', 1),
(54, 'Attingal', 1),
(55, 'Kaniyapuram', 1),
(56, 'Kattakada', 1),
(57, 'Kilimanoor', 1),
(58, 'Konchiravila', 1),
(59, 'Kurakkanni', 1),
(60, 'Nedumangad', 1),
(61, 'Thiruvananthapuram', 1),
(62, 'Varkala', 1),
(63, 'Adinad', 2),
(64, 'Ampalamkunnu', 2),
(65, 'Ayoor', 2),
(66, 'Chathannoor', 2),
(67, 'Kadakkal', 2),
(68, 'Karunagappalli', 2),
(69, 'Kollam', 2),
(70, 'Kottarakkara', 2),
(71, 'Kottiyam', 2),
(72, 'Kulathupuzha', 2),
(73, 'Kundara', 2),
(74, 'Mukhathala', 2),
(75, 'Mylakkadu', 2),
(76, 'Nedungolam', 2),
(77, 'Nilamel', 2),
(78, 'Oachira', 2),
(80, 'Paravur', 2),
(81, 'Perumpuzha', 2),
(82, 'Pozhikara', 2),
(83, 'Punalur', 2),
(84, 'Punthalathazham', 2),
(85, 'St Thomas Fort', 2),
(86, 'Tangasseri', 2),
(87, 'Valiyode', 2),
(88, 'Vallikavu', 2),
(89, ' Adavi', 3),
(90, ' Adoor', 3),
(91, ' Kadapra', 3),
(92, ' Konni', 3),
(93, ' Kozhencherry', 3),
(94, ' Mallapally', 3),
(95, ' Pandalam', 3),
(96, ' Parumala', 3),
(97, ' Pathanamthitta', 3),
(98, ' Pullad', 3),
(99, ' Ranni', 3),
(100, ' Thiruvalla', 3),
(101, '  Vennikulam', 3),
(102, 'Alappuzha', 4),
(103, 'Ambalappuzha', 4),
(104, 'Arookutty', 4),
(105, 'Aroor', 4),
(106, 'Charummood', 4),
(107, 'Chengannur', 4),
(108, 'Cherthala', 4),
(109, 'Chettikulangara', 4),
(110, 'Haripad', 4),
(111, 'Kanjikuzhi', 4),
(112, 'Kayamkulam', 4),
(113, 'Kokkamangalam', 4),
(114, 'Kokkothamangalam', 4),
(115, 'Komalapuram', 4),
(116, ' Mannar', 4),
(117, ' Mararikulam North', 4),
(118, 'Mavelikkara', 4),
(119, 'Muhamma', 4),
(120, 'Nangiarkulangara', 4),
(121, 'Padanilam', 4),
(122, 'Pallickal', 4),
(123, ' Thumpoly', 4),
(124, ' Thuravoor', 4),
(125, ' Vellakinar', 4),
(126, 'Changanassery', 5),
(127, 'Erattupetta', 5),
(128, 'Ettumanoor', 5),
(129, 'Kanjirappally', 5),
(130, 'Kottayam', 5),
(131, 'Manarcaud', 5),
(132, 'Pala', 5),
(133, 'Pampady', 5),
(134, 'Parathanam', 5),
(135, 'Ponkunnam', 5),
(136, 'Ramapuram', 5),
(137, 'Teekoy', 5),
(138, 'Vaikom', 5),
(139, 'Adimali', 6),
(140, 'Cheruthoni', 6),
(141, ' Idukki', 6),
(142, ' Kattappana', 6),
(143, ' Kumily', 6),
(144, ' Marayur', 6),
(145, ' Munnar', 6),
(146, ' Murickassery', 6),
(147, ' Muthalakodam', 6),
(148, ' Nedumkandam', 6),
(149, ' Painavu', 6),
(150, ' Parathode', 6),
(151, ' Peermade', 6),
(152, ' Thekkady', 6),
(153, ' Thodupuzha', 6),
(154, ' Thopramkudy', 6),
(155, ' Udumbanchola', 6),
(156, ' Vandiperiyar', 6),
(157, 'Allapra', 7),
(158, 'Aluva', 7),
(159, 'Ambalamedu', 7),
(160, 'Ambalamugal', 7),
(161, 'Angamaly', 7),
(162, 'Arakkunnam', 7),
(163, 'Chembarakky', 7),
(164, 'Chendamangalam', 7),
(165, 'Chengamanad', 7),
(166, 'Cheranallur', 7),
(167, 'Cheruvattoor', 7),
(168, 'Choornikkara', 7),
(169, 'Chowwara', 7),
(170, 'Chowwera', 7),
(171, 'Edachira', 7),
(172, 'Edappally', 7),
(173, 'Edathala', 7),
(174, 'Eloor', 7),
(175, 'Ernakulam', 7),
(176, 'Irumpanam', 7),
(177, ' Kadamakkudy', 7),
(178, ' Kadayiruppu', 7),
(179, ' Kadungalloor', 7),
(180, ' Kakkanad', 7),
(181, ' Kalady', 7),
(182, ' Kalamassery', 7),
(183, ' Kanjoor', 7),
(184, ' Kaprikkad', 7),
(185, ' Keezhmad', 7),
(186, ' Kochi', 7),
(187, ' Kolenchery', 7),
(188, ' Koonammavu', 7),
(189, ' Koothattukulam', 7),
(190, ' Kothamangalam', 7),
(191, ' Kottuvally', 7),
(192, ' Kundannoor', 7),
(193, ' Kunnukara', 7),
(194, ' Kureekkad', 7),
(195, ' Malayattoor', 7),
(196, ' Malayidomthuruth', 7),
(197, ' Manjaly', 7),
(198, ' Maradu', 7),
(199, ' Mattoor', 7),
(200, ' Moolampilly', 7),
(201, ' Mulavukad', 7),
(202, ' Muvattupuzha', 7),
(203, ' Nayarambalam', 7),
(204, ' Nedumbassery', 7),
(205, ' Nedungad', 7),
(206, 'North Paravur', 7),
(207, 'Oorakkad', 7),
(208, 'Palliyangadi', 7),
(209, 'Pampakuda', 7),
(210, 'Payyal', 7),
(211, 'Perumbavoor', 7),
(212, 'Perumpadappu', 7),
(213, 'Pezhakkappilly', 7),
(214, 'Piravom', 7),
(215, 'Pizhala', 7),
(216, 'Ponjassery', 7),
(217, 'Pukkattupadi', 7),
(218, 'Puliyanam', 7),
(219, 'Thamarachal', 7),
(220, 'Thiruvankulam', 7),
(221, 'Thottakkattukara', 7),
(222, 'Thrippunithura', 7),
(223, 'Thuruthipilly', 7),
(224, 'Udayamperoor', 7),
(225, 'Varappuzha', 7),
(226, 'Vazhakkala', 7),
(227, 'Vazhakulam', 7),
(228, 'Venduvazhy', 7),
(229, 'Vengoor ', 7),
(230, 'Vyttila', 7),
(231, 'Adat', 8),
(232, 'Akathiyoor', 8),
(233, 'Alagappa Nagar', 8),
(234, 'Annamanada', 8),
(235, 'Arangottukara', 8),
(236, 'Attore North', 8),
(237, 'Attore South', 8),
(238, 'Avinissery', 8),
(239, 'Brahmakulam', 8),
(240, 'Chalakudy', 8),
(241, 'Chavakkad', 8),
(242, 'Chelakkara', 8),
(243, 'Chemmappilly', 8),
(244, 'Chevoor', 8),
(245, 'Guruvayur', 8),
(246, 'Harinagar Poonkunnam', 8),
(247, ' Iringaprom', 8),
(248, ' Irinjalakuda', 8),
(249, ' Kallamkunnu', 8),
(250, ' Kanimangalam', 8),
(251, ' Karuvannoor', 8),
(252, ' Kechery', 8),
(253, ' Kodakara', 8),
(254, ' Kodungallur', 8),
(255, ' Kolazhy', 8),
(256, ' Koratty', 8),
(257, ' Kottappuram', 8),
(258, ' Kottapuram', 8),
(259, ' Kunnamkulam', 8),
(260, ' Kuthiran', 8),
(261, ' Kuttur', 8),
(262, ' Mala', 8),
(263, ' Manaloor', 8),
(264, ' Marathakkara', 8),
(265, ' Methala', 8),
(266, ' Moonupeedika', 8),
(267, ' Mulakunnathukavu', 8),
(268, ' Mupliyam', 8),
(269, ' Nenmanikkara', 8),
(270, ' Palakkal', 8),
(271, ' Palayur', 8),
(272, ' Palissery', 8),
(273, ' Paluvai', 8),
(274, ' Pavaratty', 8),
(275, ' Perakam', 8),
(276, ' Perambra', 8),
(277, ' Peruvamkulangara', 8),
(278, ' Pottore', 8),
(279, ' Puranattukara', 8),
(280, ' Puthukkad', 8),
(281, ' Puzhakkal ', 8),
(282, 'Sangamagrama', 8),
(283, 'Thaikkad', 8),
(284, 'Thalapilly', 8),
(285, 'Thalore', 8),
(286, 'Thiruvalayannur', 8),
(287, 'Thrissur', 8),
(288, 'Triprayar', 8),
(289, 'Vadakkumkara', 8),
(290, 'Vadanappally', 8),
(291, 'Vallachira', 8),
(292, 'Varandarappilly', 8),
(293, 'Vellanikkara', 8),
(294, 'Venmanad', 8),
(295, ' Wadakkancherry', 8),
(296, ' Chandranagar', 9),
(297, ' Chittur-Thathamangalam', 9),
(298, 'Kaikatty', 9),
(299, 'Kakkayur', 9),
(300, 'Kanjikode', 9),
(301, 'Karuvanpadi', 9),
(302, 'Kesavanpara', 9),
(303, 'Kulappully', 9),
(304, 'Kumbidi', 9),
(305, 'Manissery', 9),
(306, 'Mankurussi', 9),
(307, 'Mannarkkad', 9),
(308, 'Marutharode', 9),
(309, 'Olavakkode', 9),
(310, 'Padinjarangadi', 9),
(311, 'Palakkad', 9),
(312, 'Palakkuzhi', 9),
(313, 'Palappuram', 9),
(314, 'Pathirippala', 9),
(315, 'Pattambi', 9),
(316, 'Puthur', 9),
(317, 'Shoranur', 9),
(318, 'Trikkatiri', 9),
(319, ' Vadakkencherry', 9),
(320, ' Vaniyamkulam', 9),
(321, ' Vazhempuram', 9),
(322, ' Walayar', 9),
(323, ' Aikkarappadi', 10),
(324, ' Alamkod', 10),
(325, ' Alattiyur', 10),
(326, ' Ananthavoor', 10),
(327, ' Angadipuram', 10),
(328, ' Areekode', 10),
(329, ' Ariyallur', 10),
(330, ' Athavanad', 10),
(331, ' Changaramkulam', 10),
(332, ' Chemmad', 10),
(333, ' Cheriyamundam', 10),
(334, ' Cherukara', 10),
(335, ' Cherukavu', 10),
(336, ' Chungathara', 10),
(337, 'Edakkara', 10),
(338, 'Edappal', 10),
(339, 'Edarikode', 10),
(340, 'Idimuzhikkal', 10),
(341, 'Irimbiliyam', 10),
(342, ' Kadampuzha', 10),
(343, ' Kakkad', 10),
(344, 'Kalady', 10),
(345, 'Kalikavu', 10),
(346, 'Karinkallathani', 10),
(347, 'Karipur', 10),
(348, 'Kavathikalam', 10),
(349, 'Kodur', 10),
(350, 'Kondotty', 10),
(351, 'Koottilangadi', 10),
(352, 'Kottakkal', 10),
(353, 'Kuttippuram', 10),
(354, 'Malappuram', 10),
(355, 'Mampad', 10),
(356, 'Mangalam', 10),
(357, 'Manjeri', 10),
(358, 'Mankada', 10),
(359, 'Maranchery', 10),
(360, 'Mongam', 10),
(361, 'Naduvattom', 10),
(362, 'Nannambra', 10),
(363, 'Nediyiruppu', 10),
(364, 'Neduva', 10),
(365, 'Nilambur', 10),
(366, 'Niramarutur', 10),
(367, 'Oorakam', 10),
(368, 'Othukkungal', 10),
(369, 'Pallikkal', 10),
(370, 'Pandikkad', 10),
(371, 'Parappanangadi', 10),
(372, 'Parappur', 10),
(373, 'Pattikkad', 10),
(374, 'Perinthalmanna', 10),
(375, 'Perumanna-Klari', 10),
(376, 'Peruvallur', 10),
(377, 'Ponmundam', 10),
(378, 'Ponnani', 10),
(379, 'Pudiyangadi', 10),
(380, 'Purathur', 10),
(381, 'Puthanathani', 10),
(382, 'Tanur', 10),
(383, 'Tenhipalam', 10),
(384, 'Tennala', 10),
(385, 'Thalakkad', 10),
(386, 'Thalappara', 10),
(387, 'Tirur', 10),
(388, 'Tirurangadi', 10),
(389, 'Valambur', 10),
(390, 'Valanchery', 10),
(391, 'Valiyakunnu', 10),
(392, 'Valluvambram Junction', 10),
(393, 'Vaniyambalam', 10),
(394, 'Vazhayur', 10),
(395, 'Veliyankode', 10),
(396, 'Vengara', 10),
(397, 'Wandoor', 10),
(398, 'Balussery', 11),
(399, ' Cheruvannur Nallalam', 11),
(400, 'Feroke', 11),
(401, ' Kinassery', 11),
(402, 'Koduvally', 11),
(403, 'Koodaranji', 11),
(404, 'Koyilandy', 11),
(405, 'Kozhikode', 11),
(406, 'Kunnamangalam', 11),
(407, 'Madappally', 11),
(408, 'Pantheeramkavu', 11),
(409, 'Perambra', 11),
(410, 'Poovaranthode', 11),
(411, 'Ramanattukara', 11),
(412, ' Thamarassery', 11),
(413, ' Thiruvambady', 11),
(414, ' Thottumukkam', 11),
(415, ' Vatakara', 11),
(416, ' Kalpetta', 12),
(417, ' Kayakkunn', 12),
(418, ' Mananthavady', 12),
(419, ' Meenangadi', 12),
(420, 'Padinharethara', 12),
(421, 'Panamaram', 12),
(422, 'Pulpally', 12),
(423, 'Sultan Bathery', 12),
(424, 'Alakode', 13),
(425, 'Anjarakkandy', 13),
(426, 'Anthoor', 13),
(427, 'Azhikode and Azhikkal', 13),
(428, 'Cheleri', 13),
(429, 'Cherukunnu', 13),
(430, 'Cherupuzha', 13),
(431, 'Cheruthazham', 13),
(432, 'Dharmadom', 13),
(433, 'Eranholi', 13),
(434, 'Eruvatti', 13),
(435, 'Ezhome', 13),
(436, 'Irikkur', 13),
(437, 'Iritty', 13),
(438, 'Iriveri', 13),
(439, 'Kadachira', 13),
(440, 'Kadannappalli', 13),
(441, 'Kadirur', 13),
(442, 'Kalliasseri', 13),
(443, 'Kandamkunnu', 13),
(444, 'Kanhirode', 13),
(445, 'Kannadiparamba', 13),
(446, 'Kannapuram', 13),
(447, 'Kannur', 13),
(448, 'Karivellur', 13),
(449, 'Keezhallur', 13),
(450, 'Kolachery', 13),
(451, 'Kolavelloor', 13),
(452, 'Koodali', 13),
(453, 'Kottayam-Malabar', 13),
(454, 'Kunhimangalam', 13),
(455, 'Kurumathur', 13),
(456, 'Kuthuparamba', 13),
(457, 'Kuttiattoor', 13),
(458, 'Madayi', 13),
(459, 'Manantheri', 13),
(460, 'Mangattidam', 13),
(461, 'Maniyoor', 13),
(462, 'Mattanur', 13),
(463, 'Mavilayi', 13),
(464, 'Mayyil', 13),
(465, 'Mokeri', 13),
(466, 'Narath', 13),
(467, 'Paduvilayi', 13),
(468, 'Panniyannur', 13),
(469, 'Panoor', 13),
(470, 'Pappinisseri', 13),
(471, 'Pariyaram', 13),
(472, 'Pathiriyad', 13),
(473, 'Pattiom', 13),
(474, 'Payyanur', 13),
(475, 'Pazhayangadi', 13),
(476, 'Peralasseri', 13),
(477, 'Peravoor', 13),
(478, 'Peringathur', 13),
(479, 'Pilathara', 13),
(480, 'Pinarayi', 13),
(481, 'Sreekandapuram', 13),
(482, 'Taliparamba', 13),
(483, 'Thalassery', 13),
(484, 'Bangramanjeshwar', 14),
(485, 'Bare', 14),
(486, 'Cherkala', 14),
(487, 'Cheruvathur', 14),
(488, 'Hosabettu', 14),
(489, 'Kanhangad', 14),
(490, 'Kasaragod', 14),
(491, 'Kunjathur', 14),
(492, 'Manjeshwar', 14),
(493, 'Nileshwaram', 14),
(494, 'Uppala', 14);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `project_id` int(11) NOT NULL,
  `project_title` varchar(30) NOT NULL,
  `project_photo` varchar(1000) NOT NULL,
  `project_details` varchar(10000) NOT NULL,
  `project_area` varchar(10) NOT NULL,
  `place_id` int(11) NOT NULL,
  `project_cost` varchar(20) NOT NULL,
  `builder_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `project_type` varchar(50) NOT NULL,
  `architect_id` int(11) NOT NULL DEFAULT 0,
  `project_file` varchar(500) NOT NULL DEFAULT '0',
  `project_datetime` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchase`
--

CREATE TABLE `tbl_purchase` (
  `purchase_id` int(11) NOT NULL,
  `purchase_date` varchar(30) NOT NULL,
  `purchase_status` int(11) NOT NULL DEFAULT 0,
  `place_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL DEFAULT 0,
  `builder_id` int(11) NOT NULL DEFAULT 0,
  `architect_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subcategory`
--

CREATE TABLE `tbl_subcategory` (
  `subcategory_id` int(11) NOT NULL,
  `subcategory_name` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbl_subcategory`
--

INSERT INTO `tbl_subcategory` (`subcategory_id`, `subcategory_name`, `category_id`) VALUES
(3, 'Traditional', 1),
(19, 'Apartment', 1),
(20, 'Manufacturing', 4),
(21, 'Warehouse', 4),
(22, 'School', 5),
(23, 'College', 5),
(24, 'Office', 6),
(25, 'Hotel', 6),
(26, 'Super Market', 6),
(27, 'Theatre', 6),
(28, 'Hospital', 7),
(29, 'Mortuary', 7),
(30, 'Contemporary', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `user_contact` varchar(30) NOT NULL,
  `user_address` varchar(50) NOT NULL,
  `place_id` int(11) NOT NULL,
  `user_photo` varchar(300) NOT NULL,
  `user_gender` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `tbl_architect`
--
ALTER TABLE `tbl_architect`
  ADD PRIMARY KEY (`architect_id`);

--
-- Indexes for table `tbl_builder`
--
ALTER TABLE `tbl_builder`
  ADD PRIMARY KEY (`builder_id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `tbl_chat`
--
ALTER TABLE `tbl_chat`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `tbl_district`
--
ALTER TABLE `tbl_district`
  ADD PRIMARY KEY (`district_id`);

--
-- Indexes for table `tbl_gallery`
--
ALTER TABLE `tbl_gallery`
  ADD PRIMARY KEY (`gallery_id`);

--
-- Indexes for table `tbl_like`
--
ALTER TABLE `tbl_like`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `tbl_material`
--
ALTER TABLE `tbl_material`
  ADD PRIMARY KEY (`material_id`);

--
-- Indexes for table `tbl_place`
--
ALTER TABLE `tbl_place`
  ADD PRIMARY KEY (`place_id`);

--
-- Indexes for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `tbl_purchase`
--
ALTER TABLE `tbl_purchase`
  ADD PRIMARY KEY (`purchase_id`);

--
-- Indexes for table `tbl_subcategory`
--
ALTER TABLE `tbl_subcategory`
  ADD PRIMARY KEY (`subcategory_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_architect`
--
ALTER TABLE `tbl_architect`
  MODIFY `architect_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_builder`
--
ALTER TABLE `tbl_builder`
  MODIFY `builder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_chat`
--
ALTER TABLE `tbl_chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_district`
--
ALTER TABLE `tbl_district`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `tbl_gallery`
--
ALTER TABLE `tbl_gallery`
  MODIFY `gallery_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `tbl_like`
--
ALTER TABLE `tbl_like`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `tbl_material`
--
ALTER TABLE `tbl_material`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_place`
--
ALTER TABLE `tbl_place`
  MODIFY `place_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=495;

--
-- AUTO_INCREMENT for table `tbl_project`
--
ALTER TABLE `tbl_project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_purchase`
--
ALTER TABLE `tbl_purchase`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `tbl_subcategory`
--
ALTER TABLE `tbl_subcategory`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
