function extractTimes(text) {
    const matcher = /\d{1,2}:\d{2}/g;
    const stringTimes = text.match(matcher);

    return stringTimes.map(t => {
        const pieces = t.trim().split(':');

        return {
            hour: parseInt(pieces[0], 10),
            min: parseInt(pieces[1], 10)
        };
    });
}

var allEvents = (function() {
    const $venueSchedules = document.getElementsByClassName('gc-venue');
    const timeMatcher = /\d{1,2}:\d{2}/g;

    const stagedEvents = Array.prototype.map.call($venueSchedules, $sched => {
        const $events = $sched.getElementsByClassName('gc-infos');

        return Array.prototype.map.call($events, $e => {
            const $artistName = $e.getElementsByClassName('gc-timeline-event-title')[0];
            const $times = $e.getElementsByClassName('gc-timeline-event-time')[0];

            const times = extractTimes($times.innerText);

            return {
                artist: $artistName.innerText,
                start_time: times[0],
                end_time: times[1]
            };
        });
    });

    stagedEvents[0].map(x => x.stage = 'big_apple');
    stagedEvents[1].map(x => x.stage = 'govball_nyc');
    stagedEvents[2].map(x => x.stage = 'bacardi_house');
    stagedEvents[3].map(x => x.stage = 'honda');

    return [...stagedEvents[0], ...stagedEvents[1], ...stagedEvents[2], ...stagedEvents[3]];
})();
