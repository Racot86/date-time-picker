
<body>
# date-time-picker
final version

<h1>custom element: date-time-picker</h1>
<p>
Setup:
1. date-time-picker.css - to place together with index.html(do not rename css)
2. Add Script to the body:
        
    <script src="date-time-picker.js"></script>

</p>

<p>
HTML declaration:

    <date-time-picker></date-time-picker>
    
</p>
<p>Attributes:</p>
    <ul>
        <li>height - integer. Passing to CSS. declaring height of picker in px. </li>
        <li>slots-before - integer.Sslots before value.</li>
        <li>slots-after - integer. Slots after value.</li>
        <li> step - String Values: </li>
                    <ul>
                    <li>1. 7minute - 7 minute step</li>
                    <li>2. hour - 1 hour step</li>
                    <li>3. 6hour - 6 hour step</li>
                    <li>4. day  - 1 day step</li>
                    <li>5. 3day - 3 days step</li>
                    <li>6. week - 1 week step</li>
                    <li>7. 3week - 3 weeks step</li>
                    <li>8. month - 1 month step</li>
                    <li>9. 2month - 2 month step</li>
                    <li>10. 6month - 6 month step</li>
                    <li>11. year - 1 year step</li>
                    </ul>
        </li>
    <li>color - String. Basic coloring palette: Values: danger,warning, success. If no attribute - deafult pallete</li>
    </ul>
JS:
Updating of picker value by use of changing of its attribute "value". Value Date w/o parsing
Getting value of picker using event listener with custom event "value-changed" value kept in "event.detail.value"

</body>
