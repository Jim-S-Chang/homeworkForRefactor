const rankTest = require('ava');
const { rating, voyageRisk, captainHistoryRisk, voyageProfitFactor } = require('../src/rank');

rankTest('voyageRisk test voyage length > 8', t => {
  const voyage = {
    zone: 'west-indies',
    length: 10,
  };
  const result = voyageRisk(voyage)

  t.is(result, 5);
})

rankTest('voyageRisk test voyage length > 4 but < 8', t => {
  const voyage = {
    zone: 'west-indies',
    length: 6,
  };
  const result = voyageRisk(voyage)

  t.is(result, 3);
})

rankTest('voyageRisk test voyage length < 4', t => {
  const voyage = {
    zone: 'west-indies',
    length: 3,
  };
  const result = voyageRisk(voyage)

  t.is(result, 1);
})

rankTest('voyageRisk test voyage length > 8 and zone==china', t => {
  const voyage = {
    zone: 'china',
    length: 10,
  };
  const result = voyageRisk(voyage)

  t.is(result, 9);
})

rankTest('captainHistoryRisk test history length < 5 and zone!=china', t => {
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

  const result = captainHistoryRisk(voyage, history)

  t.is(result, 6);
})

rankTest('captainHistoryRisk test history length < 5 and zone==china', t => {
  const voyage = {
    zone: 'china',
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

  const result = captainHistoryRisk(voyage, history)

  t.is(result, 4);
})

rankTest('captainHistoryRisk test history length > 5 and zone==china', t => {
  const voyage = {
    zone: 'china',
    length: 10,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = captainHistoryRisk(voyage, history)

  t.is(result, 0);
})

rankTest('voyageProfitFactor test history length < 10 and zone==china and hasChina and voyage length < 12', t => {
  const voyage = {
    zone: 'china',
    length: 10,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = voyageProfitFactor(voyage, history)

  t.is(result, 6);
})

rankTest('voyageProfitFactor test history length < 10 and zone==china and hasChina and voyage length > 12 but < 18', t => {
  const voyage = {
    zone: 'china',
    length: 13,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = voyageProfitFactor(voyage, history)

  t.is(result, 7);
})

rankTest('voyageProfitFactor test history length < 10 and zone==china and hasChina and voyage length > 18', t => {
  const voyage = {
    zone: 'china',
    length: 19,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = voyageProfitFactor(voyage, history)

  t.is(result, 6);
})

rankTest('voyageProfitFactor test history length > 10 and zone==china and hasChina and voyage length > 18', t => {
  const voyage = {
    zone: 'china',
    length: 19,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'china',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = voyageProfitFactor(voyage, history)

  t.is(result, 7);
})

rankTest('voyageProfitFactor test history length < 10 and zone==china and has no China and history.length < 8 and voyage.length > 14', t => {
  const voyage = {
    zone: 'china',
    length: 15,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'east-indies',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = voyageProfitFactor(voyage, history)

  t.is(result, 2);
})

rankTest('voyageProfitFactor test history length < 10 and zone==china and has no China and history.length > 8 and voyage.length = 14', t => {
  const voyage = {
    zone: 'china',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'east-indies',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = voyageProfitFactor(voyage, history)

  t.is(result, 4);
})

rankTest('voyageProfitFactor test history length < 10 and zone==east-indies and has no China and history.length > 8 and voyage.length = 14', t => {
  const voyage = {
    zone: 'east-indies',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'east-indies',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = voyageProfitFactor(voyage, history)

  t.is(result, 4);
})

rankTest('voyageProfitFactor test history length < 10 and zone==west-indies and has no China and history.length > 8 and voyage.length = 14', t => {
  const voyage = {
    zone: 'west-indies',
    length: 14,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'east-indies',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = voyageProfitFactor(voyage, history)

  t.is(result, 3);
})

rankTest('rating test return A', t => {
  const voyage = {
    zone: 'china',
    length: 13,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'east-indies',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'china',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-africa',
      profit: 7,
    }
  ];

  const result = rating(voyage, history)

  t.is(result, 'A');
})

rankTest('rating test return B', t => {
  const voyage = {
    zone: 'west-indies',
    length: 15,
  };
  const history = [
    {
      zone: 'east-indies',
      profit: 5,
    },
    {
      zone: 'west-indies',
      profit: 15,
    },
    {
      zone: 'east-indies',
      profit: 2,
    },
    {
      zone: 'west-africa',
      profit: 7,
    },
    {
      zone: 'west-indies',
      profit: 15,
    }
  ];

  const result = rating(voyage, history)

  t.is(result, 'B');
})
