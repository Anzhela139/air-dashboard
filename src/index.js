import './styles/footer.css';
import './styles/header.css';
import './styles/main.css';
import './styles/map.css';
import './styles/map-legend.css';
import './styles/loader.css';
import myHeader from './modules/header';
import myFooter from './modules/footer';
import myBody from './modules/body';
import myMap from './modules/map';
import Table from './modules/table';
import Chart from './modules/chart.js';
import Search from './modules/search.js';
import mapLegend from './modules/map-legend';
import Api from './modules/api';

class AirDashboard {
    constructor() {
        this.api = new Api();
        this.api.getUserLocation();
        
        setTimeout(() => this.init(), 3000);
    }

    init() {
        myHeader.init();
        myBody.init();
        myFooter.init();
        myMap.init();
        mapLegend.legend();
        Table.init(this.api);
        Chart.init(this.api);
        Search.init(this.api);
        
        setTimeout(() => document.querySelector('.loader').remove(), 5000);
    }
}

document.addEventListener("DOMContentLoaded", new AirDashboard());
