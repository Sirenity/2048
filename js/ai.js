function AI(grid) {
  this.grid = grid;
}

// static evaluation function
AI.prototype.eval = function(direction) {
  var maxWeight = 0.3,
      mergeWeight = 2.0,
      smoothWeight = 0.1,
      cellsAvailableWeight = 1.0;

  return maxWeight * this.grid.maxValue() + 
         mergeWeight * this.grid.tileMatchesAvailable() -
         smoothWeight * this.grid.smoothness() + 
         cellsAvailableWeight * this.grid.cellsAvailable();
};

AI.prototype.search = function(depth, bestScore) {
  var result;
  var bestScore;
  var bestMove = -1;

  // the maxing player
  if (this.grid.playerTurn) {
    // The best score is the score of the current grid
    bestScore = 0;

    // Perform the movements on a cloned grid
    // If better, that movement is the best selected move
    for (var direction in [0, 1, 2, 3]) {
      // Clones the grid
      var newGrid = this.grid.clone();
      // does a move in all 4 directions
      if (newGrid.move(direction).moved) {
        if (newGrid.isWin()) {
          return { move: direction, score: this.eval() };
        }
        
        var newAI = new AI(newGrid);
        var score = newAI.eval();

        if(score > bestScore) {
          bestScore = score;
        }

        if (depth == 0) {
          result = { move: direction, score: newAI.eval() };
        } else {
          result = newAI.search(depth-1, bestScore);
        }

        if (result.score >= bestScore) {
          bestScore = result.score;
          bestMove = direction;
        }
      }
    }
  } else {
    // What are we going to do on the computers turn?

    // Determine all the possible moves by the AI
    // For each move, calculate the best move to counteract
    bestScore = 0;

    var candidates = [];
    var cells = this.grid.availableCells();
    var scores = { 2: [], 4: [] };
    
    // Determine the evaluated grid score if we were to put a 2 or a 4 in each square
    for (var value in scores) {
      for (var i in cells) {
        var cell = cells[i];
        var tile = new Tile(cell, parseInt(value,10));
        this.grid.insertTile(tile);
        scores[value][i] = this.eval();
        this.grid.removeTile(cell);
      }
    }

    // From these evaluated scores, select the tougher ones 
    var maxScore = Math.max(Math.max.apply(null, scores[2]), Math.max.apply(null, scores[4]));

    for (var value in scores) { 
      for (var i = 0; i < scores[value].length; i++) {
        if (scores[value][i] == maxScore) {
          candidates.push( { position: cells[i], value: parseInt(value, 10) } );
        }
      }
    }

    // From these candidates, lets do the same IDA* search like we did for player's turn
    for (var i = 0; i < candidates.length; i++) {
      var position = candidates[i].position;
      var value = candidates[i].value;

      // Clone the grid
      var newGrid = this.grid.clone();

      // Insert the tile
      var tile = new Tile(position, parseInt(value,10));
      newGrid.insertTile(tile);
      // Assign the players turn for recursion
      newGrid.playerTurn = true;
      
      // Generate an AI based on the cloned grid
      newAI = new AI(newGrid);
      // Determine search results with given grid
      result = newAI.search(depth, bestScore);

      // Choose the best move by the computer for us to take
      if (result.score < bestScore) {
        bestScore = result.score;
      }
    }

  }

  return { move: bestMove, score: bestScore };
}

// performs a search and returns the best move
AI.prototype.getBest = function() {
  return this.iterativeDeep();
}

// performs iterative deepening over the alpha-beta search
AI.prototype.iterativeDeep = function() {
  var start = (new Date()).getTime();
  var depth = 0;
  var best;

  do {
    var newBest = this.search(depth, 0);
    if (newBest.move == -1) {
      break;
    } else {
      best = newBest;
    }
    depth++;
  } while ( (new Date()).getTime() - start < minSearchTime);

  return best
}

AI.prototype.translate = function(move) {
 return {
    0: 'up',
    1: 'right',
    2: 'down',
    3: 'left'
  }[move];
}

