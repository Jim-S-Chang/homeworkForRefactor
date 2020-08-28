function voyageRisk (voyage) {
  let result = 1;
  result += plusRiskByVoyageLength(voyage.length)
  isZoneEqualsChinaOrEastIndies(voyage.zone, () => result += 4)
  return Math.max(result, 0);
}

function plusRiskByVoyageLength(length) {
  let result = 0
  result += length > 4 ? 2: 0;
  result += length > 8 ? length - 8: 0;
  return result
}

function hasChina (history) {
  return history.some(v => 'china' === v.zone);
}

function captainHistoryRisk (voyage, history) {
  let result = 1;
  plusByLengthIsBiggerThan(-history.length, -5, () => { result += 4 })
  result += history.filter(v => v.profit < 0).length;
  isZoneEqualsChinaAndHasChinaHistory(voyage, history, () => result -= 2)
  return Math.max(result, 0);
}

function voyageProfitFactor (voyage, history) {
  let result = 2;
  isZoneEqualsChinaOrEastIndies(voyage.zone, () => result += 1)

  isZoneEqualsChinaAndHasChinaHistory(voyage, history, () => {
    plusByLengthIsBiggerThan(history.length, 10, () => { result += 4 }, () => { result +=3 })
    plusByLengthIsBiggerThan(voyage.length, 12, () => { result += 1 })
    plusByLengthIsBiggerThan(voyage.length, 18, () => { result -= 1 })
  }, () => {
    plusByLengthIsBiggerThan(history.length, 8, () => { result += 1 })
    plusByLengthIsBiggerThan(voyage.length, 14, () => { result -= 1 })
  })

  return result;
}

function plusByLengthIsBiggerThan(length, number, trueCallBack, falseCallBack=()=>{}) {
  if (length > number) {
    trueCallBack()
  } else {
    falseCallBack()
  }
}

function rating (voyage, history) {
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);

  return vpf * 3 > (vr + chr * 2) ? 'A' : 'B'
}

function isZoneEqualsChinaAndHasChinaHistory(voyage, history, trueCallBack, falseCallBack=()=>{}) {
  if (voyage.zone === 'china' && hasChina(history)) {
    trueCallBack()
  } else {
    falseCallBack()
  }
}

function isZoneEqualsChinaOrEastIndies(zone, trueCallBack, falseCallBack=()=>{}) {
  if (zone === 'china' || zone === 'east-indies') {
    trueCallBack()
  } else {
    falseCallBack()
  }
}

module.exports = {
  rating,
  voyageProfitFactor,
  voyageRisk,
  captainHistoryRisk
};

const voyage = {
  zone: 'west-indies',
  length: 10,
};
const history = [
  {
    zone: 'east-indies',
    profit: 5,
  },{
    zone: 'west-indies',
    profit: 15,
  },{
    zone: 'china',
    profit: -2,
  },
  {
    zone: 'west-africa',
    profit: 7,
  },
];
const myRating = rating(voyage, history);
console.log(`myRating: ${myRating}`);
