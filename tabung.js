class Tabung
{
    constructor({container, amount = 1, name = "Tabung 1"})
    {
        this.container = container;
        this.parent = container.closest('.container-tabung > div');
        this.interface = null;
        this.footer = null;
        
        this.name = name;
        this.amount = amount;
        this.celcius = 37;
        this.ph = 7;
        this.chemistryAmount = 0;

        this.active = true;
        this.checkMode = 0;
        this.naohMode = 0;
        this.hclMode = 0;
        this.celciusMode = 0;
        this.reactMode = 0;

        this.init = this.init.bind(this);
        this.delete = this.delete.bind(this);
        this.setCelciusMode = this.setCelciusMode.bind(this);
        this.updateTemperature = this.updateTemperature.bind(this);
        this.setNAOHmode = this.setNAOHmode.bind(this);

        this.init()
    }

    init()
    {
        // Set Tipe Tabung
        this.container.innerHTML = `
            <div class="card-body">
                <div class="row h-100 ps-4">
                    <div class="col-6 d-flex flex-column justify-content-end align-items-center">
                        <div class="interface">
                        </div>
                        <img class="tabung" src="asset/images/TabungMedia_${this.amount}.svg" />
                    </div>
                    <div class="col-6 pb-4 d-flex flex-column justify-content-end align-items-start gap-2"
                        style="transform: translateX(-16px);">
                        <span class="badge rounded-pill text-bg-primary">PH : <b class="ph-value">${this.ph}</b></span>
                        <span class="badge rounded-pill text-bg-danger">Suhu : <b class="degree-value">${this.celcius}</b>°C</span>
                        <span class="badge rounded-pill text-bg-warning">Substrat : ${this.amount} ml</span>
                    </div>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <h3 class="card-title mb-0 p-2" contenteditable="true" spellcheck="false">${this.name}</h3>
                <button type="button" class="btn-close"></button>
            </div>
        `;

        // Card Fragment
        this.interface = this.container.querySelector('.interface');
        this.footer = this.container.querySelector('.card-footer');

        // Container click events
        this.container.addEventListener('click', () => {
            if (this.celciusMode === 1) {
                this.container.classList.add('active');
                document.querySelector('input#degree').value = this.celcius + 13;
                document.querySelector('span#degree-indicator').innerText = this.celcius;
            }
            
            if (this.naohMode === 1) {
                window.list_tabung.forEach(item => {
                    item.container.classList.remove('active');
                    item.setNAOHmode(1, this.chemistryAmount);
                });
                
                this.container.classList.add('active');
                this.setNAOHmode(2);
            } else if (this.naohMode === 2) {
                this.naohMode = 3;
                this.interface.innerHTML += `<img class="droplet" src="asset/images/Tetes_NaoH.svg" alt="tetes NAOH">`;
                setTimeout(() => {
                    this.addPH()
                    this.container.classList.remove('active');
                    this.setNAOHmode(1, this.chemistryAmount);
                }, 2000);
            }

            if (this.hclMode === 1) {
                window.list_tabung.forEach(item => {
                    item.container.classList.remove('active');
                    item.setHCLmode(1, this.chemistryAmount);
                });
                
                this.container.classList.add('active');
                this.setHCLmode(2);
            } else if (this.hclMode === 2) {
                this.hclMode = 3;
                this.interface.innerHTML += `<img class="droplet" src="asset/images/Tetes_HCL.svg" alt="tetes HCL">`;
                setTimeout(() => {
                    this.subtractPH()
                    this.container.classList.remove('active');
                    this.setHCLmode(1, this.chemistryAmount);
                }, 2000);
            }

            if (this.reactMode === 1) {
                window.list_tabung.forEach(item => {
                    item.container.classList.remove('active');
                    item.setH2O2mode(1, this.chemistryAmount);
                });
                
                this.container.classList.add('active');
                this.setH2O2mode(2);
            } else if (this.reactMode === 2) {
                this.reactMode = 3;
                this.interface.querySelector('img.h2o2').classList.add('active')
                setTimeout(() => {
                    // this.react()
                    this.container.classList.remove('active');
                    this.setHCLmode(3);
                }, 2250);
            }
        });


        // Delete Tabung
        this.container.querySelector('button.btn-close').addEventListener('click', () => {
            this.delete();
        });


        // Change Tabung Name Events
        this.footer.addEventListener('click', function(e) {
            if (e.target === this) this.querySelector('h3').focus();
        });
    }

    setCelciusMode(toggle = true)
    {
        if (
            toggle &&
            this.checkMode == 0 &&
            this.naohMode == 0 &&
            this.hclMode == 0 &&
            this.reactMode == 0
        ) {
            this.celciusMode = 1;
            this.parent.querySelectorAll('.card-tabung').forEach(container => {
                container.setAttribute('data-bs-toggle', 'modal');
                container.setAttribute('data-bs-target', '#modal-celcius');
            });
        } else if (!toggle && this.celciusMode == 1) {
            this.celciusMode = 0;
            this.parent.querySelectorAll('.card-tabung').forEach(container => {
                container.removeAttribute('data-bs-toggle');
                container.removeAttribute('data-bs-target');
            });
        }
    }

    updateTemperature(degree = 37)
    {
        this.celcius = degree;
        this.container.querySelector('.degree-value').innerText = degree;
    }

    setNAOHmode(mode = 1, chemistryAmount = 1)
    {
        if (
            mode == 1 &&
            this.hclMode == 0 &&
            this.celciusMode == 0 &&
            this.reactMode == 0 &&
            this.checkMode == 0
        ) {
            this.chemistryAmount = chemistryAmount;
            this.naohMode = 1;
            this.interface.innerHTML = '';
        } else if (mode == 2 && this.naohMode == 1) {
            this.naohMode = 2;
            this.interface.innerHTML = `<img class="pipet" src="asset/images/Pipet_NaoH.svg" alt="pipet NAOH">`;
        } else if (!mode && this.naohMode !== 0) {
            this.chemistryAmount = 0;
            this.naohMode = 0;
            this.interface.innerHTML = '';
        }
    }

    addPH() {
        this.ph += this.chemistryAmount;
        this.container.querySelector('.ph-value').innerText = this.ph;
    }

    setHCLmode(mode = 1, chemistryAmount = 1)
    {
        if (
            mode == 1 &&
            this.naohMode == 0 &&
            this.celciusMode == 0 &&
            this.reactMode == 0 &&
            this.checkMode == 0 
        ) {
            this.chemistryAmount = chemistryAmount;
            this.hclMode = 1;
            this.interface.innerHTML = '';
        } else if (mode == 2 && this.hclMode == 1) {
            this.hclMode = 2;
            this.interface.innerHTML = `<img class="pipet" src="asset/images/Pipet_HCL.svg" alt="pipet HCL">`;
        } else if (!mode && this.hclMode !== 0) {
            this.chemistryAmount = 0;
            this.hclMode = 0;
            this.interface.innerHTML = '';
        }
    }

    subtractPH() {
        this.ph -= this.chemistryAmount;
        this.container.querySelector('.ph-value').innerText = this.ph;
    }

    setH2O2mode(mode = 1, chemistryAmount = 1)
    {
        if (
            mode == 1 &&
            this.hclMode == 0 &&
            this.naohMode == 0 &&
            this.celciusMode == 0 &&
            this.reactMode != 3 &&
            this.checkMode == 0
        ) {
            this.chemistryAmount = chemistryAmount;
            this.reactMode = 1;
            this.interface.innerHTML = '';
        } else if (mode == 2 && this.reactMode == 1) {
            this.reactMode = 2;
            this.interface.innerHTML = `
                <img class="h2o2" src="asset/images/Tuang_H202.svg" alt="Tuang h2O2">
                <img class="droplet" src="asset/images/Tetes_H20H2.svg" alt="Tetes H2O2">
            `;
        } else if (!mode && this.reactMode !== 0 && this.reactMode !== 3) {
            this.chemistryAmount = 0;
            this.reactMode = 0;
            this.interface.innerHTML = '';
        }
    }

    delete()
    {
        this.active = false;
        
        for (let [i, val] of window.list_tabung.entries()) {
            if (val === this) {
                window.list_tabung.splice(i, 1);
                break;
            }
        }

        this.container.remove();
    }

}