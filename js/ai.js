function AI(grid) {
  this.grid = grid;
}

// static evaluation function
AI.prototype.eval = function(direction) {
  var maxWeight = 0.5,
      mergeWeight = 2.0,
      smoothWeight = 0.2,
      cellsAvailableWeight = 0.5;

  return maxWeight * this.grid.maxValue() + 
         mergeWeight * this.grid.tileMatchesAvailable() -
         smoothWeight * this.grid.smoothness() + 
         cellsAvailableWeight * this.grid.cellsAvailable();
};

AI.prototype.search = function(depth, bestScore) {
  var result;
  var bestScore;
  var bestMove = -1;

  if (this.grid.playerTurn) {
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
        // Change the eval function to detect in the given direction
        var score = newAI.eval(direction);

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

