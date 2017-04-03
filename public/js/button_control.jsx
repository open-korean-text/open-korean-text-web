class ActionButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedAction: "normalize"};

    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(selectedAction) {
    this.setState({selectedAction: selectedAction})
    const koreanText = Elem.koreanInput.value;
    requestProcess(selectedAction, koreanText)
  }

  render() {
    return <ul className="button_container">
      <ActionButton action="Normalize" current={this.state.selectedAction}
                    clickAction={this.handleClick.bind(this, "normalize")}/>
      <ActionButton action="Tokenize" current={this.state.selectedAction}
                    clickAction={this.handleClick.bind(this, "tokenize")}/>
      <ActionButton action="Extract Phrases"
                    current={this.state.selectedAction}
                    clickAction={this.handleClick.bind(this, "extractPhrases")}/>)
    </ul>
  }
}

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  isActive() {
    return this.props.current === this.props.request ? 'active_button' : ''
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
  <ActionButtonGroup/>,
  document.getElementById('buttons')
);