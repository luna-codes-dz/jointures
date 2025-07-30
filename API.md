# API Documentation

## Overview

This document describes the internal API and architecture of the SQL Joins Visualizer application.

## Data Structures

### Table Structure

Tables are represented as arrays of objects with the following structure:

```javascript
const table = [
  { id: number, nom: string },
  { id: number, nom: string },
  // ...
];
```

**Properties:**
- `id` (number): Unique identifier for the record, used as the join key
- `nom` (string): Name field containing the display value

### Join Types Configuration

Join types are defined in the `joinTypes` object:

```javascript
const joinTypes = {
  [joinKey]: {
    label: string,     // Display name for the join type
    sql: string        // SQL query template
  }
};
```

**Available Join Keys:**
- `inner`: INNER JOIN
- `left`: LEFT JOIN  
- `right`: RIGHT JOIN
- `full`: FULL OUTER JOIN
- `left-null`: LEFT JOIN WHERE B.key IS NULL
- `right-null`: RIGHT JOIN WHERE A.key IS NULL

## Core Functions

### Join Operations

#### `computeJoin(type, tableA, tableB)`

Performs the specified join operation on two tables.

**Parameters:**
- `type` (string): Join type key (see Join Types Configuration)
- `tableA` (Array): Left table data
- `tableB` (Array): Right table data

**Returns:** Array of joined records

**Example:**
```javascript
const result = computeJoin('inner', tableA, tableB);
// Returns: [{ id: 2, nomA: 'Bob', nomB: 'Bob' }, ...]
```

### Rendering Functions

#### `renderAll()`

Renders all UI components. Call this function when data changes require a complete UI refresh.

```javascript
function renderAll() {
  renderSidebar();
  renderVenn();
  renderTables();
  renderSQL();
  renderResult();
  setupTableEvents();
}
```

#### `renderSidebar()`

Updates the sidebar to highlight the currently selected join type.

#### `renderVenn()`

Generates the SVG Venn diagram based on the selected join type. The diagram uses different fill colors to highlight the relevant data sets.

**Color Scheme:**
- Default Circle A: `#ff4d4d33` (transparent red)
- Default Circle B: `#4d7aff33` (transparent blue)  
- Highlight Color: `#ffffff99` (semi-transparent white)

#### `renderTables()`

Renders the editable data tables (Table A and Table B) with input fields and delete buttons.

#### `renderSQL()`

Displays the SQL query corresponding to the selected join type.

#### `renderResult()`

Shows the result of the join operation in a formatted table.

### Event Management

#### `setupEvents()`

Initializes global event listeners for:
- Join type selection
- Add row buttons
- Reset tables button

#### `setupTableEvents()`

Sets up event listeners for table-specific interactions:
- Cell editing (input events)
- Row deletion (click events)

**Note:** This function must be called after `renderTables()` to bind events to newly created elements.

## Global Variables

### Data Storage

```javascript
let tableA = [...initialTableA];  // Current data for Table A
let tableB = [...initialTableB];  // Current data for Table B
let selectedJoin = 'inner';       // Currently selected join type
```

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

## DOM Element IDs

### Primary Containers

- `#container`: Main application container
- `#sidebar`: Left sidebar with join types
- `#main-content`: Main content area

### Interactive Elements

- `#join-types`: Join type selection list
- `#table-a`: Table A container
- `#table-b`: Table B container
- `#add-row-a`: Add row button for Table A
- `#add-row-b`: Add row button for Table B
- `#reset-tables`: Reset tables button

### Display Elements

- `#venn-diagram`: SVG container for Venn diagram
- `#sql-query`: SQL query display area
- `#result-table`: Join result table

## Join Algorithm Details

### INNER JOIN
Returns records that have matching values in both tables.

```javascript
A.filter(a => B.some(b => b.id === a.id))
  .map(a => {
    const b = B.find(b => b.id === a.id);
    return { id: a.id, nomA: a.nom, nomB: b.nom };
  });
```

### LEFT JOIN
Returns all records from the left table and matched records from the right table.

```javascript
A.map(a => {
  const b = B.find(b => b.id === a.id);
  return { id: a.id, nomA: a.nom, nomB: b ? b.nom : null };
});
```

### RIGHT JOIN
Returns all records from the right table and matched records from the left table.

```javascript
B.map(b => {
  const a = A.find(a => a.id === b.id);
  return { id: b.id, nomA: a ? a.nom : null, nomB: b.nom };
});
```

### FULL OUTER JOIN
Returns all records when there is a match in either left or right table.

```javascript
const ids = Array.from(new Set([...A.map(a => a.id), ...B.map(b => b.id)]));
return ids.map(id => {
  const a = A.find(a => a.id === id);
  const b = B.find(b => b.id === id);
  return { id, nomA: a ? a.nom : null, nomB: b ? b.nom : null };
});
```

## Error Handling

The application includes basic error handling for:
- Invalid input data types
- Missing DOM elements
- Event binding failures

## Performance Considerations

- Uses array methods for join operations (suitable for small datasets)
- Rebuilds entire result set on each data change
- DOM updates are not optimized for large tables
- Recommended maximum table size: 100 rows per table

## Extending the Application

### Adding New Join Types

1. Add entry to `joinTypes` object with label and SQL template
2. Implement logic in `computeJoin()` function
3. Update Venn diagram rendering in `renderVenn()` if needed
4. Add corresponding HTML element in sidebar

### Customizing Table Schema

1. Update `initialTableA` and `initialTableB` structures
2. Modify `renderTables()` to handle new fields
3. Update join algorithms to use new key fields
4. Adjust SQL templates in `joinTypes` object