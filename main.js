        document.addEventListener("DOMContentLoaded", () => {
         
            const loader = document.getElementById("loader");
            const loadPctText = document.getElementById("load-pct");
            let loadProgress = 0;
            
            const progressInterval = setInterval(() => {
                loadProgress += Math.floor(Math.random() * 15) + 5;
                if (loadProgress >= 100) {
                    loadProgress = 100;
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        loader.style.opacity = "0";
                        setTimeout(() => {
                            loader.style.display = "none";
                            startTypingAnimation();
                        }, 600);
                    }, 200);
                }
                loadPctText.textContent = loadProgress;
            }, 60);

           
            const mouseGlow = document.getElementById("mouse-glow");
            window.addEventListener("mousemove", (e) => {
                mouseGlow.style.opacity = "1";
                mouseGlow.style.left = e.clientX + "px";
                mouseGlow.style.top = e.clientY + "px";
            });
            window.addEventListener("mouseout", () => {
                mouseGlow.style.opacity = "0";
            });

            
            const header = document.getElementById("header");
            const scrollProgress = document.getElementById("scroll-progress");
            const navLinks = document.querySelectorAll(".nav-link");
            const sections = document.querySelectorAll("section");

            window.addEventListener("scroll", () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                
                scrollProgress.style.width = scrollPercent + "%";

                if (scrollTop > 50) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }

                let currentSectionId = "";
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 120;
                    if (scrollTop >= sectionTop) {
                        currentSectionId = section.getAttribute("id");
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentSectionId}`) {
                        link.classList.add("active");
                    }
                });
            });

           
            const burger = document.getElementById("burger-toggle");
            const navMenu = document.getElementById("nav-menu");

            burger.addEventListener("click", () => {
                navMenu.classList.toggle("active");
                burger.classList.toggle("toggle");
            });

            navLinks.forEach(link => {
                link.addEventListener("click", () => {
                    navMenu.classList.remove("active");
                    burger.classList.remove("toggle");
                });
            });

          
            const stringsToType = [
              "Website Developer",
              "ERP Developer"
            ];
            let stringIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const typingSpeed = 100;
            const erasingSpeed = 50;
            const targetTypingElement = document.getElementById("typing-text");

            function startTypingAnimation() {
                const currentString = stringsToType[stringIndex];
                
                if (!isDeleting) {
                    targetTypingElement.textContent = currentString.substring(0, charIndex + 1);
                    charIndex++;
                    
                    if (charIndex === currentString.length) {
                        isDeleting = true;
                        setTimeout(startTypingAnimation, 2000);
                    } else {
                        setTimeout(startTypingAnimation, typingSpeed);
                    }
                } else {
                    targetTypingElement.textContent = currentString.substring(0, charIndex - 1);
                    charIndex--;
                    
                    if (charIndex === 0) {
                        isDeleting = false;
                        stringIndex = (stringIndex + 1) % stringsToType.length;
                        setTimeout(startTypingAnimation, 500);
                    } else {
                        setTimeout(startTypingAnimation, erasingSpeed);
                    }
                }
            }

            const counterNumbers = document.querySelectorAll(".stat-num");
            
            const animateCounter = (counterElement) => {
                const targetVal = +counterElement.getAttribute("data-target");
                let currentVal = 0;
                const duration = 2000;
                const stepTime = Math.max(Math.floor(duration / targetVal), 30);
                
                const incrementStep = setInterval(() => {
                    currentVal += 1;
                    if (currentVal >= targetVal) {
                        counterElement.textContent = targetVal + "+";
                        clearInterval(incrementStep);
                    } else {
                        counterElement.textContent = currentVal + "+";
                    }
                }, stepTime);
            };

           
            const fadeElements = document.querySelectorAll(".fade-in");
            
            const scrollObserverOptions = {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            };

            const globalObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        
                        if (entry.target.getAttribute("id") === "about") {
                            counterNumbers.forEach(num => animateCounter(num));
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, scrollObserverOptions);

            fadeElements.forEach(el => globalObserver.observe(el));

            
            const buttons = document.querySelectorAll(".btn");
            
            buttons.forEach(button => {
                button.addEventListener("click", function(e) {
                    const x = e.clientX - e.target.getBoundingClientRect().left;
                    const y = e.clientY - e.target.getBoundingClientRect().top;
                    
                    const rippleCircle = document.createElement("span");
                    rippleCircle.classList.add("ripple");
                    rippleCircle.style.left = x + "px";
                    rippleCircle.style.top = y + "px";
                    
                    this.appendChild(rippleCircle);
                    
                    setTimeout(() => {
                        rippleCircle.remove();
                    }, 600);
                });
            });

           
            // --- XỬ LÝ GỬI FORM LIÊN HỆ QUA MAILTO THÔNG MINH ---
    const contactForm = document.getElementById("portfolio-contact-form");
    const submitBtnText = document.getElementById("submit-btn-text");

    if (contactForm && submitBtnText) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Lấy dữ liệu người dùng nhập vào
            const clientName = document.getElementById("form-name").value;
            const clientEmail = document.getElementById("form-email").value;
            const clientMsg = document.getElementById("form-msg").value;

            // Đổi trạng thái nút bấm biểu thị đang xử lý
            submitBtnText.disabled = true;
            submitBtnText.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang chuẩn bị mail...`;

            // Cấu hình thông tin hòm thư nhận và tiêu đề
            const yourEmail = "nguyenthique.dev@gmail.com"; // Điền chính xác email nhận của bạn ở đây
            const subject = encodeURIComponent(`[Portfolio Contact] Yêu cầu hợp tác từ ${clientName}`);
            
            // Định dạng nội dung mail hiển thị rõ ràng khi ứng dụng mail mở ra
            const bodyMessage = encodeURIComponent(
                `Chào Quế,\n\n` +
                `Tôi tên là: ${clientName}\n` +
                `Email liên hệ lại: ${clientEmail}\n\n` +
                `Nội dung lời nhắn:\n"${clientMsg}"\n\n` +
                `--- Sent from Premium Portfolio ---`
            );

            // Tạo liên kết mailto hoàn chỉnh
            const mailtoUrl = `mailto:${yourEmail}?subject=${subject}&body=${bodyMessage}`;

            // Kích hoạt mở ứng dụng Email sau 1 giây tạo hiệu ứng mượt
            setTimeout(() => {
                window.location.href = mailtoUrl;

                // Trả trạng thái nút bấm về bình thường và xóa dữ liệu form cũ
                submitBtnText.disabled = false;
                submitBtnText.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Mở Mail gửi thông điệp`;
                contactForm.reset();
            }, 800);
        });
    }
        });

// --- XỬ LÝ DROPDOWN TẢI CV ---
const cvBtn = document.getElementById("cv-dropdown-btn");
const cvMenu = document.getElementById("cv-dropdown-menu");

if (cvBtn && cvMenu) {
    cvBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        cvMenu.classList.toggle("show");
        cvBtn.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!cvBtn.contains(e.target) && !cvMenu.contains(e.target)) {
            cvMenu.classList.remove("show");
            cvBtn.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            cvMenu.classList.remove("show");
            cvBtn.classList.remove("active");
        }
    });
}