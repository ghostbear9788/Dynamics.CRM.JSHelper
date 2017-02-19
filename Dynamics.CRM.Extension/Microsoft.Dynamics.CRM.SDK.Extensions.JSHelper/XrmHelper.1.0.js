var WEB_API_VERSION = "8.1";
var JQUERY_URL = "/WebResources/new_jquery.1.11.js";

function XrmHelper()
{
     var _clientUrl = Xrm.Page.context.getClientUrl();
     this._webApiUrl = _clientUrl + "/api/data/v" + WEB_API_VERSION + "/";

    //Add Jquery to current DOM
    //var JqueryNode = document.createElement("script");
    //JqueryNode.setAttribute("scr", _clientUrl + JQUERY_URL);
    //JqueryNode.setAttribute("type", "text/javascript");
    //document.getElementsByTagName("head")[0].appendChild(JqueryNode);





}


XrmHelper.prototype.Create = function (url, content) {

    var data = null;
    

    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': content != null ? content.length : 0 },
        type: "POST",
        url: url.indexOf("http") == -1 ? this._webApiUrl + url : url,
        async: false,
        cache: false,
        data:content,
        complete: function (context) {
            if (context.status>=200 && context.status<300) {
                try {
                    data = context.getResponseHeader("OData-EntityId");
                } catch (e) { }
            }
        }
    });//ajax
    return data;

};

XrmHelper.prototype.CreateAsync = function (url, content, callbackHandler) {



    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': content != null ? content.length : 0 },
        type: "POST",
        url: url.indexOf("http") == -1 ? this._webApiUrl + url : url,
        async: false,
        cache: false,
        data: content,
        complete: function (context,result) {
            if (context.status >= 200 && context.status < 300) {
                try {
                    //data = $.parseJSON(context.responseText).d;
                    callbackHandler(context.getResponseHeader("OData-EntityId"));
                } catch (e) { }
            }
        }
    });//ajax


};

XrmHelper.prototype.Read = function (url) {

    var data = null;

    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8'},
        type: "GET",
        url: url.indexOf("http")==-1? this._webApiUrl + url:url,
        async: false,
        cache: true,
        complete: function (context, result) {
            if (context.status >= 200 && context.status < 300) {
                try {
                    data = context.responseJSON;
                } catch (e) { }
            }
        }
    });//ajax
    return data;

};

XrmHelper.prototype.ReadAsync = function (url, callbackHandler) {



    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8'},
        type: "GET",
        url: url.indexOf("http") == -1 ? this._webApiUrl + url : url,
        async: false,
        cache: true,
        complete: function (context, result) {
            if (context.status >= 200 && context.status < 300) {
                try {
                    //data = $.parseJSON(context.responseText).d;
                    callbackHandler(context.responseJSON);
                } catch (e) { }
            }
        }
    });//ajax


};

XrmHelper.prototype.Update = function (url, content) {

    var data = null;

    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': content != null ? content.length : 0 },
        type: "PATCH",
        url: url.indexOf("http") == -1 ? this._webApiUrl + url : url,
        async: false,
        cache: false,
        data:content,
        complete: function (context, result) {
            if (context.status >= 200 && context.status < 300) {
                try {
                    data = result;
                } catch (e) { }
            }
        }
    });//ajax
    return data;

};

XrmHelper.prototype.UpdateAsync = function (url, content, callbackHandler) {



    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': content != null ? content.length : 0 },
        type: "PATCH",
        url: url.indexOf("http") == -1 ? this._webApiUrl + url : url,
        async: false,
        cache: false,
        data:content,
        complete: function (context, result) {
            if (context.status >= 200 && context.status < 300) {
                try {
                    //data = $.parseJSON(context.responseText).d;
                    callbackHandler(result);
                } catch (e) { }
            }
        }
    });//ajax


};

XrmHelper.prototype.Delete = function (url) {

    var data = false;

    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8'},
        type: "DELETE",
        url: url.indexOf("http") == -1 ? this._webApiUrl + url : url,
        async: false,
        cache: false,
        complete: function (context, result) {
            if (context.status >= 200 && context.status < 300) {
                try {
                    data = true;
                } catch (e) { }
            }
        }
    });//ajax
    return data;

};

XrmHelper.prototype.DeleteAsync = function (url, callbackHandler) {


    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8' },
        type: "DELETE",
        url: url.indexOf("http") == -1 ? this._webApiUrl + url : url,
        async: false,
        cache: false,
        complete: function (context, result) {
            if (context.status >= 200 && context.status < 300) {
                try {
                    callbackHandler(true);
                }
                catch (e) { }
            }
            else {
                callbackHandler(false);
            }
        }
    });//ajax

};

XrmHelper.prototype.ExecuteAPI = function (method,url, content) {

    var data = null;

    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': content != null ? content.length : 0 },
        type: method,
        url: url.indexOf("http") == -1 ? this._webApiUrl + url : url,
        async: false,
        cache: false,
        data:content,
        complete: function (context, result) {
            if (context.status >= 200 && context.status < 300) {
                try {
                   
                    if (context.responseJSON != null) {
                        data = context.responseJSON;
                    }
                    else{
                        data=result;
                    }

                } catch (e) { }
            }
        }
    });//ajax
    return data;

};

XrmHelper.prototype.ExecuteAPIAsync = function (method,url, content, callbackHandler) {



    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': content != null ? content.length : 0 },
        type: method,
        url: url.indexOf("http") == -1 ? this._webApiUrl + url : url,
        async: false,
        cache: false,
        data:content,
        complete: function (context, result) {
            if (context.status >= 200 && context.status < 300) {
                try {
                    var data = null;
                    if (context.responseJSON != null) {
                        data = context.responseJSON;
                    }
                    else {
                        data = result;
                    }

                    callbackHandler(data);
                } catch (e) { }
            }
        }
    });//ajax


};




/*
  Advanced Help Functions
*/


/*
compare two guid values, if they are same then return true, else return false.
*/
XrmHelper.prototype.CompareGUID = function (guid1, guid2) {

    var data1 = guid1.replace(/\{?(.{36})\}?/, '$1').toLowerCase();
    var data2 = guid2.replace(/\{?(.{36})\}?/, '$1').toLowerCase();
    return data1 == data2;
}



/*
Retrieve data from CRM on time
*/
XrmHelper.prototype.RetrieveEntity = function (entityName, entityId, attributes) {
    if (entityName != null && entityId != null && attributes.length > 0) {
        var serverPath = this._webApiUrl;
        var queryTemplate = "$ENTITY$/($ID$)?$select=$ATTRIBUTES$";
        var query="";
        var attString = "";
        var queryResult;

        for (var i = 0; i < attributes.length; i++) {
            if (i != attributes.length - 1) {
                attString += attributes[i] + ",";
            }
            else {
                attString += attributes[i];
            }
        }

        
        if (entityId.indexOf("http") == -1) {
            query = serverPath + queryTemplate.replace("$ENTITY$/", entityName).replace("$ID$", entityId).replace("$ATTRIBUTES$", attString);

        }
        else {
            query = entityId + queryTemplate.replace("$ENTITY$/($ID$)", "").replace("$ATTRIBUTES$", attString);
        }

        
        return this.Read(query);
    }
}


/*
Retrieve data from CRM asynchronously
*/
XrmHelper.prototype.RetrieveEntityAsync = function (entityName, entityId, attributes, callbackhandler) {
    if (entityName != null && entityId != null && attributes.length > 0) {
        var serverPath = this._webApiUrl;
        var queryTemplate = "$ENTITY$/($ID$)?$select=$ATTRIBUTES$";
        var attString = "";
        var queryResult;
        var query = "";

        for (var i = 0; i < attributes.length; i++) {
            if (i != attributes.length - 1) {
                attString += attributes[i] + ",";
            }
            else {
                attString += attributes[i];
            }
        }

   if (entityId.indexOf("http") == -1) {
            query = serverPath + queryTemplate.replace("$ENTITY$/", entityName).replace("$ID$", entityId).replace("$ATTRIBUTES$", attString);

        }
        else {
            query = entityId + queryTemplate.replace("$ENTITY$/($ID$)", "").replace("$ATTRIBUTES$", attString);
        }

        this.ReadAsync(query, callbackhandler);
    }
}




/*
opens window
*/
XrmHelper.prototype.OpenWindow = function (entity, title, params) {
    Xrm.Utility.openEntityForm(entity, title, params);
}

/*opens model window*/
XrmHelper.prototype.OpenModelWindow = function () {

}

/*
executes workflow from JS side
*/
XrmHelper.prototype.ExecuteWorkflow = function () {

}

/*
executes custom action
*/
XrmHelper.prototype.ExecuteCustomAction = function () {

}

/*
Returns current log in user
*/
XrmHelper.prototype.CurLogUser = function () {
    return Xrm.Page.context.getUserId();
}


/*
Check user whether has the input roles, if user has all of input roles, then return ture, else return false.
*/
XrmHelper.prototype.HasRoles = function (userid, rolenames) {
    var hasRole = false;

    

    return hasRole;


}

