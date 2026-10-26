import * as migration_20261020_001529_initial from './20261020_001529_initial';
import * as migration_20261020_002953_homepage_content from './20261020_002953_homepage_content';
import * as migration_20261020_003959_service_pages from './20261020_003959_service_pages';
import * as migration_20261020_211715_industry_about_how from './20261020_211715_industry_about_how';
import * as migration_20261020_215515_blog from './20261020_215515_blog';
import * as migration_20261020_220433_leads_legal from './20261020_220433_leads_legal';

export const migrations = [
  {
    up: migration_20261020_001529_initial.up,
    down: migration_20261020_001529_initial.down,
    name: '20261020_001529_initial',
  },
  {
    up: migration_20261020_002953_homepage_content.up,
    down: migration_20261020_002953_homepage_content.down,
    name: '20261020_002953_homepage_content',
  },
  {
    up: migration_20261020_003959_service_pages.up,
    down: migration_20261020_003959_service_pages.down,
    name: '20261020_003959_service_pages',
  },
  {
    up: migration_20261020_211715_industry_about_how.up,
    down: migration_20261020_211715_industry_about_how.down,
    name: '20261020_211715_industry_about_how',
  },
  {
    up: migration_20261020_215515_blog.up,
    down: migration_20261020_215515_blog.down,
    name: '20261020_215515_blog',
  },
  {
    up: migration_20261020_220433_leads_legal.up,
    down: migration_20261020_220433_leads_legal.down,
    name: '20261020_220433_leads_legal'
  },
];
