# 🎯 Tagtics - Visual UI Feedback Platform

> **Capture precise UI feedback exactly where it matters. No guesswork, just actionable insights.**

[![Live Demo](https://img.shields.io/badge/🚀_Early_Access-tagtics.online-blueviolet?style=for-the-badge)](https://www.tagtics.online)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)

---

## 🚀 Current Status: **Early Access Registration**

**Tagtics is currently in development!** The landing page at [tagtics.online](https://www.tagtics.online) is live and accepting early access registrations.

### 🎁 Early Access Benefits
- **3 Months Pro Free** (Worth $57)
- **AI-Powered Feedback Summarization**
- **Priority Support & Feature Requests**
- **Limited to First 50 Users**

👉 **[Join the Waitlist Now](https://www.tagtics.online#early-access)**

---

## 💡 What is Tagtics?

Tagtics is a **SaaS platform** that revolutionizes how developers collect user feedback. Instead of vague bug reports like *"the button doesn't work"*, users can:

1. **Click** on the feedback widget
2. **Select** the exact UI element they want to comment on
3. **Submit** precise feedback with context

Developers receive:
- ✅ Exact DOM element identifiers (class, ID, tag)
- ✅ Screenshots with highlighted elements
- ✅ AI-categorized feedback by priority
- ✅ Duplicate detection and aggregation

### 🎥 See It In Action

Visit the **[Interactive Demo Section](https://www.tagtics.online#demo-section)** on our landing page to try selecting elements and submitting feedback!

---

## ✨ Planned Features

### Phase 1: MVP (Current Development)
- [x] Landing page with early access registration
- [x] Interactive demo preview
- [ ] Feedback widget (embeddable script)
- [ ] Admin dashboard for viewing feedback
- [ ] User authentication & project management

### Phase 2: Advanced Features
- [ ] AI-powered feedback summarization
- [ ] Screenshot capture with annotations
- [ ] Team collaboration tools
- [ ] Webhook integrations (Slack, Discord, Jira)
- [ ] Analytics & trend detection

### Phase 3: Enterprise
- [ ] Custom branding for widgets
- [ ] SSO integration
- [ ] Advanced RBAC (Role-Based Access Control)
- [ ] On-premise deployment option

---

## 🛠️ Tech Stack

**Frontend (Landing Page):**
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide Icons for UI elements
- AOS (Animate On Scroll) for smooth animations
- React Router for navigation

**Backend:**
- Supabase (PostgreSQL + Authentication)
- Row-Level Security (RLS) policies for data isolation
- Edge Functions (planned) for AI processing

**Deployment:**
- Vercel (Frontend)
- Supabase Cloud (Backend)

**Performance:**
- 🚀 95+ Lighthouse Performance Score
- ♿ WCAG 2.1 AA Accessibility Compliant
- 📱 Fully Responsive Design

---

## 📂 Project Structure

```
tagtics/
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── DemoPreview.tsx          # Interactive demo
│   │   │   ├── HowItWorksSection.tsx
│   │   │   └── EarlyAccessSection.tsx   # Registration form
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Dashboard.tsx (coming soon)
│   ├── services/
│   │   └── EarlyAccess.service.ts   # Supabase API calls
│   ├── utils/
│   │   └── LoadingFallback.tsx
│   ├── AppRouter.tsx
│   └── main.tsx
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── tagtics.svg
└── package.json
```

---

## 🎨 Key Components

### 1. **DemoPreview Component**
An interactive mockup showing how Tagtics works:
- Users click the feedback icon
- Select UI elements (buttons, cards, headers)
- Submit feedback via a form
- Guided tooltips walk users through the process

### 2. **EarlyAccessSection Component**
Features:
- Email validation & rate limiting
- Real-time form error handling
- Success/error toast notifications
- Integration with Supabase for user storage

### 3. **HowItWorksSection Component**
- Auto-playing carousel explaining the 3-step process
- AI analysis visualization with mock progress bars
- Responsive design for mobile/tablet/desktop

---

## 🚀 Getting Started (For Contributors)

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tagtics.git
cd tagtics

# Install dependencies
npm install

# Create .env file with your Supabase credentials
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

---

## 📊 SEO & Performance

### Optimizations Implemented
- ✅ Comprehensive meta tags (Open Graph, Twitter Cards)
- ✅ Semantic HTML5 structure
- ✅ robots.txt & sitemap.xml
- ✅ Lazy-loaded components
- ✅ Code splitting with React Router
- ✅ Optimized images and fonts
- ✅ Structured data (Schema.org)

### Lighthouse Scores (Desktop)
- **Performance:** 96/100
- **Accessibility:** 98/100
- **Best Practices:** 100/100
- **SEO:** 100/100

---

## 🔐 Security Features

- **Row-Level Security (RLS)** in Supabase ensures users only access their own data
- **Rate limiting** on early access registration (prevents spam)
- **Email validation** both client-side and server-side
- **XSS protection** via React's built-in escaping
- **CORS configuration** restricts API access to authorized domains

---

## 📈 Roadmap

| Quarter | Milestone |
|---------|-----------|
| **Q1 2025** | ✅ Landing page live<br>✅ Early access registration<br>⏳ Feedback widget development |
| **Q2 2025** | ⏳ Admin dashboard MVP<br>⏳ Screenshot capture<br>⏳ Beta launch |
| **Q3 2025** | ⏳ AI summarization<br>⏳ Team features<br>⏳ Public launch |
| **Q4 2025** | ⏳ Enterprise features<br>⏳ Integrations (Slack, Jira) |

---

## 🤝 Contributing

While Tagtics is currently in private development, I welcome feedback and suggestions!

**Want to contribute?**
1. Open an issue with your idea
2. Fork the repo and create a pull request
3. Reach out via [email/Twitter/LinkedIn]

---

## 📞 Contact & Links

- **Website:** [tagtics.online](https://www.tagtics.online)
- **Twitter/X:** [@tagticsdev](https://x.com/tagticsdev)
- **LinkedIn:** [Tagtics Dev](https://linkedin.com/in/tagtics-dev-111b7b385)
- **GitHub:** [github.com/tagtics](https://github.com/tagtics)

---

## 📝 License

This project is proprietary software. All rights reserved.

For licensing inquiries, please contact: [tagtics-dev@tagtics.online]

---

## 🙏 Acknowledgments

Built with ❤️ using:
- [React](https://reactjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [AOS Library](https://michalsnik.github.io/aos/)

---

<div align="center">

**⭐ Star this repo if you're excited about Tagtics!**

[![Star on GitHub](https://img.shields.io/github/stars/tagtics/tagtics?style=social)](https://github.com/tagtics/tagtics)

**[Join Early Access →](https://www.tagtics.online#early-access)**

</div>