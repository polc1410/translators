{
	"translatorID": "4823f32c-6cec-4c92-9259-08b836cb7add",
	"label": "Save as Summary of Product Characteristics",
	"creator": "Calum Polwart",
	"target": "^https?:\\/\\/((www\\.))medicines\\.org\\.uk\\/emc",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 5,
	"browserSupport": "gcsibv",
	"lastUpdated": "2022-03-29 21:26:18"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2022 Calum Polwart

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/


async function detectWeb(doc, url) {
	// TODO: adjust the logic here
	if (url.includes('/smpc')) {
		return 'bookSection';
	}
	return false;
}

async function doWeb(doc, url) {
	await scrape(doc, url);
}

async function scrape(doc, url) {
	let translator = Zotero.loadTranslator('web');
	// Embedded Metadata
	translator.setTranslator('951c027d-74ac-47d4-a107-9c3069ab7b48');
	translator.setDocument(doc);
	
	translator.setHandler('itemDone', (_obj, item) => {
		item.bookTitle = "Electronic Medicines Compendium";
		item.publisher = "Datapharm";
		item.place = "Surrey, UK";
		var company = ZU.xpathText(doc, '//a[@data-evt="docCompany"]');
		item.creators = ZU.cleanAuthor(
			company,
			'author',
			false
			);
		item.title =  
			"Summary of Product Characteristics " +
			ZU.xpathText(doc, '//div[@class="col-md-12 title"]//h1') ;
		item.date = ZU.xpathText(doc, '//div[@class="sidebar-module last-updated grey-border side-links no-mob"]//h3').split("Last updated on emc: ")[1];
		//item.attachments = [{
		//	url: doc.location.href,
		//	title: "Snapshot",
		//	mimeType: "text/html",
		//	snapshot: false
		//}];
		item.attachments = [];
		item.url = doc.location.href;
		item.complete();
	});

	let em = await translator.getTranslatorObject();
	em.itemType = 'bookSection';
	await em.doWeb(doc, url);
}






/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.medicines.org.uk/emc/product/13480/smpc",
		"items": [
			{
				"itemType": "bookSection",
				"title": "Summary of Product Characteristics: Netildex 3mg/ml +1mg/ml eye drops",
				"creators": {
					"lastName": "ParaPharm Development Limited",
					"creatorType": "author"
				},
				"date": "29 Mar 2022",
				"abstractNote": "Netildex 3mg/ml +1mg/ml eye drops - Summary of Product Characteristics (SmPC) by ParaPharm Development Limited",
				"bookTitle": "Electronic Medicines Compendium",
				"language": "en",
				"libraryCatalog": "www.medicines.org.uk",
				"place": "Surrey, UK",
				"publisher": "Datapharm",
				"shortTitle": "Summary of Product Characteristics",
				"url": "https://emc-prod-ukwest-wa.azurewebsites.net/emc/product/13480/smpc",
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.medicines.org.uk/emc/product/13480/smpc",
		"items": [
			{
				"itemType": "bookSection",
				"title": "Summary of Product Characteristics Netildex 3mg/ml +1mg/ml eye drops",
				"creators": {
					"lastName": "com",
					"creatorType": "author"
				},
				"date": "29 Mar 2022",
				"abstractNote": "Netildex 3mg/ml +1mg/ml eye drops - Summary of Product Characteristics (SmPC) by ParaPharm Development Limited",
				"bookTitle": "Electronic Medicines Compendium",
				"language": "en",
				"libraryCatalog": "www.medicines.org.uk",
				"place": "Surrey, UK",
				"publisher": "Datapharm",
				"url": "https://emc-prod-ukwest-wa.azurewebsites.net/emc/product/13480/smpc",
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					},
					{
						"title": "Snapshot",
						"mimeType": "text/html",
						"snapshot": false
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
