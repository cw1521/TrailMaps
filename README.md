# Installation
**Download Node**<br>
**Clone Repo**<br>
**Type `npm install` inside the folder**<br>
**Type `npm run start` to start the server**<br>
**Navigate to http://localhost:5000 in a browser** <br>
## API Keys
**API Keys are expected to be stored in api_keys folder in root TrailMaps directory.**<br><br>
**Obtain Bing Maps api_key and store in TrailMaps/api_keys/mapkey.xml**<br>
**Obtain TrailAPI key and and store in TrailMaps/api_keys/trailkey.xml**<br><br>
Examples:<br>
mapkey.xml
```
<apikey xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="../schema/apikey.xsd">
    <id>0</id>
    <name>Bing Maps</name>
    <key>example_api_key_47463278</key>
</apikey>
```
trailkey.xml
```
<apikey xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="../schema/apikey.xsd">
    <id>1</id>
    <name>TrailApi</name>
    <key>example_api_key_474546456456</key>
</apikey>
```