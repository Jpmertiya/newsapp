import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          {/* this is top loading bar */}
          <LoadingBar
            color='#f11946'
            height={4}
            progress={this.state.progress}
          />
          <Routes>

            <Route exact path="/" key="general" element={<News setProgress={this.setProgress} country={"in"} category={"general"} pageSize={9} />}>
            </Route>
            <Route exact path="/science"
              key="science" element={<News setProgress={this.setProgress} country={"in"} category={"science"} pageSize={9} />} >
            </Route>
            <Route exact path="/business" key="business" element={
              <News setProgress={this.setProgress} country={"in"} category={"business"} pageSize={9} />}>
            </Route>
            <Route exact path="/entertainment" key="entertainment" element={
              <News setProgress={this.setProgress} country={"in"} category={"entertainment"} pageSize={9} />}>
            </Route>
            <Route exact path="/health" key="health" element={<News setProgress={this.setProgress} country={"in"} category={"health"} pageSize={9} />}>
            </Route>
            <Route exact path="/sports" key="sports"
              element={<News setProgress={this.setProgress} country={"in"} category={"sports"} pageSize={9} />}>
            </Route>
            <Route exact path="/technology" key="technology" element={
              <News setProgress={this.setProgress} country={"in"} category={"technology"} pageSize={9} />}>
            </Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
