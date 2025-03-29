
-- main.lua
-- Entry point for the Crystal Guardians game

function love.load()
    -- Called once at the start of the game
    print("Crystal Guardians loading...")
    -- TODO: Load game assets, settings, and initialize game state here
end

function love.update(dt)
    -- Called repeatedly every frame
    -- dt: delta time since the last frame
    -- TODO: Update game logic, handle input, move entities
end

function love.draw()
    -- Called repeatedly every frame after love.update
    -- Responsible for drawing everything to the screen
    love.graphics.print('Welcome to Crystal Guardians!', 400, 300)
    -- TODO: Draw game elements (map, towers, enemies, UI)
end

function love.keypressed(key, scancode, isrepeat)
    -- Called when a key is pressed
    if key == "escape" then
        love.event.quit()
    end
    -- TODO: Handle other key presses for game input
end

-- TODO: Add other LÖVE callbacks as needed (love.mousepressed, love.resize, etc.)
