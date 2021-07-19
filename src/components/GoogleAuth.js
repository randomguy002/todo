import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "92206042985-cku46tuqt966qaquu1eck5mbcqqa3q4s.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };
  onSignIn = () => {
    this.auth.signIn();
  };
  onSignOut = () => {
    this.auth.signOut();
  };
  googleAuthButton() {
    if (this.state.isSignedIn === null) return <div>...</div>;
    else if (this.state.isSignedIn)
      return (
        <div>
          <button onClick={this.onSignOut}>Sign Out</button>
        </div>
      );
    else
      return (
        <div>
          <button onClick={this.onSignOut}>Sign In</button>
        </div>
      );
  }

  render() {
    return <div>{this.googleAuthButton()}</div>;
  }
}
export default GoogleAuth;
