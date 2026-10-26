import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`industries_use_cases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_use_cases_order_idx\` ON \`industries_use_cases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_use_cases_parent_id_idx\` ON \`industries_use_cases\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_flow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_flow_order_idx\` ON \`industries_flow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_flow_parent_id_idx\` ON \`industries_flow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_faqs_order_idx\` ON \`industries_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_faqs_parent_id_idx\` ON \`industries_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_rels_order_idx\` ON \`industries_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`industries_rels_parent_idx\` ON \`industries_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`industries_rels_path_idx\` ON \`industries_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`industries_rels_services_id_idx\` ON \`industries_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`how_it_works_steps_deliverables\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`how_it_works_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`how_it_works_steps_deliverables_order_idx\` ON \`how_it_works_steps_deliverables\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`how_it_works_steps_deliverables_parent_id_idx\` ON \`how_it_works_steps_deliverables\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`how_it_works_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`duration\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`how_it_works\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`how_it_works_steps_order_idx\` ON \`how_it_works_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`how_it_works_steps_parent_id_idx\` ON \`how_it_works_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`how_it_works_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`how_it_works\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`how_it_works_faqs_order_idx\` ON \`how_it_works_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`how_it_works_faqs_parent_id_idx\` ON \`how_it_works_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`how_it_works\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text DEFAULT 'How Our',
  	\`hero_accent\` text DEFAULT 'AI Consulting',
  	\`hero_title_end\` text DEFAULT 'Process Works',
  	\`intro\` text DEFAULT 'A clear, four-step path from your first conversation to AI automation running in your business — with your team in control at every stage.',
  	\`meta_title\` text DEFAULT 'How Our AI Consulting Process Works',
  	\`meta_description\` text DEFAULT 'How AI 742 works: discovery, strategy, build and integration, then optimization — a clear four-step AI consulting process for small businesses.',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`about_beliefs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_beliefs_order_idx\` ON \`about_beliefs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_beliefs_parent_id_idx\` ON \`about_beliefs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text DEFAULT 'An AI Automation Agency Built for',
  	\`hero_accent\` text DEFAULT 'Small Businesses.',
  	\`intro\` text DEFAULT 'AI 742 is an AI consulting agency for small businesses. We believe artificial intelligence should be practical, accessible, and transformative — not reserved for companies with research labs and endless budgets.',
  	\`mission\` text DEFAULT 'To make advanced artificial intelligence accessible, affordable, and practical for growing businesses.',
  	\`vision\` text DEFAULT 'To empower businesses to operate smarter through intelligent automation.',
  	\`story_title\` text DEFAULT 'Why 742?',
  	\`story\` text,
  	\`story_more\` text DEFAULT 'Our goal is to help businesses unlock the power of intelligent automation through innovative technology and customized solutions. From AI-powered customer interactions to advanced workflow automation, we help businesses simplify operations and prepare for a more intelligent future.',
  	\`founder_name\` text,
  	\`founder_role\` text DEFAULT 'Founder, AI 742',
  	\`founder_photo_id\` integer,
  	\`meta_title\` text DEFAULT 'About AI 742 | AI Automation Agency for Small Businesses',
  	\`meta_description\` text DEFAULT 'AI 742 is an AI automation agency and AI consulting agency for small businesses in the US. Practical, honest AI — built around your business.',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`founder_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_founder_photo_idx\` ON \`about\` (\`founder_photo_id\`);`)
  await db.run(sql`ALTER TABLE \`industries\` ADD \`hero_title\` text;`)
  await db.run(sql`ALTER TABLE \`industries\` ADD \`hero_accent\` text;`)
  await db.run(sql`ALTER TABLE \`industries\` ADD \`intro\` text;`)
  await db.run(sql`ALTER TABLE \`industries\` ADD \`note\` text;`)
  await db.run(sql`ALTER TABLE \`industries\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`industries\` ADD \`meta_description\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`industries_use_cases\`;`)
  await db.run(sql`DROP TABLE \`industries_flow\`;`)
  await db.run(sql`DROP TABLE \`industries_faqs\`;`)
  await db.run(sql`DROP TABLE \`industries_rels\`;`)
  await db.run(sql`DROP TABLE \`how_it_works_steps_deliverables\`;`)
  await db.run(sql`DROP TABLE \`how_it_works_steps\`;`)
  await db.run(sql`DROP TABLE \`how_it_works_faqs\`;`)
  await db.run(sql`DROP TABLE \`how_it_works\`;`)
  await db.run(sql`DROP TABLE \`about_beliefs\`;`)
  await db.run(sql`DROP TABLE \`about\`;`)
  await db.run(sql`ALTER TABLE \`industries\` DROP COLUMN \`hero_title\`;`)
  await db.run(sql`ALTER TABLE \`industries\` DROP COLUMN \`hero_accent\`;`)
  await db.run(sql`ALTER TABLE \`industries\` DROP COLUMN \`intro\`;`)
  await db.run(sql`ALTER TABLE \`industries\` DROP COLUMN \`note\`;`)
  await db.run(sql`ALTER TABLE \`industries\` DROP COLUMN \`meta_title\`;`)
  await db.run(sql`ALTER TABLE \`industries\` DROP COLUMN \`meta_description\`;`)
}
