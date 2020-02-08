/**
 * Copyright (c) https://github.com/arsonite
 * Burak Günaydin (2019/2020)
 */

class XML {
	/*
	const token = '#text';

	let services = [];
	xmlFiles.forEach(xmlFile => {
		let temp = xml.toJSON(
			new DOMParser().parseFromString(xmlFile, 'text/xml')
		);
		temp = temp['ServiceInformations'];
		temp = temp['GeneralInfomation'];

		let tags = [];
		temp.tags.tag.forEach(tag => {
			tags.push(tag[token]);
		});

		let service = {
			id: temp.id[token],
			name: temp.serviceName[token],
			author: temp.author[token],
			place: temp.place[token],
			date: temp.date[token],
			tags: tags,
			shortInfo: temp.shortInfo[token],
			longInfo: temp.longInfo[token]
		};

		services.push(service);
	});
	*/

	/**
	 * A recursive algorithm to convert a XML-file to JSON.
	 *
	 * @param {XML} file The XML content that is supposed to be transformed.
	 * @return {JSON} The converted json.
	 */
	static toJSON = file => {
		let temp = {};
		if (file.nodeType === 1) {
			if (file.attributes.length > 0) {
				temp['@attributes'] = {};
				file.attributes.forEach(attribute => {
					temp['@attributes'][attribute.nodeName] =
						attribute.nodeValue;
				});
			}
		} else if (file.nodeType === 3) {
			temp = file.nodeValue;
		}
		if (file.hasChildNodes()) {
			file.childNodes.forEach(child => {
				let item = child;
				let nodeName = item.nodeName;
				if (temp[nodeName] === undefined) {
					temp[nodeName] = XML.toJSON(item);
				} else {
					if (temp[nodeName].push === undefined) {
						let old = temp[nodeName];
						temp[nodeName] = [];
						temp[nodeName].push(old);
					}
					temp[nodeName].push(XML.toJSON(item));
				}
			});
		}
		return temp;
	};

	/**
	 * @param {String} json
	 */
	static fromJSON = json => {
		let file = '';
		return file;
	};
}

export default XML;
