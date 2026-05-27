/* ==========================================================================
   KweeraX LLC - Interactive Engine (2026)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initFaqAccordions();
    initPaymentScrollSync();
    injectLiveDynamicCounter();
    revealOnScroll(); // Triggers display check immediately on initialization
    initDeadlineCountdown();
});

/**
 * 1. Smooth FAQ Accordion Interactions
 * Converts text into functional sliding panels.
 */
function initFaqAccordions() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector("h4");
        const answer = item.querySelector("p");

        question.style.cursor = "pointer";
        question.style.display = "flex";
        question.style.justifyContent = "space-between";
        question.style.alignItems = "center";
        question.innerHTML += ` <span class="faq-icon" style="transition: transform 0.3s; color: var(--electric-blue);">+</span>`;
        
        answer.style.maxHeight = "0";
        answer.style.overflow = "hidden";
        answer.style.transition = "max-height 0.3s ease-out, margin-top 0.3s";
        answer.style.marginTop = "0";

        const icon = question.querySelector(".faq-icon");

        question.addEventListener("click", () => {
            const isOpen = answer.style.maxHeight !== "0px";
            
            document.querySelectorAll(".faq-item p").forEach(p => p.style.maxHeight = "0");
            document.querySelectorAll(".faq-icon").forEach(i => i.style.transform = "rotate(0deg)");

            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.marginTop = "10px";
                icon.style.transform = "rotate(45deg)";
            } else {
                answer.style.maxHeight = "0";
                answer.style.marginTop = "0";
                icon.style.transform = "rotate(0deg)";
            }
        });
    });
}

/**
 * 2. Payment-to-Portal Sync Safeguard
 * Directs focus down to the submission workflow card following click activations.
 */
function initPaymentScrollSync() {
    const momoButtons = document.querySelectorAll(".momo-btn");
    const portalCard = document.querySelector(".portal-card");

    momoButtons.forEach(button => {
        button.addEventListener("click", () => {
            setTimeout(() => {
                portalCard.scrollIntoView({ behavior: "smooth", block: "center" });
                
                portalCard.style.transition = "transform 0.3s, border-color 0.3s";
                portalCard.style.transform = "scale(1.03)";
                portalCard.style.borderColor = "var(--neon-green)";
                
                setTimeout(() => {
                    portalCard.style.transform = "scale(1)";
                }, 300);
            }, 1500);
        });
    });
}

/**
 * 3. Live Order Scarcity Ticker
 * Injects urgency details natively into upper header status bars.
 */
function injectLiveDynamicCounter() {
    const statusTicker = document.querySelector(".status-ticker");
    if (!statusTicker) return;

    const counterSpan = document.createElement("span");
    counterSpan.style.marginLeft = "10px";
    counterSpan.style.paddingLeft = "10px";
    counterSpan.style.borderLeft = "1px solid rgba(34, 197, 94, 0.3)";
    counterSpan.style.color = "var(--text-main)";
    
    let availableSlots = Math.floor(Math.random() * (14 - 8 + 1)) + 8;
    counterSpan.innerHTML = `🔥 Only <strong>${availableSlots} Slots</strong> Left Today`;
    statusTicker.appendChild(counterSpan);

    setInterval(() => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        availableSlots += change;
        if (availableSlots < 3) availableSlots = 5;
        if (availableSlots > 15) availableSlots = 12;
        counterSpan.innerHTML = `🔥 Only <strong>${availableSlots} Slots</strong> Left Today`;
    }, 12000);
}

/**
 * 4. Scroll Reveal Engine
 * Measures screen positions to animate sections up smoothly during display scroll actions.
 */
window.addEventListener("scroll", revealOnScroll);

function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

/**
 * 5. Target Deadline Countdown Engine
 */
function initDeadlineCountdown() {
    const targetDate = new Date("July 14, 2026 23:59:59").getTime();

    function updateClock() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            document.querySelector(".countdown-section").innerHTML = "<h3>🚨 The Intake Portal is Officially Closed!</h3>";
            clearInterval(clockInterval);
            return;
        }

        const msPerSec = 1000;
        const msPerMin = msPerSec * 60;
        const msPerHour = msPerMin * 60;
        const msPerDay = msPerHour * 24;
        const msPerWeek = msPerDay * 7;

        const weeks = Math.floor(difference / msPerWeek);
        const days = Math.floor((difference % msPerWeek) / msPerDay);
        const hours = Math.floor((difference % msPerDay) / msPerHour);
        const minutes = Math.floor((difference % msPerHour) / msPerMin);
        const seconds = Math.floor((difference % msPerMin) / msPerSec);

        document.getElementById("weeks").textContent = String(weeks).padStart(2, "0");
        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
}
