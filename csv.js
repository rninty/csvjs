"use strict";

function parse(csv) {
	var PART = /"((?:""|[^"])*)"(?=,|\r\n|$)|\r\n|(?!$)(((?!\r\n)[^,])*)(?:,|$|(?=\r\n))/g;
	var match;

	var rows = [];
	var current = [];

	while (match = PART.exec(csv)) {
		if (match[1] === undefined) {
			if (match[2] === undefined) {
				rows.push(current);
				current = [];
			} else {
				current.push(match[2]);
			}
		} else {
			current.push(match[1].replace(/""/g, '"'));
		}
	}

	if (current.length) {
		rows.push(current);
	}

	return rows;
}
