# Architecture Documentation

## Project Overview

This is an Electron application for visualizing SQL joins with an interactive interface. The application follows a simple client-side architecture with separation of concerns.

## Project Structure

```
jointures-sql/
├── main.js              # Electron main process
├── index.html           # Application layout
├── renderer.js          # Application logic (renderer process)
├── style.css           # Styling and layout
├── package.json        # Dependencies and scripts
├── images/             # Static assets
│   └── sql_joins.jpg   # Reference diagram
└── docs/               # Documentation
    ├── API.md          # API documentation
    ├── ARCHITECTURE.md # This file
    └── USER_GUIDE.md   # User manual
```

## Architecture Components

### 1. Main Process (`main.js`)
- **Purpose**: Electron's main process that manages the application lifecycle
- **Responsibilities**:
  - Create the main browser window
  - Handle application events (ready, window-closed)
  - Configure window properties and security settings

### 2. Renderer Process (`renderer.js`)
- **Purpose**: Contains all application logic and UI interactions
- **Architecture Pattern**: Module pattern with global state management
- **Key Components**:
  - **Data Layer**: Global variables storing table data and join configuration
  - **Business Logic**: Join computation functions
  - **View Layer**: DOM manipulation and rendering functions
  - **Event Layer**: User interaction handlers

### 3. User Interface (`index.html` + `style.css`)
- **Layout**: Flexbox-based responsive design
- **Components**:
  - Sidebar: Join type selection
  - Main content area: Tables, Venn diagram, SQL query, results
  - Interactive tables: Editable data with add/remove functionality

## Design Patterns

### 1. Observer Pattern
- **Implementation**: Event-driven updates
- **Flow**: User action → State change → Re-render affected components
- **Example**: Selecting a join type triggers updates to Venn diagram, SQL query, and results

### 2. Model-View Pattern
- **Model**: JavaScript objects representing table data
- **View**: DOM elements displaying the data
- **Synchronization**: Manual via render functions

### 3. Command Pattern
- **Implementation**: Join operations as discrete functions
- **Benefits**: Easy to extend with new join types
- **Structure**: `joinTypes` configuration object maps types to SQL and labels

## Data Flow Architecture

```
User Input → Event Handler → State Update → Re-render → DOM Update
```

### Detailed Flow:
1. **Input**: User clicks join type or modifies table data
2. **Event**: Corresponding event handler is triggered
3. **State**: Global variables are updated (tableA, tableB, selectedJoin)
4. **Computation**: Join result is recalculated using `computeJoin()`
5. **Rendering**: Affected UI components are re-rendered
6. **Display**: DOM is updated to reflect new state

## State Management

### Global State Variables
```javascript
let tableA = [...];      // Table A data
let tableB = [...];      // Table B data  
let selectedJoin = 'inner'; // Current join type
```

### State Updates
- **Immutable Operations**: Table reset creates new arrays
- **Mutable Operations**: Direct array/object modification for performance
- **Consistency**: All renders triggered after state changes

## Component Architecture

### 1. Sidebar Component
- **State**: Selected join type
- **Rendering**: Highlights active selection
- **Events**: Click handlers for join type selection

### 2. Venn Diagram Component
- **Technology**: SVG with dynamic rendering
- **Logic**: Conditional styling based on join type
- **Visual States**: Different highlight patterns for each join type

### 3. Table Components
- **Dynamic Rendering**: HTML tables generated from data arrays
- **Interactivity**: Input fields for cell editing, delete buttons for rows
- **Validation**: Automatic type conversion (string/number)

### 4. SQL Display Component
- **Static Content**: Pre-defined SQL templates
- **Dynamic Selection**: Based on current join type
- **Formatting**: Syntax highlighting via CSS

### 5. Result Component
- **Dynamic Content**: Computed join results
- **Layout**: Responsive table with conditional columns
- **Updates**: Real-time recalculation on data changes

## Security Considerations

### Electron Security
- **Node Integration**: Enabled (legacy configuration)
- **Context Isolation**: Disabled (legacy configuration)
- **Recommendation**: Update to modern Electron security practices for production

### Data Validation
- **Input Sanitization**: Basic type conversion
- **SQL Injection**: Not applicable (no actual database)
- **XSS Prevention**: No dynamic HTML injection

## Performance Considerations

### Rendering Optimization
- **Full Re-render**: Simple but potentially inefficient for large datasets
- **Event Delegation**: Manually re-attached after DOM changes
- **Memory Management**: Arrays copied for immutable operations

### Scalability Limitations
- **Data Size**: Not optimized for large tables (hundreds of rows)
- **DOM Updates**: No virtual DOM or diffing algorithm
- **Event Handling**: O(n) setup for table events

## Extension Points

### Adding New Join Types
1. Add entry to `joinTypes` configuration object
2. Implement logic in `computeJoin()` function
3. Add visual representation in `renderVenn()`
4. Update HTML sidebar with new option

### UI Enhancements
- **Theming**: CSS custom properties for color schemes
- **Responsive Design**: Media queries for mobile support
- **Accessibility**: ARIA labels and keyboard navigation

### Data Features
- **Import/Export**: File system access via Electron APIs
- **Validation**: Schema enforcement and error handling
- **History**: Undo/redo functionality with state snapshots

## Dependencies

### Runtime Dependencies
- **Electron**: `^28.2.3` - Desktop application framework
- **Node.js**: Implicit dependency for Electron

### Development Dependencies
- None (simple HTML/CSS/JS stack)

### Browser Compatibility
- **Target**: Chromium (embedded in Electron)
- **Features Used**: ES6+ JavaScript, Flexbox, SVG
- **No Polyfills**: Modern browser features only