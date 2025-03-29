
-- modules/enemy.lua
-- Defines the Enemy class for the Crystal Guardians game.

local Enemy = {}
Enemy.__index = Enemy

-- TODO: Load enemyData from a configuration file or data module
local enemyData = {
  basic = { health = 100, speed = 50, armor = 5, resistances = { physical = 0, magic = 0 }, reward = 10 },
  fast = { health = 75, speed = 80, armor = 2, resistances = { physical = 0, magic = -10 }, reward = 12 },
  armored = { health = 150, speed = 40, armor = 15, resistances = { physical = 20, magic = 0 }, reward = 15 },
  -- Add more enemy types here
}

-- Constructor for the Enemy class
function Enemy:new(type, position)
  local data = enemyData[type]
  if not data then
    error("Invalid enemy type: " .. tostring(type))
  end

  local instance = setmetatable({
    type = type,
    health = data.health,
    maxHealth = data.health,
    speed = data.speed,
    armor = data.armor,
    resistances = data.resistances, -- Table of resistance values (e.g., { physical = 10, magic = 5 })
    -- Store reward data directly on the instance
    rewards = { gold = data.reward or 5, experience = data.experience or 10 }, -- TODO: Define experience rewards in enemyData
    position = position or { x = 0, y = 0 }, -- Current position on the map
    path = nil, -- TODO: Assign path from wave manager or map data
    pathIndex = 1, -- Current index in the path
    effects = {}, -- Table to store active status effects (e.g., { poison = { duration = 5, damage = 2 } })
    isAlive = true,
    justDied = false, -- Flag to signal death processing for rewards
  }, Enemy)

  return instance
end

-- Move the enemy along its path
function Enemy:move(dt)
  if not self.isAlive or not self.path or self.pathIndex > #self.path then
    return -- Cannot move if dead, no path, or reached the end
  end

  -- TODO: Implement pathfinding or use pre-defined paths
  -- TODO: Handle movement speed modifiers (e.g., slow effects)

  local targetPos = self.path[self.pathIndex]
  local dx = targetPos.x - self.position.x
  local dy = targetPos.y - self.position.y
  local distance = math.sqrt(dx*dx + dy*dy)
  local moveDistance = self.speed * dt

  if distance <= moveDistance then
    -- Reached the current path node, move to the next one
    self.position.x = targetPos.x
    self.position.y = targetPos.y
    self.pathIndex = self.pathIndex + 1
    if self.pathIndex > #self.path then
      -- Reached the end of the path (e.g., reached the player's base)
      -- TODO: Trigger base damage or enemy goal reached event
      self:destroy() -- For now, just remove the enemy
    end
  else
    -- Move towards the target node
    self.position.x = self.position.x + (dx / distance) * moveDistance
    self.position.y = self.position.y + (dy / distance) * moveDistance
  end
end

-- Apply damage to the enemy, considering armor and resistances
function Enemy:takeDamage(amount, damageType)
  if not self.isAlive then return end

  -- TODO: Implement more complex damage calculation (e.g., armor penetration, critical hits)
  local resistance = self.resistances[damageType] or 0
  local effectiveArmor = math.max(0, self.armor - (damageType == 'physical' and 0 or 1000)) -- Basic armor vs physical assumption
  local damageReduction = 1 - (resistance / 100) -- Resistance as percentage reduction
  local mitigatedDamage = amount * damageReduction * (1 - (effectiveArmor * 0.06 / (1 + effectiveArmor * 0.06))) -- WoW armor formula approximation

  local actualDamage = math.max(0, mitigatedDamage) -- Ensure damage is not negative
  self.health = self.health - actualDamage

  -- TODO: Trigger visual effects for damage taken

  if self.health <= 0 then
    self.health = 0
    self:die()
  end
end

-- Handle enemy death: Mark as dead and flag for reward processing
function Enemy:die()
  if not self.isAlive then return end -- Prevent multiple deaths

  self.isAlive = false
  self.justDied = true -- Signal that rewards should be processed by the manager
  print(self.type .. " enemy marked as dead.")
  -- TODO: Trigger death animations/effects
  -- TODO: Notify game state or wave manager about the death (implicitly done by checking isAlive/justDied flags)
end

-- Activate special abilities (e.g., healing, spawning minions, debuffs)
function Enemy:activateAbility()
  if not self.isAlive then return end

  -- TODO: Implement specific abilities based on enemy type
  -- Example: A healer enemy might heal nearby allies
  -- Example: A spawner enemy might create smaller enemies
  print(self.type .. " enemy attempts to activate ability (Not Implemented)")
end

-- Update enemy state each frame (e.g., apply effects, check ability cooldowns)
function Enemy:update(dt)
  if not self.isAlive then return end

  self:move(dt)

  -- TODO: Update status effects (e.g., poison damage over time, slow duration)
  -- TODO: Implement logic for triggering abilities (cooldowns, conditions)
  -- TODO: Add future enemy behavior customizations (e.g., targeting specific towers, reacting to player actions)
end

-- Draw the enemy on the screen
function Enemy:draw()
  if not self.isAlive then return end

  -- TODO: Replace with actual drawing logic (sprites, health bars)
  love.graphics.setColor(0.8, 0.2, 0.2) -- Red color for enemies
  love.graphics.circle("fill", self.position.x, self.position.y, 10)
  -- Draw health bar
  if self.health < self.maxHealth then
      love.graphics.setColor(0,0,0)
      love.graphics.rectangle("fill", self.position.x - 11, self.position.y - 18, 22, 5)
      love.graphics.setColor(0.1, 0.8, 0.1)
      love.graphics.rectangle("fill", self.position.x - 10, self.position.y - 17, 20 * (self.health / self.maxHealth), 3)
  end
end

-- Function to handle cleanup when the enemy is removed (e.g., reaching the end, dying)
function Enemy:destroy()
    self.isAlive = false
    -- TODO: Add any necessary cleanup logic, like removing from game lists
end


return Enemy
