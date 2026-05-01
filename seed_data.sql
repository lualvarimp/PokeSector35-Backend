-- ============================================================================
-- SEED DATA - DATOS FICTICIOS PARA TESTING
-- ============================================================================
-- IMPORTANTE: Este archivo NO debe subirse a GitHub
-- Añade seed_data.sql al .gitignore
-- Todas las contraseñas son: testpass123
-- ============================================================================

-- ============================================================================
-- 1. INSERTAR USUARIOS FICTICIOS
-- ============================================================================
-- Usuario: Ash, Misty, Brock, Jessie, Luis (admin)
-- Contraseña (todas): testpass123

INSERT INTO users (username, password_hash, role, created_at) VALUES
('Ash', '$2b$10$V8nb0ZLMZIbPeKTnOIyav.UdLwSYvjh4Z0lVpNQYUe2yI/TFOXff6', 'user', NOW()),
('Misty', '$2b$10$V8nb0ZLMZIbPeKTnOIyav.UdLwSYvjh4Z0lVpNQYUe2yI/TFOXff6', 'user', NOW()),
('Brock', '$2b$10$V8nb0ZLMZIbPeKTnOIyav.UdLwSYvjh4Z0lVpNQYUe2yI/TFOXff6', 'user', NOW()),
('Jessie', '$2b$10$V8nb0ZLMZIbPeKTnOIyav.UdLwSYvjh4Z0lVpNQYUe2yI/TFOXff6', 'user', NOW()),
('Luis', '$2b$10$V8nb0ZLMZIbPeKTnOIyav.UdLwSYvjh4Z0lVpNQYUe2yI/TFOXff6', 'admin', NOW());

-- ============================================================================
-- 2. INSERTAR SLOTS DE PARTIDAS
-- ============================================================================

INSERT INTO game_slots (user_id, slot_number, explorer, explorer_name, color, difficulty_id, hp, pokeball, position_r, position_c, is_game_over, is_goal, updated_at) VALUES
(1, 1, 'boy', 'ASH', '#019273', 'normal', 8, 15, 5, 7, false, false, NOW()),
(1, 2, 'boy', 'ASH', '#019273', 'dificil', 3, 5, 2, 3, true, false, NOW()),
(1, 3, 'boy', 'ASH', '#019273', 'facil', 10, 20, 0, 0, false, true, NOW()),
(2, 1, 'girl', 'MISTY', '#ecf0f1', 'normal', 6, 12, 4, 4, false, false, NOW()),
(2, 2, 'girl', 'MISTY', '#ecf0f1', 'infernal', 2, 3, 1, 1, true, false, NOW()),
(3, 1, 'professor', 'BROCK', '#8e44ad', 'normal', 7, 18, 6, 2, false, false, NOW()),
(4, 1, 'boy', 'JESSIE', '#e74c3c', 'dificil', 5, 8, 3, 5, false, false, NOW()),
(5, 1, 'admin', 'LUIS', '#FFD700', 'normal', 10, 25, 0, 0, false, false, NOW());

-- ============================================================================
-- 3. INSERTAR POKÉMON CAPTURADOS
-- ============================================================================

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
(1, 3, 25, 'PIKACHU', true, NOW()),
(1, 3, 58, 'GROWLITHE', true, NOW()),
(1, 3, 63, 'ABRA', true, NOW()),
(1, 3, 74, 'GEODUDE', false, NOW()),
(2, 1, 54, 'PSYDUCK', true, NOW()),
(2, 1, 55, 'GOLDUCK', true, NOW()),
(2, 1, 60, 'POLIWAG', true, NOW()),
(2, 1, 79, 'SLOWPOKE', false, NOW()),
(2, 1, 86, 'SEEL', true, NOW()),
(2, 1, 90, 'SHELLDER', true, NOW()),
(2, 1, 98, 'KRABBY', true, NOW()),
(2, 1, 120, 'STARYU', false, NOW()),
(3, 1, 95, 'ONIX', true, NOW()),
(3, 1, 111, 'RHYHORN', true, NOW()),
(3, 1, 27, 'SANDSHREW', true, NOW()),
(3, 1, 74, 'GEODUDE', true, NOW()),
(3, 1, 92, 'GASTLY', false, NOW()),
(3, 1, 104, 'CUBONE', true, NOW()),
(3, 1, 50, 'DIGLETT', false, NOW()),
(3, 1, 31, 'NIDOQUEEN', true, NOW()),
(4, 1, 25, 'PIKACHU', true, NOW()),
(4, 1, 37, 'VULPIX', true, NOW()),
(4, 1, 38, 'NINETALES', true, NOW()),
(4, 1, 58, 'GROWLITHE', false, NOW()),
(4, 1, 77, 'PONYTA', true, NOW()),
(4, 1, 78, 'RAPIDASH', false, NOW()),
(5, 1, 1, 'BULBASAUR', true, NOW()),
(5, 1, 2, 'IVYSAUR', true, NOW()),
(5, 1, 3, 'VENUSAUR', true, NOW()),
(5, 1, 4, 'CHARMANDER', true, NOW()),
(5, 1, 6, 'CHARIZARD', true, NOW());

-- ============================================================================
-- 4. INSERTAR RANKINGS
-- ============================================================================

INSERT INTO ranking (user_id, captured_count, escaped_count, difficulty_id, completed_at) VALUES
(1, 12, 3, 'normal', NOW() - INTERVAL '7 days'),
(1, 8, 7, 'normal', NOW() - INTERVAL '5 days'),
(1, 15, 2, 'dificil', NOW() - INTERVAL '3 days'),
(1, 18, 1, 'normal', NOW() - INTERVAL '2 days'),
(1, 11, 4, 'facil', NOW() - INTERVAL '1 day'),
(1, 20, 0, 'facil', NOW()),
(2, 14, 2, 'normal', NOW() - INTERVAL '6 days'),
(2, 9, 6, 'normal', NOW() - INTERVAL '4 days'),
(2, 16, 3, 'dificil', NOW() - INTERVAL '2 days'),
(2, 13, 5, 'normal', NOW()),
(3, 16, 1, 'normal', NOW() - INTERVAL '5 days'),
(3, 11, 5, 'normal', NOW() - INTERVAL '3 days'),
(3, 17, 2, 'dificil', NOW() - INTERVAL '1 day'),
(3, 19, 1, 'infernal', NOW()),
(4, 10, 8, 'normal', NOW() - INTERVAL '4 days'),
(4, 13, 4, 'dificil', NOW() - INTERVAL '2 days'),
(4, 12, 3, 'normal', NOW()),
(5, 15, 2, 'normal', NOW() - INTERVAL '3 days'),
(5, 18, 1, 'normal', NOW());

-- ============================================================================
-- 5. INSERTAR REFRESH_TOKENS
-- ============================================================================

INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDQ0NDgwMCwiZXhwIjoxNzE1MDQ5NjAwfQ.refresh_token_ash_sample_1', NOW() + INTERVAL '7 days', NOW()),
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNDM0NDgwMCwiZXhwIjoxNzE1MDQ5NjAwfQ.refresh_token_ash_sample_2', NOW() + INTERVAL '6 days', NOW() - INTERVAL '1 day'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNDQ0NDgwMCwiZXhwIjoxNzE1MDQ5NjAwfQ.refresh_token_misty_sample_1', NOW() + INTERVAL '7 days', NOW()),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxNDQ0NDgwMCwiZXhwIjoxNzE1MDQ5NjAwfQ.refresh_token_brock_sample_1', NOW() + INTERVAL '5 days', NOW() - INTERVAL '2 days'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcxNDQ0NDgwMCwiZXhwIjoxNzE1MDQ5NjAwfQ.refresh_token_jessie_sample_1', NOW() + INTERVAL '4 days', NOW() - INTERVAL '3 days'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcxNDQ0NDgwMCwiZXhwIjoxNzE1MDQ5NjAwfQ.refresh_token_luis_admin_sample_1', NOW() + INTERVAL '7 days', NOW());

-- ============================================================================
-- 6. INSERTAR GAME_REPLAY
-- ============================================================================

INSERT INTO game_replay (slot_id, user_id, movements, completed_at) VALUES
(1, 1, '[
  {"hp": 10, "r": 0, "c": 0, "pok": 0},
  {"hp": 10, "r": 1, "c": 0, "pok": 0},
  {"hp": 10, "r": 2, "c": 0, "pok": 1},
  {"hp": 10, "r": 3, "c": 0, "pok": 1},
  {"hp": 10, "r": 4, "c": 0, "pok": 2},
  {"hp": 10, "r": 5, "c": 0, "pok": 2},
  {"hp": 10, "r": 5, "c": 1, "pok": 3},
  {"hp": 10, "r": 5, "c": 2, "pok": 3},
  {"hp": 9, "r": 5, "c": 3, "pok": 3},
  {"hp": 9, "r": 5, "c": 4, "pok": 4},
  {"hp": 9, "r": 5, "c": 5, "pok": 4},
  {"hp": 9, "r": 5, "c": 6, "pok": 4},
  {"hp": 9, "r": 5, "c": 7, "pok": 5},
  {"hp": 8, "r": 4, "c": 7, "pok": 5},
  {"hp": 8, "r": 3, "c": 7, "pok": 5},
  {"hp": 8, "r": 2, "c": 7, "pok": 6},
  {"hp": 8, "r": 2, "c": 6, "pok": 6},
  {"hp": 8, "r": 2, "c": 5, "pok": 6},
  {"hp": 8, "r": 2, "c": 4, "pok": 7},
  {"hp": 8, "r": 2, "c": 3, "pok": 7}
]'::json, NOW() - INTERVAL '1 hour'),
(3, 1, '[
  {"hp": 10, "r": 0, "c": 0, "pok": 0},
  {"hp": 10, "r": 1, "c": 0, "pok": 0},
  {"hp": 10, "r": 2, "c": 0, "pok": 1},
  {"hp": 10, "r": 3, "c": 0, "pok": 1},
  {"hp": 10, "r": 4, "c": 0, "pok": 2},
  {"hp": 10, "r": 5, "c": 0, "pok": 2},
  {"hp": 10, "r": 5, "c": 1, "pok": 2},
  {"hp": 10, "r": 5, "c": 2, "pok": 3},
  {"hp": 10, "r": 5, "c": 3, "pok": 3},
  {"hp": 10, "r": 5, "c": 4, "pok": 3},
  {"hp": 10, "r": 5, "c": 5, "pok": 3},
  {"hp": 10, "r": 5, "c": 6, "pok": 3},
  {"hp": 10, "r": 5, "c": 7, "pok": 3},
  {"hp": 10, "r": 5, "c": 8, "pok": 3},
  {"hp": 10, "r": 5, "c": 9, "pok": 3},
  {"hp": 10, "r": 4, "c": 9, "pok": 3},
  {"hp": 10, "r": 3, "c": 9, "pok": 3},
  {"hp": 10, "r": 2, "c": 9, "pok": 3},
  {"hp": 10, "r": 1, "c": 9, "pok": 3},
  {"hp": 10, "r": 0, "c": 9, "pok": 3},
  {"hp": 10, "r": 0, "c": 10, "pok": 3},
  {"hp": 10, "r": 0, "c": 11, "pok": 3},
  {"hp": 10, "r": 0, "c": 12, "pok": 3},
  {"hp": 10, "r": 0, "c": 13, "pok": 3},
  {"hp": 10, "r": 0, "c": 14, "pok": 3}
]'::json, NOW() - INTERVAL '2 days'),
(4, 2, '[
  {"hp": 10, "r": 0, "c": 0, "pok": 0},
  {"hp": 10, "r": 1, "c": 0, "pok": 1},
  {"hp": 10, "r": 2, "c": 0, "pok": 1},
  {"hp": 10, "r": 3, "c": 0, "pok": 2},
  {"hp": 10, "r": 4, "c": 0, "pok": 2},
  {"hp": 10, "r": 4, "c": 1, "pok": 2},
  {"hp": 9, "r": 4, "c": 2, "pok": 2},
  {"hp": 9, "r": 4, "c": 3, "pok": 3},
  {"hp": 9, "r": 4, "c": 4, "pok": 3},
  {"hp": 9, "r": 3, "c": 4, "pok": 3},
  {"hp": 9, "r": 2, "c": 4, "pok": 3},
  {"hp": 9, "r": 1, "c": 4, "pok": 3},
  {"hp": 9, "r": 0, "c": 4, "pok": 3},
  {"hp": 9, "r": 0, "c": 5, "pok": 4},
  {"hp": 9, "r": 0, "c": 6, "pok": 4},
  {"hp": 8, "r": 1, "c": 6, "pok": 4},
  {"hp": 8, "r": 2, "c": 6, "pok": 5},
  {"hp": 8, "r": 3, "c": 6, "pok": 5}
]'::json, NOW() - INTERVAL '30 minutes'),
(6, 3, '[
  {"hp": 10, "r": 0, "c": 0, "pok": 0},
  {"hp": 10, "r": 1, "c": 0, "pok": 0},
  {"hp": 10, "r": 2, "c": 0, "pok": 1},
  {"hp": 10, "r": 3, "c": 0, "pok": 1},
  {"hp": 10, "r": 4, "c": 0, "pok": 2},
  {"hp": 10, "r": 5, "c": 0, "pok": 2},
  {"hp": 10, "r": 6, "c": 0, "pok": 3},
  {"hp": 10, "r": 6, "c": 1, "pok": 3},
  {"hp": 10, "r": 6, "c": 2, "pok": 4},
  {"hp": 10, "r": 6, "c": 3, "pok": 4},
  {"hp": 10, "r": 5, "c": 3, "pok": 4},
  {"hp": 10, "r": 4, "c": 3, "pok": 4},
  {"hp": 10, "r": 3, "c": 3, "pok": 5},
  {"hp": 10, "r": 2, "c": 3, "pok": 5},
  {"hp": 10, "r": 2, "c": 4, "pok": 5},
  {"hp": 10, "r": 2, "c": 5, "pok": 6},
  {"hp": 10, "r": 2, "c": 6, "pok": 6},
  {"hp": 10, "r": 1, "c": 6, "pok": 6},
  {"hp": 10, "r": 0, "c": 6, "pok": 6},
  {"hp": 10, "r": 0, "c": 7, "pok": 6},
  {"hp": 10, "r": 0, "c": 8, "pok": 7},
  {"hp": 10, "r": 0, "c": 9, "pok": 8}
]'::json, NOW() - INTERVAL '12 hours'),
(7, 4, '[
  {"hp": 10, "r": 0, "c": 0, "pok": 0},
  {"hp": 10, "r": 1, "c": 0, "pok": 0},
  {"hp": 10, "r": 2, "c": 0, "pok": 1},
  {"hp": 10, "r": 3, "c": 0, "pok": 1},
  {"hp": 9, "r": 4, "c": 0, "pok": 1},
  {"hp": 9, "r": 4, "c": 1, "pok": 2},
  {"hp": 9, "r": 4, "c": 2, "pok": 2},
  {"hp": 9, "r": 3, "c": 2, "pok": 2},
  {"hp": 8, "r": 2, "c": 2, "pok": 3},
  {"hp": 8, "r": 1, "c": 2, "pok": 3},
  {"hp": 8, "r": 0, "c": 2, "pok": 3},
  {"hp": 8, "r": 0, "c": 3, "pok": 3},
  {"hp": 7, "r": 0, "c": 4, "pok": 3},
  {"hp": 7, "r": 1, "c": 4, "pok": 4},
  {"hp": 7, "r": 2, "c": 4, "pok": 4},
  {"hp": 7, "r": 3, "c": 4, "pok": 4}
]'::json, NOW() - INTERVAL '45 minutes'),
(8, 5, '[
  {"hp": 10, "r": 0, "c": 0, "pok": 0},
  {"hp": 10, "r": 1, "c": 0, "pok": 1},
  {"hp": 10, "r": 2, "c": 0, "pok": 1},
  {"hp": 10, "r": 3, "c": 0, "pok": 2},
  {"hp": 10, "r": 4, "c": 0, "pok": 2},
  {"hp": 10, "r": 5, "c": 0, "pok": 3},
  {"hp": 10, "r": 5, "c": 1, "pok": 3},
  {"hp": 10, "r": 5, "c": 2, "pok": 4},
  {"hp": 10, "r": 5, "c": 3, "pok": 4},
  {"hp": 10, "r": 5, "c": 4, "pok": 5},
  {"hp": 10, "r": 4, "c": 4, "pok": 5},
  {"hp": 10, "r": 3, "c": 4, "pok": 5},
  {"hp": 10, "r": 2, "c": 4, "pok": 5},
  {"hp": 10, "r": 1, "c": 4, "pok": 5},
  {"hp": 10, "r": 0, "c": 4, "pok": 5},
  {"hp": 10, "r": 0, "c": 5, "pok": 6},
  {"hp": 10, "r": 0, "c": 6, "pok": 6},
  {"hp": 10, "r": 0, "c": 7, "pok": 7},
  {"hp": 10, "r": 0, "c": 8, "pok": 7},
  {"hp": 10, "r": 0, "c": 9, "pok": 8},
  {"hp": 10, "r": 1, "c": 9, "pok": 8},
  {"hp": 10, "r": 2, "c": 9, "pok": 8},
  {"hp": 10, "r": 3, "c": 9, "pok": 8},
  {"hp": 10, "r": 4, "c": 9, "pok": 9},
  {"hp": 10, "r": 5, "c": 9, "pok": 9},
  {"hp": 10, "r": 5, "c": 10, "pok": 9},
  {"hp": 10, "r": 5, "c": 11, "pok": 9},
  {"hp": 10, "r": 5, "c": 12, "pok": 10}
]'::json, NOW() - INTERVAL '6 hours');

-- ============================================================================
-- FIN DEL SEED DATA
-- Contraseña de todos los usuarios: testpass123
-- ============================================================================