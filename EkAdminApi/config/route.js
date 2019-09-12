const routeJsonList = [
    {

        MasterRoute: "/lookuptype",
        Method: "post",
        tokenRequired: true,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: true,
            SqlProcName: "usp_get_lookuptype_admindashboard",
            IsParamRequired: false,
            ParameterInfo: [],
            IsOutPutParamRequired: false,
            OutParameterInfo: []
        }
    }
    ,
    {
        MasterRoute: "/states",
        Method: "post",
        tokenRequired: false,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: true,
            SqlProcName: "usp_get_states",
            SqlQuery: "",
            IsParamRequired: true,
            ParameterInfo: [
                {
                    parameterName: "countryname",
                    parametertype: "string",
                    required: true,
                    errormessage: "countryname is required",
                    minlengt: 1,
                    maxlength: 10000

                }
            ],
            IsOutPutParamRequired: false,
            OutParameterInfo: []

        }
    }
    ,
    {
        MasterRoute: "/currency",
        Method: "post",
        tokenRequired: false,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: true,
            SqlProcName: "usp_get_Currency",
            SqlQuery: "",
            IsParamRequired: true,
            ParameterInfo: [
                {
                    parameterName: "countryname",
                    parametertype: "string",
                    required: true,
                    errormessage: "countryname is required",
                    minlength: 1,
                    maxlength: 10000
                }
            ],
            IsOutPutParamRequired: false,
            OutParameterInfo: []
        }
    },
    {
        MasterRoute: "/salutation",
        Method: "post",
        tokenRequired: false,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: false,
            SqlProcName: "",
            SqlQuery: "Select ID,TypeCode,TypeName from LookUpGroup  where TYPEGroup ='SALUTATION' and IsActive=1 Order by  TypeName",
            IsParamRequired: false,
            ParameterInfo: [],
            IsOutPutParamRequired: false,
            OutParameterInfo: []
        }
    }
    ,
    {
        MasterRoute: "/countries",
        Method: "post",
        tokenRequired: false,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: true,
            SqlProcName: "usp_get_country",
            SqlQuery: "",
            IsParamRequired: false,
            ParameterInfo: [],
            IsOutPutParamRequired: false,
            OutParameterInfo: []
        }
    },
    {
        MasterRoute: "/domainavailability",
        Method: "post",
        tokenRequired: false,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: true,
            SqlProcName: "usp_check_domain_availbility",
            SqlQuery: "",
            IsParamRequired: true,
            ParameterInfo: [
                {
                    parameterName: "domainname",
                    parametertype: "string",
                    required: true,
                    errormessage: "domainname is required",
                    minlength: 3,
                    maxlength: 50
                }
            ],
            IsOutPutParamRequired: false,
            OutParameterInfo: []
        }
    }

    ,
    {
        MasterRoute: "/admindashboard/getaccountdata",
        Method: "post",
        tokenRequired: true,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: true,
            SqlProcName: "Usp_GetAllAccounts",
            SqlQuery: "",
            IsParamRequired: false,
            ParameterInfo: [
                {
                    parameterName: "orderstatus",
                    parametertype: "string",
                    required: true,
                    errormessage: "id is required",
                    minlength: 1,
                    maxlength: 50
                }],
            IsOutPutParamRequired: false,
            OutParameterInfo: [
                {
                    ParamName: "totalcount",
                    DataType: "INT",

                }],

        }
    },
    {
        MasterRoute: "/verifyaccount",
        Method: "post",
        tokenRequired: false,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: true,
            SqlProcName: "usp_validate_account_emailactivation",
            SqlQuery: "",
            IsParamRequired: true,
            ParameterInfo: [
                {
                    parameterName: "verificationcode",
                    parametertype: "string",
                    required: true,
                    errormessage: "verificationcode is required",
                    minlength: 1,
                    maxlength: 500
                }],
            IsOutPutParamRequired: false,
            OutParameterInfo: [
                {
                    ParamName: "totalcount",
                    DataType: "INT",

                }],

        }
    },
    {
        MasterRoute: "/organizationtype",
        Method: "post",
        tokenRequired: false,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: true,
            SqlProcName: "usp_get_organization_type",
            SqlQuery: "",
            IsParamRequired: false,
            ParameterInfo: [],
            IsOutPutParamRequired: false,
            OutParameterInfo: [],

        }
    },
    
    {
        MasterRoute: "/getconfigmessage",
        Method: "post",
        tokenRequired: false,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: true,
            SqlProcName: "usp_get_config_setup_value",
            SqlQuery: "",
            IsParamRequired: true,
            ParameterInfo: [
                {
                    parameterName: "code",
                    parametertype: "string",
                    required: true,
                    errormessage: "code is required",
                    minlength: 1,
                    maxlength: 500
                }],
            IsOutPutParamRequired: false,
            OutParameterInfo: [
                {
                    ParamName: "totalcount",
                    DataType: "INT",

                }],

        }
    },
    
    {
        MasterRoute: "/dbformfields",
        Method: "post",
        tokenRequired: false,
        Schema: {
            emailEnabled: false,
            smsEnabled: false,
            StoreProc: false,
            SqlProcName: "",
            SqlQuery: "Select FormFieldLanguageMapId,FormField.*, FormFieldLanguageMap.value,Language.name as Language,Language.code as LanguageCode from FormField inner join FormFieldLanguageMap on FormFieldLanguageMap.FormFieldID=FormField.FormFieldID            inner join Language on Language.id=FormFieldLanguageMap.LanguageID            where FormName='LOGIN'  ",
            IsParamRequired: false,
            ParameterInfo: [
                {
                    parameterName: "code",
                    parametertype: "string",
                    required: true,
                    errormessage: "code is required",
                    minlength: 1,
                    maxlength: 500
                }],
            IsOutPutParamRequired: false,
            OutParameterInfo: [
                {
                    ParamName: "totalcount",
                    DataType: "INT",

                }],

        }
    }

]



// @orderstatus Nvarchar(100)='',
//  @startindex as int=1,
//  @pagesize as int=10,
//  @sortcolumn as varchar(50)=NULL,
//  @sortdirection as varchar(4)=NULL,
//  @filtervalue as varchar(1000)=null
module.exports.routeJsonList = routeJsonList;