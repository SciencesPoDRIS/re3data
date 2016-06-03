#!/usr/bin/env node

// Imports
var artooJs = require('artoo-js'),
    fs = require('fs'),
    http = require('http'),
    libxml = require('libxmljs'),
    sandcrawler = require('sandcrawler');

// Config
var namespaces = { r3d: 'http://www.re3data.org/schema/2-2' };
var resultsFile = 're3data.csv';
// Flush file and write headers
fs.writeFile(resultsFile, '"url","orgIdentifier","repositoryName","repositoryURL","repositoryIdentifier","description","type","size","startDate","endDate","repositoryLanguage","subject","missionStatementURL","contentType","providerType","keyword","databaseAccessType","versioning","pidSystem","citationGuidelineURL","enhancedPublication","qualityManagement","certificate","remarks","entryDate","lastUpdate"\n', 'utf8');
dataToScrape = ['r3d:re3data.orgIdentifier', 'r3d:repositoryName', 'r3d:repositoryURL', 'r3d:repositoryIdentifier', 'r3d:description', 'r3d:type', 'r3d:size', 'r3d:startDate', 'r3d:endDate', 'r3d:repositoryLanguage', 'r3d:subject', 'r3d:missionStatementURL', 'r3d:contentType', 'r3d:providerType', 'r3d:keyword', 'r3d:databaseAccessType', 'r3d:versioning', 'r3d:pidSystem', 'r3d:citationGuidelineURL', 'r3d:enhancedPublication', 'r3d:qualityManagement', 'r3d:certificate', 'r3d:remarks', 'r3d:entryDate', 'r3d:lastUpdate']
var institutionsFile = 're3data_institutions.csv';
fs.writeFile(institutionsFile, '"orgIdentifier","institutionName","institutionCountry","responsibilityType","institutionType","institutionURL","responsibilityStartDate","responsibilityEndDate","institutionContact"\n');
institutionsToScrape = ['r3d:institutionName', 'r3d:institutionAdditionalName', 'r3d:institutionCountry', 'r3d:responsibilityType', 'r3d:institutionType', 'r3d:institutionURL', 'r3d:responsibilityStartDate', 'r3d:responsibilityEndDate', 'r3d:institutionContact'];
var policiesFile = 're3data_policies.csv';
fs.writeFile(policiesFile, '"orgIdentifier","policyName","policyURL"\n');
policiesToScrape = ['r3d:policyName', 'r3d:policyURL'];
var dataAccessesFile = 're3data_dataaccesses.csv';
fs.writeFile(dataAccessesFile, '"orgIdentifier","dataAccessType"\n');
dataAccessesToScrape = ['r3d:dataAccessType'];
var dataLicensesFile = 're3data_datalicenses.csv';
fs.writeFile(dataLicensesFile, '"orgIdentifier","dataLicenseName","dataLicenseURL"\n');
dataLicensesToScrape = ['r3d:dataLicenseName', 'r3d:dataLicenseURL'];
var dataUploadsFile = 're3data_datauploads.csv';
fs.writeFile(dataUploadsFile, '"orgIdentifier","dataUploadType","dataUploadRestriction"\n');
dataUploadsToScrape = ['r3d:dataUploadType', 'r3d:dataUploadRestriction'];

// Now let's define a new spider and start chaining
var homeSpider = sandcrawler.spider('ScrapLinksOnHomePage');

// What we need is to hit the following url
homeSpider.urls([
    'http://service.re3data.org/search?page=1'
    , 'http://service.re3data.org/search?page=2'
    , 'http://service.re3data.org/search?page=3'
    , 'http://service.re3data.org/search?page=4'
    , 'http://service.re3data.org/search?page=5'
    , 'http://service.re3data.org/search?page=6'
    , 'http://service.re3data.org/search?page=7'
    , 'http://service.re3data.org/search?page=8'
    , 'http://service.re3data.org/search?page=9'
    , 'http://service.re3data.org/search?page=10'
    , 'http://service.re3data.org/search?page=11'
    , 'http://service.re3data.org/search?page=12'
    , 'http://service.re3data.org/search?page=13'
    , 'http://service.re3data.org/search?page=14'
    , 'http://service.re3data.org/search?page=15'
    , 'http://service.re3data.org/search?page=16'
    , 'http://service.re3data.org/search?page=17'
    , 'http://service.re3data.org/search?page=18'
    , 'http://service.re3data.org/search?page=19'
    , 'http://service.re3data.org/search?page=20'
    , 'http://service.re3data.org/search?page=21'
    , 'http://service.re3data.org/search?page=22'
    , 'http://service.re3data.org/search?page=23'
    , 'http://service.re3data.org/search?page=24'
    , 'http://service.re3data.org/search?page=25'
    , 'http://service.re3data.org/search?page=26'
    , 'http://service.re3data.org/search?page=27'
    , 'http://service.re3data.org/search?page=28'
    , 'http://service.re3data.org/search?page=29'
    , 'http://service.re3data.org/search?page=30'
    , 'http://service.re3data.org/search?page=31'
    , 'http://service.re3data.org/search?page=32'
    , 'http://service.re3data.org/search?page=33'
    , 'http://service.re3data.org/search?page=34'
    , 'http://service.re3data.org/search?page=35'
    , 'http://service.re3data.org/search?page=36'
    , 'http://service.re3data.org/search?page=37'
    , 'http://service.re3data.org/search?page=38'
    , 'http://service.re3data.org/search?page=39'
    , 'http://service.re3data.org/search?page=40'
    , 'http://service.re3data.org/search?page=41'
    , 'http://service.re3data.org/search?page=42'
    , 'http://service.re3data.org/search?page=43'
    , 'http://service.re3data.org/search?page=44'
    , 'http://service.re3data.org/search?page=45'
    , 'http://service.re3data.org/search?page=46'
    , 'http://service.re3data.org/search?page=47'
    , 'http://service.re3data.org/search?page=48'
    , 'http://service.re3data.org/search?page=49'
    , 'http://service.re3data.org/search?page=50'
    , 'http://service.re3data.org/search?page=51'
    , 'http://service.re3data.org/search?page=52'
    , 'http://service.re3data.org/search?page=53'
    , 'http://service.re3data.org/search?page=54'
    , 'http://service.re3data.org/search?page=55'
    , 'http://service.re3data.org/search?page=56'
    , 'http://service.re3data.org/search?page=57'
    , 'http://service.re3data.org/search?page=58'
    , 'http://service.re3data.org/search?page=59'
    , 'http://service.re3data.org/search?page=60'
    , 'http://service.re3data.org/search?page=61'
    , 'http://service.re3data.org/search?page=62'
    , 'http://service.re3data.org/search?page=63'
    , 'http://service.re3data.org/search?page=64'
]);

function extractXmlData(url) {
    http.get(url, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var data = [];
            var xmlDoc = libxml.parseXmlString(body);
            // Add url in data
            data.push('"' + url + '"');
            // Iterate over data to scrape
            for (var i = 0; i < dataToScrape.length; i++) {
                var txt = '';
                // Iterate over instances of this data
                for (var j = 0; j < xmlDoc.find('//' + dataToScrape[i], namespaces).length; j++) {
                    txt += txt == '' ? '' : ' | ';
                    txt += xmlDoc.find('//' + dataToScrape[i], namespaces)[j].text().replace(/(?:\r\n|\r|\n)/g, ' ');
                }
                data.push('"' + txt + '"');
            }
            fs.appendFile(resultsFile, data.join(',') + '\n', 'utf8');
            // Institutions style
            // Iterate over instances of institutions
            for (var h = 0; h < xmlDoc.find('//r3d:institution', namespaces).length; h++) {
                var institutionsData = [];
                // Add r3d:re3data.orgIdentifier in institutionsData
                institutionsData.push('"' + xmlDoc.get('//r3d:re3data.orgIdentifier', namespaces).text() + '"');
                // Iterate over institutionsData to scrape
                for (var i = 0; i < institutionsToScrape.length; i++) {
                    var txt = '';
                    // Iterate over instances of this data
                    for (var j = 0; j < xmlDoc.find('//r3d:institution[' + (h + 1) + ']/' + institutionsToScrape[i], namespaces).length; j++) {
                        txt += txt == '' ? '' : ' | ';
                        txt += xmlDoc.find('//r3d:institution[' + (h + 1) + ']/' + institutionsToScrape[i], namespaces)[j].text().replace(/(?:\r\n|\r|\n)/g, ' ');
                    }
                    institutionsData.push('"' + txt + '"');
                }
                fs.appendFile(institutionsFile, institutionsData.join(',') + '\n', 'utf8');
            }
            // Policies style
            // Iterate over instances of policies
            for (var h = 0; h < xmlDoc.find('//r3d:policy', namespaces).length; h++) {
                var policiesData = [];
                // Add r3d:re3data.orgIdentifier in policiesData
                policiesData.push('"' + xmlDoc.get('//r3d:re3data.orgIdentifier', namespaces).text() + '"');
                // Iterate over policiesData to scrape
                for (var i = 0; i < policiesToScrape.length; i++) {
                    var txt = '';
                    // Iterate over instances of this data
                    for (var j = 0; j < xmlDoc.find('//r3d:policy[' + (h + 1) + ']/' + policiesToScrape[i], namespaces).length; j++) {
                        txt += txt == '' ? '' : ' | ';
                        txt += xmlDoc.find('//r3d:policy[' + (h + 1) + ']/' + policiesToScrape[i], namespaces)[j].text().replace(/(?:\r\n|\r|\n)/g, ' ');
                    }
                    policiesData.push('"' + txt + '"');
                }
                fs.appendFile(policiesFile, policiesData.join(',') + '\n', 'utf8');
            }
            // DataAccesses style
            // Iterate over instances of dataAccesses
            for (var h = 0; h < xmlDoc.find('//r3d:dataAccess', namespaces).length; h++) {
                var dataAccessesData = [];
                // Add r3d:re3data.orgIdentifier in dataAccessesData
                dataAccessesData.push('"' + xmlDoc.get('//r3d:re3data.orgIdentifier', namespaces).text() + '"');
                // Iterate over dataAccesses to scrape
                for (var i = 0; i < dataAccessesToScrape.length; i++) {
                    var txt = '';
                    // Iterate over instances of this data
                    for (var j = 0; j < xmlDoc.find('//r3d:dataAccess[' + (h + 1) + ']/' + dataAccessesToScrape[i], namespaces).length; j++) {
                        txt += txt == '' ? '' : ' | ';
                        txt += xmlDoc.find('//r3d:dataAccess[' + (h + 1) + ']/' + dataAccessesToScrape[i], namespaces)[j].text().replace(/(?:\r\n|\r|\n)/g, ' ');
                    }
                    dataAccessesData.push('"' + txt + '"');
                }
                fs.appendFile(dataAccessesFile, dataAccessesData.join(',') + '\n', 'utf8');
            }
            // DataLicenses style
            // Iterate over instances of dataLicenses
            for (var h = 0; h < xmlDoc.find('//r3d:dataLicense', namespaces).length; h++) {
                var dataLicensesData = [];
                // Add r3d:re3data.orgIdentifier in dataLicensesData
                dataLicensesData.push('"' + xmlDoc.get('//r3d:re3data.orgIdentifier', namespaces).text() + '"');
                // Iterate over dataLicensesData to scrape
                for (var i = 0; i < dataLicensesToScrape.length; i++) {
                    var txt = '';
                    // Iterate over instances of this data
                    for (var j = 0; j < xmlDoc.find('//r3d:dataLicense[' + (h + 1) + ']/' + dataLicensesToScrape[i], namespaces).length; j++) {
                        txt += txt == '' ? '' : ' | ';
                        txt += xmlDoc.find('//r3d:dataLicense[' + (h + 1) + ']/' + dataLicensesToScrape[i], namespaces)[j].text().replace(/(?:\r\n|\r|\n)/g, ' ');
                    }
                    dataLicensesData.push('"' + txt + '"');
                }
                fs.appendFile(dataLicensesFile, dataLicensesData.join(',') + '\n', 'utf8');
            }
            // DataUploads style
            // Iterate over instances of dataUploads
            for (var h = 0; h < xmlDoc.find('//r3d:dataUpload', namespaces).length; h++) {
                var dataUploadsData = [];
                // Add r3d:re3data.orgIdentifier in dataUploadsData
                dataUploadsData.push('"' + xmlDoc.get('//r3d:re3data.orgIdentifier', namespaces).text() + '"');
                // Iterate over dataUploadsData to scrape
                for (var i = 0; i < dataUploadsToScrape.length; i++) {
                    var txt = '';
                    // Iterate over instances of this data
                    for (var j = 0; j < xmlDoc.find('//r3d:dataUpload[' + (h + 1) + ']/' + dataUploadsToScrape[i], namespaces).length; j++) {
                        txt += txt == '' ? '' : ' | ';
                        txt += xmlDoc.find('//r3d:dataUpload[' + (h + 1) + ']/' + dataUploadsToScrape[i], namespaces)[j].text().replace(/(?:\r\n|\r|\n)/g, ' ');
                    }
                    dataUploadsData.push('"' + txt + '"');
                }
                fs.appendFile(dataUploadsFile, dataUploadsData.join(',') + '\n', 'utf8');
            }
        });
    }).on('error', function(e) {
        console.log('Got error: ' + e.message);
    });
}

// With the following scraper
homeSpider.scraper(function($, done) {
    var data = $('.r3d-searchresult.col-md-12').scrape({
        url: {
            sel: '.col-md-9 > a:nth-child(1)',
            method: function($) {
                return 'http://service.re3data.org/api/v1' + $(this).attr('href')
            }
        }
    });
    done(null, data);
});

// So that we can handle its result
homeSpider.result(function(err, req, res) {
    for (var i = 0; i < res.data.length; i++) {
        extractXmlData(res.data[i].url);
    }
});

homeSpider.run(function(err, remains) {
    console.log('Data scrapped!');
});