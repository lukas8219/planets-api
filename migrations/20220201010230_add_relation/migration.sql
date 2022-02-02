-- CreateTable
CREATE TABLE `Movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `planetId` INTEGER NOT NULL,

    INDEX `movies_id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Movies` ADD CONSTRAINT `Movies_planetId_fkey` FOREIGN KEY (`planetId`) REFERENCES `Planet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
