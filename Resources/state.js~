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
	var url = "http://api.myminister.info/states/" + selectedStateId + "mps.json";
  xhr.open("GET",url);
  Ti.API.info("Sending the request");
  xhr.onload = function()
  {
		//try
		//{
			var mps = JSON.parse(this.responseText);
			Ti.API.info("type of model: " + typeof(mps.model));
			mps = JSON.parse(mps.model);
      Ti.API.info("Looping thru the data " + mps.length);
			for(var i=0; i < mps.length; i++) {
				var mpName = mps[i].name;
				var constituency = mps[i].constituency.name;
				var party = mps[i].party.name;
				Ti.API.info("name: " + mpName + " constituency: " + constituency + " party: " + party);
				
				data.push({title:mpName+" (" + constituency + " - " + party + ")", hasChild:true, stateid:stateId});

			}
			var tableView = Titanium.UI.createTableView({data:data,minRowHeight:58});
			var w = Ti.UI.currentWindow;
			Ti.UI.currentWindow.add(tableView);
			
			/*tableView.addEventListener('click', function(e) {
				Ti.API.info("e: " + e.rowData.stateid);
				win = Titanium.UI.createWindow({
					url:'state.js',
					title:e.rowData.title
				});
			});*/
		/*}
		catch(E){
			alert(E);
		}*/
	};
	xhr.send();	
}
getMinistersOfState();
