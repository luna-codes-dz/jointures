# Contributing to SQL Joins Visualizer

Thank you for your interest in contributing to the SQL Joins Visualizer! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions Welcome

- 🐛 **Bug Reports**: Help us identify and fix issues
- ✨ **Feature Requests**: Suggest new functionality
- 🔧 **Code Contributions**: Submit bug fixes or new features
- 📚 **Documentation**: Improve existing docs or add new ones
- 🌐 **Translations**: Help make the app accessible in more languages
- 🎨 **UI/UX Improvements**: Enhance the user experience

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/jointures-sql.git
   cd jointures-sql
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development**
   ```bash
   npm start
   ```

4. **Enable Developer Tools** (optional)
   
   Add this line to `main.js` for debugging:
   ```javascript
   win.webContents.openDevTools();
   ```

### Project Structure

```
jointures-sql/
├── main.js          # Electron main process
├── renderer.js      # Application logic and join algorithms
├── index.html       # UI structure
├── style.css        # Styling
├── package.json     # Dependencies and scripts
├── images/          # Assets
└── docs/            # Documentation
```

## 📝 Development Guidelines

### Code Style

- **JavaScript**: Use ES6+ features, prefer `const`/`let` over `var`
- **HTML**: Use semantic markup, proper indentation
- **CSS**: Follow BEM methodology, use CSS custom properties
- **Comments**: Write clear, concise comments for complex logic

### Naming Conventions

- **Variables**: camelCase (`selectedJoin`, `tableData`)
- **Functions**: camelCase (`renderVenn`, `computeJoin`)
- **Constants**: UPPER_SNAKE_CASE (`JOIN_TYPES`, `DEFAULT_COLOR`)
- **Files**: kebab-case (`style.css`, `main.js`)

### Join Algorithm Guidelines

When adding new join types:

1. **Add to `joinTypes` object** with label and SQL template
2. **Implement in `computeJoin()`** function with proper error handling
3. **Update Venn rendering** in `renderVenn()` if visual representation needed
4. **Add tests** to verify join logic correctness
5. **Update documentation** with new join type information

### UI/UX Guidelines

- **Accessibility**: Ensure keyboard navigation and screen reader compatibility
- **Responsive**: Test on different screen sizes (minimum 1024x768)
- **Performance**: Keep UI updates smooth, avoid blocking operations
- **Consistency**: Follow existing design patterns and color schemes

## 🐛 Bug Reports

### Before Submitting a Bug Report

1. **Check existing issues** to avoid duplicates
2. **Test with latest version** to ensure bug still exists
3. **Gather system information** (OS, Node.js version, Electron version)

### Bug Report Template

```markdown
**Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Windows 10, macOS 11.0, Ubuntu 20.04]
- Node.js version: [e.g., 16.14.0]
- Electron version: [e.g., 28.2.3]

**Additional Context**
Any other relevant information.
```

## ✨ Feature Requests

### Before Submitting a Feature Request

1. **Check existing issues** for similar requests
2. **Consider the scope** - does it fit the project's goals?
3. **Think about implementation** - provide detailed specifications

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Problem Solved**
What problem does this feature solve?

**Proposed Solution**
How do you envision this feature working?

**Alternative Solutions**
Any alternative approaches you've considered.

**Additional Context**
Mockups, examples, or other relevant information.
```

## 🔧 Pull Requests

### Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make Changes**
   - Write clean, documented code
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new join type visualization"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Guidelines

Use conventional commit format:

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code improvements
- `test:` adding tests
- `chore:` maintenance tasks

Examples:
- `feat: add CROSS JOIN support`
- `fix: resolve Venn diagram rendering issue`
- `docs: update API documentation`

### Pull Request Template

```markdown
**Description**
Brief description of changes.

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

**Testing**
- [ ] I have tested these changes locally
- [ ] All existing tests pass
- [ ] I have added tests for new functionality

**Screenshots**
If applicable, add screenshots of UI changes.

**Checklist**
- [ ] Code follows project style guidelines
- [ ] Documentation has been updated
- [ ] Changes work in both English and French versions
```

## 🧪 Testing

### Manual Testing

1. **Basic Functionality**
   - Test all join types
   - Verify table editing works
   - Check Venn diagram updates
   - Validate SQL query generation

2. **Edge Cases**
   - Empty tables
   - Duplicate IDs
   - Invalid input types
   - Large datasets

3. **UI Testing**
   - Different screen sizes
   - Keyboard navigation
   - Dark theme consistency

### Automated Testing (Future)

We're planning to add:
- Unit tests for join algorithms
- Integration tests for UI components
- Performance tests for large datasets

## 🌐 Internationalization

### Adding New Languages

1. **Create language files** in `i18n/` directory
2. **Update UI labels** in HTML and JavaScript
3. **Test right-to-left languages** if applicable
4. **Update documentation** with new language support

### Translation Guidelines

- Keep technical terms consistent
- Maintain UI element spacing
- Consider cultural context
- Provide context for translators

## 📚 Documentation

### Documentation Standards

- **README**: Keep user-focused, clear installation steps
- **API Docs**: Include code examples and parameter descriptions
- **Inline Comments**: Explain why, not what
- **Changelog**: Follow semantic versioning principles

### Documentation Updates

Always update documentation when:
- Adding new features
- Changing existing functionality
- Fixing bugs that affect user workflow
- Modifying installation or setup process

## 🎯 Project Goals

### Short-term Goals
- Improve performance for larger datasets
- Add data import/export functionality
- Enhance accessibility features
- Expand language support

### Long-term Vision
- Create web version for broader accessibility
- Add database connectivity options
- Develop advanced SQL query builder
- Build educational curriculum integration

## 📞 Getting Help

### Communication Channels

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions and ideas
- **Email**: Contact maintainers for security issues

### Code Review Process

1. **Automated Checks**: Ensure all CI checks pass
2. **Peer Review**: At least one maintainer review required
3. **Testing**: Manual testing of changes
4. **Documentation**: Verify docs are updated
5. **Merge**: Squash and merge to main branch

## 📜 Code of Conduct

### Our Standards

- **Be Respectful**: Treat all contributors with respect
- **Be Constructive**: Provide helpful feedback
- **Be Inclusive**: Welcome contributors from all backgrounds
- **Be Patient**: Remember everyone is learning

### Enforcement

Unacceptable behavior will not be tolerated. Report issues to project maintainers.

---

## 🙏 Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Project documentation

Thank you for helping make SQL Joins Visualizer better for everyone!