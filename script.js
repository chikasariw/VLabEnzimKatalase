const modalAdd = document.querySelector('#modal-add');
const modalChemistry = document.querySelector('#modal-chemistry');

let action = null;
let amount = null;

const containerTabung = document.querySelector('.container-tabung > div');
window.list_tabung = [];

function resetButtonAksi() {
    document.querySelectorAll('#buttons button').forEach(btn => {
        btn.classList.remove('active');
    });

    list_tabung.forEach(item => { 
        item.setCelciusMode(0);
        item.setNAOHmode(0);
        item.setHCLmode(0);
        item.setH2O2mode(0);
        item.setCheckMode(0);
    });
}

function resetSelectedTabung() {
    containerTabung.querySelectorAll('.card-tabung').forEach(item => {
        item.classList.remove('active');
    });
}

function addTube(val = 1, tubeName = '') {
    let tabung = document.createElement('div');
    tabung.setAttribute('class', 'card-tabung card');
    containerTabung.appendChild(tabung);

    list_tabung.push(new Tabung({
        container: tabung, 
        amount: val,
        name: tubeName || `Tabung ${list_tabung.length + 1}`,
    }));
}

// data-bs-toggle="modal" data-bs-target="#modal-celcius"

document.getElementById('naoh-mode').addEventListener("click", function() {
    resetButtonAksi();
    action = 'naoh-mode';
    modalChemistry.querySelector('.modal-title').innerHTML = 'Tambah Senyawa NAOH';
});

document.getElementById('hcl-mode').addEventListener("click", function() {
    resetButtonAksi();
    action = 'hcl-mode';
    modalChemistry.querySelector('.modal-title').innerHTML = 'Tambah Senyawa HCL';
});

document.getElementById('h2o2-mode').addEventListener("click", function() {
    resetButtonAksi();
    action = 'h2o2-mode';
    modalChemistry.querySelector('.modal-title').innerHTML = 'Tambah Senyawa H2O2';
});

document.getElementById('oxygene-mode').addEventListener("click", function() {
    resetButtonAksi();
    action = 'oxygene-mode'
    this.classList.add('active');

    list_tabung.forEach(item => {
        item.setCheckMode(1);
    });
});

document.getElementById('celcius-mode').addEventListener("click", function() {
    resetButtonAksi();
    action = 'celcius-mode'
    this.classList.add('active');

    list_tabung.forEach(item => {
        item.setCelciusMode(1);
    });
});

document.getElementById('add-tube').addEventListener("click", function() {
    resetButtonAksi();
    action = 'add-tube';
    modalAdd.querySelector('input#tube-name').value = '';
    modalAdd.querySelector('input#amount-subtrat').value = 1;
});

document.querySelectorAll('button.btn-submit').forEach(btn => {
    btn.addEventListener("click", function() {
        switch (action) {
            case "add-tube":
                let val = parseInt(modalAdd.querySelector('input#amount-subtrat').value);
                let name = modalAdd.querySelector('input#tube-name').value;

                addTube(val, name);
                break;
            case "celcius-mode":
                let selectedTabung = document.querySelector('.card-tabung.active');

                list_tabung.forEach(item => {
                    if (item.container == selectedTabung) {
                        let temperature = -13 + parseInt(document.querySelector('input#degree').value);
                        item.updateTemperature(temperature);
                    }
                })
                break;
            case "naoh-mode":
                document.getElementById('naoh-mode').classList.add('active');

                list_tabung.forEach(item => {
                    item.setNAOHmode(1, parseInt(modalChemistry.querySelector('input#amount-chemistry').value));
                });
                break;
            case "hcl-mode":
                document.getElementById('hcl-mode').classList.add('active');

                list_tabung.forEach(item => {
                    item.setHCLmode(1, parseInt(modalChemistry.querySelector('input#amount-chemistry').value));
                });
                break;
            case "h2o2-mode":
                document.getElementById('h2o2-mode').classList.add('active');

                list_tabung.forEach(item => {
                    item.setH2O2mode(1, parseInt(modalChemistry.querySelector('input#amount-chemistry').value));
                });
                break;
            default:
                console.error('invalid option!');
        }
    });
});

document.querySelectorAll('.modal button[data-bs-dismiss="modal"]').forEach(btn => {
    btn.addEventListener("click", resetSelectedTabung);
})

document.querySelector('input#degree').addEventListener('input', function() {
    document.querySelector('span#degree-indicator').innerText = -13 + parseInt(this.value);
});

document.addEventListener('DOMContentLoaded', () => {
    addTube();
});