
-- modules/progression.lua
-- Manages player progression, resources, skills, and game modes.

local Progression = {}

-- =============================================================================
-- Data Structures
-- =============================================================================

Progression.playerData = {
    -- Core Progression
    level = 1,
    experience = 0,
    expToNextLevel = 100, -- TODO: Implement dynamic calculation for exp needed

    -- Resources
    gold = 100,         -- In-game currency for towers, temporary upgrades
    mana = 50,          -- Resource for special abilities? Or maybe remove if not used.
    crystals = 0,       -- Premium/persistent currency for meta-upgrades?
    knowledgePoints = 0, -- Points for unlocking skills/mastery

    -- Game Mode Progress
    campaign = {
        highestLevelCompleted = 0,
        starsEarned = {}, -- e.g., { [levelIndex] = stars }
    },
    endless = {
        highestWaveReached = 0,
        highScore = 0,
    },
    challenges = {
        completed = {}, -- e.g., { [challengeId] = true/score }
    },

    -- Skill Tree
    skillTree = {
        -- TODO: Design the skill tree structure (e.g., nodes, prerequisites, costs)
        -- Example: unlockedSkills = { skillId1 = true, skillId2 = true }
        unlockedSkills = {},
    },

    -- Tower Mastery
    towerMastery = {
        -- TODO: Design tower mastery structure (e.g., per tower type experience/levels)
        -- Example: masteryLevels = { basicTower = 2, fireTower = 1 }
        masteryLevels = {},
        masteryExperience = {}, -- e.g., { basicTower = 150 }
    }
}

-- =============================================================================
-- Core Functions
-- =============================================================================

--- Initializes the progression system (e.g., loading saved data).
function Progression:init()
    -- TODO: Load player data from a save file if it exists
    print("Progression System Initialized.")
end

--- Adds experience to the player and handles level ups.
-- @param amount (number) The amount of experience to add.
function Progression:addExperience(amount)
    self.playerData.experience = self.playerData.experience + amount
    print("Gained " .. amount .. " experience. Total: " .. self.playerData.experience)

    -- Check for level up
    while self.playerData.experience >= self.playerData.expToNextLevel do
        self:levelUp()
    end
    -- TODO: Notify UI about experience gain/level up
end

--- Handles the player leveling up.
function Progression:levelUp()
    self.playerData.level = self.playerData.level + 1
    self.playerData.experience = self.playerData.experience - self.playerData.expToNextLevel
    -- TODO: Calculate next expToNextLevel based on new level (e.g., scaling formula)
    self.playerData.expToNextLevel = self.playerData.expToNextLevel * 1.5 -- Placeholder scaling

    -- TODO: Grant rewards for leveling up (e.g., knowledge points, skill unlocks?)
    self.playerData.knowledgePoints = self.playerData.knowledgePoints + 1 -- Example reward

    print("Leveled Up! Reached level " .. self.playerData.level .. ". Gained 1 Knowledge Point.")
    -- TODO: Trigger level up effects/UI notifications
end

--- Adds or removes gold.
-- @param amount (number) The amount of gold to add (positive) or remove (negative).
-- @return (boolean) True if the transaction was successful, false otherwise (e.g., insufficient funds).
function Progression:modifyGold(amount)
    if self.playerData.gold + amount >= 0 then
        self.playerData.gold = self.playerData.gold + amount
        print("Gold changed by " .. amount .. ". Current gold: " .. self.playerData.gold)
        -- TODO: Notify UI about gold change
        return true
    else
        print("Insufficient gold for transaction: needed " .. math.abs(amount) .. ", have " .. self.playerData.gold)
        return false
    end
end

--- Adds or removes mana.
-- @param amount (number) The amount of mana to add (positive) or remove (negative).
-- @return (boolean) True if the transaction was successful, false otherwise.
function Progression:modifyMana(amount)
    -- TODO: Define max mana if applicable
    if self.playerData.mana + amount >= 0 then
        self.playerData.mana = self.playerData.mana + amount
        print("Mana changed by " .. amount .. ". Current mana: " .. self.playerData.mana)
        -- TODO: Notify UI about mana change
        return true
    else
        print("Insufficient mana.")
        return false
    end
end

--- Adds or removes crystals (persistent currency).
-- @param amount (number) The amount of crystals to add (positive) or remove (negative).
-- @return (boolean) True if the transaction was successful, false otherwise.
function Progression:modifyCrystals(amount)
    if self.playerData.crystals + amount >= 0 then
        self.playerData.crystals = self.playerData.crystals + amount
        print("Crystals changed by " .. amount .. ". Current crystals: " .. self.playerData.crystals)
        return true
    else
        print("Insufficient crystals.")
        return false
    end
end

--- Adds or removes knowledge points.
-- @param amount (number) The amount of points to add (positive) or remove (negative).
-- @return (boolean) True if the transaction was successful, false otherwise.
function Progression:modifyKnowledgePoints(amount)
    if self.playerData.knowledgePoints + amount >= 0 then
        self.playerData.knowledgePoints = self.playerData.knowledgePoints + amount
        print("Knowledge Points changed by " .. amount .. ". Current points: " .. self.playerData.knowledgePoints)
        return true
    else
        print("Insufficient knowledge points.")
        return false
    end
end

-- =============================================================================
-- Skill Tree & Mastery Functions
-- =============================================================================

--- Unlocks a skill in the skill tree.
-- @param skillId (string|number) The identifier of the skill to unlock.
-- @return (boolean) True if the skill was successfully unlocked, false otherwise.
function Progression:unlockSkill(skillId)
    -- TODO: Check prerequisites (level, other skills, knowledge points)
    -- TODO: Deduct cost (knowledge points)
    local cost = 1 -- Placeholder cost
    if not self.playerData.skillTree.unlockedSkills[skillId] and self:modifyKnowledgePoints(-cost) then
        self.playerData.skillTree.unlockedSkills[skillId] = true
        print("Unlocked skill: " .. tostring(skillId))
        -- TODO: Apply skill effect globally or store for lookup
        return true
    else
        print("Failed to unlock skill: " .. tostring(skillId))
        return false
    end
end

--- Adds mastery experience to a specific tower type.
-- @param towerType (string) The type of the tower gaining experience.
-- @param amount (number) The amount of mastery experience to add.
function Progression:addTowerMasteryExperience(towerType, amount)
    if not self.playerData.towerMastery.masteryExperience[towerType] then
        self.playerData.towerMastery.masteryExperience[towerType] = 0
        self.playerData.towerMastery.masteryLevels[towerType] = 0 -- Start at level 0 or 1?
    end

    self.playerData.towerMastery.masteryExperience[towerType] = self.playerData.towerMastery.masteryExperience[towerType] + amount
    print("Gained " .. amount .. " mastery experience for " .. towerType .. ". Total: " .. self.playerData.towerMastery.masteryExperience[towerType])

    -- TODO: Check for tower mastery level up based on experience thresholds
    -- TODO: Implement mastery level up logic and rewards/unlocks
end

-- =============================================================================
-- Game Mode Integration Hooks (Placeholders)
-- =============================================================================

--- Called when an enemy is defeated.
-- @param enemyData (table) Data about the defeated enemy.
function Progression:onEnemyDefeated(enemyData)
    -- Grant rewards based on enemy type
    local goldReward = enemyData.rewards.gold or 5
    local expReward = enemyData.rewards.experience or 10

    self:modifyGold(goldReward)
    self:addExperience(expReward)

    -- TODO: Grant tower mastery experience to towers involved in the kill?
end

--- Called when a wave is completed.
-- @param waveNumber (number) The number of the completed wave.
-- @param gameMode (string) The current game mode ('campaign', 'endless', 'challenge').
function Progression:onWaveCompleted(waveNumber, gameMode)
    print("Wave " .. waveNumber .. " completed in " .. gameMode .. " mode.")
    -- TODO: Grant end-of-wave bonuses (gold, knowledge points?)
    -- TODO: Update endless mode wave count if applicable
end

--- Called when a level/match ends.
-- @param gameMode (string) The game mode played.
-- @param outcome (string) 'win', 'loss'
-- @param stats (table) Performance statistics (e.g., waves completed, score).
function Progression:onMatchEnd(gameMode, outcome, stats)
    print("Match ended. Mode: " .. gameMode .. ", Outcome: " .. outcome)
    -- TODO: Update campaign progress (highest level, stars)
    -- TODO: Update endless mode high score/wave reached
    -- TODO: Update challenge completion status/score
    -- TODO: Grant end-of-match rewards (crystals, knowledge points?) based on performance
    -- TODO: Save player progress
end

-- =============================================================================
-- Utility Functions
-- =============================================================================

--- Resets temporary in-game progress (e.g., gold, mana) at the start of a match.
function Progression:resetMatchProgress()
    -- TODO: Determine which resources reset per match vs. persist
    self.playerData.gold = 100 -- Starting gold for a match
    self.playerData.mana = 50  -- Starting mana
    print("Match progress reset.")
end

--- Saves the player's persistent progression data.
function Progression:saveProgress()
    -- TODO: Implement saving logic (e.g., to a file using love.filesystem)
    print("Saving player progress...")
    -- Example: local dataString = serpent.dump(self.playerData) -- Requires a serialization library
    -- love.filesystem.write("savegame.dat", dataString)
end

--- Loads the player's persistent progression data.
function Progression:loadProgress()
    -- TODO: Implement loading logic
    print("Loading player progress...")
    -- Example: if love.filesystem.exists("savegame.dat") then
    --    local dataString = love.filesystem.read("savegame.dat")
    --    local success, loadedData = serpent.load(dataString) -- Requires a serialization library
    --    if success then self.playerData = loadedData end
    -- end
end

return Progression
