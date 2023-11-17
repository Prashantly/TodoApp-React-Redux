import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import styles from "./styles/modules/app.module.css"

function App() {
  return (
    <div className={styles.appWrapper}>
      <PageTitle>TODO LIST</PageTitle>
      <AppHeader />
      <AppContent></AppContent>
    </div>
  );
}

export default App;
