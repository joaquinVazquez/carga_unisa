document.addEventListener('DOMContentLoaded', async () => {
    let currentTab = 'sabados';
    const loader = document.getElementById('loadingState');
    
    // 1. Obtener Datos
    loader.classList.remove('hidden');
    const systemData = await DataManager.fetchAcademics();
    loader.classList.add('hidden');

    // 2. Control de Pestañas
    const updateView = (tabId) => {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('border-blue-600', 'text-blue-700', 'active');
            btn.classList.add('border-transparent', 'text-slate-500');
        });
        const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
        activeBtn.classList.remove('border-transparent', 'text-slate-500');
        activeBtn.classList.add('border-blue-600', 'text-blue-700', 'active');
        
        document.getElementById('searchInput').value = '';
        UIContext.renderHeaders(tabId);
        UIContext.renderBody(systemData[tabId]);
    };

    document.getElementById('tabsContainer').addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') {
            currentTab = e.target.getAttribute('data-tab');
            updateView(currentTab);
        }
    });

    // 3. Buscador
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        UIContext.filterTable(e.target.value.toLowerCase().trim());
    });

    // Inicializar primera vista
    updateView('sabados');
});