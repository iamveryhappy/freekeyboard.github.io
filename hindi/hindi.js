(function() {
    var a = {};
    a.util = {
        mobile: /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent),
        opera: ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0),
        mozilla: (typeof InstallTrigger !== "undefined"),
        windowWidth: function() {
            var i = window.document.documentElement.clientWidth,
                e = window.document.body;
            return window.document.compatMode === "CSS1Compat" && i || e && e.clientWidth || i
        },
        code: function(i) {
            if (!i) {
                var i = window.event
            }
            if (i.code != undefined && i.key != undefined) {
                return i.code
            }
            return "Unidentified"
        },
        keyCode: function(s) {
            if (!s) {
                var s = window.event
            }
            if (this.mozilla) {
                var i = s.keyCode;
                switch (i) {
                    case 59:
                        i = 186;
                        break;
                    case 107:
                        i = 187;
                        break;
                    case 109:
                        i = 189;
                        break;
                    case 61:
                        i = 187;
                        break;
                    case 173:
                        i = 189;
                        break
                }
                return i
            }
            if (this.opera) {
                var i = s.keyCode;
                switch (i) {
                    case 59:
                        i = 186;
                        break;
                    case 61:
                        i = 187;
                        break;
                    case 109:
                        i = 189;
                        break
                }
                return i
            }
            return s.keyCode
        },
        isCtrl: function(i) {
            if (!i) {
                var i = window.event
            }
            return i.ctrlKey
        },
        isAlt: function(i) {
            if (!i) {
                var i = window.event
            }
            return i.altKey
        },
        isShift: function(i) {
            if (!i) {
                var i = window.event
            }
            return i.shiftKey
        },
        preventDefault: function(i) {
            if (!i) {
                var i = window.event
            }
            i.preventDefault ? i.preventDefault() : (i.returnValue = false)
        },
        srcId: function(i, s, u) {
            if (!i) {
                var i = window.event
            }
            var t;
            if (i.target) {
                t = i.target
            } else {
                if (i.srcElement) {
                    t = i.srcElement
                }
            }
            if (t.nodeType == 3) {
                t = target.parentNode
            }
            while (t.tagName.toLowerCase() != u) {
                t = t.parentNode;
                if (t == s || t.tagName.toLowerCase() == "body") {
                    return null
                }
            }
            return t.id
        },
        insertAtCaret: function(i, v) {
            if (i.readOnly) {
                i.value += v
            } else {
                var u = this.getSelectionStart(i);
                var s = this.getSelectionEnd(i);
                var t = i.value.length;
                i.value = i.value.substring(0, u) + v + i.value.substring(s, t);
                this.setCaretPosition(i, u + v.length, 0)
            }
        },
        deleteAtCaret: function(t, s, i) {
            if (t.readOnly) {
                var y = t.value;
                t.value = y.substring(0, y.length - s);
                return y.substr(y.length - s)
            }
            var w = this.getSelectionStart(t);
            var u = this.getSelectionEnd(t);
            var v = t.value.length;
            if (s > w) {
                s = w
            }
            if (u + i > v) {
                i = v - u
            }
            var x = t.value.substring(w - s, u + i);
            t.value = t.value.substring(0, w - s) + t.value.substring(u + i);
            this.setCaretPosition(t, w - s, 0);
            return x
        },
        getSelectionStart: function(i) {
            i.focus();
            if (i.selectionStart !== undefined) {
                return i.selectionStart
            } else {
                if (document.selection) {
                    var s = document.selection.createRange();
                    if (s == null) {
                        return 0
                    }
                    var u = i.createTextRange();
                    var t = u.duplicate();
                    u.moveToBookmark(s.getBookmark());
                    t.setEndPoint("EndToStart", u);
                    return t.text.length
                }
            }
            return 0
        },
        getSelectionEnd: function(i) {
            i.focus();
            if (i.selectionEnd !== undefined) {
                return i.selectionEnd
            } else {
                if (document.selection) {
                    var s = document.selection.createRange();
                    if (s == null) {
                        return 0
                    }
                    var u = i.createTextRange();
                    var t = u.duplicate();
                    u.moveToBookmark(s.getBookmark());
                    t.setEndPoint("EndToStart", u);
                    return t.text.length + s.text.length
                }
            }
            return i.value.length
        },
        setCaretPosition: function(s, u, i) {
            var t = s.value.length;
            if (u > t) {
                u = t
            }
            if (u + i > t) {
                i = t - i
            }
            s.focus();
            if (s.setSelectionRange) {
                s.setSelectionRange(u, u + i)
            } else {
                if (s.createTextRange) {
                    var v = s.createTextRange();
                    v.collapse(true);
                    v.moveEnd("character", u + i);
                    v.moveStart("character", u);
                    v.select()
                }
            }
            s.focus()
        },
        selectAll: function(i) {
            this.setCaretPosition(i, 0, i.value.length)
        }
    };
    a.layout = function() {
        this.keys = [];
        this.deadkeys = [];
        this.dir = "ltr";
        this.name = "US";
        this.lang = "en"
    };
    a.layout.prototype.loadDefault = function() {
        this.keys = [{
            i: "k0",
            c: "0",
            n: "`",
            s: "~"
        }, {
            i: "k1",
            c: "0",
            n: "1",
            s: "!"
        }, {
            i: "k2",
            c: "0",
            n: "2",
            s: "@"
        }, {
            i: "k3",
            c: "0",
            n: "3",
            s: "#"
        }, {
            i: "k4",
            c: "0",
            n: "4",
            s: "$"
        }, {
            i: "k5",
            c: "0",
            n: "5",
            s: "%"
        }, {
            i: "k6",
            c: "0",
            n: "6",
            s: "^"
        }, {
            i: "k7",
            c: "0",
            n: "7",
            s: "&"
        }, {
            i: "k8",
            c: "0",
            n: "8",
            s: "*"
        }, {
            i: "k9",
            c: "0",
            n: "9",
            s: "("
        }, {
            i: "k10",
            c: "0",
            n: "0",
            s: ")"
        }, {
            i: "k11",
            c: "0",
            n: "-",
            s: "_"
        }, {
            i: "k12",
            c: "0",
            n: "=",
            s: "+"
        }, {
            i: "k13",
            c: "1",
            n: "q",
            s: "Q"
        }, {
            i: "k14",
            c: "1",
            n: "w",
            s: "W"
        }, {
            i: "k15",
            c: "1",
            n: "e",
            s: "E"
        }, {
            i: "k16",
            c: "1",
            n: "r",
            s: "R"
        }, {
            i: "k17",
            c: "1",
            n: "t",
            s: "T"
        }, {
            i: "k18",
            c: "1",
            n: "y",
            s: "Y"
        }, {
            i: "k19",
            c: "1",
            n: "u",
            s: "U"
        }, {
            i: "k20",
            c: "1",
            n: "i",
            s: "I"
        }, {
            i: "k21",
            c: "1",
            n: "o",
            s: "O"
        }, {
            i: "k22",
            c: "1",
            n: "p",
            s: "P"
        }, {
            i: "k23",
            c: "0",
            n: "[",
            s: "{"
        }, {
            i: "k24",
            c: "0",
            n: "]",
            s: "}"
        }, {
            i: "k25",
            c: "0",
            n: "\\",
            s: "|"
        }, {
            i: "k26",
            c: "1",
            n: "a",
            s: "A"
        }, {
            i: "k27",
            c: "1",
            n: "s",
            s: "S"
        }, {
            i: "k28",
            c: "1",
            n: "d",
            s: "D"
        }, {
            i: "k29",
            c: "1",
            n: "f",
            s: "F"
        }, {
            i: "k30",
            c: "1",
            n: "g",
            s: "G"
        }, {
            i: "k31",
            c: "1",
            n: "h",
            s: "H"
        }, {
            i: "k32",
            c: "1",
            n: "j",
            s: "J"
        }, {
            i: "k33",
            c: "1",
            n: "k",
            s: "K"
        }, {
            i: "k34",
            c: "1",
            n: "l",
            s: "L"
        }, {
            i: "k35",
            c: "0",
            n: ";",
            s: ":"
        }, {
            i: "k36",
            c: "0",
            n: "'",
            s: '"'
        }, {
            i: "k37",
            c: "1",
            n: "z",
            s: "Z"
        }, {
            i: "k38",
            c: "1",
            n: "x",
            s: "X"
        }, {
            i: "k39",
            c: "1",
            n: "c",
            s: "C"
        }, {
            i: "k40",
            c: "1",
            n: "v",
            s: "V"
        }, {
            i: "k41",
            c: "1",
            n: "b",
            s: "B"
        }, {
            i: "k42",
            c: "1",
            n: "n",
            s: "N"
        }, {
            i: "k43",
            c: "1",
            n: "m",
            s: "M"
        }, {
            i: "k44",
            c: "0",
            n: ",",
            s: "<"
        }, {
            i: "k45",
            c: "0",
            n: ".",
            s: ">"
        }, {
            i: "k46",
            c: "0",
            n: "/",
            s: "?"
        }, {
            i: "k47",
            c: "0",
            n: "\\",
            s: "|"
        }];
        this.dir = "ltr";
        this.name = "US";
        this.lang = "en"
    };
    a.layout.prototype.load = function(e) {
        this.keys = e.keys;
        this.deadkeys = e.deadkeys;
        this.dir = e.dir;
        this.name = e.name;
        this.lang = e.lang ? e.lang : "en"
    };
    a.layout.parser = {
        keys: {
            "192": "Backquote",
            "49": "Digit1",
            "50": "Digit2",
            "51": "Digit3",
            "52": "Digit4",
            "53": "Digit5",
            "54": "Digit6",
            "55": "Digit7",
            "56": "Digit8",
            "57": "Digit9",
            "48": "Digit0",
            "189": "Minus",
            "187": "Equal",
            "81": "KeyQ",
            "87": "KeyW",
            "69": "KeyE",
            "82": "KeyR",
            "84": "KeyT",
            "89": "KeyY",
            "85": "KeyU",
            "73": "KeyI",
            "79": "KeyO",
            "80": "KeyP",
            "219": "BracketLeft",
            "221": "BracketRight",
            "220": "Backslash",
            "65": "KeyA",
            "83": "KeyS",
            "68": "KeyD",
            "70": "KeyF",
            "71": "KeyG",
            "72": "KeyH",
            "74": "KeyJ",
            "75": "KeyK",
            "76": "KeyL",
            "186": "Semicolon",
            "222": "Quote",
            "90": "KeyZ",
            "88": "KeyX",
            "67": "KeyC",
            "86": "KeyV",
            "66": "KeyB",
            "78": "KeyN",
            "77": "KeyM",
            "188": "Comma",
            "190": "Period",
            "191": "Slash",
            "17": "ControlLeft",
            "18": "AltLeft",
            "16": "ShiftLeft",
            "32": "Space",
            "27": "Escape",
            "20": "CapsLock",
            "13": "Enter"
        },
        codes: {
            Backquote: 0,
            Digit1: 1,
            Digit2: 2,
            Digit3: 3,
            Digit4: 4,
            Digit5: 5,
            Digit6: 6,
            Digit7: 7,
            Digit8: 8,
            Digit9: 9,
            Digit0: 10,
            Minus: 11,
            Equal: 12,
            KeyQ: 13,
            KeyW: 14,
            KeyE: 15,
            KeyR: 16,
            KeyT: 17,
            KeyY: 18,
            KeyU: 19,
            KeyI: 20,
            KeyO: 21,
            KeyP: 22,
            BracketLeft: 23,
            BracketRight: 24,
            Backslash: 25,
            KeyA: 26,
            KeyS: 27,
            KeyD: 28,
            KeyF: 29,
            KeyG: 30,
            KeyH: 31,
            KeyJ: 32,
            KeyK: 33,
            KeyL: 34,
            Semicolon: 35,
            Quote: 36,
            KeyZ: 37,
            KeyX: 38,
            KeyC: 39,
            KeyV: 40,
            KeyB: 41,
            KeyN: 42,
            KeyM: 43,
            Comma: 44,
            Period: 45,
            Slash: 46,
            Backslash: 47
        },
        getKeyLegend: function(t, s) {
            var u = t.length;
            for (var e = 0; e < u; e++) {
                if (t[e].i == s) {
                    return (t[e].n ? t[e].n : "")
                }
            }
            return 0
        },
        getKey: function(t, s) {
            var u = t.length;
            for (var e = 0; e < u; e++) {
                if (t[e].i == s) {
                    return t[e]
                }
            }
            return null
        },
        isDeadkey: function(e, u) {
            if (!e) {
                return false
            }
            var t = e.length;
            for (var s = 0; s < t; s++) {
                if (e[s].k == u) {
                    return true
                }
            }
            return false
        },
        getMappedValue: function(e, v, u) {
            if (!e) {
                return ""
            }
            var t = e.length;
            for (var s = 0; s < t; s++) {
                if (e[s].k == u && e[s].b == v) {
                    return e[s].c
                }
            }
            return ""
        },
        getState: function(t, e, u, i, s) {
            var v = "n";
            if (!e && !u && t) {
                v = "n"
            } else {
                if (!e && u && !t) {
                    v = "s"
                } else {
                    if (!e && u && t) {
                        v = "s"
                    } else {
                        if (e && !u && !t) {
                            v = "n"
                        } else {
                            if (e && !u && t) {
                                v = "t"
                            } else {
                                if (e && u && !t) {
                                    v = "s"
                                } else {
                                    if (e && u && t) {
                                        v = "f"
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if ((v == "n" || v == "s") && i) {
                if (s == "1") {
                    if (v == "n") {
                        v = "s"
                    } else {
                        v = "n"
                    }
                }
                if (s == "SGCap") {
                    if (v == "n") {
                        v = "y"
                    } else {
                        if (v == "s") {
                            v = "z"
                        }
                    }
                }
            }
            return v
        }
    };
    a.keyboard = function(e, v) {
        this.defaultLayout = new a.layout();
        this.defaultLayout.loadDefault();
        this.virtualLayout = new a.layout();
        this.virtualLayout.loadDefault();
        this.currentLayout = this.virtualLayout;
        this.shift = false;
        this.shiftOn = false;
        this.caps = false;
        this.capsOn = false;
        this.alt = false;
        this.ctrl = false;
        this.altCtrlOn = false;
        this.fontSize = 18;
        this.counter = 0;
        this.interval = 0;
        this.prev = "";
        this.cancelkeypress = false;
        this.customOnBackspace = function(i) {};
        this.customOnEnter = function() {};
        this.customOnSpace = function() {
            return false
        };
        this.customOnKey = function(i) {
            return false
        };
        this.customOnEsc = function() {};
        this.customDrawKeyboard = function(i) {
            return i
        };
        this.textbox = document.getElementById(v);
        this.textbox.style.fontSize = "18px";
        if (a.util.mobile) {
            this.textbox.readOnly = true
        }
        var u = ['<div id="branah-keyboard">'];
        if (a.util.windowWidth() < 640) {
            for (var t = 13; t < 23; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            for (var t = 26; t < 35; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            for (var t = 37; t < 44; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            u.push('<button id="branah-left-shift"><span>Shift</span></button>');
            u.push('<button id="branah-caps-lock"><span>Caps</span></button>');
            u.push('<button id="branah-escape" title="Turn on/off keyboard input conversion"><span>Esc</span></button>');
            u.push('<button id="branah-space"><span>Space</span></button>');
            u.push('<button id="branah-enter" class="branah-enter"><span>Enter</span></button>');
            u.push('<button id="branah-left-ctrl"><span>Ctrl+Alt</span></button>');
            u.push('<button id="branah-left-alt" style="display:none"><span>Alt</span></button>');
            u.push('<button id="branah-backspace"><span>Back</span></button>');
            for (var t = 0; t < 13; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            for (var t = 23; t < 26; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            for (var t = 35; t < 37; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            for (var t = 44; t < 48; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            u.push('<div class="branah-clear"></div>')
        } else {
            for (var t = 0; t < 13; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            u.push('<button id="branah-backspace"><span>Backspace</span></button>');
            u.push('<div class="branah-clear"></div>');
            u.push('<button id="branah-tab"><span>Tab</span></button>');
            for (var t = 13; t < 25; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            u.push('<button id="branah-k25"></button>');
            u.push('<div class="branah-clear"></div>');
            u.push('<button id="branah-caps-lock"><span>Caps Lock</span></button>');
            for (var t = 26; t < 37; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            u.push('<button id="branah-enter" class="branah-enter"><span>Enter</span></button>');
            u.push('<div class="branah-clear"></div>');
            u.push('<button id="branah-left-shift"><span>Shift</span></button>');
            u.push('<button id="branah-k47" class="branah-key"></button>');
            for (var t = 37; t < 47; t++) {
                u.push('<button id="branah-k', t, '" class="branah-key"></button>')
            }
            u.push('<button id="branah-right-shift"><span>Shift</span></button>');
            u.push('<div class="branah-clear"></div>');
            u.push('<button id="branah-left-ctrl"><span>Ctrl</span></button>');
            u.push('<button id="branah"><span>branah</span></button>');
            u.push('<button id="branah-left-alt"><span>Alt</span></button>');
            u.push('<button id="branah-space"><span>Space</span></button>');
            u.push('<button id="branah-right-alt"><span>Alt</span></button>');
            u.push('<button id="branah-escape" title="Turn on/off keyboard input conversion"><span>Esc</span></button>');
            u.push('<button id="branah-right-ctrl"><span>Ctrl</span></button>');
            u.push('<div class="branah-clear"></div>')
        }
        u.push("</div>");
        document.getElementById(e).innerHTML = u.join("");
        this.wireEvents();
        this.drawKeyboard()
    };
    a.keyboard.prototype.loadDefaultLayout = function(e) {
        this.defaultLayout.load(e);
        this.drawKeyboard()
    };
    a.keyboard.prototype.loadVirtualLayout = function(e) {
        this.virtualLayout.load(e);
        this.drawKeyboard();
        this.textbox.style.direction = this.attr("dir")
    };
    a.keyboard.prototype.switchLayout = function() {
        this.currentLayout = (this.currentLayout === this.defaultLayout) ? this.virtualLayout : this.defaultLayout;
        this.reset();
        this.drawKeyboard();
        this.textbox.style.direction = this.attr("dir")
    };
    a.keyboard.prototype.getFontSize = function() {
        return this.fontSize
    };
    a.keyboard.prototype.setFontSize = function(e) {
        this.fontSize = e;
        this.textbox.style.fontSize = this.fontSize + "px"
    };
    a.keyboard.prototype.onEsc = function() {
        this.switchLayout();
        this.customOnEsc()
    };
    a.keyboard.prototype.onShift = function() {
        this.shift = !this.shift;
        this.drawKeyboard()
    };
    a.keyboard.prototype.onAlt = function() {
        this.alt = !this.alt;
        this.drawKeyboard()
    };
    a.keyboard.prototype.onCtrl = function() {
        this.ctrl = !this.ctrl;
        this.drawKeyboard()
    };
    a.keyboard.prototype.onCapsLock = function() {
        this.caps = !this.caps;
        this.drawKeyboard()
    };
    a.keyboard.prototype.onBackspace = function() {
        if (this.prev != "") {
            this.prev = "";
            this.shift = false;
            this.drawKeyboard()
        } else {
            var e = a.util.deleteAtCaret(this.textbox, 1, 0);
            this.customOnBackspace(e)
        }
    };
    a.keyboard.prototype.onEnter = function() {
        a.util.insertAtCaret(this.textbox, "\u000A");
        this.customOnEnter()
    };
    a.keyboard.prototype.onSpace = function() {
        if (!this.customOnSpace()) {
            a.util.insertAtCaret(this.textbox, "\u0020")
        }
    };
    a.keyboard.prototype.attr = function(e) {
        if (e == "dir") {
            return this.currentLayout.dir
        } else {
            if (e == "lang") {
                return this.currentLayout.lang
            } else {
                if (e == "name") {
                    return this.currentLayout.name
                }
            }
        }
        return ""
    };
    a.keyboard.prototype.reset = function() {
        this.shift = false;
        this.caps = false;
        this.alt = false;
        this.ctrl = false;
        this.counter = 0;
        this.interval = 0;
        this.prev = ""
    };
    a.keyboard.prototype.stopRepeat = function() {
        if (this.interval != 0) {
            clearInterval(this.interval);
            this.counter = 0;
            this.interval = 0
        }
    };
    a.keyboard.prototype.onKey = function(i) {
        var e = a.layout.parser.getKey(this.currentLayout.keys, i);
        if (e) {
            var t = a.layout.parser.getState(this.ctrl, this.alt, this.shift, this.caps, e.c ? e.c : "0");
            var u = e[t] ? e[t] : "";
            if (this.prev != "") {
                var s = a.layout.parser.getMappedValue(this.currentLayout.deadkeys, u, this.prev);
                if (s != "") {
                    a.util.insertAtCaret(this.textbox, s)
                }
                this.prev = ""
            } else {
                if (a.layout.parser.isDeadkey(this.currentLayout.deadkeys, u)) {
                    this.prev = u
                } else {
                    if (u != "") {
                        if (!this.customOnKey(u)) {
                            a.util.insertAtCaret(this.textbox, u)
                        }
                    }
                }
            }
        }
    };
    a.keyboard.prototype.drawKeyboard = function() {
        if (!this.currentLayout.keys) {
            return
        }
        var B, D, G, H;
        var E = this.currentLayout.keys.length;
        for (var C = 0; C < E; C++) {
            D = this.currentLayout.keys[C];
            if (!document.getElementById("branah-" + D.i)) {
                continue
            }
            var A = this.ctrl;
            var e = this.alt;
            var F = this.shift;
            var z = this.caps;
            if (this.shiftOn) {
                F = true
            }
            if (this.capsOn) {
                z = true
            }
            if (this.altCtrlOn) {
                A = true;
                e = true
            }
            G = a.layout.parser.getState(A, e, F, z, D.c ? D.c : "0");
            H = D[G] ? D[G] : "";
            if (this.prev != "") {
                H = a.layout.parser.getMappedValue(this.currentLayout.deadkeys, H, this.prev)
            }
            B = [];
            B.push('<div class="branah-label-reference">', a.layout.parser.getKeyLegend(this.defaultLayout.keys, D.i), "</div>");
            if (!F) {
                H = this.customDrawKeyboard(H);
                if (H == "") {
                    H = "&nbsp;"
                }
                B.push('<div class="branah-label-natural" style="font-size:', this.fontSize, 'px;">&nbsp;', H, "</div>")
            } else {
                if (H == "") {
                    H = "&nbsp;"
                }
                B.push('<div class="branah-label-shift" style="font-size:', this.fontSize, 'px;">&nbsp;', H, "</div>")
            }
            document.getElementById("branah-" + D.i).innerHTML = B.join("")
        }
        var u = document.getElementById("branah-left-ctrl");
        var x = document.getElementById("branah-right-ctrl");
        if (u && x) {
            if (A) {
                u.className = "branah-recessed" + (this.ctrl ? "" : "-hover");
                x.className = "branah-recessed" + (this.ctrl ? "" : "-hover")
            } else {
                u.className = "";
                x.className = ""
            }
        }
        var t = document.getElementById("branah-left-alt");
        var w = document.getElementById("branah-right-alt");
        if (t && w) {
            if (e) {
                t.className = "branah-recessed" + (this.alt ? "" : "-hover");
                w.className = "branah-recessed" + (this.alt ? "" : "-hover")
            } else {
                t.className = "";
                w.className = ""
            }
        }
        var v = document.getElementById("branah-left-shift");
        var y = document.getElementById("branah-right-shift");
        if (v && y) {
            if (F) {
                v.className = "branah-recessed" + (this.shift ? "" : "-hover");
                y.className = "branah-recessed" + (this.shift ? "" : "-hover")
            } else {
                v.className = "";
                y.className = ""
            }
        }
        var s = document.getElementById("branah-caps-lock");
        if (s) {
            if (z) {
                s.className = "branah-recessed" + (this.caps ? "" : "-hover")
            } else {
                s.className = ""
            }
        }
    };
    a.keyboard.prototype.wireEvents = function() {
        var e = this;
        document.getElementById("branah-keyboard").onmousedown = function(i) {
            var s = a.util.srcId(i, this, "button");
            if (!s) {
                return
            }
            e.interval = setInterval(function() {
                e.counter++;
                if (e.counter > 5) {
                    switch (s) {
                        case "branah-backspace":
                            e.onBackspace();
                            break;
                        case "branah-enter":
                            e.onEnter();
                            break;
                        default:
                            if (s.search("branah-k([0-9])|([1-3][0-9])|(4[0-7])") != -1) {
                                e.onKey(s.substr(7));
                                e.shift = false;
                                e.alt = false;
                                e.ctrl = false;
                                e.drawKeyboard()
                            }
                            break
                    }
                }
            }, 50)
        };
        document.getElementById("branah-keyboard").onmouseup = function(i) {
            e.stopRepeat()
        };
        document.getElementById("branah-keyboard").onmouseout = function(i) {
            e.stopRepeat()
        };
        document.getElementById("branah-keyboard").onclick = function(i) {
            var s = a.util.srcId(i, this, "button");
            if (!s) {
                return
            }
            switch (s) {
                case "branah-left-shift":
                case "branah-right-shift":
                    e.onShift();
                    break;
                case "branah-left-alt":
                case "branah-right-alt":
                    e.onCtrl();
                    e.onAlt();
                    break;
                case "branah-left-ctrl":
                case "branah-right-ctrl":
                    e.onAlt();
                    e.onCtrl();
                    break;
                case "branah-escape":
                    e.onEsc();
                    break;
                case "branah-caps-lock":
                    e.onCapsLock();
                    break;
                case "branah-backspace":
                    e.onBackspace();
                    break;
                case "branah-enter":
                    e.onEnter();
                    break;
                case "branah-space":
                    e.onSpace();
                    break;
                default:
                    if (s.search("branah-k([0-9])|([1-3][0-9])|(4[0-7])") != -1) {
                        e.onKey(s.substr(7));
                        e.shift = false;
                        e.alt = false;
                        e.ctrl = false;
                        e.drawKeyboard()
                    }
                    break
            }
        };
        if (!("ontouchstart" in document.documentElement) || !a.util.mobile) {
            document.getElementById("branah-left-shift").onmouseover = function(i) {
                e.shiftOn = true;
                e.drawKeyboard()
            };
            document.getElementById("branah-right-shift").onmouseover = function(i) {
                e.shiftOn = true;
                e.drawKeyboard()
            };
            document.getElementById("branah-left-shift").onmouseout = function(i) {
                e.shiftOn = false;
                e.drawKeyboard()
            };
            document.getElementById("branah-right-shift").onmouseout = function(i) {
                e.shiftOn = false;
                e.drawKeyboard()
            };
            document.getElementById("branah-left-ctrl").onmouseover = function(i) {
                e.altCtrlOn = true;
                e.drawKeyboard()
            };
            document.getElementById("branah-right-ctrl").onmouseover = function(i) {
                e.altCtrlOn = true;
                e.drawKeyboard()
            };
            document.getElementById("branah-left-ctrl").onmouseout = function(i) {
                e.altCtrlOn = false;
                e.drawKeyboard()
            };
            document.getElementById("branah-right-ctrl").onmouseout = function(i) {
                e.altCtrlOn = false;
                e.drawKeyboard()
            };
            document.getElementById("branah-left-alt").onmouseover = function(i) {
                e.altCtrlOn = true;
                e.drawKeyboard()
            };
            document.getElementById("branah-right-alt").onmouseover = function(i) {
                e.altCtrlOn = true;
                e.drawKeyboard()
            };
            document.getElementById("branah-left-alt").onmouseout = function(i) {
                e.altCtrlOn = false;
                e.drawKeyboard()
            };
            document.getElementById("branah-right-alt").onmouseout = function(i) {
                e.altCtrlOn = false;
                e.drawKeyboard()
            };
            document.getElementById("branah-caps-lock").onmouseover = function(i) {
                e.capsOn = true;
                e.drawKeyboard()
            };
            document.getElementById("branah-caps-lock").onmouseout = function(i) {
                e.capsOn = false;
                e.drawKeyboard()
            }
        }
        e.textbox.onkeydown = function(s) {
            var i = a.util.code(s);
            if (i == "Unidentified") {
                var u = a.util.keyCode(s);
                i = a.layout.parser.keys[u + ""]
            }
            if ((i == "KeyA" || i == "KeyY" || i == "KeyZ" || i == "KeyC" || i == "KeyV" || i == "KeyX") && (e.ctrl && !e.alt && !e.shift)) {
                return
            }
            if (e.currentLayout == e.defaultLayout && i != "Escape") {
                return
            }
            switch (i) {
                case "ControlLeft":
                case "ControlRight":
                    e.ctrl = false;
                    e.onCtrl();
                    break;
                case "AltLeft":
                case "AltRight":
                    e.alt = false;
                    e.onAlt();
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    e.shift = false;
                    e.onShift();
                    break;
                case "Escape":
                    e.onEsc();
                    break;
                case "CapsLock":
                    if (s.getModifierState && s.getModifierState("CapsLock")) {
                        e.caps = false
                    }
                    e.onCapsLock();
                    break;
                case "Backspace":
                    e.onBackspace();
                    a.util.preventDefault(s);
                    break;
                case "Space":
                    e.onSpace();
                    a.util.preventDefault(s);
                    break;
                case "Enter":
                    e.onEnter();
                    a.util.preventDefault(s);
                    break;
                default:
                    var t = a.layout.parser.codes[i];
                    if (t != undefined) {
                        e.onKey("k" + t);
                        e.drawKeyboard();
                        a.util.preventDefault(s);
                        e.cancelkeypress = true
                    }
                    break
            }
        };
        if (a.util.opera) {
            e.textbox.onkeypress = function(i) {
                if (e.cancelkeypress) {
                    a.util.preventDefault(i);
                    e.cancelkeypress = false
                }
            }
        }
        e.textbox.onkeyup = function(s) {
            var i = a.util.code(s);
            if (i == "Unidentified") {
                var t = a.util.keyCode(s);
                i = a.layout.parser.keys[t + ""]
            }
            switch (i) {
                case "ControlLeft":
                case "ControlRight":
                    e.ctrl = true;
                    e.onCtrl();
                    break;
                case "AltLeft":
                case "AltRight":
                    e.alt = true;
                    e.onAlt();
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    e.shift = true;
                    e.onShift();
                    break;
                default:
            }
        }
    };
    var n = false;
    try {
        var d = "item";
        localStorage.setItem(d, d);
        localStorage.removeItem(d);
        n = true
    } catch (b) {}
    var f = false;
    try {
        var o = JSON.parse(JSON.stringify({
            item: "item"
        }));
        if (o.item == "item") {
            f = true
        }
    } catch (b) {}
    if (document.cookie.indexOf("read=true") != -1) {
        document.getElementById("gdpr").style.display = "none"
    }
    document.getElementById("gdpr-btn").onclick = function() {
        document.getElementById("gdpr").style.display = "none";
        document.cookie = "read=true"
    };
    var g = null;
    var m = {
        undo: [],
        redo: [],
        layout: null,
        fontSize: 16
    };
    var r = "hindi";
    g = new a.keyboard("keyboard", "editor");
    var q = g.textbox;
    q.focus();
    if (n && f) {
        var o = JSON.parse(localStorage.getItem(r));
        if (o != null) {
            if (o.layout) {
                m.layout = o.layout
            }
            if (o.undo) {
                m.undo = o.undo
            }
            if (o.redo) {
                m.redo = o.redo
            }
            if (o.fontSize) {
                m.fontSize = o.fontSize
            }
        }
    }
    if (m.fontSize) {
        g.setFontSize(m.fontSize)
    }
    var k = [{
        Id: "hindi",
        Name: "Hindi Keyboard",
        Json: {
            name: "Hindi",
            dir: "ltr",
            keys: [{
                i: "k0",
                c: "0",
                n: "‍",
                t: "`"
            }, {
                i: "k1",
                c: "0",
                n: "1",
                s: "ऍ",
                t: "१"
            }, {
                i: "k2",
                c: "0",
                n: "2",
                s: "ॅ",
                t: "२"
            }, {
                i: "k3",
                c: "0",
                n: "3",
                s: "#",
                t: "३"
            }, {
                i: "k4",
                c: "0",
                n: "4",
                s: "$",
                t: "४"
            }, {
                i: "k5",
                c: "0",
                n: "5",
                t: "५"
            }, {
                i: "k6",
                c: "0",
                n: "6",
                t: "६"
            }, {
                i: "k7",
                c: "0",
                n: "7",
                t: "७"
            }, {
                i: "k8",
                c: "0",
                n: "8",
                t: "८"
            }, {
                i: "k9",
                c: "0",
                n: "9",
                s: "(",
                t: "९"
            }, {
                i: "k10",
                c: "0",
                n: "0",
                s: ")",
                t: "०"
            }, {
                i: "k11",
                c: "0",
                n: "-",
                s: "ः",
                t: "-"
            }, {
                i: "k12",
                c: "0",
                n: "ृ",
                s: "ऋ",
                t: "="
            }, {
                i: "k13",
                c: "0",
                n: "ौ",
                s: "औ"
            }, {
                i: "k14",
                c: "0",
                n: "ै",
                s: "ऐ"
            }, {
                i: "k15",
                c: "0",
                n: "ा",
                s: "आ"
            }, {
                i: "k16",
                c: "0",
                n: "ी",
                s: "ई"
            }, {
                i: "k17",
                c: "0",
                n: "ू",
                s: "ऊ"
            }, {
                i: "k18",
                c: "0",
                n: "ब",
                s: "भ"
            }, {
                i: "k19",
                c: "0",
                n: "ह",
                s: "ङ"
            }, {
                i: "k20",
                c: "0",
                n: "ग",
                s: "घ"
            }, {
                i: "k21",
                c: "0",
                n: "द",
                s: "ध"
            }, {
                i: "k22",
                c: "0",
                n: "ज",
                s: "झ"
            }, {
                i: "k23",
                c: "0",
                n: "ड",
                s: "ढ",
                t: "["
            }, {
                i: "k24",
                c: "0",
                n: "़",
                s: "ञ",
                t: "]"
            }, {
                i: "k25",
                c: "0",
                n: "ॉ",
                s: "ऑ",
                t: "\\"
            }, {
                i: "k26",
                c: "0",
                n: "ो",
                s: "ओ"
            }, {
                i: "k27",
                c: "0",
                n: "े",
                s: "ए"
            }, {
                i: "k28",
                c: "0",
                n: "्",
                s: "अ"
            }, {
                i: "k29",
                c: "0",
                n: "ि",
                s: "इ"
            }, {
                i: "k30",
                c: "0",
                n: "ु",
                s: "उ"
            }, {
                i: "k31",
                c: "0",
                n: "प",
                s: "फ"
            }, {
                i: "k32",
                c: "0",
                n: "र",
                s: "ऱ"
            }, {
                i: "k33",
                c: "0",
                n: "क",
                s: "ख"
            }, {
                i: "k34",
                c: "0",
                n: "त",
                s: "थ"
            }, {
                i: "k35",
                c: "0",
                n: "च",
                s: "छ",
                t: ";"
            }, {
                i: "k36",
                c: "0",
                n: "ट",
                s: "ठ",
                t: "'"
            }, {
                i: "k37",
                c: "0",
                t: "'"
            }, {
                i: "k38",
                c: "0",
                n: "ं",
                s: "ँ"
            }, {
                i: "k39",
                c: "0",
                n: "म",
                s: "ण"
            }, {
                i: "k40",
                c: "0",
                n: "न"
            }, {
                i: "k41",
                c: "0",
                n: "व",
                s: "‌"
            }, {
                i: "k42",
                c: "0",
                n: "ल",
                s: "ळ"
            }, {
                i: "k43",
                c: "0",
                n: "स",
                s: "श"
            }, {
                i: "k44",
                c: "0",
                n: ",",
                s: "ष",
                t: ","
            }, {
                i: "k45",
                c: "0",
                n: ".",
                s: "।",
                t: "."
            }, {
                i: "k46",
                c: "0",
                n: "य",
                s: "य़",
                t: "/"
            }, {
                i: "k47",
                c: "0",
                n: "ॉ",
                s: "ऑ"
            }],
            deadkeys: []
        }
    }, {
        Id: "inscript",
        Name: "Inscript Keyboard",
        Json: {
            name: "Devanagari Inscript",
            dir: "ltr",
            keys: [{
                i: "k0",
                c: "0",
                n: "ॊ",
                s: "ऒ"
            }, {
                i: "k1",
                c: "0",
                n: "1",
                s: "ऍ",
                t: "१"
            }, {
                i: "k2",
                c: "0",
                n: "2",
                s: "ॅ",
                t: "२"
            }, {
                i: "k3",
                c: "0",
                n: "3",
                t: "३"
            }, {
                i: "k4",
                c: "0",
                n: "4",
                t: "४"
            }, {
                i: "k5",
                c: "0",
                n: "5",
                t: "५"
            }, {
                i: "k6",
                c: "0",
                n: "6",
                t: "६"
            }, {
                i: "k7",
                c: "0",
                n: "7",
                t: "७"
            }, {
                i: "k8",
                c: "0",
                n: "8",
                t: "८"
            }, {
                i: "k9",
                c: "0",
                n: "9",
                s: "(",
                t: "९"
            }, {
                i: "k10",
                c: "0",
                n: "0",
                s: ")",
                t: "०"
            }, {
                i: "k11",
                c: "0",
                n: "-",
                s: "ः"
            }, {
                i: "k12",
                c: "0",
                n: "ृ",
                s: "ऋ",
                t: "ॄ"
            }, {
                i: "k13",
                c: "0",
                n: "ौ",
                s: "औ"
            }, {
                i: "k14",
                c: "0",
                n: "ै",
                s: "ऐ"
            }, {
                i: "k15",
                c: "0",
                n: "ा",
                s: "आ"
            }, {
                i: "k16",
                c: "0",
                n: "ी",
                s: "ई",
                t: "ॣ"
            }, {
                i: "k17",
                c: "0",
                n: "ू",
                s: "ऊ"
            }, {
                i: "k18",
                c: "0",
                n: "ब",
                s: "भ"
            }, {
                i: "k19",
                c: "0",
                n: "ह",
                s: "ङ"
            }, {
                i: "k20",
                c: "0",
                n: "ग",
                s: "घ",
                t: "ग़"
            }, {
                i: "k21",
                c: "0",
                n: "द",
                s: "ध"
            }, {
                i: "k22",
                c: "0",
                n: "ज",
                s: "झ",
                t: "ज़"
            }, {
                i: "k23",
                c: "0",
                n: "ड",
                s: "ढ",
                t: "ड़"
            }, {
                i: "k24",
                c: "0",
                n: "़",
                s: "ञ"
            }, {
                i: "k25",
                c: "0",
                n: "ॉ",
                s: "ऑ"
            }, {
                i: "k26",
                c: "0",
                n: "ो",
                s: "ओ"
            }, {
                i: "k27",
                c: "0",
                n: "े",
                s: "ए"
            }, {
                i: "k28",
                c: "0",
                n: "्",
                s: "अ"
            }, {
                i: "k29",
                c: "0",
                n: "ि",
                s: "इ",
                t: "ॢ"
            }, {
                i: "k30",
                c: "0",
                n: "ु",
                s: "उ"
            }, {
                i: "k31",
                c: "0",
                n: "प",
                s: "फ"
            }, {
                i: "k32",
                c: "0",
                n: "र",
                s: "ऱ"
            }, {
                i: "k33",
                c: "0",
                n: "क",
                s: "ख",
                t: "क़"
            }, {
                i: "k34",
                c: "0",
                n: "त",
                s: "थ"
            }, {
                i: "k35",
                c: "0",
                n: "च",
                s: "छ",
                t: "॒"
            }, {
                i: "k36",
                c: "0",
                n: "ट",
                s: "ठ"
            }, {
                i: "k37",
                c: "0",
                n: "ॆ",
                s: "ऎ",
                t: "॓"
            }, {
                i: "k38",
                c: "0",
                n: "ं",
                s: "ँ"
            }, {
                i: "k39",
                c: "0",
                n: "म",
                s: "ण",
                t: "॔"
            }, {
                i: "k40",
                c: "0",
                n: "न",
                s: "ऩ"
            }, {
                i: "k41",
                c: "0",
                n: "व",
                s: "ऴ"
            }, {
                i: "k42",
                c: "0",
                n: "ल",
                s: "ळ"
            }, {
                i: "k43",
                c: "0",
                n: "स",
                s: "श"
            }, {
                i: "k44",
                c: "0",
                n: ",",
                s: "ष",
                t: "॰"
            }, {
                i: "k45",
                c: "0",
                n: ".",
                s: "।",
                t: "॥"
            }, {
                i: "k46",
                c: "0",
                n: "य",
                s: "य़"
            }, {
                i: "k47",
                c: "0",
                n: "ॉ",
                s: "ऑ"
            }],
            deadkeys: []
        }
    }];
    if (k.length == 1) {
        g.loadVirtualLayout(k[0].Json)
    } else {
        var h = [];
        var l = [];
        if (!m.layout) {
            m.layout = k[0].Id
        }
        for (var c = 0; c < k.length; c++) {
            h.push("<label", (c > 0 ? ' style="margin-left:2em"' : ""), '><input id="', k[c].Id, '" name=type type=radio', (m.layout == k[c].Id ? ' checked="checked"' : ""), "> ", k[c].Name, "</label>");
            l[c] = new a.layout();
            l[c].load(k[c].Json);
            if (m.layout == k[c].Id) {
                g.loadVirtualLayout(k[c].Json)
            }
        }
        var j = document.createElement("p");
        j.innerHTML = h.join("");
        document.getElementById("keyboard").appendChild(j);
        for (var c = 0; c < k.length; c++) {
            var p = function(e, i) {
                document.getElementById(e).onclick = function() {
                    if (m.layout != e) {
                        g.currentLayout = i;
                        g.reset();
                        g.drawKeyboard();
                        m.layout = e;
                        if (n && f) {
                            localStorage.setItem(r, JSON.stringify(m))
                        }
                    }
                    g.textbox.focus()
                }
            }(k[c].Id, l[c])
        }
    }
    if (m.fontSize == null) {
        m.fontSize = g.getFontSize();
        if (n && f) {
            localStorage.setItem(r, JSON.stringify(m))
        }
    }
    document.getElementById("shrink").onclick = function() {
        if (m.fontSize < 14) {
            return
        }
        m.fontSize -= 2;
        g.setFontSize(m.fontSize);
        g.drawKeyboard();
        if (n && f) {
            localStorage.setItem(r, JSON.stringify(m))
        }
        q.focus()
    };
    document.getElementById("enlarge").onclick = function() {
        if (m.fontSize > 36) {
            return
        }
        m.fontSize += 2;
        g.setFontSize(m.fontSize);
        g.drawKeyboard();
        if (n && f) {
            localStorage.setItem(r, JSON.stringify(m))
        }
        q.focus()
    };
    document.getElementById("email").onclick = function() {
        this.href = "mailto: ?body=" + q.value;
        q.focus();
        return true
    };
    document.getElementById("selectAll").onclick = function() {
        a.util.setCaretPosition(q, 0, q.value.length);
        ga("send", "event", "Keyboard", "click", "Select");
        q.focus()
    };
    document.getElementById("copy").onclick = function() {
        a.util.setCaretPosition(q, 0, q.value.length);
        var e = document.execCommand("copy");
        if (e) {
            a.util.setCaretPosition(q, q.value.length, q.value.length);
            ga("send", "event", "Keyboard", "click", "Copy")
        } else {
            alert("Your browser does not allow automated copy. To copy the text in the text area, you can click Select All button and right click on the selected text. Then click the Copy option.");
            ga("send", "event", "Keyboard", "click", "Copy Fail")
        }
        q.focus()
    };
    if (n && f) {
        if (m.undo.length > 0) {
            q.value = m.undo.pop()
        }
        document.getElementById("clearAll").onclick = function() {
            if (q.value.length < 10 || confirm("Are you sure you want to clear all the text?")) {
                ga("send", "event", "Keyboard", "click", "Clear");
                m.undo = [];
                m.redo = [];
                localStorage.setItem(r, JSON.stringify(m));
                q.value = ""
            }
            q.focus()
        };
        document.getElementById("undo").onclick = function() {
            if (m.undo.length == 0) {
                return
            }
            var e = m.undo.pop();
            if (e != q.value) {
                m.redo.push(q.value);
                q.value = e
            } else {
                q.value = (m.undo.length == 0 ? "" : m.undo[m.undo.length - 1]);
                m.redo.push(e)
            }
            localStorage.setItem(r, JSON.stringify(m));
            q.focus()
        };
        document.getElementById("redo").onclick = function() {
            if (m.redo.length == 0) {
                return
            }
            var e = m.redo.pop();
            q.value = e;
            m.undo.push(e);
            localStorage.setItem(r, JSON.stringify(m));
            q.focus()
        };
        setInterval(function() {
            var e = q.value;
            if (m.undo.length == 0 && e.length == 0) {
                return
            }
            if (m.undo.length == 0 || e != m.undo[m.undo.length - 1]) {
                m.undo.push(e);
                localStorage.setItem(r, JSON.stringify(m))
            }
        }, 3000)
    } else {
        document.getElementById("undo").style.display = "none";
        document.getElementById("redo").style.display = "none";
        document.getElementById("clearAll").style.display = "none"
    }
    document.getElementById("postToTwitter").onclick = function() {
        ga("send", "event", "Keyboard", "click", "Twitter");
        document.getElementById("postToTwitter").href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(q.value);
        q.focus();
        return true
    };
    document.getElementById("searchGoogle").onclick = function() {
        ga("send", "event", "Keyboard", "click", "Google");
        document.getElementById("searchGoogle").href = "https://www.google.com/search?ie=UTF-8&q=" + encodeURIComponent(q.value);
        q.focus();
        return true
    };
    document.getElementById("translateGoogle").onclick = function() {
        ga("send", "event", "Keyboard", "click", "Translate");
        document.getElementById("translateGoogle").href = "https://translate.google.com/#view=home&op=translate&sl=hi&tl=en&text=" + encodeURIComponent(q.value);
        q.focus();
        return true
    };
    document.getElementById("saveAsTextFile").onsubmit = function() {
        ga("send", "Keyboard", "Save", "send", (q.value.length > 0 ? "valid" : "invalid"));
        document.getElementById("data").value = q.value;
        q.focus();
        return true
    }
})();