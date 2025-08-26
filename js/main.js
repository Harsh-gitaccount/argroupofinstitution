// main.js - Advanced JavaScript functionality

// Contact form WhatsApp integration
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const course = document.getElementById('course').value;
      const qualification = document.getElementById('qualification').value;
      const scholarship = document.getElementById('scholarship').value;
      const message = document.getElementById('message').value;
      
      if (name && phone && course) {
        let whatsappMessage = `Hi! I'm ${name}.\n\n`;
        whatsappMessage += `📞 Contact: ${phone}\n`;
        whatsappMessage += `🎓 Course Interest: ${course}\n`;
        
        if (qualification) {
          whatsappMessage += `📚 Current Qualification: ${qualification}\n`;
        }
        
        if (scholarship) {
          whatsappMessage += `💰 Scholarship Interest: ${scholarship}\n`;
        }
        
        if (message) {
          whatsappMessage += `\n💬 Message: ${message}`;
        }
        
        whatsappMessage += `\n\nI'm interested in admission guidance from AR Group Of Institution.`;
        
        const whatsappUrl = `https://wa.me/919304631413?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        alert('Please fill in all required fields (Name, Phone, Course Interest)');
      }
    });
  }
  
  // Apply Now button functionality
  const applyButtons = document.querySelectorAll('.btn-apply');
  applyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const courseCard = this.closest('.course-card');
      const courseTitle = courseCard.querySelector('.course-title').textContent;
      
      const whatsappMessage = `Hi! I'm interested in applying for ${courseTitle} program. Please provide more information about admission process and scholarships.`;
      const whatsappUrl = `https://wa.me/919304631413?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Achievement counter animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const achievementsSection = document.querySelector('.achievements');
  if (achievementsSection) {
    observer.observe(achievementsSection);
  }
  
  function animateCounters() {
    const counters = document.querySelectorAll('.achievement-counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
      if (isNaN(target)) return;
      
      const increment = target / 100;
      let current = 0;
      const originalText = counter.textContent;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = originalText;
          clearInterval(timer);
        } else {
          const currentValue = Math.floor(current);
          counter.textContent = originalText.replace(/\d+/, currentValue);
        }
      }, 20);
    });
  }
});
// Simple slideshow - no extra features
document.addEventListener('DOMContentLoaded', function() {
  let slideIndex = 0;
  const slides = document.querySelectorAll('.hero-slideshow img');
  const totalSlides = slides.length;

  function showSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if(index === slideIndex) {
        slide.classList.add('active');
      }
    });
    slideIndex = (slideIndex + 1) % totalSlides;
  }

  // Change slide every 10 seconds
  if(slides.length > 0) {
    setInterval(showSlides, 6000);
    showSlides(); // Initial call
  }
});

// Your existing navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.4)';
  } else {
    navbar.style.boxShadow = '0 4px 8px rgba(30, 58, 138, 0.3)';
  }
});

// Add this to your main.js for enhanced floating button behavior
document.addEventListener('DOMContentLoaded', function() {
  const floatingButtons = document.querySelector('.floating-buttons');
  let scrollTimeout;

  // Fade buttons slightly when scrolling
  window.addEventListener('scroll', function() {
    const floatingButtons = document.querySelector('.floating-buttons');
if (!floatingButtons) return; // Add this line

    floatingButtons.classList.add('scrolled');
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      floatingButtons.classList.remove('scrolled');
    }, 1000);
  });

  // Add click tracking (optional)
  document.querySelectorAll('.floating-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Add slight press animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
});


// Testimonials Slider - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonials-dots .dot');
  let currentSlideIndex = 0;
  let slideInterval;

  if (slides.length === 0) return; // Exit if no testimonials on page

  function showSlide(index) {
    // Hide all slides and remove active from all dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide and activate corresponding dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update global index
    currentSlideIndex = index;
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 6000); // 6 seconds
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // FIXED: Manual navigation with proper dot update
  window.currentSlide = function(index) {
    stopSlideshow();
    showSlide(index - 1); // Convert 1-based to 0-based index
    startSlideshow();
  };

  // Pause on hover
  const sliderContainer = document.querySelector('.testimonials-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlideshow);
    sliderContainer.addEventListener('mouseleave', startSlideshow);
  }

  // Initialize first slide and start slideshow
  showSlide(0);
  startSlideshow();
});
// enquiry code
function openEnquiryPopup() {
  document.getElementById('enquiryModal').classList.add('active');
  document.getElementById('contactFormPopup').style.display = 'block';
  document.getElementById('enquiry-success').style.display = 'none';
  document.getElementById('contactFormPopup').reset();
}

function closeEnquiryPopup() {
  document.getElementById('enquiryModal').classList.remove('active');
}

function showSuccessMsg(event) {
  event.preventDefault();
  
  // Get all form data
  const name = document.getElementById('namePopup').value.trim();
  const phone = document.getElementById('phonePopup').value.trim();
  const email = document.getElementById('emailPopup').value.trim() || 'Not provided';
  const course = document.getElementById('coursePopup').value.replace(/&/g, 'and') || 'Not selected'; // FIX AMPERSAND
  const qualification = document.getElementById('qualificationPopup').value || 'Not selected';
  const scholarship = document.getElementById('scholarshipPopup').value || 'Not selected';
  const message = document.getElementById('messagePopup').value.trim() || 'No message';
  const referredBy = document.getElementById('referredByPopup').value.trim() || 'Not provided';
  
  // Validate required fields
  if (!name || !phone || !course) {
    alert('Please fill in all required fields: Name, Phone, and Course Interest');
    return false;
  }
  
  // Clean WhatsApp message - REPLACE ALL AMPERSANDS
  const whatsappMessage = 
    `AR GROUP ENQUIRY%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    `Email: ${email}%0A` +
    `Course: ${course}%0A` +
    `Qualification: ${qualification}%0A` +
    `Scholarship: ${scholarship}%0A` +
    `Referred By: ${referredBy}%0A` +
    `Message: ${message}%0A%0A` +
    `Website: argroupofinstitution.com`;
  
  console.log('📱 Final WhatsApp Message:', whatsappMessage);
  console.log('📏 Message Length:', whatsappMessage.length);
  
  // Open WhatsApp
  const whatsappNumber = '+919304631413';
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  
  console.log('🔗 WhatsApp URL Length:', whatsappURL.length);
  
  window.open(whatsappURL, '_blank');
  
  // Show success message
  document.getElementById('contactFormPopup').style.display = 'none';
  document.getElementById('enquiry-success').style.display = 'block';
  
  setTimeout(function() {
    closeEnquiryPopup();
  }, 4000);
  
  return false;
}

// Close modal handlers
window.onclick = function(event) {
  const modal = document.getElementById('enquiryModal');
  if (event.target == modal) {
    closeEnquiryPopup();
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    closeEnquiryPopup();
  }
});

