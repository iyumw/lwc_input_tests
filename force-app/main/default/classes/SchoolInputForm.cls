public with sharing class SchoolInputForm {

    /**
     * @description Cria um novo registro de School__c no banco de dados.
     * @param schdata Objeto contendo os dados do formulário da escola.
     * @return Uma string de confirmação com o ID do registro criado.
     * @throws AuraHandledException Se ocorrer um erro durante a inserção (DML).
     */

    @AuraEnabled(cacheable=false)
    public static string createSchoolRecord(Schooldata schdata) {
        try{
            School__c newSch = new School__c();
            newSch.Name = schdata.schoolName;
            newSch.School_Address__c = schdata.schoolAddress;
            newSch.Number_of_Students__c = schdata.numberOfStudents;
            newSch.School_Type__c = schdata.schoolType;
            newSch.Contact_Email__c = schdata.contactEmail;
            newSch.Established_Date__c = Date.valueOf(schdata.establishedDate);
            newSch.Education_Levels__c = schdata.educationLevels;
            newSch.Satisfaction_Slider__c = schdata.satisfactionSlider;
            newSch.Boarding_Type__c = schdata.boardingType;
            newSch.Requires_Special_Assistance__c = schdata.requiresSpecialAssistance;
            newSch.Extracurricular_Activities__c = schdata.extracurricularActivities;
            
            insert newSch;

            return 'School record created successfully with Id: ' + newSch.Id;
        } catch(DmlException e) {
            System.debug('Error creating school record: ' + e.getMessage());
            throw new AuraHandledException('Error creating record: ' + e.getMessage());
        } 
    }

    /**
     * @description Método invocável para criar um registro de escola.
     * @param requestList Lista de requisições (normalmente conterá apenas um item).
     * @return Lista de respostas para o Flow.
     */

    @InvocableMethod(label='School Form' description='School Form Input')
    public static List<electResponse> schoolre(List<SchoolReq> screqList) {
        Schooldata dataFromFlow = screqList[0].schdata;
        String resultMessage = createSchoolRecord(dataFromFlow);

        List<electResponse> results = new List<electResponse>();
        electResponse res = new electResponse();
        res.message = resultMessage;
        results.add(res);

        return results;
    }

    // CLASSES INTERNAS PARA ESTRUTURAÇÃO DOS DADOS

    /**
     * @description Classe wrapper para a requisição do Flow, contendo os dados da escola.
     */
    public class SchoolReq {
        @AuraEnabled
        @InvocableVariable(required=true)
        public Schooldata schdata;
    } 

    /**
     * @description Estrutura de dados que representa as informações do formulário da escola.
     * Usada para transferir dados entre o LWC/Flow e o Apex.
     */

    public class Schooldata {
        @AuraEnabled
        @InvocableVariable(required=true)
        public String schoolName;

        @AuraEnabled
        @InvocableVariable(required=true)
        public String schoolAddress;
        
        @AuraEnabled
        @InvocableVariable(required=true)
        public Integer numberOfStudents; 

        @AuraEnabled
        @InvocableVariable(required=true)
        public String schoolType;

        @AuraEnabled
        @InvocableVariable(required=true)
        public String contactEmail;

        @AuraEnabled
        @InvocableVariable(required=true)
        public String establishedDate;

        @AuraEnabled
        @InvocableVariable(required=true)
        public String educationLevels;

        @AuraEnabled
        @InvocableVariable(required=true)
        public Integer satisfactionSlider;

        @AuraEnabled
        @InvocableVariable(required=true)
        public String boardingType;

        @AuraEnabled
        @InvocableVariable(required=true)
        public Boolean requiresSpecialAssistance;

        @AuraEnabled
        @InvocableVariable(required=true)
        public String extracurricularActivities;

    }

    /**
     * @description Classe wrapper para a resposta enviada de volta ao Flow.
     */
    public class electResponse {
        @AuraEnabled
        @InvocableVariable
        public String message;
    }
}