document.addEventListener("DOMContentLoaded", function () {
  // ADDING RULES
  var btnAdd = document.querySelector("#rule-btn-add");
  btnAdd.addEventListener("click", addRule);
  function addRule() {
    // Select the destenation container and element
    var rulePlace = document.querySelector(".container-rules");
    var newRule = document.querySelector(".rule");
    const ruleClone = newRule.cloneNode(true);

    // Remove IDs to avoid duplication
    ruleClone.removeAttribute("id");
    var inputs = ruleClone.querySelectorAll("input");
    inputs.forEach((input) => {
      input.removeAttribute("id");
      input.value = "";
    });

    // Append the cloned element and update IDs
    rulePlace.appendChild(ruleClone);
    updateRuleIDs();
  }
  function updateRuleIDs() {
    var rules = document.querySelectorAll(".rule");
    rules.forEach((rule, index) => {
      rule.id = "rule-" + (index + 1);
      var inputs = rule.querySelectorAll("input");
      inputs.forEach((input, inputIndex) => {
        input.id = input.className.split(" ")[1] + "-" + (index + 1);
      });
    });
  }
  // ADDING SHORTS
  var btnAddShort = document.querySelector("#short-btn-add");
  btnAddShort.addEventListener("click", addShort);
  function addShort() {
    // Select destenation container and element to clone
    var shortPlace = document.querySelector(".container-shorts");
    var newShort = document.querySelector(".short");
    const shortClone = newShort.cloneNode(true);

    // Remove IDs to avoid duplication
    shortClone.removeAttribute("id");
    var inputs = shortClone.querySelectorAll("input");
    inputs.forEach((input) => {
      input.removeAttribute("id");
      input.value = "";
    });

    // Append the cloned element and update IDs
    shortPlace.appendChild(shortClone);
    updateShortIDs();
  }
  function updateShortIDs() {
    var shorts = document.querySelectorAll(".short");
    shorts.forEach((short, index) => {
      short.id = "short-" + (index + 1);
      var inputs = short.querySelectorAll("input");
      inputs.forEach((input, inputIndex) => {
        input.id = input.className.split(" ")[1] + "-" + (index + 1);
      });
    });
  }

  // SYMBOLMEANINGMAP
  function replaceSymbolsWithMeanings(inputText, symbolMeaningMap) {
    symbolMeaningMap.forEach((meaning, symbol) => {
      var regex = new RegExp(symbol, "g");
      inputText = inputText.replace(regex, meaning);
    });
    return inputText;
  }

  // WAT ER GEBEURT ALS REGELS MOETEN VERANDEREN
  function applyRuleChanges(
    currentChar,
    newChar,
    beforeChar,
    afterChar,
    unlessBeforeChar,
    unlessAfterChar,
    text
  ) {
    // Vanaf hier uitvoeren als er geen getallen zijn of als alle getallen symbolen dezelfde waarde hebben. Als dit niet het geval is naar volgende regel
    var currentCharsArray = currentChar.split(" ");
    var newCharsArray = newChar.split(" ");

    for (var i = 0; i < currentCharsArray.length; i++) {
      var currentChar = currentCharsArray[i];
      var newChar = newCharsArray[i];

      if (
        currentChar &&
        newChar &&
        !beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx1 1-1- 0-0-0-0");
        currentChar = currentChar.replace(/Ø/g, ""); //Should never happen (current char can't be nothing if no conditions)
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(currentChar, "gm");
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx2 1-1- 1-0-0-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(`(?<=${beforeChar}:?"?:?)${currentChar}`, "gm");
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx3 1-1- 0-1-0-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(`${currentChar}(?="?:?"?${afterChar})`, "gm");
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx4 1-1- 1-1-0-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx5 1-1- 0-0-1-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)${currentChar}`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx6 1-1- 0-0-0-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `${currentChar}(?!"?:?"?${unlessAfterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx7 1-1- 0-0-1-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)${currentChar}(?!"?:?"?${unlessAfterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx8 1-1- 1-0-1-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}(?!"?:?"?${unlessAfterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx9 1-1- 0-1-1-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx10 1-1- 1-1-1-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx11 1-1- 1-1-1-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx12 1-1- 1-1-0-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<=${beforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx13 1-1- 0-1-0-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `${currentChar}(?="?:?"?${afterChar})(?!"?:?"?${unlessAfterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        !beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx14 1-1- 0-1-1-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)${currentChar}(?="?:?"?${afterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        console.log("regEx15 1-1- 1-0-0-1");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<=${beforeChar}:?"?:?)${currentChar}(?!"?:?"?${unlessAfterChar})`,
          "gm"
        );
        text = text.replace(regex, newChar);
      } else if (
        currentChar &&
        newChar &&
        beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        console.log("regEx16 1-1- 1-0-1-0");
        currentChar = currentChar.replace(/Ø/g, "");
        newChar = newChar.replace(/Ø/g, "");
        var regex = new RegExp(
          `(?<!${unlessBeforeChar}:?"?:?)(?<=${beforeChar}:?"?:?)${currentChar}`,
          "gm"
        );
        text = text.replace(regex, newChar);
      }
    }
    return text;
  }

  function filledFields(
    currentChar,
    newChar,
    beforeChar,
    afterChar,
    unlessBeforeChar,
    unlessAfterChar,
    text
  ) {
    var filledFieldsAre = "";

    var currentCharsArray = currentChar.split(" ");
    var newCharsArray = newChar.split(" ");

    for (var i = 0; i < currentCharsArray.length; i++) {
      var curChar = currentCharsArray[i];
      var newCharItem = newCharsArray[i];

      if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNew";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewBef";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewAft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefAft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewUnlbef";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewUnlbefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefUnlbefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewAftUnlbefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefAftUnlbefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefAftUnlbef";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefAftUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewAftUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        !beforeChar &&
        afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewAftUnlbef";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        !afterChar &&
        !unlessBeforeChar &&
        unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefUnlaft";
      } else if (
        curChar &&
        newCharItem &&
        beforeChar &&
        !afterChar &&
        unlessBeforeChar &&
        !unlessAfterChar
      ) {
        filledFieldsAre = "curNewBefUnlbef";
      }
    }

    return filledFieldsAre;
  }

  // GO THROUGH RULES AND GIVE OUTPUT
  function mySubmit() {
    var text = document.getElementById("myText").value;

    // Get all shorts and create a symbol-meaning map
    var shorts = document.querySelectorAll(".short");
    var symbolMeaningMap = new Map();
    shorts.forEach((short) => {
      var symbol = short.querySelector(".symbol-char").value;
      var meaning = short.querySelector(".meaning-char").value;
      meaning = meaning.replace(/\s+/g, "").replace(/^/, "[").replace(/$/, "]");
      if (symbol && meaning) {
        symbolMeaningMap.set(symbol, meaning);
      }
    });

    var rules = document.querySelectorAll(".rule");
    rules.forEach((rule) => {
      // > rule loop
      let rightConditions = false;
      var digitsPresent = false;

      var ruleInputs = rule.querySelectorAll(".rule-input");

      var detectDigit = /\d+/;
      ruleInputs.forEach((inputField) => {
        var thisChar = inputField.value;
        if (detectDigit.test(thisChar)) {
          digitsPresent = true;
        }
      });

      // alle inputvelden aanhalen
      var currentChar = replaceSymbolsWithMeanings(
        rule.querySelector(".cur-char").value,
        symbolMeaningMap
      );
      currentChar = currentChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");

      var newChar = replaceSymbolsWithMeanings(
        rule.querySelector(".new-char").value,
        symbolMeaningMap
      );
      newChar = newChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\d/g, "");

      var beforeChar = replaceSymbolsWithMeanings(
        rule.querySelector(".bef-char").value,
        symbolMeaningMap
      );
      beforeChar = beforeChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");
      beforeChar = beforeChar.replace(/#/gm, "^");

      var afterChar = replaceSymbolsWithMeanings(
        rule.querySelector(".aft-char").value,
        symbolMeaningMap
      );
      afterChar = afterChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");
      afterChar = afterChar.replace(/#/gm, "$");

      var unlessBeforeChar = replaceSymbolsWithMeanings(
        rule.querySelector(".unl-bef").value,
        symbolMeaningMap
      );
      unlessBeforeChar = unlessBeforeChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");
      unlessBeforeChar = unlessBeforeChar.replace(/#/gm, "^");

      var unlessAfterChar = replaceSymbolsWithMeanings(
        rule.querySelector(".unl-aft").value,
        symbolMeaningMap
      );
      unlessAfterChar = unlessAfterChar
        .replace(/[{}]/g, "")
        .replace(/,/g, "|")
        .replace(/\(/g, "")
        .replace(/\)/g, "?")
        .replace(/\./g, "\\.")
        .replace(/\d/g, "");
      unlessAfterChar = unlessAfterChar.replace(/#/gm, "$");

      if (digitsPresent) {
        // > digits if
        var allKeys = [];
        symbolMeaningMap.forEach((value, key) => {
          allKeys.push(key);
        });

        let equalBefCurAft = [];
        allKeys.forEach((thisKey) => {
          // > symbol loop
          var digitArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

          const allEqual = (array) =>
            array.length > 0 && array.every((v) => v === array[0]);

          digitArray.forEach((thisDigit) => {
            // > digit loop
            var thisDigitArray = new RegExp(`${thisKey}${thisDigit}`, "g");
            let digitPresent = false;

            var theseElements = [];
            ruleInputs.forEach((inputField) => {
              // > field loop

              const symbolValue = symbolMeaningMap.get(thisKey);

              let indices = [];

              var thisChar = inputField.value;
              if (thisDigitArray.test(thisChar)) {
                // > digitSymbol combi if

                var result = filledFields(
                  currentChar,
                  newChar,
                  beforeChar,
                  afterChar,
                  unlessBeforeChar,
                  unlessAfterChar,
                  text
                );
                var patternBef = "";
                var patternCur = "";
                var patternAft = "";
                var patternUnlBef = "";
                var patternUnlAft = "";

                // als speciale combi tussen inputfields
                if (result === "curNew") {
                  console.log("2. curNew is true");
                  patternCur += `${currentChar}`;
                } else if (result === "curNewBef") {
                  console.log("2. curNewBef is true");
                  patternBef += `${beforeChar}(?=${currentChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}`;
                } else if (result === "curNewAft") {
                  console.log("2. curNewAft is true");
                  patternCur += `${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${currentChar})${afterChar}`;
                } else if (result === "curNewBefAft") {
                  console.log("2. curNewBefAft is true");
                  patternBef += `${beforeChar}(?=${currentChar}${afterChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                } else if (result === "curNewUnlbef") {
                  console.log("2. curNewUnlbef is true");
                  patternCur += `${currentChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar})`;
                } else if (result === "curNewUnlaft") {
                  console.log("2. curNewUnlaft is true");
                  patternCur += `${currentChar}`;
                  patternUnlAft += `(?<=${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewUnlbefUnlaft") {
                  console.log("2. curNewUnlbefUnlaft is true");
                  patternCur += `${currentChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar})`;
                  patternUnlAft += `(?<=${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewBefUnlbefUnlaft") {
                  console.log("2. curNewBefUnlbefUnlaft is true");
                  patternBef += `${beforeChar}(?=${currentChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar})`;
                  patternUnlAft += `(?<=${beforeChar}${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewAftUnlbefUnlaft") {
                  console.log("2. curNewAftUnlbefUnlaft is true");
                  patternCur += `${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar}${afterChar})`;
                  patternUnlAft += `(?<=${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewBefAftUnlbefUnlaft") {
                  console.log("2. curNewBefAftUnlbefUnlaft is true");
                  patternBef += `${beforeChar}(?=${currentChar}${afterChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar}${afterChar})`;
                  patternUnlAft += `(?<=${beforeChar}${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewBefAftUnlbef") {
                  console.log("2. curNewBefAftUnlbef is true");
                  patternBef += `${beforeChar}(?=${currentChar}${afterChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar}${afterChar})`;
                } else if (result === "curNewBefAftUnlaft") {
                  console.log("2. curNewBefAftUnlaft is true");
                  patternBef += `${beforeChar}(?=${currentChar}${afterChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${beforeChar}${currentChar})${afterChar}`;
                  patternUnlAft += `(?<=${beforeChar}${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewAftUnlaft") {
                  console.log("2. curNewAftUnlaft is true");
                  patternCur += `${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${currentChar})${afterChar}`;
                  patternUnlAft += `(?<=${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewAftUnlbef") {
                  console.log("2. curNewAftUnlbef is true");
                  patternCur += `${currentChar}(?=${afterChar})`;
                  patternAft += `(?<=${currentChar})${afterChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar}${afterChar})`;
                } else if (result === "curNewBefUnlaft") {
                  console.log("2. curNewBefUnlaft is true");
                  patternBef += `${beforeChar}(?=${currentChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}`;
                  patternUnlAft += `(?<=${beforeChar}${currentChar})${unlessAfterChar}`;
                } else if (result === "curNewBefUnlbef") {
                  console.log("2. curNewBefUnlbef is true");
                  patternBef += `${beforeChar}(?=${currentChar})`;
                  patternCur += `(?<=${beforeChar})${currentChar}`;
                  patternUnlBef += `${unlessBeforeChar}(?<=${currentChar})`;
                }

                // als inputfield is specifiek character
                if (inputField.classList.contains("cur-char")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)"
                  );
                  for (const match of text.matchAll(patternCur)) {
                    indices.push(match.index);
                  }
                }
                if (inputField.classList.contains("bef-char")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)"
                  );
                  for (const match of text.matchAll(patternBef)) {
                    indices.push(match.index);
                  }
                }
                if (inputField.classList.contains("aft-char")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)"
                  );
                  for (const match of text.matchAll(patternAft)) {
                    indices.push(match.index);
                  }
                }
                if (inputField.classList.contains("unl-bef")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)"
                  );
                  for (const match of text.matchAll(patternUnlBef)) {
                    indices.push(match.index);
                  }
                }
                if (inputField.classList.contains("unl-aft")) {
                  var symbolValueBrackets = thisChar.replace(
                    new RegExp(thisDigit, "g"),
                    "($&)"
                  );
                  for (const match of text.matchAll(patternUnlAft)) {
                    indices.push(match.index);
                  }
                }

                indices.forEach((index) => {
                  // > index loop
                  const element = text[index];
                  theseElements.push(element);
                });

                if (allEqual(theseElements)) {
                  equalValues = true;
                } else {
                  equalValues = false;
                }

                equalBefCurAft.push(equalValues);

                if (equalValues) {
                  document.querySelector(
                    ".container-output"
                  ).style.backgroundColor = "green";
                } else {
                  document.querySelector(
                    ".container-output"
                  ).style.backgroundColor = "red";
                }
              } else {
                // < digitSymbol combi if
              }
            }); // < field loop
          }); // < digit loop
        }); // < symbol loop

        // Check if all values in equalBefCurAft are true and run specific code
        if (equalBefCurAft.every((val) => val)) {
          rightConditions = true;
        } else {
          rightConditions = false;
        }
      } else {
        // < digits if
        rightConditions = true;
      }

      if (rightConditions) {
        // Dit werkt, maar hij voert de regel niet uit. Waarschijnlijk omdat hij de cijfers meepakt
        text = applyRuleChanges(
          currentChar,
          newChar,
          beforeChar,
          afterChar,
          unlessBeforeChar,
          unlessAfterChar,
          text
        );
        console.log(`rightConditions: ${rightConditions}`);
      } else {
        console.log(`rightConditions: ${rightConditions}`);
      }
    }); // < rule loop

    document.getElementById(
      "output-word"
    ).textContent = `Transformed word: ${text}`;
  }

  function saveData() {
    const rules = document.querySelectorAll(".rule");
    const symbols = document.querySelectorAll(".short");

    const rulesData = {
      rules: [],
      symbols: [],
    };

    // Collect rules data
    rules.forEach((rule) => {
      rulesData.rules.push({
        cChar: rule.querySelector(".cur-char").value,
        nChar: rule.querySelector(".new-char").value,
        bChar: rule.querySelector(".bef-char").value,
        aChar: rule.querySelector(".aft-char").value,
        uBChar: rule.querySelector(".unl-bef").value,
        uAChar: rule.querySelector(".unl-aft").value,
      });
    });

    // Collect symbols data
    symbols.forEach((symbol) => {
      rulesData.symbols.push({
        sChar: symbol.querySelector(".symbol-char").value,
        mChar: symbol.querySelector(".meaning-char").value,
      });
    });

    // Save data to localStorage
    localStorage.setItem("rulesData", JSON.stringify(rulesData));
    alert("Data saved successfully!");
  }
  function loadData() {
    // Retrieve the JSON string from localStorage and check if there is data
    const dataToLoadJSON = localStorage.getItem("rulesData");
    if (dataToLoadJSON) {
      // Parse the JSON string back to an object
      const dataToLoad = JSON.parse(dataToLoadJSON);

      // Get the number of current and saved rules and add more if necessary
      const numOfRulesPresent = document.querySelectorAll(".rule").length;
      const numOfRulesToLoad = dataToLoad.rules.length;

      for (let i = numOfRulesPresent; i < numOfRulesToLoad; i++) {
        addRule();
      }

      // Fill the form fields with the rules data
      const rules = document.querySelectorAll(".rule");
      dataToLoad.rules.forEach((saveRule, index) => {
        if (rules[index]) {
          rules[index].querySelector(".cur-char").value = saveRule.cChar;
          rules[index].querySelector(".new-char").value = saveRule.nChar;
          rules[index].querySelector(".bef-char").value = saveRule.bChar;
          rules[index].querySelector(".aft-char").value = saveRule.aChar;
          rules[index].querySelector(".unl-bef").value = saveRule.uBChar;
          rules[index].querySelector(".unl-aft").value = saveRule.uAChar;
        }
      });

      // Get the number of current and saved symbols and add more if necessary
      const numOfSymbolsPresent = document.querySelectorAll(".short").length;
      const numOfSymbolsToLoad = dataToLoad.symbols.length;

      for (let i = numOfSymbolsPresent; i < numOfSymbolsToLoad; i++) {
        addShort();
      }

      // Fill the form fields with the symbols data
      const symbols = document.querySelectorAll(".short");
      dataToLoad.symbols.forEach((saveSymbol, index) => {
        if (symbols[index]) {
          symbols[index].querySelector(".symbol-char").value = saveSymbol.sChar;
          symbols[index].querySelector(".meaning-char").value =
            saveSymbol.mChar;
        }
      });
    } else {
      alert("No data found!");
    }
  }

  // Attach event listeners to buttons
  document.getElementById("saveData").addEventListener("click", saveData);
  document.getElementById("loadData").addEventListener("click", loadData);
  document.getElementById("mySubmit").addEventListener("click", mySubmit);
});
