# Architecture Documentation

## System Overview

The SQL Joins Visualizer is built as an Electron desktop application that provides an interactive environment for learning and understanding SQL join operations. The application follows a single-page application (SPA) pattern with clear separation between the main Electron process and the renderer process.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Electron Main Process                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    main.js                              │ │
│  │  • Window Management                                    │ │
│  │  • Application Lifecycle                               │ │
│  │  • Security Configuration                              │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                │ IPC / File System
                                │
┌─────────────────────────────────────────────────────────────┐
│                   Renderer Process                          │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│  │   index.html    │ │   renderer.js   │ │    style.css    │ │
│  │                 │ │                 │ │                 │ │
│  │ • UI Structure  │ │ • Join Engine   │ │ • Visual Theme  │ │
│  │ • DOM Elements  │ │ • Event Handlers│ │ • Layout Rules  │ │
│  │ • SVG Container │ │ • Data Management│ │ • Animations   │ │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Main Process (`main.js`)

**Responsibilities:**
- Application lifecycle management
- Browser window creation and configuration
- Security policy enforcement
- Platform-specific behavior handling

**Key Components:**
```javascript
// Window configuration
const win = new BrowserWindow({
  width: 1100,
  height: 700,
  webPreferences: {
    nodeIntegration: true,      // Enable Node.js APIs
    contextIsolation: false     // Allow direct DOM access
  }
});
```

**Security Considerations:**
- Node integration enabled for simplicity (educational tool)
- Context isolation disabled (not recommended for production)
- Menu bar auto-hidden for cleaner UI

### 2. Renderer Process (`renderer.js`)

**Responsibilities:**
- Business logic implementation
- SQL join algorithm execution
- UI state management
- Event handling and user interaction

**Core Modules:**

#### 2.1 Data Management Module
```javascript
// Data structures
let tableA = [...initialTableA];  // Mutable table data
let tableB = [...initialTableB];
let selectedJoin = 'inner';       // Current join type

// Initial data sets
const initialTableA = [/* sample data */];
const initialTableB = [/* sample data */];
```

#### 2.2 Join Engine Module
```javascript
const joinTypes = {
  inner: { label: '...', sql: '...' },
  left: { label: '...', sql: '...' },
  // ... other join types
};

function computeJoin(type, A, B) {
  // Implementation for each join type
}
```

#### 2.3 Rendering Module
```javascript
function renderAll() {
  renderSidebar();    // Join type selection
  renderVenn();       // Venn diagram visualization
  renderTables();     // Editable data tables
  renderSQL();        // Generated SQL query
  renderResult();     // Join operation result
  setupTableEvents(); // Event binding
}
```

### 3. User Interface (`index.html`)

**Layout Structure:**
```html
<div id="container">
  <aside id="sidebar">          <!-- Join type selection -->
    <ul id="join-types">...</ul>
  </aside>
  
  <main id="main-content">
    <section id="venn-section">     <!-- Venn diagram -->
      <svg id="venn-diagram">...</svg>
    </section>
    
    <section id="tables-section">   <!-- Editable tables -->
      <div class="table-container">...</div>
    </section>
    
    <section id="sql-section">      <!-- Generated SQL -->
      <pre id="sql-query">...</pre>
    </section>
    
    <section id="result-section">   <!-- Join results -->
      <table id="result-table">...</table>
    </section>
  </main>
</div>
```

### 4. Styling System (`style.css`)

**Design System:**
- **Color Palette:** Dark theme with purple accents
- **Typography:** Segoe UI font family for readability
- **Layout:** Flexbox-based responsive design
- **Interactive Elements:** Hover states and transitions

## Data Flow Architecture

### 1. User Interaction Flow

```
User Action → Event Handler → Data Update → UI Re-render → Visual Feedback
```

**Example: Selecting a Join Type**
```
1. User clicks "LEFT JOIN" in sidebar
2. Event listener captures click event
3. selectedJoin variable updated to 'left'
4. renderAll() function called
5. UI components update:
   - Sidebar highlights selection
   - Venn diagram changes colors
   - SQL query updates
   - Result table recalculates
```

### 2. Data Processing Pipeline

```
Raw Table Data → Join Algorithm → Result Processing → Display Formatting
```

**Join Processing Steps:**
1. **Input Validation:** Check table structure and data types
2. **Algorithm Selection:** Route to appropriate join function
3. **Join Execution:** Apply SQL-equivalent logic in JavaScript
4. **Result Formatting:** Transform output for display
5. **UI Update:** Render results in table format

### 3. Rendering Pipeline

```
State Change → Determine Updates → DOM Manipulation → Event Rebinding
```

**Rendering Optimization:**
- Full re-render on major state changes
- Selective updates for minor changes
- Event listener cleanup and rebinding
- DOM element reuse where possible

## Join Algorithm Implementation

### Algorithm Design Patterns

**1. Filter-Map Pattern (INNER JOIN)**
```javascript
A.filter(a => B.some(b => b.id === a.id))
 .map(a => ({ 
   id: a.id, 
   nomA: a.nom, 
   nomB: B.find(b => b.id === a.id).nom 
 }));
```

**2. Map-Conditional Pattern (LEFT JOIN)**
```javascript
A.map(a => {
  const b = B.find(b => b.id === a.id);
  return { id: a.id, nomA: a.nom, nomB: b ? b.nom : null };
});
```

**3. Set Union Pattern (FULL OUTER JOIN)**
```javascript
const allIds = new Set([...A.map(a => a.id), ...B.map(b => b.id)]);
Array.from(allIds).map(id => /* join logic */);
```

### Performance Characteristics

| Join Type | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| INNER | O(n×m) | O(result_size) | Uses nested loops |
| LEFT | O(n×m) | O(n) | Fixed output size |
| RIGHT | O(n×m) | O(m) | Fixed output size |
| FULL OUTER | O(n+m) + O(k×m) | O(n+m) | Set operations + joins |

**Optimization Opportunities:**
- Index-based lookups for larger datasets
- Memoization for repeated operations
- Virtual scrolling for large result sets

## Visualization Architecture

### SVG Rendering System

**Venn Diagram Components:**
```javascript
// Circle definitions
const circleA = { cx: 120, cy: 100, r: 80, fill: dynamicColor };
const circleB = { cx: 230, cy: 100, r: 80, fill: dynamicColor };

// Intersection calculation
const intersection = /* SVG path for overlapping region */;
```

**Color Mapping Strategy:**
```javascript
const colorScheme = {
  default: { A: '#ff4d4d33', B: '#4d7aff33' },
  highlight: '#ffffff99',
  mapping: {
    inner: { intersection: 'highlight' },
    left: { A: 'highlight', intersection: 'highlight' },
    // ... other mappings
  }
};
```

### Dynamic UI Updates

**State-Driven Rendering:**
1. **Join Selection:** Updates sidebar highlighting and Venn colors
2. **Data Modification:** Triggers result recalculation and display
3. **Table Editing:** Validates input and propagates changes
4. **Reset Action:** Restores initial state and refreshes all views

## Security Architecture

### Current Security Model

**Enabled Features:**
- Node.js integration for file system access
- Direct DOM manipulation
- No content security policy restrictions

**Risk Assessment:**
- **Low Risk:** Educational tool with no network connectivity
- **No Sensitive Data:** Only sample SQL data processed
- **Local Execution:** No remote code execution vectors

**Recommendations for Production:**
- Enable context isolation
- Implement content security policy
- Disable Node.js integration in renderer
- Add input validation and sanitization

## Performance Architecture

### Optimization Strategies

**Current Implementation:**
- Synchronous operations suitable for small datasets
- DOM manipulation without virtual DOM
- Full UI re-render on state changes
- No data persistence between sessions

**Scalability Considerations:**
- **Recommended Data Limit:** 100 rows per table
- **Memory Usage:** Linear with dataset size
- **CPU Usage:** Spikes during join operations and rendering

**Future Optimizations:**
- Implement virtual scrolling for large tables
- Add worker threads for join computations
- Cache join results for unchanged data
- Implement incremental rendering

## Extension Architecture

### Plugin System Design (Future)

**Proposed Architecture:**
```javascript
const extensionAPI = {
  registerJoinType(config) { /* Add custom join */ },
  addDataProvider(provider) { /* External data sources */ },
  registerTheme(theme) { /* Custom color schemes */ },
  addExportFormat(format) { /* Output formats */ }
};
```

### Configuration Management

**Current Configuration:**
- Hard-coded in JavaScript source
- No external configuration files
- No user preferences persistence

**Proposed Enhancements:**
- JSON configuration files
- User preference storage
- Workspace-specific settings
- Theme and layout customization

## Testing Architecture

### Current Testing Strategy

**Manual Testing Coverage:**
- Join operation correctness
- UI interaction validation
- Cross-platform compatibility
- Performance under load

**Automated Testing (Planned):**
```javascript
// Unit tests for join algorithms
describe('Join Operations', () => {
  test('INNER JOIN returns correct results', () => {
    const result = computeJoin('inner', tableA, tableB);
    expect(result).toEqual(expectedResult);
  });
});

// Integration tests for UI components
describe('UI Components', () => {
  test('Table editing updates results', () => {
    // Simulate user input and verify UI updates
  });
});
```

## Deployment Architecture

### Build Process

**Current Process:**
1. Install dependencies: `npm install`
2. Start development: `npm start`
3. No production build process defined

**Proposed Build Pipeline:**
```bash
# Development
npm run dev          # Start with hot reload
npm run test         # Run test suite
npm run lint         # Code quality checks

# Production
npm run build        # Create distribution packages
npm run package      # Platform-specific installers
npm run publish      # Release to distribution channels
```

### Distribution Strategy

**Target Platforms:**
- Windows (x64)
- macOS (Intel + Apple Silicon)
- Linux (x64)

**Package Formats:**
- Windows: NSIS installer (.exe)
- macOS: DMG package (.dmg)
- Linux: AppImage (.appimage) and Snap package

---

## Conclusion

The SQL Joins Visualizer architecture prioritizes simplicity and educational value over enterprise-grade features. The current design effectively demonstrates SQL join concepts while maintaining code clarity and ease of modification. Future enhancements should focus on performance optimization, security hardening, and extensibility while preserving the application's educational mission.