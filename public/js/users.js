// ============================================================================
// POKÉSECTOR ADMIN PANEL - USERS.JS
// Gestión de tabla de usuarios con filtros y acciones
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');
  const userRole = localStorage.getItem('user_role');

  if (!accessToken || !userId) {
    window.location.href = '/login';
    return;
  }

  loadUsers(userRole, userId);
  setupFilters();
  setupSorting();
});

let allUsers = [];
let filteredUsers = [];
let currentSort = { field: null, direction: 'asc' };

// ============================================================================
// CARGAR USUARIOS
// ============================================================================

async function loadUsers(userRole, userId) {
  try {
    const accessToken = localStorage.getItem('access_token');

    let users = [];

    if (userRole === 'admin') {
      // Admin ve todos los usuarios
      const response = await fetch('/api/users', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      users = await response.json();
    } else {
      // User solo ve sus propios datos
      const response = await fetch(`/api/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const user = await response.json();
      users = [user];
    }

    allUsers = users;
    filteredUsers = [...allUsers];
    renderTable(filteredUsers, userRole);
    updateUserCount(filteredUsers.length);

  } catch (error) {
    console.error('Error cargando usuarios:', error);
  }
}

// ============================================================================
// RENDERIZAR TABLA
// ============================================================================

function renderTable(users, userRole) {
  const tbody = document.getElementById('usersTableBody');
  
  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="loading">No hay usuarios para mostrar</td></tr>';
    return;
  }

  tbody.innerHTML = users.map(user => {
    const createdAt = new Date(user.createdAt).toLocaleDateString('es-ES');
    
    return `
      <tr>
        <td>${user.username}</td>
        <td>-</td>
        <td><span class="role-badge ${user.role}">${user.role}</span></td>
        <td>${createdAt}</td>
        <td>
          <div class="actions-cell">
            <button class="btn-small btn-view" onclick="viewUser('${user.id}')">Ver</button>
            ${userRole === 'admin' ? `
              <button class="btn-small btn-delete" onclick="deleteUser('${user.id}', '${user.username}')">Eliminar</button>
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
  const roleFilter = document.getElementById('roleFilter');
  
  if (roleFilter) {
    roleFilter.addEventListener('change', applyFilters);
  }
}

// ============================================================================
// APLICAR FILTROS
// ============================================================================

function applyFilters() {
  const roleFilter = document.getElementById('roleFilter').value;
  const userRole = localStorage.getItem('user_role');

  filteredUsers = allUsers.filter(user => {
    if (roleFilter !== 'todos' && user.role !== roleFilter) {
      return false;
    }
    return true;
  });

  // Aplicar ordenamiento actual
  if (currentSort.field) {
    sortUsers(currentSort.field, currentSort.direction);
  } else {
    renderTable(filteredUsers, userRole);
  }

  updateUserCount(filteredUsers.length);
}

// ============================================================================
// SETUP SORTING
// ============================================================================

function setupSorting() {
  const usernameHeader = document.getElementById('usernameHeader');
  const explorerHeader = document.getElementById('explorerHeader');
  const roleHeader = document.getElementById('roleHeader');

  if (usernameHeader) {
    usernameHeader.addEventListener('click', () => {
      toggleSort('username', usernameHeader);
    });
  }

  if (explorerHeader) {
    explorerHeader.addEventListener('click', () => {
      toggleSort('explorer', explorerHeader);
    });
  }

  if (roleHeader) {
    roleHeader.addEventListener('click', () => {
      toggleSort('role', roleHeader);
    });
  }
}

// ============================================================================
// TOGGLE SORTING
// ============================================================================

function toggleSort(field, headerElement) {
  const userRole = localStorage.getItem('user_role');

  // Si es el mismo campo, cambiar dirección. Si es otro, empezar con asc
  if (currentSort.field === field) {
    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    // Limpiar clases de otros headers
    document.querySelectorAll('th.sortable').forEach(th => {
      th.classList.remove('sort-asc', 'sort-desc');
    });
    currentSort.field = field;
    currentSort.direction = 'asc';
  }

  // Añadir clase al header actual
  headerElement.classList.remove('sort-asc', 'sort-desc');
  headerElement.classList.add(`sort-${currentSort.direction}`);

  sortUsers(field, currentSort.direction);
  renderTable(filteredUsers, userRole);
}

// ============================================================================
// ORDENAR USUARIOS
// ============================================================================

function sortUsers(field, direction) {
  filteredUsers.sort((a, b) => {
    let aValue, bValue;

    if (field === 'username') {
      aValue = a.username;
      bValue = b.username;
    } else if (field === 'explorer') {
      aValue = a.explorer_name || '';
      bValue = b.explorer_name || '';
    } else if (field === 'role') {
      aValue = a.role;
      bValue = b.role;
    }

    // Comparación alfabética (case-insensitive)
    aValue = aValue.toLowerCase();
    bValue = bValue.toLowerCase();

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

// ============================================================================
// VER USUARIO
// ============================================================================

function viewUser(userId) {
  window.location.href = `/admin/users/${userId}`;
}

// ============================================================================
// ELIMINAR USUARIO
// ============================================================================

async function deleteUser(userId, username) {
  if (!confirm(`¿Estás seguro de que quieres eliminar a ${username}?`)) {
    return;
  }

  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (response.ok) {
      alert('Usuario eliminado correctamente');
      location.reload();
    } else {
      alert('Error al eliminar el usuario');
    }

  } catch (error) {
    console.error('Error eliminando usuario:', error);
  }
}

// ============================================================================
// ACTUALIZAR CONTADOR
// ============================================================================

function updateUserCount(count) {
  const countElement = document.getElementById('userCount');
  if (countElement) {
    countElement.textContent = `Total usuarios: ${count}`;
  }
}