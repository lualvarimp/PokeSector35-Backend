// ============================================================================
// POKÉSECTOR ADMIN PANEL - POKÉDEX.JS
// Gestión de Pokémon capturados del usuario
// ============================================================================

let userId = null;
let allPokemon = [];
let filteredPokemon = [];

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

  loadPokemon();
  setupControls();
  setupModal();
  setupPokeAPIAutocomplete();
});

// ============================================================================
// AUTOCOMPLETE CON POKEAPI
// ============================================================================

function setupPokeAPIAutocomplete() {
  const pokemonIdInput = document.getElementById('pokemonId');
  const pokemonNameInput = document.getElementById('pokemonName');

  if (pokemonIdInput) {
    pokemonIdInput.addEventListener('blur', async () => {
      const id = pokemonIdInput.value.trim();
      if (id) {
        await fetchPokemonFromAPI(id, 'id');
      }
    });
  }

  if (pokemonNameInput) {
    pokemonNameInput.addEventListener('blur', async () => {
      const name = pokemonNameInput.value.trim();
      if (name) {
        await fetchPokemonFromAPI(name, 'name');
      }
    });
  }
}

// ============================================================================
// FETCH POKEMON DE POKEAPI
// ============================================================================

async function fetchPokemonFromAPI(query, type) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
    
    if (!response.ok) {
      alert('Pokémon no encontrado en la PokeAPI');
      return;
    }

    const data = await response.json();
    
    // Rellenar campos
    document.getElementById('pokemonId').value = data.id;
    document.getElementById('pokemonName').value = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  } catch (error) {
    console.error('Error buscando Pokémon:', error);
    alert('Error al buscar en PokeAPI');
  }
}

// ============================================================================
// CARGAR POKÉMON CAPTURADOS
// ============================================================================

async function loadPokemon() {
  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch(`/api/users/${userId}/pokedex`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Error cargando Pokémon');
    }

    allPokemon = await response.json();
    filteredPokemon = [...allPokemon];
    renderPokemon(filteredPokemon);
    updateCount(filteredPokemon.length);

  } catch (error) {
    console.error('Error cargando Pokémon:', error);
  }
}

// ============================================================================
// RENDERIZAR POKÉMON
// ============================================================================

function renderPokemon(pokemon) {
  const tbody = document.getElementById('pokemonTableBody');

  if (pokemon.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="loading">No hay Pokémon capturados</td></tr>';
    return;
  }

  tbody.innerHTML = pokemon.map(p => `
    <tr>
      <td>#${p.pokemon_id}</td>
      <td>${p.pokemon_name}</td>
      <td>${p.slot_id || '-'}</td>
      <td>${new Date(p.captured_at).toLocaleDateString('es-ES')}</td>
      <td>
        <button class="btn-small-delete" onclick="deletePokemon(${p.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

// ============================================================================
// SETUP CONTROLES
// ============================================================================

function setupControls() {
  const searchInput = document.getElementById('pokemonSearch');
  const sortBy = document.getElementById('sortBy');
  const addBtn = document.getElementById('addPokemonBtn');

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (sortBy) {
    sortBy.addEventListener('change', applyFilters);
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => openAddModal());
  }
}

// ============================================================================
// APLICAR FILTROS
// ============================================================================

function applyFilters() {
  const searchTerm = document.getElementById('pokemonSearch').value.toLowerCase();
  const sortBy = document.getElementById('sortBy').value;

  // Filtrar por búsqueda
  filteredPokemon = allPokemon.filter(p => {
    return p.pokemon_name.toLowerCase().includes(searchTerm) || 
           p.pokemon_id.toString().includes(searchTerm);
  });

  // Ordenar
  if (sortBy === 'name') {
    filteredPokemon.sort((a, b) => a.pokemon_name.localeCompare(b.pokemon_name));
  } else if (sortBy === 'id') {
    filteredPokemon.sort((a, b) => a.pokemon_id - b.pokemon_id);
  }

  renderPokemon(filteredPokemon);
  updateCount(filteredPokemon.length);
}

// ============================================================================
// ELIMINAR POKÉMON
// ============================================================================

async function deletePokemon(pokemonId) {
  if (!confirm('¿Eliminar este Pokémon?')) {
    return;
  }

  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await fetch(`/api/users/${userId}/pokedex/${pokemonId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (response.ok) {
      alert('Pokémon eliminado');
      loadPokemon();
    } else {
      alert('Error al eliminar Pokémon');
    }

  } catch (error) {
    console.error('Error eliminando Pokémon:', error);
  }
}

// ============================================================================
// MODALES
// ============================================================================

function openAddModal() {
  document.getElementById('addPokemonModal').style.display = 'flex';
}

function closeAddModal() {
  document.getElementById('addPokemonModal').style.display = 'none';
  document.getElementById('addPokemonForm').reset();
}

// ============================================================================
// SETUP MODAL
// ============================================================================

function setupModal() {
  const form = document.getElementById('addPokemonForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await addPokemon();
    });
  }
}

// ============================================================================
// AÑADIR POKÉMON
// ============================================================================

async function addPokemon() {
  const pokemonId = document.getElementById('pokemonId').value;
  const pokemonName = document.getElementById('pokemonName').value.toUpperCase();
  const slotId = document.getElementById('slotId').value || null;
  const isGlobal = document.getElementById('isGlobal').checked;

  if (!pokemonId || !pokemonName) {
    alert('Por favor, rellena ID y nombre del Pokémon');
    return;
  }

  try {
    const accessToken = localStorage.getItem('access_token');
    
    console.log('Token:', accessToken);
    console.log('UserId:', userId);

    if (!accessToken) {
      alert('Token expirado. Por favor, vuelve a loguear');
      window.location.href = '/login';
      return;
    }

    const response = await fetch(`/api/users/${userId}/pokedex`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pokemon_id: parseInt(pokemonId),
        pokemon_name: pokemonName,
        slot_id: slotId ? parseInt(slotId) : null,
        is_global: isGlobal
      })
    });

    const data = await response.json();
    console.log('Response:', response.status, data);

    if (response.ok) {
      alert('Pokémon añadido correctamente');
      closeAddModal();
      await loadPokemon();
    } else {
      alert('Error: ' + (data.error || 'No se pudo añadir el Pokémon'));
    }

  } catch (error) {
    console.error('Error añadiendo Pokémon:', error);
    alert('Error en la operación: ' + error.message);
  }
}

// ============================================================================
// ACTUALIZAR CONTADOR
// ============================================================================

function updateCount(count) {
  const countElement = document.getElementById('pokemonCountTotal');
  if (countElement) {
    countElement.textContent = `Total: ${count} Pokémon capturados`;
  }
}