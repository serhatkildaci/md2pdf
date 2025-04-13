import { useState, useEffect, useRef } from 'react'
import './App.css'
import { marked } from 'marked'
import 'highlight.js/styles/github-dark.css'
import 'github-markdown-css'

// Configure marked with security options
marked.use({
  breaks: true,
  // Set sanitize to true if supported in your marked version
  gfm: true
});

// A simple DOMPurify-like sanitizer function
const sanitizeHtml = (html: string): string => {
  // This is a very basic sanitizer
  // For production, consider using DOMPurify or other established libraries
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Remove potentially dangerous elements and attributes
  const scripts = tempDiv.querySelectorAll('script, iframe, object, embed');
  scripts.forEach(element => element.remove());
  
  // Remove on* attributes
  const allElements = tempDiv.querySelectorAll('*');
  allElements.forEach(element => {
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('on') || attr.name === 'href' && attr.value.startsWith('javascript:')) {
        element.removeAttribute(attr.name);
      }
    });
  });
  
  return tempDiv.innerHTML;
};

function App() {
  const [markdown, setMarkdown] = useState('# Welcome to MD2PDF\n\nThis is a simple **markdown to PDF** converter.\n\n## Features\n\n- Live preview\n- File upload\n- Direct PDF conversion\n- Privacy first - no data stored\n\nStart typing or **upload a file** to begin!')
  const [htmlOutput, setHtmlOutput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Convert markdown to HTML whenever markdown changes
  useEffect(() => {
    try {
      const html = marked.parse(markdown);
      const sanitizedHtml = sanitizeHtml(typeof html === 'string' ? html : String(html));
      setHtmlOutput(sanitizedHtml);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      setHtmlOutput(`<p>Error parsing markdown: ${error}</p>`);
    }
  }, [markdown])

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setMarkdown(content)
    }
    reader.readAsText(file)
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Generate PDF using print dialog
  const printDocument = () => {
    // Set document title to the first H1 if present
    const previewEl = previewRef.current
    const candidateTitleEl = previewEl?.querySelector("h1")
    
    if (candidateTitleEl) {
      const candidateTitle = candidateTitleEl.textContent || ''
      const currentTitle = document.title
      document.title = candidateTitle
      
      // Schedule title reset after printing
      window.addEventListener('afterprint', function resetTitle() {
        document.title = currentTitle
        window.removeEventListener('afterprint', resetTitle)
      })
    }
    
    window.print()
  }

  return (
    <div className="app-container">
      <header className="no-print">
        <div className="logo-section">
          <h1>MD2PDF</h1>
          <p>Convert Markdown to PDF</p>
        </div>
        <div className="github-star">
          <iframe
            src="https://ghbtns.com/github-btn.html?user=serhatkildaci&repo=md2pdf&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="100"
            height="20"
            title="GitHub Stars"
          ></iframe>
        </div>
      </header>

      <main>
        <div className="editor-container no-print">
          <div className="editor-section">
            <div className="section-header">
              <h2>Markdown</h2>
              <div className="editor-actions">
                <button className="action-button" onClick={triggerFileInput}>
                  Upload File
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".md, .txt" 
                  style={{ display: 'none' }} 
                />
              </div>
            </div>
            <textarea 
              value={markdown} 
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type markdown here..."
            />
          </div>

          <div className="preview-section">
            <div className="section-header">
              <h2>Preview</h2>
              <button className="action-button" onClick={printDocument}>
                Print to PDF
              </button>
            </div>
            <div 
              id="preview-content"
              ref={previewRef}
              className="preview-content markdown-body"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          </div>
        </div>
        
        {/* Printable version - only visible when printing */}
        <div className="print-only">
          <div 
            className="markdown-body print-content"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          />
        </div>
      </main>

      <footer className="no-print">
        <p>© {new Date().getFullYear()} MD2PDF</p>
      </footer>
    </div>
  )
}

export default App
