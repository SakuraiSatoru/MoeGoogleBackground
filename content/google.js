var opts = null,
	bg = '',
	style = document.createElement('style'),
	head = null;




var newlogo = document.createElement('img');
newlogo.id = 'cgb_newlogo';
newlogo.style.display='none';
newlogo.style.height='95px';
newlogo.src = chrome.extension.getURL('images/Transparent_google_logo.png');



setTimeout(makeVisible,1000);
function makeVisible(){
	if(!document.body.classList.contains("janakan")){
		document.body.classList.add("janakan");
	}
}

var textHL = 'color:white !important;filter:shadow(color=#333333,direction=135,strength=2) !important;text-shadow:black 0 1px 3px !important';
function addStyle(rule) {
	style.appendChild(document.createTextNode(rule));
}
function refreshOptions() {
	if (opts) return;
	
	var options = {
		images:[chrome.extension.getURL('images/1.jpg'),chrome.extension.getURL('images/2.jpg')],
		extra:{background_size:'cover',background_position:'center'}
		};
		
	opts = options;
	if (opts.background_url) opts.selected_img = opts.background_url; // backwards compat to initial "single image" releases
	var r = Math.floor(Math.random()*opts.images.length);
	bg = opts.images[r];

	if (bg) {
		var bs = opts.extra.background_size; if (!bs) bs = 'cover';
		var bpos = opts.extra.background_position; if (!bpos) bpos = 'center';
		addStyle('body,#viewport{background-image:url("'+bg+'") !important;background-repeat:no-repeat !important;background-position:'+bpos+' !important;background-size:'+bs+' !important;}');
		addStyle('.fbar{background:transparent !important}');
		addStyle('#gbwa > :first-child{border-radius:2px;background-color:white;opacity:0.85;}'); // web apps button bg
		addStyle('.gb_Qa > :first-child{border-radius:2px;background-color:white;opacity:0.85;}'); // notifications button bg
		addStyle('.gb_Ra .gb_x{padding-left:3px;}'); // A tag of notifications to center image
		addStyle('.gb_Zb {padding-right:15px !important;}'); // fix right padding of text link block
	} else {
		textHL = '';
	}

			
		// fix html height
		addStyle('html{min-height:100%}');
		
		addStyle('#fbar .fbar {display:none}');
		addStyle('.fbar{line-height: 40px;padding: 0 0 0 15px !important;}');
		addStyle('.fbar.optslink{display:block!important;text-align:left;z-index:1000;box-sizing:border-box;}');
		
		// set text styles
		addStyle('#footer a,#epbar #epb-notice{'+textHL+'}');
		addStyle('#als,#als a{'+textHL+'}');
		addStyle('#prm,#prm a{'+textHL+'}');
		//addStyle('#gbi4t, #gb#gb .gb_j a, #gb#gb .gb_cb, .gb_fb, #gb#gb .gb_la a.gb_s{'+textHL+'}');  // header text
		addStyle('#mngb .gb_c{'+textHL+'}');  // header text
		addStyle('#gb#gb a.gb_x {'+textHL+'}');  // user email text (when no g+ account)
		addStyle('#mngb a[title][href] {'+textHL+'}');  // catchall

		addStyle('#prm{visibility:hidden}');
		addStyle('#logo-sub{visibility:hidden}');

		
		makeVisible() // janakan;
		refreshImage();
};







// style backups
var backups = [];
function SetStyles(ele,styles) {
	if (!ele) return;
	if (ele.length != undefined) {
		for (var i = 0; i < ele.length; ++i) {
			SetStyles(ele[i],styles);
		}
		return;
	}
	
	styleBackups = {};
	for (s in styles) {
		if (ele.style[s] === styles[s]) continue;
		styleBackups[s] = '';
		if (ele.style[s]) styleBackups[s] = ele.style[s];
		ele.style[s] = styles[s];
		ele.style.setProperty(s, styles[s], "important");
	}
	backups.push({'element':ele,'styles':styleBackups});
}
function RestoreStyles() {
	if (style.parentElement == head) head.removeChild(style);
	if (!backups.length) return;
	for (i in backups) {
		var ele = backups[i].element;
		var styleBackups = backups[i].styles;
		for (s in styleBackups) {
			ele.style.removeProperty(s);
			ele.style[s] = styleBackups[s];
			ele.style.setProperty(s, styleBackups[s], "important");
		}
	}
	backups = [];
}

var active = false;
function refreshImage() {
	if (!opts) return refreshOptions();
	head = document.getElementsByTagName('head')[0];
	body = document.getElementsByTagName('body')[0];
	if (!head || !body) return;
	//if (document.readyState !== "complete") return;
	if (document.getElementById('hplogo') && document.getElementById('hplogo').parentElement // has logo
		&& (!body.className.match('srp')) // not search results page
		&& document.getElementsByName('q')[0] // has search box
		&& (window.location.pathname == '/' || window.location.pathname == '/search' || window.location.pathname == '/webhp' || window.location.pathname == '/imghp' || window.location.pathname == '/_/chrome/newtab')
		&& (!(Boolean(window.location.search.match(/[?&]q=[^&]/gi)) || Boolean(window.location.hash.match(/[?&]q=[^&]/gi))))
	) {
		if (!active) { // apply custom styles if not already active
			

			// add generated stylesheet
			head.appendChild(style);
			
			// process logo
			if (opts.extra.hide_logo) {
				SetStyles(document.getElementById('lga'),{visibility:'hidden'});
			} else if (bg) {
				// rename #lga to stop new tab page from re-applying a new logo
				if (document.getElementById('lga')) document.getElementById('lga').id = 'lga_rename'; // NEW COMMENT
				
				var tohide = document.getElementById('hplogo'),
					nudgePadding = tohide.style.paddingTop,
					nudgeMargin = tohide.style.marginTop;
				if (tohide.parentElement.tagName == 'A') { // if logo is a link, we need to hide that instead
					tohide = tohide.parentElement;
				}
				
				// adjust the top margin by the logo height
				SetStyles(newlogo,{marginTop:(parseInt(document.getElementById('hplogo').style.height) - 126)+'px'});
				if (!document.getElementById('cgb_newlogo')) tohide.parentElement.insertBefore(newlogo,tohide);
				SetStyles(tohide,{display:'none'});
				SetStyles(newlogo,{display:'block','padding-top':nudgePadding,'margin-top':nudgeMargin}); // clone logo height
				
				SetStyles(tohide.parentElement.getElementsByTagName('BR'),{display:'none'}); // some logos are given BR's to pad the search box down
			}
			
			if ((!document.getElementById('hplogo') || document.getElementById('hplogo').title.substr(0,6) !== 'Google') &&
				(!document.getElementById('hplogo').alt || document.getElementById('hplogo').alt.substr(0,6) !== 'Google')) { // is this logo a google doodle?
				SetStyles(newlogo,{paddingTop:'112px'}); // doodles are slightly larger, so push the logo down
				//if (!document.getElementById('cgb_ddl')) body.appendChild(ddl);
				//if (!opts.extra.hide_doodle) SetStyles(ddl,{'display':'block'});
			}


		}
		active = true;
	} else { // restore styles
		active = false;
		RestoreStyles();
	}
};


try{
    var child=document.getElementById("most-visited");
	child.parentNode.removeChild(child);
	
}catch(e){
    console.log("not a ntp");
} 
var refreshInterval = setInterval(refreshImage,300);
