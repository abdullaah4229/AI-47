import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`services_use_cases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_use_cases_order_idx\` ON \`services_use_cases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_use_cases_parent_id_idx\` ON \`services_use_cases\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_included\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_included_order_idx\` ON \`services_included\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_included_parent_id_idx\` ON \`services_included\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_faqs_order_idx\` ON \`services_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_faqs_parent_id_idx\` ON \`services_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_rels_order_idx\` ON \`services_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_parent_idx\` ON \`services_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_path_idx\` ON \`services_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_services_id_idx\` ON \`services_rels\` (\`services_id\`);`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`template\` text DEFAULT 'standard';`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`hero_title\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`hero_accent\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`intro\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`uses_headline\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`meta_description\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`services_use_cases\`;`)
  await db.run(sql`DROP TABLE \`services_included\`;`)
  await db.run(sql`DROP TABLE \`services_faqs\`;`)
  await db.run(sql`DROP TABLE \`services_rels\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`template\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`hero_title\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`hero_accent\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`intro\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`uses_headline\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`meta_title\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`meta_description\`;`)
}
