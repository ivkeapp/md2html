/**
 * ThemeEditor.js - Custom theme editor component
 */

import { cloneTheme } from '../../theme.js';

export class ThemeEditor {
  constructor(container, initialTheme, onThemeUpdate) {
    this.container = container;
    this.theme = cloneTheme(initialTheme);
    this.onThemeUpdate = onThemeUpdate;
    this.init();
  }
  
  init() {
    this.render();
    this.attachEvents();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="theme-editor">
        <!-- Typography -->
        <div class="theme-group">
          <h3>Typography</h3>
          <div class="form-field">
            <label for="fontFamily">Font Family</label>
            <input type="text" id="fontFamily" value="${this.theme.typography.fontFamily}" />
          </div>
          <div class="form-field">
            <label for="baseFontSize">Base Font Size</label>
            <input type="text" id="baseFontSize" value="${this.theme.typography.baseFontSize}" />
          </div>
          <div class="form-field">
            <label for="lineHeight">Line Height</label>
            <input type="number" id="lineHeight" step="0.1" value="${this.theme.typography.lineHeight}" />
          </div>
          <div class="form-field">
            <label for="h1Size">H1 Size</label>
            <input type="text" id="h1Size" value="${this.theme.typography.h1.size}" />
          </div>
          <div class="form-field">
            <label for="h2Size">H2 Size</label>
            <input type="text" id="h2Size" value="${this.theme.typography.h2.size}" />
          </div>
        </div>
        
        <!-- Colors -->
        <div class="theme-group">
          <h3>Colors</h3>
          <div class="form-field">
            <label for="colorBackground">Background</label>
            <input type="color" id="colorBackground" value="${this.theme.colors.background}" />
          </div>
          <div class="form-field">
            <label for="colorSurface">Surface</label>
            <input type="color" id="colorSurface" value="${this.theme.colors.surface}" />
          </div>
          <div class="form-field">
            <label for="colorText">Text</label>
            <input type="color" id="colorText" value="${this.theme.colors.text}" />
          </div>
          <div class="form-field">
            <label for="colorHeadings">Headings</label>
            <input type="color" id="colorHeadings" value="${this.theme.colors.headings}" />
          </div>
          <div class="form-field">
            <label for="colorLinks">Links</label>
            <input type="color" id="colorLinks" value="${this.theme.colors.links}" />
          </div>
          <div class="form-field">
            <label for="colorCodeBg">Code Background</label>
            <input type="color" id="colorCodeBg" value="${this.theme.colors.codeBackground}" />
          </div>
          <div class="form-field">
            <label for="colorCodeText">Code Text</label>
            <input type="color" id="colorCodeText" value="${this.theme.colors.codeText}" />
          </div>
          <div class="form-field">
            <label for="colorBorder">Border</label>
            <input type="color" id="colorBorder" value="${this.theme.colors.border}" />
          </div>
          <div class="form-field">
            <label for="colorTableHeader">Table Header</label>
            <input type="color" id="colorTableHeader" value="${this.theme.colors.tableHeader}" />
          </div>
          <div class="form-field">
            <label for="colorTableRow">Table Row</label>
            <input type="color" id="colorTableRow" value="${this.theme.colors.tableRow}" />
          </div>
          <div class="form-field">
            <label for="colorTableRowAlt">Table Row Alt</label>
            <input type="color" id="colorTableRowAlt" value="${this.theme.colors.tableRowAlt}" />
          </div>
        </div>
        
        <!-- Spacing -->
        <div class="theme-group">
          <h3>Spacing</h3>
          <div class="form-field">
            <label for="paragraphSpacing">Paragraph Spacing</label>
            <input type="text" id="paragraphSpacing" value="${this.theme.spacing.paragraphSpacing}" />
          </div>
          <div class="form-field">
            <label for="blockSpacing">Block Spacing</label>
            <input type="text" id="blockSpacing" value="${this.theme.spacing.blockSpacing}" />
          </div>
        </div>
        
        <!-- Tables -->
        <div class="theme-group">
          <h3>Tables</h3>
          <div class="form-field">
            <label for="tableCellPadding">Cell Padding</label>
            <input type="text" id="tableCellPadding" value="${this.theme.tables.cellPadding}" />
          </div>
          <div class="form-field">
            <label>
              <input type="checkbox" id="tableZebra" ${this.theme.tables.zebra ? 'checked' : ''} />
              Zebra Striping
            </label>
          </div>
        </div>
        
        <!-- Code -->
        <div class="theme-group">
          <h3>Code Blocks</h3>
          <div class="form-field">
            <label for="codeFontFamily">Font Family</label>
            <input type="text" id="codeFontFamily" value="${this.theme.code.fontFamily}" />
          </div>
          <div class="form-field">
            <label for="codeFontSize">Font Size</label>
            <input type="text" id="codeFontSize" value="${this.theme.code.fontSize}" />
          </div>
        </div>
        
        <!-- Actions -->
        <div class="theme-group">
          <button class="btn btn-primary" id="exportThemeBtn">Export Theme JSON</button>
          <button class="btn" id="importThemeBtn">Import Theme JSON</button>
          <input type="file" id="importThemeInput" accept=".json" style="display: none;" />
        </div>
      </div>
    `;
  }
  
  attachEvents() {
    // Typography
    this.addListener('fontFamily', 'typography.fontFamily');
    this.addListener('baseFontSize', 'typography.baseFontSize');
    this.addListener('lineHeight', 'typography.lineHeight', parseFloat);
    this.addListener('h1Size', 'typography.h1.size');
    this.addListener('h2Size', 'typography.h2.size');
    
    // Colors
    this.addListener('colorBackground', 'colors.background');
    this.addListener('colorSurface', 'colors.surface');
    this.addListener('colorText', 'colors.text');
    this.addListener('colorHeadings', 'colors.headings');
    this.addListener('colorLinks', 'colors.links');
    this.addListener('colorCodeBg', 'colors.codeBackground');
    this.addListener('colorCodeText', 'colors.codeText');
    this.addListener('colorBorder', 'colors.border');
    this.addListener('colorTableHeader', 'colors.tableHeader');
    this.addListener('colorTableRow', 'colors.tableRow');
    this.addListener('colorTableRowAlt', 'colors.tableRowAlt');
    
    // Spacing
    this.addListener('paragraphSpacing', 'spacing.paragraphSpacing');
    this.addListener('blockSpacing', 'spacing.blockSpacing');
    
    // Tables
    this.addListener('tableCellPadding', 'tables.cellPadding');
    this.addListener('tableZebra', 'tables.zebra', null, 'checkbox');
    
    // Code
    this.addListener('codeFontFamily', 'code.fontFamily');
    this.addListener('codeFontSize', 'code.fontSize');
    
    // Export/Import
    const exportBtn = this.container.querySelector('#exportThemeBtn');
    const importBtn = this.container.querySelector('#importThemeBtn');
    const importInput = this.container.querySelector('#importThemeInput');
    
    exportBtn.addEventListener('click', () => this.exportTheme());
    importBtn.addEventListener('click', () => importInput.click());
    importInput.addEventListener('change', (e) => this.importTheme(e.target.files[0]));
  }
  
  addListener(id, path, transform = null, type = 'input') {
    const element = this.container.querySelector(`#${id}`);
    if (!element) return;
    
    const eventType = type === 'checkbox' ? 'change' : 'input';
    
    element.addEventListener(eventType, (e) => {
      let value = type === 'checkbox' ? e.target.checked : e.target.value;
      if (transform) value = transform(value);
      
      this.setNestedProperty(this.theme, path, value);
      this.notifyUpdate();
    });
  }
  
  setNestedProperty(obj, path, value) {
    const parts = path.split('.');
    const last = parts.pop();
    const target = parts.reduce((o, p) => o[p], obj);
    target[last] = value;
  }
  
  notifyUpdate() {
    if (this.onThemeUpdate) {
      this.onThemeUpdate(this.theme);
    }
  }
  
  setTheme(theme) {
    this.theme = cloneTheme(theme);
    this.render();
    this.attachEvents();
  }
  
  getTheme() {
    return this.theme;
  }
  
  exportTheme() {
    const json = JSON.stringify(this.theme, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  importTheme(file) {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const theme = JSON.parse(e.target.result);
        this.setTheme(theme);
        this.notifyUpdate();
      } catch (error) {
        alert('Failed to import theme: Invalid JSON');
      }
    };
    reader.readAsText(file);
  }
}
