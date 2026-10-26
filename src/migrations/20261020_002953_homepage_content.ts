import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`summary\` text NOT NULL,
  	\`icon\` text DEFAULT 'spark',
  	\`order\` numeric DEFAULT 0,
  	\`show_on_home\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`industries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`opportunities\` text,
  	\`summary\` text NOT NULL,
  	\`icon\` text DEFAULT 'brief',
  	\`order\` numeric DEFAULT 0,
  	\`show_on_home\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`industries_slug_idx\` ON \`industries\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`industries_updated_at_idx\` ON \`industries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industries_created_at_idx\` ON \`industries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`faqs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`show_on_home\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`faqs_updated_at_idx\` ON \`faqs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faqs_created_at_idx\` ON \`faqs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`homepage_hero_phrases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_hero_phrases_order_idx\` ON \`homepage_hero_phrases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_hero_phrases_parent_id_idx\` ON \`homepage_hero_phrases\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_trust_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`icon\` text DEFAULT 'spark',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_trust_items_order_idx\` ON \`homepage_trust_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_trust_items_parent_id_idx\` ON \`homepage_trust_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_why_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_why_items_order_idx\` ON \`homepage_why_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_why_items_parent_id_idx\` ON \`homepage_why_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_steps_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_steps_items_order_idx\` ON \`homepage_steps_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_steps_items_parent_id_idx\` ON \`homepage_steps_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_benefits_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_benefits_items_order_idx\` ON \`homepage_benefits_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_benefits_items_parent_id_idx\` ON \`homepage_benefits_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_about_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_about_paragraphs_order_idx\` ON \`homepage_about_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_paragraphs_parent_id_idx\` ON \`homepage_about_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_badge\` text DEFAULT 'AI Automation Agency & AI Consulting for Small Businesses',
  	\`hero_line1\` text DEFAULT 'Your Business.',
  	\`hero_line2\` text DEFAULT 'Powered by',
  	\`hero_line3\` text DEFAULT 'Artificial Intelligence.',
  	\`hero_subheadline\` text DEFAULT 'Transform the way you work with intelligent automation, AI-powered solutions, and next-generation technology designed to accelerate your business growth.',
  	\`hero_primary_label\` text DEFAULT 'Book Your Free AI Consultation',
  	\`hero_primary_href\` text DEFAULT '/contact',
  	\`hero_secondary_label\` text DEFAULT 'Explore Our Solutions',
  	\`hero_secondary_href\` text DEFAULT '/services',
  	\`trust_title\` text DEFAULT 'Built for Businesses Ready to' NOT NULL,
  	\`trust_accent\` text DEFAULT 'Grow Smarter.',
  	\`trust_intro\` text DEFAULT 'Every engagement is shaped around your operations, your tools, and the outcomes that matter to your business.',
  	\`services_title\` text DEFAULT 'Intelligent Solutions.' NOT NULL,
  	\`services_accent\` text DEFAULT 'Limitless Possibilities.',
  	\`services_intro\` text DEFAULT 'Explore powerful AI solutions designed to automate operations, enhance productivity, and accelerate business growth.',
  	\`why_title\` text DEFAULT 'Why Forward-Thinking Businesses Choose' NOT NULL,
  	\`why_accent\` text DEFAULT 'AI 742',
  	\`why_intro\` text DEFAULT 'Technology is the tool. Your growth is the goal. We start with your business and work backwards to the right automation.',
  	\`steps_title\` text DEFAULT 'Your Journey to' NOT NULL,
  	\`steps_accent\` text DEFAULT 'Intelligent Automation.',
  	\`benefits_title\` text DEFAULT 'Less Manual Work.' NOT NULL,
  	\`benefits_accent\` text DEFAULT 'More Business Growth.',
  	\`about_title\` text DEFAULT 'Building the Future of' NOT NULL,
  	\`about_accent\` text DEFAULT 'Intelligent Business.',
  	\`final_cta_title\` text DEFAULT 'The Future of Your Business' NOT NULL,
  	\`final_cta_accent\` text DEFAULT 'Starts Here.',
  	\`final_cta_text\` text DEFAULT 'Stop wasting time on repetitive work. Start building a smarter, more efficient business with AI 742.',
  	\`final_cta_button_label\` text DEFAULT 'Let’s Build Your AI Future',
  	\`final_cta_button_href\` text DEFAULT '/contact',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`services_id\` integer REFERENCES services(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`industries_id\` integer REFERENCES industries(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`faqs_id\` integer REFERENCES faqs(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industries_id_idx\` ON \`payload_locked_documents_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faqs_id_idx\` ON \`payload_locked_documents_rels\` (\`faqs_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`industries\`;`)
  await db.run(sql`DROP TABLE \`faqs\`;`)
  await db.run(sql`DROP TABLE \`homepage_hero_phrases\`;`)
  await db.run(sql`DROP TABLE \`homepage_trust_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_why_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_steps_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_benefits_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_about_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
