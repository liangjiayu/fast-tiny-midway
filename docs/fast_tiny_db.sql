/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : fast_tiny_db

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 24/03/2025 22:12:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for demo_article
-- ----------------------------
DROP TABLE IF EXISTS `demo_article`;
CREATE TABLE `demo_article` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(255) DEFAULT NULL COMMENT '文章标题',
  `content` longtext COMMENT '文章内容',
  `author_id` int DEFAULT NULL COMMENT '作者ID',
  `category_id` int DEFAULT NULL COMMENT '分类ID',
  `status` tinyint DEFAULT NULL COMMENT '文章状态',
  `view_count` int DEFAULT NULL COMMENT '阅读量',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of demo_article
-- ----------------------------
BEGIN;
INSERT INTO `demo_article` (`id`, `title`, `content`, `author_id`, `category_id`, `status`, `view_count`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, '文章名称1', NULL, NULL, NULL, NULL, NULL, '2025-03-22 20:05:04', '2025-03-23 10:19:23', NULL);
INSERT INTO `demo_article` (`id`, `title`, `content`, `author_id`, `category_id`, `status`, `view_count`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, '文件名称2', NULL, NULL, NULL, NULL, NULL, '2025-03-22 20:17:30', '2025-03-23 10:19:14', NULL);
INSERT INTO `demo_article` (`id`, `title`, `content`, `author_id`, `category_id`, `status`, `view_count`, `created_at`, `updated_at`, `deleted_at`) VALUES (3, '文章名称3', NULL, NULL, NULL, NULL, NULL, '2025-03-22 20:17:32', '2025-03-23 10:19:21', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_users
-- ----------------------------
DROP TABLE IF EXISTS `sys_users`;
CREATE TABLE `sys_users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识符',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名，唯一',
  `password` varchar(50) NOT NULL COMMENT '用户密码',
  `phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户手机号',
  `gender` tinyint DEFAULT NULL COMMENT '用户性别，枚举类型：男(1)、女(2)、其他(3)',
  `nickname` varchar(50) DEFAULT NULL COMMENT '用户称号',
  `profile_picture_url` varchar(255) DEFAULT NULL COMMENT '用户头像的URL',
  `profile_description` text COMMENT '用户简介',
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '用户元数据，存储额外的自定义信息',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除时间',
  `is_deleted` tinyint DEFAULT '0' COMMENT '逻辑删除标识，未删除(0)、已删除(1)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_users
-- ----------------------------
BEGIN;
INSERT INTO `sys_users` (`id`, `username`, `password`, `phone_number`, `gender`, `nickname`, `profile_picture_url`, `profile_description`, `metadata`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES (11, 'xiaoming', '123456', '17522617862', 1, '小明', 'https://www.picture.com/', '个性签名', '{\"blogUrl\":\"https://www.blog.com/\",\"facebookUrl\":\"https://www.facebook.com/\",\"contacts\":[{\"name\":\"家长\",\"phone\":\"16014987966\",\"primary\":true}],\"phoneVerified\":false,\"subscribed\":false}', '2025-02-03 22:25:18', '2025-02-03 22:29:58', NULL, 0);
INSERT INTO `sys_users` (`id`, `username`, `password`, `phone_number`, `gender`, `nickname`, `profile_picture_url`, `profile_description`, `metadata`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES (12, 'xiaohong', '456789', '17035160775', 2, '小红', 'https://www.picture.com/', '个性签名123', NULL, '2025-02-03 22:28:44', '2025-02-03 22:34:59', NULL, 0);
INSERT INTO `sys_users` (`id`, `username`, `password`, `phone_number`, `gender`, `nickname`, `profile_picture_url`, `profile_description`, `metadata`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES (13, 'xiaofang', '456789', '14271054047', 2, '小芳', 'https://www.picture.com/', '个性签名', '{\"blogUrl\":\"https://www.blog.com/\",\"facebookUrl\":\"https://www.facebook.com/\",\"contacts\":[{\"name\":\"老哥\",\"phone\":\"15878410813\",\"primary\":false}],\"phoneVerified\":false,\"subscribed\":false}', '2025-02-03 22:28:53', '2025-02-03 22:34:02', NULL, 0);
INSERT INTO `sys_users` (`id`, `username`, `password`, `phone_number`, `gender`, `nickname`, `profile_picture_url`, `profile_description`, `metadata`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES (14, 'xVkTrVm', 'rqHqH0DiyfH4bxGohKv', NULL, NULL, NULL, NULL, NULL, NULL, '2025-02-03 22:35:53', '2025-02-03 22:35:53', NULL, 0);
INSERT INTO `sys_users` (`id`, `username`, `password`, `phone_number`, `gender`, `nickname`, `profile_picture_url`, `profile_description`, `metadata`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES (15, 'wLO1keqcKC9DwOVAZx3', 'c9XAru22wvHfZ3S0Ojw', NULL, NULL, NULL, NULL, NULL, NULL, '2025-02-03 22:35:56', '2025-02-03 22:35:56', NULL, 0);
INSERT INTO `sys_users` (`id`, `username`, `password`, `phone_number`, `gender`, `nickname`, `profile_picture_url`, `profile_description`, `metadata`, `created_at`, `updated_at`, `deleted_at`, `is_deleted`) VALUES (16, '17GoNGbc', '3bxP9Q', NULL, NULL, NULL, NULL, NULL, NULL, '2025-02-03 22:35:59', '2025-02-03 22:35:59', NULL, 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
