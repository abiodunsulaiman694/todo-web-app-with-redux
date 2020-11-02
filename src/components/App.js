import React, { useState, useContext } from "react";
import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./Header";
import Sidebar from "./layouts/Sidebar";
import MainLayout from "./layouts/MainLayout";
import HomePage from "../pages/index";
import ImportantPage from "../pages/important";
import PendingPage from "../pages/pending";
import CompletedPage from "../pages/completed";
import PlannedPage from "../pages/planned";
import SearchPage from "../pages/search";
import ErrorFallback from "./ErrorFallBack";
import "../assets/styles/App.css";
const DetailContext = React.createContext();

export const DetailProvider = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detailTodo, setDetailTodo] = useState(null);
  const value = [showDetail, setShowDetail, detailTodo, setDetailTodo];
  return <DetailContext.Provider value={value} {...props} />;
};

export const useDetail = () => {
  const context = useContext(DetailContext);
  if (!context) {
    throw new Error("useDetail must be used within a detail provider");
  }
  return context;
};

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div className="content">
          <Sidebar />
          <DetailProvider>
            <MainLayout>
              <div className="todo-list-container">
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => {
                    // reset the state of your app so the error doesn't happen again
                  }}
                >
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={(routeProps) => {
                        return <HomePage {...routeProps} />;
                      }}
                    />
                    <Route
                      exact
                      path="/important"
                      render={(routeProps) => {
                        return <ImportantPage {...routeProps} />;
                      }}
                    />
                    <Route
                      exact
                      path="/pending"
                      render={(routeProps) => {
                        return <PendingPage {...routeProps} />;
                      }}
                    />
                    <Route
                      exact
                      path="/completed"
                      render={(routeProps) => {
                        return <CompletedPage {...routeProps} />;
                      }}
                    />
                    <Route
                      exact
                      path="/planned"
                      render={(routeProps) => {
                        return <PlannedPage {...routeProps} />;
                      }}
                    />
                    <Route
                      exact
                      path="/search"
                      render={(routeProps) => {
                        return <SearchPage {...routeProps} />;
                      }}
                    />
                    {/* <Route path="*" component={NoMatch} />  */}
                  </Switch>
                </ErrorBoundary>
              </div>
            </MainLayout>
          </DetailProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
