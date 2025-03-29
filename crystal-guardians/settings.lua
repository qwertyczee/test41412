
-- settings.lua
-- Configuration settings for Crystal Guardians

local settings = {
    -- Window settings
    window = {
        title = "Crystal Guardians",
        width = 1280,
        height = 720,
        fullscreen = false,
        resizable = true,
        vsync = true,
    },

    -- Game settings
    game = {
        starting_gold = 100,
        starting_lives = 20,
        difficulty = "normal", -- Options: easy, normal, hard
    },

    -- Debug settings
    debug = {
        show_fps = true,
        log_level = "info", -- Options: debug, info, warn, error
    },

    -- TODO: Add more settings categories as needed (e.g., audio, controls, graphics)
}

return settings
