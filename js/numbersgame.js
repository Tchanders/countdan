function solveNumbersGame( offeredNumbers, target ) {
	var n = offeredNumbers.length,
		Operators = {
			TIMES: 0,
			ADD: 1,
			DIVIDE: 2,
			MINUS: 3
		},
		operatorStrings = [ '\u00d7', '+', '\u00f7', '-' ],
		solutions = [],
		usedBranch = {},
		usedSolution = {};

	function branchNode( firstNode, secondNode, operator ) {
		this.firstNode = firstNode;
		this.secondNode = secondNode;

		// Bitwise operator
		this.usedNumberPositions = firstNode.usedNumberPositions | secondNode.usedNumberPositions;
		this.operator = operator;
		// Calculate the result
		if ( this.operator === Operators.TIMES ) {
			this.result = firstNode.result * secondNode.result;
		} else if ( this.operator === Operators.ADD ) {
			this.result = firstNode.result + secondNode.result;
		} else if ( this.operator === Operators.DIVIDE ) {
			this.result = firstNode.result / secondNode.result;
		} else if ( this.operator === Operators.MINUS ) {
			this.result = firstNode.result - secondNode.result;
		} else {
			console.log( 'branchNode result error' );
		}
		// Check if result = target
		if ( this.result === target && !usedSolution[this.toString()] ) {
			solutions.push( this.toString() );
			usedSolution[this.toString()] = true;
		}
	}

	branchNode.prototype.toString = function() {
		if ( this.operator === Operators.TIMES ) {
			if ( this.firstNode.operator && this.secondNode.operator ) {
				return '( ' + this.firstNode + ' ) ' +
					operatorStrings[this.operator] +
					' ( ' + this.secondNode + ' )';
			} else if ( this.firstNode.operator ) {
				return '( ' + this.firstNode + ' ) ' +
					operatorStrings[this.operator] +
					' ' + this.secondNode;
			} else if ( this.secondNode.operator ) {
				return this.firstNode + ' ' +
					operatorStrings[this.operator] +
					' ( ' + this.secondNode + ' )';
			} else {
				return this.firstNode + ' ' + operatorStrings[this.operator] + ' ' + this.secondNode;
			}
		} else if ( this.operator === Operators.ADD ) {
			return this.firstNode + ' ' + operatorStrings[this.operator] + ' ' + this.secondNode;
		} else if ( this.operator === Operators.MINUS ) {
			if ( this.secondNode.operator ) {
				return this.firstNode + ' ' +
					operatorStrings[this.operator] +
					' ( ' + this.secondNode + ' )';
				} else {
					return this.firstNode + ' ' + operatorStrings[this.operator] + ' ' + this.secondNode;
				}
		} else if ( this.operator === Operators.DIVIDE ) {
			if ( this.firstNode.operator && this.secondNode.operator ) {
				return '( ' + this.firstNode + ' ) ' +
					operatorStrings[this.operator] +
					' ( ' + this.secondNode + ' )';
			} else if ( this.firstNode.operator ) {
				return '( ' + this.firstNode + ' ) ' +
					operatorStrings[this.operator] +
					' ' + this.secondNode;
			} else if ( this.secondNode.operator ) {
				return this.firstNode + ' ' +
					operatorStrings[this.operator] +
					' ( ' + this.secondNode + ' )';
			} else {
				return this.firstNode + ' ' + operatorStrings[this.operator] + ' ' + this.secondNode;
			}
		}
	};

	function leafNode( usedNumberPositions, result ) {
		this.usedNumberPositions = usedNumberPositions;
		this.result = result;
	}

	leafNode.prototype.toString = function() {
		return '' + this.result;
	};

	function addBranchNode( firstNode, secondNode, targetArray, operator ) {
		var newNode = new branchNode( firstNode, secondNode, operator );
		if ( newNode.result === firstNode.result || newNode.result === secondNode.result ) {
			return;
		}
		if ( newNode.usedNumberPositions !== 63 && usedBranch[newNode.result + '.' + newNode.usedNumberPositions] ) {
			return;
		}
		targetArray.push( newNode );
		usedBranch[newNode.result + '.' + newNode.usedNumberPositions] = true;
	}

	function createSubTree( firstNodeArray, secondNodeArray, targetArray, last ) {
		firstLen = firstNodeArray.length;
		secondLen = secondNodeArray.length;
		for ( var i = 0; i < firstLen; i++ ) {
			for ( var j = 0; j < secondLen; j++ ) {
				var firstNode = firstNodeArray[i],
					secondNode = secondNodeArray[j];
				// Bitwise 'and' operator to check if the same offeredNumbers have been used in 2 nodes
				if ( !( firstNode.usedNumberPositions & secondNode.usedNumberPositions ) ) {
					if ( !last || ( firstNode.result < target && secondNode.result < target ) ) {
						//if ( j < i ) {
							addBranchNode( firstNode, secondNode, targetArray, Operators.TIMES );
							addBranchNode( firstNode, secondNode, targetArray, Operators.ADD );
						//}
					}
					// Intermediate result is not allowed to be a fraction
					if ( firstNode.result % secondNode.result === 0 ) {
						if ( !last || firstNode.result > target ) {
							addBranchNode( firstNode, secondNode, targetArray, Operators.DIVIDE );
						}
					} else if ( secondNode.result % firstNode.result === 0 ) {
						if ( !last || secondNode.result > target ) {
							addBranchNode( secondNode, firstNode, targetArray, Operators.DIVIDE );
						}
					}
					// Intermediate result is not allowed to be negative
					if ( firstNode.result > secondNode.result ) {
						if ( !last || firstNode.result < target ) {
							addBranchNode( firstNode, secondNode, targetArray, Operators.MINUS );
						}
					} else if ( secondNode.result > firstNode.result ) {
						if ( !last || secondNode.result >= target ) {
							addBranchNode( secondNode, firstNode, targetArray, Operators.MINUS );
						}
					}
				}
			}
		}
	}

	var ones = [],
		twos = [],
		threes = [],
		fours = [],
		fives = [],
		sixes = [];

	// Create ones, which is made of leafNodes
	// This is currently hard-coded
	// e.g. ones[0] is 000001
	ones[0] = new leafNode( 1 << 0, offeredNumbers[0] );
	ones[1] = new leafNode( 1 << 1, offeredNumbers[1] );
	ones[2] = new leafNode( 1 << 2, offeredNumbers[2] );
	ones[3] = new leafNode( 1 << 3, offeredNumbers[3] );
	ones[4] = new leafNode( 1 << 4, offeredNumbers[4] );
	ones[5] = new leafNode( 1 << 5, offeredNumbers[5] );

	// Create twos
	createSubTree( ones, ones, twos, false );

	// Create threes
	createSubTree( ones, twos, threes, false );

	//Create fours
	createSubTree( ones, threes, fours, false );
	createSubTree( twos, twos, fours, false );

	//create fives
	createSubTree( ones, fours, fives, false );
	createSubTree( twos, threes, fives, false );

	//create sixes
	createSubTree( ones, fives, sixes, true );
	createSubTree( twos, fours, sixes, true );
	createSubTree( threes, threes, sixes, true );

	return solutions;
}