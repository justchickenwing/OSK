/*
 FxKeyboard
 Version: 1.10.1
 Author:  Travis Fitzgerald
 Date:    23 March 2021
 Purpose: A virtual keyboard for Firefox
 */

const storageData = browser.storage.local.get();

storageData.then(storedSetup, onError);

function storedSetup(settings) {
	if (!settings.hasOwnProperty("scaleValue") || settings.scaleValue === null) {
		browser.storage.local.set({
			scaleValue: 50,
		});
		settings.scaleValue = 50;
	}
	if (!settings.hasOwnProperty("numpadState") || settings.numpadState === null) {
		browser.storage.local.set({
			numpadState: "auto",
		});
		settings.numpadState = "auto"
	}
	
	var zoomValue = window.devicePixelRatio;
	fxKeyboard.settings.scale = ((settings.scaleValue/zoomValue)/100);
	fxKeyboard.settings.numpadState = settings.numpadState;
	console.log(fxKeyboard.settings.scale);
}

function onError(error) {
	console.log("Failed to get stored data from internal storage");
}

var xpath = {
    getXPathOfElement: function (elt)
    {
        var path = "";
        for (; elt && elt.nodeType == 1; elt = elt.parentNode)
        {
            idx = xpath.getElementIdx(elt);
            xname = elt.tagName;
            if (idx > 1)
                xname += "[" + idx + "]";
            path = "/" + xname + path;
        }
        return path;
    },
    
    getElementIdx: function (elt)
    {
        var count = 1;
        for (var sib = elt.previousSibling; sib; sib = sib.previousSibling)
        {
            if (sib.nodeType == 1 && sib.tagName == elt.tagName)
                count++
        }

        return count;
    }
};

var FxKeyboardLocale = '{'+
    '"name": "English",'+
    '"locale": "en",'+
    '"defaultFlex": "10",'+
    '"main": [['+
            '["`", "~"],'+
            '["1", "!"],'+
            '["2", "@"],'+
            '["3", "#"],'+
            '["4", "$"],'+
            '["5", "%"],'+
            '["6", "^"],'+
            '["7", "&"],'+
            '["8", "*"],'+
            '["9", "9"],'+
            '["0", "0"],'+
            '["/", "?"],'+
            '["+", "+"],'+
            '["=", "="],'+
            '[{"label": "←", "special": 8, "flex": 10, "type": "repeat"}]'+ // backspace
        '], ['+
            '[{"label": "Tab", "string": "\\t", "flex": 1}],'+ // TAB
            '["q", "Q"],'+
            '["w", "W"],'+
            '["e", "E"],'+
            '["r", "R"],'+
            '["t", "T"],'+
            '["z", "Z"],'+
            '["u", "U"],'+
            '["i", "I"],'+
            '["o", "O"],'+
            '["p", "P"],'+
            '["(", "("],'+
            '[")", ")"],'+
            '["&#91;", "&#91;"],'+
            '["&#93;", "&#93;"],'+
            '["&#123;", "&#123;"],'+
            '["&#125;", "&#125;"]'+
        "], ["+
            '[{"label": "@", "string":"@", "flex": 5, "special": 50}],'+
            '["a", "A"],'+
            '["s", "S"],'+
            '["d", "D"],'+
            '["f", "F"],'+
            '["g", "G"],'+
            '["h", "H"],'+
            '["j", "J"],'+
            '["k", "K"],'+
            '["l", "L"],'+
            '[":", ":"],'+
            '[";", ";"],'+
            '["\'", "\\""],'+
            '[{"label": "Enter", "flex": 15, "string": "\\t"}]'+
        '], ['+
            '[{"label": "Shift", "flex": 6, "special": "shift"}],'+
            '["y", "Y"],'+
            '["x", "X"],'+
            '["c", "C"],'+
            '["v", "V"],'+
            '["b", "B"],'+
            '["n", "N"],'+
            '["m", "M"],'+
            '[",", ","],'+
            '[".", "."],'+
            '[">", ">"],'+
            '["<", "<"],'+
            '["-", "-"],'+
            '["_", "_"],'+
            '["\\\\","|","1"]'+
        '], ['+
            '[{"label": " ", "flex": 6, "special": 32}]'+ // space
        ']]'+
'}';

FxKeyNumpad = JSON.stringify({
    "name": "English",
    "locale": "en",
    "defaultFlex": "10",
    "main": [
        [
            ["7"], ["8"], ["9"], [{"label": "←", "flex": 15, "special": 8, "type": "repeat"}]
        ],
        [
            ["4"], ["5"], ["6"], [{"label": "Enter", "flex": 15, "string": "\t"}]
        ],
        [
            ["1"], ["2"], ["3"], [{"label": ".", "flex": 15, "string": "."}]
        ],
        [
            [{"label": "0", "flex": 15, "string": "0"}]
        ]
    ]
});

var FxKeyMap = '{' +
        '"`": 192,' +
        '"~": 192,' +
        '"1": 49,' +
        '"!": 49,' +
        '"2": 50,' +
        '"@": 50,' +
        '"3": 51,' +
        '"#": 51,' +
        '"4": 52,' +
        '"$": 52,' +
        '"5": 53,' +
        '"%": 53,' +
        '"6": 54,' +
        '"^": 54,' +
        '"7": 55,' +
        '"&": 55,' +
        '"8": 56,' +
        '"*": 56,' +
        '"9": 57,' +
        '"(": 57,' +
        '"0": 48,' +
        '")": 48,' +
        '"-": 173,' +
        '"_": 173,' +
        '"=": 61,' +
        '"+": 61,' +
        '"Delete": 8,' +
        '"q": 81,' +
        '"w": 87,' +
        '"e": 69,' +
        '"r": 82,' +
        '"t": 84,' +
        '"y": 89,' +
        '"u": 85,' +
        '"i": 73,' +
        '"o": 79,' +
        '"p": 80,' +
        '"[": 219,' +
        '"{": 219,' +
        '"}": 221,' +
        '"]": 221,' +
        '"\\\\": 220,' +
        '"|": 220,' +
        '"a": 65,' +
        '"s": 83,' +
        '"d": 68,' +
        '"f": 70,' +
        '"g": 71,' +
        '"h": 72,' +
        '"j": 74,' +
        '"k": 75,' +
        '"l": 76,' +
        '";": 59,' +
        '":": 59,' +
        '"\'": 222,' +
        '"\\"": 222,' +
        '"Enter": 13,' +
        '"z": 90,' +
        '"x": 88,' +
        '"c": 67,' +
        '"v": 86,' +
        '"b": 66,' +
        '"n": 78,' +
        '"m": 77,' +
        '",": 188,' +
        '"<": 188,' +
        '".": 190,' +
        '">": 190,' +
        '"/": 191,' +
        '"?": 191' +
        '}';
        

var fxKeyboard = {

    settings: {
        repeat_all: true,
        keep_closed: false,
        startingURL: document.location.href,
        locale_default: 'en',
        secScaleX: 0,
        secScaleY: 0,
        scale: 0,
		numpadState: "auto",
        preScale: 0,
        padding: 8,
        kb_max_width: window.innerWidth,
        kb_max_height: window.innerWidth*0.30,
        np_max_width: 450,
        np_max_height: 380,
		key_height: window.innerWidth*0.05
    },
    
    hierarchy: {
        isMaster: true,
        pathInMaster: null,
        slavedIFrame: null
    },

    _toggleOpen: function (open) {
        if (document.getElementById(this.activeOSK) === null) {
            this.insertKeyboard(this.activeOSK);
        }
        try {
            var kb = document.getElementById(this.activeOSK);
            kb.style.zIndex = "9999999";
        } catch (e) {
            console.log("OSK not found");
            return;
        }
        if (open) {
            if (!this.hierarchy.isMaster) {
                window.parent.postMessage(JSON.stringify({"directive": "master", "command": 
                            {"input": fxKeyboard.activeOSK, "state": open, "elementYTop": this.focusElementYTop, "elementYBottom": this.focusElementYBottom}
                    , "xpath": this.hierarchy.pathInMaster, "uri": this.settings.startingURL}), "*");
            } else {
                if (kb.style.display !== 'block') {
                    if (this.previousOSK !== null ? this.previousOSK !== this.activeOSK && document.getElementById(fxKeyboard.previousOSK).style.display !== "none" : false) {
                        document.getElementById(this.previousOSK).style.display = "none";
                    }
                    kb.style.display = "block";
                    this.previousOSK = this.activeOSK;
                }
				kb.style.width = this.getMaxWidth(this.activeOSK) * this.settings.scale + "px";
				kb.style.height = this.getMaxHeight(this.activeOSK) * this.settings.scale + "px";
				kb.style.padding = this.settings.padding * this.settings.scale + "px";
				kb.style.fontFamily = "Courier New, Courier, monospace";
				kb.style.color = "rgb(202,118,75)";
				kb.style.fontSize = 36 * this.settings.scale + "px";
				kb.style.borderRadius = 24 * this.settings.scale + "px";
				for (const element of kb.childNodes) {
					for (const chNodes of element.childNodes) {
						chNodes.style.width = this.settings.key_height * this.settings.scale + "px";
						chNodes.style.height = this.settings.key_height * this.settings.scale + "px";
						chNodes.style.margin = this.settings.padding * (this.settings.scale / 2) + "px";
						chNodes.style.borderRadius = 12*this.settings.scale+"px";
					}
				}
                // disable comment if numpad has to be in the right corner
                // if (document.activeElement.className in numpadClassNames) {
                //     console.log("is right")
                //     kb.style.right = 0
                //     kb.style.left = null
                // } else

                // if ((((kb.getBoundingClientRect().top !== 0 ? this.focusElementYBottom : this.focusElementYTop) + window.scrollY) >
                //         ((kb.getBoundingClientRect().top !== 0 ? kb.getBoundingClientRect().top : kb.getBoundingClientRect().bottom) + window.scrollY))) {
                //     kb.style.top = 0;
                // } else
                    if ((((kb.getBoundingClientRect().bottom !== window.innerHeight ? kb.getBoundingClientRect().bottom : kb.getBoundingClientRect().top) + window.scrollY) >
                        ((kb.getBoundingClientRect().bottom !== window.innerHeight ? this.focusElementYTop : this.focusElementYBottom) + window.scrollY))) {
                    kb.style.bottom = 0;
                    kb.style.top = null;
                }
            }
        } else {
            if (!this.hierarchy.isMaster) {
                window.parent.postMessage(JSON.stringify({"directive": "master", "command": {"input": this.activeOSK, "state": open}}), "*");
            } else {
                kb.style.display = "none";
                this.focusElement = null;
            }
        }
    },
	
	_isOSKOpen: function() {
		var kb = document.getElementById(this.activeOSK);
		return kb != null ? kb.style.display === 'block' : false;
	},

    /*
     states:
     0 - normal
     1 - shift on
     2 - shift lock
     */
    state: 0,
    lastPress: "null",
    keepOpen: false,
    focusElement: null,
    focusElementYBottom: 0,
    focusElementYTop: 0,
    inputTypes: {"numpad": "fxnumpad", "keyboard": "fxkeyboard"},
    previousOSK: null,
    activeOSK: null,
    
    _setSpecialFunctions: function(keyD,obj) {
        keyD.onmousedown = function(){
            keyD.style.backgroundColor = "rgb(202,118,75)";
            keyD.style.color = "rgb(250,250,250)";
        };
        console.log("set special functions")
        if (obj.label === "Shift") {
            keyD.onmouseup = function(){
                if (fxKeyboard.state === 0) {
                    console.log("0")
                    keyD.style.backgroundColor = "rgb(220,200,186)";
                    keyD.style.color = "rgb(202,118,75)";
                    fxKeyboard.state++;
                } else if (fxKeyboard.state === 1) {
                    console.log("1")
                    keyD.style.backgroundColor = "rgb(202,118,75)";
                    fxKeyboard.state++;
                } else if (fxKeyboard.state === 2) {
                    console.log("2")
                    keyD.style.backgroundColor = "rgb(200,200,200)";
                    keyD.style.color = "rgb(202,118,75)";
                    fxKeyboard.state = 0;
                } 
                fxKeyboard._setShift();
            };
        } else if (obj.label === "←") {
            keyD.onmouseup = function () {
                keyD.style.color = "rgb(202,118,75)";
                fxKeyboard._sendKey(obj.label);
                keyD.style.backgroundColor = "rgb(250,250,250)";
            };
        } else if (obj.label === ".") {
            keyD.onmouseup = function () {
                keyD.style.color = "rgb(202,118,75)";
                fxKeyboard._sendKey(obj.label);
                keyD.style.backgroundColor = "rgb(250,250,250)";
            };
        } else if (obj.label === "0") {
            keyD.onmouseup = function () {
                keyD.style.color = "rgb(202,118,75)";
                fxKeyboard._sendKey(obj.label);
                keyD.style.backgroundColor = "rgb(250,250,250)";
            };
        } else if (obj.label in {"@":"",".com":"",".au":""}) {
            keyD.onmouseup = function () {
                keyD.style.color = "rgb(202,118,75)";
                fxKeyboard._sendKey(obj.label);
                keyD.style.backgroundColor = "rgb(250,250,250)";
            };
        } else if (obj.label === " ") {
            keyD.onmouseup = function () {
                fxKeyboard._sendKey(" ");
                keyD.style.color = "rgb(202,118,75)";
                keyD.style.backgroundColor = "rgb(250,250,250)";
            };
        } else if (obj.label === "Schliessen") {
            keyD.onmouseup = function () {
                fxKeyboard._toggleOpen(false);
                keyD.style.backgroundColor = "rgb(250,250,250)";
                fxKeyboard.lastPress = "close";
            };
        } else if (obj.label === "Enter") {
            keyD.onmouseup = function () {
                keyD.style.color = "rgb(202,118,75)";
                keyD.style.backgroundColor = "rgb(250,250,250)";
				fxKeyboard._sendKey(obj.label);
            };
        } else if (obj.label === "Tab") {
			keyD.onmouseup = function () {
				keyD.style.backgroundColor = "rgb(250,250,250)";
                keyD.style.color = "rgb(202,118,75)";
				fxKeyboard._sendKey(obj.label);
			};
		}
			
        return keyD;
    },
    
    _setShift: function () {
        if (this.state > 0) {
            var secElements = document.getElementsByClassName("fxkey-secondary");
            var priElements = document.getElementsByClassName("fxkey-primary");
            for (var i = 0; secElements.length > i; i++) {
                secElements[i].style.display = "flex";
            }
            for (var i = 0; priElements.length > i; i++) {
                priElements[i].style.display = "none";
            }
        } else if (this.state === 0) {
            var secElements = document.getElementsByClassName("fxkey-secondary");
            var priElements = document.getElementsByClassName("fxkey-primary");
            var shiftK = document.getElementById("fxkey-shift");
            shiftK.style.backgroundColor = "rgb(250,250,250)";
            for (var i = 0; secElements.length > i; i++) {
                secElements[i].style.display = "none";
            }
            for (var i = 0; priElements.length > i; i++) {
                priElements[i].style.display = "flex";
            }
        }
    },
    
    _sendKey: function (character) {
        const area = fxKeyboard.focusElement;
        const cursorPosition = area.selectionStart;
        const textBeforeCursor = area.value.substring(0, area.selectionStart);
        const textAfterCursor = area.value.substring(area.selectionEnd);

        if (fxKeyboard.hierarchy.isMaster && fxKeyboard.hierarchy.slavedIFrame != null) {
            fxKeyboard.hierarchy.slavedIFrame.contentWindow.postMessage(JSON.stringify({"directive": "slave", "command": "sendKey", "key": character}), "*");
        } else {
            switch (character) {
                case "←":
                    const afterDelete = (area.selectionStart !== area.selectionEnd) ? (textBeforeCursor + textAfterCursor) : (textBeforeCursor.slice(0, -1) + textAfterCursor);
                    area.value = afterDelete;
                    if (area.selectionStart !== area.selectionEnd) {
                        area.setSelectionRange(cursorPosition, cursorPosition);
                    } else {
                        area.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                    }
                    break;
                case "Enter":
                    if (area.className in numpadClassNames || area.id !== "codearea") {
                        fxKeyboard._toggleOpen(false);
                        fxKeyboard.lastPress = "close";
                        area.blur();
                    } else {
                        const afterEnter = textBeforeCursor + "\n" + textAfterCursor;
                        area.value = afterEnter;
                        area.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
                        console.log(area);
                    }
                    break;
                case "Tab":
                    const afterTab = textBeforeCursor + "    " + textAfterCursor;
                    area.value = afterTab;
                    area.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
                    console.log(area);
                    break;
                default:
                    const afterInput = textBeforeCursor + character + textAfterCursor;
                    area.value = afterInput;
                    area.setSelectionRange(cursorPosition+1, cursorPosition+1);
                    if (fxKeyboard.state === 1) {
                        fxKeyboard.state = 0;
                        fxKeyboard._setShift();
                    }
            }

            fxKeyboard.focusElement.dispatchEvent(new Event("keydown", {"bubbles": true, "cancelable": true}));
            fxKeyboard.focusElement.dispatchEvent(new Event("keypress", {"bubbles": true, "cancelable": true}));
            fxKeyboard.focusElement.dispatchEvent(new Event("keyup", {"bubbles": true, "cancelable": true}));
            fxKeyboard.focusElement.dispatchEvent(new Event('input', {"bubbles": true, "cancelable": true}));
            fxKeyboard.focusElement.dispatchEvent(new Event('change', {"bubbles": true, "cancelable": true}));
        }
    },
    
    _buildKey: function (char,primary) {
        var key = document.createElement("div");
        key.style.width = this.settings.key_height*this.settings.scale + "px";
        key.style.height = this.settings.key_height*this.settings.scale + "px";
        key.style.margin = this.settings.padding*(this.settings.scale/2) + "px";
        if (primary) {
            key.id = "fxkey-primary";
            key.className = "fxkey-primary";
            key.style.display = "flex";
        } else {
            key.id = "fxkey-secondary";
            key.className = "fxkey-secondary";
            key.style.display = "none";
        }
        key.style.alignItems = "center";
        key.style.justifyContent = "center";
        key.style.borderRadius = 5*this.settings.scale+"px";
        key.style.cursor = "pointer";
        key.style.backgroundColor = "rgb(250,250,250)";
        key.style.color = "rgb(202,118,75)";
        key.innerHTML = char;
        key.onmousedown = function () {
            key.style.backgroundColor = "rgb(202,118,75)";
            key.style.color = "rgb(250,250,250)";
        };
        key.onmouseup = function () {
            key.style.backgroundColor = "rgb(250,250,250)";
            key.style.color = "rgb(202,118,75)";
            if (char.indexOf("&#") !== -1) {
                char = key.innerHTML;
            }
            fxKeyboard._sendKey(char);
            if (fxKeyboard.state === 1) {
                fxKeyboard.state = 0;
                fxKeyboard._setShift();
            }
        };
        return key;
    },
	
	_buildKeyFlex: function (char,primary,flex) {
        var key = document.createElement("div");
        key.style.width = this.settings.key_height*this.settings.scale + "px";
        key.style.height = this.settings.key_height*this.settings.scale + "px";
        key.style.margin = this.settings.padding*(this.settings.scale/2) + "px";
        if (primary) {
            key.id = "fxkey-primary";
            key.className = "fxkey-primary";
            key.style.display = "flex";
        } else {
            key.id = "fxkey-secondary";
            key.className = "fxkey-secondary";
            key.style.display = "none";
        }
        key.style.alignItems = "center";
        key.style.justifyContent = "center";
        key.style.borderRadius = 5*this.settings.scale+"px";
        key.style.cursor = "pointer";
		key.style.flexGrow = flex;
        key.style.backgroundColor = "rgb(250,250,250)";
        key.innerHTML = char;
		console.log("FlexGrow of standard key is: "+key.style.flexGrow);
        key.onmousedown = function () {
            key.style.backgroundColor = "rgb(202,118,75)";
            key.style.accentColor= "rgb(250,250,250)";
        };
        key.onmouseup = function () {
            key.style.backgroundColor = "rgb(250,250,250)";
            key.style.color = "rgb(202,118,75)";
            if (char.indexOf("&#") !== -1) {
                char = key.innerHTML;
            }
            fxKeyboard._sendKey(char);
            if (fxKeyboard.state === 1) {
                fxKeyboard.state = 0;
                fxKeyboard._setShift();
            }
        };
        return key;
    },
    
    _buildSpecialKey: function (obj) {
        var key = document.createElement("div");
        key.style.width = this.settings.key_height*this.settings.scale + "px";
        key.style.height = this.settings.key_height*this.settings.scale + "px";
        key.style.margin = this.settings.padding*(this.settings.scale/2) + "px";
        key.style.display = "flex";
        key.style.alignItems = "center";
        key.style.justifyContent = "center";
        key.style.cursor = "pointer";
        key.style.flexGrow = obj.flex;
        key.id = "fxkey-"+obj.label.toLowerCase();
        key.style.borderRadius = 5*this.settings.scale + "px";
        key.style.backgroundColor = "rgb(250,250,250)";
        key = this._setSpecialFunctions(key,obj);
        key.innerHTML = obj.label;
        return key;
    },

    insertKeyboard: function (inputType) {
        var keyb;
		var max_width = this.getMaxWidth(inputType);
		var max_height = this.getMaxHeight(inputType);
        switch (inputType) {
            case fxKeyboard.inputTypes.keyboard:
                var keys = JSON.parse(FxKeyboardLocale);
                if (document.getElementById(inputType)) {
                    return;
                }
                break;
            case fxKeyboard.inputTypes.numpad:
                var keys = JSON.parse(FxKeyNumpad);
                if (document.getElementById(inputType)) {
                    return;
                }
                break;
        }
        //create main Div
        keyb = document.createElement("div");
        // parse keyboard keys JSON
        
        keyb.setAttribute("tabIndex","-1");
        keyb.style.backgroundColor = "rgba(0,0,0,0.6)";
        keyb.style.width = max_width*this.settings.scale + "px";
        keyb.style.height = max_height*this.settings.scale + "px";
        keyb.style.padding = this.settings.padding*this.settings.scale + "px";
        keyb.style.fontFamily = "Courier New, Courier, monospace";
        keyb.style.color = "rgb(202,118,75)";
        keyb.style.fontSize = 35*this.settings.scale+"px";
        keyb.style.borderRadius = 5*this.settings.scale+"px";
        keyb.style.textAlign = "center";
        keyb.style.position = "fixed";
        keyb.style.left = "50%";
        keyb.style.bottom = 0;
        keyb.style.transform = "translateX(-50%)";
        keyb.id = inputType;
        keyb.style.zIndex = "9999999";
        keyb.style.display = "none"; //hidden on insert.
		console.log("border radius: "+ keyb.style.borderRadius+ " padding size: "+keyb.style.padding);
        if (!document.getElementById(inputType) || this.settings.preScale !== this.settings.scale) {
            if (this.settings.preScale !== this.settings.scale) {
                var rows = document.getElementsByClassName(inputType+"-r");
                if (rows.length > 0) {
                    for (var row in rows) {
                        document.body.removeChild(rows[row]);
                    }
                }
            }
            for (var row in keys.main) {
                var nrow = document.createElement("div");
                nrow.style.display = "flex";
                nrow.style.justifyContent = "center";
                nrow.id = inputType+'-r';
                nrow.class = inputType+'-r';
                for (var button in keys.main[row]) {
                    if (keys.main[row][button][0].constructor === {}.constructor) {
                        var nkey = this._buildSpecialKey(keys.main[row][button][0]);
                        nrow.appendChild(nkey);
                    } else {
						if (keys.main[row][button].length > 2) {
							var nkeyprimary = this._buildKeyFlex(keys.main[row][button][0], true, keys.main[row][button][2]);
						} else {
							var nkeyprimary = this._buildKey(keys.main[row][button][0], true);
						}
                        nrow.appendChild(nkeyprimary);
                        if (keys.main[row].length > 1) {
							if (keys.main[row][button].length > 2) {
								var nkeysecondary = this._buildKeyFlex(keys.main[row][button][1], false, keys.main[row][button][2]);
							} else {
								var nkeysecondary = this._buildKey(keys.main[row][button][1], false);
							}
                            nrow.appendChild(nkeysecondary);
                        }
                    }
                }
                keyb.appendChild(nrow);
            }
        }
        document.body.appendChild(keyb);
        this.settings.preScale = this.settings.scale;
        this._toggleOpen(false);
    },
	
	getMaxWidth: function (inputType) {
        switch (inputType) {
            case fxKeyboard.inputTypes.keyboard:
				return this.settings.kb_max_width;
            case fxKeyboard.inputTypes.numpad:
                return this.settings.np_max_width;;
        }
	},
	
	getMaxHeight: function (inputType) {
		switch (inputType) {
            case fxKeyboard.inputTypes.keyboard:
				return this.settings.kb_max_height;
            case fxKeyboard.inputTypes.numpad:
                return this.settings.np_max_height;
        }
	}
};

browser.runtime.onMessage.addListener(function begin(message) {
    msg = JSON.parse(message);
    if (msg.directive === "insertKeyboard") {
        if (fxKeyboard.hierarchy.isMaster) {
            window.parent.postMessage(JSON.stringify({"directive":"master","command":"ping","uri":fxKeyboard.settings.startingURL}),"*");
        }
        if (document.getElementById("fxkeyboard") === null && fxKeyboard.hierarchy.isMaster) {
            console.log("Inserting OSK");
            fxKeyboard.activeOSK = fxKeyboard.inputTypes.keyboard;
            fxKeyboard.insertKeyboard(fxKeyboard.inputTypes.keyboard);
        }
    }
});

window.addEventListener("message", function messageReceived(event) {
    msg = JSON.parse(event.data);
    if (msg.directive === "slave") {
        switch (msg.command) {
            case "initialize":
				var preOpen = fxKeyboard._isOSKOpen();
				if (fxKeyboard.hierarchy.isMaster) {
					fxKeyboard._toggleOpen(false);
				}
                fxKeyboard.hierarchy.isMaster = false;
                fxKeyboard.hierarchy.pathInMaster = msg.xpath;
				if (preOpen) {
					fxKeyboard._toggleOpen(preOpen);
				}
                break;
            case "sendKey":
                fxKeyboard._sendKey(msg.key);
                break;
            case "updateXPath":
                fxKeyboard.hierarchy.pathInMaster = msg.xpath;
                break;
        }
    }
    
    if (msg.directive === "master" && fxKeyboard.hierarchy.isMaster) {
        if (typeof msg.command === 'object') {
            fxKeyboard.activeOSK = msg.command.input;
            if (msg.command.state) {
                fxKeyboard.hierarchy.slavedIFrame = document.evaluate(msg.xpath, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                fxKeyboard.focusElementYTop = msg.command.elementYTop + fxKeyboard.hierarchy.slavedIFrame.getBoundingClientRect().top;
                fxKeyboard.focusElementYBottom = msg.command.elementYBottom + fxKeyboard.hierarchy.slavedIFrame.getBoundingClientRect().top;
                if (fxKeyboard.hierarchy.slavedIFrame == null) {
                    fxKeyboard.hierarchy.slavedIFrame = document.querySelector('iframe[src="' + msg.uri + '"]');
                    fxKeyboard.hierarchy.slavedIFrame.contentWindow.postMessage(JSON.stringify({"directive": "slave", "command": "updateXPath", "xpath": xpath.getXPathOfElement(fxKeyboard.hierarchy.slavedIFrame)}), "*");
                }
                fxKeyboard._toggleOpen(msg.command.state);
            } else {
                fxKeyboard._toggleOpen(msg.command.state);
                fxKeyboard.hierarchy.slavedIFrame = null;
            }
        } else if (msg.command == "ping") {
            var iframe = document.querySelector('iframe[src="' + msg.uri + '"]');
            iframe.contentWindow.postMessage(JSON.stringify({"directive": "slave", "command": "initialize", "xpath": xpath.getXPathOfElement(iframe)}), "*");
        }
    }
}, false);

document.addEventListener("mousedown", function load(clicked) {
    if (clicked.target.id.indexOf("fxkey") !== -1) {
        clicked.preventDefault();
    }
});

document.addEventListener("mouseup", function load(clicked) {
    if (clicked.target.id.indexOf("fxkey") !== -1) {
        clicked.preventDefault();
    }

    oskAction(clicked);
});

document.addEventListener("focusin", function load(clicked) {
    if (clicked.target.id.indexOf("fxkey") !== -1) {
        clicked.preventDefault();
    }

    oskAction(clicked);
});

var textInputTypes = {
        'input': '', 'select': '', 'option': '', 'textarea': '', 'textbox': '',
        'text': '', 'password': '', 'url': '', 'color': '', 'date': '', 'datetime': '',
        'datetime-local': '', 'email': '', 'month': '', 'search': ''
    };

var integerInputTypes = {
        'number': '', 'range': '', 'tel': '', 'time': '', 'week': ''
    };

var numpadClassNames = {
    'blocklyHtmlInput': ''
}

function oskAction(clicked) {
    if ((fxKeyboard.settings.numpadState === "always" ? document.activeElement.type in textInputTypes || document.activeElement.className in numpadClassNames : document.activeElement.className in numpadClassNames)
        && fxKeyboard.lastPress !== "close" && fxKeyboard.settings.numpadState !== "disabled") {
        fxKeyboard.focusElement = document.activeElement;
        fxKeyboard.focusElementYTop = document.activeElement.getBoundingClientRect().top;
        fxKeyboard.focusElementYBottom = document.activeElement.getBoundingClientRect().bottom;
        fxKeyboard.activeOSK = fxKeyboard.inputTypes.numpad;
        fxKeyboard._toggleOpen(true);
    } else if ((fxKeyboard.settings.numpadState === "disabled" ? document.activeElement.type in textInputTypes || document.activeElements.type in integerInputTypes : document.activeElement.type in textInputTypes)
			&& fxKeyboard.lastPress !== "close" && fxKeyboard.settings.numpadState !== "always") {
        fxKeyboard.focusElement = document.activeElement;
        fxKeyboard.focusElementYTop = document.activeElement.getBoundingClientRect().top;
        fxKeyboard.focusElementYBottom = document.activeElement.getBoundingClientRect().bottom;
        fxKeyboard.activeOSK = fxKeyboard.inputTypes.keyboard;
        fxKeyboard._toggleOpen(true);
    } else {
        if (clicked.target.id.indexOf("fxkey") === -1) {
            fxKeyboard._toggleOpen(false);
            fxKeyboard.lastPress = "null";
        }
    }
}

document.addEventListener("dragstart", function load(clicked) {
    if (clicked.target.id.indexOf("fxkey") !== -1) {
        clicked.preventDefault();
    }
});

document.addEventListener("dragend", function load(clicked) {
    if (clicked.target.id.indexOf("fxkey") !== -1) {
        clicked.preventDefault();
    }
});