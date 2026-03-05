/* ============================================================
   Biz Builder Platform — Shared Data
   Loaded by: process.html, builds.html, skills.html,
              start.html, roadmap.html
   ============================================================ */

/* ----------------------------------------------------------
   PHASES — The 6-phase universal build framework
   ---------------------------------------------------------- */

const PHASES = [
  {
    id: 'concept',
    number: 1,
    name: 'Concept',
    color: 'phase-1',
    tagline: 'Define what this actually is.',
    deliverable: 'A clear written definition of the business — one-liner, mission, target customer.',
    effort: '1–2 days',
    tasks: [
      { id: 'c1', text: 'Write a one-sentence business description', desc: 'The simplest, clearest version of what you do and for whom. One sentence, no jargon. If you need two, you haven\'t found it yet.' },
      { id: 'c2', text: 'Define your target customer', desc: 'Who is the specific person who needs what you offer? Be concrete: their situation, their problem, what they\'ve already tried.' },
      { id: 'c3', text: 'Write your mission statement', desc: 'Why does this business exist beyond making money? What change does it create? 2–3 sentences. Should feel uncomfortable if it\'s just generic.' },
      { id: 'c4', text: 'Name the 3 problems you solve', desc: 'Every real business solves at least one specific problem. Name yours explicitly — this becomes your marketing.' },
      { id: 'c5', text: 'Decide: side income or primary income?', desc: 'This determines how fast to move, how much to invest, and which legal structure makes sense. Be honest with yourself.' }
    ]
  },
  {
    id: 'formation',
    number: 2,
    name: 'Formation',
    color: 'phase-2',
    tagline: 'Make it official.',
    deliverable: 'A legally registered business entity with an EIN and dedicated bank account.',
    effort: '1–2 weeks',
    tasks: [
      { id: 'f1', text: 'Choose your business structure', desc: 'Sole Proprietorship (simplest, no separation), LLC (liability protection, $50–200 to file), S-Corp (tax optimization at scale). Most solo founders start with LLC.' },
      { id: 'f2', text: 'Register your business name', desc: 'File a DBA ("doing business as") or form a legal entity with your state. Check for conflicts: Google search, state business registry, USPTO trademark database.' },
      { id: 'f3', text: 'Get an EIN from the IRS', desc: 'Employer Identification Number — free at IRS.gov, takes 5 minutes online. You need this to open a business bank account and to pay taxes properly.' },
      { id: 'f4', text: 'Open a dedicated business bank account', desc: 'Never mix business and personal money. Most banks require your EIN and formation documents. Chase, Mercury (online, no fees), or your local credit union.' },
      { id: 'f5', text: 'Research permits and licenses', desc: 'Varies by business type and location. Food service, contractors, healthcare providers, financial advisors — all have specific requirements. Check your state and city.' }
    ]
  },
  {
    id: 'identity',
    number: 3,
    name: 'Identity',
    color: 'phase-3',
    tagline: 'Build the brand.',
    deliverable: 'A complete, consistent brand identity: name, colors, typography, voice.',
    effort: '3–7 days',
    tasks: [
      { id: 'i1', text: 'Finalize your brand name', desc: 'Check three things before deciding: (1) Is the .com available? (2) Does a Google search show conflicts? (3) Is it on the USPTO trademark database? Simple and memorable beats clever.' },
      { id: 'i2', text: 'Define your color palette', desc: '2–3 colors maximum. A primary (your brand color), a neutral (backgrounds/surfaces), and an accent (highlights/CTAs). Use Coolors.co to build and test. Colors communicate before words do.' },
      { id: 'i3', text: 'Choose your typography direction', desc: 'Serif fonts (Cormorant, Playfair, Georgia) feel established, premium, craft-oriented. Sans-serif (DM Sans, Inter, Helvetica) feels modern, clean, tech-forward. Pick one heading + one body — and use them everywhere.' },
      { id: 'i4', text: 'Write your brand voice', desc: 'Pick 3 adjectives that describe how your brand communicates — not what it does, but how it speaks. "Warm, direct, expert." "Bold, simple, relentless." These guide every word you write going forward.' },
      { id: 'i5', text: 'Decide on your logo direction', desc: 'Three paths: (1) DIY with Canva — fine for starting. (2) Hire a designer — $100–500 for a solid one on Fiverr or 99designs. (3) Start with a wordmark — just your brand name in your brand font. Ship over perfect.' }
    ]
  },
  {
    id: 'digital',
    number: 4,
    name: 'Digital',
    color: 'phase-4',
    tagline: 'Get online.',
    deliverable: 'A live website with 5 core pages, domain, business email, and social handles.',
    effort: '1–3 weeks',
    tasks: [
      { id: 'd1', text: 'Register your domain name', desc: 'yourbrandname.com via Namecheap (~$12/year) or Google Domains. Get the .com. If it\'s taken, try .co or rethink the name — not .net or .biz.' },
      { id: 'd2', text: 'Set up a business email address', desc: 'hello@yourbusiness.com — never use a personal Gmail for business. Google Workspace ($6/mo) or Zoho Mail (free tier). This single step adds credibility.' },
      { id: 'd3', text: 'Build the 5 core website pages', desc: 'Home (who you are + CTA), About (your story + credibility), Services (what you offer + pricing), Portfolio/Gallery (proof of work), Contact/Book (how to hire you). Every business needs exactly these five.' },
      { id: 'd4', text: 'Claim your social media handles', desc: 'Instagram and TikTok at minimum. Claim the same handle across all platforms even if you\'re not posting yet — @yourbrand before someone else takes it.' },
      { id: 'd5', text: 'Set up Google Business Profile', desc: 'Free. Critical for local service businesses. Shows up in Google Maps searches. Add photos, hours, service areas, and collect reviews here. Takes 20 minutes to set up.' }
    ]
  },
  {
    id: 'operations',
    number: 5,
    name: 'Operations',
    color: 'phase-5',
    tagline: 'Build how it runs.',
    deliverable: 'A complete ops setup: services defined, pricing set, booking live, payment ready.',
    effort: '3–5 days',
    tasks: [
      { id: 'o1', text: 'Define your service or product menu', desc: 'Write out everything you offer, organized into categories. Each item needs a name and a one-sentence description. Fewer, clearer options convert better than long lists.' },
      { id: 'o2', text: 'Set your pricing', desc: 'Research 3–5 direct competitors. Price at or above market rate for your quality level. Underpricing signals low quality and attracts difficult clients. Know your cost, know your margin.' },
      { id: 'o3', text: 'Define how clients book or buy', desc: 'Options: contact form on your site, email intake, Calendly (appointments), Square/Stripe (products), or phone call. Match this to your business — not every business needs a booking app.' },
      { id: 'o4', text: 'Set up payment methods', desc: 'Minimum viable: Venmo + Zelle (instant, no fees). For credit cards: Square (in-person) or Stripe (online). For larger projects: invoice via Wave or FreshBooks. Be clear about your terms.' },
      { id: 'o5', text: 'Write your client process document', desc: 'One page: what happens from "new inquiry" to "project delivered and paid." This becomes your FAQ page, your onboarding email, and your ops bible. Everything lives here first.' }
    ]
  },
  {
    id: 'launch',
    number: 6,
    name: 'Launch & Grow',
    color: 'phase-6',
    tagline: 'Go live and build momentum.',
    deliverable: 'A live business with first clients, real testimonials, and a clear growth plan.',
    effort: 'Ongoing',
    tasks: [
      { id: 'l1', text: 'Soft launch to 10 people you know', desc: 'Before going public: serve 3–5 real clients, ideally at a discount or free, in exchange for honest feedback and photos of your work. Use this to fix what needs fixing before it\'s public.' },
      { id: 'l2', text: 'Collect your first 3 real testimonials', desc: 'After every job: send one follow-up message. "What did you like most? What would you tell a friend?" Use their exact words, with permission, on your website. Specificity beats praise.' },
      { id: 'l3', text: 'Build your portfolio or gallery', desc: 'Every project gets documented. Before/after shots work best. Consistent lighting, clean backgrounds. A phone on a tripod is enough. This is your most powerful sales tool.' },
      { id: 'l4', text: 'Set up a referral mechanism', desc: '"Tell a friend and get X." A discount, a priority slot, a bonus — whatever fits your business. Referrals are your highest-quality clients and cost you almost nothing.' },
      { id: 'l5', text: 'Identify your top 3 skill gaps', desc: 'Use the Skills Finder to surface what you need to learn or hire out. Prioritize skills that are directly blocking revenue — those go first.' }
    ]
  }
];

/* ----------------------------------------------------------
   CATEGORIES — 8 business types with extra tasks per phase
   ---------------------------------------------------------- */

const CATEGORIES = [
  {
    id: 'food-culinary',
    name: 'Food & Culinary',
    icon: '🍽️',
    description: 'Private chefs, catering, meal prep, personal chef services',
    example: 'DG Creations by Daniel German',
    extraTasks: {
      formation: [
        { id: 'fc-f1', text: 'Obtain food handler / food manager certification', desc: 'Required in most states before serving food professionally. ServSafe is the most recognized. Online course + proctored exam — typically $15–50.' },
        { id: 'fc-f2', text: 'Research catering and cottage food laws', desc: 'Laws vary dramatically by state. Some allow home kitchen production; others require a licensed commercial kitchen. Check your state\'s Department of Health.' }
      ],
      operations: [
        { id: 'fc-o1', text: 'Secure general liability insurance for food service', desc: 'Typically $500–1,500/year depending on volume. Essential before serving anyone professionally. One incident without coverage = potential financial ruin.' },
        { id: 'fc-o2', text: 'Develop your signature menu with seasonal rotation', desc: 'A chef without a defined menu is just a cook for hire. Define your culinary identity with 2–3 core experiences. Rotate seasonally to stay interesting and reduce cost.' }
      ]
    }
  },
  {
    id: 'craft-trade',
    name: 'Craft & Trade',
    icon: '✂️',
    description: 'Tailors, seamstresses, woodworkers, jewelers, artisans, makers',
    example: "Janie Bell's Alterations",
    extraTasks: {
      identity: [
        { id: 'ct-i1', text: 'Develop your portfolio photography style', desc: 'Your craft IS your brand. Consistent lighting, clean backgrounds, before/after shots. Natural light + a phone on a tripod is enough to get started. Consistency matters more than perfection.' }
      ],
      operations: [
        { id: 'ct-o1', text: 'Write a clear turnaround time policy', desc: 'How long does each job type take? What happens if you fall behind? Published turnaround times prevent the majority of client complaints and set the right expectations upfront.' },
        { id: 'ct-o2', text: 'Set up mail-in order logistics', desc: 'If you accept remote clients: define packaging instructions, who pays return shipping, your damage/loss policy, and turnaround time after receipt. Put all of this in writing.' }
      ]
    }
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    icon: '💼',
    description: 'Consultants, coaches, strategists, advisors, HR, recruiting',
    extraTasks: {
      formation: [
        { id: 'ps-f1', text: 'Draft a client services agreement template', desc: 'Defines scope of work, payment terms, revision limits, IP ownership, and termination clause. Use Bonsai or Honeybook as a starting point — customize from there.' }
      ],
      operations: [
        { id: 'ps-o1', text: 'Build your LinkedIn presence', desc: 'Professional services are sold on credibility. LinkedIn is where your clients vet you before responding to a cold outreach or referral. Complete profile + 3 posts per week minimum.' },
        { id: 'ps-o2', text: 'Draft a mutual NDA template', desc: 'Clients will share sensitive business information with you. A standard mutual NDA signals professionalism and protects both parties. DocuSign or PandaDoc for signatures.' }
      ]
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: '🎨',
    description: 'Photographers, designers, videographers, artists, illustrators',
    extraTasks: {
      formation: [
        { id: 'cr-f1', text: 'Add copyright notice to all original work', desc: 'Your work is protected by copyright the moment it\'s created — but a visible copyright notice and registration strengthens your legal position if someone steals it.' }
      ],
      operations: [
        { id: 'cr-o1', text: 'Create a client usage rights policy', desc: 'What can clients actually do with your work? Personal use only? Social media? Print? Commercial resale? Define usage tiers clearly in your contract — and price them differently.' },
        { id: 'cr-o2', text: 'Build a dedicated portfolio website', desc: 'Behance, Instagram, and Dribbble are not portfolios — they\'re discovery platforms. You need a site you control with curated, categorized work and a clear hire-me CTA.' }
      ]
    }
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    icon: '🏃',
    description: 'Personal trainers, yoga teachers, therapists, nutritionists, coaches',
    extraTasks: {
      formation: [
        { id: 'hw-f1', text: 'Display all credentials and certifications prominently', desc: 'People are trusting you with their physical or mental health. Every certification, license, and relevant training should be visible on your About page and all intake materials.' }
      ],
      operations: [
        { id: 'hw-o1', text: 'Create a client intake waiver form', desc: 'Health history, liability waiver, consent to treatment or training — required before any hands-on work or fitness program. Use Jotform or Typeform to build and collect digitally.' },
        { id: 'hw-o2', text: 'Research HIPAA obligations if handling health data', desc: 'If you\'re a licensed provider dealing with protected health information, HIPAA compliance is not optional. Even informal notes about client health can trigger obligations.' }
      ]
    }
  },
  {
    id: 'retail-products',
    name: 'Retail & Products',
    icon: '📦',
    description: 'E-commerce, Etsy shops, physical goods, merchandise, handmade products',
    extraTasks: {
      operations: [
        { id: 'rp-o1', text: 'Set up inventory tracking from day one', desc: 'A spreadsheet is fine to start. You need to know what you have, what\'s selling, what\'s sitting, and when to reorder. Don\'t run a product business by feel.' },
        { id: 'rp-o2', text: 'Write your shipping and return policies', desc: 'Post them before you sell your first item. "All sales final" is a legitimate policy — but you have to say so clearly. Vague policies lead to chargebacks and disputes.' },
        { id: 'rp-o3', text: 'Research sales tax nexus requirements', desc: 'If you ship across state lines, you may have sales tax collection obligations in states where you have "nexus." TaxJar can automate this. Talk to an accountant early.' }
      ]
    }
  },
  {
    id: 'nonprofit',
    name: 'Nonprofit',
    icon: '🤝',
    description: 'Community organizations, foundations, advocacy groups, charities',
    extraTasks: {
      formation: [
        { id: 'np-f1', text: 'Research 501(c)(3) application requirements', desc: 'IRS Form 1023 for most orgs, Form 1023-EZ if under $50k projected revenue. Process takes 3–12 months. Consider a nonprofit attorney for your first application.' },
        { id: 'np-f2', text: 'Establish a board of directors', desc: 'Required for nonprofit status. Minimum 3 members in most states. Define board roles, meeting cadence, voting rights, and fiduciary responsibilities in your bylaws.' }
      ],
      launch: [
        { id: 'np-l1', text: 'Research and apply for grant funding', desc: 'Foundation grants, government grants, corporate giving programs. Grant writing is a specialized skill — budget time to learn it or hire someone who already has it.' }
      ]
    }
  },
  {
    id: 'finance-consulting',
    name: 'Finance & Consulting',
    icon: '📊',
    description: 'Investment advisors, hedge funds, financial planners, analysts, wealth managers',
    extraTasks: {
      formation: [
        { id: 'fc2-f1', text: 'Research SEC and FINRA registration requirements', desc: 'Investment advisers managing over $100M register with the SEC; under $100M with your state. Operating without required registration carries serious legal risk. Research this before taking any client money.' },
        { id: 'fc2-f2', text: 'Determine required licensing and accreditation', desc: 'Series 65 (investment adviser), Series 7 (broker-dealer), Series 66 — know which licenses apply to your specific model. CFA, CFP designations add credibility. Get licensed before operating.' }
      ],
      operations: [
        { id: 'fc2-o1', text: 'Add all required financial disclaimers', desc: 'Every client communication, your website, your presentations — all need compliant disclosures. "Past performance does not guarantee future results" is the minimum. Work with a compliance attorney from day one.' }
      ]
    }
  }
];

/* ----------------------------------------------------------
   SKILLS — Universal + category-specific skill gaps
   ---------------------------------------------------------- */

const SKILLS = [
  // ── Universal (shown for all categories) ──
  { id: 's1', name: 'Business Writing', why: 'Everything you sell starts with words — service descriptions, proposals, emails, social posts. If you can\'t write clearly, you can\'t communicate value.', priority: 'critical', categories: 'all', howToGet: 'Book: "On Writing Well" by Zinsser / YouTube: "copywriting for small business" / Practice: rewrite your own service descriptions weekly' },
  { id: 's2', name: 'Basic Financial Literacy', why: 'If you can\'t read a profit/loss statement, you\'re running your business blind. Knowing your numbers is not optional — it\'s survival.', priority: 'critical', categories: 'all', howToGet: 'Book: "Profit First" by Michalowicz / Course: "Accounting & Finance Fundamentals" on Coursera / Tool: Wave (free accounting software)' },
  { id: 's3', name: 'Social Media Content Creation', why: 'Your online presence is your storefront window. People decide whether to trust you based on what they see — before they ever contact you.', priority: 'critical', categories: 'all', howToGet: 'Start posting 3×/week and review analytics monthly / YouTube: your platform\'s creator academy / Study 3 accounts in your industry doing it well' },
  { id: 's4', name: 'Website Management', why: 'You need to update prices, add photos, and edit copy without hiring someone every time. Your site is never "done."', priority: 'recommended', categories: 'all', howToGet: 'Learn your platform (Webflow, Squarespace, or HTML basics) / Spend 2 hours on YouTube for your specific platform before going live' },
  { id: 's5', name: 'Customer Communication & Follow-Up', why: 'How you respond to inquiries, handle problems, and follow up after delivery determines whether clients come back and refer others.', priority: 'recommended', categories: 'all', howToGet: 'Build 5 email templates: inquiry response, quote, confirmation, follow-up, testimonial ask / Book: "Never Lose a Customer Again" by Coleman' },

  // ── Food & Culinary ──
  { id: 's6', name: 'Food Safety & Sanitation', why: 'One food safety incident ends your business and potentially harms someone. Non-negotiable before you serve a single client.', priority: 'critical', categories: ['food-culinary'], howToGet: 'ServSafe Food Handler or Manager certification — online course + exam (~$15–40) / StateFoodSafety.com is another option' },
  { id: 's7', name: 'Menu Costing & Profitability', why: 'If you don\'t know exactly what each dish costs to make, you can\'t price profitably. Guessing here = guaranteed margin loss.', priority: 'critical', categories: ['food-culinary'], howToGet: 'Build a recipe costing spreadsheet (Google Sheets template) / YouTube: "menu costing for chefs" / Track every ingredient cost before setting any price' },
  { id: 's8', name: 'Food Photography', why: 'People eat with their eyes first — especially on social media and your website. Your food photography IS your marketing.', priority: 'recommended', categories: ['food-culinary'], howToGet: 'YouTube: "food photography with iPhone" — start there before buying any gear / Natural light + a clean background + consistent plating style is 80% of the battle' },

  // ── Craft & Trade ──
  { id: 's9', name: 'Product & Portfolio Photography', why: 'Your craft is your product. If it doesn\'t photograph well, it doesn\'t sell — no matter how good the actual work is.', priority: 'critical', categories: ['craft-trade'], howToGet: 'YouTube: "product photography at home" / Light box setup: ~$30–50 on Amazon / Study how top Etsy sellers in your category shoot their work' },
  { id: 's10', name: 'Materials & Inventory Management', why: 'Running out of supplies mid-project, or over-buying and tying up cash — both kill margin and damage client relationships.', priority: 'recommended', categories: ['craft-trade'], howToGet: 'Airtable free template or Google Sheets / Track materials in and out from your very first order — retroactive tracking is painful' },

  // ── Professional Services ──
  { id: 's11', name: 'Proposal & Scope Writing', why: 'Vague scope = scope creep = unpaid work. A strong proposal that clearly defines deliverables protects your time and your income.', priority: 'critical', categories: ['professional-services'], howToGet: 'Bonsai or Honeybook proposal templates / Book: "SPIN Selling" for structuring the discovery conversation before writing any proposal' },
  { id: 's12', name: 'LinkedIn & Thought Leadership', why: 'Professional services are bought based on perceived expertise. LinkedIn is where that expertise gets established before anyone calls you.', priority: 'critical', categories: ['professional-services'], howToGet: 'Post 3×/week: insights from client work (anonymized), frameworks you use, opinions on industry trends / Engage with 5 peers daily for 30 days to build initial reach' },

  // ── Creative ──
  { id: 's13', name: 'Client Brief Management', why: 'Most creative disputes come from a vague or missing brief. A structured intake process prevents 80% of revision wars.', priority: 'critical', categories: ['creative'], howToGet: 'Build a PDF or Typeform intake questionnaire / The Creative Brief template from HubSpot is a solid starting point / Review it with every client before starting' },
  { id: 's14', name: 'File Delivery & Asset Management', why: 'How you deliver final files — organized, on-brand, on-time — defines whether clients come back and refer others.', priority: 'recommended', categories: ['creative'], howToGet: 'Dropbox, Google Drive, or WeTransfer for delivery / Build a folder structure on day one and never deviate / Include a README in every delivered folder' },

  // ── Health & Wellness ──
  { id: 's15', name: 'Client Assessment & Individualized Programming', why: 'Every client has different fitness levels, injuries, and goals. A one-size-fits-all program gets people hurt and produces zero results.', priority: 'critical', categories: ['health-wellness'], howToGet: 'Your certification program should cover this — if it doesn\'t, look into NASM, ACE, or NSCA continuing education / Practice with a few willing friends before charging' },
  { id: 's16', name: 'Privacy & Compliance (HIPAA)', why: 'If you handle health data — even informally, even in notes — you may have legal privacy obligations. Getting this wrong has serious consequences.', priority: 'critical', categories: ['health-wellness'], howToGet: 'HHS.gov has free HIPAA training resources / Consult a healthcare attorney if you\'re unsure whether your services trigger HIPAA / Better to know early' },

  // ── Retail & Products ──
  { id: 's17', name: 'E-commerce Platform Operations', why: 'Shopify, Etsy, and Amazon each have their own algorithms, fee structures, and best practices. Guessing costs you sales.', priority: 'critical', categories: ['retail-products'], howToGet: 'Your platform\'s own seller university (Etsy Seller Handbook, Shopify Academy, Amazon Seller University) — free, thorough, platform-specific' },
  { id: 's18', name: 'Supply Chain & Vendor Management', why: 'Your sourcing — costs, lead times, backup suppliers — is your entire business model. One supplier failing can halt your operation entirely.', priority: 'critical', categories: ['retail-products'], howToGet: 'Alibaba, ThomasNet, or local wholesale directories / Always have at least 2 backup vendors for every critical material / Build relationships, not just transactions' },

  // ── Nonprofit ──
  { id: 's19', name: 'Grant Writing', why: 'Grants are free funding — but they\'re competitive, and the writing quality is often the deciding factor. This skill directly funds your mission.', priority: 'critical', categories: ['nonprofit'], howToGet: 'Book: "The Only Grant-Writing Book You\'ll Ever Need" by Browning / GrantStation (database + training) / Start with smaller foundation grants to build a track record' },
  { id: 's20', name: 'Donor Relationship Management', why: 'Donors who feel genuinely connected give again and tell others. Donors who feel like ATMs stop giving. The difference is in how you steward them.', priority: 'recommended', categories: ['nonprofit'], howToGet: 'CRM: Salesforce Nonprofit (free tier) or Bloomerang / Rule: personal thank-you within 48 hours of every gift / Annual impact report, even if it\'s 2 pages' },

  // ── Finance & Consulting ──
  { id: 's21', name: 'Regulatory & Compliance Knowledge', why: 'In financial services, operating outside regulations — even by accident — ends careers and triggers legal action. This is existential, not optional.', priority: 'critical', categories: ['finance-consulting'], howToGet: 'FINRA.org and SEC.gov have extensive free resources / Hire a compliance consultant before launching any client-facing service / Budget for ongoing compliance review' },
  { id: 's22', name: 'Financial Modeling', why: 'Clients pay you to translate complex data into clear decisions. The ability to build and explain a financial model is the core technical skill of this work.', priority: 'critical', categories: ['finance-consulting'], howToGet: 'Breaking Into Wall Street (BIWS) or Wall Street Prep / Practice with real public company 10-Ks / CFA curriculum covers the fundamentals comprehensively' }
];

/* ----------------------------------------------------------
   BUILDS — Featured derivative sites
   ---------------------------------------------------------- */

const BUILDS = [
  {
    id: 'dg-creations',
    name: 'DG Creations',
    founder: 'Daniel German',
    tagline: 'Private chef. Private dining. Every plate, a creation.',
    category: 'Food & Culinary',
    categoryId: 'food-culinary',
    description: 'Chef Daniel German — a Johnson & Wales University graduate with dual degrees in Culinary Arts and Culinary Nutrition — turned his private dining expertise into a full-service culinary brand. DG Creations now offers private dining experiences, bespoke catering, and personalized meal prep services.',
    whatWasBuilt: [
      'Full website — 7 pages (Home, About, Experiences, Menus, Catering, Meal Prep, Gallery)',
      'Hero carousel with real photography slots',
      'Menu system with video section under Menus',
      'Gallery page with masonry layout, filter tabs, and lightbox',
      'Catering and meal prep pages with transparent, market-rate pricing',
      'Inquiry form for booking private events'
    ],
    url: 'https://dg-creations.vercel.app',
    colorClass: 'gold'
  },
  {
    id: 'janie-bell',
    name: "Janie Bell's Alterations",
    founder: 'Janie Bell Daniels',
    tagline: 'Fifty years of perfect fit.',
    category: 'Craft & Trade',
    categoryId: 'craft-trade',
    description: 'Janie Bell is a 76-year-old master seamstress in Walterboro, SC who had been doing professional-quality alterations for decades — for nearly nothing. Biz Builder built the complete digital infrastructure: branding, market-rate pricing, a full website, and a multi-step booking form.',
    whatWasBuilt: [
      'Next.js website — 6 pages with mobile-first responsive design',
      'Market-rate pricing structure (researched against SC and national rates)',
      'Multi-step booking form with email integration',
      'Local drop-off + mail-in service flows clearly documented',
      'Google Fonts + custom Tailwind design system',
      'SEO metadata and OpenGraph configuration throughout'
    ],
    url: 'https://janie-bells.vercel.app',
    colorClass: 'blue'
  }
];

/* ----------------------------------------------------------
   Utility: get extra tasks for a category + phase
   ---------------------------------------------------------- */

function getExtraTasks(categoryId, phaseId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  if (!cat || !cat.extraTasks) return [];
  return cat.extraTasks[phaseId] || [];
}

/* ----------------------------------------------------------
   Utility: get all skills for a category (universal + specific)
   ---------------------------------------------------------- */

function getSkillsForCategory(categoryId) {
  return SKILLS.filter(s => s.categories === 'all' || (Array.isArray(s.categories) && s.categories.includes(categoryId)));
}
