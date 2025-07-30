# Developer Guide

## Getting Started

This guide provides comprehensive information for developers working on the SQL Joins Visualizer project. Whether you're contributing to the project or using it as a learning resource, this guide will help you understand the codebase and development workflow.

## Development Environment Setup

### Prerequisites

1. **Node.js** (version 16.0 or higher)
   ```bash
   # Check your version
   node --version
   npm --version
   ```

2. **Git** for version control
   ```bash
   git --version
   ```

3. **Code Editor** (VS Code recommended with extensions):
   - Electron snippets
   - JavaScript (ES6) code snippets
   - HTML CSS Support
   - Prettier - Code formatter

### Project Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd jointures-sql
   npm install
   ```

2. **Verify Installation**
   ```bash
   npm start
   ```

3. **Enable Development Mode**
   
   Edit `main.js` to add developer tools:
   ```javascript
   function createWindow() {
     const win = new BrowserWindow({
       // ... existing configuration
     });
     
     // Add this line for development
     win.webContents.openDevTools();
     
     win.loadFile('index.html');
   }
   ```

## Project Structure Deep Dive

```
jointures-sql/
├── main.js                    # Electron main process entry point
├── renderer.js                # Application logic and join algorithms
├── index.html                 # UI structure and layout
├── style.css                  # Styling and themes
├── package.json               # Project configuration and dependencies
├── package-lock.json          # Dependency lock file
├── .gitignore                # Git ignore patterns
├── images/                    # Static assets
│   └── sql_joins.jpg         # Join types diagram
├── README.md                  # Main project documentation
├── API.md                     # API reference documentation
├── CHANGELOG.md               # Version history
├── CONTRIBUTING.md            # Contribution guidelines
├── ARCHITECTURE.md            # Technical architecture docs
└── DEVELOPER_GUIDE.md         # This file
```

## Core Development Concepts

### Application Lifecycle

1. **Initialization**
   - Electron app starts and creates browser window
   - `index.html` loads with initial UI structure
   - `renderer.js` executes and sets up initial state
   - Event listeners are bound to UI elements

2. **User Interaction**
   - User interacts with UI (clicks, edits, etc.)
   - Event handlers capture interactions
   - Data state is updated
   - UI is re-rendered to reflect changes

3. **Data Flow**
   ```
   User Input → Event Handler → Data Update → Join Computation → UI Update
   ```

### Key Data Structures

#### Table Data Format
```javascript
// Each table is an array of objects
const table = [
  { id: 1, nom: "Alice" },    // id: number, nom: string
  { id: 2, nom: "Bob" },
  { id: 3, nom: "Charlie" }
];
```

#### Join Configuration
```javascript
const joinTypes = {
  'join-key': {
    label: 'Display Name',      // Shown in UI
    sql: 'SQL Template'         // SQL query string
  }
};
```

#### Result Format
```javascript
// Join results vary by type but generally follow:
const result = [
  { id: number, nomA: string|null, nomB: string|null },
  // ... more rows
];
```

## Understanding the Join Engine

### Join Algorithm Implementations

#### 1. INNER JOIN Implementation
```javascript
case 'inner':
  return A.filter(a => B.some(b => b.id === a.id)).map(a => {
    const b = B.find(b => b.id === a.id);
    return { id: a.id, nomA: a.nom, nomB: b.nom };
  });
```

**How it works:**
1. Filter table A to only rows that have matching IDs in table B
2. For each matching row, find the corresponding row in table B
3. Create result object with data from both tables

#### 2. LEFT JOIN Implementation
```javascript
case 'left':
  return A.map(a => {
    const b = B.find(b => b.id === a.id);
    return { id: a.id, nomA: a.nom, nomB: b ? b.nom : null };
  });
```

**How it works:**
1. Process every row in table A
2. Try to find matching row in table B
3. If match found, include B data; otherwise use null

#### 3. FULL OUTER JOIN Implementation
```javascript
case 'full': {
  const ids = Array.from(new Set([...A.map(a => a.id), ...B.map(b => b.id)]));
  return ids.map(id => {
    const a = A.find(a => a.id === id);
    const b = B.find(b => b.id === id);
    return { id, nomA: a ? a.nom : null, nomB: b ? b.nom : null };
  });
}
```

**How it works:**
1. Create set of all unique IDs from both tables
2. For each ID, try to find records in both tables
3. Include data from whichever table(s) contain the ID

### Performance Considerations

**Current Algorithm Complexity:**
- Most joins: O(n × m) where n and m are table sizes
- Uses Array.find() which is O(m) for each row
- Suitable for educational purposes with small datasets

**Optimization Opportunities:**
```javascript
// Example: Using Map for O(1) lookups
function optimizedInnerJoin(A, B) {
  const bMap = new Map(B.map(b => [b.id, b]));
  return A
    .filter(a => bMap.has(a.id))
    .map(a => ({
      id: a.id,
      nomA: a.nom,
      nomB: bMap.get(a.id).nom
    }));
}
```

## UI Component System

### Rendering Architecture

The application uses a simple rendering pattern:

1. **State Change** triggers `renderAll()`
2. **Individual Renderers** update specific UI sections
3. **Event Rebinding** ensures interactivity

```javascript
function renderAll() {
  renderSidebar();     // Update join type selection
  renderVenn();        // Update Venn diagram
  renderTables();      // Update editable tables
  renderSQL();         // Update SQL query display
  renderResult();      // Update result table
  setupTableEvents();  // Rebind event listeners
}
```

### Adding New UI Components

#### Step 1: Add HTML Structure
```html
<!-- Add to index.html -->
<section id="new-section">
  <h3>New Feature</h3>
  <div id="new-content"></div>
</section>
```

#### Step 2: Create Render Function
```javascript
// Add to renderer.js
function renderNewFeature() {
  const container = document.getElementById('new-content');
  container.innerHTML = generateNewFeatureHTML();
}
```

#### Step 3: Integrate with Main Render
```javascript
function renderAll() {
  // ... existing renders
  renderNewFeature();  // Add your new renderer
}
```

### Venn Diagram System

The Venn diagram is rendered using SVG:

```javascript
function renderVenn() {
  const svg = document.getElementById('venn-diagram');
  svg.innerHTML = '';
  
  // Create circles
  const circleA = createSVGElement('circle', {
    cx: 120, cy: 100, r: 80,
    fill: getColorForJoinType(selectedJoin, 'A')
  });
  
  const circleB = createSVGElement('circle', {
    cx: 230, cy: 100, r: 80,
    fill: getColorForJoinType(selectedJoin, 'B')
  });
  
  // Add labels
  const labelA = createSVGElement('text', {
    x: 80, y: 105,
    fill: '#fff', 'font-weight': 'bold'
  });
  labelA.textContent = 'A';
  
  // Append to SVG
  svg.appendChild(circleA);
  svg.appendChild(circleB);
  svg.appendChild(labelA);
}
```

## Adding New Join Types

### Step 1: Define Join Configuration

Add to the `joinTypes` object:

```javascript
const joinTypes = {
  // ... existing types
  'cross': {
    label: 'CROSS JOIN',
    sql: `SELECT A.id AS a_id, A.nom AS a_nom, B.id AS b_id, B.nom AS b_nom
FROM TableA A
CROSS JOIN TableB B;`
  }
};
```

### Step 2: Implement Join Algorithm

Add case to `computeJoin()` function:

```javascript
function computeJoin(type, A, B) {
  switch (type) {
    // ... existing cases
    case 'cross':
      return A.flatMap(a => 
        B.map(b => ({
          a_id: a.id,
          a_nom: a.nom,
          b_id: b.id,
          b_nom: b.nom
        }))
      );
    default:
      return [];
  }
}
```

### Step 3: Add UI Element

Add to HTML sidebar:

```html
<ul id="join-types">
  <!-- existing items -->
  <li data-type="cross">CROSS JOIN</li>
</ul>
```

### Step 4: Update Venn Diagram (if needed)

Add case to `renderVenn()` for visual representation:

```javascript
switch (selectedJoin) {
  // ... existing cases
  case 'cross':
    // CROSS JOIN shows both circles fully highlighted
    circleAFill = highlightColor;
    circleBFill = highlightColor;
    break;
}
```

## Debugging and Development Tools

### Browser Developer Tools

With developer tools enabled, you can:

1. **Console Debugging**
   ```javascript
   // Add debug statements
   console.log('Current join type:', selectedJoin);
   console.log('Table A data:', tableA);
   console.log('Join result:', computeJoin(selectedJoin, tableA, tableB));
   ```

2. **DOM Inspection**
   - Inspect element structure
   - Modify CSS in real-time
   - Monitor event listeners

3. **Network Tab**
   - Monitor resource loading
   - Debug asset loading issues

### Custom Debug Functions

Add these utility functions for debugging:

```javascript
// Debug helper functions
function debugState() {
  return {
    selectedJoin,
    tableA: [...tableA],
    tableB: [...tableB],
    result: computeJoin(selectedJoin, tableA, tableB)
  };
}

function logJoinOperation(type) {
  console.group(`Join Operation: ${type}`);
  console.log('Table A:', tableA);
  console.log('Table B:', tableB);
  console.log('Result:', computeJoin(type, tableA, tableB));
  console.groupEnd();
}

// Usage in event handlers
document.addEventListener('click', (e) => {
  if (e.target.dataset.type) {
    logJoinOperation(e.target.dataset.type);
  }
});
```

### Performance Profiling

```javascript
function profileJoinOperation(type, iterations = 1000) {
  console.time(`Join ${type} x${iterations}`);
  
  for (let i = 0; i < iterations; i++) {
    computeJoin(type, tableA, tableB);
  }
  
  console.timeEnd(`Join ${type} x${iterations}`);
}

// Profile all join types
Object.keys(joinTypes).forEach(type => {
  profileJoinOperation(type);
});
```

## Testing Strategies

### Manual Testing Checklist

#### Basic Functionality
- [ ] All join types work correctly
- [ ] Table editing updates results
- [ ] Add/remove rows functions properly
- [ ] Reset button restores initial data
- [ ] Venn diagram updates with join selection
- [ ] SQL query displays correctly

#### Edge Cases
- [ ] Empty tables
- [ ] Tables with duplicate IDs
- [ ] Large numbers in ID field
- [ ] Special characters in name field
- [ ] Very long names
- [ ] Tables with different sizes

#### UI/UX Testing
- [ ] Responsive design on different window sizes
- [ ] Keyboard navigation works
- [ ] Hover states function properly
- [ ] Color scheme is consistent
- [ ] Text is readable

### Automated Testing Setup (Future)

Create test files:

```javascript
// tests/join-algorithms.test.js
const { computeJoin } = require('../renderer.js');

describe('Join Algorithms', () => {
  const sampleA = [
    { id: 1, nom: 'Alice' },
    { id: 2, nom: 'Bob' }
  ];
  
  const sampleB = [
    { id: 2, nom: 'Bob' },
    { id: 3, nom: 'Charlie' }
  ];
  
  test('INNER JOIN returns correct results', () => {
    const result = computeJoin('inner', sampleA, sampleB);
    expect(result).toEqual([
      { id: 2, nomA: 'Bob', nomB: 'Bob' }
    ]);
  });
  
  test('LEFT JOIN includes all left table rows', () => {
    const result = computeJoin('left', sampleA, sampleB);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: 1, nomA: 'Alice', nomB: null });
  });
});
```

## Styling and Theming

### CSS Architecture

The application uses a component-based CSS approach:

```css
/* Base styles */
body {
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Component styles */
.table-container {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 16px;
}

/* State styles */
.active {
  background: var(--accent-color);
  color: var(--text-on-accent);
}
```

### Custom CSS Properties

Define theme variables:

```css
:root {
  /* Colors */
  --bg-primary: #181828;
  --bg-secondary: #2a2a3a;
  --accent-color: #3a236b;
  --text-primary: #f3f3f3;
  --text-secondary: #a0a0a0;
  
  /* Layout */
  --sidebar-width: 220px;
  --border-radius: 8px;
  --spacing-unit: 8px;
}
```

### Adding New Themes

1. **Create theme CSS file**
   ```css
   /* themes/light.css */
   :root {
     --bg-primary: #ffffff;
     --bg-secondary: #f5f5f5;
     --accent-color: #007acc;
     --text-primary: #333333;
   }
   ```

2. **Implement theme switcher**
   ```javascript
   function applyTheme(themeName) {
     const existingTheme = document.getElementById('theme-css');
     if (existingTheme) {
       existingTheme.remove();
     }
     
     const link = document.createElement('link');
     link.id = 'theme-css';
     link.rel = 'stylesheet';
     link.href = `themes/${themeName}.css`;
     document.head.appendChild(link);
   }
   ```

## Build and Distribution

### Development Build

```bash
# Install dependencies
npm install

# Start development server
npm start

# With auto-reload (if configured)
npm run dev
```

### Production Build Setup

Add to `package.json`:

```json
{
  "scripts": {
    "build": "electron-builder",
    "dist": "npm run build -- --publish=never",
    "pack": "electron-builder --dir",
    "postinstall": "electron-builder install-app-deps"
  },
  "build": {
    "appId": "com.example.sql-joins-visualizer",
    "productName": "SQL Joins Visualizer",
    "directories": {
      "output": "dist"
    },
    "files": [
      "**/*",
      "!**/*.md",
      "!tests/**/*"
    ],
    "mac": {
      "category": "public.app-category.education"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}
```

### Release Process

1. **Update version**
   ```bash
   npm version patch  # or minor, major
   ```

2. **Build distributables**
   ```bash
   npm run dist
   ```

3. **Test built application**
   ```bash
   # Test the packaged app before distribution
   ```

4. **Create release**
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

## Common Development Tasks

### Adding a New Feature

1. **Plan the feature**
   - Define requirements
   - Design UI mockups
   - Plan data flow

2. **Implement incrementally**
   - Start with data structures
   - Add core logic
   - Implement UI
   - Add styling
   - Test thoroughly

3. **Document the feature**
   - Update README if user-facing
   - Add API documentation
   - Update CHANGELOG

### Fixing Bugs

1. **Reproduce the issue**
   - Create minimal test case
   - Document expected vs actual behavior

2. **Debug systematically**
   - Use console.log and breakpoints
   - Check data flow at each step
   - Verify assumptions

3. **Test the fix**
   - Verify fix works
   - Test edge cases
   - Ensure no regressions

### Optimizing Performance

1. **Profile the application**
   ```javascript
   // Measure rendering performance
   console.time('render');
   renderAll();
   console.timeEnd('render');
   
   // Measure join performance
   console.time('join');
   const result = computeJoin(selectedJoin, tableA, tableB);
   console.timeEnd('join');
   ```

2. **Identify bottlenecks**
   - Large dataset handling
   - Frequent re-renders
   - Inefficient algorithms

3. **Implement optimizations**
   - Cache results
   - Optimize algorithms
   - Reduce DOM manipulation

## Troubleshooting Common Issues

### Application Won't Start

**Symptoms:** Black screen or application doesn't launch

**Solutions:**
1. Check Node.js version compatibility
2. Clear node_modules and reinstall
3. Check for JavaScript errors in console
4. Verify file paths in main.js

### Join Results Incorrect

**Symptoms:** Wrong data in result table

**Debug Steps:**
1. Log input data: `console.log(tableA, tableB)`
2. Log join result: `console.log(computeJoin(type, tableA, tableB))`
3. Check join algorithm implementation
4. Verify data types (numbers vs strings)

### UI Not Updating

**Symptoms:** Changes not reflected in interface

**Debug Steps:**
1. Check if `renderAll()` is being called
2. Verify event listeners are bound
3. Check for JavaScript errors
4. Ensure DOM elements exist

### Performance Issues

**Symptoms:** Slow response or freezing

**Solutions:**
1. Limit table size for testing
2. Profile join operations
3. Check for infinite loops
4. Optimize rendering frequency

## Advanced Topics

### Electron-Specific Development

#### IPC Communication (if needed)
```javascript
// In main process (main.js)
const { ipcMain } = require('electron');

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// In renderer process
const { ipcRenderer } = require('electron');

async function getAppVersion() {
  return await ipcRenderer.invoke('get-app-version');
}
```

#### File System Access
```javascript
// Reading external data files
const fs = require('fs');
const path = require('path');

function loadDataFromFile(filename) {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading data file:', error);
    return null;
  }
}
```

### Custom Data Providers

```javascript
// Abstract data provider interface
class DataProvider {
  async getTables() {
    throw new Error('Must implement getTables()');
  }
  
  async saveTable(name, data) {
    throw new Error('Must implement saveTable()');
  }
}

// File-based provider
class FileDataProvider extends DataProvider {
  async getTables() {
    // Load from JSON files
  }
  
  async saveTable(name, data) {
    // Save to JSON files
  }
}

// Usage
const dataProvider = new FileDataProvider();
tableA = await dataProvider.getTables('tableA');
```

## Contributing Workflow

### Setting Up for Contribution

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and test**
4. **Commit with conventional format**
   ```bash
   git commit -m "feat: add new join visualization"
   ```

5. **Push and create pull request**

### Code Review Checklist

- [ ] Code follows project style guidelines
- [ ] New features have appropriate documentation
- [ ] Changes don't break existing functionality
- [ ] Performance impact is acceptable
- [ ] UI changes are consistent with design

---

This developer guide provides the foundation for working with the SQL Joins Visualizer codebase. For specific questions or additional guidance, refer to the other documentation files or open an issue in the project repository.