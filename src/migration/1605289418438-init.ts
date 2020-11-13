import { MigrationInterface, QueryRunner } from "typeorm";

export class init1605289418438 implements MigrationInterface {
    name = "init1605289418438";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(190) NOT NULL, `email` varchar(190) NOT NULL, `passwordHash` varchar(190) NOT NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
        );
        await queryRunner.query(
            "CREATE TABLE `document` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(190) NOT NULL, `content` text NOT NULL DEFAULT '', `createdAt` timestamp NULL DEFAULT NULL, `editedAt` timestamp NULL DEFAULT NULL, `shared` tinyint NOT NULL DEFAULT 0, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
        );
        await queryRunner.query(
            "ALTER TABLE `document` ADD CONSTRAINT `FK_7424ddcbdf1e9b067669eb0d3fd` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `document` DROP FOREIGN KEY `FK_7424ddcbdf1e9b067669eb0d3fd`",
        );
        await queryRunner.query("DROP TABLE `document`");
        await queryRunner.query(
            "DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`",
        );
        await queryRunner.query(
            "DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`",
        );
        await queryRunner.query("DROP TABLE `user`");
    }
}
