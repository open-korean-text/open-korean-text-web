class VoteGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedCandidate: null};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(selectedCandidate) {
    this.setState({selectedCandidate: selectedCandidate})
    $("#submit_button").removeClass("disabled");
  }

  handleSubmit() {
    var ref = defaultDatabase.ref('/tokenization_votes/' + userUID + "/" + questionNumber + "/");

    ref.set(this.state.selectedCandidate);

    location.reload();
  }

  render() {
    var data = this.props.data

    var keys = Object.keys(this.props.data).filter(function (key) {
      return key.startsWith("tokenization") && data[key]
    });

    var thisPointer = this;

    var answers = keys.map(function (key) {
      return <Answer key={key}
                     answerKey={key}
                     answer={data[key]}
                     clickAction={thisPointer.handleClick.bind(thisPointer, key)}
                     current={thisPointer.state.selectedCandidate}
      />
    })

    defaultDatabase.ref('/tokenization_votes/' + userUID).once('value').then(function (snapshot) {
      var prevAnswers = snapshot.val() || {};
      var prevAnswerSize = Object.keys(prevAnswers).length;

      if (prevAnswers[questionNumber] && prevAnswerSize < 3000) {
        location.reload();
      }

      ReactDOM.render(
        <div>{prevAnswerSize} / 3000</div>,
        document.getElementById('prev_answer_count')
      );
    });

    return (
      <div className="problem">
        <div className="right" id="prev_answer_count"></div>

        <div className="question">
          <blockquote>{data["chunk"]}
            <a href={"https://www.google.com/search?q=" + data["chunk"]} target="_blank">
              <img src="img/search.png" className="search_icon"/>
            </a>
          </blockquote>
        </div>
        <div className="collection">
          {answers}
          <Answer key="wrong"
                  answerKey="wrong"
                  answer="모두 틀렸음"
                  clickAction={this.handleClick.bind(this, "wrong")}
                  current={this.state.selectedCandidate}
          />
          <Answer key="dunno"
                  answerKey="dunno"
                  answer="모르겠음"
                  clickAction={this.handleClick.bind(this, "dunno")}
                  current={this.state.selectedCandidate}
          />
        </div>
        <a className="submit_button btn disabled waves-effect waves-light right"
           id="submit_button"
           onClick={this.handleSubmit}
        >보내기</a>
      </div>
    )
  }
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  isActive() {
    return this.props.current === this.props.answerKey ? "active" : ""
  }

  render() {
    var parse = this.props.answer
    parse = replaceAll(parse, "Adverb", "부사");
    parse = replaceAll(parse, "Verb", "동사");
    parse = replaceAll(parse, ": [0-9]+, [0-9]+", "");
    parse = replaceAll(parse, "PreEomi", "선어말어미");
    parse = replaceAll(parse, "Eomi", "어미");
    parse = replaceAll(parse, "Adjective", "형용사");
    parse = replaceAll(parse, "Noun", "명사");
    parse = replaceAll(parse, "Josa", "조사");
    parse = replaceAll(parse, "Suffix", "접미사");
    parse = replaceAll(parse, "Prefix", "접두사");
    parse = replaceAll(parse, "Determiner", "지시사");
    parse = replaceAll(parse, "Exclamation", "감탄사");
    parse = replaceAll(parse, "Conjunction", "연결사");
    parse = replaceAll(parse, "/", " / ");

    return (
      <a href="#!" className={"collection-item waves-effect waves-light " + this.isActive()}
         onClick={this.props.clickAction}
      >{parse}</a>
    );
  }
}

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: 'eval.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//        firebase.auth.GithubAuthProvider.PROVIDER_ID,
//        firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
};

var userUID;
var userData;

window.addEventListener('load', function () {
  var logout = function () {
    firebase.auth().signOut().then(function () {
      $("#logged_in_container").hide();
      location.reload();
    }).catch(function (error) {
      // An error happened.
      alert(error);
    });
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $("#logged_in_container").show();
      $("#logged_out_container").hide();

      userUID = user.uid;
      userData = user.providerData[0];

      ReactDOM.render(
        <div className="chip">
          <img src={userData["photoURL"]}/>
          {userData["displayName"]}
          <a href="#!" onClick={logout}> [sign out]</a>
        </div>,
        document.getElementById('user-info')
      );

      ref.once('value').then(function (snapshot) {
        $("#legends").show();
        ReactDOM.render(
          <VoteGroup data={snapshot.val()}/>,
          document.getElementById('vote_container')
        );
      });
    } else {
      $("#logged_out_container").show();
      $("#logged_in_container").hide();
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
});





