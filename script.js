const modalAdd = document.querySelector('#modal-add');
const modalChemistry = document.querySelector('#modal-chemistry');

let action = null;
let amount = null;

const containerTabung = document.querySelector('.container-tabung > div');
let list_tabung = [];

function resetButtonAksi() {
    document.querySelectorAll('#buttons button').forEach(btn => {
        btn.classList.remove('active');
    });

    list_tabung.forEach(item => {
        item.setCelciusMode(false);
    });
}

function resetSelectedTabung() {
    containerTabung.querySelectorAll('.card-tabung').forEach(item => {
        item.classList.remove('active');
    });
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

document.getElementById('celcius-mode').addEventListener("click", function() {
    action = 'celcius-mode'
    
    if (!this.classList.contains('active')) {
        resetButtonAksi();
        this.classList.add('active');

        list_tabung.forEach(item => {
            item.setCelciusMode(true);
        });
    }

});

document.getElementById('oxygene-mode').addEventListener("click", function() {
    resetButtonAksi();
    action = 'oxygene-mode'
    this.classList.add('active');
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
                let tabung = document.createElement('div');
                tabung.setAttribute('class', 'card-tabung card');
                containerTabung.appendChild(tabung);

                let val = parseInt(modalAdd.querySelector('input#amount-subtrat').value);
                let name = modalAdd.querySelector('input#tube-name').value || `Tabung ${list_tabung.length+1}`;

                list_tabung.push(new Tabung({
                    container: tabung, 
                    amount: val,
                    name: name
                }));
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
                break;
            case "hcl-mode":
                break;
            case "h2o2-mode":
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