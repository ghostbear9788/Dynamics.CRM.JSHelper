/// <reference path="D:\Source Code\Dynamics\Microsoft.Dynamics.CRM.SDK.Extensions\Microsoft.Dynamics.CRM.SDK.Extensions.JSHelper\XrmHelper.1.0.js" />

var xrmHelper = new XrmHelper();
function sendNotification()
{
    debugger;
    var xrmHelper = XrmHelper.getInstance(true);
    var accountId=Xrm.Page.data.entity.getId().replace("{","").replace("}","");
    var url="/api/data/v8.2/accounts("+accountId+")/Microsoft.Dynamics.CRM.new_SendNotificationEmail";
    xrmHelper.ExecuteWebAPI("POST",url,{},callbackHandler);


}

function sendNotificationThroughSOAP()
{
    var url="";
    var action = "Execute";
    var accountid = Xrm.Page.data.entity.getId();
    var msg = ["<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>",
                "<s:Body>",
                "<Execute xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>",
                    "<request xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                    "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                        "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Target</b:key>",
                        " <b:value i:type='a:EntityReference'>",
                            "<a:Id>"+accountid+"</a:Id>",
                            " <a:KeyAttributes xmlns:c='http://schemas.microsoft.com/xrm/7.1/Contracts' />",
                            "<a:LogicalName>account</a:LogicalName>",
                            "<a:Name i:nil='true' />",
                            "<a:RowVersion i:nil='true' />",
                        "</b:value>",
                        "</a:KeyValuePairOfstringanyType>",
                    "</a:Parameters>",
                    "<a:RequestId i:nil='true' />",
                    "<a:RequestName>new_SendNotificationEmail</a:RequestName>",
                    "</request>",
                "</Execute>",
                "</s:Body>",
            "</s:Envelope>"].join("");


}


function callbackHandler(result)
{
    alert(result);
}


function createContact()
{
    xrmHelper.Create("contacts", { "firstname": "hello", "lastname": "webapi" });
    xrmHelper
}