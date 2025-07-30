# API Documentation

## Data Structures

### Table Data Structure
```javascript
{
  id: number,      // Unique identifier for the row
  nom: string      // Name field
}
```

### Join Types Configuration
The application supports the following join types, each with associated SQL queries:

- `inner`: INNER JOIN
- `left`: LEFT JOIN  
- `right`: RIGHT JOIN
- `full`: FULL OUTER JOIN
- `left-null`: LEFT JOIN WHERE B.key IS NULL
- `right-null`: RIGHT JOIN WHERE A.key IS NULL

## Core Functions

### Data Management

#### `computeJoin(type, A, B)`
Performs the specified join operation between two tables.

**Parameters:**
- `type` (string): The join type ('inner', 'left', 'right', 'full', 'left-null', 'right-null')
- `A` (Array): First table data
- `B` (Array): Second table data

**Returns:** Array of joined records

**Example:**
```javascript
const result = computeJoin('inner', tableA, tableB);
// Returns records that exist in both tables
```

### Rendering Functions

#### `renderSidebar()`
Updates the sidebar to highlight the currently selected join type.

#### `renderVenn()`
Generates the SVG Venn diagram visualization based on the selected join type.
- Creates two overlapping circles representing tables A and B
- Highlights relevant areas based on join type
- Uses color coding: red for Table A, blue for Table B, white for highlighted areas

#### `renderTables()`
Renders both data tables (A and B) with:
- Editable input fields for each cell
- Delete buttons for each row
- Proper data binding

#### `renderSQL()`
Displays the SQL query corresponding to the selected join type.

#### `renderResult()`
Shows the result of the join operation in a formatted table.

### Event Handling

#### `setupEvents()`
Initializes all event listeners for:
- Join type selection
- Table data modification
- Row addition/deletion
- Table reset functionality

#### `setupTableEvents()`
Sets up event handlers for:
- Cell editing (input events)
- Row deletion (click events)

### Utility Functions

#### `renderAll()`
Convenience function that renders all components:
- Sidebar
- Venn diagram
- Tables
- SQL query
- Result table
- Sets up event handlers

## Data Flow

1. User selects a join type from the sidebar
2. `selectedJoin` variable is updated
3. All rendering functions are called to update the UI
4. `computeJoin()` calculates the result based on current table data
5. Result is displayed in the result table

## Event Lifecycle

1. **Initialization**: `DOMContentLoaded` event triggers `renderAll()` and `setupEvents()`
2. **Join Selection**: Click on sidebar item updates `selectedJoin` and re-renders components
3. **Data Modification**: Input changes update table data and re-render result
4. **Row Management**: Add/delete buttons modify table arrays and re-render tables

## Configuration

### Initial Data
```javascript
const initialTableA = [
  { id: 1, nom: 'Alice' },
  { id: 2, nom: 'Bob' },
  { id: 3, nom: 'Chloé' }
];

const initialTableB = [
  { id: 2, nom: 'Bob' },
  { id: 3, nom: 'Chloé' },
  { id: 4, nom: 'David' }
];
```

### Color Scheme
- Table A: Red (`#ff4d4d33`)
- Table B: Blue (`#4d7aff33`) 
- Highlight: White with opacity (`#ffffff99`)
- Background: Dark theme (`#181828`)
- Sidebar: Purple gradient (`#3a236b`)