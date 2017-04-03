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

function koreanTextInput() {
  var koreanText = Elem.koreanInput.value;
  koreanText = koreanText.replace(/\n/g, " ");
  return koreanText;
}

function checkKoreanInput() {
  const koreanLen = Elem.koreanInput.value.length;

  if (koreanLen > 1000) {
    alert('The text length was exceed');
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
