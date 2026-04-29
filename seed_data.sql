-- ============================================================================
-- SEED DATA - DATOS FICTICIOS PARA TESTING
-- ============================================================================
-- Este archivo contiene datos de ejemplo para probar el backend.
-- Se ejecuta automáticamente después de crear las tablas.
-- ============================================================================

-- ============================================================================
-- 1. INSERTAR USUARIOS FICTICIOS
-- ============================================================================
-- Creamos 5 usuarios: 4 normales (user) + 1 admin

INSERT INTO users (username, password_hash, role, created_at) VALUES
('Ash', '$2b$10$YourHashedPasswordHere1', 'user', NOW()),
('Misty', '$2b$10$YourHashedPasswordHere2', 'user', NOW()),
('Brock', '$2b$10$YourHashedPasswordHere3', 'user', NOW()),
('Jessie', '$2b$10$YourHashedPasswordHere4', 'user', NOW()),
('James', '$2b$10$YourHashedPasswordHere5', 'admin', NOW());

-- ============================================================================
-- 2. INSERTAR SLOTS DE PARTIDAS
-- ============================================================================
-- Cada usuario puede tener máximo 3 slots (partidas guardadas).
-- Algunos slots están en progreso (is_game_over = false)
-- Otros completados (is_goal = true) o perdidos (is_game_over = true)

INSERT INTO game_slots (user_id, slot_number, explorer, explorer_name, color, difficulty_id, hp, pokeball, position_r, position_c, is_game_over, is_goal, updated_at) VALUES
-- Ash (usuario 1) - 3 slots diferentes
(1, 1, 'boy', 'ASH', '#019273', 'normal', 8, 15, 5, 7, false, false, NOW()),
(1, 2, 'boy', 'ASH', '#019273', 'dificil', 3, 5, 2, 3, true, false, NOW()),
(1, 3, 'boy', 'ASH', '#019273', 'facil', 10, 20, 0, 0, false, true, NOW()),

-- Misty (usuario 2) - 2 slots
(2, 1, 'girl', 'MISTY', '#ecf0f1', 'normal', 6, 12, 4, 4, false, false, NOW()),
(2, 2, 'girl', 'MISTY', '#ecf0f1', 'infernal', 2, 3, 1, 1, true, false, NOW()),

-- Brock (usuario 3) - 1 slot
(3, 1, 'professor', 'BROCK', '#8e44ad', 'normal', 7, 18, 6, 2, false, false, NOW()),

-- Jessie (usuario 4) - 1 slot
(4, 1, 'boy', 'JAMES', '#e74c3c', 'dificil', 5, 8, 3, 5, false, false, NOW());

-- ============================================================================
-- 3. INSERTAR POKÉMON CAPTURADOS
-- ============================================================================
-- Cada captura tiene is_global: true/false
-- true = forma parte de la Pokédex permanente del usuario
-- false = captura temporal de una partida en progreso

-- Ash (usuario 1) - Slot 1 activo (11 Pokémon capturados, 1 escapado)
INSERT INTO captured_pokemon (user_id, slot_id, pokemon_id, pokemon_name, is_global, captured_at) VALUES
(1, 1, 25, 'PIKACHU', true, NOW()),
(1, 1, 26, 'RAICHU', true, NOW()),
(1, 1, 4, 'CHARMANDER', true, NOW()),
(1, 1, 5, 'CHARMELEON', false, NOW()),
(1, 1, 7, 'SQUIRTLE', true, NOW()),
(1, 1, 69, 'BELLSPROUT', true, NOW()),
(1, 1, 52, 'MEOWTH', true, NOW()),
(1, 1, 54, 'PSYDUCK', false, NOW()),
(1, 1, 16, 'PIDGEOT', true, NOW()),
(1, 1, 21, 'SPEAROW', false, NOW()),
(1, 1, 23, 'EKANS', false, NOW()),
(1, 1, 29, 'NIDORAN', true, NOW()),

-- Ash - Slot 3 completado (3 Pokémon únicos capturados)
(1, 3, 25, 'PIKACHU', true, NOW()),
(1, 3, 58, 'GROWLITHE', true, NOW()),
(1, 3, 63, 'ABRA', true, NOW()),
(1, 3, 74, 'GEODUDE', false, NOW()),

-- Misty (usuario 2) - Slot 1 (8 Pokémon capturados, 2 escapados)
(2, 1, 54, 'PSYDUCK', true, NOW()),
(2, 1, 55, 'GOLDUCK', true, NOW()),
(2, 1, 60, 'POLIWAG', true, NOW()),
(2, 1, 79, 'SLOWPOKE', false, NOW()),
(2, 1, 86, 'SEEL', true, NOW()),
(2, 1, 90, 'SHELLDER', true, NOW()),
(2, 1, 98, 'KRABBY', true, NOW()),
(2, 1, 120, 'STARYU', false, NOW()),

-- Brock (usuario 3) - Slot 1 (8 Pokémon capturados, 1 escapado)
(3, 1, 95, 'ONIX', true, NOW()),
(3, 1, 111, 'RHYHORN', true, NOW()),
(3, 1, 27, 'SANDSHREW', true, NOW()),
(3, 1, 74, 'GEODUDE', true, NOW()),
(3, 1, 92, 'GASTLY', false, NOW()),
(3, 1, 104, 'CUBONE', true, NOW()),
(3, 1, 50, 'DIGLETT', false, NOW()),
(3, 1, 31, 'NIDOQUEEN', true, NOW()),

-- Jessie (usuario 4) - Slot 1 (6 Pokémon capturados, 1 escapado)
(4, 1, 25, 'PIKACHU', true, NOW()),
(4, 1, 37, 'VULPIX', true, NOW()),
(4, 1, 38, 'NINETALES', true, NOW()),
(4, 1, 58, 'GROWLITHE', false, NOW()),
(4, 1, 77, 'PONYTA', true, NOW()),
(4, 1, 78, 'RAPIDASH', false, NOW());

-- ============================================================================
-- 4. INSERTAR RANKINGS (PARTIDAS COMPLETADAS)
-- ============================================================================
-- Cada entrada en ranking es UNA partida finalizada.
-- Solo aparecen en el ranking las partidas con mínimo 10 encuentros.
-- Se guardan con timestamp para poder ver progreso en el tiempo.

-- Ash (usuario 1) - 6 partidas completadas
INSERT INTO ranking (user_id, captured_count, escaped_count, difficulty_id, completed_at) VALUES
(1, 12, 3, 'normal', NOW() - INTERVAL '7 days'),
(1, 8, 7, 'normal', NOW() - INTERVAL '5 days'),
(1, 15, 2, 'dificil', NOW() - INTERVAL '3 days'),
(1, 18, 1, 'normal', NOW() - INTERVAL '2 days'),
(1, 11, 4, 'facil', NOW() - INTERVAL '1 day'),
(1, 20, 0, 'facil', NOW()),

-- Misty (usuario 2) - 4 partidas completadas
(2, 14, 2, 'normal', NOW() - INTERVAL '6 days'),
(2, 9, 6, 'normal', NOW() - INTERVAL '4 days'),
(2, 16, 3, 'dificil', NOW() - INTERVAL '2 days'),
(2, 13, 5, 'normal', NOW()),

-- Brock (usuario 3) - 4 partidas completadas
(3, 16, 1, 'normal', NOW() - INTERVAL '5 days'),
(3, 11, 5, 'normal', NOW() - INTERVAL '3 days'),
(3, 17, 2, 'dificil', NOW() - INTERVAL '1 day'),
(3, 19, 1, 'infernal', NOW()),

-- Jessie (usuario 4) - 3 partidas completadas
(4, 10, 8, 'normal', NOW() - INTERVAL '4 days'),
(4, 13, 4, 'dificil', NOW() - INTERVAL '2 days'),
(4, 12, 3, 'normal', NOW());

-- ============================================================================
-- FIN DEL SEED DATA
-- ============================================================================