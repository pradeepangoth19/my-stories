// Reasons database
        const reasons = [
            { 
                text: "You’re such a kind and wonderful person, and I feel lucky to share such a good bond with you. 💖", 
                emoji: "🌟",
                gif: "gif1.gif"
            },
            { 
                text: "May your day be filled with love, laughter, and endless joy. 🌸 ", 
                emoji: "💗",
                gif: "gif2.gif"
            },
            { 
                text: "Wishing you success, happiness, and everything your heart desires. ✨ ", 
                emoji: "💕",
                gif: "gif1.gif"
            },
            { 
                text: "Stay the amazing girl you are—always spreading positivity around. Have the happiest year ahead! 🥳 ", 
                emoji: "🌟",
                gif: "gif2.gif"
            }
        ];

        // State management
        let currentReasonIndex = 0;
        const reasonsContainer = document.getElementById('reasons-container');
        const shuffleButton = document.querySelector('.shuffle-button');
        const reasonCounter = document.querySelector('.reason-counter');
        let isTransitioning = false;

        // --- PERSISTENT BACKGROUND AUDIO SETUP ---
        let bgAudio = window.parent.bgAudio || document.getElementById('persistent-bg-audio');
        if (!bgAudio) {
            bgAudio = new Audio('./song2.mp3');
            bgAudio.id = 'persistent-bg-audio';
            bgAudio.loop = true;
            
            const savedTime = localStorage.getItem('bgAudioTime');
            const isPlaying = localStorage.getItem('bgAudioPlaying');
            
            if (savedTime) {
                bgAudio.currentTime = parseFloat(savedTime);
            }
            
            if (isPlaying === 'true') {
                bgAudio.play().catch(() => {});
            }
            
            setInterval(() => {
                if (!bgAudio.paused) {
                    localStorage.setItem('bgAudioTime', bgAudio.currentTime);
                }
            }, 500);
        }

        // Create reason card with gif
        function createReasonCard(reason) {
            const card = document.createElement('div');
            card.className = 'reason-card';
            
            const text = document.createElement('div');
            text.className = 'reason-text';
            text.innerHTML = `${reason.emoji} ${reason.text}`;
            
            const gifOverlay = document.createElement('div');
            gifOverlay.className = 'gif-overlay';
            gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
            
            card.appendChild(text);
            card.appendChild(gifOverlay);
            
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "back.out"
            });

            return card;
        }

        // Display initial card right away
        window.addEventListener('DOMContentLoaded', () => {
            const initialCard = createReasonCard(reasons[0]);
            reasonsContainer.appendChild(initialCard);
            currentReasonIndex = 1;
        });

        // Display new reason
        function displayNewReason() {
            if (isTransitioning) return;
            isTransitioning = true;

            if (currentReasonIndex < reasons.length) {
                const card = createReasonCard(reasons[currentReasonIndex]);
                reasonsContainer.appendChild(card);
                
                // Update counter
                reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
                
                currentReasonIndex++;

                // Check if we should transform the button
                if (currentReasonIndex === reasons.length) {
                    gsap.to(shuffleButton, {
                        scale: 1.1,
                        duration: 0.5,
                        ease: "elastic.out",
                        onComplete: () => {
                            shuffleButton.textContent = "Enter Our Storylane 💫";
                            shuffleButton.classList.add('story-mode');
                            shuffleButton.addEventListener('click', () => {
                                bgAudio.play().then(() => {
                                    localStorage.setItem('bgAudioPlaying', 'true');
                                    localStorage.setItem('bgAudioTime', bgAudio.currentTime);
                                }).catch(() => {});

                                gsap.to('body', {
                                    opacity: 0,
                                    duration: 1,
                                    onComplete: () => {
                                        window.location.href = 'last2.html';
                                    }
                                });
                            });
                        }
                    });
                }

                createFloatingElement();
                
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            } else {
                window.location.href = "#storylane";
            }
        }

        // Initialize button click
        shuffleButton.addEventListener('click', () => {
            if (!shuffleButton.classList.contains('story-mode')) {
                gsap.to(shuffleButton, {
                    scale: 0.9,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
                displayNewReason();
            }
        });

        // Floating elements function
        function createFloatingElement() {
            const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
            const element = document.createElement('div');
            element.className = 'floating';
            element.textContent = elements[Math.floor(Math.random() * elements.length)];
            element.style.left = Math.random() * window.innerWidth + 'px';
            element.style.top = Math.random() * window.innerHeight + 'px';
            element.style.fontSize = (Math.random() * 20 + 10) + 'px';
            document.body.appendChild(element);

            gsap.to(element, {
                y: -500,
                duration: Math.random() * 10 + 10,
                opacity: 0,
                onComplete: () => element.remove()
            });
        }

        // Custom cursor
        const cursor = document.querySelector('.custom-cursor');
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX - 15,
                y: e.clientY - 15,
                duration: 0.2
            });
        });

        setInterval(createFloatingElement, 2000);