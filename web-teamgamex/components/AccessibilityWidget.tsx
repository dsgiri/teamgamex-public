import { useState, useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'contrast'
type FontSizeLevel = 'normal' | 'large' | 'xl'

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [fontSize, setFontSize] = useState<FontSizeLevel>('normal')

  // Sync settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('tgx_accessibility_theme') as ThemeMode
    const savedFontSize = localStorage.getItem('tgx_accessibility_fontsize') as FontSizeLevel

    if (savedTheme) {
      applyTheme(savedTheme)
    }
    if (savedFontSize) {
      applyFontSize(savedFontSize)
    }
  }, [])

  const applyTheme = (mode: ThemeMode) => {
    setTheme(mode)
    localStorage.setItem('tgx_accessibility_theme', mode)

    const root = document.documentElement
    // Reset classes
    root.classList.remove('theme-dark', 'contrast-high')

    if (mode === 'dark') {
      root.classList.add('theme-dark')
    } else if (mode === 'contrast') {
      root.classList.add('contrast-high')
    }
  }

  const applyFontSize = (level: FontSizeLevel) => {
    setFontSize(level)
    localStorage.setItem('tgx_accessibility_fontsize', level)

    const root = document.documentElement
    if (level === 'normal') {
      root.style.fontSize = '16px'
    } else if (level === 'large') {
      root.style.fontSize = '19px'
    } else if (level === 'xl') {
      root.style.fontSize = '22px'
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Widget Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/80"
        title="Accessibility Settings"
        aria-label="Toggle Accessibility Panel"
      >
        <span className="text-2xl">♿</span>
      </button>

      {/* Control Panel Modal */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white text-slate-800 rounded-3xl p-6 shadow-2xl border-2 border-slate-100 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span>♿</span> Visibility & Fonts
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              aria-label="Close panel"
            >
              ✕ Close
            </button>
          </div>

          {/* 1. Theme Selection */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contrast & Color Theme</h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => applyTheme('light')}
                className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all ${
                  theme === 'light'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => applyTheme('dark')}
                className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => applyTheme('contrast')}
                className={`py-2 px-1 text-[10px] font-black uppercase tracking-wider rounded-xl border transition-all ${
                  theme === 'contrast'
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-yellow-50 text-yellow-850 border-yellow-200 hover:bg-yellow-100'
                }`}
              >
                👁️ High Con
              </button>
            </div>
          </div>

          {/* 2. Text Scaling */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Text Size (Font Scale)</h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => applyFontSize('normal')}
                className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all ${
                  fontSize === 'normal'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                A (100%)
              </button>
              <button
                onClick={() => applyFontSize('large')}
                className={`py-2 px-1 text-sm font-bold rounded-xl border transition-all ${
                  fontSize === 'large'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                A+ (120%)
              </button>
              <button
                onClick={() => applyFontSize('xl')}
                className={`py-2 px-1 text-base font-black rounded-xl border transition-all ${
                  fontSize === 'xl'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                A++ (140%)
              </button>
            </div>
          </div>

          <p className="text-[9px] text-slate-400 font-bold leading-normal border-t pt-3 border-slate-100 text-center">
            Settings persist automatically on this device.
          </p>
        </div>
      )}
    </div>
  )
}
