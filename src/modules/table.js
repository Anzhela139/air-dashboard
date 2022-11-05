import { makeElem } from './utils.js';
import './../styles/table.css'

/**
 * модуль, который создает DOM table приложения
 * @module Table
 */
export default {
    async init(api) {
        const tableContainer = document.querySelector('.left-container');
        const {dirtyCities, cleanCities} = await api.prepareTableData();
        const $table = makeElem('div', 'table-container', );
        const $dirtyCities = makeElem('div', 'table-dirty');
        const $dirtyLegend = makeElem('div', 'table-legend-dirty', 'Cities with the dirtiest air');
        const $cleanCities = makeElem('div', 'table-clean' );
        const $dirtyCitiesWrapper = makeElem('div', 'table-dirty-wrapper');
        const $cleanCitiesWrapper = makeElem('div', 'table-clean-wrapper' );
        const $cleanLegend = makeElem('div', 'table-legend-clean', 'Cities with the cleanest air');

        dirtyCities.forEach((item) => {
            $dirtyCitiesWrapper.appendChild(makeElem('div', 'table-item', item[1]));
            $dirtyCitiesWrapper.appendChild(makeElem('div', 'table-item', item[0]));
        });

        cleanCities.forEach((item) => {
            $cleanCitiesWrapper.appendChild(makeElem('div', 'table-item', item[1]));
            $cleanCitiesWrapper.appendChild(makeElem('div', 'table-item', item[0]));
        });

        $table.appendChild($dirtyCities);
        $dirtyCities.prepend($dirtyLegend);
        $cleanCities.prepend($cleanLegend);
        $dirtyCities.appendChild($dirtyCitiesWrapper);
        $cleanCities.appendChild($cleanCitiesWrapper);
        $table.appendChild($cleanCities);
        tableContainer.appendChild($table);
    },
};

