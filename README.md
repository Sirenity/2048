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
	
	> a. preload animation frames

2. **application.js** :: Prevents game from glitching. Calls the GameManager to begin

3. **bind_polyfill.js** :: ???

4. **classlist_polyfill.js** :: ???

5. **game_manager.js** :: The Core Game Manager contains methods for:
	
    > a. Beginning/Terminating/Restarting a game
    > b. Setting up the grid
    > c. Holds 4 parameters => Grid Size, Input Manager, Actuator, Storage Manager
    > d. Adding a tile at random
    > e. Serializing the Grid
    > f. Performing movement
    > g. Merging tiles
    > h. Detecting available moves/game score
    > i. Saving game progress

6. **grid.js** :: Contains various funcitions for manipulating the game grid
	
	> a. Checking cells
	> b. Insertions and removal of tiles

7. **html_actuator.js** :: Contains various functions for interface, tile mechanics and scoring
	
	> a. Adding a tile
	> b. Changing the look of a tile using classes
	> c. Updating the score

8. **keyboard_input_manager.js** :: 