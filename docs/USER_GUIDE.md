# User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Understanding the Interface](#understanding-the-interface)
3. [Working with Join Types](#working-with-join-types)
4. [Managing Table Data](#managing-table-data)
5. [Understanding Results](#understanding-results)
6. [Tips and Best Practices](#tips-and-best-practices)
7. [Troubleshooting](#troubleshooting)

## Getting Started

### Installation Requirements
- **Node.js**: Version 14 or higher
- **npm**: Comes with Node.js
- **Operating System**: Windows, macOS, or Linux

### Installation Steps
1. **Download the project**:
   ```bash
   git clone <repository-url>
   cd jointures-sql
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the application**:
   ```bash
   npm start
   ```

The application window will open automatically.

## Understanding the Interface

### Main Components

#### 1. Sidebar (Left Panel)
- **Location**: Left side of the window
- **Purpose**: Select different types of SQL joins
- **Available Options**:
  - INNER JOIN
  - LEFT JOIN  
  - RIGHT JOIN
  - FULL OUTER JOIN
  - LEFT JOIN WHERE B.key IS NULL
  - RIGHT JOIN WHERE A.key IS NULL

#### 2. Venn Diagram (Top Center)
- **Location**: Upper center area
- **Purpose**: Visual representation of the selected join
- **Colors**:
  - Red circle: Table A
  - Blue circle: Table B
  - White highlighting: Selected data regions

#### 3. Data Tables (Center)
- **Table A**: Left table with sample data
- **Table B**: Right table with sample data
- **Features**: 
  - Editable cells
  - Add new rows
  - Delete existing rows

#### 4. Controls
- **Add Row Buttons**: Below each table
- **Reset Button**: Restores original sample data

#### 5. SQL Query Display (Bottom Center)
- **Purpose**: Shows the SQL query for the selected join
- **Updates**: Automatically when join type changes

#### 6. Results Table (Bottom)
- **Purpose**: Shows the result of the join operation
- **Updates**: Real-time as data or join type changes

## Working with Join Types

### INNER JOIN
- **Purpose**: Returns only matching records from both tables
- **Venn Diagram**: Only the intersection is highlighted
- **Example**: With default data, returns Bob and Chloé (present in both tables)

### LEFT JOIN
- **Purpose**: Returns all records from Table A, with matches from Table B
- **Venn Diagram**: Entire Table A circle is highlighted
- **Example**: Returns Alice, Bob, and Chloé (all from Table A)

### RIGHT JOIN
- **Purpose**: Returns all records from Table B, with matches from Table A
- **Venn Diagram**: Entire Table B circle is highlighted
- **Example**: Returns Bob, Chloé, and David (all from Table B)

### FULL OUTER JOIN
- **Purpose**: Returns all records from both tables
- **Venn Diagram**: Both circles are fully highlighted
- **Example**: Returns Alice, Bob, Chloé, and David (from both tables)

### LEFT JOIN WHERE B.key IS NULL
- **Purpose**: Returns records only in Table A (not in Table B)
- **Venn Diagram**: Only Table A exclusive region is highlighted
- **Example**: Returns only Alice

### RIGHT JOIN WHERE A.key IS NULL
- **Purpose**: Returns records only in Table B (not in Table A)
- **Venn Diagram**: Only Table B exclusive region is highlighted
- **Example**: Returns only David

## Managing Table Data

### Editing Existing Data

#### Editing Cell Values
1. **Click** on any cell in Table A or Table B
2. **Type** the new value
3. **Press Enter** or click elsewhere to confirm
4. **Results update** automatically

#### Data Types
- **ID Column**: Must be numeric values
- **Name Column**: Any text is allowed

### Adding New Rows

#### Step-by-Step
1. **Click** the "Ajouter une ligne" (Add Row) button below the desired table
2. **New row** appears with default values (ID: 0, Name: "Nouveau")
3. **Edit** the values as needed
4. **Results** update automatically

#### Best Practices
- Use unique ID values to see clear join relationships
- Avoid duplicate IDs within the same table for clarity

### Removing Rows

#### How to Delete
1. **Click** the red "×" button next to the row you want to delete
2. **Row is removed** immediately
3. **Results** update automatically

#### Important Notes
- Deletion is immediate and cannot be undone (except by using Reset)
- Removing rows will affect join results

### Resetting Data

#### When to Reset
- When you want to return to the original example data
- To start over with a clean slate
- After experimenting with complex data changes

#### How to Reset
1. **Click** the "Réinitialiser les exemples" (Reset Examples) button
2. **Both tables** return to original sample data
3. **All modifications** are lost

## Understanding Results

### Result Table Columns

#### Column Meanings
- **id**: The joining key (may come from Table A, B, or both)
- **nomA**: Name from Table A (NULL if no match)
- **nomB**: Name from Table B (NULL if no match)

#### NULL Values
- **Display**: Shows as empty cells or "NULL"
- **Meaning**: No matching record in the corresponding table
- **Common in**: LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN

### SQL Query Interpretation

#### Reading the Query
- **SELECT clause**: Defines which columns to return
- **FROM clause**: Specifies the primary table
- **JOIN clause**: Defines the type of join and join condition
- **WHERE clause**: Additional filtering (for NULL variants)

#### Join Conditions
- **ON A.id = B.id**: Records match when ID values are equal
- **WHERE B.id IS NULL**: Excludes records that have matches
- **COALESCE(A.id, B.id)**: Uses A.id if available, otherwise B.id

## Tips and Best Practices

### Effective Learning

#### Start Simple
1. **Begin with INNER JOIN** to understand basic concept
2. **Use default data** initially
3. **Observe** how Venn diagram and results correspond

#### Experiment Gradually
1. **Modify one value** at a time
2. **Observe changes** in results
3. **Try different join types** with same data

#### Practice Scenarios
1. **Add a person** only to Table A, then try different joins
2. **Create matching records** with same ID in both tables
3. **Use non-sequential IDs** to see join behavior clearly

### Data Management Tips

#### ID Strategy
- **Use meaningful IDs**: 1, 2, 3... for clarity
- **Create specific scenarios**:
  - Same ID in both tables (will join)
  - ID only in Table A (LEFT JOIN scenarios)
  - ID only in Table B (RIGHT JOIN scenarios)

#### Testing Joins
- **Start with 2-3 records** per table
- **Create known relationships** to verify understanding
- **Use descriptive names** to track results easily

### Common Use Cases

#### Educational Scenarios
1. **Employee-Department joins**: Add departments to Table B
2. **Student-Course joins**: Model enrollments
3. **Product-Category joins**: E-commerce relationships

#### Data Analysis Practice
1. **Missing data scenarios**: Use NULL-filtering joins
2. **Complete dataset needs**: Use FULL OUTER JOIN
3. **One-sided analysis**: Use LEFT or RIGHT JOIN

## Troubleshooting

### Common Issues

#### Application Won't Start
- **Check Node.js**: Ensure Node.js is installed
- **Check dependencies**: Run `npm install` again
- **Check errors**: Look at terminal output for error messages

#### Data Not Updating
- **Refresh approach**: Click "Reset" then re-enter data
- **Check ID values**: Ensure IDs are numbers, not text
- **Re-select join type**: Click on the join type again

#### Unexpected Results
- **Verify data types**: IDs should be numeric
- **Check for typos**: Names should match exactly if intended
- **Understand join logic**: Review join type definitions above

#### Visual Issues
- **Window too small**: Resize window to see all components
- **Missing elements**: Ensure all files are present in project folder
- **Styling problems**: Check that `style.css` file exists

### Performance Notes

#### Large Datasets
- **Limitation**: Not optimized for hundreds of rows
- **Recommendation**: Keep tables under 50 rows for best performance
- **Alternative**: Use for learning, not production data analysis

#### Memory Usage
- **Normal behavior**: Application uses moderate memory
- **If slow**: Restart application to clear memory
- **Large operations**: Reset data if application becomes unresponsive

### Getting Help

#### Self-Help Resources
1. **Experiment**: Try different combinations to understand behavior
2. **Reset frequently**: Use reset button to start fresh
3. **Check examples**: Compare with default data behavior

#### Technical Issues
1. **Console errors**: Open browser developer tools (F12) for errors
2. **File permissions**: Ensure all project files are readable
3. **Node.js issues**: Update Node.js to latest stable version

### Advanced Usage

#### Custom Scenarios
- **Business scenarios**: Create realistic business data examples
- **Edge cases**: Test with empty tables, single records, all NULL values
- **Performance testing**: Gradually increase data size to find limits

#### Educational Applications
- **Database courses**: Use as visual aid for SQL JOIN concepts
- **Self-study**: Practice with different data scenarios
- **Group learning**: Share screen for collaborative exploration