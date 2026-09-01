import Upload from './components/upload';
import { Layers } from 'lucide-react';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <h1>AI Room Layout Preview</h1>

      <section className="title">
        <h2>Upload Room Layout</h2>
      </section>

      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-grids">
            <div className="upload-card">
              <div className="upload-header">
                <div className="upload-icon">
                  <Layers className="icon" />
                  <Upload />
                  <h3>Upload your floor plan</h3>
                  <p>Supports JPG, PNG, and WebP files.</p>
                </div>
              </div>
            </div>
          </div>  
        </div>      
      </section>

      <section className="title">
        <h2>Generate 3D Preview</h2>
      </section>

      <section className="display-section">
        <div className="display-container">
          <div className="display-card">
            <div className="preview">

            </div>
          </div>  
        </div>
      </section>


    </div>
    
  )
}

export default App
