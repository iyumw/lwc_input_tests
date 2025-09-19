import { LightningElement, api } from 'lwc';

/**
 * @description Componente de formulário para coletar informações sobre uma escola.
 * Dispara um evento 'valuechange' sempre que um campo do formulário é alterado.
 */

export default class Schoolform extends LightningElement {

    @api value; //Objeto para preencher os valores iniciais do formulário.
    @api readOnly;

    // --- PROPRIEDADES DO COMPONENTE ---
    // Armazenam o estado de cada campo do formulário.
    schoolName;
    schoolAddress;
    numberOfStudents;
    schoolType;
    contactEmail;
    establishedDate;
    educationLevels = [];
    val = 50;
    boardingType = 'Day School';
    requiresSpecialAssistance = false;
    extracurricularActivities = [];

    // --- GETTERS PARA OPÇÕES DE PICKLISTS ---
    // Estes getters fornecem as opções para os componentes de seleção.
    get schoolTypeOptions() { return [ { label: 'Public', value: 'Public' }, { label: 'Private', value: 'Private' } ]; }
    get educationLevelsOptions() { return [ { label: 'Elementary', value: 'Elementary' }, { label: 'Middle School', value: 'Middle School' }, { label: 'High School', value: 'High School' }, { label: 'College', value: 'College' } ]; }
    get boardingOptions() { return [ { label: 'Day School', value: 'Day School' }, { label: 'Boarding School', value: 'Boarding School' }]; }
    get activityOptions() { return [ { label: 'Sports', value: 'Sports' }, { label: 'Music', value: 'Music' }, { label: 'Arts', value: 'Arts' }, { label: 'Robotics', value: 'Robotics' }, { label: 'Debate Club', value: 'Debate Club' } ]; }

    // --- MÉTODOS DO CICLO DE VIDA ---
    // Popula os campos do formulário com os valores iniciais fornecidos via propriedade 'value'.
    connectedCallback() {
        if (this.value) {
            const data = this.value;
            this.schoolName = data.schoolName;
            this.schoolAddress = data.schoolAddress;
            this.numberOfStudents = data.numberOfStudents;
            this.schoolType = data.schoolType;
            this.contactEmail = data.contactEmail;
            this.establishedDate = data.establishedDate;
            this.satisfactionSlider = data.satisfactionSlider;
            this.boardingType = data.boardingType;
            this.requiresSpecialAssistance = data.requiresSpecialAssistance;
            this.educationLevels = this.stringToArray(data.educationLevels);
            this.extracurricularActivities = this.stringToArray(data.extracurricularActivities);
        }
    }

    // --- MANIPULADORES DE EVENTOS ---
    // Manipula mudanças em qualquer campo do formulário.
    handleInputChange(event) {
        event.stopPropagation();
        
        const fieldName = event.target.name;
        let fieldValue;

        // O valor pode vir de 'checked', 'value' ou 'detail.value' dependendo do componente.
        switch(event.target.type) {
            case 'checkbox':
                // Para lightning-input com type="checkbox"
                fieldValue = event.target.checked;
                break;
            default:
                // Para a maioria dos inputs (texto, combobox, slider, radio)
                // e também para os que enviam o valor em event.detail (checkbox-group, dual-listbox)
                fieldValue = event.detail ? event.detail.value : event.target.value;
        }

        this[fieldName] = fieldValue;

        // Dispara o evento 'valuechange' com o estado atualizado do formulário.
        this.dispatchEvent(
            new CustomEvent("valuechange", {
                bubbles: true,
                composed: true,
                detail: {
                    value: {
                        schoolName: this.schoolName,
                        schoolAddress: this.schoolAddress,
                        numberOfStudents: this.numberOfStudents,
                        schoolType: this.schoolType,
                        contactEmail: this.contactEmail,
                        establishedDate: this.establishedDate,
                        satisfactionSlider: this.satisfactionSlider,
                        boardingType: this.boardingType,
                        requiresSpecialAssistance: this.requiresSpecialAssistance,
                        // Converte os arrays para strings antes de enviar
                        extracurricularActivities: this.extracurricularActivities.join(';'),
                        educationLevels: this.educationLevels.join(';'),
                    },
                },
            }),
        );
    }

    // --- MÉTODOS AUXILIARES ---
    // Converte uma string delimitada por ponto e vírgula em um array.
    stringToArray(value) {
        if (value && typeof value === 'string') {
            return value.split(';');
        }
        return [];
    }
}