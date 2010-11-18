function getMinisterInfo() {
  var data = [];
	
  var controlsView = Ti.UI.createView({
		width:'auto',
		height:'auto'
	});
	 

	var mpName = Titanium.UI.createLabel({
		width:250,
		height:'auto',
		left:0,
		top:20,
		text:'Name'
	});

	var mpAddress = Titanium.UI.createLabel({
		width:250,
		height:'auto',
		left:0,
		top:100,
		text:'Address'
	});
	controlsView.add(mpName);
	controlsView.add(mpAddress);

  var xhr = Ti.Network.createHTTPClient();
  xhr.timeout = 1000000;	
	var url = "http://api.myminister.info/mps/" + Titanium.App.Properties.getString("selectedMpId") + ".json";
  xhr.open("GET",url);
  Ti.API.info("Sending the request" + url);
  xhr.onload = function()
  {
		var mp = JSON.parse(this.responseText);
		//var mp = JSON.parse(mp.myProfile);
		Ti.API.info("mp: " + mp.party);
		var mName = mp.mp_profile.name;
		var constituency = mp.party.constituency.name;
		var party = mp.party.name;
		var presentAddress = mp.mp_profile.present_address;
		var email = mp.mp_profile.email;

		Ti.API.info("name: " + mName + " constituency: " + constituency + " party: " + party + " email: " + email + " present address: " + presentAddress);

		mpName.text = mName
		mpAddress.text = presentAddress
	};
	xhr.send();	

	Titanium.UI.currentWindow.add(controlsView);
}
getMinisterInfo();
