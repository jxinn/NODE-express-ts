# This is a Express.js template.

## Getting Started

---

Run the server in development mode.

```
npm install
npm run dev
```

Build the project for production.

```
npm run build
```

Run the production build (Must be built first).

```
npm start
```

Check for linting errors.

```
npm run lint
```

MySQL - DDL

```
-- `Database`.`user` definition

CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Unique Key',
  `email` varchar(128) NOT NULL COMMENT '이메일',
  `password` varchar(128) NOT NULL COMMENT '패스워드',
  `name` varchar(128) NOT NULL COMMENT '이름',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='유저 테이블';
```
