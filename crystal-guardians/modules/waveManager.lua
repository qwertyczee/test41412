
-- modules/waveManager.lua
-- Manages enemy waves, spawning, and progression.

local WaveManager = {}
WaveManager.__index = WaveManager

-- Dependencies (assuming Enemy module exists)
local Enemy = require("modules.enemy")

-- Configuration
local waveSpawnDelay = 1.0 -- Time between enemy spawns within a wave
local timeBetweenWaves = 10.0 -- Time before the next wave starts automatically (can be triggered earlier)

-- State
local currentWaveNumber = 0
local enemiesInWave = {} -- Table to hold enemies for the current wave definition
local spawnQueue = {} -- Enemies waiting to be spawned
local activeEnemies = {} -- Enemies currently active on the map
local timeSinceLastSpawn = 0
local timeUntilNextWave = 0
local waveInProgress = false
local allWavesCompleted = false

-- TODO: Load wave definitions from a data file or generate dynamically
local waveDefinitions = {
    -- Example structure: { {enemyType = "type1", count = 5}, {enemyType = "type2", count = 3} }
    { {enemyType = "goblin", count = 5} },
    { {enemyType = "goblin", count = 8}, {enemyType = "orc", count = 2} },
    { {enemyType = "orc", count = 5}, {enemyType = "goblin", count = 10} },
    -- TODO: Add more complex wave definitions, including boss waves
    -- TODO: Define special challenge waves (e.g., air units only, fast enemies)
}

--[[
Initializes the Wave Manager.
@param game The main game state table.
]]
function WaveManager:init(game)
    self.game = game -- Reference to the core game state
    currentWaveNumber = 0
    enemiesInWave = {}
    spawnQueue = {}
    activeEnemies = {}
    timeSinceLastSpawn = 0
    timeUntilNextWave = timeBetweenWaves
    waveInProgress = false
    allWavesCompleted = false
    print("Wave Manager Initialized")
end

--[[
Generates the spawn queue for the next wave based on its definition.
@param waveNum The wave number to generate.
@return true if wave data exists, false otherwise.
]]
function WaveManager:generateWave(waveNum)
    local definition = waveDefinitions[waveNum]
    if not definition then
        print("No definition found for wave " .. waveNum)
        return false
    end

    spawnQueue = {} -- Clear previous queue
    for _, group in ipairs(definition) do
        for _ = 1, group.count do
            table.insert(spawnQueue, group.enemyType)
        end
    end
    -- TODO: Shuffle or apply patterns to the spawn queue for variety
    print("Generated wave " .. waveNum .. " with " .. #spawnQueue .. " enemies.")
    return true
end

--[[
Starts the next wave if one is available.
]]
function WaveManager:startNextWave()
    if waveInProgress or allWavesCompleted then
        return -- Cannot start a new wave yet
    end

    currentWaveNumber = currentWaveNumber + 1
    if currentWaveNumber > #waveDefinitions then
        allWavesCompleted = true
        print("All waves completed!")
        -- TODO: Trigger game win condition or transition to endless mode
        return
    end

    if self:generateWave(currentWaveNumber) then
        waveInProgress = true
        timeSinceLastSpawn = 0 -- Ready to spawn immediately
        timeUntilNextWave = 0
        print("Starting Wave " .. currentWaveNumber)
        -- TODO: Notify UI about the new wave starting
    else
        -- Could not generate wave, maybe log error or handle gracefully
        currentWaveNumber = currentWaveNumber - 1 -- Revert wave number
        allWavesCompleted = true -- Assume end if definition is missing
        print("Error starting wave " .. (currentWaveNumber + 1) .. ". No more waves defined?")
    end
end

--[[
Spawns a single enemy from the queue.
@param dt Delta time since last frame.
]]
function WaveManager:spawnEnemy(dt)
    if not waveInProgress or #spawnQueue == 0 then
        return -- Nothing to spawn or wave not active
    end

    timeSinceLastSpawn = timeSinceLastSpawn + dt
    if timeSinceLastSpawn >= waveSpawnDelay then
        local enemyType = table.remove(spawnQueue, 1) -- Get the next enemy type from the front
        if enemyType then
            -- TODO: Get spawn point from map data
            local spawnPos = { x = 0, y = 100 } -- Placeholder spawn coordinates
            -- TODO: Pass path data to the enemy
            local newEnemy = Enemy:new(enemyType, spawnPos)
            -- newEnemy.path = self.game.map:getPath() -- Example of setting path
            table.insert(activeEnemies, newEnemy)
            -- TODO: Add the enemy to the main game's enemy list for processing (e.g., table.insert(self.game.enemies, newEnemy))
            print("Spawned enemy: " .. enemyType)
        end
        timeSinceLastSpawn = 0 -- Reset spawn timer

        if #spawnQueue == 0 then
            print("Wave " .. currentWaveNumber .. " spawn queue empty.")
            -- Wave spawning is done, but wave is still in progress until all enemies are cleared
        end
    end
end

--[[
Updates the wave manager state each frame.
@param dt Delta time since last frame.
]]
function WaveManager:update(dt)
    if allWavesCompleted then return end

    if waveInProgress then
        self:spawnEnemy(dt)

        -- Update active enemies (delegated to main game loop or enemy module itself)
        -- Remove dead enemies from activeEnemies list
        local i = #activeEnemies
        while i >= 1 do
            local enemy = activeEnemies[i]
            if not enemy.isAlive then
                if enemy.justDied then
                    -- Grant rewards via Progression module
                    self.game.progression:onEnemyDefeated(enemy) -- Pass the whole enemy object
                    enemy.justDied = false -- Prevent granting rewards multiple times
                end
                -- TODO: Ensure proper cleanup/removal notification is handled (e.g., removing from main game list)
                table.remove(activeEnemies, i)
            end
            i = i - 1
        end

        -- Check if wave is completed (spawn queue empty AND active enemies cleared)
        if #spawnQueue == 0 and #activeEnemies == 0 and waveInProgress then -- Added waveInProgress check
            waveInProgress = false
            timeUntilNextWave = timeBetweenWaves
            print("Wave " .. currentWaveNumber .. " cleared!")
            -- Grant end-of-wave rewards via Progression module
            self.game.progression:onWaveCompleted(currentWaveNumber, self.game.state) -- Pass wave number and game mode/state
            -- TODO: Notify UI about wave completion
        end
    else
        -- If no wave is in progress, countdown to the next one
        timeUntilNextWave = timeUntilNextWave - dt
        if timeUntilNextWave <= 0 then
            self:startNextWave()
        end
        -- TODO: Allow player to trigger next wave early
    end

    -- TODO: Adapt enemy behavior or stats over time/waves (e.g., increase health/speed)
    -- TODO: Implement logic for special boss waves (unique mechanics, health bars)
    -- TODO: Handle challenge wave conditions
end

--[[
Draws wave-related information (optional, could be handled by UI module).
]]
function WaveManager:draw()
    -- Example: Draw wave number, time until next wave, enemies remaining
    love.graphics.print("Wave: " .. currentWaveNumber .. "/" .. #waveDefinitions, 10, 10)
    if waveInProgress then
        love.graphics.print("Enemies Remaining: " .. (#spawnQueue + #activeEnemies), 10, 30)
    else
        if not allWavesCompleted then
            love.graphics.print("Next wave in: " .. string.format("%.1f", timeUntilNextWave), 10, 30)
        else
            love.graphics.print("All waves cleared!", 10, 30)
        end
    end

    -- Draw active enemies (delegated to main game loop or enemy module)
    -- for _, enemy in ipairs(activeEnemies) do
    --     enemy:draw()
    -- end
end

--[[
Cleans up the Wave Manager state.
]]
function WaveManager:destroy()
    -- TODO: Add cleanup logic if necessary (e.g., removing timers, listeners)
    print("Wave Manager Destroyed")
end

return WaveManager
