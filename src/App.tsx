import Upload from './components/Upload';
import { Layers, Download, Share2, RefreshCcw, Sparkles } from 'lucide-react';
import Button from './components/ui/Button';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { roomGeneration } from './components/lib/roomGeneration';
import './App.css';

function App() {
  const {
    sourceImage,
    currentImage,
    isProcessing,
    error,
    handleUploadComplete,
    handleGenerate,
    handleExport,
    handleShare
  } = roomGeneration();

  return (
    <div className="App">
      <div className="title">
        <h1>AI Room Layout Preview</h1>
      </div>

      <div className="upload-section">
        <div className="title">
          <h2>Upload Room Layout</h2>
        </div>

        <div id="upload" className="shell">
          <div className="grid-overlay" />
          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers lightingColor="bg-green-dark" />
              </div>
              <h3>Upload your floor plan</h3>
              <p>Supports JPG, PNG, and WebP files.</p>
            </div>

            <Upload onComplete={handleUploadComplete} />

            {sourceImage && (
              <Button
                size="sm"
                onClick={handleGenerate}
                className="generate"
                disabled={isProcessing}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isProcessing ? 'Generating...' : currentImage ? 'Regenerate' : 'Generate 3D View'}
              </Button>
            )}

          </div>
        </div>
      </div>

      <div className="display-section">
        <div className="title">
          <h2>Generate 3D Preview</h2>
        </div>

        <div className="display-container">

          <div className={`shell  ${isProcessing ? 'is-processing' : ''}`}>
            <div className="grid-overlay" />
            {sourceImage && currentImage ? (
              <ReactCompareSlider
                defaultValue={50}
                style={{ width: '100%', height: '100%' }}
                itemOne={
                  <ReactCompareSliderImage src={sourceImage} alt="before" className="compare-img" />
                }
                itemTwo={
                  <ReactCompareSliderImage src={currentImage} alt="after" className="compare-img" />
                }
              />
            ) : (
              <div className="render-placeholder">
                {sourceImage && (
                  <img src={sourceImage} alt="Original" className="render-fallback" />
                )}
              </div>
            )}

            {isProcessing && (
              <div className="render-overlay">
                <div className="rendering-card">
                  <RefreshCcw className="spinner" />
                  <span className="title">Rendering...</span>
                  <span className="subtitle">Generating your 3D visualization</span>
                </div>
              </div>
            )}
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="display-buttons">
              <Button
                size="sm"
                onClick={handleExport}
                className="export"
                disabled={!currentImage}
              >
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
              <Button 
                size="sm" 
                onClick={handleShare} 
                className="share" 
                disabled={!currentImage}
              >
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
          </div>

        </div>
      </div>

    </div>

  );
}

export default App;