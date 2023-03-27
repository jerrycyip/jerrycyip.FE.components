/* 
Use IFFE for module pattern and privatizing vars 
to avoid global scope collisions via closures
*/
(() => {
    // configurable light specs
    const config = {
        red: {
            backgroundColor: 'red',
            duration: 2400,
            next: 'green',
        },
        yellow: {
            backgroundColor: 'yellow',
            duration: 700,
            next: 'red',
        },
        green: {
            backgroundColor: 'green',
            duration: 2200,
            next: 'yellow',
        },
    };

    // create traffic light with color red in horizontal layout 
    trafficLight(document.getElementById('traffic-light'), {
        initialColor: 'red',
        config,
        layout: 'vertical',
    });
    // create traffic light with color red in verticial layout
    trafficLight(document.getElementById('traffic-light-2'), {
        initialColor: 'red',
        config,
        layout: 'horizontal',
    });

    //main fn to create overall traffic light container and lights
    function trafficLight($rootEl, { initialColor, config, layout },) {
        let currentColor = initialColor //  initialize color
        const $containerEl = document.createElement('div'); // create traffic light container
        $containerEl.classList.add('traffic-light-container'); // set base styling
        $containerEl.setAttribute('aria-live', 'polite'); // set a11y notification of current active light
    
        if (layout === 'vertical') { // change flex-direction to column if vertical
            $containerEl.classList.add(
                'traffic-light-container--vertical',
            );
        };
        
        let timer = null; // initialize timer for timeout assignment s.t. it can be cleared for tab/window closure

        $rootEl.append($containerEl); // append traffic light container to root element
        renderLoop();  // call render loop to render traffic light

        function renderLoop() {
            render(); // renders traffic light
            setTransition(); // sets transition to next light w/ timer
        }

        // fn to render traffic light    
        function render() {
            // Using .innerHTML is safe here since it's non-user content that we trust
            $containerEl.innerHTML = ''; // tear down any prior renders
            $containerEl.setAttribute(
                'aria-label', `Current light: ${currentColor}`, // a11y notify of current light color
            );            
            Object.keys(config).forEach((color) => { 
                $containerEl.append( // create and append each light
                    light({backgroundColor:
                      color === currentColor  // ternary operator
                      ? config[color].backgroundColor // assign if it's current color
                      : undefined, // else defaults to grey
                    }))
            })
        }
        
        // define fn to create single traffic light 
        function light({backgroundColor }) {
            const $lightEl = document.createElement('div');
            $lightEl.classList.add('traffic-light');
            $lightEl.setAttribute('aria-hidden', true); // a11y silenced for indiv light components

            // set background color for current light only; rest remain grey
            if (backgroundColor != null) {
                $lightEl.style.backgroundColor = backgroundColor;
            }
            return $lightEl;
        }

        function setTransition(){
            const { duration, next } = config[currentColor]; // get duration and next light
            timer = setTimeout(() => { // set timer based on config vals
                currentColor = next; // updates to next color
                renderLoop(); // restarts render loop
            }, duration);  // timer based on config duration
        }

        // good practice to clear the timer whenever tab/window is closed via listener 
        // of beforeunload events -- prevents memory leaks espec. in older browsers
        window.addEventListener('beforeunload', () => {
            window.clearInterval(timer);
        });
    }

})();