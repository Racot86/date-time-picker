# date-time-picker
final version

<h1>custom element: date-time-picker</h1>
Setup:
1. date-time-picker.css - to place together with index.html(do not rename css)
2. Add Script to the body:
    <script src="date-time-picker.js"></script>

HTML declaration:
<date-time-picker></date-time-picker>

Attributes:
    height - integer. Passing to CSS. declaring height of picker in px. 
    slots-before - integer.Sslots before value.
    slots-after - integer. Slots after value.
    step - String Values: 
                    1. 7minute - 7 minute step
                    2. hour - 1 hour step
                    3. 6hour - 6 hour step
                    4. day  - 1 day step
                    5. 3day - 3 days step
                    6. week - 1 week step
                    7. 3week - 3 weeks step
                    8. month - 1 month step
                    9. 2month - 2 month step
                    10. 6month - 6 month step
                    11. year - 1 year step
    color - String. Basic coloring palette: Values: danger,warning, success. If no attribute - deafult pallete

JS:
Updating of picker value by use of changing of its attribute "value". Value Date w/o parsing
Getting value of picker using event listener with custom event "value-changed" value kept in "event.detail.value"

