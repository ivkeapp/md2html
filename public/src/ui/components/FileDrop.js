/**
 * FileDrop.js - File drag-and-drop component
 */

export class FileDrop {
  constructor(container, onFileLoad) {
    this.container = container;
    this.onFileLoad = onFileLoad;
    this.init();
  }
  
  init() {
    this.render();
    this.attachEvents();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="file-drop-zone" id="dropZone">
        <input type="file" id="fileInput" accept=".md,.markdown,text/markdown" />
        <div class="file-drop-icon">📄</div>
        <div class="file-drop-text">
          <strong>Click to upload</strong> or drag and drop<br>
          Markdown files (.md, .markdown)
        </div>
      </div>
    `;
    
    this.dropZone = this.container.querySelector('#dropZone');
    this.fileInput = this.container.querySelector('#fileInput');
  }
  
  attachEvents() {
    // Click to upload
    this.dropZone.addEventListener('click', () => {
      this.fileInput.click();
    });
    
    // File input change
    this.fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.handleFile(file);
      }
    });
    
    // Drag and drop
    this.dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dropZone.classList.add('dragover');
    });
    
    this.dropZone.addEventListener('dragleave', () => {
      this.dropZone.classList.remove('dragover');
    });
    
    this.dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dropZone.classList.remove('dragover');
      
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown'))) {
        this.handleFile(file);
      }
    });
  }
  
  handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (this.onFileLoad) {
        this.onFileLoad(content, file.name);
      }
    };
    reader.readAsText(file);
  }
  
  reset() {
    this.fileInput.value = '';
  }
}
