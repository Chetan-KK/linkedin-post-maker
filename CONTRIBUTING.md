# Contributing to LinkedIn Post Maker 🤝

Thank you for your interest in contributing to LinkedIn Post Maker! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Types of Contributions](#types-of-contributions)
- [Pull Request Process](#pull-request-process)
- [Theme Development Guide](#theme-development-guide)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Community](#community)

## 📜 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful, inclusive, and constructive in all interactions.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/Chetan-KK/linkedin-post-maker.git
   cd linkedin-post-maker
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/Chetan-KK/linkedin-post-maker.git
   ```

## 🛠️ Development Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your LinkedIn OAuth credentials
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 📝 Contributing Guidelines

### Before You Start

- **Check existing issues** and pull requests to avoid duplicates
- **Create an issue** for significant changes to discuss the approach
- **Keep changes focused** - one feature/fix per pull request
- **Write clear commit messages** following conventional commit format

### Commit Message Format

We use conventional commits for clear and automated versioning:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(themes): add neon-glow theme
fix(auth): resolve LinkedIn OAuth redirect issue
docs(readme): update installation instructions
style(components): format code with prettier
```

## 🎨 Types of Contributions

### 1. New Themes

The most impactful way to contribute! See [Theme Development Guide](#theme-development-guide) below.

### 2. Bug Fixes

- Check the [issues](https://github.com/Chetan-KK/linkedin-post-maker/issues) for bugs
- Include steps to reproduce in your PR description
- Add tests if applicable

### 3. Feature Enhancements

- Propose new features in an issue first
- Consider backward compatibility
- Update documentation as needed

### 4. Documentation

- Fix typos and improve clarity
- Add examples and use cases
- Create tutorials or guides

### 5. Performance Improvements

- Optimize bundle size
- Improve image processing
- Enhance rendering performance

## 🔄 Pull Request Process

1. **Create a branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them:

   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

3. **Keep your branch updated**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

### PR Requirements

- [ ] Clear title and description
- [ ] Link to related issue (if applicable)
- [ ] Screenshots for UI changes
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] No breaking changes (or clearly marked)

## 🎨 Theme Development Guide

### Theme Structure

Each theme consists of multiple components:

```
src/components/themes/your-theme-name/
├── your-theme-name-post.tsx    # Main theme wrapper
├── post-first-page.tsx         # First page layout
└── post-last-page.tsx          # Last page layout (optional)
```

### Step-by-Step Theme Creation

#### 1. Create Theme Directory

```bash
mkdir src/components/themes/your-theme-name
```

#### 2. Create Main Theme Component

`src/components/themes/your-theme-name/your-theme-name-post.tsx`:

```tsx
import { PostData } from "@/lib/types";
import PostFirstPage from "./post-first-page";
import PostLastPage from "./post-last-page";

interface Props {
  postData: PostData;
}

const YourThemeNamePost = ({ postData }: Props) => {
  const hasMultiplePages = postData.content.length > 3; // Adjust as needed

  return (
    <div className="flex flex-col gap-4">
      <PostFirstPage postData={postData} />
      {hasMultiplePages && <PostLastPage postData={postData} />}
    </div>
  );
};

export default YourThemeNamePost;
```

#### 3. Create First Page Component

`src/components/themes/your-theme-name/post-first-page.tsx`:

```tsx
import { PostData } from "@/lib/types";
import ModificableText from "@/components/modificable-text";
import ModificableCodeBlock from "@/components/modificable-code-block";
import ModificableMarkdown from "@/components/modificable-markdown";

interface Props {
  postData: PostData;
}

const PostFirstPage = ({ postData }: Props) => {
  return (
    <div className="post-first-page relative w-[400px] h-[400px] p-6 overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <ModificableText
          text={postData.title}
          className="text-2xl font-bold text-white mb-4"
        />

        <ModificableMarkdown
          markdown={postData.description}
          className="text-white/90 mb-4 flex-1"
        />

        <div className="text-sm text-white/80">
          {postData.hashtags.slice(0, 5).map((tag, index) => (
            <span key={index} className="mr-2">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostFirstPage;
```

#### 4. Add Demo Image

Create a demo image showing your theme:

- Size: 400x400px or similar aspect ratio
- Save as: `public/demos/your-theme-name.png`
- Show the theme with sample content

#### 5. Register Theme

Update `src/lib/all-post-themes.tsx`:

```tsx
import YourThemeNamePost from "@/components/themes/your-theme-name/your-theme-name-post";

export const AllPostThemes = [
  // ... existing themes
  {
    name: "your-theme-name",
    title: "Your Theme Name",
    component: YourThemeNamePost,
    demoUrl: "/demos/your-theme-name.png",
  },
];
```

### Theme Best Practices

- **Responsive Design**: Ensure themes work on different screen sizes
- **Consistent Sizing**: Use standard dimensions (400x400px for square posts)
- **Typography**: Use clear, readable fonts with proper contrast
- **Color Schemes**: Consider both light and dark mode compatibility
- **Performance**: Optimize images and avoid heavy animations
- **Accessibility**: Ensure proper color contrast and text readability

### Theme Guidelines

- **Content Overflow**: Handle long text gracefully
- **Image Quality**: Use high-quality background images (if any)
- **Brand Safe**: Avoid copyrighted content or controversial imagery
- **Professional Look**: Maintain a professional appearance suitable for LinkedIn
- **Cross-browser**: Test on different browsers

## 🎨 Code Style Guidelines

### TypeScript

- Use strict TypeScript with proper typing
- Avoid `any` type unless absolutely necessary
- Create interfaces for props and data structures

### React Components

- Use functional components with hooks
- Follow single responsibility principle
- Use proper prop destructuring
- Implement proper error boundaries where needed

### Styling

- Use Tailwind CSS for styling
- Follow consistent spacing and sizing patterns
- Use CSS variables for theme-related colors
- Maintain responsive design principles

### File Organization

- Use descriptive file and folder names
- Keep related files together
- Follow the existing project structure
- Export components properly

### Code Formatting

We use Prettier for code formatting. Run before committing:

```bash
npm run format
```

## 🧪 Testing

### Manual Testing

- Test your changes in different browsers
- Verify responsive design on mobile devices
- Test with different content lengths
- Check theme switching functionality

### Automated Testing

```bash
npm run lint    # Check for linting errors
npm run build   # Ensure project builds successfully
```

## 💬 Community

### Getting Help

- 📖 **Documentation**: Check the README and this guide
- 🐛 **Issues**: Search existing issues or create a new one
- 💬 **Discussions**: Use GitHub Discussions for questions
- 📧 **Email**: Contact maintainers for sensitive issues

### Communication Guidelines

- Be respectful and constructive
- Provide clear, detailed descriptions
- Include relevant code snippets or screenshots
- Follow up on your contributions

## 🎯 Priority Areas

We especially welcome contributions in these areas:

1. **New Themes** - Always in high demand!
2. **Performance Improvements** - Image processing optimization
3. **Accessibility** - Making the app more accessible
4. **Mobile Experience** - Responsive design improvements
5. **Documentation** - Tutorials, examples, and guides
6. **Internationalization** - Multi-language support
7. **Testing** - Unit and integration tests

## 🏆 Recognition

Contributors will be:

- Listed in the README acknowledgments
- Credited in theme documentation
- Given recognition in release notes
- Considered for maintainer roles (regular contributors)

## 📄 License

By contributing to LinkedIn Post Maker, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to LinkedIn Post Maker! 🚀
