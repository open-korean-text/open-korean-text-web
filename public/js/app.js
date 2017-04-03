function requestError(err) {
  console.log("Fetch failed!", err);
}

function color_code(key, value) {
  if (typeof value === 'string' && value.match(/\(Noun:/)) {
    return "<span class='noun'>" + value + "</span>";
  }
  if (typeof value === 'string' && (value.match(/\(Prefix:/) || value.match(/\(Suffix:/))) {
    return "<span class='around-noun'>" + value + "</span>";
  }
  return value;
}

function requestSuccess(res) {
  if (res.ok) {
    res.json().then(data => {
      Elem.koreanResult.innerHTML = JSON.stringify(data, color_code, 4);
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

function koreanTextInput() {
  var koreanText = Elem.koreanInput.value;
  koreanText = koreanText.replace(/\n/g, " ");
  return koreanText;
}

function checkKoreanInput() {
  const koreanLen = Elem.koreanInput.value.length;

  if (koreanLen > 1000) {
    alert('Sorry, the input is limited to 1000 characters.');
    var koreanText = Elem.koreanInput.value;
    Elem.koreanInput.value = koreanText.substr(0, 1000);
    Elem.koreanLen.innerText = '1000/1000';
  } else {
    Elem.koreanLen.innerText = `${koreanLen}/1000`;
  }
}

window.addEventListener('load', () => {
  Elem.koreanInput = document.querySelector('#korean_input');
  Elem.koreanLen = document.querySelector('#korean_len');
  Elem.koreanResult = document.querySelector('#korean_result');

  Elem.koreanInput.addEventListener('input', checkKoreanInput);
});

var Elem = {
  koreanInput: null,
  koreanLen: null,
  koreanResult: null,
};
