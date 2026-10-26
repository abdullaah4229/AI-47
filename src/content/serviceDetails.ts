/** Starting content for each service page. Copied into the database by `npm run seed`, then edited in /admin. */

type Pair = { title: string; text: string }
export type ServiceDetail = {
  heroTitle: string
  heroAccent: string
  intro: string
  metaTitle: string
  metaDescription: string
  usesHeadline: string
  useCases: Pair[]
  faqs?: { question: string; answer: string }[]
  template?: 'standard' | 'receptionist'
}

const p = (rows: [string, string][]): Pair[] => rows.map(([title, text]) => ({ title, text }))

export const DEFAULT_PROCESS = p([
  ['Discover', 'We learn how work flows today and where time is lost.'],
  ['Design', 'We map the solution, integrations, and human checkpoints.'],
  ['Build & Integrate', 'We build, connect, and test with your real scenarios.'],
  ['Launch & Refine', 'We go live, monitor, and improve as you grow.'],
])

export const DEFAULT_INCLUDED = [
  'Discovery session and requirements map',
  'Solution design tailored to your workflows',
  'Build, configuration, and integration',
  'Testing with real-world scenarios',
  'Team walkthrough and documentation',
  'Post-launch monitoring and refinement',
]

export const GENERIC_FAQS = [
  { question: 'Will this work with the tools we already use?', answer: 'Often, yes. During discovery we review your current tools and confirm what can be connected before any build begins.' },
  { question: 'How long does it take to launch?', answer: 'It depends on scope and integrations. You receive a timeline estimate in your proposal once we understand your requirements.' },
  { question: 'Do we stay in control?', answer: 'Yes. We design approval steps and human handoffs where judgment matters, and your team can review how the system behaves.' },
]

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'ai-automation': {
    heroTitle: 'AI Automation for', heroAccent: 'Small Business.',
    intro: 'Eliminate repetitive tasks and streamline operations with intelligent AI-powered workflows that connect the tools you already use.',
    metaTitle: 'AI Automation Services for Small Business',
    metaDescription: 'AI automation services for small businesses: automate data entry, documents, approvals, and reporting with AI workflows connected to your existing tools.',
    usesHeadline: 'Hand the repetitive work to intelligent workflows.',
    useCases: p([
      ['Data entry & transfer', 'Move information between forms, inboxes, spreadsheets, and your CRM without copy-pasting.'],
      ['Document processing', 'Extract key details from invoices, forms, and emails and route them where they belong.'],
      ['Approvals & notifications', 'Trigger reviews, reminders, and alerts automatically at the right step.'],
      ['Reporting', 'Compile recurring reports from multiple sources on a schedule.'],
    ]),
  },
  'ai-chatbots': {
    heroTitle: 'AI Chatbots for', heroAccent: 'Small Business.',
    intro: 'Deliver instant customer support and engage visitors around the clock with chatbots trained on your approved business information.',
    metaTitle: 'AI Chatbot for Business — 24/7 Website Assistant',
    metaDescription: 'Custom AI chatbots for small businesses that answer questions, capture leads, and book appointments 24/7 — with human handoff when it matters.',
    usesHeadline: 'Answer, qualify, and book — any hour of the day.',
    useCases: p([
      ['Website support', 'Answer common questions about services, pricing approach, and policies instantly.'],
      ['Lead capture', 'Ask qualifying questions and pass warm leads to your team.'],
      ['Appointment booking', 'Offer available times and book directly into your calendar.'],
      ['Human handoff', 'Route complex or sensitive conversations to a person with full context.'],
    ]),
  },
  'ai-voice-agents': {
    heroTitle: 'AI Voice Agent Services', heroAccent: 'for Businesses.',
    intro: 'Automate customer calls, appointment scheduling, and routine phone interactions with natural-sounding AI voice agents.',
    metaTitle: 'AI Voice Agent Services for Businesses',
    metaDescription: 'AI voice agent services for businesses: answer calls, schedule appointments, place reminder calls, and route urgent callers to your team.',
    usesHeadline: 'Never let a routine call go unanswered.',
    useCases: p([
      ['Call answering', 'Greet callers, answer routine questions, and take messages after hours.'],
      ['Scheduling', 'Book, confirm, and reschedule appointments by phone.'],
      ['Reminder calls', 'Place routine reminder and confirmation calls automatically.'],
      ['Call routing', 'Identify the caller’s need and transfer urgent calls to your team.'],
    ]),
  },
  'ai-receptionist': {
    template: 'receptionist',
    heroTitle: 'AI Receptionist for', heroAccent: 'Small Business.',
    intro: 'A 24/7 AI answering service that picks up every call, answers routine questions, books appointments, and hands urgent calls to your team — with a summary.',
    metaTitle: 'AI Receptionist for Small Business | 24/7 AI Answering Service',
    metaDescription: 'An AI receptionist for small businesses: a 24/7 AI answering service that answers calls, books appointments, and routes urgent callers to your team.',
    usesHeadline: 'A 24/7 AI answering service that never misses a call.',
    useCases: p([
      ['Answers every call, 24/7', 'Nights, weekends, holidays, and lunch breaks — every caller gets a friendly, on-brand answer.'],
      ['Books appointments', 'Offers open times and books straight into your calendar, then texts a confirmation.'],
      ['Qualifies new leads', 'Asks the questions you choose and captures caller details for your team.'],
      ['Routes urgent calls', 'Transfers emergencies and important callers to the right person, with a short summary.'],
      ['Answers common questions', 'Hours, services, pricing approach, directions — answered from information you approve.'],
      ['Sends call summaries', 'Every call is logged, summarized, and sent to you by email or text.'],
    ]),
    faqs: [
      { question: 'What is an AI receptionist?', answer: 'An AI voice agent that answers your business phone, handles routine questions, books appointments, and passes urgent or complex calls to your team.' },
      { question: 'Will callers know they’re talking to AI?', answer: 'We recommend a clear greeting that tells callers they’re speaking with an AI assistant, and we configure it to follow the rules that apply in your state.' },
      { question: 'Can it transfer calls to a real person?', answer: 'Yes. You decide which calls are transferred and to whom, and your team receives a short summary of each one.' },
      { question: 'Does it work with my calendar and CRM?', answer: 'Often, yes. We review the tools you use during discovery and confirm what can be connected before we build.' },
    ],
  },
  'social-media-automation': {
    heroTitle: 'Social Media', heroAccent: 'Automation.',
    intro: 'Streamline content planning, publishing, and audience engagement with AI-powered tools that keep your brand consistently present.',
    metaTitle: 'AI Social Media Automation for Small Business',
    metaDescription: 'AI social media automation: content calendars, on-brand post drafts, scheduled publishing, and engagement triage for small businesses.',
    usesHeadline: 'Stay consistent without living on social media.',
    useCases: p([
      ['Content calendars', 'Plan themed posting schedules aligned with your goals.'],
      ['Draft generation', 'Create on-brand post drafts for your review and approval.'],
      ['Scheduled publishing', 'Publish approved content across channels on schedule.'],
      ['Engagement triage', 'Surface comments and messages that need a human reply.'],
    ]),
  },
  'ai-content-creation': {
    heroTitle: 'AI Content', heroAccent: 'Creation.',
    intro: 'Generate engaging text, images, videos, and creative assets with advanced AI — guided by your brand and reviewed by your team.',
    metaTitle: 'AI Content Creation Services',
    metaDescription: 'AI content creation for businesses: written content, images, short-form video, and CGI concepts — on brand and reviewed by your team.',
    usesHeadline: 'More creative output, the same brand voice.',
    useCases: p([
      ['Written content', 'Blog drafts, product descriptions, emails, and landing page copy.'],
      ['Image generation', 'On-brand visuals for campaigns, posts, and presentations.'],
      ['Video & CGI', 'Short-form video and CGI concepts for marketing.'],
      ['Brand guidelines', 'Prompt systems that keep every asset consistent with your brand.'],
    ]),
  },
  'ai-lead-generation': {
    heroTitle: 'AI Lead Generation', heroAccent: 'for Small Business.',
    intro: 'Discover, qualify, and nurture potential customers through intelligent automated systems — so no lead waits and none slips through.',
    metaTitle: 'AI Lead Generation for Small Business',
    metaDescription: 'AI lead generation for small businesses: capture leads, respond in minutes, qualify automatically, and nurture with personalized follow-ups.',
    usesHeadline: 'Every lead answered, qualified, and followed up.',
    useCases: p([
      ['Lead capture', 'Turn website visits, forms, and calls into organized, trackable leads.'],
      ['Instant response', 'Reply to new inquiries within minutes, day or night.'],
      ['Qualification', 'Ask the questions that matter and route the best leads to your team first.'],
      ['Nurture sequences', 'Personalized follow-ups for leads who aren’t ready to buy yet.'],
    ]),
  },
  'ai-dashboards': {
    heroTitle: 'AI-Powered', heroAccent: 'Dashboards.',
    intro: 'Monitor business performance, workflows, and key metrics through intelligent dashboards that bring your data into one place.',
    metaTitle: 'AI-Powered Business Dashboards',
    metaDescription: 'AI-powered dashboards that combine sales, marketing, and operations data, monitor automations, and explain changes in plain language.',
    usesHeadline: 'One screen for everything that matters.',
    useCases: p([
      ['Unified metrics', 'Combine data from sales, marketing, and operations tools.'],
      ['Automation monitoring', 'See what your AI agents and workflows are doing in real time.'],
      ['Plain-language insights', 'AI summaries that explain what changed and why it matters.'],
      ['Alerts', 'Get notified when a metric moves outside your chosen range.'],
    ]),
  },
  'custom-ai-solutions': {
    heroTitle: 'Custom AI', heroAccent: 'Solutions.',
    intro: 'Tailored AI systems designed around your unique challenges, data, and goals — built to fit how your business actually works.',
    metaTitle: 'Custom AI Solutions for Business',
    metaDescription: 'Custom AI solutions: AI agents, knowledge assistants on your documents, and integrations designed around your business workflows.',
    usesHeadline: 'When off-the-shelf isn’t enough.',
    useCases: p([
      ['AI agents for your workflows', 'Multi-step agents that handle a defined process from start to finish, with checkpoints.'],
      ['Knowledge assistants', 'Answer team and customer questions from your own documents and policies.'],
      ['System integrations', 'Connect AI to the software you already rely on.'],
      ['Prototype to production', 'Start with a focused pilot, then harden it for everyday use.'],
    ]),
  },
  'ai-marketing-automation': {
    heroTitle: 'AI Marketing', heroAccent: 'Automation.',
    intro: 'Improve marketing efficiency with automated campaigns, customer journeys, and AI-driven insights that help you spend time where it counts.',
    metaTitle: 'AI Marketing Automation for Small Business',
    metaDescription: 'AI marketing automation for small businesses: automated campaigns, customer journeys, personalization, and plain-language performance insights.',
    usesHeadline: 'Campaigns that run themselves — and keep improving.',
    useCases: p([
      ['Campaign automation', 'Launch email and messaging campaigns triggered by customer actions.'],
      ['Customer journeys', 'Guide each customer with the right message at the right time.'],
      ['Personalization', 'Tailor content to segments without writing every version by hand.'],
      ['Performance insights', 'Understand what’s working with AI summaries of your results.'],
    ]),
  },
  'ai-consulting': {
    heroTitle: 'AI Consultant & AI Consulting Services', heroAccent: 'for Small Business.',
    intro: 'Identify high-impact AI opportunities and develop a practical strategy for implementation — before you invest in building anything.',
    metaTitle: 'AI Consultant & AI Consulting Services for Small Business',
    metaDescription: 'Work with an AI consultant: opportunity audits, tool selection, implementation roadmaps, and team training for small businesses in the US.',
    usesHeadline: 'Clarity before code.',
    useCases: p([
      ['Opportunity audit', 'Map your workflows and find where AI can help most.'],
      ['Tool selection', 'Recommend the right platforms for your needs and budget.'],
      ['Implementation roadmap', 'A phased plan with clear priorities and responsibilities.'],
      ['Team enablement', 'Practical training so your team uses AI confidently.'],
    ]),
    faqs: [
      { question: 'What does an AI consultant do?', answer: 'An AI consultant reviews how your business works, identifies where AI can save time or improve results, recommends tools, and plans a practical rollout.' },
      { question: 'Do I need to know anything about AI first?', answer: 'No. We explain options in plain language and focus on business outcomes rather than technology.' },
      { question: 'Can you also build what you recommend?', answer: 'Yes. Many clients start with consulting and then have us build and integrate the solutions in the roadmap.' },
    ],
  },
}
