const valuesToArray = (dices) => {
  return dices.map((dice) => {
    return (
      dice.value
    );
  });
}

export const sumScore = (dices) => {
  const values = valuesToArray(dices);
  return values.reduce((partialSum, a) => partialSum + a, 0);
}

export const meshesScore = (dices, mesh) => {
  const values = valuesToArray(dices);
  const meshes = values.filter((value) => value === mesh);
  return meshes.reduce((partialSum, a) => partialSum + a, 0);
}

export const totalScore = (scoreValue) => {
  let sum = 0;
  const skippedKeys = ['total', '3 of kind', '4 of kind', 'full house', 'small straight', 'large straight', 'yahtzee', 'chance', 'grand total'];

  for (let [key, value] of scoreValue) {
    if(parseInt(value)) {
      if(!skippedKeys.includes(key)) {
        sum += value;
      }
    }
  }

  return sum;
}

export const threeOfKindScore = (dices) => {
  const values = valuesToArray(dices);
  let score = 0;
  const threes = [[1, 1, 1], [2, 2, 2], [3, 3, 3], [4, 4, 4], [5, 5, 5], [6, 6, 6]];

  for(let i = 0; i < threes.length; i++) {
    let three = values.filter((value) => threes[i].includes(value));

    if(three.length >= 3) {
      return values.reduce((partialSum, a) => partialSum + a, 0);
    }
  }

  return score;
}

export const fourOfKindScore = (dices) => {
  const values = valuesToArray(dices);
  let score = 0;
  const fours = [[1, 1, 1, 1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4], [5, 5, 5, 5], [6, 6, 6, 6]];

  for(let i = 0; i < fours.length; i++) {
    let four = values.filter((value) => fours[i].includes(value));

    if(four.length >= 4) {
      return values.reduce((partialSum, a) => partialSum + a, 0);
    }
  }

  return score;
}

export const fullHouseScore = (dices) => {
  const values = valuesToArray(dices);
  let score = 0;
  const pairs = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6]];
  const threes = [[1, 1, 1], [2, 2, 2], [3, 3, 3], [4, 4, 4], [5, 5, 5], [6, 6, 6]];

  for(let i = 0; i < pairs.length; i++) {
    let pair = values.filter(value => pairs[i].includes(value));
    
    if(pair.length === 2) {
      for(let i = 0; i < threes.length; i++) {
        let three = values.filter(value => threes[i].includes(value));

        if(three.length === 3 && three[0] !== pair[0]) {
          
          score = 25;
          return score;
        }
      }
    }
  }

  return score;
}

export const smallStraightScore = (dices) => {
  const values = valuesToArray(dices);
  const variant1 = [1, 2, 3, 4];
  const variant2 = [2, 3, 4, 5];
  const variant3 = [3, 4, 5, 6]; 
  let score = 0;

  const variant1Chcek = variant1.every(value => {
    return values.includes(value);
  });
  const variant2Chcek = variant2.every(value => {
    return values.includes(value);
  });
  const variant3Chcek = variant3.every(value => {
    return values.includes(value);
  });

  if(variant1Chcek || variant2Chcek || variant3Chcek) {
    score = 30
    return score;
  }

  return score;
}

export const largeStraightScore = (dices) => {
  const values = valuesToArray(dices);
  const variant1 = [1, 2, 3, 4, 5];
  const variant2 = [2, 3, 4, 5, 6];
  let score = 0;

  const variant1Chcek = variant1.every((value) => {
    return values.includes(value);
  });
  const variant2Chcek = variant2.every((value) => {
    return values.includes(value);
  })

  if(variant1Chcek || variant2Chcek) {
    score = 40;
    return score;
  }

  return score;
}

export const yahtzeeScore = (dices) => {
  const values = valuesToArray(dices);
  let score = 0;

  if(values.every((val, i, arr) => val === arr[0])) {
    score = 50;
  }

  return score;
}

export const bonusScore = (total) => {
  let bonus = 0;
  
  if(total >= 63) {
    bonus = 35;
  }

  return bonus;
}

export const grandTotalScore = (scoreValue) => {
  let sum = 0;
  const includedKeys = ['total', '3 of kind', '4 of kind', 'full house', 'small straight', 'large straight', 'yahtzee', 'chance'];

  for (let [key, value] of scoreValue) {
    if(parseInt(value)) {
      if(includedKeys.includes(key)) {
        sum += value;
      }
    }
  }

  return sum;
}
