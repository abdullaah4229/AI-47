/**
 * Starting content. The seed script copies this into the database, and the site
 * falls back to it if the database is empty. After seeding, edit everything in /admin.
 */

export const DEFAULT_SERVICES = [
  { title: 'AI Business Automation', slug: 'ai-automation', icon: 'flow', summary: 'Eliminate repetitive tasks and streamline operations with intelligent AI-powered workflows.' },
  { title: 'AI Chatbots & Virtual Assistants', slug: 'ai-chatbots', icon: 'bot', summary: 'Deliver instant customer support and engage visitors around the clock with intelligent chatbots.' },
  { title: 'AI Voice Agents', slug: 'ai-voice-agents', icon: 'phone', summary: 'Automate customer calls, appointment scheduling, and routine phone interactions using AI voice agents.' },
  { title: 'Social Media Automation', slug: 'social-media-automation', icon: 'share', summary: 'Streamline content planning, publishing, and audience engagement with AI-powered tools.' },
  { title: 'AI Content Creation', slug: 'ai-content-creation', icon: 'spark', summary: 'Generate engaging text, images, videos, and creative assets using advanced AI technology.' },
  { title: 'AI Lead Generation', slug: 'ai-lead-generation', icon: 'target', summary: 'Discover, qualify, and nurture potential customers through intelligent automated systems.' },
  { title: 'AI-Powered Dashboards', slug: 'ai-dashboards', icon: 'chart', summary: 'Monitor business performance, workflows, and key metrics through intelligent dashboards.' },
  { title: 'Custom AI Solutions', slug: 'custom-ai-solutions', icon: 'cube', summary: 'Build tailored AI systems designed around your unique business challenges and goals.' },
  { title: 'AI Marketing Automation', slug: 'ai-marketing-automation', icon: 'mega', summary: 'Improve marketing efficiency with automated campaigns, customer journeys, and AI insights.' },
  { title: 'AI Consulting & Strategy', slug: 'ai-consulting', icon: 'compass', summary: 'Identify high-impact AI opportunities and develop practical strategies for implementation.' },
  { title: 'AI Receptionist', slug: 'ai-receptionist', icon: 'headset', summary: 'A 24/7 AI answering service that picks up every call, answers questions, and books appointments.', showOnHome: false },
]

export const DEFAULT_INDUSTRIES = [
  { name: 'Real Estate', slug: 'real-estate', icon: 'home', opportunities: 'Lead qualification · Follow-ups · Viewings', summary: 'Automate lead qualification, client follow-ups, appointment scheduling, and property inquiries.' },
  { name: 'E-Commerce', slug: 'e-commerce', icon: 'cart', opportunities: 'Order support · Cart recovery · Product Q&A', summary: 'Answer shopper questions instantly and recover abandoned carts with timely follow-ups.' },
  { name: 'Healthcare Administration', slug: 'healthcare-administration', icon: 'health', opportunities: 'Reminders · Intake · Scheduling', summary: 'Streamline administrative workflows, appointment reminders, and routine nonclinical customer interactions.' },
  { name: 'Professional Services', slug: 'professional-services', icon: 'brief', opportunities: 'Client intake · Documents · Billing reminders', summary: 'Spend less time on admin and more time on client work.' },
  { name: 'Marketing Agencies', slug: 'marketing-agencies', icon: 'mega', opportunities: 'Reporting · Content drafts · Campaign ops', summary: 'Automate client reporting and content production so your team can focus on strategy.' },
  { name: 'Restaurants & Hospitality', slug: 'restaurants-hospitality', icon: 'food', opportunities: 'Reservations · Reviews · Phone orders', summary: 'Handle bookings, common questions, and review responses without tying up staff.' },
  { name: 'Retail Businesses', slug: 'retail', icon: 'bag', opportunities: 'Stock alerts · Customer service · Promotions', summary: 'Keep customers informed and operations moving with automated alerts and support.' },
  { name: 'Financial Services', slug: 'financial-services', icon: 'bank', opportunities: 'Onboarding · Document collection · Scheduling', summary: 'Streamline onboarding and routine communication, with your team reviewing every regulated decision.' },
  { name: 'Education', slug: 'education', icon: 'grad', opportunities: 'Enrollment · Student support · Admin', summary: 'Answer common enrollment and program questions and lighten administrative load.' },
  { name: 'Startups', slug: 'startups', icon: 'rocket', opportunities: 'Lean ops · Lead gen · Automation from day one', summary: 'Build lean, automated operations early so you scale without adding overhead.' },
  { name: 'Law Firms', slug: 'law-firms', icon: 'scale', opportunities: 'After-hours intake · Scheduling · Documents', summary: 'Capture and qualify new client inquiries around the clock and take routine admin off your team’s plate.', showOnHome: false },
]

export const DEFAULT_FAQS = [
  ['What is AI automation?', 'AI automation uses artificial intelligence to handle repetitive, rules-based, or language-heavy tasks — like answering common questions, qualifying leads, or moving information between tools — so your team can focus on higher-value work.'],
  ['How can AI help my small business?', 'Common starting points include answering customer inquiries around the clock, following up with leads, scheduling appointments, drafting content, and connecting the tools you already use. We begin by finding where your team loses the most time.'],
  ['Do I need technical knowledge to use AI?', 'No. We design, build, and configure the solution, then walk your team through using it. Most day-to-day interaction happens in tools you already know.'],
  ['Can AI integrate with my existing tools?', 'Often, yes. Many CRMs, email platforms, calendars, and business apps offer integration options. We review your specific tools during discovery and confirm what is possible before we build.'],
  ['How long does AI implementation take?', 'It depends on scope. A focused automation can move quickly, while multi-system or custom projects take longer. You receive a timeline estimate once we understand your requirements.'],
  ['Can AI automate customer support?', 'AI can handle many routine questions, triage requests, and hand complex or sensitive conversations to a person. We recommend keeping a human in the loop wherever judgment is needed.'],
  ['Do you provide custom AI solutions?', 'Yes. Alongside proven automation patterns, we design tailored AI systems around your workflows, data, and goals.'],
  ['How much does AI automation cost?', 'Pricing depends on scope, complexity, and the integrations involved. After a free consultation, we provide a clear proposal for your specific project.'],
  ['Is my business data secure?', 'We follow security-conscious practices, such as limiting data access to what each workflow needs and working with reputable providers. We explain exactly how your data is handled during discovery so you can make an informed decision.'],
  ['How do I get started with AI 742?', 'Book a free consultation. We will learn about your business, identify automation opportunities, and recommend practical next steps — with no obligation.'],
].map(([question, answer]) => ({ question, answer }))

export const DEFAULT_HOME = {
  hero: {
    badge: 'AI Automation Agency & AI Consulting for Small Businesses',
    line1: 'Your Business.',
    line2: 'Powered by',
    line3: 'Artificial Intelligence.',
    phrases: [
      'answers customers 24/7',
      'qualifies every lead',
      'books your meetings',
      'follows up automatically',
      'writes on-brand content',
      'runs your busywork',
    ].map((text) => ({ text })),
    subheadline:
      'Transform the way you work with intelligent automation, AI-powered solutions, and next-generation technology designed to accelerate your business growth.',
    primaryLabel: 'Book Your Free AI Consultation',
    primaryHref: '/contact',
    secondaryLabel: 'Explore Our Solutions',
    secondaryHref: '/services',
  },
  trust: {
    title: 'Built for Businesses Ready to',
    accent: 'Grow Smarter.',
    intro: 'Every engagement is shaped around your operations, your tools, and the outcomes that matter to your business.',
    items: [
      { title: 'Tailored AI Solutions', text: 'Designed around your workflows, not a template.', icon: 'cube' },
      { title: 'Business-Focused Automation', text: 'Every build starts with a business outcome.', icon: 'target' },
      { title: 'Scalable Technology', text: 'Systems that grow as your business grows.', icon: 'layers' },
      { title: 'Secure Integrations', text: 'Connected carefully to the tools you trust.', icon: 'shield' },
      { title: 'Dedicated Consulting', text: 'A clear partner from strategy to launch.', icon: 'user' },
    ],
  },
  services: {
    title: 'Intelligent Solutions.',
    accent: 'Limitless Possibilities.',
    intro: 'Explore powerful AI solutions designed to automate operations, enhance productivity, and accelerate business growth.',
  },
  why: {
    title: 'Why Forward-Thinking Businesses Choose',
    accent: 'AI 742',
    intro: 'Technology is the tool. Your growth is the goal. We start with your business and work backwards to the right automation.',
    items: [
      { title: 'Business-First Approach', text: 'We focus on solving real business problems, not simply implementing technology.' },
      { title: 'Custom AI Solutions', text: 'Every solution is designed around your business needs, workflows, and goals.' },
      { title: 'Scalable Automation', text: 'Build intelligent systems that can evolve alongside your business.' },
      { title: 'Seamless Integrations', text: 'Connect AI automation with your existing business tools and workflows.' },
      { title: 'Innovation-Focused', text: 'Leverage modern AI technologies to stay competitive in a rapidly evolving market.' },
      { title: 'Practical AI Consulting', text: 'Turn complex AI possibilities into clear, actionable business solutions.' },
    ],
  },
  steps: {
    title: 'Your Journey to',
    accent: 'Intelligent Automation.',
    items: [
      { title: 'Discover', text: 'We analyze your business challenges, goals, and automation opportunities.' },
      { title: 'Strategize', text: 'We develop a customized AI implementation strategy tailored to your business.' },
      { title: 'Build & Integrate', text: 'We design, develop, and integrate intelligent automation solutions.' },
      { title: 'Optimize & Scale', text: 'We monitor performance and refine solutions as your business grows.' },
    ],
  },
  benefits: {
    title: 'Less Manual Work.',
    accent: 'More Business Growth.',
    items: [
      { title: 'Save Valuable Time', text: 'Reduce repetitive manual tasks through intelligent workflow automation.' },
      { title: 'Improve Productivity', text: 'Help your team focus on high-value activities instead of routine operations.' },
      { title: 'Enhance Customer Experience', text: 'Respond faster and deliver consistent customer interactions with AI assistance.' },
      { title: 'Scale More Efficiently', text: 'Build systems designed to support business growth without unnecessary complexity.' },
    ],
  },
  about: {
    title: 'Building the Future of',
    accent: 'Intelligent Business.',
    paragraphs: [
      'At AI 742, we believe artificial intelligence should be practical, accessible, and transformative.',
      'Our goal is to help businesses unlock the power of intelligent automation through innovative technology and customized solutions.',
      'From AI-powered customer interactions to advanced workflow automation, we help businesses simplify operations and prepare for a more intelligent future.',
    ].map((text) => ({ text })),
  },
  finalCta: {
    title: 'The Future of Your Business',
    accent: 'Starts Here.',
    text: 'Stop wasting time on repetitive work. Start building a smarter, more efficient business with AI 742.',
    buttonLabel: 'Let’s Build Your AI Future',
    buttonHref: '/contact',
  },
}
