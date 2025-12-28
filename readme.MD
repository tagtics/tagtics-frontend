# 🎯 Tagtics - Visual UI Feedback Platform

> **Capture precise UI feedback exactly where it matters. No guesswork, just actionable insights.**

[![Live Demo](https://img.shields.io/badge/tagtics.online-blueviolet?style=for-the-badge)](https://www.tagtics.online)
[![Documentation](https://img.shields.io/badge/Docs-tagtics.online%2Fdocs-blue?style=for-the-badge)](https://tagtics.online/docs)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)

---

## 🚀 Current Status: **Public Frontend Preview**

**Early Access Registration has ended.** Thank you for the overwhelming interest!

We have opened up the platform for **general public testing**. You can now access the dashboard to experience the frontend interface firsthand.

> **⚠️ Note:** The application currently runs with **dummy data**. The focus of this phase is to gather feedback on the **UI/UX feel**, responsiveness, and overall design before we connect the live backend.

### 🧪 We Want Your Feedback
Please test out the interface and let us know your thoughts:
- How does the navigation feel?
- Are the animations smooth?
- Is the layout intuitive?

👉 **[Test the App](https://www.tagtics.online)**

---

## 💡 What is Tagtics?

Tagtics is a **SaaS platform** that revolutionizes how developers collect user feedback. Instead of vague bug reports like *"the button doesn't work"*, users can:

1. **Click** on the feedback widget
2. **Select** the exact UI element they want to comment on
3. **Submit** precise feedback with context

Developers receive:
- ✅ Exact DOM element identifiers (class, ID, tag)
- ✅ AI-categorized feedback by priority
- ✅ Duplicate detection and aggregation

### 🎥 See It In Action

Visit the **[Interactive Demo Section](https://www.tagtics.online#demo-section)** or checkout the icon on bottom left on our landing page to try selecting elements and submitting feedback!

---

## ✨ Planned Features

### Phase 1: MVP (Current Development)
- [ ] Interactive demo preview
- [ ] Feedback widget (embeddable script)
- [ ] Admin dashboard for viewing feedback
- [ ] User authentication & project management

### Phase 2: Advanced Features
- [ ] AI-powered feedback summarization
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
- React 19 with TypeScript
- Zustand for Store
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



## 🚀 Getting Started (For Contributors)

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/tagtics/tagtics-frontend.git
cd tagtics-frontend

# Install dependencies
pnpm install

# Create .env file with your Supabase credentials
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run development server
pnpm run dev
```

### Build for Production

```bash
pnpm run build
pnpm run preview  # Test production build locally
```

---

## 📊 SEO & Performance

### Optimizations Implemented
- ✅ Comprehensive meta tags
- ✅ Semantic HTML5 structure
- ✅ robots.txt & sitemap.xml
- ✅ Lazy-loaded components
- ✅ Code splitting with React Router
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
- **LinkedIn:** [Tagtics Dev](https://www.linkedin.com/company/tagtics-dev)
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

**[Launch App →](https://www.tagtics.online)**

</div>