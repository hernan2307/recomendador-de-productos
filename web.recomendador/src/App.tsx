import './App.css'

import { CarritoProvider } from './core/contexto/CarritoContexto'
import { RecomendadorPage } from './features/recomendador/RecomendadorPage'

function App() {
  return (
    <CarritoProvider>
      <div className="app-root">
        <header className="app-header">
          <div className="app-header-title">Recomendador Personal</div>
          <div className="app-header-spacer" />
        </header>
        <main className="app-main">
          <RecomendadorPage />
        </main>
      </div>
    </CarritoProvider>
  )
}

export default App
