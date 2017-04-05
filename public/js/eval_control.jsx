class VoteGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedAction: null};
  }

  handleClick(selectedAction) {
    this.setState({selectedAction: selectedAction})
    requestProcess(selectedAction, koreanTextInput())
  }

  render() {
    return <div className="collection">
      <a href="#!" className="collection-item">Alvin</a>
      <a href="#!" className="collection-item active">Alvin</a>
      <a href="#!" className="collection-item">Alvin</a>
      <a href="#!" className="collection-item">Alvin</a>
    </div>
  }
}

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  isActive() {
    return this.props.current === this.props.request ? "active_button" : ""
  }

  render() {
    return (
      <li className=
            {'action_button black-text grey lighten-4 waves-effect waves-dark ' + this.isActive()}
          onClick={this.props.clickAction}>
        {this.props.action}
      </li>
    );
  }
}

ReactDOM.render(
  <VoteGroup/>,
  document.getElementById('vote_container')
);