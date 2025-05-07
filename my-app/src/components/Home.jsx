import { useEffect } from "react";
import "./style/styleHome.css";

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("SW registered"))
        .catch((err) => console.error("SW failed", err));
    }
  }, []);

  return (
    <div className="home-background">
    <div className="container">
      <img src="/images/Logo_full.png" alt="Logo Acoustic&Light" className="logo" />

      <header className="header-home">
        <h1 className="title">Acoustic&Light</h1>
        <p className="subtitle">
          Soluzioni professionali <br /> per ambienti sonori e luminosi
        </p>
      </header>

      <main className="main">
        <a href="/login" className="btn">Accedi all'area riservata</a>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Acoustic&Light. Tutti i diritti riservati.</p>
      </footer>
    </div>
    </div>
  );
}