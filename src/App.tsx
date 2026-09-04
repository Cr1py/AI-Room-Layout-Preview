import Upload from './components/upload';
import { Layers } from 'lucide-react';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <h1>AI Room Layout Preview</h1>

      <div className="title">
        <h2>Upload Room Layout</h2>
      </div>

      <div id="upload" className="upload-shell">
        <div className="grid-overlay" />
        <div className="upload-card">

          <div className="upload-head">
            <div className="upload-icon">
              <Layers lightingColor="bg-green-dark" />
            </div> 
            <h3>Upload your floor plan</h3>
            <p>Supports JPG, PNG, and WebP files.</p>
          </div>  

          <Upload />

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
