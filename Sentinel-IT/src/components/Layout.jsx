function Layout({ children, title }) {
  return (
    <div className="app-container">
      
      <header className="main-header">
        <h1>{title}</h1>
      </header>

      <main className="content">
        {children}
      </main>

      <footer className="main-footer">
        <p>&copy; 2026 Calculator Corp</p>
      </footer>
    </div>
  );
}

export default Layout;
