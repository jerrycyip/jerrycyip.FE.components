// IFFE best practice to prevent global namespace var collision via private vars
// also ensures module pattern (pre ES6 modules)
(() => {    
    // non-changing const vars & config vars
    const MS_IN_SECOND = 1000;
    const SECONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;
    const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;
    const MS_IN_HOUR = MINUTES_IN_HOUR * MS_IN_MINUTE;

    // invoke stopwatch by calling main function on stopwatch as root Element
    stopWatch(document.getElementById('stopwatch'));
    
    // main function for stopWatch component
    // $ prefix convention for params/vars to indicate DOM elems and ensure familiar syntax with legacy jquery APIs
    function stopWatch($rootEl){
        let timerId = null; // Timer ID of the active interval, if one is running
        let lastTickTime = null; // last date time recorded
        let totalDuration = 0; // start at 0, = current time - lastTickTime
        
        // elements of stopwatch face
        const $DOM = {
            container: document.createElement('div'),
            timeDisplay: document.createElement('button'), // button: allows a11y e.g. focus, keyboard support
            timeInner: document.createElement('div'),  // stopwatch time values
            startStopButton: document.createElement('button'),
            resetButton: document.createElement('button'),
        };

        init(); // initialize stopwatch creation
        attachListeners(); // attach event listeners
        renderTime(); // render (update) time (called in addition to w/in init() func in case interval is large)

        // fn to initialize stopwatch features that persist across component lifecycle
        function init() {
            $DOM.container.append($DOM.timeDisplay);
            $DOM.timeDisplay.classList.add('time');
            $DOM.timeDisplay.append($DOM.timeInner);
            $DOM.timeInner.classList.add('time-inner');

            // b/c the time digits are constantly being re-rendered via the updateTime() loop, 
            // the digits don't respond to clicks well. As workaround, we add a persistent DOM 
            // element to cover the digits and ensure that all the clicks go through.
            const $cover = document.createElement('span');
            $DOM.timeDisplay.append($cover);
            $cover.classList.add('time-cover');

            // set event listener for clicks on face of stopwatch to toggle start/stop
            $DOM.startStopButton.classList.add('stopwatch-button');
            $DOM.resetButton.classList.add('stopwatch-button');
            $DOM.startStopButton.textContent = 'Start'; // button initial text = Start
            $DOM.resetButton.textContent = 'Reset';

            const $buttonContainerEl = document.createElement('div');
            $buttonContainerEl.append(
                $DOM.startStopButton,
                $DOM.resetButton,
            );
            
            $buttonContainerEl.classList.add('button-container');
            $DOM.container.append($buttonContainerEl);

            $rootEl.append($DOM.container);
            renderTime();
        }

        // func to render (i.e. update latest) elapsed time on stopwatch
        function renderTime(){
            $DOM.timeInner.innerHTML = ''; // clear last time values (teardown any prior renders)
            const formattedTime = formatTime(totalDuration);
            
            if (formattedTime.hours > 0) {
                $DOM.timeInner.append(
                    timeSegment(formattedTime.hours, 'h'),
                );
            }

            if (formattedTime.minutes > 0) {
                $DOM.timeInner.append(
                    timeSegment(formattedTime.minutes, 'm'),
                );
            }

            $DOM.timeInner.append(
                timeSegment(formattedTime.seconds, 's'),
            );

            $DOM.timeInner.append(
                timeSegment(
                    // convert to hundredths of seconds w/ leading 0 if nec
                    padTwoDigits(Math.trunc(formattedTime.ms / 10)), 
                    null,
                    true,
                )
            );
        }

        function formatTime(timeParam) {
            let time = timeParam;
            const parts = {
                hours: 0,
                minutes: 0,
                seconds: 0,
                ms: 0,
            }

            if (time > MS_IN_HOUR) {
                // can alternatively use Math.floor, but slower                
                parts.hours = Math.trunc(time / MS_IN_HOUR); // Calc hrly comp.
                time %= MS_IN_HOUR;
            }

            if (time > MS_IN_MINUTE) {
                parts.minutes = Math.trunc(time / MS_IN_MINUTE);
                time %= MS_IN_MINUTE;
            }

            if (time > MS_IN_SECOND) {
                parts.seconds = Math.trunc(time / MS_IN_SECOND);
                time %= MS_IN_SECOND;
            }

            parts.ms = time; // remaining time is milliseconds
            return parts;
        }

        // func to create each hr, min, sec, millisec display w/ units and styling
        function timeSegment(value, unit, isSmall=false) {
            const $containerEl = document.createElement('span');

            const $digitEl = document.createElement('span');
            $digitEl.classList.add('time-number');
            $digitEl.textContent = value;
            if (isSmall) {
                $digitEl.classList.add('time-number--small')
            }
            $containerEl.append($digitEl);
            
            if (unit !== null) {
                const $unitEl = document.createElement('span');
                $unitEl.classList.add('time-unit');
                $unitEl.textContent = unit;
                $containerEl.append($unitEl);
            }

            return $containerEl;
        }

        function padTwoDigits(number) {
            return number >= 10 ? String(number) : `0${number}`;
        }


        // fn to attach event listeners (defines behavior for all user interactions)
        function attachListeners() {
            // set event listener for clicks on face of stopwatch to toggle start/stop
            $DOM.timeDisplay.addEventListener('click', () => {
                toggleTimer();
            });

            // set event listener for clicks on start/stop button to toggle start/stop
            $DOM.startStopButton.addEventListener('click', () => {
                toggleTimer();
            });

            $DOM.resetButton.addEventListener('click', () => {
                resetTimer();
            });
            // good practice to clear the timer whenever tab/window is closed via listener 
            // for beforeunload events -- prevents memory leaks espec. in older browsers
            window.addEventListener('beforeunload', () => {
                window.clearInterval(timerId);
            });
        }

        function toggleTimer(){
            if (timerId !== null) {
                stopInterval();
            } else {
                startTimer();
            }
        }

        function stopInterval() {
            window.clearInterval(timerId);
            timerId = null; // reset timerId
            $DOM.startStopButton.textContent = 'Start'; // flip the button text
        }

        function startTimer() {
            lastTickTime = Date.now();
            timerId = window.setInterval(() => {
                tick();
            }, 1);
            $DOM.startStopButton.textContent = 'Stop'; // flip the button text
        }

        function tick() {
            const now = Date.now();
            const timePassed = now - lastTickTime; // calc manually b/c setInterval not reliable
            totalDuration += timePassed; // update w/ calculated value
            lastTickTime = now;
            renderTime();
        }

        function resetTimer() {
            stopInterval();
            totalDuration = 0; // reset to 0
            renderTime();
        }

    }

})()


// // IFFE best practice to prevent global namespace var collision via private vars
// // also ensures module pattern (pre ES6 modules)
// (() => {
    
//     // non-changing constant vars:
//     const MS_IN_SECOND = 1000;
//     const SECONDS_IN_MINUTE = 60;
//     const MINUTES_IN_HOUR = 60;
//     const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;
//     const MS_IN_HOUR = MINUTES_IN_HOUR * MS_IN_MINUTE; 

//     // invoke stopwatch by calling main function on stopwatch as root Element
//     stopwatch(document.getElementById('stopwatch'));
    
//     // main function for stopWatch component
//     // $ prefix convention for params/vars to indicate DOM elems and ensure familiar syntax with legacy jquery APIs
//     function stopwatch($rootEl) {
//         let timerId = null; // Timer ID of the active interval, if one is running
//         let lastTickTiming = null; // last date time recorded
//         let totalDuration = 0; // calc based on latest time - lastTickTiming
//         // elements of stopwatch face
//         const $DOM = {
//             container: document.createElement('div'),
//             timeDisplay: document.createElement('button'), // button: allows a11y e.g. focus, keyboard support
//             timeInner: document.createElement('div'), // stopwatch time values
//             startStopButton: document.createElement('button'),
//             resetButton: document.createElement('button'),
//         };

//         init(); // initialize stopwatch creation
//         $rootEl.append($DOM.container);

//         // fn to initialize stopwatch features that persist across component lifecycle
//         function init() {
//             $DOM.container.append($DOM.timeDisplay);
//             $DOM.timeDisplay.classList.add('time');
//             $DOM.timeDisplay.append($DOM.timeInner);
//             $DOM.timeInner.classList.add('time-inner');

//             // b/c the time digits are constantly being re-rendered via the updateTime() loop, 
//             // the digits don't respond to clicks well. As workaround, we add a persistent DOM 
//             // element to cover the digits and ensure that all the clicks go through.
//             const $cover = document.createElement('span');
//             $DOM.timeDisplay.append($cover);
//             $cover.classList.add('time-cover');

//             // set event listener for clicks on face of stopwatch to toggle start/stop
//             $DOM.timeDisplay.addEventListener('click', () => { 
//                 toggleTimer();
//             });

//             $DOM.startStopButton.classList.add('stopwatch-button');
//             $DOM.startStopButton.textContent = 'Start'; // button initial text = Start
//             // set event listener for clicks on start/stop button to toggle start/stop
//             $DOM.startStopButton.addEventListener('click', () => {
//                 toggleTimer();
//             });
            
//             $DOM.resetButton.classList.add('stopwatch-button');
//             $DOM.resetButton.textContent = 'Reset';
//             $DOM.resetButton.addEventListener('click', () => {
//                 resetTimer();
//             });

//             const $buttonContainerEl = document.createElement('div');
//             $buttonContainerEl.append(
//                 $DOM.startStopButton,
//                 $DOM.resetButton,
//             );
//             $buttonContainerEl.classList.add('button-container');
//             $DOM.container.append($buttonContainerEl);
            
//             updateTime();
//         }

//         function toggleTimer() {
//             if (timerId != null) {
//                 stopInterval();
//             } else {
//                 startTimer();
//             }
//         } 
        
//         function stopInterval() {
//             window.clearInterval(timerId);
//             timerId = null; // reset timerId
//             $DOM.startStopButton.textContent = 'Start'; // flip the button text
//         }

//         function startTimer() {
//             lastTickTiming = Date.now();
//             timerId = window.setInterval(() => {
//                 tick();
//             }, 1);
//             $DOM.startStopButton.textContent = 'Stop'; // flip the button text
//         }

//         function tick() {
//             const now = Date.now();
//             const timePassed = now - lastTickTiming; // calc manually b/c setInterval not reliable
//             totalDuration += timePassed; // update w/ calc value
//             lastTickTiming = now;
//             updateTime();
//         }

//         function resetTimer() {
//             stopInterval();
//             totalDuration = 0; // reset to 0
//             updateTime();
//         }

//         // func to update latest (render) elapsed time on stopwatch
//         function updateTime() {
//             $DOM.timeInner.innerHTML = '' ; // clear last time values (teardown any prior renders)
//             const formattedTime = formatTime(totalDuration);
//             if (formattedTime.hours > 0) {
//                 $DOM.timeInner.append(
//                     timeSegment(formattedTime.hours, 'h'),
//                 );
//             }

//             if (formattedTime.minutes > 0) {
//                 $DOM.timeInner.append(
//                     timeSegment(formattedTime.minutes, 'm'),
//                 );
//             }

//             $DOM.timeInner.append(
//                 timeSegment(formattedTime.seconds, 's'),
//             );

//             $DOM.timeInner.append(
//                 timeSegment(
//                     padTwoDigit(Math.trunc(formattedTime.ms / 10)), // convert to hundredths of seconds w/ leading 0 if nec
//                     null,
//                     true,
//                 ),
//             );
//         }
//         // good practice to clear the timer whenever tab/window is closed via listener 
//         // for beforeunload events -- prevents memory leaks espec. in older browsers
//         window.addEventListener('beforeunload', () => {
//             window.clearInterval(timerId);
//         });  
//     }

//     function formatTime(timeParam) {
//         let time = timeParam;
//         const parts = {
//             hours: 0,
//             minutes: 0,
//             seconds: 0,
//             ms: 0,
//         };
//         if (time > MS_IN_HOUR) {
//             // can alternatively use Math.floor, but slower            
//             parts.hours = Math.trunc(time / MS_IN_HOUR); // Calc hrly comp.
//             time %= MS_IN_HOUR;
//         }

//         if (time > MS_IN_MINUTE) {
//             parts.minutes = Math.trunc(time / MS_IN_MINUTE); 
//             time %= MS_IN_MINUTE;
//         }

//         if (time > MS_IN_SECOND) {
//             parts.seconds = Math.trunc(time / MS_IN_SECOND );
//             time %= MS_IN_SECOND;
//         }

//         parts.ms = time; // remaining time is milliseconds
//         return parts;
//     }
    
//     // func to create each hr, min, sec, millisec display w/ units and styling
//     function timeSegment(value, unit, isSmall=false) {
//         const $containerEl = document.createElement('span');

//         const $digitEl = document.createElement('span');
//         $digitEl.classList.add('time-number');
//         $digitEl.textContent = value;
//         if (isSmall) {
//             $digitEl.classList.add('time-number--small');
//         }
//         $containerEl.append($digitEl);

//         if (unit != null) {
//             const $unitEl = document.createElement('span');
//             $unitEl.classList.add('time-unit');
//             $unitEl.textContent = unit;
//             $containerEl.append($unitEl);
//         }

//         return $containerEl;
//     }

//     function padTwoDigit(number) {
//         return number >= 10 ? String(number) : `0${number}`;
//     }

// })();