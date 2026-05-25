import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import Flashcards from "./pages/Flashcards";
import Vocabulary from "./pages/Vocabulary";
import Grammar from "./pages/Grammar";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <div className="text-5xl">🗺️</div>
      <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
      <p className="text-muted-foreground">This page doesn't exist. Navigate using the menu.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router hook={useHashLocation}>
      <Layout>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/lessons" component={Lessons} />
          <Route path="/lessons/:id" component={LessonDetail} />
          <Route path="/flashcards" component={Flashcards} />
          <Route path="/vocabulary" component={Vocabulary} />
          <Route path="/grammar" component={Grammar} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}
