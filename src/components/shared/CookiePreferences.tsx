import { useEffect, useMemo, useState } from "react";

type CookiePrefs = {
  accepted: boolean;
  performance: boolean;
  ads: boolean;
  timestamp: number;
};

const STORAGE_KEY = "nta_cookie_prefs";

export default function CookiePreferences() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(() => ({
    accepted: false,
    performance: true,
    ads: true,
    timestamp: Date.now(),
  }));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CookiePrefs;
        setPrefs(parsed);
        if (!parsed.accepted) {
          setVisible(true);
        }
        return;
      }
    } catch (err) {
      console.warn("Cookie prefs read failed", err);
    }
    setVisible(true);
  }, []);

  const handleAcceptAll = () => {
    const next: CookiePrefs = {
      accepted: true,
      performance: true,
      ads: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPrefs(next);
    setVisible(false);
  };

  const handleSave = () => {
    const next: CookiePrefs = {
      ...prefs,
      accepted: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPrefs(next);
    setVisible(false);
  };

  const bannerText = useMemo(
    () =>
      "You rely on New Time Africa for truth and transparency. We use cookies and other tracking technologies to deliver and personalize content and ads, enable features, measure site performance, and enable social media sharing. You can choose to customize your preferences.",
    []
  );

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Cookie preferences</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{bannerText} <a className="text-blue-600 hover:text-blue-800 font-semibold" href="/cookie-policy">Learn more about our Cookie Policy.</a></p>
          </div>

          {showCustomize && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
              <p className="text-xs text-slate-600">Adjust optional cookies below. Essential cookies are always on.</p>
              <label className="flex items-center justify-between text-sm text-slate-800">
                <span>Performance & analytics</span>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={prefs.performance}
                  onChange={(e) => setPrefs((p) => ({ ...p, performance: e.target.checked }))}
                />
              </label>
              <label className="flex items-center justify-between text-sm text-slate-800">
                <span>Personalized ads</span>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={prefs.ads}
                  onChange={(e) => setPrefs((p) => ({ ...p, ads: e.target.checked }))}
                />
              </label>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-slate-300 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              onClick={() => setShowCustomize((v) => !v)}
            >
              {showCustomize ? "Hide options" : "Customize"}
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md border border-slate-300 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                onClick={handleSave}
              >
                Save preferences
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow"
                onClick={handleAcceptAll}
              >
                Accept all 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
