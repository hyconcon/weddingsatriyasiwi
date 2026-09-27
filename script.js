/* =========================================================
   CONFIGURATION
========================================================= */

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzc8ypaEaKywriXYzc318iE6diOzxJNCUBs3n2uEkf8pRzc8-9eRv5ClbY5zk-sRFKY/exec";


/* =========================================================
   GLOBAL
========================================================= */

document.body.classList.add(
    "invitation-locked"
);


/* =========================================================
   GUEST NAME
   Contoh:
   ?to=Eoni
========================================================= */

function getGuestName() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const guest =
        params.get("to");

    const guestElement =
        document.getElementById(
            "guest"
        );

    if (!guestElement) {
        return;
    }

    if (
        guest &&
        guest.trim() !== ""
    ) {

        guestElement.textContent =
            guest
                .replace(/\+/g, " ")
                .trim();

    }

}


/* =========================================================
   OPEN INVITATION
========================================================= */

const openInvitation =
    document.getElementById(
        "openInvitation"
    );

const cover =
    document.getElementById(
        "cover"
    );

const music =
    document.getElementById(
        "music"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );


let invitationOpened =
    false;


if (openInvitation) {

    openInvitation.addEventListener(
        "click",
        () => {

            if (invitationOpened) {
                return;
            }

            invitationOpened = true;


            document.body.classList.remove(
                "invitation-locked"
            );


            if (cover) {

                cover.classList.add(
                    "cover-opened"
                );

            }


            /*
             * Musik mulai setelah
             * tombol dibuka.
             */

            if (music) {

                music.volume = 0.35;

                music.play()
                    .then(() => {

                        musicButton?.classList.add(
                            "playing"
                        );

                        if (musicButton) {
                            musicButton.textContent =
                                "♫";
                        }

                    })
                    .catch(() => {

                        console.log(
                            "Browser memblokir autoplay."
                        );

                    });

            }


            /*
             * Scroll sedikit menuju opening.
             */

            setTimeout(
                () => {

                    const opening =
                        document.getElementById(
                            "opening"
                        );

                    if (opening) {

                        opening.scrollIntoView({
                            behavior:
                                "smooth"
                        });

                    }

                },
                550
            );

        }
    );

}


/* =========================================================
   MUSIC BUTTON
========================================================= */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        () => {

            if (!music) {
                return;
            }


            if (music.paused) {

                music.play()
                    .then(() => {

                        musicButton.textContent =
                            "♫";

                        musicButton.classList.add(
                            "playing"
                        );

                    })
                    .catch(() => {});

            } else {

                music.pause();

                musicButton.textContent =
                    "♪";

                musicButton.classList.remove(
                    "playing"
                );

            }

        }
    );

}


/* =========================================================
   FADE IN / REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            (
                entries
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "show"
            );

        }
    );

}


/* =========================================================
   COUPLE SLIDER
   SATU-SATU + CROSSFADE
========================================================= */

const coupleData = [

    {
        role:
            "MEMPELAI WANITA",

        name:
            "Margareta Septa Prima Siwi",

        parents:
            "Putri dari<br>Bapak Wasikin & Ibu Kristiyaningsih",

        image:
            "images/siwi.jpg"
    },

    {
        role:
            "MEMPELAI LAKI-LAKI",

        name:
            "Ignatius Satriya Bagus Pradana",

        parents:
            "Putra dari<br>Bapak Arinto Subandoko Vinc & Ibu Theresia Maria Dwi Aryani",

        image:
            "images/satriya.jpg"
    }

];


let coupleIndex = 0;

let coupleTimer = null;


const couplePhoto =
    document.getElementById(
        "couplePhoto"
    );

const coupleRole =
    document.getElementById(
        "coupleRole"
    );

const coupleName =
    document.getElementById(
        "coupleName"
    );

const coupleParents =
    document.getElementById(
        "coupleParents"
    );

const coupleDots =
    document.querySelectorAll(
        ".couple-dot"
    );


function changeCouple(
    index
) {

    if (
        !couplePhoto ||
        !coupleRole ||
        !coupleName ||
        !coupleParents
    ) {
        return;
    }


    const person =
        coupleData[index];


    /*
     * Crossfade keluar.
     */

    couplePhoto.classList.add(
        "fade-photo"
    );


    setTimeout(
        () => {

            couplePhoto.src =
                person.image;

            couplePhoto.alt =
                person.name;


            coupleRole.textContent =
                person.role;


            coupleName.textContent =
                person.name;


            coupleParents.innerHTML =
                person.parents;


            coupleDots.forEach(
                (
                    dot,
                    dotIndex
                ) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex === index
                    );

                }
            );


            /*
             * Crossfade masuk.
             */

            requestAnimationFrame(
                () => {

                    couplePhoto.classList.remove(
                        "fade-photo"
                    );

                }
            );

        },
        450
    );

}


function nextCouple() {

    coupleIndex++;

    if (
        coupleIndex >=
        coupleData.length
    ) {

        coupleIndex = 0;

    }

    changeCouple(
        coupleIndex
    );

}


/*
 * Otomatis setiap 5 detik.
 */

coupleTimer =
    setInterval(
        nextCouple,
        5000
    );


/*
 * Klik dot.
 */

coupleDots.forEach(
    (dot) => {

        dot.addEventListener(
            "click",
            () => {

                coupleIndex =
                    Number(
                        dot.dataset.couple
                    );

                changeCouple(
                    coupleIndex
                );


                /*
                 * Reset timer supaya
                 * tidak langsung berganti.
                 */

                clearInterval(
                    coupleTimer
                );

                coupleTimer =
                    setInterval(
                        nextCouple,
                        5000
                    );

            }
        );

    }
);


/* =========================================================
   KISAH KAMI
========================================================= */

const storyTabs =
    document.querySelectorAll(
        ".story-tab"
    );

const storyPanels =
    document.querySelectorAll(
        ".story-panel"
    );


storyTabs.forEach(
    (tab) => {

        tab.addEventListener(
            "click",
            () => {

                const year =
                    tab.dataset.story;


                storyTabs.forEach(
                    (item) => {

                        item.classList.toggle(
                            "active",
                            item === tab
                        );

                    }
                );


                storyPanels.forEach(
                    (panel) => {

                        panel.classList.toggle(
                            "active",
                            panel.dataset.storyPanel ===
                            year
                        );

                    }
                );

            }
        );

    }
);


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate =
    new Date(
        "December 28, 2026 10:00:00 GMT+0700"
    ).getTime();


let previousCountdown = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null
};


function animateCountdownBox(
    id,
    value,
    previous
) {

    const element =
        document.getElementById(
            id
        );

    if (!element) {
        return;
    }


    element.textContent =
        value;


    if (
        previous !== null &&
        previous !== value
    ) {

        const box =
            element.closest(
                ".count-box"
            );

        if (box) {

            box.classList.remove(
                "count-pulse"
            );

            void box.offsetWidth;

            box.classList.add(
                "count-pulse"
            );

        }

    }

}


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (
        distance <= 0
    ) {

        animateCountdownBox(
            "days",
            "0",
            previousCountdown.days
        );

        animateCountdownBox(
            "hours",
            "00",
            previousCountdown.hours
        );

        animateCountdownBox(
            "minutes",
            "00",
            previousCountdown.minutes
        );

        animateCountdownBox(
            "seconds",
            "00",
            previousCountdown.seconds
        );

        return;

    }


    const totalSeconds =
        Math.floor(
            distance / 1000
        );


    const dayValue =
        Math.floor(
            totalSeconds /
            (60 * 60 * 24)
        );


    const hourValue =
        Math.floor(
            (
                totalSeconds %
                (60 * 60 * 24)
            ) /
            (60 * 60)
        );


    const minuteValue =
        Math.floor(
            (
                totalSeconds %
                (60 * 60)
            ) /
            60
        );


    const secondValue =
        totalSeconds %
        60;


    animateCountdownBox(
        "days",
        dayValue,
        previousCountdown.days
    );

    animateCountdownBox(
        "hours",
        String(
            hourValue
        ).padStart(
            2,
            "0"
        ),
        previousCountdown.hours
    );

    animateCountdownBox(
        "minutes",
        String(
            minuteValue
        ).padStart(
            2,
            "0"
        ),
        previousCountdown.minutes
    );

    animateCountdownBox(
        "seconds",
        String(
            secondValue
        ).padStart(
            2,
            "0"
        ),
        previousCountdown.seconds
    );


    previousCountdown = {

        days:
            dayValue,

        hours:
            String(
                hourValue
            ).padStart(
                2,
                "0"
            ),

        minutes:
            String(
                minuteValue
            ).padStart(
                2,
                "0"
            ),

        seconds:
            String(
                secondValue
            ).padStart(
                2,
                "0"
            )

    };

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   RSVP
========================================================= */

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );

const statusRsvp =
    document.getElementById(
        "statusRsvp"
    );

const submitRsvp =
    document.getElementById(
        "submitRsvp"
    );


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const nama =
                document.getElementById(
                    "nama"
                ).value.trim();


            const kehadiran =
                document.getElementById(
                    "kehadiran"
                ).value;


            const jumlah =
                document.getElementById(
                    "jumlah"
                ).value;


            if (
                !nama ||
                !kehadiran ||
                !jumlah
            ) {

                if (statusRsvp) {

                    statusRsvp.textContent =
                        "Mohon lengkapi data RSVP.";

                }

                return;

            }


            /*
             * Deadline RSVP.
             */

            const deadline =
                new Date(
                    "November 1, 2026 23:59:59 GMT+0700"
                );


            if (
                new Date() >
                deadline
            ) {

                if (statusRsvp) {

                    statusRsvp.textContent =
                        "Konfirmasi kehadiran telah melewati batas waktu.";

                }

                return;

            }


            if (submitRsvp) {

                submitRsvp.disabled =
                    true;

                submitRsvp.textContent =
                    "Mengirim...";

            }


            if (statusRsvp) {

                statusRsvp.textContent =
                    "Sedang mengirim RSVP...";

            }


            const data = {

                nama:
                    nama,

                kehadiran:
                    kehadiran,

                jumlah:
                    jumlah,

                ucapan:
                    ""

            };


            try {

                await fetch(
                    SCRIPT_URL,
                    {
                        method:
                            "POST",

                        body:
                            JSON.stringify(
                                data
                            )
                    }
                );


                if (statusRsvp) {

                    statusRsvp.textContent =
                        "Terima kasih, RSVP Anda sudah terkirim. 🤍";

                }


                /*
                 * Isi nama wishes otomatis.
                 */

                const wishNama =
                    document.getElementById(
                        "wishNama"
                    );


                if (wishNama) {

                    wishNama.value =
                        nama;

                }


                /*
                 * Counter visual.
                 */

                incrementRsvpCounter();


                /*
                 * Scroll ke wishes.
                 */

                setTimeout(
                    () => {

                        const wishes =
                            document.getElementById(
                                "wishes"
                            );

                        if (wishes) {

                            wishes.scrollIntoView({
                                behavior:
                                    "smooth"
                            });

                        }

                    },
                    800
                );


            } catch (error) {

                console.error(
                    "RSVP error:",
                    error
                );


                if (statusRsvp) {

                    statusRsvp.textContent =
                        "RSVP belum dapat dikirim. Silakan coba lagi.";

                }

            }


            if (submitRsvp) {

                submitRsvp.disabled =
                    false;

                submitRsvp.textContent =
                    "Kirim RSVP";

            }

        }
    );

}


/* =========================================================
   RSVP COUNTER
========================================================= */

const rsvpCounter =
    document.getElementById(
        "rsvpCounter"
    );


function animateNumber(
    element,
    target
) {

    if (!element) {
        return;
    }


    const start =
        Number(
            element.textContent
        ) || 0;


    const duration =
        700;


    const startTime =
        performance.now();


    function update(
        currentTime
    ) {

        const progress =
            Math.min(
                (
                    currentTime -
                    startTime
                ) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.round(
                start +
                (
                    target -
                    start
                ) *
                eased
            );


        element.textContent =
            value;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


function incrementRsvpCounter() {

    if (!rsvpCounter) {
        return;
    }


    const current =
        Number(
            rsvpCounter.textContent
        ) || 0;


    animateNumber(
        rsvpCounter,
        current + 1
    );


    const wrapper =
        rsvpCounter.closest(
            ".rsvp-counter"
        );


    if (wrapper) {

        wrapper.classList.remove(
            "counter-animate"
        );

        void wrapper.offsetWidth;

        wrapper.classList.add(
            "counter-animate"
        );

    }

}


/*
 * Animasi counter ketika section
 * pertama kali terlihat.
 */

let rsvpCounterAnimated =
    false;


if (
    rsvpCounter &&
    "IntersectionObserver"
    in window
) {

    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting &&
                            !rsvpCounterAnimated
                        ) {

                            rsvpCounterAnimated =
                                true;

                            /*
                             * Nilai awal visual.
                             *
                             * Tidak mengklaim sebagai
                             * jumlah RSVP database.
                             */

                            animateNumber(
                                rsvpCounter,
                                0
                            );

                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    counterObserver.observe(
        rsvpCounter
    );

}


/* =========================================================
   WEDDING WISHES
========================================================= */

const wishForm =
    document.getElementById(
        "wishForm"
    );

const wishList =
    document.getElementById(
        "wishList"
    );

const submitWish =
    document.getElementById(
        "submitWish"
    );


/*
 * Maksimal wishes yang ditampilkan.
 */

const MAX_WISHES = 20;


/* =========================================================
   ESCAPE HTML
   Mencegah teks user menjadi HTML.
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   LOAD WISHES
========================================================= */

async function loadWishes() {

    if (!wishList) {
        return;
    }


    try {

        const response =
            await fetch(
                SCRIPT_URL,
                {
                    method:
                        "GET",

                    cache:
                        "no-store"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Gagal mengambil wishes."
            );
        }


        const data =
            await response.json();


        if (
            !Array.isArray(data)
        ) {
            return;
        }


        /*
         * Ambil wishes saja.
         */

        const wishes =
            data
                .filter(
                    (item) =>
                        item &&
                        item.ucapan &&
                        String(
                            item.ucapan
                        ).trim() !== ""
                )
                .slice(
                    -MAX_WISHES
                )
                .reverse();


        wishList.innerHTML =
            "";


        wishes.forEach(
            (item) => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "wish-card";


                const safeName =
                    escapeHTML(
                        item.nama ||
                        "Tamu"
                    );


                const safeMessage =
                    escapeHTML(
                        item.ucapan ||
                        ""
                    );


                card.innerHTML = `
                    <h4>
                        ${safeName}
                    </h4>

                    <p>
                        ${safeMessage}
                    </p>
                `;


                wishList.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Gagal memuat wishes:",
            error
        );

    }

}


/* =========================================================
   SUBMIT WISH
========================================================= */

if (wishForm) {

    wishForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const wishNama =
                document
                    .getElementById(
                        "wishNama"
                    )
                    .value
                    .trim();


            const ucapan =
                document
                    .getElementById(
                        "ucapan"
                    )
                    .value
                    .trim();


            if (
                !wishNama ||
                !ucapan
            ) {

                return;

            }


            if (submitWish) {

                submitWish.disabled =
                    true;

                submitWish.textContent =
                    "Mengirim...";

            }


            try {

                await fetch(
                    SCRIPT_URL,
                    {
                        method:
                            "POST",

                        body:
                            JSON.stringify({

                                nama:
                                    wishNama,

                                kehadiran:
                                    "Wedding Wishes",

                                jumlah:
                                    "",

                                ucapan:
                                    ucapan

                            })
                    }
                );


                document
                    .getElementById(
                        "ucapan"
                    )
                    .value = "";


                /*
                 * Reload dari spreadsheet
                 * agar yang tampil adalah
                 * data yang benar-benar tersimpan.
                 */

                await loadWishes();


            } catch (error) {

                console.error(
                    "Gagal mengirim wishes:",
                    error
                );

            }


            if (submitWish) {

                submitWish.disabled =
                    false;

                submitWish.textContent =
                    "Kirim Ucapan";

            }

        }
    );

}


/* =========================================================
   COPY REKENING
========================================================= */

const copyButtons =
    document.querySelectorAll(
        ".copy-account"
    );


copyButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            async () => {

                const account =
                    button.dataset.account;


                if (!account) {
                    return;
                }


                try {

                    await navigator.clipboard.writeText(
                        account
                    );


                    const originalText =
                        button.textContent;


                    button.textContent =
                        "✓ Tersalin";


                    button.classList.add(
                        "copied"
                    );


                    setTimeout(
                        () => {

                            button.textContent =
                                originalText;

                            button.classList.remove(
                                "copied"
                            );

                        },
                        1800
                    );


                } catch (error) {

                    /*
                     * Fallback sederhana.
                     */

                    const temp =
                        document.createElement(
                            "input"
                        );

                    temp.value =
                        account;

                    document.body.appendChild(
                        temp
                    );

                    temp.select();

                    document.execCommand(
                        "copy"
                    );

                    temp.remove();


                    button.textContent =
                        "✓ Tersalin";


                    setTimeout(
                        () => {

                            button.textContent =
                                "Salin Rekening";

                        },
                        1800
                    );

                }

            }
        );

    }
);


/* =========================================================
   GOOGLE CALENDAR
========================================================= */

const calendarButton =
    document.getElementById(
        "calendarButton"
    );


if (calendarButton) {

    calendarButton.addEventListener(
        "click",
        () => {

            const title =
                encodeURIComponent(
                    "Pernikahan Siwi & Satriya"
                );


            const details =
                encodeURIComponent(
                    "Undangan Pernikahan Siwi & Satriya"
                );


            const location =
                encodeURIComponent(
                    "Gereja Santo Yusup Ambarawa & Jl. Gunung Payung I No. 49A, Salatiga"
                );


            /*
             * Acara 28 Desember 2026.
             *
             * Format Google Calendar:
             * YYYYMMDDTHHMMSS/YYYYMMDDTHHMMSS
             */

            const dates =
                "20261228T030000/20261228T080000";


            const url =
                "https://calendar.google.com/calendar/render" +
                "?action=TEMPLATE" +
                "&text=" +
                title +
                "&dates=" +
                dates +
                "&details=" +
                details +
                "&location=" +
                location;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   WHATSAPP SHARE
========================================================= */

const shareWhatsApp =
    document.getElementById(
        "shareWhatsApp"
    );


if (shareWhatsApp) {

    shareWhatsApp.addEventListener(
        "click",
        () => {

            const guest =
                document
                    .getElementById(
                        "guest"
                    )
                    ?.textContent
                    ?.trim();


            const currentUrl =
                window.location.href;


            let message =
                "Kami mengundang Anda untuk hadir dalam Pernikahan Siwi & Satriya 🤍\n\n";


            if (
                guest &&
                guest !==
                    "Tamu Undangan"
            ) {

                message +=
                    "Kepada " +
                    guest +
                    ",\n\n";

            }


            message +=
                "28 Desember 2026\n\n" +
                currentUrl;


            const whatsappUrl =
                "https://wa.me/?text=" +
                encodeURIComponent(
                    message
                );


            window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

const galleryItems =
    document.querySelectorAll(
        "[data-lightbox]"
    );

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


function openLightbox(
    imageUrl
) {

    if (
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    lightboxImage.src =
        imageUrl;


    lightbox.classList.add(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


function closeLightbox() {

    if (!lightbox) {
        return;
    }


    lightbox.classList.remove(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        invitationOpened
            ? ""
            : "hidden";


    setTimeout(
        () => {

            if (lightboxImage) {

                lightboxImage.src =
                    "";

            }

        },
        350
    );

}


galleryItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                openLightbox(
                    item.dataset.lightbox
                );

            }
        );

    }
);


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/*
 * Tombol Escape menutup lightbox.
 */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            lightbox?.classList.contains(
                "open"
            )
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   PARALLAX COVER
========================================================= */

const coverBg =
    document.querySelector(
        ".cover-bg"
    );


if (
    coverBg &&
    window.matchMedia(
        "(prefers-reduced-motion: no-preference)"
    ).matches
) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                invitationOpened
            ) {
                return;
            }


            const scrollY =
                window.scrollY || 0;


            /*
             * Cover terkunci sehingga
             * nilainya hampir selalu 0.
             *
             * Tetap disiapkan untuk
             * efek ringan saat browser
             * melakukan overscroll.
             */

            const offset =
                Math.min(
                    scrollY * 0.12,
                    20
                );


            coverBg.style.transform =
                `scale(1.04) translateY(${offset}px)`;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   BOTTOM NAV ACTIVE
========================================================= */

const navLinks =
    document.querySelectorAll(
        ".bottom-nav a"
    );


const navSections = [];


navLinks.forEach(
    (link) => {

        const target =
            link.getAttribute(
                "href"
            );


        const section =
            document.querySelector(
                target
            );


        if (section) {

            navSections.push({

                link:
                    link,

                section:
                    section

            });

        }

    }
);


if (
    "IntersectionObserver"
    in window
) {

    const navObserver =
        new IntersectionObserver(
            (
                entries
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            navSections.forEach(
                                (item) => {

                                    item.link.classList.toggle(
                                        "active",
                                        item.section ===
                                        entry.target
                                    );

                                }
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.45
            }
        );


    navSections.forEach(
        (item) => {

            navObserver.observe(
                item.section
            );

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

getGuestName();


/*
 * Pastikan cover menjadi
 * tampilan awal.
 */

if (cover) {

    cover.classList.remove(
        "cover-opened"
    );

}


loadWishes();
