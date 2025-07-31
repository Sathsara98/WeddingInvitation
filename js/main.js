(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    // Set target date to June 6, 2025
    const targetDate = "08/25/2025";
    const countDown = new Date(targetDate).getTime();

    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day));
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        // When date is reached, display a message
        if (distance < 0) {
            document.getElementById("headline").innerText = "Today is the day!";
            document.getElementById("countdown").style.display = "none";
            document.getElementById("content").style.display = "block";
            clearInterval(x);
        }
    }, 1000);
})();

document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('animate__animated');
                el.classList.add(el.dataset.animation);

                const delay = el.dataset.delay;
                if (delay) {
                    el.style.setProperty('--animate-delay', delay);
                    el.classList.add('animate__delay-' + delay);
                }

                observer.unobserve(el); // Only animate once
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% is visible
    });

    animatedElements.forEach(el => observer.observe(el));
});

document.getElementById('responseForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object from the form
    const formData = new FormData(this);

    // Log all form data key-value pairs to console
    console.log('Form data being submitted:');
    for (const [key, value] of formData.entries()) {
        console.log(key + ': ' + value);
    }

    // Send the data to the Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbwAWFu26Tiz74A9gi8V5mO3yaB_DVow20j9HMNryH5bVAJ9a-3HAYYH5k6QOIih_agD/exec', { // Replace with your Google Apps Script web app URL
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                document.getElementById('successPopup').style.display = 'flex';
                document.getElementById('responseForm').reset();
            } else {
                alert('There was an error submitting your response. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with the submission. Please try again.');
        });
});
function closePopup() {
    document.getElementById('successPopup').style.display = 'none';
    document.getElementById("submitButton").disabled = false; // Re-enable submit button
}

function disableButton() {
    const button = document.getElementById("submitButton");
    button.disabled = true;
}

(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });






    document.addEventListener("DOMContentLoaded", function () {
        const laterOption = document.getElementById("Response3");
        const phoneField = document.getElementById("phoneField");

        const allOptions = document.getElementsByName("Response");

        allOptions.forEach(option => {
            option.addEventListener("change", function () {
                if (laterOption.checked) {
                    phoneField.style.display = "flex";
                } else {
                    phoneField.style.display = "none";
                    document.getElementById("PhoneNumber").value = ''; // Clear phone if hidden
                }
            });
        });
    });

})(jQuery);

