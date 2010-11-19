function getMinistersOfState() {
  var data = [];
	
  var row = Ti.UI.createTableViewRow({hasChild:true,height:'auto'});
  var stateView = Ti.UI.createView({
		height:'auto',
		layout:'vertical',
		left:5,
		top:5,
		bottom:5,
		right:5,
	});

	var lStateName = Ti.UI.createLabel({
		text:'Name (constituency - party)',
		left:10,
		width:'auto',
		top:-48,
		bottom:2,
		height:22,
		textAlign:'left',
		color:'#444444',
		font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
	});
  stateView.add(lStateName);
	row.add(stateView);
	data[0] = row;

  var xhr = Ti.Network.createHTTPClient();
  xhr.timeout = 1000000;	
	var url = "http://api.myminister.info/states/" + Titanium.App.Properties.getString("selectedStateId") + "/mps.json";
  xhr.open("GET",url);
  xhr.onload = function()
  {
		var mps = JSON.parse(this.responseText);
		mps = JSON.parse(mps.model);
		for(var i=0; i < mps.length; i++) {
			var mpName = mps[i].name;
			var constituency = mps[i].constituency.name;
			var party = mps[i].party.name;
			var mpId = mps[i].id
			
			data.push({title:mpName+" (" + constituency + " - " + party + ")", hasChild:true, mpId:mpId, mpName:mpName});

		}
		var tableView = Titanium.UI.createTableView({data:data,minRowHeight:58});
		var w = Ti.UI.currentWindow;
		Ti.UI.currentWindow.add(tableView);
		
		tableView.addEventListener('click', function(e) {
			Titanium.App.Properties.setString("selectedMpId", e.rowData.mpId);
			win = Titanium.UI.createWindow({
				url:'mp.js',
				title:e.rowData.mpName,
				fullscreen: false
			});
			win.open({animated:true});
		});
	};
	xhr.send();	
}
getMinistersOfState();
