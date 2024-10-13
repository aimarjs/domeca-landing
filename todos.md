# TODO

## Form business logic

1. If passengers > 40 disable premium bus pricing
2. if passengers < 40 and premium bus selected double the calculated price (because of two premium buses with 20 seats will be sent)

3. if passengers < 9 = Renault Traffic
4. if passengers < 9 = disable premium pricing

## UI

1. Fix locations when going back to first form page. Currently it cleans location fields.
    - cache location data
2. Trip Details Form (UX improvements)
    - [ ] First location label "Algusekoht"
    - [ ] Second location label "Sihtkoht"
        - [ ] Two buttons : "Soovid lisada vahepeatust?" / "Tagasi alguskohta?"
        - [ ] If "Soovid lisada vahepeatust?" is clicked, add another location field with label "Vahepeatus 1" - placeholder "Vahepeatuse aadress" etc.
        - [ ] If "Tagasi alguskohta?" is clicked, add same location as first location
            - [ ] Add Trip end date and time field to the form
3. Add Trip Additional Information form
    - [ ] give customer a chance to add additional information about the trip if necessary