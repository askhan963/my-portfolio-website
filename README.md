# My Portfolio Website

Welcome to my personal portfolio website! This project showcases my skills, experience, projects, and more. I built it using modern web technologies, with a focus on creating an engaging, aesthetically pleasing, and responsive experience for visitors.

- **Live at:** [awaiskhanniazi.netlify.app](https://awaiskhanniazi.netlify.app/)
- **GitHub Repository:** [my-portfolio-website](https://github.com/askhan963/my-portfolio-website)

## 🌟 Overview

This portfolio website is a comprehensive showcase of my skills, projects, honors, experience, and more. The site features both a public-facing portfolio and a powerful admin panel for content management. Built with modern web technologies, it offers an interactive experience across all devices.

## ✨ Features

### 🎨 **Public Portfolio**
- **Responsive Design:** Works perfectly on all devices (desktop, tablet, mobile)
- **Modern UI/UX:** Clean, professional design with smooth animations
- **Dynamic Sections:**
  - **Profile:** Professional overview with contact information
  - **Skills:** Categorized skills with interactive animations
  - **Projects:** Showcase of key projects with live demos and GitHub links
  - **Honors & Awards:** Certifications and achievements with visual appeal
  - **Experience:** Detailed work history with company logos and descriptions
  - **Contact Form:** Direct communication with form validation
  - **CV Downloads:** Easy access to downloadable resumes

### 🔧 **Admin Panel**
- **Collapsible Sidebar:** Space-efficient navigation with smooth animations
- **Live Dashboard:** Real-time statistics and activity monitoring
- **Content Management:** Full CRUD operations for all portfolio sections
- **Image Upload:** Cloudinary integration for media management
- **Authentication:** Secure admin access with NextAuth.js
- **Toast Notifications:** User-friendly feedback for all actions
- **Responsive Design:** Works seamlessly on all screen sizes

## 🚀 Technologies Used

### **Frontend & Backend**
- **Next.js 15.5.3** - React framework with App Router
- **React 18** - Modern React with hooks and server components
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework

### **Database & Authentication**
- **MongoDB Atlas** - Cloud database for data storage
- **Prisma ORM** - Type-safe database access
- **NextAuth.js** - Authentication and session management
- **bcryptjs** - Password hashing for security

### **Media & Storage**
- **Cloudinary** - Image upload and optimization
- **Next.js Image** - Optimized image loading

### **UI/UX & Animations**
- **Framer Motion** - Smooth animations and transitions
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons
- **React Hot Toast** - Toast notifications

### **Development & Deployment**
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Netlify** - Live deployment and hosting

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account
- **Cloudinary** account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/askhan963/my-portfolio-website.git
   cd my-portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_FOLDER=portfolio
   ```

4. **Database Setup:**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

6. **Access Admin Panel:**
   Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
   - Email: `admin@askhan.com`
   - Password: `admin123`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel pages
│   │   ├── projects/      # Projects management
│   │   ├── honors/        # Honors management
│   │   └── experience/    # Experience management
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   ├── projects/         # Project components
│   ├── honors/           # Honor components
│   ├── experience/       # Experience components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
└── middleware.ts         # NextAuth middleware
```

## 🎯 Key Features

### **Modern Architecture**
- **Server Components** - Optimized performance with Next.js 15
- **Custom Hooks** - Reusable business logic
- **Type Safety** - 100% TypeScript coverage
- **Component Separation** - Clean UI and logic separation

### **Admin Panel Features**
- **Collapsible Sidebar** - Space-efficient navigation
- **Live Dashboard** - Real-time statistics and activity
- **CRUD Operations** - Full content management
- **Image Management** - Cloudinary integration
- **Toast Notifications** - User feedback system
- **Responsive Design** - Works on all devices

### **Performance Optimizations**
- **Image Optimization** - Next.js Image component
- **Lazy Loading** - Dynamic imports for heavy components
- **Bundle Analysis** - Webpack bundle analyzer
- **Caching** - Optimized cache headers

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile** (< 640px) - Touch-friendly interface
- **Tablet** (640px - 1024px) - Balanced layout
- **Desktop** (> 1024px) - Full feature set

## 🔒 Security Features

- **Authentication** - Secure admin access
- **Password Hashing** - bcryptjs encryption
- **Input Validation** - Zod schema validation
- **CSRF Protection** - NextAuth.js security
- **Environment Variables** - Secure configuration

## ✉️ Contact

If you'd like to get in touch, feel free to send a message through the contact form on the website or connect with me on social media:

- [LinkedIn](https://pk.linkedin.com/in/askhan963)
- [Twitter](https://twitter.com/as_khan963)
- [GitHub](https://github.com/askhan963)

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## ❤️ Acknowledgments

- **Icons**: [Heroicons](https://heroicons.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Headless UI](https://headlessui.com/)
- **Database**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Netlify](https://www.netlify.com/)

---

_Developed with ❤️ and ☕ by [Muhammad Awais Khan](https://github.com/askhan963)_