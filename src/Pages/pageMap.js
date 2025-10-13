<<<<<<< HEAD
import { getActiveLang } from "../translation.js";

const ar = {
    "/jobs": ["الوظائف"],
    "/faq": ["الأسئلة الشائعة"],
    "/restaurant": ["اختيار الفرع"],
    "/about-us": ["من نحن"],
    "/all-products": ["جميع المنتجات"],
    "/products": ["الصنف"],
    "/invoice": ["الفاتورة"],
    "/alerts": ["الاشعارات"],
    "/user": ["تسجيل الدخول"],
    "/settings": ["الاعدادات"],
    "/design": ["اقسام مونتانا", "صمم كيكتك بنفسك"],
    "/early-booking": ["اقسام مونتانا", "الحجز المبكر"],
    "/cart": ["الدفع", "السلة"],
    "/checkout": ["الدفع", "تأكيد الطلب"],
  },
  en = {
    "/jobs": ["Jobs"],
    "/faq": ["FAQs"],
    "/restaurant": ["Choose Branch"],
    "/about-us": ["About Us"],
    "/all-products": ["All Products"],
    "/products": ["Category"],
    "/invoice": ["Invoice"],
    "/alerts": ["Notifications"],
    "/user": ["Login"],
    "/settings": ["Settings"],
    "/design": ["Montana Categories", "Design Your Own Cake"],
    "/early-booking": ["Montana Categories", "Early Booking"],
    "/cart": ["Payment", "Cart"],
    "/checkout": ["Payment", "Confirm Order"],
  };
export default getActiveLang() === "العربية" ? ar : en;
=======
import { getActiveLang } from "../translation.js";

const ar = {
    "/jobs": ["الوظائف"],
    "/faq": ["الأسئلة الشائعة"],
    "/restaurant": ["اختيار الفرع"],
    "/about-us": ["من نحن"],
    "/all-products": ["جميع المنتجات"],
    "/products": ["الصنف"],
    "/invoice": ["الفاتورة"],
    "/alerts": ["الاشعارات"],
    "/user": ["تسجيل الدخول"],
    "/settings": ["الاعدادات"],
    "/design": ["اقسام مونتانا", "صمم كيكتك بنفسك"],
    "/early-booking": ["اقسام مونتانا", "الحجز المبكر"],
    "/cart": ["الدفع", "السلة"],
    "/checkout": ["الدفع", "تأكيد الطلب"],
  },
  en = {
    "/jobs": ["Jobs"],
    "/faq": ["FAQs"],
    "/restaurant": ["Choose Branch"],
    "/about-us": ["About Us"],
    "/all-products": ["All Products"],
    "/products": ["Category"],
    "/invoice": ["Invoice"],
    "/alerts": ["Notifications"],
    "/user": ["Login"],
    "/settings": ["Settings"],
    "/design": ["Montana Categories", "Design Your Own Cake"],
    "/early-booking": ["Montana Categories", "Early Booking"],
    "/cart": ["Payment", "Cart"],
    "/checkout": ["Payment", "Confirm Order"],
  };
export default getActiveLang() === "العربية" ? ar : en;
>>>>>>> 8828f8872f24d5af85ad0af7e8efc7f7c81bcb4c
