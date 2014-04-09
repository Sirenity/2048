function AI(grid) {
  this.grid = grid;
}

// static evaluation function
AI.prototype.eval = function(direction) {
  var maxWeight = 0.8,
      mergeWeight = 2.0,
      smoothWeight = 0.1,
      cellsAvailableWeight = 2.0;

  return maxWeight * this.grid.maxValue() + 
         mergeWeight * this.grid.tileMatchesAvailable() +
         smoothWeight * this.grid.smoothness() + 
         cellsAvailableWeight * this.grid.cellsAvailable();
};

//AI.prototype.cache = {}

// alpha-beta depth first search
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
    // We need to assume all cases in where the opponent can place a tile
    // And from those possible moves, determine the best move to counteract it
    bestScore = 0;

    // try a 2 and 4 in each cell and measure how annoying it is
    // with metrics from eval
    var candidates = [];
    var cells = this.grid.availableCells();
    var scores = { 2: [], 4: [] };
    for (var value in scores) {
      for (var i in cells) {
        scores[value].push(null);
        var cell = cells[i];
        var tile = new Tile(cell, parseInt(value, 10));
        this.grid.insertTile(tile);
        scores[value][i] = -this.grid.smoothness();
        this.grid.removeTile(cell);
      }
    }

    // now just pick out the most annoying moves
    var maxScore = Math.max(Math.max.apply(null, scores[2]), Math.max.apply(null, scores[4]));
    for (var value in scores) { // 2 and 4
      for (var i=0; i<scores[value].length; i++) {
        if (scores[value][i] == maxScore) {
          candidates.push( { position: cells[i], value: parseInt(value, 10) } );
        }
      }
    }

    // search on each candidate
    for (var i=0; i<candidates.length; i++) {
      var position = candidates[i].position;
      var value = candidates[i].value;
      var newGrid = this.grid.clone();
      var tile = new Tile(position, value);
      newGrid.insertTile(tile);
      newGrid.playerTurn = true;
      newAI = new AI(newGrid);
      result = newAI.search(depth, bestScore);

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

