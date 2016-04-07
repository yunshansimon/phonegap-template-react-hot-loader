'use strict';
function findTagsByName(root,name){
  var nodeList=[];
  for(let attr in root){
    if(attr==='nodeName' && root[attr]===name){
      nodeList.push(root)
    }else if (attr==='childNodes' && root[attr].length>0) {
      for(let node of root[attr]){
        nodeList=nodeList.concat(findTagsByName(node,name));
      }
    }
  }
  return nodeList;
}

function matchNode(nodeList,attr,regex){
  for(let node of nodeList){
    if(regex.test(node[attr])){
      return node
    }
  }
  return false
}

module.exports = function(context) {
    var fs=require('fs')
    var parse5 = require('parse5');
    var namespace='http://www.w3.org/1999/xhtml'
    var url = `${context.opts.projectRoot}/www/index.html`
    var dataString=fs.readFileSync(url,{encoding:'utf8'})
    var regex=/cordova\.js/i
    var document=parse5.parse(dataString);
    var body=findTagsByName(document,'body')[0];
    var scriptList=findTagsByName(document,'script');
    var adapter=parse5.treeAdapters.default
    var cordovaNode=adapter.createElement('script', namespace, [{name:'src',value:'cordova.js'}])
    if(matchNode(scriptList,'src',regex)===false){
      if(scriptList.length>0){
        adapter.insertBefore(body, cordovaNode, scriptList[0])
      }else{
        adapter.appendChild(body, cordovaNode)
      }
      let result=parse5.serialize(document)
      fs.writeFileSync(url,result)
    }
}
