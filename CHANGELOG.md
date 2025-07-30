# Changelog

All notable changes to the SQL Joins Visualizer project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of SQL Joins Visualizer
- Interactive Electron desktop application
- Support for 6 major SQL join types:
  - INNER JOIN
  - LEFT JOIN
  - RIGHT JOIN
  - FULL OUTER JOIN
  - LEFT JOIN WHERE B.key IS NULL
  - RIGHT JOIN WHERE A.key IS NULL
- Real-time Venn diagram visualization
- Editable sample tables with add/remove functionality
- Dynamic SQL query generation
- Modern dark theme UI with purple accents
- Comprehensive bilingual documentation (English/French)

### Features
- **Interactive Tables**: Click-to-edit cells, add/remove rows
- **Visual Feedback**: SVG Venn diagrams with highlighted regions
- **Query Display**: Real-time SQL query generation
- **Data Persistence**: Reset functionality to restore sample data
- **Responsive Design**: Clean, modern interface optimized for desktop use

### Technical Details
- Built with Electron 28.2.3
- Vanilla JavaScript for join algorithms
- HTML5/CSS3 interface with SVG graphics
- No external dependencies beyond Electron
- Single-page application architecture

### Documentation
- Comprehensive README with bilingual support
- API documentation for developers
- Installation and usage instructions
- Architecture overview and customization guide

### Known Limitations
- Optimized for small datasets (recommended max 100 rows per table)
- Single key join operations only (id field)
- No data import/export functionality
- Desktop-only application (no web version)

## [Unreleased]

### Planned Features
- [ ] Data import/export (CSV, JSON)
- [ ] Multiple join keys support
- [ ] Performance optimizations for larger datasets
- [ ] Additional join types (CROSS JOIN, SELF JOIN)
- [ ] Query history and bookmarking
- [ ] Custom table schemas
- [ ] Print/export visualization functionality
- [ ] Accessibility improvements
- [ ] Keyboard shortcuts
- [ ] Undo/redo functionality

### Potential Improvements
- [ ] Web version for broader accessibility
- [ ] Database connectivity options
- [ ] Advanced SQL query builder
- [ ] Animation transitions for join changes
- [ ] Better mobile responsive design
- [ ] Theme customization options
- [ ] Multi-language support expansion

---

## Version History Notes

### Version Numbering
- **Major** version increments for incompatible API changes
- **Minor** version increments for backwards-compatible functionality additions  
- **Patch** version increments for backwards-compatible bug fixes

### Release Process
1. Update version number in `package.json`
2. Update `CHANGELOG.md` with new version details
3. Create git tag with version number
4. Build and test release packages
5. Update documentation if needed

### Contributing to Changelog
When contributing to this project, please:
- Add entries to the `[Unreleased]` section
- Use the format: `- Description of change ([#PR](link) by [@username](link))`
- Categorize changes as Added, Changed, Deprecated, Removed, Fixed, or Security
- Move entries to appropriate version section upon release