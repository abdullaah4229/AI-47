/** Starting content for industry pages, How It Works, and About. Copied into the database by `npm run seed`. */

type Pair = { title: string; text: string }
const p = (rows: [string, string][]): Pair[] => rows.map(([title, text]) => ({ title, text }))

export type IndustryDetail = {
  heroTitle: string
  heroAccent: string
  intro: string
  useCases: Pair[]
  flow: string[]
  note?: string
  faqs?: { question: string; answer: string }[]
  related: string[]
  metaTitle: string
  metaDescription: string
}

export const industryFaqs = (name: string) => [
  { question: `Is AI a good fit for ${name.toLowerCase()}?`, answer: 'If your team spends time on repetitive admin, answering the same questions, or following up with leads, there is usually a practical place to start. A free consultation will show you where.' },
  { question: 'Will it work with the tools we already use?', answer: 'Often, yes. We review your current software during discovery and confirm what can be connected before anything is built.' },
  { question: 'Do we stay in control?', answer: 'Yes. We design approval steps and human handoffs wherever judgment matters, and your team can review how the system behaves.' },
]

export const INDUSTRY_DETAILS: Record<string, IndustryDetail> = {
  'law-firms': {
    heroTitle: 'AI for', heroAccent: 'Law Firms.',
    intro: 'Capture every potential client, automate intake and scheduling, and free your team from routine admin — with attorneys in control of everything that matters.',
    useCases: p([
      ['After-hours AI receptionist', 'Answer calls nights and weekends, capture case details, and schedule consultations.'],
      ['Client intake', 'Collect inquiry details by phone or chat and route qualified matters to the right attorney.'],
      ['Consultation scheduling', 'Offer available times and send reminders automatically.'],
      ['Document collection', 'Request and organize client documents with automated follow-ups.'],
      ['Client updates', 'Draft routine status updates for attorney review before they go out.'],
      ['Internal knowledge search', 'Help staff find firm templates and procedures faster.'],
    ]),
    flow: ['Potential client calls after hours', 'AI receptionist captures case details', 'Consultation booked; attorney reviews the summary'],
    note: 'AI handles intake and administrative tasks only. Legal advice, case strategy, and conflict checks stay with your attorneys, and every solution is designed around client confidentiality.',
    faqs: [
      { question: 'Is AI appropriate for a law firm?', answer: 'For administrative work such as intake, scheduling, and document collection, it can be — with attorney oversight. We design around your confidentiality and professional obligations, and your firm makes the final call.' },
      { question: 'Will the AI give legal advice to callers?', answer: 'No. We configure it to avoid legal advice and route substantive questions to your team.' },
      { question: 'Can it work with our practice management software?', answer: 'Often, yes. We confirm integration options during discovery before anything is built.' },
    ],
    related: ['ai-receptionist', 'ai-chatbots', 'ai-automation'],
    metaTitle: 'AI for Law Firms | AI Receptionist, Intake & Scheduling',
    metaDescription: 'AI for law firms: an after-hours AI receptionist, automated client intake, consultation scheduling, and document collection — with attorneys in control.',
  },
  'real-estate': {
    heroTitle: 'AI for', heroAccent: 'Real Estate Agents.',
    intro: 'Respond to every lead in seconds, qualify buyers and sellers automatically, and keep your calendar full of showings — without living on your phone.',
    useCases: p([
      ['Instant lead response', 'Reply to website and portal inquiries within seconds, day or night.'],
      ['Lead qualification', 'Ask about budget, timeline, and location before passing leads to agents.'],
      ['Showing scheduling', 'Book showings directly into agents’ calendars, with reminders.'],
      ['Listing descriptions', 'Draft listing copy and social posts for agent review.'],
      ['Long-term nurture', 'Personalized follow-ups for leads who aren’t ready to move yet.'],
      ['AI receptionist', 'Answer property questions by phone and capture caller details.'],
    ]),
    flow: ['Buyer inquires about a listing', 'AI qualifies budget and timing', 'Showing booked with the agent'],
    note: 'Your team reviews client-facing content, and we configure AI tools with fair housing requirements in mind.',
    faqs: [
      { question: 'Can AI respond to leads from my website and listing portals?', answer: 'Often, depending on how leads reach you. We confirm the integration options during discovery.' },
      { question: 'Will it sound robotic?', answer: 'No — we tune the tone and scripts to match your brand, and you approve them before launch.' },
      { question: 'Do I need a CRM?', answer: 'It helps, but we can start with your current setup and recommend options as you grow.' },
    ],
    related: ['ai-receptionist', 'ai-lead-generation', 'social-media-automation'],
    metaTitle: 'AI for Real Estate Agents | Lead Response & Showing Scheduling',
    metaDescription: 'AI for real estate agents: instant lead response, buyer and seller qualification, showing scheduling, and listing descriptions — reviewed by your team.',
  },
  'e-commerce': {
    heroTitle: 'AI for', heroAccent: 'E-Commerce.',
    intro: 'Answer shopper questions instantly, recover abandoned carts, and keep product content fresh — so your store sells around the clock.',
    useCases: p([
      ['Order support', 'Answer order status and returns questions without tying up your team.'],
      ['Product Q&A', 'Help shoppers choose with instant answers about sizing, features, and shipping.'],
      ['Cart recovery', 'Send timely, personalized reminders to shoppers who left items behind.'],
      ['Product descriptions', 'Draft consistent, on-brand descriptions for review.'],
    ]),
    flow: ['Shopper asks about sizing', 'AI answers and suggests items', 'Order questions handed off if needed'],
    related: ['ai-chatbots', 'ai-marketing-automation', 'ai-content-creation'],
    metaTitle: 'AI for E-Commerce | Shopper Support & Cart Recovery',
    metaDescription: 'AI for e-commerce stores: instant shopper support, product Q&A, abandoned cart recovery, and on-brand product descriptions.',
  },
  'healthcare-administration': {
    heroTitle: 'AI for Healthcare', heroAccent: 'Administration.',
    intro: 'Streamline administrative workflows, appointment reminders, and routine nonclinical patient interactions so your front desk can focus on people.',
    useCases: p([
      ['Appointment reminders', 'Automated reminders and confirmations by text or phone.'],
      ['Intake forms', 'Collect and organize intake information before visits.'],
      ['Scheduling', 'Book and reschedule appointments around the clock.'],
      ['Front-desk questions', 'Answer hours, directions, and other routine nonclinical questions.'],
    ]),
    flow: ['Patient requests a new time', 'AI offers open slots', 'Front desk confirms the change'],
    note: 'We automate administrative, nonclinical tasks only. Clinical questions and decisions always stay with licensed professionals.',
    related: ['ai-receptionist', 'ai-voice-agents', 'ai-automation'],
    metaTitle: 'AI for Healthcare Administration | Scheduling & Reminders',
    metaDescription: 'AI for healthcare administration: appointment reminders, scheduling, intake forms, and routine nonclinical front-desk questions.',
  },
  'professional-services': {
    heroTitle: 'AI for', heroAccent: 'Professional Services.',
    intro: 'Spend less time on administration and more time on client work, with intake, scheduling, and paperwork handled automatically.',
    useCases: p([
      ['Client intake', 'Capture new client details and route them to the right person.'],
      ['Document preparation', 'Draft routine documents and summaries for your review.'],
      ['Meeting scheduling', 'Let clients book time without the back-and-forth.'],
      ['Billing reminders', 'Send polite, automatic invoice and payment reminders.'],
    ]),
    flow: ['New client fills in an intake form', 'AI organizes documents and details', 'Kickoff meeting scheduled'],
    related: ['ai-consulting', 'ai-automation', 'ai-receptionist'],
    metaTitle: 'AI for Professional Services Firms',
    metaDescription: 'AI for professional services firms: automated client intake, document preparation, scheduling, and billing reminders.',
  },
  'marketing-agencies': {
    heroTitle: 'AI for', heroAccent: 'Marketing Agencies.',
    intro: 'Automate client reporting and content production so your team can focus on strategy, creativity, and client relationships.',
    useCases: p([
      ['Client reporting', 'Pull data from channels and draft performance summaries automatically.'],
      ['Content drafts', 'Produce first drafts of posts, emails, and ads for review.'],
      ['Campaign operations', 'Automate repetitive setup, QA, and trafficking tasks.'],
      ['Social scheduling', 'Plan and schedule approved content across channels.'],
    ]),
    flow: ['Data pulled from ad and social channels', 'AI drafts the performance summary', 'Strategist reviews and sends'],
    related: ['ai-content-creation', 'social-media-automation', 'ai-marketing-automation'],
    metaTitle: 'AI for Marketing Agencies | Reporting & Content Automation',
    metaDescription: 'AI for marketing agencies: automated client reporting, content drafts, campaign operations, and social scheduling.',
  },
  'restaurants-hospitality': {
    heroTitle: 'AI for Restaurants', heroAccent: '& Hospitality.',
    intro: 'Handle bookings, phone orders, common questions, and review responses without pulling staff away from guests.',
    useCases: p([
      ['Reservations', 'Take and confirm bookings by phone or chat, any time.'],
      ['Phone orders', 'Capture orders accurately and send them to your team.'],
      ['Review responses', 'Draft thoughtful replies to reviews for your approval.'],
      ['Menu & hours questions', 'Answer the questions guests ask most, instantly.'],
    ]),
    flow: ['Guest calls to book a table', 'AI voice agent checks availability', 'Booking confirmed by text'],
    related: ['ai-receptionist', 'ai-voice-agents', 'social-media-automation'],
    metaTitle: 'AI for Restaurants & Hospitality | Reservations & Phone Orders',
    metaDescription: 'AI for restaurants and hospitality: reservations, phone orders, review response drafts, and instant answers to guest questions.',
  },
  retail: {
    heroTitle: 'AI for', heroAccent: 'Retail Businesses.',
    intro: 'Keep customers informed and operations moving with automated alerts, customer service, and promotions.',
    useCases: p([
      ['Stock alerts', 'Get notified before popular items run low.'],
      ['Customer service', 'Answer product, store, and order questions instantly.'],
      ['Promotions', 'Plan and send targeted promotions automatically.'],
      ['Loyalty follow-ups', 'Thank, reward, and re-engage repeat customers.'],
    ]),
    flow: ['Stock drops below your threshold', 'AI alerts the manager', 'Reorder draft prepared'],
    related: ['ai-chatbots', 'ai-marketing-automation', 'ai-dashboards'],
    metaTitle: 'AI for Retail Businesses',
    metaDescription: 'AI for retail businesses: stock alerts, customer service automation, targeted promotions, and loyalty follow-ups.',
  },
  'financial-services': {
    heroTitle: 'AI for', heroAccent: 'Financial Services.',
    intro: 'Streamline onboarding and routine client communication, with your qualified team reviewing every regulated decision.',
    useCases: p([
      ['Client onboarding', 'Guide new clients through onboarding steps automatically.'],
      ['Document collection', 'Request documents and check they are complete.'],
      ['Scheduling', 'Let clients book reviews and calls without back-and-forth.'],
      ['Routine inquiries', 'Answer common, non-advisory questions instantly.'],
    ]),
    flow: ['Client uploads documents', 'AI checks they are complete', 'Advisor reviews the file'],
    note: 'AI supports routine communication and paperwork. Regulated decisions and advice always remain with your qualified team.',
    related: ['ai-automation', 'ai-receptionist', 'ai-consulting'],
    metaTitle: 'AI for Financial Services Firms',
    metaDescription: 'AI for financial services firms: client onboarding, document collection, scheduling, and routine inquiries — with your team reviewing regulated decisions.',
  },
  education: {
    heroTitle: 'AI for', heroAccent: 'Education.',
    intro: 'Answer enrollment and program questions instantly and lighten the administrative load on your staff.',
    useCases: p([
      ['Enrollment inquiries', 'Answer program, fee, and deadline questions around the clock.'],
      ['Student support', 'Handle common student questions and route the rest.'],
      ['Reminders', 'Automate deadline, event, and payment reminders.'],
      ['Administrative workflows', 'Reduce manual data entry and paperwork.'],
    ]),
    flow: ['Prospective student asks about a program', 'AI answers and shares details', 'Admissions call booked'],
    related: ['ai-chatbots', 'ai-automation', 'ai-receptionist'],
    metaTitle: 'AI for Education | Enrollment & Student Support',
    metaDescription: 'AI for schools and training providers: enrollment inquiries, student support, reminders, and administrative automation.',
  },
  startups: {
    heroTitle: 'AI for', heroAccent: 'Startups.',
    intro: 'Build lean, automated operations from day one so you can scale without adding overhead.',
    useCases: p([
      ['Lead generation', 'Capture, qualify, and follow up with leads automatically.'],
      ['Support from launch', 'Answer customer questions before you have a support team.'],
      ['Internal operations', 'Automate the admin that slows small teams down.'],
      ['Investor updates', 'Compile metrics and draft regular updates.'],
    ]),
    flow: ['Lead signs up on your site', 'AI nurtures with follow-ups', 'Founder gets qualified demos'],
    related: ['custom-ai-solutions', 'ai-lead-generation', 'ai-automation'],
    metaTitle: 'AI for Startups | Automation from Day One',
    metaDescription: 'AI for startups: automated lead generation, customer support from launch, internal operations, and investor reporting.',
  },
}

export const DEFAULT_HOW = {
  heroTitle: 'How Our', heroAccent: 'AI Consulting', heroTitleEnd: 'Process Works',
  intro: 'A clear, four-step path from your first conversation to AI automation running in your business — with your team in control at every stage.',
  steps: [
    { title: 'Discover', text: 'We analyze your business challenges, goals, and automation opportunities.', duration: '', deliverables: ['Discovery call with an AI consultant', 'Workflow and tool audit', 'Shortlist of high-impact opportunities'] },
    { title: 'Strategize', text: 'We develop a customized AI implementation strategy tailored to your business.', duration: '', deliverables: ['Prioritized AI roadmap', 'Solution design and integrations plan', 'Clear proposal with scope and pricing'] },
    { title: 'Build & Integrate', text: 'We design, develop, and integrate intelligent automation solutions.', duration: '', deliverables: ['Build and configuration', 'Connections to your existing tools', 'Testing with real-world scenarios'] },
    { title: 'Optimize & Scale', text: 'We monitor performance and refine solutions as your business grows.', duration: '', deliverables: ['Team walkthrough and documentation', 'Performance monitoring', 'Ongoing improvements and new automations'] },
  ].map((s) => ({ ...s, deliverables: s.deliverables.map((text) => ({ text })) })),
  faqs: [
    { question: 'Do I need to prepare anything before the first call?', answer: 'No preparation is required. If you have a list of tools you use or tasks that take up time, bring it along — it helps us focus.' },
    { question: 'Is the consultation really free?', answer: 'Yes. The discovery call is free and comes with no obligation.' },
    { question: 'Can we start small?', answer: 'Yes. Many clients begin with a single, focused automation and expand once they see how it fits their business.' },
  ],
  metaTitle: 'How Our AI Consulting Process Works',
  metaDescription: 'How AI 742 works: discovery, strategy, build and integration, then optimization — a clear four-step AI consulting process for small businesses.',
}

export const DEFAULT_ABOUT = {
  heroTitle: 'An AI Automation Agency Built for', heroAccent: 'Small Businesses.',
  intro: 'AI 742 is an AI consulting agency for small businesses. We believe artificial intelligence should be practical, accessible, and transformative — not reserved for companies with research labs and endless budgets.',
  mission: 'To make advanced artificial intelligence accessible, affordable, and practical for growing businesses.',
  vision: 'To empower businesses to operate smarter through intelligent automation.',
  beliefs: p([
    ['Business before technology', 'We start with the problem worth solving, then choose the technology.'],
    ['Humans stay in the loop', 'AI handles the routine. Your people make the decisions that matter.'],
    ['Honest about limits', 'We tell you what AI can and can’t do for you — before you invest.'],
    ['Built to evolve', 'Systems designed to grow and adapt as your business and AI change.'],
  ]),
  storyTitle: 'Why 742?',
  story: '',
  storyMore: 'Our goal is to help businesses unlock the power of intelligent automation through innovative technology and customized solutions. From AI-powered customer interactions to advanced workflow automation, we help businesses simplify operations and prepare for a more intelligent future.',
  founderName: '',
  founderRole: 'Founder, AI 742',
  metaTitle: 'About AI 742 | AI Automation Agency for Small Businesses',
  metaDescription: 'AI 742 is an AI automation agency and AI consulting agency for small businesses in the US. Practical, honest AI — built around your business.',
}
