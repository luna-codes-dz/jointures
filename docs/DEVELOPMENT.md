# Development Guide

## Table of Contents
1. [Development Environment Setup](#development-environment-setup)
2. [Project Structure](#project-structure)
3. [Code Standards](#code-standards)
4. [Development Workflow](#development-workflow)
5. [Testing](#testing)
6. [Building and Distribution](#building-and-distribution)
7. [Contributing](#contributing)
8. [Troubleshooting](#troubleshooting)

## Development Environment Setup

### Prerequisites
- **Node.js**: Version 16.x or higher (LTS recommended)
- **npm**: Version 8.x or higher
- **Git**: For version control
- **Code Editor**: VS Code recommended with extensions:
  - JavaScript (ES6) code snippets
  - HTML CSS Support
  - Electron

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd jointures-sql

# Install dependencies
npm install

# Start development mode
npm start
```

### Development Dependencies
Consider adding these for enhanced development:

```bash
# Optional: Add development tools
npm install --save-dev nodemon          # Auto-restart on changes
npm install --save-dev electron-builder # For building distributables
npm install --save-dev eslint          # Code linting
npm install --save-dev prettier        # Code formatting
```

## Project Structure

### File Organization
```
jointures-sql/
├── main.js              # Electron main process entry point
├── index.html           # Application UI structure
├── renderer.js          # Client-side application logic
├── style.css           # Application styling
├── package.json        # Project configuration and dependencies
├── package-lock.json   # Dependency lock file
├── .gitignore          # Git ignore patterns
├── README.md           # Main project documentation
├── images/             # Static assets
│   └── sql_joins.jpg   # Reference diagram
└── docs/               # Detailed documentation
    ├── API.md          # API reference
    ├── ARCHITECTURE.md # Technical architecture
    ├── USER_GUIDE.md   # End-user documentation
    └── DEVELOPMENT.md  # This file
```

### Module Responsibilities

#### `main.js` - Main Process
- Application lifecycle management
- Window creation and configuration
- System integration (menus, notifications)

#### `renderer.js` - Renderer Process
- UI logic and state management
- Data manipulation and join computations
- Event handling and DOM manipulation

#### `index.html` - UI Structure
- Semantic HTML layout
- Component organization
- Accessibility markup

#### `style.css` - Presentation
- Visual design and layout
- Responsive behavior
- Dark theme implementation

## Code Standards

### JavaScript Style Guide

#### Variable Naming
```javascript
// Use camelCase for variables and functions
let tableData = [];
function computeJoin() {}

// Use PascalCase for constructors/classes
class TableManager {}

// Use UPPER_CASE for constants
const MAX_ROWS = 100;
const DEFAULT_JOIN_TYPE = 'inner';
```

#### Function Structure
```javascript
// Document functions with comments
/**
 * Computes join result between two tables
 * @param {string} type - Join type ('inner', 'left', etc.)
 * @param {Array} tableA - First table data
 * @param {Array} tableB - Second table data
 * @returns {Array} Join result
 */
function computeJoin(type, tableA, tableB) {
  // Implementation
}
```

#### Error Handling
```javascript
// Always validate inputs
function computeJoin(type, tableA, tableB) {
  if (!type || !Array.isArray(tableA) || !Array.isArray(tableB)) {
    console.error('Invalid parameters for computeJoin');
    return [];
  }
  // Rest of implementation
}
```

### HTML Standards

#### Semantic Structure
```html
<!-- Use semantic HTML elements -->
<main id="main-content">
  <section id="tables-section">
    <div class="table-container">
      <h3>Table A</h3>
      <!-- Table content -->
    </div>
  </section>
</main>
```

#### Accessibility
```html
<!-- Include ARIA labels where helpful -->
<button id="add-row-a" aria-label="Add new row to Table A">
  Ajouter une ligne
</button>

<!-- Use proper heading hierarchy -->
<h2>Types de jointures</h2>
<h3>Table A</h3>
```

### CSS Standards

#### Organization
```css
/* Organize by component */
/* === GLOBAL STYLES === */
body { /* ... */ }

/* === SIDEBAR COMPONENT === */
#sidebar { /* ... */ }
#sidebar h2 { /* ... */ }

/* === TABLE COMPONENT === */
.table-container { /* ... */ }
.table-container table { /* ... */ }
```

#### Responsive Design
```css
/* Use relative units */
.container {
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
}

/* Include media queries for responsiveness */
@media (max-width: 768px) {
  #container {
    flex-direction: column;
  }
}
```

## Development Workflow

### Adding New Features

#### 1. Planning
- Define feature requirements
- Identify affected components
- Plan data structure changes
- Consider UI/UX implications

#### 2. Implementation Order
1. **Data Layer**: Update data structures and validation
2. **Business Logic**: Implement core functionality
3. **UI Layer**: Add interface elements
4. **Integration**: Connect components
5. **Testing**: Verify functionality

#### 3. Example: Adding a New Join Type

```javascript
// Step 1: Add to configuration
const joinTypes = {
  // ... existing types
  'cross': {
    label: 'CROSS JOIN',
    sql: `SELECT A.id AS idA, A.nom AS nomA, B.id AS idB, B.nom AS nomB
FROM TableA A
CROSS JOIN TableB B;`
  }
};

// Step 2: Implement computation logic
function computeJoin(type, A, B) {
  switch (type) {
    // ... existing cases
    case 'cross':
      return A.flatMap(a => 
        B.map(b => ({ 
          idA: a.id, nomA: a.nom, 
          idB: b.id, nomB: b.nom 
        }))
      );
  }
}

// Step 3: Update Venn diagram rendering
function renderVenn() {
  switch (selectedJoin) {
    // ... existing cases
    case 'cross':
      // Both circles highlighted (all combinations)
      circleAFill = highlightColor;
      circleBFill = highlightColor;
      break;
  }
}

// Step 4: Add to HTML sidebar
<li data-type="cross">CROSS JOIN</li>
```

### Code Review Checklist

#### Functionality
- [ ] Feature works as intended
- [ ] Edge cases handled appropriately
- [ ] No breaking changes to existing features
- [ ] Performance impact acceptable

#### Code Quality
- [ ] Follows project coding standards
- [ ] Functions are properly documented
- [ ] No console errors or warnings
- [ ] Code is readable and maintainable

#### UI/UX
- [ ] Interface is intuitive
- [ ] Visual design is consistent
- [ ] Responsive behavior maintained
- [ ] Accessibility considerations addressed

## Testing

### Manual Testing

#### Basic Functionality
1. **Application Startup**
   - Application launches without errors
   - All UI components render correctly
   - Default data loads properly

2. **Join Operations**
   - Each join type produces expected results
   - Venn diagram updates correctly
   - SQL query displays appropriately

3. **Data Manipulation**
   - Cell editing works for both tables
   - Row addition/deletion functions
   - Reset button restores original data

4. **Edge Cases**
   - Empty tables
   - Single-row tables
   - Duplicate IDs
   - Non-numeric IDs

#### Cross-Platform Testing
- Test on Windows, macOS, and Linux
- Verify window sizing and layout
- Check for platform-specific issues

### Automated Testing Setup

#### Unit Testing with Jest
```bash
# Install Jest
npm install --save-dev jest

# Add test script to package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

#### Example Test Structure
```javascript
// tests/joins.test.js
const { computeJoin } = require('../renderer');

describe('computeJoin function', () => {
  const tableA = [
    { id: 1, nom: 'Alice' },
    { id: 2, nom: 'Bob' }
  ];
  
  const tableB = [
    { id: 2, nom: 'Bob' },
    { id: 3, nom: 'Charlie' }
  ];

  test('inner join returns matching records', () => {
    const result = computeJoin('inner', tableA, tableB);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });
});
```

### Performance Testing

#### Memory Usage
```javascript
// Monitor memory usage during development
function logMemoryUsage() {
  if (window.performance && window.performance.memory) {
    console.log('Memory usage:', {
      used: window.performance.memory.usedJSHeapSize,
      total: window.performance.memory.totalJSHeapSize,
      limit: window.performance.memory.jsHeapSizeLimit
    });
  }
}
```

#### Performance Benchmarks
- Application startup time: < 3 seconds
- Join computation: < 100ms for 100 rows
- UI updates: < 50ms response time

## Building and Distribution

### Development Build
```bash
# Standard development workflow
npm start
```

### Production Build Setup

#### Adding Electron Builder
```bash
npm install --save-dev electron-builder
```

#### Configure `package.json`
```json
{
  "scripts": {
    "build": "electron-builder",
    "build:win": "electron-builder --win",
    "build:mac": "electron-builder --mac",
    "build:linux": "electron-builder --linux"
  },
  "build": {
    "appId": "com.example.jointures-sql",
    "productName": "SQL Joins Visualizer",
    "directories": {
      "output": "dist"
    },
    "files": [
      "main.js",
      "index.html",
      "renderer.js",
      "style.css",
      "images/**/*"
    ]
  }
}
```

### Distribution
```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

## Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-join-type`
3. Make your changes following the code standards
4. Test thoroughly
5. Submit a pull request

### Contribution Guidelines

#### Code Contributions
- Follow existing code style and patterns
- Include appropriate documentation
- Test your changes thoroughly
- Update relevant documentation files

#### Documentation Contributions
- Keep documentation up-to-date with code changes
- Use clear, concise language
- Include examples where helpful
- Follow markdown formatting standards

#### Issue Reporting
- Use issue templates when available
- Provide clear reproduction steps
- Include environment information
- Suggest potential solutions if possible

### Review Process
1. **Automated Checks**: Linting and basic validation
2. **Manual Review**: Code quality and functionality
3. **Testing**: Verify changes work as expected
4. **Documentation**: Ensure docs are updated
5. **Merge**: Approved changes are merged

## Troubleshooting

### Common Development Issues

#### Electron Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Electron version compatibility
npm list electron
```

#### Hot Reload Setup
```bash
# Install nodemon for auto-restart
npm install --save-dev nodemon

# Update package.json script
{
  "scripts": {
    "dev": "nodemon --exec 'npm start'"
  }
}
```

#### Debugging Renderer Process
```javascript
// Enable Developer Tools in main.js
function createWindow() {
  const win = new BrowserWindow({
    // ... other options
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true  // Enable dev tools
    }
  });
  
  // Open dev tools automatically in development
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
}
```

### Performance Issues

#### Memory Leaks
- Check for global variable accumulation
- Ensure event listeners are properly removed
- Monitor DOM node creation/deletion

#### Slow Rendering
- Profile render functions with `console.time()`
- Consider virtual scrolling for large tables
- Optimize DOM manipulation patterns

### Environment Issues

#### Path Resolution
```javascript
// Use path.join for cross-platform compatibility
const path = require('path');
const imagePath = path.join(__dirname, 'images', 'diagram.png');
```

#### File Permissions
- Ensure read permissions on all project files
- Check write permissions for any generated files
- Verify executable permissions on scripts

### Getting Help

#### Resources
- **Electron Documentation**: https://www.electronjs.org/docs
- **Node.js Documentation**: https://nodejs.org/docs
- **MDN Web Docs**: https://developer.mozilla.org/

#### Community Support
- GitHub Issues for project-specific problems
- Stack Overflow for general development questions
- Electron Discord for framework-specific help