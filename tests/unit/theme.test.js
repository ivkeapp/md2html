import { describe, it, expect } from 'vitest';
import {
  themes,
  cloneTheme,
  mergeTheme,
  exportTheme,
  importTheme,
  themeToCssVariables
} from '../../public/src/theme.js';

describe('Theme', () => {
  describe('Built-in themes', () => {
    it('should have light theme', () => {
      expect(themes.light).toBeDefined();
      expect(themes.light.name).toBe('light');
      expect(themes.light.typography).toBeDefined();
      expect(themes.light.colors).toBeDefined();
    });

    it('should have dark theme', () => {
      expect(themes.dark).toBeDefined();
      expect(themes.dark.name).toBe('dark');
      expect(themes.dark.typography).toBeDefined();
      expect(themes.dark.colors).toBeDefined();
    });

    it('should have custom theme', () => {
      expect(themes.custom).toBeDefined();
      expect(themes.custom.name).toBe('custom');
    });

    it('should have all required theme properties', () => {
      const theme = themes.light;
      expect(theme.typography).toBeDefined();
      expect(theme.colors).toBeDefined();
      expect(theme.spacing).toBeDefined();
      expect(theme.tables).toBeDefined();
      expect(theme.code).toBeDefined();
      expect(theme.lists).toBeDefined();
    });
  });

  describe('cloneTheme', () => {
    it('should create a deep copy', () => {
      const original = themes.light;
      const clone = cloneTheme(original);
      
      expect(clone).toEqual(original);
      expect(clone).not.toBe(original);
    });

    it('should not affect original when clone is modified', () => {
      const original = themes.light;
      const clone = cloneTheme(original);
      
      clone.colors.background = '#000000';
      
      expect(clone.colors.background).toBe('#000000');
      expect(original.colors.background).not.toBe('#000000');
    });

    it('should clone nested objects', () => {
      const original = themes.light;
      const clone = cloneTheme(original);
      
      clone.typography.h1.size = '5rem';
      
      expect(clone.typography.h1.size).toBe('5rem');
      expect(original.typography.h1.size).not.toBe('5rem');
    });
  });

  describe('mergeTheme', () => {
    it('should merge simple overrides', () => {
      const base = themes.light;
      const overrides = {
        colors: {
          background: '#000000'
        }
      };
      
      const merged = mergeTheme(base, overrides);
      
      expect(merged.colors.background).toBe('#000000');
      expect(merged.colors.text).toBe(base.colors.text); // Unchanged
    });

    it('should not modify original theme', () => {
      const base = themes.light;
      const originalBg = base.colors.background;
      
      const overrides = {
        colors: {
          background: '#000000'
        }
      };
      
      mergeTheme(base, overrides);
      
      expect(base.colors.background).toBe(originalBg);
    });

    it('should merge multiple properties', () => {
      const base = themes.light;
      const overrides = {
        colors: {
          background: '#000000',
          text: '#ffffff'
        },
        typography: {
          baseFontSize: '18px'
        }
      };
      
      const merged = mergeTheme(base, overrides);
      
      expect(merged.colors.background).toBe('#000000');
      expect(merged.colors.text).toBe('#ffffff');
      expect(merged.typography.baseFontSize).toBe('18px');
    });
  });

  describe('exportTheme', () => {
    it('should export theme as JSON string', () => {
      const theme = themes.light;
      const exported = exportTheme(theme);
      
      expect(typeof exported).toBe('string');
      expect(exported).toContain('"name"');
      expect(exported).toContain('"typography"');
    });

    it('should export valid JSON', () => {
      const theme = themes.light;
      const exported = exportTheme(theme);
      
      expect(() => JSON.parse(exported)).not.toThrow();
    });

    it('should preserve all theme properties', () => {
      const theme = themes.light;
      const exported = exportTheme(theme);
      const parsed = JSON.parse(exported);
      
      expect(parsed).toEqual(theme);
    });
  });

  describe('importTheme', () => {
    it('should import valid theme JSON', () => {
      const original = themes.light;
      const exported = exportTheme(original);
      const imported = importTheme(exported);
      
      expect(imported).toEqual(original);
    });

    it('should throw error for invalid JSON', () => {
      expect(() => importTheme('invalid json')).toThrow();
    });

    it('should throw error for incomplete theme', () => {
      const incomplete = JSON.stringify({
        name: 'incomplete',
        colors: {}
        // Missing typography, spacing, etc.
      });
      
      expect(() => importTheme(incomplete)).toThrow();
    });

    it('should validate theme structure', () => {
      const invalid = JSON.stringify({
        name: 'invalid'
        // Missing required properties
      });
      
      expect(() => importTheme(invalid)).toThrow('Invalid theme structure');
    });
  });

  describe('themeToCssVariables', () => {
    it('should generate CSS variables', () => {
      const theme = themes.light;
      const css = themeToCssVariables(theme);
      
      expect(css).toContain('--font-family');
      expect(css).toContain('--color-background');
      expect(css).toContain('--color-text');
    });

    it('should include all theme properties', () => {
      const theme = themes.light;
      const css = themeToCssVariables(theme);
      
      // Typography
      expect(css).toContain('--font-family');
      expect(css).toContain('--font-size-base');
      expect(css).toContain('--line-height');
      expect(css).toContain('--h1-size');
      
      // Colors
      expect(css).toContain('--color-background');
      expect(css).toContain('--color-text');
      expect(css).toContain('--color-links');
      
      // Spacing
      expect(css).toContain('--spacing-paragraph');
      
      // Tables
      expect(css).toContain('--table-cell-padding');
      
      // Code
      expect(css).toContain('--code-font-family');
      
      // Lists
      expect(css).toContain('--list-bullet-style');
    });

    it('should use theme values', () => {
      const theme = cloneTheme(themes.light);
      theme.colors.background = '#fef3c7';
      
      const css = themeToCssVariables(theme);
      
      expect(css).toContain('#fef3c7');
    });
  });

  describe('Theme consistency', () => {
    it('light and dark themes should have same structure', () => {
      const lightKeys = Object.keys(themes.light).sort();
      const darkKeys = Object.keys(themes.dark).sort();
      
      expect(lightKeys).toEqual(darkKeys);
    });

    it('all themes should have required color properties', () => {
      const requiredColors = [
        'background',
        'text',
        'headings',
        'links',
        'codeBackground',
        'codeText'
      ];
      
      Object.values(themes).forEach(theme => {
        requiredColors.forEach(color => {
          expect(theme.colors[color]).toBeDefined();
        });
      });
    });
  });
});
