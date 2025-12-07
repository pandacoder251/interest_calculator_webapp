// Interest Calculator WebApp - React Component
function App() {
  return (
    <div className="app-container">
      <header>
        <h1 className="app-title">Interest Calculator</h1>
        <nav className="app-nav">
          <a href="/dashboard">Dashboard</a>
          <a href="/transactions">Transactions</a>
        </nav>
      </header>
      
      <main>
        {/* Dynamic content will be loaded here */}
        <div className="central-content">
          <div className="primary-section">
            <h2>Transaction Overview</h2>
            <p>Monitor your transactions and interest calculations</p>
          </div>
        </div>
      </main>

      <footer>
        <p>© 2025 Interest Calculator WebApp</p>
      </footer>
    </div>
  );
}

export default App;
