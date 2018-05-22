"use strict";
function formatMailBody(obj, order) {
	var result = "";
	for(idx in order) {
		var key = order[idx];
		result += "<h3 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h3><div>" + sanitizeInput(obj[key]) + "</div>";
	}
	return result;
}

function sanitizeInput(rawInput) {
	var placeholder = HtmlService.createHtmlOutput(" ");
	placeholder.appendUntrusted(rawInput);
	return placeholder.getContent();
}

function doPost(e) {
	try {
		var mailData = e.parameters,
		dataOrder = JSON.parse(e.parameters.format);
		MailApp.sendEmail({
			to: "idotheinternet@gmail.com",
			subject: "NEW SUBMISSION RECIEVED",
			htmlBody: formatMailBody(mailData, dataOrder)
		});
		return ContentService.createTextOutPut(
			JSON.stringify({
				"result": "success",
				"data": JSON.stringify(e.parameters)
			})
		).setMimeType(ContentService.MimeType.JSON);
	}
	catch(error) {
		Logger.log(error);
		return ContentService.createTextOutput(
			JSON.stringify({
			 	"result": "error",
			 	"error": e
			})
		).setMimeType(ContentService.MimeType.JSON);
	}
}

