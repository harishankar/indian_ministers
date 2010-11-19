function getMinisterInfo() {
  var data = [];
	
	var controlsView = Ti.UI.createView({
		width:'auto',
		height:'auto'
	});

  var xhr = Ti.Network.createHTTPClient();
  xhr.timeout = 1000000;	
	var url = "http://api.myminister.info/mps/" + Titanium.App.Properties.getString("selectedMpId") + ".json";
  xhr.open("GET",url);
  Ti.API.info("Sending the request" + url);
  xhr.onload = function()
  {
		var mp = JSON.parse(this.responseText);
		var mp = JSON.parse(mp.mpProfile);
		var mName = mp.name;
		var constituency = mp.constituency.name;
		var stateName = mp.state_name;
		var party = mp.party.name;
		var presentAddress = mp.mp_profile.present_address;
		var email = mp.mp_profile.email;
		var photo = mp.mp_profile.photo;

		Ti.API.info("name: " + mName + " constituency: " + constituency + " party: " + party + " email: " + email + " present address: " + presentAddress);

		var mpPhoto = Titanium.UI.createImageView({url:photo, left:0, top:20});
		controlsView.add(mpPhoto);		 

		var mpName = Titanium.UI.createLabel({
			width:200,
			height:'auto',
			left:100,
			top:20,
			text:mName + " (" + party + ")"
		});
		controlsView.add(mpName);
		
		var mpConstituency = Titanium.UI.createLabel({
			width:200,
			height:'auto',
			left:100,
			top:55,
			text:constituency + ", " + stateName
		});
		controlsView.add(mpConstituency);

		var mpEmail = Titanium.UI.createLabel({
			width:220,
			height:'auto',
			left:100,
			top:90,
			text:email
		});
		controlsView.add(mpEmail);
		
		var mpAddress = Titanium.UI.createLabel({
			width:220,
			height:'auto',
			left:100,
			top:125,
			text:presentAddress
		});
		controlsView.add(mpAddress);

	};
	xhr.send();	

	Titanium.UI.currentWindow.add(controlsView);
}
getMinisterInfo();
