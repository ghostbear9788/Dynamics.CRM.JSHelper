/*
  作者：GhostBear   
  博客: http://blog.csdn.net/ghostbear 
  简介：REST中的CRUD操作辅助脚本。
*/

function RESTHelper() { }
function SOAPHelper() { }
function WebAPIHelper() { }



/*
   方法简介：通过REST对Dynamics CRM 中的实体进行Create操作。
   输入参数：
        createurl:调用Dynamics CRM数据服务的URL字符串。例如："/GH2011/XRMServices/2011/OrganizationData.svc/ContactSet"
        jsondata：需要进行Create操作的对象，必须进行json序列化。
   输出参数：
        true：Create成功。
        false：Create失败。

*/
RESTHelper.prototype.Create = function (createurl, jsondata) {
    var isCreated = false;
    $.ajax({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': jsondata.length
        },
        type: 'POST',
        url: createurl,
        async: false,
        cache: false,
        data: jsondata,
        complete: function (context, result) {
            if (result.toLowerCase() == 'success') {
                isCreated = true;
            }
        }
    });//ajax
    return isCreated;

}

/*
   方法简介：通过REST对Dynamics CRM 中的实体进行Create操作。
   输入参数：
        createurl:调用Dynamics CRM数据服务的URL字符串。例如："/GH2011/XRMServices/2011/OrganizationData.svc/ContactSet"
        jsondata：需要进行Create操作的对象，必须进行json序列化。可以用JQuery自带的序列话工具进行序列化：$.ajax.parseJSON(data)
        callbackhandler: 该回调函数应该遵循如下格式：
              function callbackhandler(results,entity)
              {
                  if(results==false)
                  {
                      //调用失败
                  }
                  else
                  {
                      //调用成功
                  }
              }
   输出参数：
        无

*/
RESTHelper.prototype.CreateAsync = function (createurl, jsondata, callbackhandler) {
    $.ajax({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': jsondata.length
        },
        type: 'POST',
        url: createurl,
        async: true,
        cache: false,
        data: jsondata,
        complete: function (context, result) {
            var isCreated = false;
            var entity = null;
            if (result.toLowerCase() == 'success') {
                isCreated = true;
                try { entity = $.parseJSON(context.responseText).d; } catch (e) { }
            }
            callbackhandler(isCreate, entity);
        }
    });//ajax
}





/*

   方法简介：通过REST对Dynamics CRM 中的实体进行Read操作。
   输入参数：
        queryurl:调用Dynamics CRM数据服务的URL字符串。例如："/GH2011/XRMServices/2011/OrganizationData.svc/ContactSet(guid'{B75B220A-D2A4-48F4-8002-D8B564A866EA}')"
   输出参数：
        Object:获得了返回值
        Null:查询失败。
*/
RESTHelper.prototype.Read = function (queryurl) {
    var data = null;
    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': 0 },
        type: 'GET',
        url: queryurl,
        async: false,
        cache: false,
        complete: function (context, result) {
            if (result.toLowerCase() == 'success') {
                try { data = $.parseJSON(context.responseText).d; } catch (e) { }
            }
        }
    });//ajax
    return data;

}

/*

   方法简介：通过REST对Dynamics CRM 中的实体进行异步的Read操作。
   输入参数：
        queryurl:调用Dynamics CRM数据服务的URL字符串。例如："/GH2011/XRMServices/2011/OrganizationData.svc/ContactSet(guid'{B75B220A-D2A4-48F4-8002-D8B564A866EA}')"
        callbackhandler: 该回调函数应该遵循如下格式：
              function callbackhandler(results)
              {
                  if(results==null)
                  {
                      //调用失败
                  }
                  else
                  {
                      //调用成功
                  }
              }
   输出参数：
        无
*/
RESTHelper.prototype.ReadAsync = function (queryurl, callbackhandler) {
    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': 0 },
        type: 'GET',
        url: queryurl,
        async: true,
        cache: false,
        complete: function (context, result) {
            var data = null;
            if (result.toLowerCase() == 'success') {
                try {
                    data = $.parseJSON(context.responseText).d;
                } catch (e) { }
            }
            callbackhandler(data);
        }
    });//ajax
}



/*
简介:通过REST方式更新实体。
输入参数描述:
    updateurl:"/GH2011/XRMServices/2011/OrganizationData.svc/OpportunitySet(guid'{DA83B96B-DBAF-4F0C-A75D-7203F2502087}')"
    entity:    需要更新的对象，对象必须为JASON格式。
输出参数:
    更新成功返回:true
    更新失败返回:false
*/
RESTHelper.prototype.Update = function (updateurl, jsondata) {
    var isUpdated = false;
    $.ajax({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': jsondata.length,
            'X-HTTP-Method': 'MERGE'
        },
        type: 'POST',
        url: updateurl,
        async: false,
        cache: false,
        data: jsondata,
        complete: function (context, result) {
            if (result.toLowerCase() == 'success') {
                isUpdated = true;
            }
        }
    });//ajax
    return isUpdated;

}

/*
简介:通过REST方式更新实体。
输入参数描述:
    updateurl:"/GH2011/XRMServices/2011/OrganizationData.svc/OpportunitySet(guid'{DA83B96B-DBAF-4F0C-A75D-7203F2502087}')"
    jsondata：需要进行Create操作的对象，必须进行json序列化。可以用JQuery自带的序列话工具进行序列化：$.ajax.parseJSON(data)
    callbackhandler: 该回调函数应该遵循如下格式：
              function callbackhandler(results)
              {
                  if(results==false)
                  {
                      //调用失败
                  }
                  else
                  {
                      //调用成功
                  }
              }
输出参数：
        无
*/
RESTHelper.prototype.UpdateAsync = function (updateurl, jsondata, callbackhandler) {
    $.ajax({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': jsondata.length,
            'X-HTTP-Method': 'MERGE'
        },
        type: 'POST',
        url: updateurl,
        async: true,
        cache: false,
        data: jsondata,
        complete: function (context, result) {
            var isUpdated = false;
            if (result.toLowerCase() == 'success') {
                isUpdated = true;
            }
            callbackhandler(isUpdated);
        }
    });//ajax
}





/*
简介:通过REST方式删除实体。
参数描述:
    deleteurl:"/GH2011/XRMServices/2011/OrganizationData.svc/ContactSet(guid'{DA83B96B-DBAF-4F0C-A75D-7203F2502087}')"
返回类型:
    删除成功返回:true
    删除失败返回:false
*/
RESTHelper.prototype.Delete = function (deleteurl) {
    var isDeleted = false;
    $.ajax({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'X-HTTP-Method': 'DELETE'
        },
        type: 'POST',
        url: deleteurl,
        async: false,
        cache: false,
        data: null,
        complete: function (context, result) {
            if (result.toLowerCase() == 'success') {
                isDeleted = true;
            }
        }
    });//ajax
    return isDeleted;
}

/*
简介:通过REST方式删除实体。
参数描述:
    deleteurl:"/GH2011/XRMServices/2011/OrganizationData.svc/ContactSet(guid'{DA83B96B-DBAF-4F0C-A75D-7203F2502087}')"
    callbackhandler: 该回调函数应该遵循如下格式：
              function callbackhandler(results)
              {
                  if(results==false)
                  {
                      //调用失败
                  }
                  else
                  {
                      //调用成功
                  }
              }
输出参数：
        无
*/
RESTHelper.prototype.DeleteAsync = function (deleteurl, callbackhandler) {
    $.ajax({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/soap+xml; charset=utf-8',
            'X-HTTP-Method': 'DELETE'
        },
        type: 'POST',
        url: deleteurl,
        async: false,
        cache: false,
        data: null,
        complete: function (context, result) {
            var isDeleted = false;
            if (result.toLowerCase() == 'success') {
                isDeleted = true;
            }
            callbackhandler(isDeleted);
        }
    });//ajax
}




/*
   方法简介：执行Organization Service 的消息。
   输入参数：
        orgUrl:调用Dynamics CRM数据服务的URL字符串。例如："/GH2011/XRMServices/2011/Organization.svc"
        msg：soap message
   输出参数：
        true：Execute成功。
        false：Execute失败。

*/
SOAPHelper.prototype.Execute = function (orgUrl, msg) {
    var isCreated = false;
    $.ajax({
        headers: {
            Accept: 'application/xml, text/xml, */*',
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute'
        },
        type: 'POST',
        url: orgUrl,
        async: false,
        cache: false,
        data: msg,
        complete: function (context, result) {
            if (result.toLowerCase() == 'success') {
                isCreated = true;
            }
        }
    });//ajax
    return isCreated;
}

/*
   方法简介：异步执行Organization Service 的消息。
   输入参数：
        orgUrl:调用Dynamics CRM数据服务的URL字符串。例如："/GH2011/XRMServices/2011/Organization.svc"
        msg：soap message
        callbackhandler: 该回调函数应该遵循如下格式：
              function callbackhandler(results,context)
              {
                  if(results==false)
                  {
                      //调用失败
                  }
                  else
                  {
                      //调用成功
                  }
              }
   输出参数：
        无

*/
SOAPHelper.prototype.ExecuteAsync = function (orgUrl, msg, callbackhandler) {
    $.ajax({
        headers: {
            Accept: 'application/xml, text/xml, */*',
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute'
        },
        type: 'POST',
        url: orgUrl,
        async: true,
        cache: false,
        data: msg,
        complete: function (context, result) {
            var isSuccess = false;
            var entity = null;
            if (result.toLowerCase() == 'success') {
                isSuccess = true;

            }
            callbackhandler(isSuccess, context.responseText);
        }
    });//ajax
}

/*
This method uses to execute SOAP message in sync model
*/
SOAPHelper.prototype.ExecuteSOAP = function (orgUrl, msg, action) {
    var content;
    $.ajax({
        headers: {
            Accept: 'application/xml, text/xml, */*',
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/' + action
        },
        type: 'POST',
        url: orgUrl,
        async: false,
        cache: false,
        data: msg,
        complete: function (context, result) {
            content = context;
        }
    });//ajax
    return content;
}
/*
This method uses to execute SOAP message in async model
*/
SOAPHelper.prototype.ExecuteSOAPAsync = function (orgUrl, msg, action, callbackhandler) {
    $.ajax({
        headers: {
            Accept: 'application/xml, text/xml, */*',
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': 'http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/' + action
        },
        type: 'POST',
        url: orgUrl,
        async: true,
        cache: false,
        data: msg,
        complete: function (context, result) {
            callbackhandler(result);
        }
    });//ajax
    return isCreated;
}

WebAPIHelper.prototype.ExecuteWebAPI = function (httpMethod, url, content, callbackHandler) {

    var data = null;
    
    $.ajax({
        headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Content-Length':content!=null?content.length:0 },
        type: httpMethod,
        url: url,
        async: false,
        cache: false,
        complete: function (context, result) {
            if (result!=null) {
                try {
                    //data = $.parseJSON(context.responseText).d;
                    callbackHandler(result);
                } catch (e) { }
            }
        }
    });//ajax
    return data;

};



function XrmHelper(isCRMOnlineorIFD) {
    if (isCRMOnlineorIFD != null && isCRMOnlineorIFD != undefined) {
        this.isCRMOnlineorIFD = isCRMOnlineorIFD;
    }
}

XrmHelper.getInstance = function (isCRMOnlineorIFD) {
    if (window._cache == null || window._cache == undefined) {
        window._cache = {};
    }

    if (window._cache["RESTHelper"] == null || window._cache["RESTHelper"] == undefined) {
        window._cache["RESTHelper"] = new RESTHelper();
    }
    if (window._cache["SOAPHelper"] == null || window._cache["SOAPHelper"] == undefined) {
        window._cache["SOAPHelper"] = new SOAPHelper();
    }
    if (window._cache["XRMHelper"] == null || window._cache["XRMHelper"] == undefined) {
        window._cache["XRMHelper"] = new XrmHelper(isCRMOnlineorIFD);
    }
    if (window._cache["XRMHelper"] != null && window._cache["XRMHelper"] != undefined && isCRMOnlineorIFD != null && isCRMOnlineorIFD != undefined && window._cache["XRMHelper"].isCRMOnlineorIFD != isCRMOnlineorIFD) {
        window._cache["XRMHelper"].isCRMOnlineorIFD = isCRMOnlineorIFD;
    }

    return window._cache["XRMHelper"];
}


//Copy methods from RESTHelper&SOAPHelper to XrmHelper
XrmHelper.prototype.Create = this.RESTHelper.prototype.Create;//RESTHelper.prototype.Create;
XrmHelper.prototype.CreateAsync = RESTHelper.prototype.CreateAsync;
XrmHelper.prototype.Read = RESTHelper.prototype.Read;
XrmHelper.prototype.ReadAsync = RESTHelper.prototype.ReadAsync;
XrmHelper.prototype.Update = RESTHelper.prototype.Update;
XrmHelper.prototype.UpdateAsync = RESTHelper.prototype.UpdateAsync;
XrmHelper.prototype.Delete = RESTHelper.prototype.Delete;
XrmHelper.prototype.DeleteAsync = RESTHelper.prototype.DeleteAsync;
XrmHelper.prototype.ExecuteSOAP = SOAPHelper.prototype.ExecuteSOAP;
XrmHelper.prototype.ExecuteSOAPAsync = SOAPHelper.prototype.ExecuteSOAPAsync;
XrmHelper.prototype.ExecuteWebAPI = WebAPIHelper.prototype.ExecuteWebAPI;


//return Crm Odata path
XrmHelper.prototype.getODataEndpointPath = function (isOnlineOrIFD) {
    var ODataPathTemplate = "$SERVER$/XRMServices/2011/OrganizationData.svc/";
    var ODataEndpointAddress = "";

    if (isOnlineOrIFD) {
        ODataEndpointAddress = ODataPathTemplate.replace("$SERVER$", "");
    }
    else {
        ODataEndpointAddress = ODataPathTemplate.replace("$SERVER$", "/" + Xrm.Page.context.getOrgUniqueName());
    }
    return ODataEndpointAddress;

}

//returns Crm SOAP endpoint path
XrmHelper.prototype.getSOAPEndpointPath = function (isOnlineOrIFD) {
    var SOAPPathTemplate = "$SERVER$/XRMServices/2011/Organization.svc/web";
    var SOAPEndpointAddress = "";

    if (isOnlineOrIFD) {
        SOAPEndpointAddress = SOAPPathTemplate.replace("$SERVER$", "");
    }
    else {
        SOAPEndpointAddress = SOAPPathTemplate.replace("$SERVER$", "/" + Xrm.Page.context.getOrgUniqueName());
    }
    return SOAPEndpointAddress;
}

/*
Check user whether has the input roles, if user has all of input roles, then return ture, else return false.
*/
XrmHelper.prototype.HasRoles = function (userid, rolenames) {
    var hasRole = false;

    if (userid != null && rolenames != null) {
        var soapPath = this.getSOAPEndpointPath(true);
        var soapExp = [
                          "<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>"
                          , "<s:Body>",
                          , "<RetrieveMultiple xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>"
                          , "<query i:type='a:QueryExpression' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>"
                          , "<a:ColumnSet>"
                          , "<a:AllColumns>false</a:AllColumns>"
                          , "<a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays' />"
                          , "</a:ColumnSet>"
                          , "<a:Criteria>"
                          , "<a:Conditions>"
                          , "<a:ConditionExpression>"
                          , "<a:AttributeName>systemuserid</a:AttributeName>"
                          , "<a:Operator>Equal</a:Operator>"
                          , "<a:Values xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>"
                          , "<b:anyType i:type='c:guid' xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'>" + userid + "</b:anyType>"
                          , "</a:Values>"
                          , "<a:EntityName i:nil='true' />"
                          , "</a:ConditionExpression>"
                          , "</a:Conditions>"
                          , "<a:FilterOperator>And</a:FilterOperator>"
                          , "<a:Filters />"
                          , "</a:Criteria>"
                          , "<a:Distinct>false</a:Distinct>"
                          , "<a:EntityName>systemuser</a:EntityName>"
                          , "<a:LinkEntities>"
                          , "<a:LinkEntity>"
                          , "<a:Columns>"
                          , "<a:AllColumns>false</a:AllColumns>"
                          , " <a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>"
                          , "<b:string>systemuserid</b:string>"
                          , " </a:Columns>"
                          , "</a:Columns>"
                          , "<a:EntityAlias>multi</a:EntityAlias>"
                          , "<a:JoinOperator>Inner</a:JoinOperator>"
                          , "<a:LinkCriteria>"
                          , "<a:Conditions />"
                          , "<a:FilterOperator>And</a:FilterOperator>"
                          , " <a:Filters />"
                          , " </a:LinkCriteria>"
                          , "<a:LinkEntities>"
                          , "<a:LinkEntity>"
                          , " <a:Columns>"
                          , "<a:AllColumns>false</a:AllColumns>"
                          , "<a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>"
                          , "  <b:string>name</b:string>"
                          , "</a:Columns>"
                          , " </a:Columns>"
                          , " <a:EntityAlias>role</a:EntityAlias>"
                          , "<a:JoinOperator>Inner</a:JoinOperator>"
                          , "<a:LinkCriteria>"
                          , "<a:Conditions />"
                          , "<a:FilterOperator>And</a:FilterOperator>"
                          , "<a:Filters />"
                          , "</a:LinkCriteria>"
                          , "<a:LinkEntities />"
                          , "<a:LinkFromAttributeName>roleid</a:LinkFromAttributeName>"
                          , " <a:LinkFromEntityName>systemuser</a:LinkFromEntityName>"
                          , " <a:LinkToAttributeName>roleid</a:LinkToAttributeName>"
                          , "<a:LinkToEntityName>role</a:LinkToEntityName>"
                          , " </a:LinkEntity>"
                          , " </a:LinkEntities>"
                          , "<a:LinkFromAttributeName>systemuserid</a:LinkFromAttributeName>"
                          , "<a:LinkFromEntityName>systemuser</a:LinkFromEntityName>"
                          , " <a:LinkToAttributeName>systemuserid</a:LinkToAttributeName>"
                          , " <a:LinkToEntityName>systemuserroles</a:LinkToEntityName>"
                          , " </a:LinkEntity>"
                          , " </a:LinkEntities>"
                          , " <a:Orders />"
                          , " <a:PageInfo>"
                          , "  <a:Count>0</a:Count>"
                          , "  <a:PageNumber>0</a:PageNumber>"
                          , "  <a:PagingCookie i:nil='true' />"
                          , "   <a:ReturnTotalRecordCount>false</a:ReturnTotalRecordCount>"
                          , "  </a:PageInfo>"
                          , "   <a:NoLock>false</a:NoLock>"
                          , "   </query>"
                          , "  </RetrieveMultiple>"
                          , " </s:Body>"
                          , "</s:Envelope>"].join("");
        var soapResponse = this.ExecuteSOAP(soapPath, soapExp, "RetrieveMultiple");
        if (soapResponse != null && soapResponse != undefined) {
            if (soapResponse.responseXML != null) {
                var entities = soapResponse.responseXML.getElementsByTagName("Entity");
                if (entities != null && entities.length > 0) {
                    for (var i = 0; i < entities.length && !hasRole; i++) {
                        var curRole = entities[i].getElementsByTagName("KeyValuePairOfstringanyType")[2].getElementsByTagName("Value")[0].textContent;

                        if (rolenames.toLowerCase() == curRole.toLowerCase()) {
                            hasRole = true;
                            break;
                        }
                    }
                }
            }
        }



    }

    return hasRole;


}

/*
Returns current log in user
*/
XrmHelper.prototype.CurLogUser = function () {
    return Xrm.Page.context.getUserId();
}

/*
compare two guid values, if they are same then return true, else return false.
*/
XrmHelper.prototype.CompareGUID = function (guid1, guid2) {

    var data1 = guid1.replace(/\{?(.{36})\}?/, '$1').toLowerCase();
    var data2 = guid2.replace(/\{?(.{36})\}?/, '$1').toLowerCase();
    return data1 == data2;
}


/*
retreives single record according to input entity name and id.
*/
XrmHelper.prototype.RetrieveEntity = function (entityName, entityId, attributes) {
    if (entityName != null && entityId != null && attributes.length > 0) {
        var serverPath = this.getODataEndpointPath(true);
        var query = "$ENTITY$Set(guid'$ID$')?$select=$ATTRIBUTES$";
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

        query = query.replace("$ENTITY$", entityName).replace("$ID$", entityId).replace("$ATTRIBUTES$", attString);
        return this.Read(serverPath + query);
    }
}

XrmHelper.prototype.RetrieveEntityAsync = function (entityName, entityId, attributes, callbackhandler) {
    if (entityName != null && entityId != null && attributes.length > 0) {
        var serverPath = this.getODataEndpointPath(true);
        var query = "$ENTITY$Set(guid'$ID$')?$select=$ATTRIBUTES$";
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

        query = query.replace("$ENTITY$", entityName).replace("$ID$", entityId).replace("$ATTRIBUTES$", attString);
        this.ReadAsync(serverPath + query, callbackhandler);
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

