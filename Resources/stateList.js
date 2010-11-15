Titanium.include('globals.js');

function getStates() {
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
		text:'State (No. of Mps)',
		left:10,
		width:'auto',
		top:-48,
		bottom:2,
		height:22,
		textAlign:'left',
		color:'#444444',
		font:{fontFamily:'Trebuchet MS',fontSize:16,fontWeight:'bold'}
	});
  stateView.add(lStateName);
	row.add(stateView);
	data[0] = row;

  var xhr = Ti.Network.createHTTPClient();
  xhr.timeout = 1000000;	
  xhr.open("GET","http://api.myminister.info/states.json");
  Ti.API.info("Sending the request");
  xhr.onload = function()
  {
		//try
		//{
			var states = JSON.parse(this.responseText);
			Ti.API.info("type of model: " + typeof(states.model));
			states = JSON.parse(states.model);
      Ti.API.info("Looping thru the data " + states.length);
			for(var i=0; i < states.length; i++) {
				var stateName = states[i].name;
				var noOfMps = states[i].no_of_mps;
				var stateId = states[i].id;
				Ti.API.info("state: " + stateName + " no of mps: " + noOfMps + " id: " + stateId);
				
				data.push({title:stateName+" (" + noOfMps + ")", hasChild:true, stateid:stateId});

			}
			var tableView = Titanium.UI.createTableView({data:data,minRowHeight:58});
			
			Ti.UI.currentWindow.add(tableView);
			
			tableView.addEventListener('click', function(e) {
				Ti.API.info("e: " + e.rowData.stateid);
				selectedStateId = e.rowData.stateid;
				win = Titanium.UI.createWindow({
					url:'state.js',
					title:e.rowData.title
				});
				//Ti.API.info("currentWindow: " + w);
				//w.open(win,{animated:true});
				win.open({animated:true});
			});
		/*}
		catch(E){
			alert(E);
		}*/
	};
	xhr.send();	
}
getStates();
