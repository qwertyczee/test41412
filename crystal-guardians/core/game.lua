
-- core/game.lua
-- Initializes the main game structures and state management.

-- Require necessary modules
local Progression = require("modules.progression")

-- Global Game table to hold all game-related data and states
Game = {
    progression = Progression, -- Add the progression module instance
    state = "menu", -- Initial game state (e.g., menu, playing, paused, gameover)
    map = nil, -- TODO: Load map data
    towers = {}, -- Table to hold active towers
    enemies = {}, -- Table to hold active enemies
    waves = nil, -- TODO: Initialize wave manager
    -- Resources are now managed by the Progression module
    -- Access via Game.progression.playerData.gold, etc.
    player = {
        lives = 20, -- Starting lives (Consider moving this to Progression.playerData if it persists across levels/modes)
        score = 0
        -- TODO: Add more player-specific state if needed (e.g., selected tower type)
    },
    settings = nil, -- Will be loaded from settings.lua
    -- TODO: Add UI management module/table
    -- TODO: Add Level management module/table
}

-- Function to change the game state
function Game:changeState(newState)
    print("Changing state from " .. self.state .. " to " .. newState)
    self.state = newState
    -- TODO: Add logic for entering/exiting states (e.g., resetting variables, showing/hiding UI)
end

-- TODO: Add functions for initializing subsystems (e.g., loadMap, initializeUI)

--- Initializes the core game systems.
function Game:init()
    -- TODO: Load settings, map data etc. here
    self.progression:init() -- Initialize the progression system (e.g., load save data)
    -- TODO: Initialize other systems like WaveManager, UI etc.
    print("Game Initialized.")
end

-- TODO: Call Game:init() from main.lua love.load()

-- TODO: Implement game win/loss logic and call Game.progression:onMatchEnd(gameMode, outcome, stats)

print("Core game framework initialized.")

return Game -- Return the Game table if this file is required elsewhere
