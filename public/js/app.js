function requestError(err) {
  console.log("Fetch failed!", err);
}

function requestSuccess(res) {
  if (res.ok) {
    res.json().then(data => {
      Elem.koreanResult.innerText = JSON.stringify(data);
    });
  } else {
    console.log("Looks like the response wasn't perfect, got status", res.status);
  }
}

function requestProcess(api, text) {
  const url = `https://open-korean-text.herokuapp.com/${api}?text=${text}`;
  const method = 'GET';
  fetch(url, { method }).then(requestSuccess, requestError);
}

function extractPhrases() {
  const koreanText = Elem.koreanInput.value;
  requestProcess('extractPhrases', koreanText);
}

function tokenize() {
  const koreanText = Elem.koreanInput.value;
  requestProcess('tokenize', koreanText);
}

function normalize() {
  const koreanText = Elem.koreanInput.value;
  requestProcess('normalize', koreanText);
}

function checkKoreanInput() {
  const koreanLen = Elem.koreanInput.value.length;
  Elem.koreanLen.innerText = `${koreanLen}/1000`;
}

window.addEventListener('load', () => {
  Elem.koreanInput = document.querySelector('#korean_input');
  Elem.koreanLen = document.querySelector('#korean_len');
  Elem.koreanResult = document.querySelector('#korean_result');
  Elem.normalizeButton = document.querySelector('#normalize_button');
  Elem.tokenizeButton = document.querySelector('#tokenize_button');
  Elem.extractPhrasesButton = document.querySelector('#extract_phrases_button');

  Elem.koreanInput.addEventListener('keyup', checkKoreanInput);
  Elem.normalizeButton.addEventListener('click', normalize);
  Elem.tokenizeButton.addEventListener('click', tokenize);
  Elem.extractPhrasesButton.addEventListener('click', extractPhrases);
});

var Elem = {
  koreanInput: null,
  koreanLen: null,
  koreanResult: null,
  normalizeButton: null,
  tokenizeButton: null,
  extractPhrasesButton: null,
};
