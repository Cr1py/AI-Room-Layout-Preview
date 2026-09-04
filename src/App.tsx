import Upload from './components/upload';
import { Layers } from 'lucide-react';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <h1>AI Room Layout Preview</h1>

      <div className="title">
        <h2>Upload Room Layout</h2>                  
        <h3>Upload your floor plan</h3>
        <p>Supports JPG, PNG, and WebP files.</p>
      </div>

      <div className="upload-section">
        <div className="upload-container">
          <div className="upload-grids">

          </div>  
        </div>      
      </div>

      <div className="title">
        <h2>Generate 3D Preview</h2>
      </div>

      <div className="display-section">
        <div className="display-container">
          <div className="display-card">
            <div className="preview">

            </div>
          </div>  
        </div>
      </div>


    </div>
    
  )
}

export default App
