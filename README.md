# LinkedIn Post Maker 🚀

A modern, interactive web application for creating beautiful LinkedIn posts with multiple themes, syntax highlighting for code snippets, and direct publishing to LinkedIn.

![LinkedIn Post Maker](public/demos/black-diamond.png)

## ✨ Features

- **🎨 Multiple Themes**: Choose from 6 beautiful pre-designed themes:

  - Black Coal
  - Black Diamond
  - Colourful Bubbles
  - Cornerstone
  - Gray Whisper
  - Midnight Sky

- **💻 Code Syntax Highlighting**: Support for multiple programming languages with beautiful syntax highlighting

- **📝 Rich Content Creation**:

  - Add titles, descriptions, and hashtags
  - Create multi-page posts with individual content blocks
  - Mix text content with code snippets

- **🔗 LinkedIn Integration**:

  - OAuth authentication with LinkedIn
  - Direct post publishing to LinkedIn
  - Image generation and upload

- **🖼️ Image Export**: Generate high-quality images of your posts for sharing

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: NextAuth.js with LinkedIn OAuth
- **State Management**: Zustand
- **Image Processing**: html2canvas
- **Markdown**: react-markdown with remark-gfm
- **Code Highlighting**: react-syntax-highlighter

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- LinkedIn Developer Account (for OAuth setup)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Chetan-KK/linkedin-post-maker.git
   cd linkedin-post-maker
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key
   LINKEDIN_CLIENT_ID=your-linkedin-client-id
   LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
   ```

4. **Configure LinkedIn OAuth**

   - Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
   - Create a new app
   - Add `http://localhost:3000/api/auth/callback/linkedin` to redirect URLs
   - Copy Client ID and Client Secret to your `.env.local`
   - Request access to "Sign In with LinkedIn using OpenID Connect" and "Share on LinkedIn" products

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Sign In**: Connect your LinkedIn account using OAuth
2. **Create Post**: Navigate to the post editor
3. **Choose Theme**: Select from available themes in the sidebar
4. **Add Content**:
   - Fill in title, description, and hashtags
   - Add content blocks with text and code
   - Use the live preview to see your post
5. **Publish**: Export as image or publish directly to LinkedIn

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── post-editor/       # Main post editor page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── themes/            # Theme-specific components
│   ├── ui/                # Reusable UI components
│   └── *.tsx              # Feature components
├── lib/                   # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   ├── types.ts           # TypeScript type definitions
│   └── *.ts               # Custom hooks and utilities
└── types/                 # Global type definitions
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🎨 Adding New Themes

Want to add a new theme? Here's how:

1. **Create theme directory**

   ```bash
   mkdir src/components/themes/your-theme-name
   ```

2. **Create required files**

   ```
   src/components/themes/your-theme-name/
   ├── your-theme-name-post.tsx    # Main theme component
   ├── post-first-page.tsx         # First page layout
   └── post-last-page.tsx          # Last page layout (optional)
   ```

3. **Implement theme components**

   - Follow the existing theme structure
   - Use consistent props interface (`PostData`)
   - Ensure responsive design
   - Add proper TypeScript types

4. **Add theme preview image**

   ```bash
   # Add demo image
   public/demos/your-theme-name.png

   # Add background image (if needed)
   public/backgrounds/your-theme-name.png
   ```

5. **Register theme**

   Update `src/lib/all-post-themes.tsx`:

   ```typescript
   import YourThemePost from "@/components/themes/your-theme-name/your-theme-name-post";

   export const AllPostThemes = [
     // ... existing themes
     {
       name: "your-theme-name",
       title: "Your Theme Name",
       component: YourThemePost,
       demoUrl: "/demos/your-theme-name.png",
     },
   ];
   ```

### 🐛 Bug Fixes & Features

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### 📝 Contribution Guidelines

- **Code Style**: Follow existing patterns and use Prettier for formatting
- **TypeScript**: Maintain strict typing throughout
- **Components**: Use functional components with hooks
- **Commits**: Write clear, descriptive commit messages
- **Testing**: Test your changes thoroughly before submitting
- **Documentation**: Update README if you add new features

### 🎯 Areas for Contribution

- **New Themes**: Create beautiful new post themes
- **UI/UX Improvements**: Enhance user experience
- **Performance**: Optimize image processing and rendering
- **Features**: Add new functionality like:
  - More export formats
  - Animation effects
  - Template presets
  - Collaboration features
- **Bug Fixes**: Help identify and fix issues
- **Documentation**: Improve docs and add tutorials

### 💡 Feature Ideas

- **Templates**: Pre-made post templates for different content types
- **Animations**: Subtle animations for theme transitions
- **Collaboration**: Share drafts with team members
- **Analytics**: Track post performance
- **Scheduling**: Schedule posts for later
- **AI Integration**: AI-powered content suggestions
- **More Platforms**: Support for other social platforms

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [LinkedIn API](https://docs.microsoft.com/en-us/linkedin/) for platform integration

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/Chetan-KK/linkedin-post-maker/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/Chetan-KK/linkedin-post-maker/discussions)
- 📧 **Contact**: [Your Email](mailto:your-email@example.com)

## 🌟 Star History

If you find this project helpful, please consider giving it a star! ⭐

---

Made with ❤️ by [Chetan-KK](https://github.com/Chetan-KK)
