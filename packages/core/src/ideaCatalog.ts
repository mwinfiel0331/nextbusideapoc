/**
 * Curated Business Idea Catalog (POC)
 * This catalog contains 30+ idea templates that can be filtered and personalized
 * based on user inputs.
 *
 * FUTURE AI INTEGRATION:
 * This catalog could be replaced with LLM-generated ideas from Claude, GPT, etc.
 * See docs/01-architecture.md for integration points.
 */

import { Idea } from './types';

const IDEA_TEMPLATES: Omit<Idea, 'id' | 'createdAt'>[] = [
  // Service-based ideas
  {
    title: 'Virtual Interior Design Consultant',
    summary: 'Offer remote interior design consultation for homeowners using 3D tools',
    targetCustomer: 'Homeowners aged 35-55 with $10K+ renovation budgets',
    stepsToStart: [
      'Learn design software (Canva, SketchUp)',
      'Build portfolio with before/afters',
      'Set up website and booking system',
      'Launch Instagram marketing campaign',
    ],
    costRange: { min: 500, max: 2000, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Fully remote - no geographic limits',
    tags: ['design', 'service', 'remote'],
    whyNowSignals: ['Post-pandemic home improvement boom', 'Remote work normalcy', 'DIY fatigue'],
  },
  {
    title: 'Social Media Management for Local Businesses',
    summary: 'Create and manage social media content for 5-10 local SMBs',
    targetCustomer: 'Small restaurants, salons, plumbers, local services',
    stepsToStart: [
      'Master Instagram, TikTok, LinkedIn content',
      'Create sample content calendars',
      'Network with 20 local business owners',
      'Land first 3 clients at reduced rate',
    ],
    costRange: { min: 200, max: 1000, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Highly local-focused; ideal for face-to-face B2B relationships',
    tags: ['marketing', 'service', 'local'],
    whyNowSignals: ['SMBs need social presence', 'Influencer economy growth', 'Content hungry platforms'],
  },
  {
    title: 'Pet Sitting & Dog Walking Network',
    summary: 'Coordinate pet services (walking, sitting, grooming) across your city',
    targetCustomer: 'Busy professionals, travelers with pets, pet owners aged 28-45',
    stepsToStart: [
      'Get pet CPR certified',
      'Build network of reliable sitters/walkers',
      'Create booking app (e.g., Calendly + payment)',
      'Launch on Rover, Care.com, and local Google ads',
    ],
    costRange: { min: 500, max: 3000, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Location-dependent; higher margins in affluent neighborhoods',
    tags: ['service', 'local', 'pets'],
    whyNowSignals: ['Pet industry growth', 'Gig economy maturity', 'Remote work = more pets'],
  },
  {
    title: 'Freelance Bookkeeper for Small Businesses',
    summary: 'Handle accounting and tax prep for 10-15 local SMBs',
    targetCustomer: 'Small service businesses, freelancers, e-commerce shops',
    stepsToStart: [
      'Get QuickBooks certification',
      'Learn tax basics for SMBs',
      'Network with accountants for referrals',
      'Offer free tax planning review to first 5 clients',
    ],
    costRange: { min: 300, max: 1500, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Can be fully remote or hybrid; tax season is peak demand',
    tags: ['finance', 'service', 'b2b'],
    whyNowSignals: ['SMBs need compliance help', 'DIY accounting is risky', 'Tax complexity increasing'],
  },
  {
    title: 'Professional Home Organizer',
    summary: 'Help clients declutter and organize homes, closets, kitchens',
    targetCustomer: 'Busy professionals, retirees, people moving',
    stepsToStart: [
      'Take organizing certification course',
      'Build before/after portfolio',
      'Launch Instagram content showing transformations',
      'Partner with real estate agents for referrals',
    ],
    costRange: { min: 500, max: 2000, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Local service; higher demand in metros',
    tags: ['service', 'local', 'home'],
    whyNowSignals: ['Minimalism trend', 'Remote work means more time at home', 'COVID organizing'],
  },
  {
    title: 'LinkedIn Personal Branding Coach',
    summary: 'Help professionals and executives build strong LinkedIn presence',
    targetCustomer: 'Mid-career professionals, job seekers, small business owners',
    stepsToStart: [
      'Master LinkedIn algorithm',
      'Create case studies of successful transformations',
      'Build group coaching program',
      'Launch webinars on LinkedIn strategy',
    ],
    costRange: { min: 200, max: 1000, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Fully remote; global audience possible',
    tags: ['coaching', 'career', 'remote'],
    whyNowSignals: ['LinkedIn adoption accelerating', 'Job market uncertainty', 'Personal branding importance'],
  },

  // Product-based ideas
  {
    title: 'Niche Dropshipping Store',
    summary: 'Create and market a dropshipped e-commerce store for a micro-niche',
    targetCustomer: 'Niche enthusiasts (e.g., meditation teachers, indie developers)',
    stepsToStart: [
      'Research trending niche with low competition',
      'Set up Shopify store',
      'Integrate Printful or Spocket for dropshipping',
      'Run TikTok and Pinterest ads to test demand',
    ],
    costRange: { min: 300, max: 2000, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Fully online; global reach',
    tags: ['ecommerce', 'product', 'online'],
    whyNowSignals: ['Niche market explosion', 'Viral marketing tools', 'Dropshipping suppliers maturing'],
  },
  {
    title: 'Etsy Shop for Handmade Goods',
    summary: 'Sell handmade crafts, jewelry, or home goods on Etsy',
    targetCustomer: 'Gift-givers, home decor enthusiasts, craft lovers',
    stepsToStart: [
      'Refine product design',
      'Produce first 50 units',
      'Set up Etsy shop with SEO-optimized listings',
      'Build email list for repeat customers',
    ],
    costRange: { min: 500, max: 3000, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Can ship globally; high touch',
    tags: ['craft', 'product', 'ecommerce'],
    whyNowSignals: ['Handmade goods premium', 'Etsy audience loyal', 'Work-from-home craft trend'],
  },
  {
    title: 'Candle or Soap Making Business',
    summary: 'Create and sell artisan candles or natural soaps',
    targetCustomer: 'Home decor enthusiasts, gift buyers, eco-conscious consumers',
    stepsToStart: [
      'Master candle/soap making recipes',
      'Source quality wax and fragrance',
      'Create 5-10 signature scents',
      'Sell at farmers markets, online, and to boutiques',
    ],
    costRange: { min: 300, max: 2000, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Can expand to wholesale; farmers markets are great channels',
    tags: ['craft', 'product', 'retail'],
    whyNowSignals: ['Sustainable products trend', 'Self-care market growth', 'Artisan premium'],
  },
  {
    title: 'Personalized Merchandise Store',
    summary: 'Sell personalized mugs, t-shirts, hoodies via print-on-demand',
    targetCustomer: 'Gift-givers, corporate bulk orders, niche communities',
    stepsToStart: [
      'Research trending designs and niches',
      'Set up Printful + Shopify integration',
      'Create designs that resonate with target audience',
      'Run micro-targeted ads on Facebook/Instagram',
    ],
    costRange: { min: 200, max: 1500, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Fully online; no inventory risk',
    tags: ['ecommerce', 'product', 'print-on-demand'],
    whyNowSignals: ['Print-on-demand quality improving', 'Personalization trend', 'Low barrier entry'],
  },

  // Digital products
  {
    title: 'Online Course Creator',
    summary: 'Create and sell an online course on a skill you know well',
    targetCustomer: 'Learners in your niche, career changers, skill developers',
    stepsToStart: [
      'Define course topic and learning outcomes',
      'Record 20-30 high-quality video lessons',
      'Build community (Discord, Slack)',
      'Launch on Udemy or Teachable with email marketing',
    ],
    costRange: { min: 300, max: 2000, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Fully remote; global reach',
    tags: ['digital', 'education', 'online'],
    whyNowSignals: ['Online learning normalized', 'Skill shortage markets', 'Asynchronous work trend'],
  },
  {
    title: 'Digital Template Shop',
    summary: 'Sell Notion templates, Canva designs, or Figma UI kits',
    targetCustomer: 'Small business owners, content creators, designers',
    stepsToStart: [
      'Design 5-10 templates in your tool (Notion/Canva/Figma)',
      'Set up Gumroad or SendOwl',
      'Write compelling sales pages',
      'Promote via Reddit, Twitter, niche communities',
    ],
    costRange: { min: 100, max: 500, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Fully online; zero fulfillment',
    tags: ['digital', 'design', 'productivity'],
    whyNowSignals: ['Template economy growing', 'Low-code tools adoption', 'Asynchronous work tools needed'],
  },
  {
    title: 'SaaS Tool for a Niche Market',
    summary: 'Build a web app solving a specific problem in an underserved niche',
    targetCustomer: 'Niche professionals who have specific workflow problems',
    stepsToStart: [
      'Interview 10+ people with the problem',
      'Build MVP with no-code or low-code (Bubble, FlutterFlow)',
      'Launch on Product Hunt',
      'Iterate based on feedback',
    ],
    costRange: { min: 1000, max: 5000, currency: 'USD' },
    complexity: 'HIGH',
    localViabilityNotes: 'Fully remote; requires technical depth',
    tags: ['digital', 'saas', 'software'],
    whyNowSignals: ['No-code tools enabling solopreneurs', 'Subscription economy growth', 'Niche SaaS success stories'],
  },
  {
    title: 'AI-Powered Tool or Bot',
    summary: 'Create a GPT wrapper, Slack bot, or Discord bot solving a niche problem',
    targetCustomer: 'Power users, developers, remote teams',
    stepsToStart: [
      'Identify a repetitive problem in your niche',
      'Build API-based bot (OpenAI, Claude, LLM)',
      'Deploy to Vercel or AWS Lambda',
      'Share on indie hacker forums and Product Hunt',
    ],
    costRange: { min: 200, max: 2000, currency: 'USD' },
    complexity: 'HIGH',
    localViabilityNotes: 'Fully remote; requires technical skills',
    tags: ['digital', 'ai', 'software'],
    whyNowSignals: ['LLM APIs mature', 'AI adoption accelerating', 'Automation demand'],
  },
  {
    title: 'Digital Marketing Agency (Micro)',
    summary: 'Offer SEO, content, or email marketing services to SMBs remotely',
    targetCustomer: 'Small e-commerce shops, local service businesses, creators',
    stepsToStart: [
      'Master one channel deeply (SEO or email or content)',
      'Create case study portfolio',
      'Develop repeatable process and templates',
      'Sell retainer packages at $500-2000/month',
    ],
    costRange: { min: 300, max: 1500, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Can be fully remote',
    tags: ['digital', 'marketing', 'service'],
    whyNowSignals: ['SMB digital transformation', 'Marketing skill gap', 'Subscription revenue model'],
  },

  // Additional hybrid and niche ideas
  {
    title: 'Virtual Assistant for Entrepreneurs',
    summary: 'Provide admin, scheduling, and operational support to busy founders',
    targetCustomer: 'Bootstrapped founders, solo entrepreneurs, small agency owners',
    stepsToStart: [
      'Get certified in business operations',
      'Use tools like Asana, Slack, Zapier to streamline',
      'Start with 3-5 clients at $500-1000/month each',
      'Systematize processes',
    ],
    costRange: { min: 300, max: 1000, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Fully remote',
    tags: ['service', 'business', 'remote'],
    whyNowSignals: ['Founder burnout common', 'VA rates competitive', 'Async work normalized'],
  },
  {
    title: 'Content Creation Agency',
    summary: 'Create TikTok, Instagram, or YouTube content for brands',
    targetCustomer: 'Mid-market e-commerce, personal brands, B2B SaaS',
    stepsToStart: [
      'Master one platform (TikTok or YouTube Shorts)',
      'Build portfolio of viral content',
      'Partner with micro-influencers',
      'Charge $2K-5K/month for content packages',
    ],
    costRange: { min: 500, max: 3000, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Fully remote; global reach',
    tags: ['content', 'marketing', 'service'],
    whyNowSignals: ['Short-form video dominance', 'Authenticity trend', 'Brand need for content'],
  },
  {
    title: 'Newsletter or Substack Writer',
    summary: 'Write a niche newsletter on your expertise and monetize via sponsorships',
    targetCustomer: 'Niche communities interested in your topic',
    stepsToStart: [
      'Choose a hyper-specific niche and angle',
      'Write 10 free issues to build credibility',
      'Grow to 1K-5K subscribers',
      'Monetize via sponsorships, ads, or paid tier',
    ],
    costRange: { min: 0, max: 500, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Fully online',
    tags: ['content', 'writing', 'online'],
    whyNowSignals: ['Newsletter monetization improving', 'Creator economy growth', 'Email ROI proven'],
  },
  {
    title: 'YouTube Channel / Faceless YouTube Business',
    summary: 'Start a faceless YouTube channel (animations, screen recordings, AI voiceover)',
    targetCustomer: 'People wanting passive income from video content',
    stepsToStart: [
      'Choose a profitable niche (finance, tech, gaming, productivity)',
      'Use AI voiceover, Canva animations, stock footage',
      'Upload 2-3 videos per week',
      'Monetize via YouTube Partner Program + affiliate links',
    ],
    costRange: { min: 100, max: 1000, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Fully remote; passive income potential',
    tags: ['content', 'video', 'online'],
    whyNowSignals: ['YouTube revenue stable', 'AI video tools lowering barrier', 'Short + long form hybrid'],
  },
  {
    title: 'Affiliate Marketing Niche Site',
    summary: 'Build SEO-optimized niche site with product reviews and affiliate links',
    targetCustomer: 'People researching before buying products',
    stepsToStart: [
      'Research low-competition, high-intent keywords',
      'Write 50+ SEO articles',
      'Build backlink profile',
      'Add affiliate links and monetize with ads',
    ],
    costRange: { min: 200, max: 1500, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Fully online; passive income after 6-12 months',
    tags: ['online', 'affiliate', 'content'],
    whyNowSignals: ['Affiliate marketing still effective', 'Content monetization options', 'Niche sites gaining traction'],
  },
  {
    title: 'Email Marketing Consultant',
    summary: 'Help businesses build and monetize email lists',
    targetCustomer: 'E-commerce brands, creators, SaaS companies',
    stepsToStart: [
      'Master email copy, segmentation, automation',
      'Build case studies showing revenue uplift',
      'Offer audit + strategy service',
      'Charge $2K-5K for implementation projects',
    ],
    costRange: { min: 200, max: 1000, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Fully remote',
    tags: ['marketing', 'service', 'b2b'],
    whyNowSignals: ['Email ROI proven', 'Businesses neglecting email', 'Marketing complexity growing'],
  },
  {
    title: 'Conversion Rate Optimization (CRO) Specialist',
    summary: 'Help e-commerce and SaaS companies improve their conversion rates',
    targetCustomer: 'E-commerce shops, SaaS companies, agencies',
    stepsToStart: [
      'Learn A/B testing, heatmaps, session recording',
      'Build portfolio of clients with 10%+ conversion gains',
      'Offer audit services and retainer optimization',
      'Charge $1500-5000/month for ongoing optimization',
    ],
    costRange: { min: 300, max: 1500, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Fully remote; high-ticket services',
    tags: ['marketing', 'service', 'b2b'],
    whyNowSignals: ['Conversion rates critical metric', 'Testing tools mature', 'Revenue focus for businesses'],
  },
  {
    title: 'Personal Finance Coach',
    summary: 'Help individuals with budgeting, debt payoff, and wealth building',
    targetCustomer: 'Millennials, young professionals, people in debt',
    stepsToStart: [
      'Get certified in financial planning',
      'Create debt payoff framework and templates',
      'Offer group workshops at libraries or community centers',
      'Scale to 1:1 coaching at $50-150/hour',
    ],
    costRange: { min: 200, max: 1000, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Can start local, expand remote',
    tags: ['coaching', 'finance', 'service'],
    whyNowSignals: ['Financial anxiety high', 'DIY budgeting tools popular', 'Coaching economy growth'],
  },
  {
    title: 'Fitness Coach / Online Trainer',
    summary: 'Offer personalized fitness coaching, meal plans, and accountability',
    targetCustomer: 'Busy professionals, fitness enthusiasts, people seeking transformation',
    stepsToStart: [
      'Get fitness certification (ACE, NASM, etc)',
      'Create signature workout system',
      'Use Fitbod or custom platform for programming',
      'Charge $99-299/month for group or 1:1 coaching',
    ],
    costRange: { min: 300, max: 1500, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Can be fully remote with online training',
    tags: ['coaching', 'fitness', 'health'],
    whyNowSignals: ['Fitness industry booming', 'Online training normalized', 'Health consciousness rising'],
  },
  {
    title: 'Niche Podcast + Sponsorships',
    summary: 'Launch a podcast in a growing niche and monetize via sponsorships',
    targetCustomer: 'Niche enthusiasts, professionals, learners in your field',
    stepsToStart: [
      'Define clear audience and episode format',
      'Release weekly episodes (30-60 min)',
      'Grow to 5K+ monthly downloads',
      'Pitch sponsorships to relevant companies',
    ],
    costRange: { min: 100, max: 1000, currency: 'USD' },
    complexity: 'MEDIUM',
    localViabilityNotes: 'Fully remote; global distribution',
    tags: ['content', 'audio', 'online'],
    whyNowSignals: ['Podcast sponsorship growing', 'Audio-first audiences expanding', 'Podcasters earning 6-figures'],
  },
  {
    title: 'B2B Sales Consultant',
    summary: 'Help SaaS companies and agencies improve their sales process',
    targetCustomer: 'SaaS founders, agency owners, consultants',
    stepsToStart: [
      'Master sales methodology (Sandler, Miller Heiman, etc)',
      'Build case studies showing revenue growth',
      'Offer sales audit and process optimization',
      'Charge $3K-10K for implementation',
    ],
    costRange: { min: 300, max: 1500, currency: 'USD' },
    complexity: 'HIGH',
    localViabilityNotes: 'Fully remote; high-touch B2B',
    tags: ['consulting', 'sales', 'b2b'],
    whyNowSignals: ['SaaS go-to-market critical', 'Sales skills gap', 'Revenue scaling challenges'],
  },
  {
    title: 'Marketplace Arbitrage Business',
    summary: 'Buy underpriced items from marketplaces and resell at profit',
    targetCustomer: 'Resellers, thrift flippers, niche collectors',
    stepsToStart: [
      'Scout items on Facebook Marketplace, thrift stores, estate sales',
      'List on Poshmark, Mercari, eBay, local groups',
      'Focus on specific category (vintage, designer, collectibles)',
      'Build reputation and scale operations',
    ],
    costRange: { min: 100, max: 2000, currency: 'USD' },
    complexity: 'LOW',
    localViabilityNotes: 'Local sourcing, can ship nationally',
    tags: ['ecommerce', 'retail', 'resale'],
    whyNowSignals: ['Resale market exploding', 'Sustainability consciousness', 'Secondhand premium'],
  },
];

export function getIdeaCatalog(): (Omit<Idea, 'id' | 'createdAt'>)[] {
  return IDEA_TEMPLATES;
}

export function filterIdeas(
  inputTags: string[],
  businessType?: string,
  count: number = 10
): (Omit<Idea, 'id' | 'createdAt'>)[] {
  let filtered = IDEA_TEMPLATES;

  // Filter by business type if provided
  if (businessType) {
    const typeToTagMap: Record<string, string[]> = {
      SERVICE: ['service'],
      PRODUCT: ['product'],
      DIGITAL: ['digital'],
    };

    const typeKeywords = typeToTagMap[businessType] || [];
    filtered = filtered.filter((idea) =>
      typeKeywords.some((keyword) => idea.tags.some((t) => t.toLowerCase().includes(keyword)))
    );
  }

  // Sort by relevance to input tags
  const scored = filtered.map((idea) => {
    const tagMatches = inputTags.filter((tag) =>
      idea.tags.some((t) => t.toLowerCase() === tag.toLowerCase()) ||
      idea.summary.toLowerCase().includes(tag.toLowerCase())
    ).length;
    return { idea, score: tagMatches };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, Math.min(count, scored.length)).map(({ idea }) => idea);
}
