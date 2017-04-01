/**
 * Created by will_ryu on 3/31/17.
 */

$("a#normalize").click(
  function () {
    $.get(
      "https://open-korean-text.herokuapp.com/normalize?text=오픈코리안텍스트",
      function (data) {
        alert("Data Loaded: " + data);
      }
    )
  }
)