// frontend/src/App.js
import SOSForm from './components/SOSForm';

function App() {
  return (
    <div className="App">
      <h1>Disaster Management</h1>
      <Map reports={reports} />
      <SOSForm />
    </div>
  );
}

export default App;
