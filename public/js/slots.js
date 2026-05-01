// ============================================================================
// POKÉSECTOR ADMIN PANEL - SLOTS.JS
// Gestión de slots de partida del usuario
// ============================================================================

let userId = null;
let allSlots = [];
let filteredSlots = [];
let editingSlotId = null;

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    window.location.href = '/login';
    return;
  }

  // Obtener userId de la URL
  const urlParams = new URLSearchParams(window.location.search);
  userId = urlParams.get('userId');

  if (!userId) {
    window.location.href = '/admin/users';
    return;
  }

  loadSlots();
  setupControls();
});

// ============================================================================
// CARGAR SLOTS
// ============================================================================

async function loadSlots() {
  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch(`/api/users/${userId}/slots`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Error cargando slots');
    }

    allSlots = await response.json();
    filteredSlots = [...allSlots];
    renderSlots(filteredSlots);

  } catch (error) {
    console.error('Error cargando slots:', error);
  }
}

// ============================================================================
// RENDERIZAR SLOTS
// ============================================================================

function renderSlots(slots) {
  const grid = document.getElementById('slotsGrid');

  if (slots.length === 0 && allSlots.length === 0) {
    grid.innerHTML = '<div class="slot-card loading">No hay slots creados</div>';
    return;
  }

  grid.innerHTML = slots.map(slot => `
    <div class="slot-card" style="background: linear-gradient(135deg, ${slot.color}dd, ${slot.color}aa);">
      <div class="slot-avatar-section">
        <div class="slot-avatar-circle">${slot.explorer.charAt(0).toUpperCase()}</div>
        <div class="slot-number-top">Slot ${slot.slot_number}</div>
      </div>

      <div class="slot-header">
        <span></span>
        <div class="slot-status ${slot.game_status || 'empty'}">
          ${slot.game_status === 'active' ? 'En progreso' : 'Vacío'}
        </div>
      </div>

      <div class="slot-content">
        <div class="slot-explorer">👤 ${slot.explorer || 'Sin nombre'}</div>
        
        <div class="slot-info-item">
          <span class="slot-info-label">Estado:</span>
          <span class="slot-info-value">${slot.game_status === 'active' ? 'En progreso' : 'Vacío'}</span>
        </div>

        <div class="slot-info-item">
          <span class="slot-info-label">Dificultad:</span>
          <div class="slot-difficulty ${slot.difficulty_id}">
            ${capitalizeFirst(slot.difficulty_id)}
          </div>
        </div>

        <div class="slot-info-item">
          <span class="slot-info-label">Fecha de Creación:</span>
          <span class="slot-info-value">${new Date(slot.createdAt).toLocaleDateString('es-ES')}</span>
        </div>

        <div class="slot-info-item">
          <span class="slot-info-label">Color de Consola:</span>
          <div class="slot-color-circle" style="background-color: ${slot.color};"></div>
        </div>

        <div class="slot-stats">
          <span>🎮 Pokémon capturados: ${slot.captured_count || 0}</span>
        </div>
      </div>

      <div class="slot-actions">
        <button class="btn-slot btn-edit" onclick="editSlot(${slot.id})">Editar</button>
        <button class="btn-slot btn-delete" onclick="deleteSlot(${slot.id})">Eliminar</button>
      </div>
    </div>
  `).join('');
}

// ============================================================================
// SETUP CONTROLES
// ============================================================================

function setupControls() {
  const searchInput = document.getElementById('slotSearch');
  const createBtn = document.getElementById('createSlotBtn');

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (createBtn) {
    createBtn.addEventListener('click', () => openSlotModal());
  }
}

// ============================================================================
// APLICAR FILTROS
// ============================================================================

function applyFilters() {
  const searchTerm = document.getElementById('slotSearch').value.toLowerCase();

  filteredSlots = allSlots.filter(slot => {
    return slot.explorer.toLowerCase().includes(searchTerm) || 
           slot.slot_number.toString().includes(searchTerm);
  });

  renderSlots(filteredSlots);
}

// ============================================================================
// MODAL
// ============================================================================

function openSlotModal(slotId = null) {
  editingSlotId = slotId;
  const modal = document.getElementById('slotModal');
  const title = document.getElementById('modalTitle');
  const form = document.getElementById('slotForm');

  form.reset();
  document.getElementById('slotColor').value = '#019273'; // Verde por defecto

  if (slotId) {
    title.textContent = 'Editar Slot';
    const slot = allSlots.find(s => s.id === slotId);
    if (slot) {
      document.getElementById('slotNumber').value = slot.slot_number;
      document.getElementById('explorerName').value = slot.explorer;
      document.getElementById('difficulty').value = slot.difficulty_id;
      document.getElementById('slotColor').value = slot.color;
    }
  } else {
    title.textContent = 'Crear Nuevo Slot';
  }

  modal.style.display = 'flex';
}

// ============================================================================
// EDITAR SLOT
// ============================================================================

async function editSlot(slotId) {
  openSlotModal(slotId);
}

// ============================================================================
// GUARDAR SLOT
// ============================================================================

async function saveSlot() {
  const slotNumber = document.getElementById('slotNumber').value;
  const explorerName = document.getElementById('explorerName').value;
  const difficulty = document.getElementById('difficulty').value;
  const color = document.getElementById('slotColor').value;

  if (!slotNumber || !explorerName || !difficulty || !color) {
    alert('Por favor, rellena todos los campos');
    return;
  }

  try {
    const accessToken = localStorage.getItem('access_token');

    let url = `/api/users/${userId}/slots`;
    let method = 'POST';
    let body = {
      slot_number: parseInt(slotNumber),
      explorer_name: explorerName,
      difficulty_id: difficulty,
      color: color
    };

    if (editingSlotId) {
      url += `/${editingSlotId}`;
      method = 'PUT';
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      alert(editingSlotId ? 'Slot actualizado' : 'Slot creado correctamente');
      closeSlotModal();
      loadSlots();
    } else {
      alert('Error: ' + (data.error || 'No se pudo guardar el slot'));
    }

  } catch (error) {
    console.error('Error guardando slot:', error);
    alert('Error en la operación: ' + error.message);
  }
}

// ============================================================================
// ELIMINAR SLOT
// ============================================================================

async function deleteSlot(slotId) {
  if (!confirm('¿Eliminar este slot? Se perderán todos los datos asociados.')) {
    return;
  }

  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch(`/api/users/${userId}/slots/${slotId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (response.ok) {
      alert('Slot eliminado');
      loadSlots();
    } else {
      alert('Error al eliminar slot');
    }

  } catch (error) {
    console.error('Error eliminando slot:', error);
  }
}

// ============================================================================
// UTILIDADES
// ============================================================================

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}