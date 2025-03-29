
-- modules/tower.lua

local Tower = {}
Tower.__index = Tower

-- Constructor for the Tower class
-- @param type (string) The type of the tower (e.g., 'Archer', 'Mage')
-- @param x (number) The x-coordinate of the tower's position
-- @param y (number) The y-coordinate of the tower's position
-- @param towerData (table) Table containing base stats for different tower types
function Tower:new(type, x, y, towerData)
    local instance = setmetatable({}, Tower)
    instance.type = type
    instance.x = x
    instance.y = y
    instance.level = 1
    instance.experience = 0
    instance.target = nil -- Current target enemy
    instance.attackCooldown = 0 -- Time remaining until the next attack

    -- TODO: Integrate dynamic stats from towerData based on 'type' and 'level'
    -- Example: instance.damage = towerData[type].levels[instance.level].damage
    instance.damage = 10 -- Placeholder
    instance.range = 100 -- Placeholder
    instance.attackSpeed = 1 -- Placeholder (attacks per second)
    instance.cost = 50 -- Placeholder

    print(string.format("Tower created: Type=%s, Pos=(%d, %d)", type, x, y))
    return instance
end

-- Find a target enemy within range
-- @param enemies (table) A list/table of active enemies
function Tower:findTarget(enemies)
    -- TODO: Implement more sophisticated targeting logic (e.g., closest, weakest, strongest)
    self.target = nil -- Reset target
    local closestDistSq = self.range * self.range -- Use squared distance for efficiency

    for _, enemy in ipairs(enemies) do
        if enemy.isAlive then -- Assuming enemies have an 'isAlive' flag
            local distSq = (enemy.x - self.x)^2 + (enemy.y - self.y)^2
            if distSq <= closestDistSq then
                self.target = enemy
                closestDistSq = distSq
                -- For now, just target the first enemy in range found. Refine later.
                -- break -- Uncomment for 'first' targeting, remove for 'closest'
            end
        end
    end
end

-- Attack the current target if possible
-- @param dt (number) Delta time since the last frame
function Tower:attack(dt)
    self.attackCooldown = math.max(0, self.attackCooldown - dt)

    if self.target and self.target.isAlive then
        -- Check if target is still in range
        local distSq = (self.target.x - self.x)^2 + (self.target.y - self.y)^2
        if distSq > self.range * self.range then
            self.target = nil -- Target out of range
            return -- Stop attack logic here
        end

        -- Attack if cooldown is ready
        if self.attackCooldown == 0 then
            -- TODO: Implement projectile creation or instant hit logic
            print(string.format("Tower at (%d, %d) attacking target at (%d, %d)", self.x, self.y, self.target.x, self.target.y))
            self.target:takeDamage(self.damage) -- Assuming enemy has takeDamage method
            self.attackCooldown = 1 / self.attackSpeed -- Reset cooldown

            -- Check if target died from the attack
            if not self.target.isAlive then
                self:rewardExperience(self.target.rewardExperience or 10) -- Assuming enemy gives XP
                self.target = nil
            end
        end
    else
        self.target = nil -- Clear target if it's dead or nil
    end
end

-- Update tower logic (e.g., finding target, attacking)
-- @param dt (number) Delta time
-- @param enemies (table) List of active enemies
function Tower:update(dt, enemies)
    if not self.target or not self.target.isAlive then
        self:findTarget(enemies)
    end

    if self.target then
        self:attack(dt)
    end
    -- TODO: Add any other per-frame logic for the tower
end

-- Draw the tower on the screen
function Tower:draw()
    -- TODO: Replace with actual drawing logic (sprites, shapes)
    love.graphics.setColor(0, 0.8, 0.2) -- Green color for tower
    love.graphics.circle("fill", self.x, self.y, 10) -- Draw a simple circle for now

    -- Draw range indicator (optional)
    love.graphics.setColor(0.5, 0.5, 0.5, 0.5) -- Semi-transparent gray
    love.graphics.circle("line", self.x, self.y, self.range)

    -- Draw line to target (optional debug)
    if self.target then
        love.graphics.setColor(1, 0, 0) -- Red line
        love.graphics.line(self.x, self.y, self.target.x, self.target.y)
    end
end

-- Reward experience to the tower
-- @param amount (number) Amount of experience to add
function Tower:rewardExperience(amount)
    self.experience = self.experience + amount
    print(string.format("Tower at (%d, %d) gained %d XP. Total: %d", self.x, self.y, amount, self.experience))
    -- TODO: Check for level up based on experience thresholds
    -- if self.experience >= experienceNeededForLevel[self.level + 1] then
    --    self:upgrade()
    -- end
end

-- Upgrade the tower to the next level
function Tower:upgrade()
    -- TODO: Implement upgrade logic
    -- Increase level, update stats based on towerData, potentially change appearance
    self.level = self.level + 1
    print(string.format("Tower at (%d, %d) upgraded to Level %d", self.x, self.y, self.level))
    -- Reset experience or carry over excess? Decide on design.
    -- self.experience = 0 -- Or self.experience - experienceNeeded
    -- Update stats:
    -- self.damage = towerData[self.type].levels[self.level].damage
    -- self.range = towerData[self.type].levels[self.level].range
    -- etc.
end

-- Activate the tower's special ability
function Tower:activateSpecial()
    -- TODO: Implement special ability logic based on tower type and level
    print(string.format("Tower at (%d, %d) activating special ability!", self.x, self.y))
    -- Example: Area damage, temporary buff, unique effect
end

return Tower
