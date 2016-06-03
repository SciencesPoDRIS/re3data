# re3data
Scrape data from www.re3data.org

## Install dependencies
```npm install```

## Run script
```node re3data.js```

## Results files
All the simple results as stored into the re3data.csv generated file.
As there are some 1 to n relations between a data repository and some aspects (dataAccesses, dataLicenses, dataUploads, institutions and policies) some specifics files are generated.
All the results files are in CSV, comma is the choosen separator and all the texts are between double quotes.
If a field is multi-valuated, a pipe "|" will be the separator.

## ToDo
Put the two separators as variables.
Find a way to factorise the 1 to n ralations, in order not to repeat some piece of code.
Extract in a conf file the data to extract (into a json file ?).

## Licenses
[LGPL V3.0](http://www.gnu.org/licenses/lgpl.txt "LGPL V3.0")
[CECILL-C](http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html "CECILL-C")
