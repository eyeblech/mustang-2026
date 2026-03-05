// ===========================
// SCROLL FADE ANIMATION
// ===========================

const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));


// ===========================
// MAP INITIALIZATION
// ===========================

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("map")) {

        var map = L.map('map').setView([27.7, 84.0], 7);

        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            { attribution: '&copy; OpenStreetMap' }
        ).addTo(map);

        // Mustang Trip Route
        var route = [
            [26.4525, 87.2718], // Biratnagar
            [28.2096, 83.9856], // Pokhara
            [28.7815, 83.7285], // Jomsom
            [28.8390, 83.7590], // Muktinath
            [28.7840, 83.7090], // Marpha
            [27.9375, 84.4197], // Bandipur
            [27.5291, 84.3542]  // Chitwan
        ];

        // Draw route line
        var polyline = L.polyline(route, {
            color: '#00ffc8',
            weight: 5,
            opacity: 0.9
        }).addTo(map);

        // Add location markers
        route.forEach(function(point) {
            L.circleMarker(point, {
                radius: 6,
                fillColor: "#00ffc8",
                color: "#00ffc8",
                fillOpacity: 1
            }).addTo(map);
        });

        map.fitBounds(polyline.getBounds());
    }

});


// ===========================
// SIMPLE IMAGE LIGHTBOX
// ===========================

document.addEventListener("click", function(e) {

    if (e.target.tagName === "IMG" && e.target.closest(".masonry")) {

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.9)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = 9999;

        const img = document.createElement("img");

        img.src = e.target.src;
        img.style.maxWidth = "90%";
        img.style.maxHeight = "90%";
        img.style.borderRadius = "10px";

        overlay.appendChild(img);

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
            overlay.remove();
        });

    }

});