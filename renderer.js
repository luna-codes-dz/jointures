// --- Données initiales ---
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

let tableA = [...initialTableA];
let tableB = [...initialTableB];
let selectedJoin = 'inner';

const joinTypes = {
  inner: {
    label: 'INNER JOIN',
    sql: `SELECT A.id, A.nom, B.nom AS nomB
FROM TableA A
INNER JOIN TableB B ON A.id = B.id;`
  },
  left: {
    label: 'LEFT JOIN',
    sql: `SELECT A.id, A.nom, B.nom AS nomB
FROM TableA A
LEFT JOIN TableB B ON A.id = B.id;`
  },
  right: {
    label: 'RIGHT JOIN',
    sql: `SELECT B.id, A.nom AS nomA, B.nom
FROM TableA A
RIGHT JOIN TableB B ON A.id = B.id;`
  },
  full: {
    label: 'FULL OUTER JOIN',
    sql: `SELECT COALESCE(A.id, B.id) AS id, A.nom AS nomA, B.nom AS nomB
FROM TableA A
FULL OUTER JOIN TableB B ON A.id = B.id;`
  },
  'left-null': {
    label: 'LEFT JOIN WHERE B.key IS NULL',
    sql: `SELECT A.id, A.nom
FROM TableA A
LEFT JOIN TableB B ON A.id = B.id
WHERE B.id IS NULL;`
  },
  'right-null': {
    label: 'RIGHT JOIN WHERE A.key IS NULL',
    sql: `SELECT B.id, B.nom
FROM TableA A
RIGHT JOIN TableB B ON A.id = B.id
WHERE A.id IS NULL;`
  },
  'full-null': {
    label: 'FULL OUTER JOIN\nWHERE A.key IS NULL OR B.key IS NULL',
    sql: `SELECT COALESCE(A.id, B.id) AS id, A.nom AS nomA, B.nom AS nomB
FROM TableA A
FULL OUTER JOIN TableB B ON A.id = B.id
WHERE A.id IS NULL OR B.id IS NULL;`
  }
};

// --- Fonctions de jointure ---
function computeJoin(type, A, B) {
  switch (type) {
    case 'inner':
      return A.filter(a => B.some(b => b.id === a.id)).map(a => {
        const b = B.find(b => b.id === a.id);
        return { id: a.id, nomA: a.nom, nomB: b.nom };
      });
    case 'left':
      return A.map(a => {
        const b = B.find(b => b.id === a.id);
        return { id: a.id, nomA: a.nom, nomB: b ? b.nom : null };
      });
    case 'right':
      return B.map(b => {
        const a = A.find(a => a.id === b.id);
        return { id: b.id, nomA: a ? a.nom : null, nomB: b.nom };
      });
    case 'full': {
      const ids = Array.from(new Set([...A.map(a => a.id), ...B.map(b => b.id)]));
      return ids.map(id => {
        const a = A.find(a => a.id === id);
        const b = B.find(b => b.id === id);
        return { id, nomA: a ? a.nom : null, nomB: b ? b.nom : null };
      });
    }
    case 'left-null':
      return A.filter(a => !B.some(b => b.id === a.id)).map(a => ({ id: a.id, nomA: a.nom }));
    case 'right-null':
      return B.filter(b => !A.some(a => a.id === b.id)).map(b => ({ id: b.id, nomB: b.nom }));
    case 'full-null':
      return A.filter(a => !B.some(b => b.id === a.id)).concat(B.filter(b => !A.some(a => a.id === b.id))).map(a => ({ id: a.id, nomA: a.nom, nomB: b.nom }));
    default:
      return [];
  }
}

// --- Affichage du menu ---
function renderSidebar() {
  document.querySelectorAll('#join-types li').forEach(li => {
    li.classList.toggle('active', li.dataset.type === selectedJoin);
  });
}

// --- Affichage du diagramme de Venn ---
function renderVenn() {
  const svg = document.getElementById('venn-diagram');
  svg.innerHTML = '';
  // Cercles
  let circleAFill = '#ff4d4d33'; // Default transparent red
  let circleBFill = '#4d7aff33'; // Default transparent blue
  let showIntersection = false; // Flag to determine if intersection should be shown

  // Define highlight color (white with opacity)
  const highlightColor = '#ffffff99';
  // Define default transparent color for circles
  const defaultColorA = '#ff4d4d33';
  const defaultColorB = '#4d7aff33';

  switch (selectedJoin) {
    case 'inner':
      showIntersection = true; // Highlight intersection
      // A and B circles remain transparent, only intersection is highlighted
      circleAFill = defaultColorA;
      circleBFill = defaultColorB;
      break;
    case 'left':
      circleAFill = highlightColor; // Highlight A
      circleBFill = defaultColorB;
      showIntersection = true; // Highlight intersection as it is included in the result set
      break;
    case 'right':
      circleAFill = defaultColorA;
      circleBFill = highlightColor; // Highlight B
      showIntersection = true; // Highlight intersection as it is included in the result set
      break;
    case 'full':
      circleAFill = highlightColor; // Highlight A
      circleBFill = highlightColor; // Highlight B
      showIntersection = true; // Highlight intersection
      break;
    case 'left-null':
      circleAFill = highlightColor; // Highlight A (part not in intersection)
      circleBFill = defaultColorB;
      // No highlight on B or intersection
      break;
    case 'right-null':
      circleAFill = defaultColorA;
      circleBFill = highlightColor; // Highlight B (part not in intersection)
      // No highlight on A or intersection
      break;
    case 'full-null':
      circleAFill = highlightColor; // Highlight A (part not in intersection)
      circleBFill = highlightColor; // Highlight B (part not in intersection)
      // No highlight on intersection
      break;
    default:
      circleAFill = defaultColorA;
      circleBFill = defaultColorB;
      showIntersection = false;
      break;
  }

  // Render circles
  svg.innerHTML += `
    <circle cx="120" cy="100" r="70" fill="${circleAFill}" stroke="#ff4d4d" stroke-width="3"/>
    <circle cx="230" cy="100" r="70" fill="${circleBFill}" stroke="#4d7aff" stroke-width="3"/>
    <text x="90" y="95" font-size="1.2em" fill="#fff">A</text>
    <text x="260" y="95" font-size="1.2em" fill="#fff">B</text>
  `;

  // Render intersection highlight if needed
  if (showIntersection) {
     // For left-null, right-null, and full-null, we don't highlight the intersection
     if (!['left-null', 'right-null', 'full-null'].includes(selectedJoin)) {
        svg.innerHTML += `<ellipse cx="175" cy="100" rx="45" ry="70" fill="${highlightColor}"/>`; // Use highlight color for intersection
     }
  }
}

// --- Affichage des tables ---
function renderTables() {
  // Table A
  const tableAEl = document.getElementById('table-a');
  tableAEl.innerHTML = '<tr><th>ID</th><th>Nom</th><th></th></tr>' +
    tableA.map((row, i) =>
      `<tr>
        <td><input type="number" value="${row.id}" data-table="A" data-row="${i}" data-col="id"></td>
        <td><input type="text" value="${row.nom}" data-table="A" data-row="${i}" data-col="nom"></td>
        <td><button data-table="A" data-row="${i}" class="del-row">✕</button></td>
      </tr>`
    ).join('');
  // Table B
  const tableBEl = document.getElementById('table-b');
  tableBEl.innerHTML = '<tr><th>ID</th><th>Nom</th><th></th></tr>' +
    tableB.map((row, i) =>
      `<tr>
        <td><input type="number" value="${row.id}" data-table="B" data-row="${i}" data-col="id"></td>
        <td><input type="text" value="${row.nom}" data-table="B" data-row="${i}" data-col="nom"></td>
        <td><button data-table="B" data-row="${i}" class="del-row">✕</button></td>
      </tr>`
    ).join('');
}

// --- Affichage SQL ---
function renderSQL() {
  document.getElementById('sql-query').textContent = joinTypes[selectedJoin].sql;
}

// --- Affichage du résultat ---
function renderResult() {
  const result = computeJoin(selectedJoin, tableA, tableB);
  const table = document.getElementById('result-table');
  if(result.length === 0) {
    table.innerHTML = '<tr><td>Aucun résultat</td></tr>';
    return;
  }
  // En-têtes dynamiques
  const headers = Object.keys(result[0]);
  table.innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>' +
    result.map(row =>
      '<tr>' + headers.map(h => `<td>${row[h] !== null && row[h] !== undefined ? row[h] : ''}</td>`).join('') + '</tr>'
    ).join('');
}

// --- Gestion des événements ---
function setupEvents() {
  // Sélection du type de jointure
  document.querySelectorAll('#join-types li').forEach(li => {
    li.onclick = () => {
      selectedJoin = li.dataset.type;
      renderAll();
    };
  });
  // Ajout de lignes
  document.getElementById('add-row-a').onclick = () => {
    tableA.push({ id: '', nom: '' });
    renderTables();
    setupTableEvents();
    renderResult();
  };
  document.getElementById('add-row-b').onclick = () => {
    tableB.push({ id: '', nom: '' });
    renderTables();
    setupTableEvents();
    renderResult();
  };
  // Réinitialiser les tables
  document.getElementById('reset-tables').onclick = () => {
    tableA = [...initialTableA];
    tableB = [...initialTableB];
    renderAll();
  };
}

function setupTableEvents() {
  // Edition des cellules
  document.querySelectorAll('table input').forEach(input => {
    input.oninput = e => {
      const table = input.dataset.table === 'A' ? tableA : tableB;
      const row = parseInt(input.dataset.row);
      const col = input.dataset.col;
      table[row][col] = col === 'id' ? Number(input.value) : input.value;
      renderResult();
    };
  });
  // Suppression de lignes
  document.querySelectorAll('.del-row').forEach(btn => {
    btn.onclick = () => {
      const table = btn.dataset.table === 'A' ? tableA : tableB;
      const row = parseInt(btn.dataset.row);
      table.splice(row, 1);
      renderTables();
      setupTableEvents();
      renderResult();
    };
  });
}

function renderAll() {
  renderSidebar();
  renderVenn();
  renderTables();
  renderSQL();
  renderResult();
  setupTableEvents();
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  setupEvents();
}); 