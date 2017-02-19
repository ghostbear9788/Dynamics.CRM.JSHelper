/// <reference path="C:\jeff\Microsoft.Dynamics.CRM.SDK.Extensions\Microsoft.Dynamics.CRM.SDK.Extensions.JSHelper\XrmHelper.1.0.js" />

function xrmHelperUT() {
    debugger;
    //alert('onload');
    var xrmHelper = new XrmHelper();



    //test code
    //xrmHelper.Create("contacts", { "firstname": "hello", "lastname": "webapi" });


    //create account
    var entityUrl = xrmHelper.Create("accounts", "{'name':'create test account sync'}");
    console.log(entityUrl + "create sync\n");
    
    var entityAsyncUrl = null;
    xrmHelper.CreateAsync("accounts", "{'name':'create test account async'}", function (result) {
        entityAsyncUrl = result;
        console.log(result+ "create async\n")
    });

    //read account
    var createdAcc = xrmHelper.Read(entityUrl);
    console.log(createdAcc.name+" Read \n");

    var createdAccAsync = null;
    xrmHelper.ReadAsync(entityAsyncUrl, function (result) {
       
        console.log(result.name + " Read Async\n");
    });



    //update account
    var uptsyncObj = "{ 'telephone1': '15000303158' }";
 
    xrmHelper.Update(entityUrl, uptsyncObj);
    console.log("update\n");


    var uptAsyncObj = "{ 'telephone1': '15000303155' }";
    
    
    xrmHelper.UpdateAsync(entityAsyncUrl, uptAsyncObj, function (c, r) {
        console.log("update async\n");
    })


    //delete account
    var isDeleted=xrmHelper.Delete(entityUrl);
    console.log("delete "+isDeleted+" \n");

    xrmHelper.DeleteAsync(entityAsyncUrl, function (isDeleted) {
        console.log("delete " + isDeleted + " \n");
    })


    //execute API
    //who am I
    var userInfo=xrmHelper.ExecuteAPI("GET", "WhoAmI()", null);

    xrmHelper.ExecuteAPIAsync("GET", "WhoAmI()", null, function (r) {
        if (r != null)
        {
            console.log(r.UserId);
        }
    });


    //RetrieveUserprivileges
    if (userInfo != null)
    {
        var query = "systemusers(" + userInfo.UserId + ")/Microsoft.Dynamics.CRM.RetrieveUserPrivileges";
        var previleges=xrmHelper.ExecuteAPI("GET", query, null);

    }

    //Invoke bound custom action
    var testAccId = xrmHelper.Create("accounts", "{'name':'this is a test acc for bound custom action'}");
    if (testAccId != null)
    {
        var query = testAccId + "/Microsoft.Dynamics.CRM.new_Splitaccountnameaction";
        var params = "{'Telephone1':'15000303111'}";
        var result = xrmHelper.ExecuteAPI("POST", query, params);
        console.log(result);
    }


    //Test Retrieve entity
    var result = xrmHelper.RetrieveEntity("accounts", testAccId, ["accountid", "telephone1", "name"]);
    if (result != null)
    {
        console.log(result.name + " " + result.telephone1 + " " + result.accountid);
    }


    var result2 = xrmHelper.RetrieveEntityAsync("accounts", "411719b5-daf4-e611-80ff-5065f38b31c1", ["accountid", "telephone1", "name"], function (r) {
        if (r != null) {
            console.log(r.name + " " + r.telephone1 + " " + r.accountid);
        }
    });
    
}