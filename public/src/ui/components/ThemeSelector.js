/**
 * ThemeSelector.js - Theme selection component
 */

export class ThemeSelector {
  constructor(container, themes, onThemeChange) {
    this.container = container;
    this.themes = themes;
    this.onThemeChange = onThemeChange;
    this.currentTheme = 'light';
    this.init();
  }
  
  init() {
    this.render();
    this.attachEvents();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="theme-selector">
        ${Object.keys(this.themes).map(themeName => `
          <label>
            <input type="radio" name="theme" value="${themeName}" ${themeName === this.currentTheme ? 'checked' : ''}>
            <span class="theme-option">${themeName.charAt(0).toUpperCase() + themeName.slice(1)}</span>
          </label>
        `).join('')}
      </div>
    `;
  }
  
  attachEvents() {
    const radios = this.container.querySelectorAll('input[name="theme"]');
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.currentTheme = e.target.value;
        if (this.onThemeChange) {
          this.onThemeChange(this.currentTheme);
        }
      });
    });
  }
  
  setTheme(themeName) {
    this.currentTheme = themeName;
    const radio = this.container.querySelector(`input[value="${themeName}"]`);
    if (radio) {
      radio.checked = true;
    }
  }
  
  getTheme() {
    return this.currentTheme;
  }
}
