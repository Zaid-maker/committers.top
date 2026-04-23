(function() {
  var storageKey = 'theme-preference';

  function getPreferredTheme() {
    try {
      var storedTheme = localStorage.getItem(storageKey);
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
    } catch (error) {
      // Ignore storage access failures and fall back to system preference.
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  function applyTheme(theme) {
    var resolvedTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', resolvedTheme);

    try {
      localStorage.setItem(storageKey, resolvedTheme);
    } catch (error) {
      // Ignore storage access failures.
    }

    updateToggle(resolvedTheme);
  }

  function updateToggle(theme) {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) {
      return;
    }

    var isDark = theme === 'dark';
    toggle.textContent = isDark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  function init() {
    var initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    var toggle = document.getElementById('theme-toggle');
    if (!toggle) {
      return;
    }

    toggle.addEventListener('click', function() {
      var currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();