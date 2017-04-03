function requestError(err) {
  $('.loading').addClass('hide')
  Materialize.toast("Fetch failed! " + err, 4000, 'red')
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
  $('.loading').addClass('hide')
  if (res.ok) {
    res.json().then(data => {
      Elem.koreanResult.innerHTML = JSON.stringify(data, color_code, 4);
    });
  } else {
    Materialize.toast("Looks like the response wasn't perfect... Status " + res.status, 4000, 'red');
  }
}

function requestProcess(api, text) {
  $('.loading').removeClass('hide')
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

  if (koreanLen > 800) {
    var koreanText = Elem.koreanInput.value;
    Elem.koreanInput.value = koreanText.substr(0, 800);
    Elem.koreanLen.innerHTML = '<font color=red>800/800</font>';
  } else {
    Elem.koreanLen.innerHTML = `${koreanLen}/800`;
  }

  Elem.koreanInput.style.height = "1px";
  Elem.koreanInput.style.height = (25+Elem.koreanInput.scrollHeight)+"px";
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
