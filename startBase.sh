#!/bin/bash
# Check arguments
hostname="localhost"
indexname="thesis"
# Build URI
baseuri="http://$hostname:9200/$indexname"

# Test string 
teststring=$( cat <<EOF
 "En sa totalité l'archive n'est pas descriptible,  et elle est incontournable en son actualité." - Michel Foucault,  L'Archéologie du Savoir 
La Martinique est une île faisant partie de l'archipel des Antilles, elle est située dans la mer des Caraïbes.
En linguistique, la racinisation (ou désuffixation, ou stemming en anglais) est le nom donné au procédé qui vise à transformer les flexions en leur radical ou stemme.
EOF
)


# Confirm before delete index
echo -n "Index $baseuri will be deleted. Continue ? [yn] "
read are_you_sure
if [ "$are_you_sure" != "y" ]
then
    echo "Cancelled!"
    exit 2
fi

# Delete index
echo -n "Deleting ... "
curl -XDELETE $baseuri/
echo ""

# Load settings
echo -n "Loading settings ... "
curl -XPUT "$baseuri/" -d '
{
    "settings": {
		"analysis" : {
                "analyzer": {
                    "french_stemmer": {
                        "filter": [
							"standard",
							"lowercase", 
                            "french_stemmer"
                        ], 
                        "tokenizer": "standard", 
                        "type": "custom"
                    } 
                }, 
                "filter": {
                    "french_stemmer": {
                        "name": "french", 
						"type": "snowball"
                    } 
                }
            }
		},
		"mappings" : {
            "document" : {
                "properties" : {
                    "author" : { "type" : "string" },
                    "date" : {
                        "type" : "date",
                        "format" : "dateOptionalTime"
                    },
                    "fileName" : { "type" : "string" },
                    "content" : { "type" : "string", "analyzer" : "french_stemmer" }
                }
            }
        }
}'

echo ""
echo ""
echo "Test string : $teststring"
echo ""

echo "Stemmer french"
curl -s -XGET "$hostname:9200/$indexname/_analyze?pretty=true&analyzer=french_stemmer" -d "$teststring" | grep '"token"' | cut -d '"' -f 4 | tr "\n" " "

# End.
echo "Done!"
exit 0

