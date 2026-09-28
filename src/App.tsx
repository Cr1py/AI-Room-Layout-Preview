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
    <div>
      <div className="title">
        <h1>AI Room Layout Preview</h1>
      </div>

      <div className="containter-section mb-8">
        <div className="title section-title">
          <h2>Upload Room Layout</h2>
        </div>

        <div id="upload" className="shell">
          <div className="grid-overlay" />

          <div className="blueprint-label top-[18px] left-[22px]">FLOOR PLAN</div>
          <div className="blueprint-label top-[18px] right-[22px]">CR1PY SAYS HI</div>
          <div className="blueprint-label bottom-[18px] left-[22px]">:3 :3 :3</div>
          <div className="blueprint-label right-[22px] bottom-[18px]">MWAH</div>

          <Leaf className="blueprint-icon fill-none w-[55px] h-[55px] top-[22%] left-[7%] -rotate-[15deg]" />
          <Leaf className="blueprint-icon fill-none w-10 h-10 top-[18%] right-[9%] rotate-[25deg]" />
          <Leaf className="blueprint-icon fill-none w-12 h-12 bottom-[17%] left-[10%] -rotate-[25deg]" />
          <Sofa className="blueprint-icon w-[75px] h-[75px] right-[7%] bottom-[17%]" />
          <LampDesk className="blueprint-icon w-12 h-12 bottom-1/5 left-[8%]" />
          <Ruler className="blueprint-icon w-[55px] h-[55px] top-[38%] right-[12%] -rotate-[25deg]" />
          <CircleDot className="blueprint-icon w-[35px] h-[35px] top-[47%] left-[16%]" />

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

      <div className="containter-section">
        <div className="title section-title">
          <h2>Generate 3D Preview</h2>
        </div>

        <div className="display-container">
          <div className={`shell ${isProcessing ? 'is-processing' : ''}`}>
            <div className="grid-overlay" />

            <div className="blueprint-label top-[18px] left-[22px]">3D PREVIEW</div>
            <div className="blueprint-label top-[18px] right-[22px]">VISUALISATION</div>

            <Leaf className="blueprint-icon fill-none left-[5%] bottom-[10%] w-[65px] h-[65px]" />
            <Ruler className="blueprint-icon w-[55px] h-[55px] top-[10%] right-[5%] -rotate-[25deg]" />

            {sourceImage && currentImage ? (
              <ReactCompareSlider
                defaultValue={50}
                style={{ width: '100%', height: '100%', position: 'relative', zIndex: 2 }}
                itemOne={
                  <ReactCompareSliderImage
                    src={sourceImage}
                    alt="og floor plan"
                    className="compare-img"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={currentImage}
                    alt="generated 3D room"
                    className="compare-img"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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