import React, { Component } from 'react';

import Toolbar from './Toolbar';
import Word from './Word';

import { error, log, success } from 'util/logging.js';

import './style/Display.css';

/* */
const SPECIAL_KEYCODES = {
	8: '\b', // Backspace
	9: '	', // Tab
	13: '\n', // Enter
	16: '', // Shift
	17: '', // Control
	18: '', // Alt, Alt-Graph
	20: '', // CapsLock
	32: ' ', // Space
	91: '', // Meta, Windows-Key
	255: '' // Unidentified, fn
};

/* */
const NAVIGATION = {
	LEFT: 37, //
	UP: 38, //
	RIGHT: 39, //
	DOWN: 40 //
};

/* */
const WHITELIST = [
	'1234567890', // Numbers
	'abcdefghijklmnopqrstuvwxyz', // QWERTZ
	'äöü', // Umlauts
	'^<,.-#+', // QWERTZ special-symbols

	'!"§$%&/()=?`', // Shift-Numbers special-symbols
	"°>;:_*'", // Shift-Letters special-symbols

	'{[]}\\`', // ALT-Numbers special-symbols
	'@|~' // ALT-QWERTZ special-symbols
];

/* */
const SHORTCUTS = {};

/**
 *
 */
class Display extends Component {
	state = {
		dirty: false, //

		attributes: [['']], //
		text: [['']], //

		pointer: {
			line: 0,
			column: 0
		}
	};

	constructor(props) {
		super(props);

		this.ref = React.createRef();
	}

	/**
	 *
	 */
	copy = object => {
		let output, v, key;
		output = Array.isArray(object) ? [] : {};
		for (key in object) {
			v = object[key];
			output[key] = typeof v === 'object' ? this.copy(v) : v;
		}
		return output;
	};

	/**
	 *
	 */
	package = event => {
		let element = event.target;
		let text = this.state.text;
		element.childNodes.forEach((line, i) => {
			let arr = line.textContent.split(/(\S+)(\s+)/).map(el => {
				return el;
			});
			text[i] = arr;
		});
		this.setState({ text: text }, () => {
			event.target.textContent = '';
		});
	};

	/**
	 *
	 */
	setCaretIndex = (line = 0, column = 0) => {
		let element = this.ref.current.childNodes[0].childNodes[0];
		let range = document.createRange();
		let selection = window.getSelection();

		range.setStart(element.childNodes[line], column);
		range.setEnd(element.childNodes[line], column);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
		element.focus();
	};

	/**
	 *
	 */
	getCaretIndex = () => {
		try {
			let selection = document.getSelection();
			let text = selection.anchorNode.textContent.slice(
				0,
				selection.focusOffset
			);
			let line = text.split('\n').length;
			let column = text.split('\n').pop().length;
			return [line, column];
		} catch (e) {
			return [0, 0];
		}
	};

	/**
	 *
	 */
	keypress = event => {
		event.preventDefault();

		const key = event.key;
		const keycode = event.keyCode;

		let pointer = this.state.pointer;

		if (keycode === NAVIGATION.RIGHT) {
			pointer.column++;
			this.setCaretIndex(0, pointer.column);
			this.setState({ pointer: pointer });
			return;
		} else if (keycode === NAVIGATION.LEFT) {
			pointer.column--;
			this.setCaretIndex(0, pointer.column);
			this.setState({ pointer: pointer });
			return;
		}

		const whitelisted = (() => {
			let bool = false;
			for (const string of WHITELIST) {
				if (string.includes(key.toLowerCase())) {
					bool = true;
					break;
				}
			}
			return bool;
		})();
		if (!whitelisted) {
			error(key + ': ' + keycode);
			return;
		}
		success(key + ': ' + keycode);

		let text = this.state.text;
		let word = text[0][0];
		word =
			word.substring(0, pointer.column) +
			key +
			word.substring(pointer.column, word.length);
		text[0][0] = word;

		this.setState({ text: text }, () => {
			pointer.column++;
			this.setCaretIndex(0, pointer.column);
			this.setState({ pointer: pointer });
		});
	};

	render() {
		const { attributes, text } = this.state;

		return (
			<div id='display' className='screen'>
				<Toolbar />

				<main>
					<div id='lines'>
						{text.map((line, i) => {
							return <p key={i}>{i}</p>;
						})}
					</div>

					<div
						id='text'
						className=''
						ref={this.ref}
						contentEditable
						onClick={e => {
							let pointer = this.state.pointer;
							pointer.column = this.getCaretIndex()[1];
							this.setState({ pointer: pointer });
						}}
						onKeyDown={e => {
							this.keypress(e);
						}}
					>
						{text.map((line, i) => {
							return (
								<div key={i} className='line'>
									{line.map((word, i) => {
										if (word.match('\\s+')) {
											return word;
										}
										return (
											<Word
												key={i}
												index={i}
												content={word}
												attributes={attributes}
											></Word>
										);
									})}
								</div>
							);
						})}
					</div>
				</main>
			</div>
		);
	}
}

export default Display;

/*
function getCharacterOffsetWithin_final(range, node) {
    var treeWalker = document.createTreeWalker(
        node,
        NodeFilter.ELEMENT_NODE,
        function(node) {
            var nodeRange = document.createRange();
            nodeRange.selectNodeContents(node);
            return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
        false
    );

    var charCount = 0, lastNodeLength = 0;

    if (range.startContainer.nodeType == 3) {
        charCount += range.startOffset;
    }

    while (treeWalker.nextNode()) {
        charCount += lastNodeLength;
        lastNodeLength = 0;
        
        if(range.startContainer != treeWalker.currentNode) {
            if(treeWalker.currentNode instanceof Text) {
                lastNodeLength += treeWalker.currentNode.length;
            } else if(treeWalker.currentNode instanceof HTMLBRElement ||
                      treeWalker.currentNode instanceof HTMLImageElement)
            {
                lastNodeLength++;
            }
        }
    }
    
    return charCount + lastNodeLength;
}

var update = function() {
    var el = document.getElementById("text");
    var range = window.getSelection().getRangeAt(0);
    console.log("Caret pos: " + getCharacterOffsetWithin_final(range, el))
};
$('#text').on("mouseup keyup", update);
*/

/*
function getCaretCharacterOffsetWithin(element) {
	var caretOffset = 0;
	var doc = element.ownerDocument || element.document;
	var win = doc.defaultView || doc.parentWindow;
	var sel;
	if (typeof win.getSelection != "undefined") {
		sel = win.getSelection();
		if (sel.rangeCount > 0) {
		var range = win.getSelection().getRangeAt(0);
		var preCaretRange = range.cloneRange();
		preCaretRange.selectNodeContents(element);
		preCaretRange.setEnd(range.endContainer, range.endOffset);
		caretOffset = preCaretRange.toString().length;
		}
	} else if ((sel = doc.selection) && sel.type != "Control") {
		var textRange = sel.createRange();
		var preCaretTextRange = doc.body.createTextRange();
		preCaretTextRange.moveToElementText(element);
		preCaretTextRange.setEndPoint("EndToEnd", textRange);
		caretOffset = preCaretTextRange.text.length;
	}
	return caretOffset;
}

function getCaretPosition() {
	if (window.getSelection && window.getSelection().getRangeAt) {
		var range = window.getSelection().getRangeAt(0);
		var selectedObj = window.getSelection();
		var rangeCount = 0;
		var childNodes = selectedObj.anchorNode.parentNode.childNodes;
		for (var i = 0; i < childNodes.length; i++) {
		if (childNodes[i] == selectedObj.anchorNode) {
			break;
		}
		if (childNodes[i].outerHTML)
			rangeCount += childNodes[i].outerHTML.length;
		else if (childNodes[i].nodeType == 3) {
			rangeCount += childNodes[i].textContent.length;
		}
		}
		return range.startOffset + rangeCount;
	}
	return -1;
}

function showCaretPos() {
	var el = document.getElementById("test");
	var caretPosEl = document.getElementById("caretPos");
	caretPosEl.innerHTML = "Caret position: " + getCaretPosition(); //getCaretCharacterOffsetWithin(el);
}

document.body.onkeyup = showCaretPos;
document.body.onmouseup = showCaretPos;
*/

/*
function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function showCaretPos() {
    var el = document.getElementById("test");
    var caretPosEl = document.getElementById("caretPos");
    caretPosEl.innerHTML = "Caret position: " + getCaretCharacterOffsetWithin(el);
}

document.body.onkeyup = showCaretPos;
document.body.onmouseup = showCaretPos;
*/
