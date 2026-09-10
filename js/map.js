document.addEventListener('DOMContentLoaded', () => {

  const svg = document.getElementById('event-map-svg');
  if (!svg) return;

  const panelTitle = document.getElementById('map-info-title');
  const panelDesc = document.getElementById('map-info-desc');
  const legend = document.getElementById('map-legend');
  const zones = Array.from(svg.querySelectorAll('.map-zone'));

  function activate(zone) {
    zones.forEach(z => z.classList.remove('is-active'));
    zone.classList.add('is-active');
    panelTitle.textContent = zone.dataset.name;
    panelDesc.textContent = zone.dataset.desc;

    legend.querySelectorAll('.map-legend-item').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.target === zone.dataset.id);
    });
  }

  zones.forEach(zone => {
    zone.setAttribute('tabindex', '0');
    zone.setAttribute('role', 'button');
    zone.setAttribute('aria-label', zone.dataset.name + '. ' + zone.dataset.desc);

    zone.addEventListener('click', () => activate(zone));
    zone.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate(zone);
      }
    });

    const swatch = zone.querySelector('rect, circle');
    const color = swatch ? swatch.getAttribute('fill') : '#cccccc';

    const legendItem = document.createElement('button');
    legendItem.type = 'button';
    legendItem.className = 'map-legend-item';
    legendItem.dataset.target = zone.dataset.id;
    legendItem.innerHTML = '<span class="map-legend-swatch" style="background:' + color + '"></span>' + zone.dataset.name;
    legendItem.addEventListener('click', () => {
      activate(zone);
      zone.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    });

    legend.appendChild(legendItem);
  });

});
