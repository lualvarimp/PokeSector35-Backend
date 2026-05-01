// ============================================================================
// POKÉSECTOR ADMIN PANEL - RANKING.JS
// Gestión de tabla de ranking global
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_role');

  if (!accessToken) {
    window.location.href = '/login';
    return;
  }

  loadRanking();
  setupFilters();
});

let allRanking = [];
let filteredRanking = [];

// ============================================================================
// CARGAR RANKING
// ============================================================================

async function loadRanking() {
  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch('/api/ranking', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const ranking = await response.json();

    allRanking = ranking;
    filteredRanking = [...allRanking];
    renderTable(filteredRanking);
    updateRankingCount(filteredRanking.length);

  } catch (error) {
    console.error('Error cargando ranking:', error);
  }
}

// ============================================================================
// RENDERIZAR TABLA
// ============================================================================

function renderTable(ranking) {
  const tbody = document.getElementById('rankingTableBody');
  const userRole = localStorage.getItem('user_role');
  
  if (ranking.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="loading">No hay partidas en el ranking</td></tr>';
    return;
  }

  tbody.innerHTML = ranking.map((entry, index) => {
    const totalEncounters = entry.captured_count + entry.escaped_count;
    const percentage = ((entry.captured_count / totalEncounters) * 100).toFixed(2);
    const completedAt = new Date(entry.completed_at).toLocaleDateString('es-ES');
    const position = index + 1;
    const rowClass = position <= 3 ? `top-${position}` : '';

    return `
      <tr class="${rowClass}">
        <td class="position">${position}</td>
        <td>${entry.username}</td>
        <td>${entry.captured_count}</td>
        <td>${entry.escaped_count}</td>
        <td class="percentage">${percentage}%</td>
        <td><span class="difficulty-badge ${entry.difficulty_id}">${entry.difficulty_id}</span></td>
        <td>${completedAt}</td>
        <td>
          <div class="actions-cell">
            ${userRole === 'admin' ? `
              <button class="btn-small btn-delete" onclick="deleteRanking('${entry.id}', '${entry.username}')">Eliminar</button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ============================================================================
// SETUP FILTROS
// ============================================================================

function setupFilters() {
  const difficultyFilter = document.getElementById('difficultyFilter');
  const sortBy = document.getElementById('sortBy');

  if (difficultyFilter) {
    difficultyFilter.addEventListener('change', applyFilters);
  }

  if (sortBy) {
    sortBy.addEventListener('change', applyFilters);
  }
}

// ============================================================================
// APLICAR FILTROS
// ============================================================================

function applyFilters() {
  const difficultyFilter = document.getElementById('difficultyFilter').value;
  const sortBy = document.getElementById('sortBy').value;

  // Filtrar por dificultad
  filteredRanking = allRanking.filter(entry => {
    if (difficultyFilter !== 'todos' && entry.difficulty_id !== difficultyFilter) {
      return false;
    }
    return true;
  });

  // Ordenar
  if (sortBy === 'captures') {
    filteredRanking.sort((a, b) => b.captured_count - a.captured_count);
  } else if (sortBy === 'percentage') {
    filteredRanking.sort((a, b) => {
      const percentageA = (a.captured_count / (a.captured_count + a.escaped_count)) * 100;
      const percentageB = (b.captured_count / (b.captured_count + b.escaped_count)) * 100;
      return percentageB - percentageA;
    });
  }

  renderTable(filteredRanking);
  updateRankingCount(filteredRanking.length);
}

// ============================================================================
// ELIMINAR ENTRADA DE RANKING (ADMIN)
// ============================================================================

async function deleteRanking(rankingId, username) {
  if (!confirm(`¿Eliminar la entrada de ranking de ${username}?`)) {
    return;
  }

  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch(`/api/ranking/${rankingId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (response.ok) {
      alert('Entrada eliminada correctamente');
      location.reload();
    } else {
      alert('Error al eliminar la entrada');
    }

  } catch (error) {
    console.error('Error eliminando ranking:', error);
  }
}

// ============================================================================
// ACTUALIZAR CONTADOR
// ============================================================================

function updateRankingCount(count) {
  const countElement = document.getElementById('rankingCount');
  if (countElement) {
    countElement.textContent = `Total partidas: ${count}`;
  }
}