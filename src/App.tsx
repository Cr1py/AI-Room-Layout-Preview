import Upload from './components/Upload';
import { Download, Share2, RefreshCcw, Sparkles, Leaf, Ruler, LampDesk, Sofa, CircleDot } from 'lucide-react';
import Button from './components/ui/Button';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { roomGeneration } from './components/lib/roomGeneration';

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
    <div className="background-design">
      <div className="title">
        <h1>AI Room Layout Preview</h1>
      </div>

      <div className="upload-section">
        <div className="title section-title">
          <h2>Upload Room Layout</h2>
        </div>

        <div id="upload" className="shell upload-shell">
          <div className="grid-overlay" />

          <div className="blueprint-label label-top-left">FLOOR PLAN</div>
          <div className="blueprint-label label-top-right">CR1PY SAYS HI</div>
          <div className="blueprint-label label-bottom-left">:3 :3 :3</div>
          <div className="blueprint-label label-bottom-right">MWAH</div>

          <Leaf className="blueprint-icon plant-icon plant-one" />
          <Leaf className="blueprint-icon plant-icon plant-two" />
          <Leaf className="blueprint-icon plant-icon plant-three" />
          <Sofa className="blueprint-icon sofa-icon" />
          <LampDesk className="blueprint-icon lamp-icon" />
          <Ruler className="blueprint-icon ruler-icon" />
          <CircleDot className="blueprint-icon detail-icon" />

          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3>Upload your floor plan</h3>
              <p>Add a room layout to begin your visualization.</p>
              <span className="file-types">JPG · PNG · WebP</span>
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
        <div className="title section-title">
          <h2>Generate 3D Preview</h2>
        </div>

        <div className="display-container">
          <div className={`shell preview-shell ${isProcessing ? 'is-processing' : ''}`}>
            <div className="grid-overlay" />

            <div className="blueprint-label label-top-left">3D PREVIEW</div>
            <div className="blueprint-label label-top-right">VISUALISATION</div>

            <Leaf className="blueprint-icon plant-icon preview-plant" />
            <Ruler className="blueprint-icon ruler-icon preview-ruler" />

            {sourceImage && currentImage ? (
              <ReactCompareSlider
                defaultValue={50}
                style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}
                itemOne={
                  <ReactCompareSliderImage
                    src={sourceImage}
                    alt="og floor plan"
                    className="compare-img"
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={currentImage}
                    alt="Generated 3D room"
                    className="compare-img"
                  />
                }
              />
            ) : (
              <div className="render-placeholder">
                {sourceImage && (
                  <img src={sourceImage} alt="og floor plan" className="render-fallback" />
                )}

                {!sourceImage && (
                  <div className="empty-preview">
                    <Sofa className="w-10 h-10" />
                    <span>Your 3D render will appear here</span>
                  </div>
                )}
              </div>
            )}

            {isProcessing && (
              <div className="render-overlay">
                <div className="rendering-card">
                  <RefreshCcw className="spinner" />
                  <span className="rendering-title">Rendering...</span>
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
