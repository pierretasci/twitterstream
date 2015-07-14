import React 			from "react";
import {Router, Route} from "react-router";
import {history} 	from "react-router/lib/BrowserHistory";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}

	render() {
		return (
			<div>
			</div>
		);
	}

}

const routes = (
	<Router handler={App} />
);

// SETUP
React.render((
  <Router history={history}>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.body);

export default App;