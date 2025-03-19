class Tabung
{
    constructor({container, amount = 1, name = "Tabung 1"})
    {
        this.container = container;
        this.parent = container.closest('.container-tabung > div');
        this.foot = container.querySelector('.card-footer');
        
        this.name = name;
        this.amount = amount;
        this.celcius = 37;
        this.ph = 7;

        this.active = true;
        this.checkMode = 0;
        this.naohMode = 0;
        this.hclMode = 0;
        this.celciusMode = 0;
        this.isReacted = 0;

        this.init = this.init.bind(this);
        this.delete = this.delete.bind(this);
        this.setCelciusMode = this.setCelciusMode.bind(this);

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


        // Container click events
        this.container.addEventListener('click', () => {
            if (this.celciusMode === 1) {
                this.container.classList.add('active');
                document.querySelector('input#degree').value = this.celcius + 13;
                document.querySelector('span#degree-indicator').innerText = this.celcius;
            }
        });


        // Delete Tabung
        this.container.querySelector('button.btn-close').addEventListener('click', () => {
            this.delete();
        });


        // Change Tabung Name Events
        this.foot?.addEventListener('click', function(e) {
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
            this.isReacted == 0
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

    delete()
    {
        this.active = false;
        this.container.remove();
    }

}