import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import GlobalStyle from "./assets/styles/globalStyles"

import Home from "./pages/home"

import Header from "./components/header"
import Footer from "./components/footer"
import ScrollToTop from "./components/scrollToTop"

const App = () => {
  return (
    <>
      <main>
        <GlobalStyle />
        <Router>
          <ScrollToTop />
          <Header />
          <Switch>
            <Route path="/properties"></Route>
            <Route path="/investments"></Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
          <Footer id="contact" />
        </Router>
      </main>
    </>
  )
}

export default App
