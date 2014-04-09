# 2048 AI

Original AI for the game [2048](https://github.com/gabrielecirulli/2048).

See my new AI for this game here --> [2048AI](https://github.com/sirenity/2048)

This fork is focused on the implementation of several AI methods geared towards effectively teaching these various methods. Below is a list of the AI methods I plan to implement:

    1. A* Search
    2. Alpha-Beta Pruning
    3. Stochastic Hill Climbing
    4. Greedy Search

I advise the community to help with implementing more AI programs and perhaps involving their own kinds of heuristics to help generate new methodologies for Game Theory.

Understanding how the game works:

### The Key Files
1. **animframe_polyfill.js** :: This is used with Firefox or Chrome to: 
	
	* preload animation frames

2. **application.js** :: Prevents game from glitching. Calls the GameManager to begin

3. **bind_polyfill.js** :: ???

4. **classlist_polyfill.js** :: ???

5. **game_manager.js** :: The Core Game Manager contains methods for:
	
	* Beginning/Terminating/Restarting a game
	* Setting up the grid
	* Holds 4 parameters => Grid Size, Input Manager, Actuator, Storage Manager
	* Adding a tile at random
	* Serializing the Grid
	* Performing movement
	* Merging tiles
	* Detecting available moves/game score
	* Saving game progress

6. **grid.js** :: Contains various funcitions for manipulating the game grid
	
	* Checking cells
	* Insertions and removal of tiles

7. **html_actuator.js** :: Contains various functions for interface, tile mechanics and scoring
	
	* Adding a tile
	* Changing the look of a tile using classes
	* Updating the score

8. **keyboard_input_manager.js** :: Handles the listening to the inputs for movement

	* Attaches event listeners for button events (Restart,KeepPlaying) 

7. **local_storage_manager.js** :: Saves game state and best score in local storage

8. **tile.js** :: Class object for the tiles
	
	* Save/Update position
	* Serialize (JSON)

9. **application.js** :: requests an animation frame and generates a new game manager with Keyboard Manager, Actuator, and Local Storage 

### Implementing Custom Tile Movements

Within the game manager, simple call the move function with the specified movement direction. For movement directions, see the translate function in ai.js