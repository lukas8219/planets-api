-- CreateTable
CREATE TABLE `Planet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `terrain` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Planet_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
