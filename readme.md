# Discovery-plugin-sensor-gauge

[![npm version](https://badge.fury.io/js/@hexa-ai%2Fdiscovery-plugin-sensor-gauge.svg)](https://badge.fury.io/js/@hexa-ai%2Fdiscovery-plugin-sensor-gauge)


Plugin for the dashborad as code Discovery tool from SenX company.

## Démo

https://jsfiddle.net/jtalbourdet/bqrs9yvm/1/

## Installation

```npm install @hexa-ai/discovery-plugin-sensor-gauge```

## Use

```
<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <title>Démo Discovery-plugin-csv-export</title>

<!-- Import Discovery -->
    <script nomodule src="https://unpkg.com/@senx/discovery-widgets/dist/discovery/discovery.js"></script>
    <script type="module" src="https://unpkg.com/@senx/discovery-widgets/dist/discovery/discovery.esm.js"></script>

<!-- Import discovery-plugin-csv-export -->
     <script nomodule src="https://unpkg.com/@hexa-ai/discovery-plugin-sensor-gauge/dist/discovery-plugin-sensor-gauge/discovery-plugin-sensor-gauge.js"></script>
  <script type="module" src="https://unpkg.com/@hexa-ai/discovery-plugin-sensor-gauge/dist/discovery-plugin-sensor-gauge/discovery-plugin-sensor-gauge.esm.js"></script>

 </head>
  <body>
<!-- Define a one tile dashboard with "radar" as a chart type and random values -->
    <discovery-dashboard url="http://localhost:8080/api/v0/exec" dashboard-title="Test" debug>
      {
        'title' 'sensor-gauge'
        'type' 'flex'
        'description' 'Dashboard test'
        'tiles' [
          {
            'title' 'Mesure de débit'
            'x' 0 'y' 0 'w' 6 'h' 2
            'type' 'sensor-gauge'
            'data' {
              'value' 23.5
              'alertMessage' 'Débit trop fort'

            }
            'options' { 'unit' 'm3/h' 'scheme' 'CTHULHU' 'bgColor' 'white'  'extra' { 'maxValue' 100 'minValue' 0 'alertFontColor' 'yellow' 'alertBgColor' 'red' 'url' 'http://www.google.fr' 'icon' 'flow' } }
          }
          {
            'title' 'Mesure de température'
            'x' 6 'y' 0 'w' 3 'h' 2
            'type' 'sensor-gauge'
            'data' {
              'value' 37.5
              'alertMessage' 'Température trop haute'
            }
            'options' { 'unit' '°C' 'scheme' 'ECTOPLASM' 'bgColor' 'white'  'extra' { 'maxValue' 100 'minValue' 0 'splitNumber' 5  'alertBlink' true 'alertFontColor' 'yellow' 'alertBgColor' 'red' 'icon' 'temperature' } }
          }
          {
            'title' 'Mesure de température'
            'x' 9 'y' 0 'w' 3 'h' 2
            'type' 'sensor-gauge'
            'data' {
              'value' 67
              'alertMessage' 'Tourne trop vite'
            }
            'options' { 'unit' 'rpm' 'scheme' 'ECTOPLASM' 'bgColor' 'white'  'extra' { 'maxValue' 100 'minValue' 0 'splitNumber' 5  'alertBlink' true 'alertFontColor' 'yellow' 'alertBgColor' 'red' 'icon' 'fan' } }
          }
        ]
      }
      </discovery-dashboard>
  </body>
</html>
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

## License

Distributed under the MIT License. See LICENSE.txt for more information.

(back to top)

## Contact
TALBOURDET Julien - https://hexa-ai.fr - contact@hexa-ai.fr

Project Link: https://github.com/Hexa-ai/discovery-plugin-sensor-gauge
