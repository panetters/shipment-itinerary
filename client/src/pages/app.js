import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'Hello World',
    };
  }

  render() {
    const { test } = this.state;

    return <div>{test}</div>;
  }
}

export default App;
