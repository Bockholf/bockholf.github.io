// Theme toggle (light/dark)
const toggle = document.getElementById('toggle-theme');
const body = document.body;
toggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggle.textContent = isDark ? '☀️' : '🌙';
});

// Tabs
document.querySelectorAll('.tabs .tab').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        // UI
        document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(tab).classList.add('active');
    });
});

// Simple local notes saver
const notesInput = document.getElementById('notes-input');
const saveBtn = document.getElementById('save-notes');
const clearBtn = document.getElementById('clear-notes');
const NOTES_KEY = 'fellowship_notes_v1';

if (notesInput) {
    const saved = localStorage.getItem(NOTES_KEY);
    if (saved) notesInput.value = saved;
    saveBtn.addEventListener('click', () => {
        localStorage.setItem(NOTES_KEY, notesInput.value);
        saveBtn.textContent = 'Gespeichert ✓';
        setTimeout(() => saveBtn.textContent = 'Lokal speichern', 1400);
    });
    clearBtn.addEventListener('click', () => {
        notesInput.value = '';
        localStorage.removeItem(NOTES_KEY);
    });
}

// Share button (copy URL)
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(location.href);
            shareBtn.textContent = 'Link kopiert ✓';
            setTimeout(() => shareBtn.textContent = 'Teilen', 1400);
        } catch {
            shareBtn.textContent = 'Fehler';
            setTimeout(() => shareBtn.textContent = 'Teilen', 1400);
        }
    });
}

// simple local date fill or future helpers
document.addEventListener('DOMContentLoaded', () => {
    // Beispiel: Datum in Footer automatisch einfügen, falls Platzhalter vorhanden
    const footer = document.querySelector('footer.container');
    if (footer && footer.textContent.includes('Letzte Änderung:')) {
        const date = new Date().toLocaleDateString('de-DE');
        footer.innerHTML = footer.innerHTML.replace('<!-- Datum eintragen -->', date);
    }
});

