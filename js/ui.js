const UIContext = {
    formatCell(content) {
        if (!content) return '';
        if (content.includes('Disponible') || content === 'Libre') {
            return `<span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 shadow-sm">Libre / Disponible</span>`;
        }
        if (content.includes('IESPRO')) {
            return `<span class="inline-flex px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">Uso Exclusivo IESPRO</span>`;
        }
        if (content.includes('Prioridad Embarazo')) {
            return `<span class="inline-flex px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Solo Accesibilidad</span>`;
        }

        let html = content;
        // Badges para Grupos [LAE] / [ISC]
        html = html.replace(/\[(.*?)\]/g, (match, groupsStr) => {
            const groups = groupsStr.split(/,| - /).map(g => g.trim());
            const badges = groups.map(g => {
                let color = 'bg-gray-100 text-gray-800 border-gray-200';
                if (g.startsWith('LAE')) color = 'bg-blue-100 text-blue-800 border-blue-200';
                else if (g.startsWith('ISC')) color = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                return `<span class="inline-block px-2 py-0.5 mr-1 mb-1 rounded text-xs font-bold border ${color}">${g}</span>`;
            }).join('');
            return `<div class="mb-1">${badges}</div>`;
        });

        // Formato para Docentes (Nombre)
        html = html.replace(/\((.*?)\)/g, `<div class="mt-1.5 text-xs text-slate-500 font-medium flex items-center gap-1">👤 $1</div>`);
        
        // Formato Materia
        html = html.replace(/(<\/div>|^)(.*?)(<div|$)/g, (match, p1, text, p3) => {
            let trimmed = text.trim();
            if (trimmed && !trimmed.startsWith('<')) {
                 return `${p1}<div class="text-sm font-semibold text-slate-700 leading-snug my-0.5">${trimmed}</div>${p3}`;
            }
            return match;
        });
        return html;
    },

    renderHeaders(tabId) {
        const head = document.getElementById('tableHead');
        const headersMap = {
            sabados: ['Aula / Espacio', 'Cupo', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00'],
            hibrido: ['Espacio Asignado', 'Cupo', 'Materia y Grupo', 'Clase Presencial', 'Seguimiento Remoto'],
            remoto: ['Plataforma', 'Accesos', 'Materia y Grupo', 'Disponibilidad', 'Dinámica / Fechas']
        };
        
        const thHTML = headersMap[tabId].map((text, i) => {
            const width = i === 0 ? 'min-w-[150px] sticky left-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] z-10' : (i === 1 ? 'min-w-[80px] text-center' : 'min-w-[250px]');
            return `<th class="p-4 ${width}">${text}</th>`;
        }).join('');
        
        head.innerHTML = `<tr class="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-xs font-semibold">${thHTML}</tr>`;
    },

    renderBody(data) {
        const body = document.getElementById('tableBody');
        body.innerHTML = data.map((row, index) => {
            const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40';
            const searchable = `${row.room} ${row.col1} ${row.col2} ${row.col3}`.toLowerCase();
            
            return `
            <tr class="hover:bg-blue-50/50 ${bgClass}" data-search="${searchable}">
                <td class="p-4 border-b border-slate-100 align-top font-bold text-slate-800 sticky left-0 ${bgClass} shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">${row.room}</td>
                <td class="p-4 border-b border-slate-100 align-top text-center"><span class="px-2 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">${row.capacity}</span></td>
                <td class="p-4 border-b border-slate-100 align-top min-h-[90px]">${this.formatCell(row.col1)}</td>
                <td class="p-4 border-b border-slate-100 align-top min-h-[90px]">${this.formatCell(row.col2)}</td>
                <td class="p-4 border-b border-slate-100 align-top min-h-[90px]">${this.formatCell(row.col3)}</td>
            </tr>`;
        }).join('');
    },

    filterTable(term) {
        const rows = document.getElementById('tableBody').getElementsByTagName('tr');
        for (let row of rows) {
            row.style.display = row.getAttribute('data-search').includes(term) ? '' : 'none';
        }
    }
};